const mssqlcon = require('../dbconnection');

class ModeloAsoMSSQL { 

  async getModeloAso() {
    const conn = await mssqlcon.getConnection();
    const res = await conn.request()
          .query("select ordem_escala,  rg_ogmo , nm_trab \
                from [recurso_humano].[dbo].[trabalhador] \
                where cd_categ='3' and (dt_desrec is null or dt_desrec = '') order by ordem_escala");
    return res.recordset;
  }

  async insertModeloAso(novoModeloAso) {
     const conn = await mssqlcon.getConnection();
     // const res = await conn.request()
     const res1 = await conn.request()
     Object.keys(novoModeloAso['novoModeloAso']).forEach(function(key) {
        console.log('Inserindo Modelo ASO - Tipo: ' +  novoModeloAso['novoModeloAso'][key].cd_tipo_aso + ' Categ: ' + 
                                              novoModeloAso['novoModeloAso'][key].cd_categ + ' Funcao: ' +
                                              novoModeloAso['novoModeloAso'][key].cd_func);
        res1
          .input('_cd_tipo_aso',novoModeloAso['novoModeloAso'][key].cd_tipo_aso)
          .input('_cd_categ', novoModeloAso['novoModeloAso'][key].cd_categ)
          .input('_cd_func', novoModeloAso['novoModeloAso'][key].cd_func)
          .query("INSERT INTO [seguranca_trabalho].[dbo].[med_modelo_aso] \
                              ([cd_tipo_aso] ,[cd_categ] ,[cd_func] , [validade]) \
                  OUTPUT INSERTED.cd_modelo_aso    \
                  VALUES (@_cd_tipo_aso, @_cd_categ, @_cd_func, '122024')")
          .then(result => {
              //      console.log(result)
                  const cd_modelo_aso = result['recordset'][0].cd_modelo_aso
                  console.log("cd_modelo: " + result['recordset'][0].cd_modelo_aso);
                  console.log("Inserindo exames no modelo aso: " + result['recordset'][0].cd_modelo_aso);
                  
                  let qry = 'INSERT INTO [seguranca_trabalho].[dbo].[med_exames_aso] \
                                        ([cd_modelo_aso] , [cd_exame]) \
                                        SELECT '      
                  let values = ''
                  // Monta a query com inserts
                  Object.keys(novoModeloAso['exames']).forEach(function(key) {
                    console.log('Inserindo....' + novoModeloAso['exames'][key].cd_exame + ' - ' + 
                                                  novoModeloAso['exames'][key].descricao);
                    
                    values =  values + cd_modelo_aso + ',' + novoModeloAso['exames'][key].cd_exame + '\n UNION ALL SELECT ' 

                  });                  

                  // Tira o excesso de string do values 
                  values = values.slice(0, values.length - 17);

                  console.log ('Values ' +  values)
                  console.log ('Query total ---> ' + qry + values)
                  res1
                    .query(qry + values)
                  .then(result2 => {  
                      console.log("exames incluidos com sucesso");
                   //   console.log(result2);
                     // return new Promise(res => {res(result2)});
                     // return result2.rowsAffected;
                    }).catch(err => {
                      console.log('Erro ao gravar exames do  modelo: ',err.message);
                   //   throw new Error('teste2 deu erro');
                      //return result;
  
                })
           })
          .catch(erro => {
                  console.log(' **** Erro Inserindo Modelo  **** : ',erro.message);
                  console.log(' **** Erro Inserindo Modelo  **** : ',erro.code);
              //   return Promise.reject("erro");
             //     console.log(res1);
           });
          
         // console.log(res1.recordset);
          // return res1.recordset;// console.log(res);       
       }) 
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
  
   

module.exports = new ModeloAsoMSSQL();

