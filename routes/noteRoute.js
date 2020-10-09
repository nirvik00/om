const express = require('express');
const router = express.Router();
router.use(express.json());
//
//
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
		res.send(c);
	} catch (e) {
		res.send('error in post submitssion');
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
