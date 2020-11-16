const log4js = require('log4js');

global.config = global.config || {};

global.config.logger = global.config.logger || {};

log4js.configure({
  appenders: {
    appApi: {
      type: 'file',
      filename: 'logs/app.log',
      maxLogSize: 1048576,
      backups: 5,
      layout: {
        type: 'pattern',
        pattern: '%d{ddMMyyhhmmss}::%p::%c::%m',
        replaceConsole: true,
      },
    },
  },
  categories: { default: { appenders: ['appApi'], level: 'info' } },
});

exports.logger = log4js;

exports.logger.objectToLog = (jsonInput) => {
  if (jsonInput === undefined) {
    return '';
  }
  if (typeof (jsonInput) !== 'object') {
    return jsonInput;
  } if (jsonInput.constructor === Array) {
    return '[Object]';
  }
  const jsonString = JSON.stringify(jsonInput, logJsonReplacer);
  return jsonString.replace(/['"]+/g, '')
    .replace(/[:]+/g, ': ')
    .replace(/[,]+/g, ', ')
    .slice(1, -1);
};
