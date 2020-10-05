const express = require('express');
const router = express.Router();
const methodOverride = require('method-override');
//
// router.use(methodOverride('_method'));
router.use(express.json());
//
///  note schema- db model routes
//
// const mongoose = require('mongoose');
const Note = require('../models/Note');
//
// POST request from add
//
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
//
// put - update: edit the concept with id
//
router.put('/notes/:id', async (req, res) => {
	try {
		let note = await Note.findOne({ _id: req.params.id });
		note.content = req.body.content;
		await note.save();
		res.send('successfully updated');
	} catch (e) {
		res.redirect('error in put req- not updated');
	}
});
//
// delete concept
//
router.delete('/notes/:id', async (req, res) => {
	try {
		await Note.findOneAndRemove({ _id: req.params.id });
		res.send('deleted successfully');
	} catch (e) {
		console.log('error in note deletion');
		res.send('error in delete');
	}
});
//
module.exports = router;
//
//
//
