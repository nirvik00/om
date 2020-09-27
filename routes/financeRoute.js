const express = require('express');
const router = express.Router();
const methodOverride = require('method-override');

router.use(methodOverride('_method'));

///  finance routes
const mongoose = require('mongoose');
const Money = require('../models/Money');
const Note = require('../models/Note');

router.get('/finance', async (req, res) => {
	try {
		let money = await Money.find({});
		let str = JSON.stringify(money);

		let note = await Note.find({});
		let noteStr = JSON.stringify(note);

		res.render('cost', {
			data: encodeURIComponent(str),
			note: encodeURIComponent(noteStr),
		});
	} catch (e) {
		res.render('cost');
	}
});

router.post('/finance/add', async (req, res) => {
	console.log(req.body);

	const purpose = req.body.purpose;
	const source = req.body.source;
	const name = req.body.name;
	const val = parseFloat(req.body.val);
	const moneyType = req.body.moneyType;
	const incomeDate = req.body.incomeDate;
	const spendDate = req.body.spendDate;

	const newMoney = new Money({
		purpose,
		source,
		name,
		val,
		moneyType,
		incomeDate,
		spendDate,
	});

	try {
		await newMoney.save();
		res.status(200).redirect('/finance');
	} catch (err) {
		console.log('error in adding new data');
		res.status(500).redirect('/finance');
	}
});

// delete concept
router.delete('/finance/:id', async (req, res) => {
	console.log(req.params.id);
	try {
		await Money.findOneAndRemove({ _id: req.params.id });
		res.redirect('/finance');
	} catch (e) {
		console.log('error in deleting data');
		res.redirect('/finance');
	}
});

// update concept
router.put('/finance/:id', (req, res) => {
	console.log(req.body);
	Money.findOne({
		_id: req.params.id,
	})
		.then((money) => {
			//new values
			money.purpose = req.body.purpose;
			money.source = req.body.source;
			money.name = req.body.name;
			money.val = req.body.val;
			money.moneyType = req.body.moneyType;
			money.date = req.body.date;
			money.incomeDate = req.body.incomeDate;
			money.spendDate = req.body.spendDate;
			//save with new data
			money
				.save()
				.then((money) => {
					console.log('saved to db');
					res.redirect('/finance');
				})
				.catch((e) => {
					console.log('error in saving...');
					res.redirect('/finance');
				});
		})
		.catch((e) => {
			console.log('error in saving - finding...', e);
			res.redirect('/finance');
		});
});
module.exports = router;
