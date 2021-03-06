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
    let { listening, dc, oi, bp } = request.body;

    rubrics.insert({
        "listening": listening,
        "difficult_conversations": dc,
        "opting_in": oi,
        "bias_and_privilege": bp
    }, request.body.teachers_name)
        .then(() => response.redirect("/analysis"))
        .catch(err => console.error(err));
});

app.get("/analysis", (request, response) => {
    rubrics.fetch().next()
    	.then(data => {
            response.render("analysis", {
                "title": "Analysis",
                "data": data.value
            });
    	})
    	.catch(err => console.error(err));
});

app.get("/clear", (request, response) => {
    rubrics.fetch().next()
        .then(data => {
            for(let eval of data.value) {
                rubrics.delete(eval.key);
            }

            response.redirect("/");
        })
        .catch(err => console.error(err));
});

// start server
app.listen(8080);
