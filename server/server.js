const express = require('express');
const app = express();
const path = require('path');
const PORT = 3000;



if (process.env.NODE_ENV === 'production') {
  // statically serve everything in the build folder (main.js) on the route '/public'
  app.use('/public', express.static(path.join(__dirname, '../public')));
  // serve index.html on the route '/'
  app.get('/', (req, res) => {
    return res.status(200).sendFile(path.join(__dirname, '../index.html'));
  });
};
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));