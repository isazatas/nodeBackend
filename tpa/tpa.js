const tpaMSSQL = require('./tpa.mssql');
const url = require('url');
const { Console } = require('console');
class Tpa {
   async getAllTpa(req, res) {
      try {
         const output = await tpaMSSQL.getAllTpa();
         res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
         res.send(output);
      }
      catch (error) {
         console.log(error);
      }
   }
   async getTpa(req, res) {
      try {
         console.log(req.query.rg_ogmo);
         const output = await tpaMSSQL.getTpa(req.query.rg_ogmo);
         res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
         res.send(output);
      }
      catch (error) {
         console.log(error);
      }
   }
}
module.exports = new Tpa();