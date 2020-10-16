const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const PORT = process.env.PORT || 8080;

const app = express();

app.use(bodyParser.urlencoded({extended: false}));

app.use(bodyParser.json());

require("./routing/html_routes.js")(app);
require("./routing/api_routes.js")(app);

app.listen(PORT, function(){
    console.log("App listening on PORT: " + PORT);
});