
//const util = require('util');
const http = require('http');
const HTMLParser = require('node-html-parser');

const cveurl='https://support.confluent.io/hc/en-us/sections/360008413952-Security-Advisories-and-Security-Release-Notes';

const getoptions= {
    "host": "support.confluent.io",
    "port": 443,
    "path": "/hc/en-us/sections/360008413952-Security-Advisories-and-Security-Release-Notes"
};
let content = "";
let finished = false;
let req = http.request(options, function(res) {
    res.setEncoding("utf8");
    res.on("data", function (chunk) {
        content += chunk;
    });

    res.on("end", function () {
    //    util.log(content);
    });
});

req.end();
let root = HTMLParser.parse('<ul id="list"><li>Hello World</li></ul>');
