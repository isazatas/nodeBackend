const tipoAsoMSSQL = require('./tipo-aso.mssql');
const url = require('url');
class TipoAso {
   async getTipoAso(req, res) {
      try {
         const output = await tipoAsoMSSQL.getTipoAso();
         res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
         res.send(output);
      }
      catch (error) {
         console.log(error);
      }
   }
}
module.exports = new TipoAso();