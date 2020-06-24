'use strict';
var log4js = require('log4js');

global.config = global.config || {};

global.config.logger = global.config.logger || {};

log4js.configure({
    appenders: {
        appApi: {
            "type": "file",
            "filename": "logs/app.log",
            "maxLogSize": 1048576,
            "backups": 5,
            "layout": {
                "type": "pattern",
                "pattern": "%d{ddMMyyhhmmss}::%p::%c::%m",
                "replaceConsole": true
            }
        }
    },
    categories: { default: { appenders: ["appApi"], level: "info" } }
});



// var logFile = require('./log4js_configuration.json');

// var logJsonReplacer = function (key, value) {
//     if (key) {
//         if (typeof (value) === 'object') {
//             return '[Object]';
//         }
//         return value;
//     } else {
//         return value;
//     }
// };

// log4js.configure(logFile);

exports.logger = log4js;

exports.logger.objectToLog = function (jsonInput) {
    if (jsonInput === undefined) {
        return '';
    }
    if (typeof (jsonInput) !== 'object') {
        return jsonInput;
    } else if (jsonInput.constructor === Array) {
        return '[Object]';
    }
    var jsonString = JSON.stringify(jsonInput, logJsonReplacer);
    return jsonString.replace(/['"]+/g, '')
        .replace(/[:]+/g, ': ')
        .replace(/[,]+/g, ', ')
        .slice(1, -1);
};