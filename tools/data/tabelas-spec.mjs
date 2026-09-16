// Deriva a tabela de progressão de cada especialização a partir da tabela da
// classe base (tools/data/progressoes.mjs).
//
// A ideia: o jogador da especialização quer a MESMA tabela da classe base, só que
// já resolvida para o caminho dele — as colunas que congelaram repetindo o número
// em que travaram, e as colunas novas que a especialização traz.
//
// `congela: { coluna: nível }` — a partir dali a coluna repete o valor daquele
// nível. O personagem alcançou aquele patamar; o que ele perde é o crescimento.
//
// `novas: { título: (nivel, base, tudo) => valor }` — as colunas que só a
// especialização tem.

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
    novas: {
      'Crítico c/ a arma': (n, b) => `×${mult(b.critico) + 1}`,
    },
    nota: 'O crítico da coluna vale para qualquer arma; o da última coluna, só para a arma escolhida.',
  },
  'Caçador de Recompensas': {
    base: 'Veterano',
    congela: {},
    novas: {
      'Aparatos e máquinas': (n, b) => b.desarmar,
      'Ataques': (n) => (n >= 20 ? '3' : n >= 10 ? 'até +2' : '—'),
    },
    nota: 'A chance de operar aparatos ofensivos e consertar máquinas é a própria % de Desarmar/Subjugar.',
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
    novas: {
      'Sabotagem (nova)': (n, b) => (n >= 20 ? '99%' : b.furtividade),
      'Disfarce': (n, b) => (n >= 20 ? '99%' : b.furtar),
    },
    nota: 'A Sabotagem sobe para a % de Furtividade e passa a subir com ela. No 20º, Furtividade, Sabotagem e Furtar igualam os 99% de Escalar.',
  },
  'Sabotador': {
    base: 'OperativoTalentos',
    congela: { furtar: 5, furtivo: 5, escalar: 10, furtividade: 10, percepcao: 10 },
    novas: {
      'Bônus': (n, b) => `+${100 - num(b.escalar)}%`,
      // No 20o o livro fixa 99% e 1%, e nao o que a formula daria (81%/19%).
      'Sabotagem final': (n, b) =>
        n >= 20 ? '99%' : pct(num(b.sabotagem) + (100 - num(b.escalar))),
      'Desarme da armadilha': (n, b) =>
        n >= 20 ? '1%' : n < 10 ? '—' : pct(100 - (num(b.sabotagem) + (100 - num(b.escalar)))),
    },
    nota: 'O bônus é recalculado a cada nível sobre a % da tabela — não acumula. A armadilha é o inverso da sua Sabotagem final. No 20º o livro fixa 99% e 1%, acima do que a fórmula daria.',
  },
  'Assassino': {
    base: 'OperativoTalentos',
    congela: { escalar: 5, sabotagem: 5, furtar: 10 },
    novas: {
      'Atq. Furtivo (novo)': (n, b) => `×${mult(b.furtivo) + 1}`,
      'Acerto vira furtivo': (n) => (n >= 10 ? '20%' : '—'),
    },
    nota: 'No 20º todos os ataques contam como Ataque Furtivo, e um crítico pede JPF ou morte.',
  },
  'Contrabandista': {
    base: 'OperativoTalentos',
    congela: { sabotagem: 5, furtar: 5, furtividade: 10 },
    novas: {
      'Ataque adicional': (n, b) => (n < 10 ? '—' : b.furtividade),
    },
    nota: 'A % de Furtividade congelada vira a sua chance de um ataque a mais no turno (com a BA de 7 níveis abaixo). No 20º são sempre dois ataques.',
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
    novas: {
      'NT (novo)': (n) => `${Math.min(10, 4 + Math.floor((n - 5) / 2))}º`,
      'Custo': (n) => (n >= 10 ? 'dobrado' : 'acrescido'),
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
    congela: {},
    novas: {
      'BA (como Veterano)': (n) => V[n - 1].ba,
      'Teto efetivo': (n) => {
        const g = num(grandezaEm(n));
        return g >= 6 ? '6ª (teto)' : `${g}ª`;
      },
    },
    nota: 'A BA passa a evoluir como a de um Veterano e você usa vestes médias sem bloquear os poderes. Em troca, o teto de Grandeza para na 6ª.',
  },
  'Consular': {
    base: 'Sensível à Força',
    congela: { ba: 5, jp: 10 },
    novas: {
      'Grandeza (nova)': (n) => ordinal(Math.min(10, 4 + Math.floor((n - 5) / 2))),
      'Alcance (nova)': (n) => (n >= 20 ? '200%' : S[Math.min(20, n + 2) - 1].alcance),
      'Preço': (n) => (n >= 20 ? 'JPF ou morre' : n >= 17 ? 'JPF ou −1 CON' : n >= 10 ? '−1-2 PV/nível' : '—'),
    },
    nota: 'Ganha a 4ª Grandeza direto no 5º e +1 a cada 2 níveis, chegando à 10ª no 17º. O Alcance conta como o de um Sensível +2 níveis. O corpo paga a conta.',
  },
  'Sentinela': {
    base: 'Sensível à Força',
    congela: {},
    novas: {
      'Talentos (metade do nível)': (n) => gatuno('furtividade', Math.max(1, n / 2)),
      'JP contra a Força': (n) => (n >= 10 ? 'Fácil' : 'normal'),
    },
    nota: 'Escolhe três talentos de Operativo, com a % de um Gatuno de metade do seu nível. A única especialização que não troca nada.',
  },
  'Vidente': {
    base: 'Sensível à Força',
    congela: { ba: 10 },
    novas: {
      'Comunhão': (n) => (n >= 20 ? '100 m' : n >= 10 ? '40 m' : '20 m'),
      'Teto da Comunhão': (n) => (n >= 20 ? '½ do Alcance' : n >= 10 ? '⅓' : '¼'),
      'Atrai descargas': (n) => (n >= 20 ? '80%' : n >= 10 ? '30%' : '—'),
    },
    nota: 'Canaliza a Força dos seres inteligentes por perto, somando os bônus de Intelecto deles. A sintonia é involuntária: do 10º em diante ele atrai raios.',
  },
};

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
    for (const k of chavesBase) {
      const trava = def.congela[k];
      if (trava && n >= trava) {
        valores.push(base[trava - 1][k]);
        congelado.add(k);
      } else {
        valores.push(b[k]);
      }
    }
    for (const t of novas) valores.push(def.novas[t](n, b, base));
    linhas.push({ nivel: n, valores, congelado });
  }

  return {
    colunas: [...chavesBase.map((k) => ROTULOS[k] ?? k), ...novas],
    chaves: [...chavesBase, ...novas],
    linhas,
    congela: def.congela,
    nota: def.nota,
  };
}
