const eddystoneBeaconScanner = require('eddystone-beacon-scanner');
const request = require('request');
const tokenGenerator = require('./token-generator');

eddystoneBeaconScanner.on('found', data => {
    // 처음에 비콘에 연결되었을 때

    // { txPower, url, type, rssi, distance, lastSeen }
    // 해당 url로 post를 보내서 결제를 시도한다.

    postBeaconToWebService(data, 'get on', (err, res, body) => {
        if (!err) {
            console.log('성공적으로 결제가 완료되었습니다.');
        } else {
            console.log('결제를 시도하는데 에러가 발생하였습니다.');
        }
    });
});

eddystoneBeaconScanner.on('lost', data => {
    // 비콘과 연결이 끊어졌을 때
    postBeaconToWebService(data, 'get off', (err, res, body) => {
        if (!err) {
            console.log('성공적으로 하차가 완료되었습니다.');
        } else {
            console.log('하차를 시도하는데 에러가 발생하였습니다.');
        }
    });
});

function postBeaconToWebService(data, paymentType, callback) {
    tokenGenerator.getToken(token => {
        let paidTimestamp = new Date(); 

        let payload = {
            'token': token,
            'paymentType': paymentType,
            'timestamp': paidTimestamp
        };

        let options = {
            url: data.url,
            method: 'POST',
            json: payload
        };

        request(options, callback);
    });
}

eddystoneBeaconScanner.startScanning(true);
