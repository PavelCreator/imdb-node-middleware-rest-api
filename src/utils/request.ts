import express from 'express';

const https = require("https");
const http = require("http");
const urlLib = require("url");

const protocols: any = {
    "https:": https,
    "http:": http
};

// cb must be function
// this is the example for supporting both promise and callback

const ajax = (url: string, cb: any):Promise<Object> => {
    let responseData = "";
    return new Promise((resolve, reject) => {
        const parsedUrl = urlLib.parse(url, true);
        const options = {
            ...parsedUrl,
            method: "GET"
        };
        const req = protocols[parsedUrl.protocol].request(options, (res: express.Response) => {
            res.on("data", data => {
                responseData = responseData + data;
            });
            res.on("end", () => {
                if (cb && typeof cb === "function") {
                    cb(null, responseData);
                } else {
                    resolve(responseData);
                }
            });
        });
        req.on("error", (err: any) => {
            if (cb && typeof cb === "function") {
                cb(err, null);
            } else {
                reject(err);
            }
        });
        req.end();
    });
};
module.exports = ajax;