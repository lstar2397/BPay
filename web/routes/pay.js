const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const router = express.Router();
const dbUrl = 'mongodb://localhost:27017/';

router.post('/', (req, res) => {
    MongoClient.connect(dbUrl, (err, client) => {
        if (err) throw err;
        let dbo = client.db('BPay');

        let token = req.body.token;
        let paymentType = req.body.paymentType;
        let amountToPay = (paymentType == 'GET ON') ? -900 : 0;
        
        dbo.collection('user').findOneAndUpdate({ 'token': token }, { $inc: { amount: amountToPay }}, (err, result) => {
            if (err) {
                console.log('user.money findOneAndUpdate Error');
                res.send('user.money findOneAndUpdate Error');
            } else {
                if (result.value != null) {
                    let beforeAmount = result.value.amount;
                    let paidTimestamp = req.body.paidTimestamp;
                    updatePaymentHistory(token, beforeAmount, beforeAmount + amountToPay, paymentType, paidTimestamp);
                    console.log('결제가 완료되었습니다.');
                    res.send('결제가 완료되었습니다.');
                } else {
                    console.log('결제 실패');
                    res.send('결제 실패: 유저가 없습니다.');
                }
            }
            client.close();
        });
    });
});

function updatePaymentHistory(token, beforeAmount, afterAmount, paymentType, paidTimestamp) {
    MongoClient.connect(dbUrl, (err, client) => {
        if (err) throw err;
        let dbo = client.db('BPay');
        let myObj = { 'token': token, 'beforeAmount': beforeAmount, 'afterAmount': afterAmount, 'paymentType': paymentType, 'paidTimestamp': paidTimestamp };
        dbo.collection('history').insertOne(myObj, (err, result) => {
            if (err) {
                console.log('결제내역 추가 에러');
            } else {
                console.log('결제내역 추가 완료');
            }
            client.close();
        });
    });
}

module.exports = router;