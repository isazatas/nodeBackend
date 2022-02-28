const tpaEspecializacaoMSSQL = require('./tpa-especializacao.mssql');
const url = require('url');
class TpaEspecializacao {
   async getTpaEspecializacao(req, res) {
      try {
         const rg_ogmo = url.parse(req.url,true).query.rg_ogmo
         const output = await tpaEspecializacaoMSSQL.getTpaEspecializacao(rg_ogmo);
         res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
         res.send(output);
      }
      catch (error) {
         console.log(error);
      }
   }

}
module.exports = new TpaEspecializacao();