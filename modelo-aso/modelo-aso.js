const modeloAsoMSSQL = require('./modelo-aso.mssql');
const url = require('url');
const { rmSync } = require('fs');
const { set } = require('lodash');
const { resolve4 } = require('dns');

class ModeloAso {
   async getModeloAso(req, res) {
      try {
         const output = await modeloAsoMSSQL.getModeloAso(req.cd_modelo_aso)
        // console.log(res);
         res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
         res.send(output);
      }
      catch (error) {
         console.log('errando...', error);
      }
   }

   async getModeloAsoDisponiveisTpa(req, res) {
      try {
      //   console.log('params');
       //  console.log(req.query);
         const output = await modeloAsoMSSQL.getModeloAsoDisponiveisTpa(req.query.cd_categ, req.query.habilitacoes)
        // console.log(res);
         res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
         res.send(output);
      }
      catch (error) {
         console.log('errando...', error);
      }
   }


   async insertModeloAso(req, res, next ) 
   {
      try{      
         const output = await modeloAsoMSSQL.insertModeloAso(req.body)
         console.log ('output -->' + output)
         //console.log(res)
         res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
         res.send(output)
      //   res.status(201).send("OK");
      } catch (error) {
         return res.status(400).send({
            message: 'Erro ! ****** ao incluir modelo !'
           });
      }
   }
      // async insertModeloAso(req, res, next ) 
      // {
      //    try{      
      //       const output = await modeloAsoMSSQL.insertModeloAso(req.body)
      //       console.log ('output -->' + output)
      //       //console.log(res)
      //       res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
      //       res.send(output)
      //    //   res.status(201).send("OK");
      //    } catch (error) {
      //       return res.status(400).send({
      //          message: 'Erro ! ****** ao incluir modelo !'
      //         });
      //    }
   
 }


module.exports = new ModeloAso();