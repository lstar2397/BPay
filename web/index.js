const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const port = process.env.PORT || 80;

const indexPage = require('./routes');
const payPage = require('./routes/pay');
const amountPage = require('./routes/amount');
const historyPage = require('./routes/history');

app.use(bodyParser.json());

app.use('/', indexPage);
app.use('/pay', payPage);
app.use('/amount', amountPage);
app.use('/history', historyPage);

app.listen(port, () => {
    console.log('Server has started on port ' + port);
});