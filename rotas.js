const listarodizio = require('./lista-rodizio/lista-rodizio');
const exame = require('./exame/exame');
const tpa = require('./tpa/tpa');
const express = require('express');
const tipoAso = require('./tipo-aso/tipo-aso');
const tpaFuncao = require('./tpa-funcao/tpa-funcao');
const modeloAso = require('./modelo-aso/modelo-aso');
const tpaEspecializacao = require('./tpa-especializacao/tpa-especializacao')
const tpasolicitacaoaso = require('./tpa-solicitacao-aso/tpa-solicitacao-aso-aso')
const medico = require('./medico/medico')
const router = express.Router();

// a middleware function with no mount path. This code is executed for every request to the router
router.use(function (req, res, next) {
    console.log(new Date(), req.method, req.url);
    next();
  });

// Pega a Lista de Ordem Atual
router.get('/listarodizio', listarodizio.getListaRodizio);

// Pega Especies de Rodizio
router.get('/getespecierodizio', listarodizio.getespecierodizio);

// PEga os tipos de rodizio
router.get('/gettiporodizio', listarodizio.gettiporodizio);

// Pega as as listas de de tipo de rodizio (listas a,b,c,d,e) vigentes
router.get('/getlistaescalarodiziovigentes', listarodizio.getlistaescalarodiziovigentes);

// Pega as as listas de de tipo de rodizio usadas recentemente
router.get('/getlistaescalarodiziorecentes', listarodizio.getlistaescalarodiziorecentes);

//Atualiza a lista 
router.post('/atualizalistarodizio', listarodizio.atualizaListaRodizio);

//Retorna os exames cadastrados
router.get('/exames', exame.getExame);

//Retorna lista de  exames por codigos
router.get('/getexamesporcodigos', exame.getExamesPorCodigos);

//Retorna os tpas cadastrados 
router.get('/getAllTpa', tpa.getAllTpa);

//Retorna 1 tpa cadastrado
router.get('/getTpa', tpa.getTpa);

//Retorna os medicos cadastrados 
router.get('/getAllMedico', medico.getAllMedico);

//Retorna 1 tpa cadastrado
router.get('/getMedico', medico.getMedico);



//Retorna os tipos de ASO cadastrados
router.get('/tipo-aso', tipoAso.getTipoAso);

//Retorna os as funcoes por categoria
router.get('/tpafuncao', tpaFuncao.getTpaFuncao);
//Retorna os as funcoes por categoria
router.get('/tpaespecializacao', tpaEspecializacao.getTpaEspecializacao);

//Retorna as funções disponíveis pra cadastro de modelo ASO
router.get('/tpafuncaodisponivel', tpaFuncao.getTpaFuncaoDisponivelAso);

router.get('/tpafuncaohabilitadas',tpaFuncao.getTpaFuncaoHabilitadas);

//inclui modelo aso
router.post('/insertmodeloaso', modeloAso.insertModeloAso );

// pega os modelos disponiveis por habilitacoes do tpa
router.get('/getmodeloasohabdisponiveis', modeloAso.getModeloAsoDisponiveisTpa );

// Pega a solicitacao do ASO do TPA
router.get('/gettpasolicitacaoaso/', tpasolicitacaoaso.getTpaSolicitacaoAso );

// Pega a solicitacao do ASO do TPA
router.get('/gettpasolicitacaoasoprint/', tpasolicitacaoaso.getTpaSolicitacaoAsoPrint );

// Pega a solicitacao de exames do ASO do TPA
router.get('/gettpasolicitacaoexameaso', tpasolicitacaoaso.getTpaSolicitacaoExameAso );

//inclui solicitacao aso
router.post('/inserttpasolicitacaoaso', tpasolicitacaoaso.insertTpaSolicitacaoAso );


module.exports = router;

