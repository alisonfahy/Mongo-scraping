//Require our dependencies
let express = require("express");
let exphbs = require("express-handlebars")
let mongoose = require("mongoose"); 
let bodyParser = require("body-parser");

//Set up port
let PORT = process.env.PORT || 3000;

//Instantiate our express app
let app = express();

//Set up an Express Router
let router = express.Router();

//Designate our public folder as a static directory
app.use(express.static(__dirname + "/public"));

//Connect Handlebars to the express app
app.engine("handlebars", exphbs({
    defaultlayout: "main"
}));
app.set("view engine", "handlebars");

//Use bodyParser
app.use(bodyParser.urlencoded({
    extended: false
}));

// Requests go through router middleward
app.use(router);

let db = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

//connect mongoose to database
mongoose.connect(db, function(error) {
    if(error) {
        console.log(error);
    }
    else {
        console.log("mongoose is flying!")
    }
})

//Listening on PORT
app.listen(PORT, function() {
    console.log("Listening on port: " + PORT);
});