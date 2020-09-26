const express = require('express');
const router = express.Router();
const methodOverride = require('method-override');

router.use(methodOverride('_method'));

router.get('/', function (req, res) {
	res.render('index');
});

// routes
router.get('/live', function (req, res) {
	res.render('liveVid');
});

router.get('/gallery', function (req, res) {
	res.render('gallery');
});

///  finance routes
const mongoose = require('mongoose');
const Money = require('../models/Money');

router.get('/finance', async (req, res) => {
	try {
		let money = await Money.find({});
		let str = JSON.stringify(money);
		res.render('cost', { data: encodeURIComponent(str) });
	} catch (e) {
		res.render('cost', { data: 'Error' });
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

module.exports = router;
