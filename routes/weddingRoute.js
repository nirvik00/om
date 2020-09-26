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
		// res.send(money);
		res.render('cost', { data: encodeURIComponent(str) });
	} catch (e) {
		res.render('cost', { data: 'Error' });
	}
});

/* 
router.delete('/remove/:user_id', async (req, res) => {
	try {
		await User.findOneAndRemove({ _id: req.params.user_id });
		res.status(200).json({ msg: 'Deleted user' });
	} catch (err) {
		res.status(400).json({ msg: 'Error in deleting user' });
	}
});
*/

router.post('/finance/add', async (req, res) => {
	const purpose = req.body.purpose;
	const source = req.body.source;
	const name = req.body.name;
	const val = parseFloat(req.body.val);
	let income, gift, expense, debt;
	try {
		income = req.body.income;
		if (income === 'on') {
			income = true;
		} else {
			income = false;
		}
	} catch (e) {
		income = false;
	}
	try {
		gift = req.body.gift;
		if (gift === 'on') {
			gift = true;
		} else {
			gift = false;
		}
	} catch (e) {
		gift = false;
	}
	try {
		expense = req.body.expense;
		if (expense === 'on') {
			expense = true;
		} else {
			expense = false;
		}
	} catch (e) {
		expense = false;
	}
	try {
		debt = req.body.debt;
		if (debt === 'on') {
			debt = true;
		} else {
			debt = false;
		}
	} catch (e) {
		debt = false;
	}

	const newMoney = new Money({
		purpose,
		source,
		name,
		val,
		income,
		gift,
		expense,
		debt,
	});

	try {
		await newMoney.save();
		res.status(200).redirect('/finance');
	} catch (err) {
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
		res.redirect('/finance');
	}

	/* Money.remove({ _id: req.params.id }).then(() => {
		res.redirect('/finance');
	}); */
	/*
	try {
		await User.findOneAndRemove({ _id: req.params.user_id });
		res.status(200).json({ msg: 'Deleted user' });
	} catch (err) {
		res.status(400).json({ msg: 'Error in deleting user' });
	}
	*/
});

module.exports = router;
