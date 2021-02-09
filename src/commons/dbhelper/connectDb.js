/**
 * DB connection function
 */
function connectDb(mongoose, config) {
  return mongoose.connect(config.db.MONGO_SERVER_CONN_STR, {
    autoReconnect: true,
    reconnectTries: config.db.reconnectTries,
    reconnectInterval: config.db.reconnectInterval,
    poolSize: config.db.poolSize,
    keepAlive: 1,
    useNewUrlParser: true,
    useFindAndModify: false,
  });
}

module.exports = connectDb;
