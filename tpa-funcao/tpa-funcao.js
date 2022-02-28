const tpaFuncaoMSSQL = require('./tpa-funcao.mssql');
const url = require('url');
class TpaFuncao {
   async getTpaFuncao(req, res) {
      try {
         const cd_categ = url.parse(req.url,true).query.cd_categ
         const output = await tpaFuncaoMSSQL.getTpaFuncao(cd_categ);
         res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
         res.send(output);
      }
      catch (error) {
         console.log(error);
      }
   }

   async getTpaFuncaoDisponivelAso(req, res) {
      try {
         const cd_categ = url.parse(req.url,true).query.cd_categ
         const cd_tipo_aso = url.parse(req.url,true).query.cd_tipo_aso
         const output = await tpaFuncaoMSSQL.getTpaFuncaoDisponivelAso(cd_categ,cd_tipo_aso);
         res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
         res.send(output);
      }
      catch (error) {
         console.log(error);
      }
   }
   async getTpaFuncaoHabilitadas(req, res) {
      try {
         const rg_ogmo = url.parse(req.url,true).query.rg_ogmo
         const output = await tpaFuncaoMSSQL.getTpaFuncaoHabilitadas(rg_ogmo);
         res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
         res.send(output);
      }
      catch (error) {
         console.log(error);
      }
   }

}
module.exports = new TpaFuncao();