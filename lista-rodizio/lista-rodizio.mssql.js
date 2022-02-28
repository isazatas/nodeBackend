const mssqlcon = require('../dbconnection');

class ListaRodizioMSSQL { 

  async getListaRodizio() {
    const conn = await mssqlcon.getConnection();
    const res = await conn.request()
          .query("select ordem_escala,  rg_ogmo , nm_trab \
                from [recurso_humano].[dbo].[trabalhador] \
                where cd_categ='3' and (dt_desrec is null or dt_desrec = '') order by ordem_escala");
    return res.recordset;
  }

  async atualizaListaRodizio(novalistarodizio) {
    try{  
      console.log('atualizacao... update sql');
      
      const conn = await mssqlcon.getConnection();
     // const res = await conn.request()
      Object.keys(novalistarodizio).forEach(function (key) {
        const res = conn.request()
        console.log('Atualizando....' + novalistarodizio[key].rg_ogmo + '-' + novalistarodizio[key].nm_trab + ' - ' + novalistarodizio[key].ordem_escala);
        res
          .input('_rg_ogmo', novalistarodizio[key].rg_ogmo)
          .input('_ordem_escala', novalistarodizio[key].ordem_escala)
          .query("update [recurso_humano].[dbo].[trabalhador] \
                  set ordem_escala = @_ordem_escala \
                  where rg_ogmo = @_rg_ogmo").then(result => {
                    console.log(result)
                }).catch(err => {
                  console.log(error1, err);
                });
         // console.log(res);       
       }) 
    } catch (err) {
      console.log('error2', err);
    }
  }
  
  async getEspecieRodizio() {
    const conn = await mssqlcon.getConnection();
    const res = await conn.request()
          .query("select * from [operacoes].[dbo].[especie_rodizio]");
    return res.recordset;
  }

  async getTipoRodizio() {
    const conn = await mssqlcon.getConnection();
    const res = await conn.request()
          .query("Select cd_tipo_rodizio, ds_tipo_rodizio, ativo \
                  From [operacoes].[dbo].[tipo_rodizio] \
                  where cd_tipo_rodizio in ('13','14','15','16','17') \
                  and  ativo = 'S'");
    return res.recordset;
  }

  // Retorna rodízios vigentes
  async getListaEscalaRodizioVigentes(cd_artigo, cd_especie) {
    try{
        const conn = await mssqlcon.getConnection();
        const res  = await conn.request()
            .input('_cd_artigo', cd_artigo)
            .input('_cd_especie', cd_especie)
            .query("Select cd_categ, dt_escala, hue.cd_periodo_inclusao, horario, dt_inclusao, cd_esp_rodizio, usu.nome, \
                          hue.cd_tipo_rodizio, ds_tipo_rodizio, hr_inclusao, dt_atualizacao, hr_atualizacao, ordem_escala, \
                          atualizado, tp_sentido, hue.cd_usuario, novo_rodizio, \
                          case when cd_artigo = '54' then 'CADASTRO' else 'REGISTRO' end as ds_artigo, cd_hist \
                    from [operacoes].[dbo].[hist_ultima_escala] hue \
                    inner join [operacoes].[dbo].[tipo_rodizio] tp  on tp.cd_tipo_rodizio = hue.cd_tipo_rodizio \
                    inner join [operacoes].[dbo].[periodo] per  on per.cd_periodo = hue.cd_periodo_inclusao \
                    inner join [acesso_ogmo].[dbo].[usuarios_sistema] usu on hue.cd_usuario = usu.cd_usuario \
                    where \
                          cd_artigo = @_cd_artigo and \
                          cd_esp_rodizio = @_cd_especie and \
                            hue.cd_tipo_rodizio in ('13','14','15','16','17') and \
                                      atualizado = 'N' ");
                                      /* .then(result => {
                                        console.log('aqui....');
                                        console.log(result.recordset);
                                        result;
                                    }).catch(err => {
                                      console.log('error query', err);
                                    }); */
        return res.recordset;                           
    }catch (err) {
        console.log('error query2', err);
    }                          
 }
  // Retorna rodízios usados recentemente
  async getListaEscalaRodizioRecentes(cd_artigo, cd_especie) {
    try{
        const conn = await mssqlcon.getConnection();
        const res  = await conn.request()
            .input('_cd_artigo', cd_artigo)
            .input('_cd_especie', cd_especie)
            .query("Select cd_categ, dt_escala, hue.cd_periodo_inclusao, horario, dt_inclusao, cd_esp_rodizio, usu.nome, \
                      hue.cd_tipo_rodizio, ds_tipo_rodizio, hr_inclusao, dt_atualizacao, hr_atualizacao, ordem_escala, \
                      atualizado, tp_sentido, hue.cd_usuario, novo_rodizio, \
                      case when cd_artigo = '54' then 'CADASTRO' else 'REGISTRO' end as ds_artigo, cd_hist \
                    From operacoes.dbo.hist_ultima_escala hue \
                    inner join [operacoes].[dbo].[tipo_rodizio] tp  on tp.cd_tipo_rodizio = hue.cd_tipo_rodizio \
                    inner join [operacoes].[dbo].[periodo] per  on per.cd_periodo = hue.cd_periodo_inclusao \
                    inner join [acesso_ogmo].[dbo].[usuarios_sistema] usu on hue.cd_usuario = usu.cd_usuario \
                    Where dt_escala in \
                        (Select max(dt_escala) from [operacoes].[dbo].[hist_ultima_escala] \
                         Where cd_tipo_rodizio in ('13','14','15','16','17') and \
                               cd_artigo = @_cd_artigo and \
                               cd_esp_rodizio = @_cd_especie \
                         Group by cd_tipo_rodizio)  and \
                    cd_esp_rodizio = @_cd_especie and \
                    hue.cd_tipo_rodizio in ('13','14','15','16','17') and \
                    cd_artigo = @_cd_artigo and \
                    atualizado = 'S' ");
        return res.recordset;                           
    }catch (err) {
        console.log('error query', err);
    }                          
 } 
}
module.exports = new ListaRodizioMSSQL();

