const express = require('express');
const router = express.Router();
const methodOverride = require('method-override');

router.use(methodOverride('_method'));

///  note schema- db model routes
const mongoose = require('mongoose');
const Note = require('../models/Note');

// POST request from add
router.post('/notes', async (req, res) => {
	console.log(req.body);
	const c = new Note({
		content: req.body.content,
	});
	try {
		await c.save();
		res.redirect('/finance');
	} catch (e) {
		res.redirect('/finance');
		console.log(e);
	}
});

// put - update: edit the concept with id
router.put('/notes/:id', (req, res) => {
	Note.findOne({ _id: req.params.id }).then((note) => {
		note.content = req.body.content;
		note.save().then((note) => {
			res.redirect('/finance');
		});
	});
});

// delete concept
router.delete('/notes/:id', async (req, res) => {
	try {
		await Note.findOneAndRemove({ _id: req.params.id });
		res.redirect('/finance');
	} catch (e) {
		console.log('error in note deletion');
		res.redirect('/finance');
	}
});

module.exports = router;
