const mssqlcon = require('../dbconnection');

class TipoAsoMSSQL { 

  async getTipoAso() {
    const conn = await mssqlcon.getConnection();
    console.log('Tipo ASO....') 
    const res = await conn.request()
          .query("select * \
                from [seguranca_trabalho].[dbo].[med_tipo_aso]");
    return res.recordset;
  }

}
module.exports = new TipoAsoMSSQL();

