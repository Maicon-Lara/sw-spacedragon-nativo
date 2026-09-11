// Verifica a coerência dos dados gerados contra as regras do Space Dragon.
// Roda sem Foundry: é o portão de qualidade antes de empacotar qualquer compêndio.
//
//   node tools/verificar.mjs

import { BESTIARIO } from './data/bestiario.mjs';
import * as T from './data/tabelas.mjs';

let erros = 0;
let avisos = 0;

const erro = (msg) => { console.log('  ERRO   ' + msg); erros++; };
const aviso = (msg) => { console.log('  aviso  ' + msg); avisos++; };

// ── 1. as tabelas contra os exemplos impressos no livro ─────────────────────
console.log('\n1. Tabelas de atributo contra os exemplos do livro');

const casos = [
  ['T1-1 FOR 14 → ataque +2', T.consultar(T.T1_1, 14, 1), 2],
  ['T1-2 DES 13 → talentos +5%', T.consultar(T.T1_2, 13, 2), 5],
  ['T1-3 CON 13 → PV/JPF +1', T.consultar(T.T1_3, 13, 1), 1],
  ['T1-3 CON 10 → morre em −10', T.consultar(T.T1_3, 10, 3), -10],
  ['T1-4 INT 10 → realizar 15%', T.consultar(T.T1_4, 10, 1), 15],
  ['T1-5 CIE 15 → Crédito +10%', T.consultar(T.T1_5, 15, 2), 10],
  ['T1-6 COM 20 → 6 seguidores', T.consultar(T.T1_6, 20, 1), 6],
  ['T4-1 nível 1 → CP +0', T.consultar(T.T4_1, 1, 1), 0],
  ['T4-1 nível 20 → CP +5', T.consultar(T.T4_1, 20, 1), 5],
];
for (const [nome, obtido, esperado] of casos) {
  if (obtido !== esperado) erro(`${nome} — obtido ${obtido}`);
}

// o exemplo do capítulo 4: cosmonauta de 1º nível, vestes médias (12), Destreza 13 → CP 13
const cpExemplo = 12 + T.consultar(T.T1_2, 13, 1) + T.consultar(T.T4_1, 1, 1);
if (cpExemplo !== 13) erro(`exemplo do CP do livro deu ${cpExemplo}, esperado 13`);
console.log(`  ${erros === 0 ? 'ok' : '  '}     ${casos.length + 1} conferências`);

// ── 2. o bestiário ──────────────────────────────────────────────────────────
console.log('\n2. Bestiário');

const nomes = new Set();
for (const c of BESTIARIO) {
  const id = c.nome || '(sem nome)';
  if (nomes.has(id)) erro(`criatura repetida: ${id}`);
  nomes.add(id);

  if (!c.tamanho) erro(`${id}: sem tamanho`);
  if (!c.afiliacao) erro(`${id}: sem afiliação`);
  if (c.movimento.base === undefined) erro(`${id}: sem movimento`);
  if (!c.cp || !c.jp) erro(`${id}: CP ou JP faltando`);
  if (!c.xp) erro(`${id}: sem XP`);
  if (!c.ataques) erro(`${id}: sem ataques`);

  // PV: o livro usa SEMPRE d8, e gravamos o máximo → pv = dv*8 + dvBonus
  if (c.pvFixo) {
    if (c.dv !== null) erro(`${id}: pvFixo mas tem dado de vida`);
  } else {
    const esperado = c.dv * 8 + c.dvBonus;
    if (c.pv !== esperado) {
      erro(`${id}: PV ${c.pv} não é o máximo de ${c.dv}d8+${c.dvBonus} (= ${esperado})`);
    }
  }

  // Moral é percentil, 0 a 100
  if (c.moral < 0 || c.moral > 100) erro(`${id}: moral ${c.moral}% fora de 0–100`);

  // RM é percentil
  if (c.rm !== undefined && (c.rm < 1 || c.rm > 100)) erro(`${id}: RM ${c.rm}% inválida`);

  // Robôs de mente simples vêm com Moral 100% e só saem por Desativação. O
  // Metahumano é a exceção documentada do livro: cérebro quase humano, Moral 80%.
  if (/desativ/i.test(c.ataques) && c.moral !== 100 && c.nome !== 'Metahumano') {
    aviso(`${id}: é robô com moral ${c.moral}% — só o Metahumano tem essa exceção`);
  }
}
console.log(`  ${BESTIARIO.length} criaturas · ${BESTIARIO.filter(c => c.rm).length} com RM · ` +
            `${BESTIARIO.filter(c => c.rd).length} com RD · ${BESTIARIO.filter(c => c.pvFixo).length} de PV fixo`);

// ── resultado ───────────────────────────────────────────────────────────────
console.log(`\n${erros === 0 ? 'PASSOU' : 'FALHOU'} — ${erros} erro(s), ${avisos} aviso(s)\n`);
process.exit(erros === 0 ? 0 : 1);
