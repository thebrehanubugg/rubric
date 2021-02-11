// import required dependencies
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const express = require("express");
const dotenv = require("dotenv");
const { Deta } = require("deta");

// application setup
const app = express();
dotenv.config();

const deta = Deta(process.env.PROJECT_KEY);
const rubrics = deta.Base("rubrics");

// application configuration
app.use(express.static("public"));

app.engine(".hbs", exphbs({extname: ".hbs"}));
app.set("view engine", ".hbs");
app.set("views", `${__dirname}/views`);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// application routes
app.get("/", (request, response) => {
    response.render("index", {
        "title": "Rubric"
    });
});

app.post("/rubric/evaluate", (request, response) => {
    response.json(request.body);
    rubrics.insert(request.body);
});

// start server
app.listen(8080);