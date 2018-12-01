import express from 'express';

const https = require("https");
const http = require("http");
const urlLib = require("url");

const protocols: any = {
    "https:": https,
    "http:": http
};

export const ajax = (url: string):Promise<Object> => {
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
                resolve(responseData);
            });
        });
        req.on("error", (err: any) => {
            reject(err);
        });
        req.end();
    });
};