const eddystoneBeacon = require('eddystone-beacon');

let url = 'http://starlet.kr/pay';
let options = {
    name: 'My Beacon',
    txPowerLevel: -22,
    tlmCount: 2,
    tlmPeriod: 10
};

eddystoneBeacon.advertiseUrl(url, options);
