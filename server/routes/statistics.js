const express = require('express');

const statisticsController = require('../controllers/statisticsController');

const router = express.Router();

router.get('/',
  statisticsController.getDocument,
  statisticsController.setDate,
  (req, res) => {
    res.status(200).json(res.locals.statistics);
  });

router.get('/update',
  statisticsController.getDocument,
  statisticsController.setDate,
  statisticsController.updateStatistics,
  (req, res) => {
    res.status(200).json(res.locals.statistics);
  });

// upsert: true on put request makes this post request redundent
// router.post('/create', statisticsController.createStatistics, (req, res) => {
//   res.sendStatus(200).json(res.locals.statistics);
// });

router.get('/clear',
  statisticsController.getDocument,
  statisticsController.clearStatistics,
  (req, res) => {
    res.status(200).json(res.locals.statistics);
  });

module.exports = router;