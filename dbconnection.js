const mssql = require('mssql');

mssql.on('error', err => {
  console.log("Erro ao carregar o driver sql")
})

var config = {
 // server: '192.168.0.20',
  server: '10.81.7.20',
  authentication: {
    type: 'default',
    options: {
      userName: 'requisicao',
      password: 'Qaz1@3'
    }
  },
  options: {
    port: 1433, // Default Port
    database: 'master',
    encrypt: false
  }
};

class DBConnection {
 
  async getConnection() {
    try {
       return await mssql.connect(config);
    }
    catch(error) {
      console.log(error);
    }
  }
 
  async getConnection2()  {
    
    mssql.connect(config).then(pool => {
      return pool;
    }).catch(err => {
      return console.log(err);
    });
  } 
}

module.exports = new DBConnection();