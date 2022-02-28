const mssqlcon = require('../dbconnection');

class TpaEspecializacaoMSSQL { 

  async getTpaEspecializacao(rg_ogmo) {
    const conn = await mssqlcon.getConnection();
    console.log('TpaEspecializacao....' + rg_ogmo) 
    const res = await conn.request()
          .input('_rg_ogmo', rg_ogmo)
          .query("SELECT [rg_ogmo]  ,et.[cd_especi] , e.[ds_especi]  \
                  FROM [recurso_humano].[dbo].[especializacao_trabalhador] et \
                  INNER JOIN [operacoes].[dbo].[especializacao] e  ON et.cd_especi = e.cd_especi \
                  WHERE rg_ogmo = @_rg_ogmo");

  //  return JSON.stringify(res.recordset);
    return res.recordset;
          
  }
  
}
module.exports = new TpaEspecializacaoMSSQL();

