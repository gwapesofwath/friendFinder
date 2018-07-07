//Dependencies- npm packages that allow for more server functionality
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

//Express Configuration

//tells node that we're creating an "express" server
var app = express();

//Set an initial port either by using the port heroku assigns or using a hard-code port on our local server
var PORT = process.env.PORT || 3000;

//Sets up the express app handle data parsing.
app.use(bodyParser.urlencoded ({ extended: true}));
app.use(bodyParser.json());
app.use(express.static('app/public'));


//These "require statments" point the server to our "route" files.
require("./app/routing/apiRoutes.js")(app);
require("./app/routing/htmlRoutes.js")(app);



//Listener- this code effectively "starts" our server and tells on what Port it is being on

app.listen(PORT, function() {
    console.log("listening on PORT: " + PORT);
});


