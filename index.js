const express = require('express');
const expressHbs = require('express-handlebars');
const bodyParser = require('body-parser')
const cal = require('./calculator');
const app = express();
const port = 8080;
app.use(bodyParser.urlencoded({ extended: true }))
app.engine('.hbs', expressHbs.engine({ extname: '.hbs' }))
app.set('view engine', '.hbs');

app.set('views', './views');

app.get('/', (req, res) => {
    res.render('home', {
        number1: "",
        number2: "",
        operator_add: true,
        result: "",
    });
});

app.post('/', (req, res) => {

    const number1 = Number(req.body.number1);
    const number2 = Number(req.body.number2);
    const operator = req.body.operator;
    let result;
    switch (operator) {
        case "+":
            result = cal.add(number1, number2);
            break;
        case "-":
            result = cal.substract(number1, number2);
            break;
        case "*":
            result = cal.mutiply(number1, number2);
            break;
        case "/":
            result = cal.divide(number1, number2);
            break;
    }
    res.render('home', {
        number1: number1,
        number2: number2,
        operator_add: operator === "+",
        operator_substract: operator === "-",
        operator_multiply: operator === "*",
        operator_divide: operator === "/",
        result: result
    })
});


app.listen(port);