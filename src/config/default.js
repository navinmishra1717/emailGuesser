// supplies env for server overridden by process.env

/* eslint no-undef: 0 */ // For allowing process.env

module.exports = {
  apiPort: process.env.API_PORT || 3000,
  debugLogStream: process.env.debugLogStream || process.stdout,
  infoFile: process.env.infoLogFile || "src/log/server.log",
  writtenBy: process.env.writtenBy || "navin",
};
