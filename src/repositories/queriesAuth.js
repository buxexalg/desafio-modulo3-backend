const Database = require('../utils/database');

/**
 * Função responsável por fazer a query que retorna a senha em hash de um email específico.
 */
const usuarios = async (email) => {
	const query = {
		text: 'SELECT senha FROM users where email = $1',
		values: [email],
	};

	const result = await Database.query(query);

	return result.rows.shift();
};
module.exports = { usuarios };
