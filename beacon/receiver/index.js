const eddystoneBeaconScanner = require('eddystone-beacon-scanner');
const request = require('request');
const tokenGenerator = require('./token-generator');

eddystoneBeaconScanner.on('found', data => {
    // 처음에 비콘에 연결되었을 때

    // { txPower, url, type, rssi, distance, lastSeen }
    // 해당 url로 post를 보내서 결제를 시도한다.

    postBeaconToWebService(data, 'get on', 3);
});

eddystoneBeaconScanner.on('lost', data => {
    // 비콘과 연결이 끊어졌을 때
    postBeaconToWebService(data, 'get off', 3);
});

function postBeaconToWebService(data, paymentType) {
    if (count <= 0) return;
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

        request(options, (err, res, body) => {
            let strPaymentType = ((paymentType == 'get on') ? '승차' : '하차');
            if (!err) {
                console.log('성공적으로 ' + strPaymentType + '가 완료되었습니다.');
            } else {
                console.log(strPaymentType + '를 시도하는데 에러가 발생하였습니다.');
                setTimeout(() => {
                    console.log('1초후에 다시 결제를 시도합니다.');
                    postBeaconToWebService(data, paymentType, count - 1);
                }, 1000);
            }
        });
    });
}

eddystoneBeaconScanner.startScanning(true);
