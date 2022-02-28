const listarodizioMSSQL = require('./lista-rodizio.mssql');
const url = require('url');
class ListaRodizio {
   async getListaRodizio(req, res) {
      try {
         const output = await listarodizioMSSQL.getListaRodizio();
         res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
         res.send(output);
      }
      catch (error) {
         console.log(error);
      }
   }
   async atualizaListaRodizio(req, res) {
      try {

         const output = await listarodizioMSSQL.atualizaListaRodizio(req.body);
         res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
         res.send(output);
      }
      catch (error) {
         console.log(error);
      }
   }

   async getespecierodizio(req, res){
      try {
         const output = await listarodizioMSSQL.getEspecieRodizio();
         res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
         res.send(output);
      }
      catch (error) {
         console.log(error);
      }
   }

   async gettiporodizio(req, res){
      try {
         const output = await listarodizioMSSQL.getTipoRodizio();
         res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
         res.send(output);
      }
      catch (error) {
         console.log(error);
      }
   }
   
   async getlistaescalarodiziovigentes(req, res){
      try {
         const cd_artigo = url.parse(req.url,true).query.cd_artigo
         const cd_especie = url.parse(req.url,true).query.cd_especie

         const output = await listarodizioMSSQL.getListaEscalaRodizioVigentes(cd_artigo, cd_especie);
         res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
         res.send(output);
      }
      catch (error) {
         console.log(error);
      }
   }
   async getlistaescalarodiziorecentes(req, res){
      try {
         const cd_artigo = url.parse(req.url,true).query.cd_artigo
         const cd_especie = url.parse(req.url,true).query.cd_especie

         const output = await listarodizioMSSQL.getListaEscalaRodizioRecentes(cd_artigo, cd_especie);
         res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
         res.send(output);
      }
      catch (error) {
         console.log(error);
      }
   }

}
module.exports = new ListaRodizio();