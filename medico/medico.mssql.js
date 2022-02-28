const mssqlcon = require('../dbconnection');

class MedicoMSSQL { 

  async getAllMedico() {
    const conn = await mssqlcon.getConnection();
    const res = await conn.request()
          .query("SELECT [cd_medico] ,[nome] ,[reg_mtb]  ,[cremepe] \
                  FROM [seguranca_trabalho].[dbo].[med_medico] \
                  ORDER BY [nome]");

    return res.recordset;
  }

  async getMedico(cd_medico) {
    const conn = await mssqlcon.getConnection();
    console.log('Lendo Medico ' + cd_medico) 
    const res = await conn.request()
          .input('_cd_medico', cd_medico)
          .query("SELECT [cd_medico] ,[nome] ,[reg_mtb]  ,[cremepe] \
                  FROM [seguranca_trabalho].[dbo].[med_medico] \
                  WHERE  [cd_medico] = @_cd_medico");

    return res.recordset;
  }
}
  

module.exports = new MedicoMSSQL();

