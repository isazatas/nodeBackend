const mssqlcon = require('../dbconnection');

class ExameMSSQL { 

  async getExame() {
    const conn = await mssqlcon.getConnection();
    console.log('Exames....') 
    const res = await conn.request()
          .query("select * \
                from [seguranca_trabalho].[dbo].[med_exame]");

    return res.recordset;
  }

  
  async getExamesPorCodigos(exames) {
    const conn = await mssqlcon.getConnection();
    console.log('Exames por codigos')
    let values = exames.join();
    console.log(values);
    const qry = "SELECT  * \
                  FROM [seguranca_trabalho].[dbo].[med_exame] \
                  WHERE cd_exame IN (" + values + ") \
                  ORDER BY [cd_exame]"
    const res = await conn.request()
          .query(qry);
          console.log(res.recordset);
          return res.recordset;
  }

}
module.exports = new ExameMSSQL();

