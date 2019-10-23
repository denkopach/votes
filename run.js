const ProxyList = require('free-proxy');
const proxyList = new ProxyList();
var HttpsProxyAgent = require('https-proxy-agent');

var passport = require('passport')
    , util = require('util')
    , BasicStrategy = require('passport-http').BasicStrategy
    , AnonymousStrategy = require('passport-anonymous').Strategy;

function click() {
    proxyList.get()
        .then(function (proxies) {
            for (let index = 0; index < proxies.length; index++) {
            let dataProxy = proxies[index];

                const https = require('https');

                const data = JSON.stringify({
                    isNegative: false
                });
                if (!dataProxy || !dataProxy.ip || !dataProxy.port) {
                    return;
                }
                const agent = new HttpsProxyAgent('http://' + dataProxy.ip + ':' + dataProxy.port);
                const options = {
                    host: "proxy",

                    hostname: 'voting.playbuzz.com',
                    port: 443,
                    path: '/ranking/8a768991-52ad-42cc-9608-4862eaefb02e/f3b3e546-6bde-44d0-b32f-12d143af3ef6',
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Content-Length': data.length,
                    },
                    agent: agent
                };

                const req = https.request(options, (res) => {
                    res.on('data', (d) => {
                        process.stdout.write(d)

                    })
                });

                req.on('error', (error) => {
                    console.error(error);
                    // clearInterval(timer);
                });

                req.write(data);
                req.end();
                setTimeout(function () {
                }, index * 200);
            }
        })
        .catch(function (error) {
            console.log('e2');
        });
}

const timer = setInterval(() => {
    console.warn('pause');
    click();
}, 60000);

//
