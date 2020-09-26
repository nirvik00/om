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
	moneyType: {
		type: String,
		enum: ['income', 'gift', 'expense', 'debt'],
		default: 'income',
	},
	date: {
		type: Date,
		default: Date.now,
	},
	incomeDate: {
		type: Date,
		default: Date.now,
	},
	spendDate: {
		type: Date,
		defalut: Date.now,
	},
});

module.exports = mongoose.model('Money', moneySchema);
