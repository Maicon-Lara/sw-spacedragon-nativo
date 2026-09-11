// Tabelas de atributo e subatributo do Space Dragon (livro básico aprimorado),
// transcritas de 20 Space Dragon/Space Dragon Nativo/SW-SDN-Atributos.md depois da
// auditoria de 11/09/2026 — inclui as correções da T1-2 e da T1-5, que no cofre
// tinham colunas de % duplicadas/deslocadas.
//
// Cada tabela é uma lista de [valorMaximoDaFaixa, ...colunas]. A faixa é fechada
// no topo: procura-se a primeira entrada cujo valorMaximo >= valor do atributo.

export const FAIXAS = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25, 27, 29];

// ── T1-1 Força ──────────────────────────────────────────────────────────────
// [ajuste de ataque/dano CaC, subjugar %, carga leve, média, pesada (kg)]
export const T1_1 = [
  [1, -5, -25, 1, 2, 5],
  [3, -4, -20, 3, 5, 15],
  [5, -3, -15, 5, 8, 25],
  [7, -2, -10, 12, 15, 35],
  [9, -1, -5, 15, 25, 45],
  [11, 0, 0, 19, 30, 58],
  [13, +1, +5, 25, 40, 75],
  [15, +2, +10, 33, 50, 100],
  [17, +3, +15, 43, 70, 130],
  [19, +4, +20, 58, 90, 175],
  [21, +5, +25, 75, 120, 230],
  [23, +6, +30, 100, 150, 300],
  [25, +7, +35, 135, 200, 400],
  [27, +8, +40, 175, 250, 520],
  [29, +9, +45, 235, 350, 700],
];

// ── T1-2 Destreza ───────────────────────────────────────────────────────────
// [ajuste de ataque à distância e JPR, ajuste nos talentos de Gatuno %]
// UMA coluna de % só — vale para Furtividade, Furtar e Desarmar.
export const T1_2 = [
  [1, -5, -25],
  [3, -4, -20],
  [5, -3, -15],
  [7, -2, -10],
  [9, -1, -5],
  [11, 0, 0],
  [13, +1, +5],
  [15, +2, +10],
  [17, +3, +15],
  [19, +4, +20],
  [21, +5, +25],
  [23, +6, +30],
  [25, +7, +35],
  [27, +8, +40],
  [29, +9, +45],
];

// ── T1-3 Constituição ───────────────────────────────────────────────────────
// [ajuste de PV e JPF, prob. de clonagem %, danos mortais (PV negativos)]
export const T1_3 = [
  [1, -5, 0, -5],
  [3, -4, 0, -6],
  [5, -3, 0, -7],
  [7, -2, 1, -8],
  [9, -1, 10, -9],
  [11, 0, 25, -10],
  [13, +1, 50, -11],
  [15, +2, 75, -12],
  [17, +3, 95, -13],
  [19, +4, 100, -14],
  [21, +5, 100, -15],
  [23, +6, 100, -16],
  [25, +7, 100, -17],
  [27, +8, 100, -18],
  [29, +9, 100, -19],
];

// ── T1-4 Intelecto ──────────────────────────────────────────────────────────
// [realizar/aprender poder %, alcance da Força adicional %, ajuste de JPM]
export const T1_4 = [
  [1, 0, 0, -5],
  [3, 0, 0, -4],
  [5, 0, 0, -3],
  [7, 0, 0, -2],
  [9, 0, 0, -1],
  [11, 15, 0, 0],
  [13, 25, +1, +1],
  [15, 35, +2, +2],
  [17, 45, +3, +3],
  [19, 55, +4, +4],
  [21, 65, +5, +5],
  [23, 75, +6, +6],
  [25, 85, +7, +7],
  [27, 95, +8, +8],
  [29, 100, +9, +9],
];

// ── T1-5 Ciência ────────────────────────────────────────────────────────────
// [robôs desativados por dia (expressão de dado), Crédito Tecnológico %]
// O Crédito Tecnológico é UM número só: serve de chance de sabotar máquinas, de
// uso de aparatos ofensivos pelo Caçador e de desconto do Técnico.
export const T1_5 = [
  [1, '0', -25],
  [3, '0', -20],
  [5, '0', -15],
  [7, '0', -10],
  [9, '1', -5],
  [11, '1d2', 0],
  [13, '1d3', +5],
  [15, '1d4', +10],
  [17, '1d6', +15],
  [19, '1d8', +20],
  [21, '2d4', +25],
  [23, '1d10', +30],
  [25, '1d12', +35],
  [27, '2d6', +40],
  [29, '1d20', +45],
];

// ── T1-6 Comunicação ────────────────────────────────────────────────────────
// [máx. de seguidores, ajuste de reação %, idiomas adicionais]
export const T1_6 = [
  [1, 0, -25, 0],
  [3, 0, -20, 0],
  [5, 0, -15, 0],
  [7, 0, -10, 0],
  [9, 0, -5, 0],
  [11, 1, 0, 0],
  [13, 2, +5, 1],
  [15, 3, +10, 2],
  [17, 4, +15, 3],
  [19, 5, +20, 4],
  [21, 6, +25, 5],
  [23, 7, +30, 6],
  [25, 8, +35, 7],
  [27, 9, +40, 8],
  [29, 10, +45, 9],
];

// ── T4-1 Bônus no CP por nível ──────────────────────────────────────────────
// NÃO é cumulativo: o valor da faixa É o bônus total.
export const T4_1 = [
  [3, 0],
  [7, +1],
  [11, +2],
  [15, +3],
  [19, +4],
  [20, +5],
];

// ── Ler e escrever ──────────────────────────────────────────────────────────
// Idiomas que o personagem sabe LER e ESCREVER = floor(Comunicação / 6).
export const LER_ESCREVER = 'floor(COM / 6)';

/** Consulta uma tabela pelo valor do atributo e devolve a coluna pedida (1-based). */
export function consultar(tabela, valor, coluna = 1) {
  for (const linha of tabela) {
    if (valor <= linha[0]) return linha[coluna];
  }
  return tabela[tabela.length - 1][coluna];
}

/**
 * Emite a consulta como cadeia de ternários, que é a forma mais portátil de
 * expressar um lookup num campo de fórmula (CSB, planilha, macro).
 */
export function ternario(tabela, coluna, prop) {
  const partes = [];
  for (let i = 0; i < tabela.length - 1; i++) {
    const v = tabela[i][coluna];
    partes.push(`${prop} <= ${tabela[i][0]} ? ${JSON.stringify(v)} : `);
  }
  partes.push(JSON.stringify(tabela[tabela.length - 1][coluna]));
  return partes.join('');
}
