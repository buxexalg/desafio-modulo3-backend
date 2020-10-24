const Router = require('koa-router');
const TabelaBrasileirao = require('./controllers/tabelaBrasileirao');
const Auth = require('./controllers/auth');
const Session = require('./middlewares/session');

const router = new Router();

/* Lista os jogos de uma rodada específica */
router.get('/jogos/:rodada', TabelaBrasileirao.obterJogos);

/* Altera o placar de um jogo específico. Necessita autorização. */
router.post('/jogos', Session.verify, TabelaBrasileirao.alterarPlacar);

/* Retorna a classificação final do brasileirão 2019 */
router.get('/classificacao', TabelaBrasileirao.obterClassificacao);

/* Endpoint de autenticação */
router.post('/auth', Auth.autenticar);

module.exports = router;
