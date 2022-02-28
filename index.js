var cors = require('cors');
const app = require('./app');
const server = require('http').Server(app);
server.listen(4001,'0.0.0.0', ()=> {
    console.log('Server Started on port 4001');
});
