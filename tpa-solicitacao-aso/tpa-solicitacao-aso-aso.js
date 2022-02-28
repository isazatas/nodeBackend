const tpaSolicitacaoAsoMSSQL = require('./tpa-solicitacao-aso.mssql');
const url = require('url');

class TpaSolicitacaoAso {
   async getTpaSolicitacaoAso(req, res) {
      try {
         console.log('cd_soli -->' + req.query.cd_solicitacao );
         const output = await tpaSolicitacaoAsoMSSQL.getSolicitacaoTpaAso(req.query.cd_solicitacao)
         res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
         res.send(output);
      }
      catch (error) {
         return res.status(400).send({
            message: 'Erro ! ****** '
           });
      }
   }
   async getTpaSolicitacaoAsoPrint(req, res) {
      try {
         console.log('cd_soli -->' + req.query.cd_solicitacao );
         const output = await tpaSolicitacaoAsoMSSQL.getTpaSolicitacaoAsoPrint(req.query.cd_solicitacao)
         res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
         res.send(output);
      }
      catch (error) {
         return res.status(400).send({
            message: 'Erro ! ****** '
           });
      }
   }
 
   async getTpaSolicitacaoExameAso(req, res) {
      try {
         console.log('cd_soli -->' + req.query.cd_solicitacao );
         const output = await tpaSolicitacaoAsoMSSQL.getTpaSolicitacaoExameAso(req.query.cd_solicitacao)
         res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
         res.send(output);
      }
      catch (error) {
         return res.status(400).send({
            message: 'Erro ! ****** '
           });
      }
   }


   async insertTpaSolicitacaoAso(req, res) 
   {
      try{      
         console.log("--insert--");
         console.log(req.body);
         const output = await tpaSolicitacaoAsoMSSQL.insertSolicitacaoTpaAso(req.body)
         console.log ('output insert-->' + output)
         //console.log(res)
         res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
         res.send(output)
      //   res.status(201).send("OK");
      } catch (error) {
         return res.status(400).send({
            message: 'Erro ! ****** ao incluir Solicitacao Aso TPA ! **********'
           });
      }
   }
}


module.exports = new TpaSolicitacaoAso();