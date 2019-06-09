const eddystoneBeacon = require('eddystone-beacon');

let address = '192.168.0.135';
if (process.argv.length > 2) {
    address = process.argv[2];
}

let url = 'http://' + address + '/pay';
let options = {
    name: 'BPay Beacon',
    txPowerLevel: -22,
    tlmCount: 2,
    tlmPeriod: 10
};

eddystoneBeacon.advertiseUrl(url, options);
