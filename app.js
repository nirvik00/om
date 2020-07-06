var express = require("express");
var exhbs = require('express-handlebars');


var app = new express();


process.env.PWD = process.cwd()
app.use('/public', express.static(process.env.PWD + '/public'));


//load middleware
//express-handlebars : views
app.engine('handlebars', exhbs({
    defaultLayout: 'main'
}));

app.set('view engine', 'handlebars');

app.get('/', function (req, res) {
    res.render('index');
});


app.get('/live', function (req, res) {
    res.render('liveVid');
}); 

app.get('/about', function (req, res) {
    res.render('about');
}); 

app.get('/gallery', function (req, res) {
    res.render('gallery');
}); 

var port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log("Server running at port " + port);
});