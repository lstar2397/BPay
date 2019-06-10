const eddystoneBeaconScanner = require('eddystone-beacon-scanner');
const request = require('request');
const tokenGenerator = require('./token-generator');

eddystoneBeaconScanner.on('found', data => {
    // 처음에 비콘에 연결되었을 때(승차)
    postBeaconToWebService(data, 'GET ON');
});

eddystoneBeaconScanner.on('lost', data => {
    // 비콘과 연결이 끊어졌을 때(하차)
    postBeaconToWebService(data, 'GET OFF');
});

function postBeaconToWebService(data, paymentType) {
    tokenGenerator.getToken(token => {
        let paidTimestamp = new Date(); 

        let payload = {
            'token': token,
            'paymentType': paymentType,
            'paidTimestamp': paidTimestamp
        };

        let options = {
            url: data.url,
            method: 'POST',
            json: payload
        };

        request(options, (err, res, body) => {
            let strPaymentType = ((paymentType == 'GET ON') ? '승차' : '하차');

            if (!err) {
                console.log('성공적으로 ' + strPaymentType + '가 완료되었습니다.');
            } else {
                console.log(res);
                console.log(strPaymentType + '를 시도하는데 에러가 발생하였습니다.');
            }
        });
    });
}

eddystoneBeaconScanner.startScanning(true);
