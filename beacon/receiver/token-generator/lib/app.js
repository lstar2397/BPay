const fs = require('fs');
const crypto = require('crypto');
const path = require('path');
const mkdirp = require('mkdirp');

const tokenPath = path.join(__dirname, '../bin/token');

function writeFile(path, contents, callback) {
    mkdirp(path.getDirName(path), err => {
        if (err) throw callback(err);

        fs.writeFile(path, contents, 'utf-8', callback);
    });
}

exports.getToken = function(callback) {
    fs.readFile(tokenPath, 'utf-8', (err, data) => {
        if (err) {
            console.log('토큰을 만들고 있습니다.');
            let token = crypto.randomBytes(12).toString('hex');

            writeFile(tokenPath, token, err => {
                if (err) throw err;
                console.log('토큰 파일이 저장되었습니다.');
            });
            
            callback(token);
        } else {
            console.log('저장된 토큰 파일을 이용합니다.');
            callback(data);
        }
    });
}
