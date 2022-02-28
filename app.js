const express = require('express');
//require('express-async-errors');

const cors = require('cors')
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


async function init() {
  const approuting = require('./modules');
  const appmodules = new approuting(app);
  appmodules.init();
}
init();
module.exports = app;