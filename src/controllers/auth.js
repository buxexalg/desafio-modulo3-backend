const Response = require('./response');
const jwt = require('jsonwebtoken');
const Password = require('../utils/password');
const QueriesAuth = require('../repositories/queriesAuth');

require('dotenv').config();

/**
 * Função responsável por gerar o token de autenticação com base no email e senha inseridos. Os  valores são inseridos através de um JSON com os dados de email e senha.
 */
const autenticar = async (ctx) => {
	const { email = null, password = null } = ctx.request.body;

	if (!email || !password) {
		return Response.falhaRequisicao(
			ctx,
			{ message: 'Pedido mal formatado.' },
			400
		);
	}

	const passwordCrypt = await QueriesAuth.usuarios(email);
	if (passwordCrypt) {
		const comparison = await Password.check(password, passwordCrypt.senha);
		if (comparison) {
			const token = jwt.sign(
				{ email: email },
				process.env.JWT_SECRET || 'brasileirao',
				{
					expiresIn: '1h',
				}
			);
			return Response.sucessoRequisicao(ctx, { token }, 200);
		}
	}
	return Response.falhaRequisicao(
		ctx,
		{ message: 'Email ou senha incorretos' },
		404
	);
};

module.exports = { autenticar };
