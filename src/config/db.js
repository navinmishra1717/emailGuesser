//supplies required db configs

module.exports = {
  db: {
    MONGO_SERVER_CONN_STR:
      process.env.MONGO_SERVER_CONN_STR || "mongodb://127.0.0.1:27017/yipldb",
    poolSize: process.env.poolSize || 2,
    reconnectTries: process.env.reconnectTries || Number.MAX_VALUE,
    reconnectInterval: process.env.reconnectInterval || 1000,
  },
};
