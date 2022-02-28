const mssqlcon = require('../dbconnection');

class TpaFuncaoMSSQL { 

  async getTpaFuncao(cd_categ) {
    const conn = await mssqlcon.getConnection();
    console.log('TpaFuncao....' + cd_categ) 
    const res = await conn.request()
          .input('_cd_categ', cd_categ)
          .query("SELECT fc.[cd_categ], f.[cd_func] ,f.[ds_funcao], c.[desc_categ] \
                  FROM [operacoes].[dbo].[funcao_por_categoria] fc \
                  INNER JOIN [operacoes].[dbo].[funcao] f				ON fc.[cd_funcao] = f.[cd_func] \
                  INNER JOIN [operacoes].[dbo].[faina_categoria] c    ON fc.[cd_categ]  = c.[cod_categ] \
                  WHERE \
                  fc.[cd_categ] = @_cd_categ \
                  ORDER BY fc.[cd_categ], f.[ds_funcao]");

  //  return JSON.stringify(res.recordset);
    return res.recordset;
          
  }
  async getTpaFuncaoDisponivelAso(cd_categ,cd_tipo_aso) {
    const conn = await mssqlcon.getConnection();
    console.log('TpaFuncao disponiveis para categoria/TIpo ASO....' + cd_categ + '' + cd_tipo_aso) 
    const res = await conn.request()
          .input('_cd_categ', cd_categ)
          .input('_cd_tipo_aso', cd_tipo_aso)
          .query("SELECT fc.[cd_categ], f.[cd_func] ,f.[ds_funcao], c.[desc_categ] \
                  FROM [operacoes].[dbo].[funcao_por_categoria] fc \
                  INNER JOIN [operacoes].[dbo].[funcao] f	            ON fc.[cd_funcao] = f.[cd_func] \
                  INNER JOIN [operacoes].[dbo].[faina_categoria] c    ON fc.[cd_categ]  = c.[cod_categ] \
                  WHERE \
                      fc.[cd_categ] = @_cd_categ AND \
                      fc.[cd_funcao] NOT IN ( SELECT DISTINCT aso.[cd_func] \
                                              FROM [seguranca_trabalho].[dbo].[med_modelo_aso] aso \
                                              WHERE aso.[cd_categ]    = @_cd_categ AND \
                                                    aso.[cd_tipo_aso] = @_cd_tipo_aso) \
                  ORDER BY fc.[cd_categ], f.[ds_funcao]");

  //  return JSON.stringify(res.recordset);
    return res.recordset;
          
  }
  async getTpaFuncaoHabilitadas(rg_ogmo) {
    const conn = await mssqlcon.getConnection();
    console.log('Funcoes habilitadas do TPA....' + rg_ogmo) 
    const res = await conn.request()
          .input('_rg_ogmo', rg_ogmo)
          .query("SELECT distinct ef.[cd_funcao], f.[ds_funcao] \
                  FROM [operacoes].[dbo].[especializacao_por_funcao] ef \
                  INNER JOIN [operacoes].[dbo].[funcao] f	ON ef.[cd_funcao] = f.[cd_func] \
                  WHERE cd_especi in   (SELECT  distinct et.[cd_especi] \
                              FROM [recurso_humano].[dbo].[especializacao_trabalhador] et \
                              INNER JOIN [operacoes].[dbo].[especializacao] e  ON et.[cd_especi] = e.[cd_especi] \
                              WHERE rg_ogmo = @_rg_ogmo ) \
                          ORDER BY f.[ds_funcao]");

  //  return JSON.stringify(res.recordset);
    return res.recordset;
          
  }
}
module.exports = new TpaFuncaoMSSQL();

