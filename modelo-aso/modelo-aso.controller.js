//const listarodizio = require('./lista-rodizio');
const cors = require('cors')
//const express = require('express');
//const router = express.Router();
const rotas = require('../rotas');

const corsOptions = {
  origin: 'http://localhost:4200',
           optionsSuccessStatus: 200 
}

class ModeloAsoController {
    constructor(app) {
/*       router.get('/', listarodizio.getListaRodizio);
      router.post('/atualizalistarodizio', listarodizio.atualizaListaRodizio); */
      app.use(cors(corsOptions))
      app.use('/', rotas);
    }
 }
module.exports = ModeloAsoController;