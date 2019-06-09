const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const dbUrl = 'mongodb://localhost:27017/';

router.post('/', (req, res) => {
    let token = req.body.token;
    let amount = req.body.amount;

    MongoClient.connect(dbUrl, (err, client) => {
        if (err) throw err;
        let dbo = client.db('BPay');
        let myObj = { 'token': token, 'amount': amount };
        dbo.collection('user').insertOne(myObj, (err, result) => {
            if (err) {
                console.log('User create error');
                res.send('User create error');
            } else {
                console.log('User create success');
                res.send('User create success');
            }
            client.close();
        });
    });
});

router.put('/', (req, res) => {
    let token = req.body.token;
    let amount = req.body.amount;

    MongoClient.connect(dbUrl, (err, client) => {
        if (err) throw err;
        let dbo = client.db('BPay');
        dbo.collection('user').updateOne({ 'token': token }, { $set: { 'amount': amount } }, (err, result) => {
            if (err) {
                console.log('User update error');
                res.send('User update error');
            } else {
                console.log('User update success');
                res.send('User update success');
            }
            client.close();
        });
    });
});

module.exports = router;