let mongoose = require("mongoose");
let db = require("../models");

mongoose.connect("mongodb+srv://jdhprogrammer:07ju15ju21@cluster0.gzslz.mongodb.net/budget?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useFindAndModify: false,
});

let transactionSeed = [{
        date: new Date(new Date().setDate(new Date().getDate() - 10)),
        name: "FullStack Paycheck",
        value: 3000,
    },
    {
        date: new Date(new Date().setDate(new Date().getDate() - 9)),
        name: "TNT Paycheck",
        value: 1200,
    },
    {
        date: new Date(new Date().setDate(new Date().getDate() - 8)),
        name: "Mortgage Payment",
        value: -2500,
    },
    {
        date: new Date(new Date().setDate(new Date().getDate() - 7)),
        name: "Car Payment",
        value: -450,
    },
    {
        date: new Date(new Date().setDate(new Date().getDate() - 6)),
        name: "Insurance",
        value: -300,
    },
    {
        date: new Date(new Date().setDate(new Date().getDate() - 5)),
        name: "Utilities",
        value: -250,
    },
    {
        date: new Date(new Date().setDate(new Date().getDate() - 4)),
        name: "Insurance",
        value: -300,
    },
    {
        date: new Date(new Date().setDate(new Date().getDate() - 3)),
        name: "Groceries",
        value: -500,
    },
    {
        date: new Date(new Date().setDate(new Date().getDate() - 2)),
        name: "Restaurants",
        value: -300,
    },
    {
        date: new Date(new Date().setDate(new Date().getDate() - 1)),
        name: "Gasoline",
        value: -300,
    },
    {
        date: new Date(new Date().setDate(new Date().getDate() - 0)),
        name: "FullStack Paycheck",
        value: 3000,
    },
    {
        date: new Date(new Date().setDate(new Date().getDate() - 0)),
        name: "TNT Paycheck",
        value: 1200,
    },

];


db.Transaction
    .deleteMany({})
    .then(() => db.Transaction.collection.insertMany(transactionSeed))
    .then((data) => {
        console.log(data.result.n + " records inserted!");
        process.exit(0);
    })
    .catch((err) => {
        console.error(err);
        process.exit(1);
    });