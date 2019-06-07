const fs = require('fs');
const crypto = require('crypto');
const path = require('path');

const tokenPath = path.join(__dirname, '../bin/token');

exports.getToken = function(callback) {
    fs.readFile(tokenPath, 'utf-8', (err, data) => {
        if (err) {
            console.log('Generating token');
            let token = crypto.randomBytes(24).toString('hex');
            
            fs.writeFile(tokenPath, token, 'utf-8', err => {
                if (err) throw err;
                console.log('Token file has been saved!');
            });
            
            callback(token);
        } else {
            console.log('Using token file');
            callback(data);
        }
    });
}
