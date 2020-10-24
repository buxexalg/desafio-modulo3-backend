const QueriesJogos = require('../repositories/queriesJogos');
const Response = require('./response');


/**
 * Função responsável por gerenciar a requisição de jogos por rodada. O número da mesma é inserido como um parâmetro de URL.
 */
const obterJogos = async (ctx) => {
	const { rodada = null } = ctx.params;
	if (!isNaN(rodada)) {
		const jogos = await QueriesJogos.jogosPorRodada(rodada);
		if (jogos.rows.length > 0) {
			return Response.sucessoRequisicao(ctx, jogos.rows, 200);
		}
		return Response.falhaRequisicao(ctx, 'Rodada não encontrada.', 404);
	}
	return Response.falhaRequisicao(
		ctx,
		'Insira corretamente todos os dados necessários.',
		400
	);
};

/**
 * Função responsável por organizar a tabela de classificação com base nas regras de posicionamento do brasileirão.
 */
const organizaTabela = (tabela) => {
	return tabela.sort((a, b) => {
		if (a.pontos > b.pontos) return -1;
		else if (a.pontos < b.pontos) return 1;
		else {
			if (a.vitorias > b.vitorias) return -1;
			else if (a.vitorias < b.vitorias) return 1;
			else {
				if (
					a.golsFeitos - a.golsSofridos >
					b.golsFeitos - b.golsSofridos
				)
					return -1;
				else if (
					a.golsFeitos - a.golsSofridos <
					b.golsFeitos - b.golsSofridos
				)
					return 1;
				else {
					if (a.golsFeitos > b.golsFeitos) return -1;
					else if (a.golsFeitos < b.golsFeitos) return 1;
					else {
						a.nome.localeCompare(b.nome);
					}
				}
			}
		}
	});
};

/**
 * Função responsável por transformar os dados individuais das partidas na classificação final do brasileirão 2019.
 */
const obterClassificacao = async (ctx) => {
	const classificacao = await QueriesJogos.todosOsJogos();

	if (!classificacao)
		return Response.falhaRequisicao(ctx, 'Não encontrado.', 404);

	const tabelaClassificacao = [];

	const times = classificacao.rows
		.map((item) => item.time_casa)
		.filter((elemento, index, self) => {
			return self.indexOf(elemento) === index;
		});

	times.forEach((elemento, index) => {
		tabelaClassificacao.push({
			nome: elemento,
			pontos: 0,
			jogos: 0,
			vitorias: 0,
			derrotas: 0,
			empates: 0,
			golsFeitos: 0,
			golsSofridos: 0,
		});

		classificacao.rows.map((jogo) => {
			const itemClassificacao = tabelaClassificacao[index];

			if (jogo.time_casa === elemento) {
				if (jogo.gols_casa > jogo.gols_visitante) {
					(itemClassificacao.pontos += 3),
						(itemClassificacao.jogos += 1),
						(itemClassificacao.vitorias += 1),
						(itemClassificacao.golsFeitos += jogo.gols_casa),
						(itemClassificacao.golsSofridos += jogo.gols_visitante);
				} else if (jogo.gols_casa < jogo.gols_visitante) {
					(itemClassificacao.jogos += 1),
						(itemClassificacao.derrotas += 1),
						(itemClassificacao.golsFeitos += jogo.gols_casa),
						(itemClassificacao.golsSofridos += jogo.gols_visitante);
				} else {
					(itemClassificacao.pontos += 1),
						(itemClassificacao.jogos += 1),
						(itemClassificacao.empates += 1),
						(itemClassificacao.golsFeitos += jogo.gols_casa),
						(itemClassificacao.golsSofridos += jogo.gols_visitante);
				}
			} else if (jogo.time_visitante === elemento) {
				if (jogo.gols_casa < jogo.gols_visitante) {
					(itemClassificacao.pontos += 3),
						(itemClassificacao.jogos += 1),
						(itemClassificacao.vitorias += 1),
						(itemClassificacao.golsFeitos += jogo.gols_visitante),
						(itemClassificacao.golsSofridos += jogo.gols_casa);
				} else if (jogo.gols_casa > jogo.gols_visitante) {
					(itemClassificacao.jogos += 1),
						(itemClassificacao.derrotas += 1),
						(itemClassificacao.golsFeitos += jogo.gols_visitante),
						(itemClassificacao.golsSofridos += jogo.gols_casa);
				} else {
					(itemClassificacao.pontos += 1),
						(itemClassificacao.jogos += 1),
						(itemClassificacao.empates += 1),
						(itemClassificacao.golsFeitos += jogo.gols_visitante),
						(itemClassificacao.golsSofridos += jogo.gols_casa);
				}
			}
		});
		return Response.sucessoRequisicao(
			ctx,
			organizaTabela(tabelaClassificacao),
			200
		);
	});
};

/**
 * Função responsável por gerenciar a requisição de alteração do placar no banco de dados. Os novos valores são inseridos através de um JSON com os dados de ID, golsCasa e golsVisitantes.
 */
const alterarPlacar = async (ctx) => {
	const {
		id = null,
		golsCasa = null,
		golsVisitante = null,
	} = ctx.request.body;

	if (
		!id ||
		(!golsCasa && golsCasa !== 0) ||
		(!golsVisitante && golsVisitante !== 0)
	) {
		return Response.falhaRequisicao(
			ctx,
			{ message: 'Pedido mal formatado.' },
			400
		);
	}

	const tabelaAlterada = await QueriesJogos.alteraPlacar(id, golsCasa, golsVisitante);

	return Response.sucessoRequisicao(ctx, tabelaAlterada.rows, 200);
		
};

module.exports = { obterJogos, obterClassificacao, alterarPlacar };
