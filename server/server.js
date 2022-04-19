const express = require('express');
const path = require('path');

const app = express();

const statisticsRouter = require('./routes/statistics');
const apiRouter = require('./routes/api');

const PORT = 3000;

// handle parsing request body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// handle requests for static files in production mode
if (process.env.NODE_ENV === 'production') {
  // statically serve everything in the build folder (main.js) on the route '/public'
  app.use('/public', express.static(path.join(__dirname, '../public')));
  // serve index.html on the route '/'
  app.get('/', (req, res) => {
    return res.status(200).sendFile(path.join(__dirname, '../index.html'));
  });
};

// statistics end point route handler
app.use('/statistics', statisticsRouter);

// api end point route handler for future use
app.use('/api', apiRouter);

// catch-all route handler for any requests to an unknown route
app.use((req, res) => res.status(404).send('Sorry, page not found'));

// global eror handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));

module.exports = app;