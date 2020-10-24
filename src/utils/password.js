const bcrypt = require('bcryptjs');

/** 
Função de comparação entre senha plain e senha criptografada. Retorna True ou false. */
const check = async (password, hash) => {
	const comparison = await bcrypt.compare(password, hash);

	return comparison;
};

module.exports = { check };
