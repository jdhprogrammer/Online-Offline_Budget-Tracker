const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const compression = require("compression");

const PORT = process.env.PORT || 3001;

const app = express();

app.use(logger("dev"));

app.use(compression());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

app.use(require("./routes/api.js"));

mongoose.connect(
        process.env.MONGODB_URI || 'mongodb://localhost/budget', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        }).then(() => {
        //Setup Server after connecting to db
        app.listen(PORT, () => {
            console.log(`listening on PORT ${PORT}, http://localhost:${PORT}`);
        });
    })
    .catch((error) => {
        console.log(error.message);
    });