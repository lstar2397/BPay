const eddystoneBeaconScanner = require('eddystone-beacon-scanner');
const request = require('request');
const tokenGenerator = require('./token-generator');

eddystoneBeaconScanner.on('found', data => {
    console.log(JSON.stringify(data, null, 4));
});

eddystoneBeaconScanner.on('updated', data => {
    console.log(JSON.stringify(data, null, 4));
});

eddystoneBeaconScanner.on('lost', data => {
    console.log(JSON.stringify(data, null, 4));
});

eddystoneBeaconScanner.startScanning(true);
