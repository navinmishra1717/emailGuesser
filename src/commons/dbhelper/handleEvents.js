const { log } = require("../logger");
const handleEvents = function(db) {
  let mongoStat = {
    status: "1",
    updated: new Date()
  };
  db.on("connecting", function() {
    log.info("Connecting to MongoDB...");
  });
  db.on("connected", function() {
    mongoStat.status = "1";
    mongoStat.updated = new Date();
    log.info("MongoDB connected!!");
  });
  db.on("disconnected", function() {
    if (mongoStat.status === "1") {
      mongoStat.updated = new Date();
      log.error("MongoDB disconnected!!");
    }
    mongoStat.status = "0";
  });
  db.on("reconnected", function() {
    mongoStat.updated = new Date();
    mongoStat.status = "1";
    log.info("MongoDB reconnected!");
  });
  db.on("error", function(err) {
    if (mongoStat.status === "1") {
      mongoStat.updated = new Date();
    }
    mongoStat.status = "0: " + err;
    log.error({ error: err }, "MongoDB connection error.");
    process.exit(0);
  });
};

module.exports = handleEvents;
