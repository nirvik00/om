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

module.exports = router;
