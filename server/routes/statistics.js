const express = require('express');

const statisticsController = require('../controllers/statisticsController');

const router = express.Router();

router.get('/', statisticsController.getStatistics, (req, res) => {
  res.sendStatus(200).json(res.locals.statistics);
});

router.put('/', statisticsController.updateStatistics, (req, res) => {
  res.sendStatus(200).json(res.locals.statistics);
});

// upsert: true on put request makes this post request redundent
// router.post('/create', statisticsController.createStatistics, (req, res) => {
//   res.sendStatus(200).json(res.locals.statistics);
// });

router.delete('/', statisticsController.clearStatistics, (req, res) => {
  res.sendStatus(200);
});

module.exports = router;