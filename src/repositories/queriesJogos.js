const Database = require('../utils/database');

/**
 * Função responsável por fazer a query que retorna todos os jogos por rodada.
 */
const jogosPorRodada = async (id) => {
	const query = {
		text: 'SELECT * FROM jogos WHERE rodada = $1 ORDER BY id',
		values: [id],
	};

	const result = await Database.query(query);

	return result;
};

/**
 * Função responsável por fazer a query que retorna todos os jogos do banco de dados.
 */
const todosOsJogos = async () => {
	const query = 'SELECT * FROM jogos';

	const result = await Database.query(query);

	return result;
};

/**
 * Função responsável por fazer a query que altera o valor de placar de um jogo específico.
 */
const alteraPlacar = async (id, golsCasa, golsVisitante) => {
	const query = {
		text: `UPDATE jogos SET gols_casa = $1, gols_visitante = $2 WHERE id = $3`,
		values: [golsCasa, golsVisitante, id],
	};

	const result = await Database.query(query);

	return result;
};

module.exports = { jogosPorRodada, todosOsJogos, alteraPlacar };
