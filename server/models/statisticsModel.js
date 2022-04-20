const mongoose = require('mongoose');

const MONGO_URI =
  'mongodb+srv://mwatson:EIXF9PIqHrbrgxO2@sudokustatistics.iouw6.mongodb.net/sudokuStatistics?retryWrites=true&w=majority';
const dbOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: 'sudokuStatistics',
};

// establish initial db connection
mongoose.connect(MONGO_URI, dbOptions, (err) => {
  if (err) console.log(err);
  else console.log('Connected to Mongo DB sudokuStatistics')
});

const statisticSchema = new mongoose.Schema({
  storedDate: Number,
  storedMonth: Number,
  storedYear: Number,
  solvedToday: Number,
  solvedThisMonth: Number,
  solvedTotal: Number,
})

const Statistic = mongoose.model('Statistic', statisticSchema);

module.exports = Statistic;