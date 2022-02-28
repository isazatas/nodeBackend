const mssqlcon = require('../dbconnection');

class TpaSolicitacaoAsoMSSQL { 

  async getSolicitacaoTpaAso(cd_solicitacao) {
    console.log ('Solicitacoes do TPA')
    const conn = await mssqlcon.getConnection();
    const res = await conn.request()
          .input('_cd_solicitacao', cd_solicitacao)
          .query("SELECT [cd_solicitacao_aso] ,[cd_modelo_aso]  ,[cd_tipo_aso]  ,[rg_ogmo]  ,[dt_solicitacao] \
                  ,[ano_ref] ,[status] ,[apto] ,[dt_retorno] ,[risco_poeira] ,[risco_ruido]  ,[risco_calor] ,[risco_ergo] \
                  ,[risco_altura] ,[observacao] ,[cd_medico] \
                  FROM [seguranca_trabalho].[dbo].[med_tpa_solicitacao_aso]   \
                  WHERE [cd_solicitacao_aso] = @_cd_solicitacao AND [status] != 'C' ")
    return res.recordset;
  }

  async getTpaSolicitacaoAsoPrint(cd_solicitacao) {
    console.log ('Impressao da Solicitacoes do TPA')
    const conn = await mssqlcon.getConnection();
    const res = await conn.request()
          .input('_cd_solicitacao', cd_solicitacao)
          .query("SELECT sol.[cd_solicitacao_aso] ,sol.[cd_modelo_aso]  ,sol.[cd_tipo_aso]  ,sol.[rg_ogmo]  ,sol.[dt_solicitacao] \
                            ,sol.[ano_ref] ,sol.[status] ,sol.[apto] ,sol.[dt_retorno] ,sol.[risco_poeira] ,sol.[risco_ruido] \
                            ,sol.[risco_calor] ,sol.[risco_ergo] \
                            ,sol.[risco_altura] ,sol.[observacao] ,sol.[cd_medico]  \
                            ,tra.[nm_trab], tra.[cpf] ,f.[ds_funcao], c.[desc_categ] \
                            ,tipo.[descricao] as [tipo_descricao] \
                            ,exame.[descricao] as [exame_descricao] \
                  FROM	   [seguranca_trabalho].[dbo].[med_tpa_solicitacao_aso] sol \
                          INNER JOIN [seguranca_trabalho].[dbo].[med_modelo_aso] modelo ON modelo.[cd_modelo_aso] = sol.[cd_modelo_aso]   \
                          INNER JOIN [recurso_humano].[dbo].[trabalhador] tra ON tra.[rg_ogmo] = sol.[rg_ogmo] \
                          INNER JOIN [operacoes].[dbo].[funcao] f				ON modelo.[cd_func] = f.[cd_func] \
                          INNER JOIN [operacoes].[dbo].[faina_categoria] c    ON modelo.[cd_categ]  = c.[cod_categ] \
                          INNER JOIN [seguranca_trabalho].[dbo].[med_tipo_aso] tipo ON sol.cd_tipo_aso = tipo.cd_tipo_aso \
                          INNER JOIN [seguranca_trabalho].[dbo].[med_solicitacao_exame_aso] ex_aso ON ex_aso.[cd_solicitacao_aso] = sol.[cd_solicitacao_aso] \
                          INNER JOIN [seguranca_trabalho].[dbo].[med_exame] exame  ON  ex_aso.[cd_exame] = exame.[cd_exame]  \
                  WHERE sol.[cd_solicitacao_aso] = @_cd_solicitacao AND sol.[status] != 'C' ")
    return res.recordset;
  }


  async getTpaSolicitacaoExameAso(cd_solicitacao) {
    console.log ('Solicitacoes de exames do TPA')
    const conn = await mssqlcon.getConnection();
    const res = await conn.request()
          .input('_cd_solicitacao', cd_solicitacao)
          .query("SELECT [cd_solicitacao_exame_aso] ,[cd_solicitacao_aso] ,[cd_exame] ,[dt_exame], \
                         [resultado] ,[observacao] \
                  FROM [seguranca_trabalho].[dbo].[med_solicitacao_exame_aso]   \
                  WHERE [cd_solicitacao_aso] = @_cd_solicitacao ")
    return res.recordset;
  }
  
  
  async insertSolicitacaoTpaAso(novaSolicitacao) {
     const conn = await mssqlcon.getConnection();
     // const res = await conn.request()
     const res1 = await conn.request()
     console.log('Inserindo Solicitação TPA - MSSQL');
     console.log('Inserindo Solicitacao ASO - Tipo: ' +  novaSolicitacao['solicitacao'].cd_tipo_aso + 
                                               ' modelo: ' +  novaSolicitacao['solicitacao'].cd_modelo_aso +
                                               ' rg_ogmo: ' + novaSolicitacao['solicitacao'].rg_ogmo +
                                               ' AnoRef: ' +  novaSolicitacao['solicitacao'].ano_ref);
      const cd_modelo_aso = novaSolicitacao['solicitacao'].cd_modelo_aso
      res1
        .input('_cd_modelo_aso',cd_modelo_aso)
        .input('_cd_tipo_aso',novaSolicitacao['solicitacao'].cd_tipo_aso)
        .input('_rg_ogmo', novaSolicitacao['solicitacao'].rg_ogmo)
        .input('_dt_solicitacao', new Date())
        .input('_ano_ref',novaSolicitacao['solicitacao'].ano_ref)

        .query("INSERT INTO [seguranca_trabalho].[dbo].[med_tpa_solicitacao_aso] \
                          ([cd_modelo_aso]  ,[cd_tipo_aso] ,[rg_ogmo] ,[dt_solicitacao] ,[ano_ref] ,[status] ,[risco_poeira], \
                            [risco_ruido] ,[risco_calor] ,[risco_ergo] ,[risco_altura] ,[cd_medico]) \
                            OUTPUT INSERTED.cd_solicitacao_aso    \
                VALUES (@_cd_modelo_aso, @_cd_tipo_aso,  @_rg_ogmo, @_dt_solicitacao , @_ano_ref, \
                        'A', 'N', 'N' , 'N' , 'N' , 'N' , 1)")
        .then(result => {
                console.log("Tabela med_tpa_solicitacao_aso inserido com sucesso");
               // console.log(result);
                const cd_solicitacao_aso = result['recordset'][0].cd_solicitacao_aso
                console.log("cd_solicitacao_aso: " + result['recordset'][0].cd_solicitacao_aso);

                console.log('Inserindo exames para Solicitacao:' + cd_solicitacao_aso  + 'Modelo:' + cd_modelo_aso)
                
                res1
                  .input('_cd_solicitacao_aso',cd_solicitacao_aso)
                  .input('_cd_modelo_aso2',cd_modelo_aso)
                  .query("INSERT INTO [seguranca_trabalho].[dbo].[med_solicitacao_exame_aso] \
                                      ([cd_solicitacao_aso] ,[cd_exame]) \
                          SELECT @_cd_solicitacao_aso, ex.[cd_exame]                          \
                          FROM [seguranca_trabalho].[dbo].[med_exames_aso] ex \
                          WHERE ex.[cd_modelo_aso] = @_cd_modelo_aso2" )
                .then(result2 => {  
                    console.log("solicitacao de exames incluidos com sucesso (med_solicitacao_exame_aso)");

                  }).catch(err => {
                    console.log('Erro ao gravar exames da solicitacao: ',err.message);
                     throw err;
                    //return result;
                  })
        })
        .catch(erro => {
                console.log(' **** Erro Inserindo solicitacao  **** : ',erro.message);
                console.log(' **** Erro CODE Inserindo solicitacao  **** : ',erro.code);
                throw erro;
        });
        
        // console.log(res1.recordset);
        // return res1.recordset;// console.log(res);       
 
  }
//   async insertModeloAso(novoModeloAso) {
//     try{
//           const conn = await mssqlcon.getConnection();
//           // const res = await conn.request()
//           const result = await conn.request()
//           Object.keys(novoModeloAso['novoModeloAso']).forEach(function(key) {
//             console.log('Inserindo Modelo ASO - Tipo: ' +  novoModeloAso['novoModeloAso'][key].cd_tipo_aso + ' Categ: ' + 
//                                                   novoModeloAso['novoModeloAso'][key].cd_categ + ' Funcao: ' +
//                                                   novoModeloAso['novoModeloAso'][key].cd_func);
//             result
//               .input('_cd_tipo_aso',novoModeloAso['novoModeloAso'][key].cd_tipo_aso)
//               .input('_cd_categ', novoModeloAso['novoModeloAso'][key].cd_categ)
//               .input('_cd_func', novoModeloAso['novoModeloAso'][key].cd_func)
//               .query("INSERT INTO [seguranca_trabalho].[dbo].[med_modelo_aso] \
//                                   ([cd_tipo_aso] ,[cd_categ] ,[cd_func] , [validade]) \
//                       OUTPUT INSERTED.cd_modelo_aso    \
//                       VALUES (@_cd_tipo_aso, @_cd_categ, @_cd_func, '122024')")
         
//           })
          
//           if (result.rowsAffected != 0) {
//               const cd_modelo_aso = result['recordset'][0].cd_modelo_aso
//               console.log("cd_modelo: " + result['recordset'][0].cd_modelo_aso);
//               console.log("Inseriando exames no modelo aso: " + result['recordset'][0].cd_modelo_aso);
              
//             //  const result1 = await conn.request()
//               Object.keys(novoModeloAso['exames']).forEach(function(key) {
//                 console.log('Inserindo....' + novoModeloAso['exames'][key].cd_exame + ' - ' + 
//                                                     novoModeloAso['exames'][key].descricao);
                                          
//                     result
//                         .input('_cd_modelo_aso',cd_modelo_aso)
//                         .input('_cd_exame', novoModeloAso['exames'][key].cd_exame)
//                         .query("INSERT INTO [seguranca_trabalho].[dbo].[med_exames_aso] \
//                                             ([cd_modelo_aso] , [cd_exame]) \
//                                 VALUES (@_cd_modelo_aso, @_cd_exame)")
                      
//                     console.log("exames incluidos com sucesso");
//                     return result.recordset;
//                   // console.log(result1);
//               })
//           }          
//         }
//         catch (err) {
//                  console.log(' **** Erro Inserindo Modelo  **** : ' + err.message);
//                  console.error(err);
//                  throw  err;
//           };
   
//  }

    async getModeloAsoDisponiveisTpa(cd_categ, habilitacoes){
      console.log("Modelos Disponiveis TPA");
     //console.log('cd_categ: ' + cd_categ);
     // console.log(habilitacoes);
     // let hab = habilitacoes

     
      const qry = "SELECT  aso.cd_tipo_aso, aso.cd_func, aso.cd_categ, aso.cd_modelo_aso,\
                  f.[ds_funcao], c.[desc_categ], tipo.descricao \
                  FROM [seguranca_trabalho].[dbo].[med_modelo_aso] aso \
                  INNER JOIN [operacoes].[dbo].[funcao] f				ON aso.[cd_func] = f.[cd_func] \
                  INNER JOIN [operacoes].[dbo].[faina_categoria] c    ON aso.[cd_categ]  = c.[cod_categ] \
                  INNER JOIN [seguranca_trabalho].[dbo].[med_tipo_aso] tipo ON aso.cd_tipo_aso = tipo.cd_tipo_aso \
                  WHERE aso.[cd_categ] = " + cd_categ + " AND " +  "aso.cd_func IN (" + habilitacoes + ")  \
                  ORDER BY  aso.cd_tipo_aso, f.[ds_funcao]"
     
     // console.log("qry ---> " + qry);
      const conn = await mssqlcon.getConnection();
      const res = await conn.request()
                        .query(qry)
      
      //console.log(res.recordset);
      return res.recordset;


      }




}
  
   

module.exports = new TpaSolicitacaoAsoMSSQL();

