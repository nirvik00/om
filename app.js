const express = require('express');
const exhbs = require('express-handlebars');
const methodOverride = require('method-override');
const cors = require('cors');
const mongoose = require('mongoose');
const app = new express();

app.use(cors());
require('dotenv').config();

process.env.PWD = process.cwd();
app.use('/public', express.static(process.env.PWD + '/public'));

// db
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
	useNewUrlParser: true,
	useCreateIndex: true,
	useFindAndModify: false,
	useUnifiedTopology: true,
});

//load middleware

//express-handlebars : views
app.engine(
	'handlebars',
	exhbs({
		defaultLayout: 'main',
	})
);
app.set('view engine', 'handlebars');

app.use(express.urlencoded({ extended: false }));

//middleware for method-override
app.use(methodOverride('_method'));

/// routes

// wedding routes
app.use('/', require('./routes/weddingRoute'));

var port = process.env.PORT || 5500;
app.listen(port, () => {
	console.log('Server running at port ' + port);
});
