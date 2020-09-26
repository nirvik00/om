const mongoose = require('mongoose');
const moneySchema = new mongoose.Schema({
	purpose: {
		type: String,
		minLength: 3,
		required: true,
	},
	source: {
		type: String,
		minLength: 3,
		required: true,
	},
	name: {
		type: String,
		minLength: 3,
		required: true,
	},
	val: {
		type: Number,
		required: true,
	},
	income: {
		type: Boolean,
		default: true,
	},
	gift: {
		type: Boolean,
		default: false,
	},
	expense: {
		type: Boolean,
		default: false,
	},
	debt: {
		type: Boolean,
		default: false,
	},
	date: {
		type: Date,
		default: Date.now,
	},
});

module.exports = mongoose.model('Money', moneySchema);
