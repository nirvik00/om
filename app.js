var express = require("express");
var exhbs= require('express-handlebars');


var app = new express();


app.use(express.static(__dirname + "/public" ));


//load middleware
//express-handlebars : views
app.engine('handlebars', exhbs({
    defaultLayout:'main'
}));
app.set('view engine', 'handlebars');

app.get('/',function(req,res){
    res.render('index');
});


var port = process.env.PORT || 5000;
app.listen(port,()=>{
    console.log("Server running at port "+ port);
});