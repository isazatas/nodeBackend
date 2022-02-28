class Module {
    constructor(app) {
       this.app = app;
    }
   init() {
    const listarodiziocontroller = require('../lista-rodizio/lista-rodizio.controller');
    new listarodiziocontroller(this.app);
   }
  }
  module.exports = Module;
