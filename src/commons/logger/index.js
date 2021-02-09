const bunyan = require("bunyan");
const { name, version } = require("../../../package.json");
const config = require("../../config");

let _logger = {};

let streams = [];
streams.push(
  {
    level: "debug",
    stream: config.debugLogStream,
  },
  {
    level: "info",
    path: config.infoFile,
  },
  {
    level: "error",
    path: config.infoFile,
  }
); //log to stdout

_logger.log = bunyan.createLogger({ name, version, streams: streams });

// child logs
_logger.getChildLogger = function(componentName) {
  return this.log.child({
    component: componentName,
  });
};

module.exports = _logger;
