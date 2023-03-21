
import fetch from 'node-fetch';
import HTMLParser from 'node-html-parser';
import crypto from 'crypto';
import fs from 'fs';

let cveurl='https://support.confluent.io/hc/en-us/sections/360008413952-Security-Advisories-and-Security-Release-Notes';

let outputFile = null;

if(process.argv.length>2){
    cveurl = process.argv[2];
}
if(process.argv.length>3){
    outputFile = process.argv[3];
}

(async () => {
    let result={
        "sourceurl":cveurl,
        "articlecount":0,
        "md5hash":0,
        "date": new Date().toISOString()
    };
    try {
        const response = await fetch(cveurl);
        const body = await response.text();
        let root = HTMLParser.parse(body);
        let quench = root.querySelector('.article-list').toString();
        result.articlecount = root.querySelectorAll('.article-list .article-list-item').length;
        result.md5hash = crypto.createHash('md5').update(quench).digest('hex');
        if(outputFile == null){
            console.log(JSON.stringify(result,null,3));
        }else{
            fs.writeFileSync(outputFile,JSON.stringify(result,null,3));
        }
    } catch (e) {
        console.error(e);
        process.exit(1)
        // Deal with the fact the chain failed
    }
    // `text` is not available here
})();
