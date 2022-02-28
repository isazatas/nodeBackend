const mssqlcon = require('../dbconnection');

class TpaMSSQL { 

  async getAllTpa() {
    const conn = await mssqlcon.getConnection();
    const res = await conn.request()
          .query("SELECT     rg_ogmo,    nm_trab,    cd_categ,    dt_reg,    cd_sexo, \
                             tp_sangue,    id_numero,    id_orgao,    id_uf,    cpf, \
                              dt_nasc,    pis,    ddd_fone,    er_fone \
                  FROM  [recurso_humano].[dbo].[trabalhador] \
                  WHERE  \
                        [dt_desrec] is null \
                  ORDER BY [nm_trab]");

    return res.recordset;
  }

  async getTpa(rg_ogmo) {
    const conn = await mssqlcon.getConnection();
    console.log('Lendo TPA ' + rg_ogmo) 
    const res = await conn.request()
          .input('_rg_ogmo', rg_ogmo)
          .query("SELECT     rg_ogmo,    nm_trab,    cd_categ,    dt_reg,    cd_sexo, \
                             tp_sangue,    id_numero,    id_orgao,    id_uf,    cpf, \
                              dt_nasc,    pis,    ddd_fone,    er_fone \
                  FROM  [recurso_humano].[dbo].[trabalhador] \
                  WHERE  \
                        [dt_desrec] is null AND \
                        [rg_ogmo] = @_rg_ogmo");

    return res.recordset;
  }
}
  

module.exports = new TpaMSSQL();

