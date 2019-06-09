const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const router = express.Router();
const dbUrl = 'mongodb://localhost:27017/';

router.get('/', (req, res) => {
    MongoClient.connect(dbUrl, (err, client) => {
        if (err) throw err;
        let dbo = client.db('BPay');
        dbo.collection('history').find({}).sort({ paidTimestamp: -1 }).toArray((err, result) => {
            if (err) throw err;
            res.send(result);
            client.close();
        });
    });
});

module.exports = router;