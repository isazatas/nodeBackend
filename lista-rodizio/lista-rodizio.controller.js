//const listarodizio = require('./lista-rodizio');
const cors = require('cors')
//const express = require('express');
//const router = express.Router();
const rotas = require('../rotas');

const corsOptions = {
  origin: 'http://localhost:4200',
           optionsSuccessStatus: 200 
}

class ListaRodizioController {
    constructor(app) {

      app.use(cors(corsOptions))
      app.use('/', rotas);
    }
 }
module.exports = ListaRodizioController;