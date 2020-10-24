const jwt = require('jsonwebtoken');
const Response = require('../controllers/response');

require('dotenv').config();

/**
 * Função responsável por verificar se o token existe e, caso exista, se o mesmo é válido.
 */
const verify = async (ctx, next) => {
	try {
		const [bearer, token] = ctx.headers.authorization.split(' ');
		const verification = await jwt.verify(token, process.env.JWT_SECRET);

		ctx.state.email = verification.email;
	} catch (err) {
		Response.falhaRequisicao(ctx, 'Ação proibida', 403);
	}
	return next();
};

module.exports = { verify };
