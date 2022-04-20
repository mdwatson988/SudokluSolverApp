const Statistic = require('../models/statisticsModel');

// helper function for quickly generating appropriate error objects
const createErr = (errInfo) => {
  const { method, type, status, err } = errInfo;
  return {
    log: `statisticsController.${method} ${type}: ERROR: ${
      typeof err === 'object' ? JSON.stringify(err) : err
      }`,
    status: status,
    message: {
      err: `Error occurred in statisticsController.${method}. Check server logs for more details.`,
    },
  };
};

const statisticsController = {};

// there should only ever be a single statistics document
statisticsController.getDocument = (req, res, next) => {
  const currDate = new Date();
  Statistic.findOne({}, (err, document) => {
    if (err) return next(
      createErr({
        method: 'getDocument',
        type: 'when finding document',
        status: 400,
        err: err,
      })
    )
    res.locals.statistics = document;
    res.locals.date = currDate;
    return next();
  })
};

// set date has upsert: true so not necessary to create new statistics document w/ post request
statisticsController.setDate = (req, res, next) => {
  const currDate = res.locals.date;
  const { storedDate, storedMonth, storedYear } = res.locals.statistics;
  const updateObj = {};

  if (currDate.getYear() && currDate.getYear() === storedYear) {
    if (currDate.getMonth() === storedMonth) {
      if (currDate.getDay() !== storedDate) {
        updateObj.solvedToday = 0;
        updateObj.storedDate = currDate.getDay();
      }
    }
    else {
      updateObj.solvedToday = 0;
      updateObj.storedDate = currDate.getDay();
      updateObj.solvedThisMonth = 0;
      updateObj.storedMonth = currDate.getMonth();
    }
  }
  else {
    updateObj.solvedToday = 0;
    updateObj.storedDate = currDate.getDay();
    updateObj.solvedThisMonth = 0;
    updateObj.storedMonth = currDate.getMonth();
    updateObj.storedYear = currDate.getYear();
  }

  if (Object.keys(updateObj).length) {
    Statistic.findOneAndUpdate({},
      updateObj,
      { new: true, upsert: true },
      (err, updatedData) => {
        if (err) return next(
          createErr({
            method: 'setDate',
            type: 'when updating date',
            status: 400,
            err: err,
          })
        )
        res.locals.statistics = updatedData;
      });
  }
  return next();
};

statisticsController.updateStatistics = (req, res, next) => {
  const { solvedToday, solvedThisMonth, solvedTotal } = res.locals.statistics;
  const updateObj = {
    solvedToday: solvedToday + 1,
    solvedThisMonth: solvedThisMonth + 1,
    solvedTotal: solvedTotal + 1,
  }

  Statistic.findOneAndUpdate({},
    updateObj,
    { new: true },
    (err, updatedData) => {
      if (err) return next(
        createErr({
          method: 'updateStatistics',
          type: 'when updating statistics',
          status: 400,
          err: err,
        })
      )
      res.locals.statistics = updatedData;
      return next();
    });
};

statisticsController.clearStatistics = (req, res, next) => {
  const currDate = new Date();
  const clearedObj = {
    storedDate: currDate.getDate(),
    storedMonth: currDate.getMonth(),
    storedYear: currDate.getYear(),
    solvedToday: 0,
    solvedThisMonth: 0,
    solvedTotal: 0,
  }

  Statistic.findOneAndUpdate({},
    clearedObj,
    { new: true },
    (err, clearedData) => {
      if (err) return next(
        createErr({
          method: 'clearStatistics',
          type: 'when clearing staistics',
          status: 400,
          err: err,
        })
      )
      res.locals.statistics = clearedData;
      return next();
    });
};

module.exports = statisticsController;