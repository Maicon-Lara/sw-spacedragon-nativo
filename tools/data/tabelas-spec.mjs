// Deriva a tabela de progressão de cada especialização a partir da tabela da
// classe base (tools/data/progressoes.mjs).
//
// A ideia: o jogador da especialização quer a MESMA tabela da classe base, só que
// já resolvida para o caminho dele — as colunas que congelaram repetindo o número
// em que travaram, e as colunas novas que a especialização traz.
//
// Três mecanismos, e a ordem importa:
//
// `congela: { coluna: nível }` — a partir dali a coluna repete o valor daquele
// nível. O personagem alcançou aquele patamar; o que ele perde é o crescimento.
//
// `substitui: { coluna: fn }` — a coluna passa a mostrar o valor DAQUELA
// especialização, no lugar do da classe base. É o caso do Espião, cuja Sabotagem
// é a % de Furtividade: em vez de uma coluna "Sabotagem" e outra "Sabotagem nova",
// existe uma coluna só, com o número que ele de fato rola. A marca de substituído
// só aparece quando o valor REALMENTE difere do da base.
//
// `novas: { título: fn }` — reservado para o que não existe na classe base, como
// o "Desarme da armadilha" do Sabotador.

import { PROGRESSOES } from './progressoes.mjs';

const G = PROGRESSOES['OperativoTalentos'];
const V = PROGRESSOES['Veterano'];
const S = PROGRESSOES['Sensível à Força'];

const pct = (n) => `${Math.max(1, Math.min(99, Math.round(n)))}%`;
const num = (s) => parseInt(String(s).replace(/\D/g, ''), 10) || 0;
const mult = (s) => num(s);
const ordinal = (n) => `${n}ª`;

/** Grandeza-Limite efetiva num nível: a tabela base só marca quando ela SOBE. */
const grandezaEm = (nivel) => {
  let ultima = '1ª';
  for (let i = 0; i < nivel; i++) if (S[i].grandeza !== '—') ultima = S[i].grandeza;
  return ultima;
};

/** NT efetivo num nível: a tabela do Técnico só marca quando ele sobe. */
const ntEm = (nivel) => {
  const T = PROGRESSOES['Técnico'];
  let ultimo = '1º';
  for (let i = 0; i < nivel; i++) if (!/^[–-]$/.test(T[i].nt)) ultimo = T[i].nt;
  return num(ultimo);
};

/** % de um talento de Gatuno num nível reduzido (o Slicer e a Sentinela usam isso). */
const gatuno = (coluna, nivel) => G[Math.max(1, Math.min(20, Math.floor(nivel))) - 1][coluna];

export const TABELAS_SPEC = {
  // ── Veterano ──────────────────────────────────────────────────────────────
  'Mercenário': {
    base: 'Veterano',
    congela: { pilotar: 5, jp: 10 },
    substitui: {
      critico: (n, b) => `×${mult(b.critico) + 1}`,
    },
    nota: 'A coluna Crítico já é a da <strong>arma escolhida</strong>, sempre um multiplicador acima da tabela do Veterano. Com outra arma vale o crítico normal — e do 10º em diante, mais −4 no ataque.',
  },
  'Caçador de Recompensas': {
    base: 'Veterano',
    // O livro: Desarmar/Subjugar "para de progredir com esses fins" no 5o, e "a nova
    // progressao passa a aumentar para a nova aplicacao". Como manobra, congela; a
    // progressao continua, mas em Aparatos e maquinas.
    congela: { desarmar: 5 },
    novas: {
      'Aparatos e máquinas': (n, b) => `${b.desarmar} + CT`,
      'Ataques no turno': (n) => (n >= 20 ? '3, sempre' : n >= 10 ? '3, com teste' : '—'),
    },
    nota: 'A coluna Desarmar congela no 5º — e é com esse número que se rola o ataque extra do 10º. A progressão segue em Aparatos e máquinas, somada ao Crédito Tecnológico (CT) da sua Ciência. No teste do ataque extra, a falha tira o resto do turno.',
  },
  'Emissário': {
    base: 'Veterano',
    congela: { critico: 5, desarmar: 10 },
    novas: {
      'Reação ×': (n) => `×${mult(V[n - 1].critico)}`,
      'Salário/mês': (n) => `$${(20000 * n).toLocaleString('pt-BR')}`,
    },
    nota: 'A progressão do crítico não morre: ela vira o multiplicador do seu ajuste de reação.',
  },

  // ── Operativo ─────────────────────────────────────────────────────────────
  'Espião': {
    base: 'OperativoTalentos',
    congela: {},
    // A coluna mostra o valor que vale para ELE, nao o da classe base.
    substitui: {
      sabotagem: (n, b) => (n >= 20 ? '99%' : b.furtividade),
      furtividade: (n, b) => (n >= 20 ? '99%' : b.furtividade),
      furtar: (n, b) => (n >= 20 ? '99%' : b.furtar),
    },
    nota: 'A Sabotagem dele <em>é</em> a % de Furtividade, e sobe junto com ela — por isso as duas colunas andam iguais. A mesma % de Furtar serve para passar-se por outra pessoa. No 20º, Furtividade, Sabotagem e Furtar igualam os 99% de Escalar.',
  },
  'Sabotador': {
    base: 'OperativoTalentos',
    congela: { furtar: 5, furtivo: 5, escalar: 10, furtividade: 10, percepcao: 10 },
    // A Sabotagem da coluna ja vem com o bonus somado: e a % que ele rola.
    // No 20o o livro fixa 99%, acima do que a formula daria (81%).
    substitui: {
      sabotagem: (n, b) =>
        n >= 20 ? '99%' : pct(num(b.sabotagem) + (100 - num(b.escalar))),
    },
    novas: {
      'Desarme da armadilha': (n, b) =>
        n >= 20 ? '1%' : n < 10 ? '—' : pct(100 - (num(b.sabotagem) + (100 - num(b.escalar)))),
    },
    nota: 'A coluna Sabotagem já traz o bônus somado (100% menos a sua % de Escalar) — é a porcentagem que você rola. O bônus é recalculado a cada nível e <strong>não acumula</strong>. A armadilha é o inverso dela.',
  },
  'Assassino': {
    base: 'OperativoTalentos',
    congela: { escalar: 5, sabotagem: 5, furtar: 10 },
    substitui: {
      furtivo: (n, b) => `×${mult(b.furtivo) + 1}`,
    },
    novas: {
      'Acerto vira furtivo': (n) => (n >= 10 ? '20%' : '—'),
    },
    nota: 'A coluna do Ataque Furtivo já traz o +1 de multiplicador: ×3 no 5º, ×4 no 6º, e assim por diante. No 20º todos os ataques contam como Ataque Furtivo, e um crítico pede JPF ou morte.',
  },
  'Contrabandista': {
    base: 'OperativoTalentos',
    congela: { sabotagem: 5, furtar: 5, furtividade: 10 },
    nota: 'A % de Furtividade congelada <em>é</em> a sua chance de um ataque a mais no turno, com a BA de 7 níveis abaixo — por isso ela não vira uma coluna nova. No 20º são sempre dois ataques.',
  },

  // ── Técnico ───────────────────────────────────────────────────────────────
  'Médico de Campo': {
    base: 'Técnico',
    congela: { operar: 5 },
    novas: {
      'Crédito Tec. (extra)': (n) => (n >= 20 ? '100% (total)' : `+${n}%`),
      'NT máx. que cria': (n) => (n < 10 ? `${ntEm(n)}º` : `${Math.min(8, ntEm(n))}º`),
    },
    nota: 'A coluna é o que ele SOMA ao Crédito Tecnológico que já vem da Ciência. Do 10º em diante os aparatos dele contam 2 NT acima, o que o limita a criar até o 8º NT. No 20º o livro fixa o Crédito em 100%.',
  },
  'Engenheiro': {
    base: 'Técnico',
    congela: {},
    substitui: {
      nt: (n) => `${Math.min(10, 4 + Math.floor((n - 5) / 2))}º`,
    },
    novas: {
      'Custo de inventar': (n) => (n >= 10 ? 'dobrado' : 'acrescido'),
    },
    nota: 'Salta para o 4º NT no 5º nível e ganha +1 a cada 2 níveis, chegando ao 10º NT no 17º. O Crédito Tecnológico vira custo: inventar sai mais caro que comprar.',
  },
  'Slicer': {
    base: 'Técnico',
    congela: {},
    novas: {
      'Sabotagem (1/3)': (n) => (n >= 10 ? gatuno('sabotagem', 10 / 3) : gatuno('sabotagem', n / 3)),
      'Reprogramar robôs': (n) => (n < 10 ? '—' : 'Tabela 3-2'),
    },
    nota: 'Sabota como um Operativo de 1/3 dos seus níveis. Do 10º em diante essa % congela, mas um “D” na Tabela 3-2 passa a significar robô reprogramado para sempre.',
  },

  // ── Sensível à Força ──────────────────────────────────────────────────────
  'Guardião': {
    base: 'Sensível à Força',
    // Toda especializacao de Mentalico do livro paga com BA e JP. O Guardiao trocou
    // a BA por uma melhor (a do Cosmonauta), entao a moeda dele e a JP — congelada
    // ja no 5o — mais o teto de Grandeza na 6a.
    congela: { jp: 5 },
    substitui: {
      ba: (n) => V[n - 1].ba,
      grandeza: (n) => {
        const g = num(grandezaEm(n));
        return g >= 6 ? '6ª (teto)' : `${g}ª`;
      },
    },
    nota: 'A BA passa a evoluir como a de um Veterano e você usa vestes médias sem bloquear os poderes. Em troca, o teto de Grandeza para na 6ª.',
  },
  'Consular': {
    base: 'Sensível à Força',
    congela: { ba: 5, jp: 10 },
    substitui: {
      grandeza: (n) => ordinal(Math.min(10, 4 + Math.floor((n - 5) / 2))),
      alcance: (n) => (n >= 20 ? '200%' : S[Math.min(20, n + 2) - 1].alcance),
    },
    novas: {
      'O preço': (n) => (n >= 20 ? 'JPF ou morre' : n >= 17 ? 'JPF ou −1 CON' : n >= 10 ? '−1-2 PV/nível' : '—'),
    },
    nota: 'Ganha a 4ª Grandeza direto no 5º e +1 a cada 2 níveis, chegando à 10ª no 17º. O Alcance conta como o de um Sensível +2 níveis. O corpo paga a conta.',
  },
  'Sentinela': {
    base: 'Sensível à Força',
    // Paga mais tarde que as outras — e o preco de ser a mais versatil —, mas paga.
    congela: { jp: 10 },
    novas: {
      'Talentos (metade do nível)': (n) => gatuno('furtividade', Math.max(1, n / 2)),
      'JPM contra a Força': (n) => (n >= 10 ? '+4' : '—'),
    },
    nota: 'Escolhe três talentos de Operativo, com a % de um Gatuno de metade do seu nível. A JP congela no 10º — mais tarde que nas outras Sendas, que é o preço de ser a mais versátil — mas em compensação ganha <strong>+4 nas JPM</strong> contra a Força e efeitos mentais.',
  },
  'Vidente': {
    base: 'Sensível à Força',
    // O livro (Radiestesico) congela a JP ja no 5o e a BA no 10o — nao so a BA.
    congela: { jp: 5, ba: 10 },
    novas: {
      'Comunhão': (n) => (n >= 20 ? '100 m' : n >= 10 ? '40 m' : '20 m'),
      'Teto da Comunhão': (n) => (n >= 20 ? '½ do Alcance' : n >= 10 ? '⅓' : '¼'),
      'Atrai descargas': (n) => (n >= 20 ? '80%' : n >= 10 ? '30%' : '—'),
    },
    nota: 'Canaliza a Força dos seres inteligentes por perto, somando os bônus de Intelecto deles. A sintonia é involuntária: do 10º em diante ele atrai raios.',
  },
};

// ── O Lapidário ─────────────────────────────────────────────────────────────
// O Hipercientista do livro, vestido de engenheiro de kyber. É a única Senda que
// congela as DUAS colunas ja no 5o e nunca mais progride — por isso e a unica em
// que o Caminho nao tem o que decidir. Ele esta tao fora do eixo mistico que nem a
// escolha moral chega ao corpo dele.
Object.assign(TABELAS_SPEC, {
  'Lapidário': {
    base: 'Sensível à Força',
    congela: { ba: 5, jp: 5 },
    substitui: {
      // o Alcance avanca UMA LINHA DA TABELA a cada dois niveis, nao um por nivel.
      // O livro da o exemplo: no 5o tem 9%, e so no 7o sobe para 13% (o valor do 6o).
      alcance: (n) => S[Math.min(20, 5 + Math.floor((n - 5) / 2)) - 1].alcance,
      // a Grandeza trava duas vezes: para na 3a ate o 9o, na 4a ate o 13o, e so
      // entao volta a subir de dois em dois. Teto pratico: 8a.
      grandeza: (n) => {
        if (n < 9) return '3ª';
        if (n < 13) return '4ª';
        return ordinal(Math.min(8, 5 + Math.floor((n - 13) / 2)));
      },
    },
    novas: {
      'Aparatos': (n) => (n >= 20 ? 'como Técnico igual' : n >= 10 ? 'como Técnico ½' : 'defensivos'),
      'PV por nível': (n) => (n >= 17 ? '+2' : '—'),
      'Poder pede rolagem': (n) => (n >= 20 ? 'sempre' : '—'),
    },
    nota: 'Ele extrai o poder <strong>do cristal</strong>, não de si — e a Força própria atrofia. No 20º alcança o auge como artífice e o fundo como místico: cria aparatos como um Técnico de igual nível, mas <strong>todo</strong> poder da Força passa a exigir rolagem, porque ele já desaprendeu a sentir.',
  },
});

// ── A Senda Mandaloriana ────────────────────────────────────────────────────
// Não é uma especialização a mais: ela SUBSTITUI a especialização da classe, e
// cada classe paga um preço diferente por entrar nela. Por isso são quatro
// tabelas, uma por classe base — as combinações que a mesa de fato usa.
Object.assign(TABELAS_SPEC, {
  'Mandaloriano Veterano': {
    base: 'Veterano',
    congela: { desarmar: 5 },
    nota: 'Mantém <strong>Ataques Múltiplos</strong> e <strong>Pilotar</strong> — o guerreiro de clã continua soldado e continua piloto. O que ele abre mão é da manobra de desarme, e da especialização que teria escolhido.',
  },
  'Mandaloriano Operativo': {
    base: 'OperativoTalentos',
    congela: { furtivo: 5 },
    novas: {
      'Rastrear': (n, b) => b.percepcao,
    },
    nota: 'O <strong>Ataque Furtivo congela</strong>: o guerreiro de honra não apunhala pelas costas. Em troca o clã lhe ensina a <strong>rastrear</strong>, com a mesma faixa da sua Percepção (1d6).',
  },
  'Mandaloriano Técnico': {
    base: 'Técnico',
    congela: {},
    novas: {
      'Crédito Tecnológico': () => 'perdido',
    },
    nota: 'Perde o <strong>Crédito Tecnológico</strong> — o dever de clã rouba o tempo de barganha. Mantém aparatos e feitos: o <strong>Armeiro</strong> de um clã é, em regra, um Técnico.',
  },
  'Mandaloriano Sensível': {
    base: 'Sensível à Força',
    // NAO congela BA nem JP: a Senda cobra com o OFICIO, nao com o corpo. Mas o
    // Mentalico e a unica classe cujo aprofundamento cobraria o corpo, entao escapar
    // disso vale mais para ele do que para os outros tres chassis. O teto de Grandeza
    // e a compensacao — e e a moeda certa, porque e Forca, nao carne.
    congela: {},
    substitui: {
      alcance: (n) => S[Math.max(1, n - 1) - 1].alcance,
      grandeza: (n) => {
        const g = num(grandezaEm(n));
        return g >= 6 ? '6ª (teto)' : `${g}ª`;
      },
    },
    novas: {
      'Forma de Sabre': (n) => (n >= 5 ? 'até 10º' : '—'),
    },
    nota: 'O <strong>Alcance conta como o de um Sensível de um nível abaixo</strong> e o <strong>teto de Grandeza para na 6ª</strong>: ele passou a vida jurando um credo e aprendendo a lutar de armadura, não meditando sobre a natureza da Força. Em troca, mantém BA e JP progredindo até o 20º — o único Sensível que não paga com o corpo — e o clã lhe ensina <strong>uma</strong> Forma de Sabre. Sem Eco da Senda e sem Mudar de Guarda: conhece uma Forma só, e não tem para onde trocar.',
  },
});

/**
 * Monta a tabela da especialização, do 5º ao 20º nível.
 * Devolve { colunas: [...], linhas: [{ nivel, valores: [...], congelado: Set }] }.
 */
export function tabelaDaSpec(nome) {
  const def = TABELAS_SPEC[nome];
  if (!def) return null;
  const base = PROGRESSOES[def.base];
  const chavesBase = Object.keys(base[0]).filter((k) => k !== 'nivel' && k !== 'xp');
  const novas = Object.keys(def.novas ?? {});

  const ROTULOS = {
    dv: 'DV', ba: 'BA', jp: 'JP', pilotar: 'Pilotar', desarmar: 'Desarmar', critico: 'Crítico',
    sabotagem: 'Sabotagem', rodadas: 'Rodadas', escalar: 'Escalar', furtividade: 'Furtividade',
    furtar: 'Furtar', percepcao: 'Percepção', furtivo: 'Atq. Furtivo',
    operar: 'Operar Máq.', nt: 'NT', alcance: 'Alcance', grandeza: 'Grandeza',
  };

  const linhas = [];
  for (let n = 5; n <= 20; n++) {
    const b = base[n - 1];
    const valores = [];
    const congelado = new Set();
    const trocado = new Set();
    for (const k of chavesBase) {
      const trava = def.congela[k];
      const troca = def.substitui?.[k];
      if (trava && n >= trava) {
        // congelado: repete o valor em que travou (ja com a substituicao, se houver)
        const bTrava = base[trava - 1];
        valores.push(troca ? troca(trava, bTrava, base) : bTrava[k]);
        congelado.add(k);
      } else if (troca) {
        // substituido: a coluna mostra o valor FINAL daquele talento, nao o da base
        const v = troca(n, b, base);
        valores.push(v);
        // so marca quando o numero REALMENTE difere — senao o destaque mente,
        // sugerindo mudanca onde a especializacao coincide com a classe base
        if (String(v) !== String(b[k])) trocado.add(k);
      } else {
        valores.push(b[k]);
      }
    }
    for (const t of novas) valores.push(def.novas[t](n, b, base));
    linhas.push({ nivel: n, valores, congelado, trocado });
  }

  return {
    colunas: [...chavesBase.map((k) => ROTULOS[k] ?? k), ...novas],
    chaves: [...chavesBase, ...novas],
    linhas,
    congela: def.congela,
    nota: def.nota,
  };
}
