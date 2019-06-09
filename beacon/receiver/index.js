const eddystoneBeaconScanner = require('eddystone-beacon-scanner');
const request = require('request');
const tokenGenerator = require('./token-generator');

var lastPaidDate;

eddystoneBeaconScanner.on('found', data => {
    // 처음에 비콘에 연결되었을 때

    // { txPower, url, type, rssi, distance, lastSeen }
    // 해당 url로 post를 보내서 결제를 시도한다.

    postBeaconToWebService(data, 'default', (err, res, body) => {
        if (!err) {
            console.log('성공적으로 결제가 완료되었습니다.');
        } else {
            console.log('결제를 시도하는데 에러가 발생하였습니다.');
        }
    });
});

eddystoneBeaconScanner.on('updated', data => {
    // 계속 비콘과 연결되어있는 상태
    // n초마다 추가 결제가 이루어져야 한다.

    let currentDate = new Date(data.lastSeen)
    let dateOffset = 1000 * 30; // 30 secs
    let adjustDate = new Date(lastPaidDate.getTime() + dateOffset);

    // 만약 현재 시간이 결제 후 일정시간을 넘겼을 때
    if (adjustDate < currentDate) {
        // 다시 결제를 시도한다.

        postBeaconToWebService(data, 'additional', (err, res, body) => {
            if (!err) {
                console.log('성공적으로 추가 결제가 완료되었습니다.');
            } else {
                console.log('추가 결제를 시도하는데 에러가 발생하였습니다.');
            }
        });

        lastPaidDate = currentDate;
    }
});

eddystoneBeaconScanner.on('lost', data => {
    // 비콘과 연결이 끊어졌을 때
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
