const fs = require('fs');
const crypto = require('crypto');
const path = require('path');

const tokenFilePath = path.join(__dirname, '../bin/token');

exports.getToken = function(callback) {
    fs.readFile(tokenFilePath, 'utf-8', (err, data) => {
        if (err) {
            console.log('토큰을 만들고 있습니다.');
            let token = crypto.randomBytes(12).toString('hex');

            // 파일을 작성하기 전에 폴더가 없으면 생성한다.
            fs.mkdirSync(path.dirname(tokenFilePath));

            // 생성된 토큰을 파일에 기록한다.
            fs.writeFile(tokenFilePath, token, 'utf-8', err => {
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
