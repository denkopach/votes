// const ProxyList = require('free-proxy');
var ProxyLists = require('proxy-lists');

// const proxyList = new ProxyLists();
var HttpsProxyAgent = require('https-proxy-agent');

var passport = require('passport')
    , util = require('util')
    , BasicStrategy = require('passport-http').BasicStrategy
    , AnonymousStrategy = require('passport-anonymous').Strategy;

function click() {
    const timerMain = setInterval(() => {
        ProxyLists.getProxies({
            // options
            // countries: ['us', 'ca']
        })
            .on('data', function (proxies) {
                proxies.forEach((dataProxy, index) => {
                    const pauseBetweenClicks = 1000;
                    // const timer = setInterval(() => {
                        const https = require('https');

                        const data = JSON.stringify({
                            isNegative: false
                        });
                        if (!dataProxy || !dataProxy.ipAddress || !dataProxy.port) {
                            // clearInterval(timer);
                            return;
                        }
                        console.log(dataProxy.ipAddress + ':' + dataProxy.port);
                        const agent = new HttpsProxyAgent('http://' + dataProxy.ipAddress + ':' + dataProxy.port);
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
                            // console.log(`statusCode: ${res.statusCode}`);

                            res.on('data', (d) => {
                                process.stdout.write(d)
                                if (!d || !d.length) {
                                    // clearInterval(timer);
                                }
                            })
                        });

                        req.on('error', (error) => {
                            console.error(error);
                            // clearInterval(timer);
                        });
                        // let pause = setTimeout(function () {
                        // }, 1000000);
                        req.write(data);
                        req.end(() => {
                            // clearInterval(pause);
                        });
                    // }, pauseBetweenClicks);


                })
            });

        // proxyList.get()
        //     .then(function (proxies) {console.log
        // console.log(proxies.length);
        //     proxies.forEach(dataProxy => {
        // proxyList.random()
        //     .then(function (dataProxy) {
        //
        //
        //         const pauseBetweenClicks = 1000;
        //         const timer = setInterval(() => {
        //             const https = require('https');
        //
        //             const data = JSON.stringify({
        //                 isNegative: false
        //             });
        //             if (!dataProxy || !dataProxy.ipAddress || !dataProxy.port) {
        //                 clearInterval(timer);
        //                 return;
        //             }
        //             console.log(dataProxy.ipAddress + ':' + dataProxy.port);
        //             const agent = new HttpsProxyAgent('http://' + dataProxy.ipAddress + ':' + dataProxy.port);
        //             const options = {
        //                 host: "proxy",
        //
        //                 hostname: 'voting.playbuzz.com',
        //                 port: 443,
        //                 path: '/ranking/8a768991-52ad-42cc-9608-4862eaefb02e/f3b3e546-6bde-44d0-b32f-12d143af3ef6',
        //                 method: 'POST',
        //                 headers: {
        //                     'Content-Type': 'application/json',
        //                     'Content-Length': data.length,
        //                 },
        //                 agent: agent
        //             };
        //
        //             const req = https.request(options, (res) => {
        //                 // console.log(`statusCode: ${res.statusCode}`);
        //
        //                 res.on('data', (d) => {
        //                     process.stdout.write(d)
        //                     if (!d || !d.length) {
        //                         clearInterval(timer);
        //                     }
        //                 })
        //             });
        //
        //             req.on('error', (error) => {
        //                 console.error(error);
        //                 clearInterval(timer);
        //             });
        //
        //             req.write(data);
        //             req.end();
        //         }, pauseBetweenClicks);
        //
        //
        //     })
        // .catch(function (error) {
        //     console.log('e')
        //     throw new Error(error);
        // });


    }, 10000);
    // .catch(function (error) {
    //     console.log('e2');
    //     throw new Error(error);
    // });
}
//
// ,
// 10000
// )
// ;
// }
click();
//

//
