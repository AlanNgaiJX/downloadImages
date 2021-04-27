const request = require('request');
const fs = require('fs')
const { URL } = require('url');
const imageList = require('./imageList.js');
const dstpath = "./images";

function mkdirSync(dirname) {
    if (fs.existsSync(dirname)) {
        fs.rmdirSync(dirname, {
            recursive: true
        })
    }
    fs.mkdirSync(dirname);
}

function downloadUrl(imageList) {
    mkdirSync(dstpath);

    let count = imageList.length;

    for (const url_item of imageList) {
        const url = new URL(url_item);
        const fileName = url.pathname.split('/').slice(-1)[0];
        const download_dstpath = dstpath + '/' + fileName
        request(url_item).pipe(fs.createWriteStream(download_dstpath)).on('close', function () {
            console.log(`${fileName} 已下载`)
            count--;

            if (count === 0) {
                console.log(`已全部下载到 ${dstpath} !!!`);
            }
        })
    }
}

downloadUrl(imageList);
