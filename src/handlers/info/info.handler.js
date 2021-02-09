const appInfo = require("../../config/appInfo");

const getAppInfo = (req, res, next) => {
  res.json(appInfo.info);
};

const infoHandler = {
  getAppInfo: getAppInfo
};

module.exports = infoHandler;
