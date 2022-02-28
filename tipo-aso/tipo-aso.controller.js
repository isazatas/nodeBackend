const cors = require('cors')
const rotas = require('../rotas');

const corsOptions = {
  origin: 'http://localhost:4200',
           optionsSuccessStatus: 200 
}

class TipoAsoController {
    constructor(app) {
      app.use(cors(corsOptions))
      app.use('/', rotas);
    }
 }
module.exports = TipoAsoController;