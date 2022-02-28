const exameMSSQL = require('./exame.mssql');
const url = require('url');
class Exame {
   async getExame(req, res) {
      try {
         const output = await exameMSSQL.getExame();
         res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
         res.send(output);
      }
      catch (error) {
         console.log(error);
      }
   }
   async getExamesPorCodigos(req, res) {
      try {

         const output = await exameMSSQL.getExamesPorCodigos(req.body);
         res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
         res.send(output);
      }
      catch (error) {
         console.log(error);  
      }
   }
}
module.exports = new Exame();