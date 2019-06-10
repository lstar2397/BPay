const eddystoneBeacon = require('eddystone-beacon');

if (process.argv.length != 3) {
    console.log('Usage: node index.js {IP Address}');
    process.exit();
}

let address = process.argv[2];
let url = 'http://' + address + '/pay';
let options = {
    name: 'BPay Beacon',
    txPowerLevel: -22,
    tlmCount: 2,
    tlmPeriod: 10
};

eddystoneBeacon.advertiseUrl(url, options);
