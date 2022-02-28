const MedicoMSSQL = require('./medico.mssql');
const url = require('url');
class Medico {
   async getAllMedico(req, res) {
      try {
         const output = await MedicoMSSQL.getAllMedico();
         res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
         res.send(output);
      }
      catch (error) {
         console.log(error);
      }
   }
   async getMedico(req, res) {
      try {
         console.log(req.query);
         const output = await MedicoMSSQL.getMedico(req.query.cd_medico);
         res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
         res.send(output);
      }
      catch (error) {
         console.log(error);
      }
   }
}
module.exports = new Medico();