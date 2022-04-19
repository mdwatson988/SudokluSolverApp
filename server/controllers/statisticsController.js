const { model } = require('mongoose');
const Statistic = require('../models/statisticsModel');

const statisticsController = {};

// need to work out how to select my one statistics document???
statisticsController.getStatistics = async (req, res, next) => {
  await Statistic.findOne({}, (err, data) => {
    if (err) return next({
      log: `Error occured in statisticsController.getStatistics: ${err}`,
      status: 400,
      message: { err: 'Error occured when getting statistics' }
    });
    res.locals.statistics = data;
    return next();
  })
};

statisticsController.updateStatistics = async (req, res, next) => {
  await 
};

// put request has upsert = true so not necessary to create new statistics
// statisticsController.createStatistics = async (req, res, next) => {
//   await 
// };

statisticsController.clearStatistics = async (req, res, next) => {
  await 
};

module.exports = statisticsController;