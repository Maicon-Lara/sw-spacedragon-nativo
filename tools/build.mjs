// Build dos compêndios de "Star Wars — Space Dragon (Nativo)".
//
// 1) escreve os JSON-fonte em packs-src/ (versionados, legíveis em diff)
// 2) compila cada pack para LevelDB em modulo/packs/
//
//   node tools/build.mjs
//
// Depende de @foundryvtt/foundryvtt-cli. Enquanto ele não estiver instalado aqui, o
// build cai no node_modules do repo irmão sw-spacedragon-foundryvtt, que já o tem.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { BESTIARIO } from './data/bestiario.mjs';
import { journalCriacao } from './journal.mjs';

const RAIZ = path.resolve(fileURLToPath(import.meta.url), '../..');
const SRC = path.join(RAIZ, 'packs-src');
const PACKS = path.join(RAIZ, 'modulo', 'packs');
const ID = 'sw-spacedragon-nativo';

// ── compilePack, com queda para o repo irmão ────────────────────────────────
async function carregarCli() {
  const candidatos = [
    '@foundryvtt/foundryvtt-cli',
    path.join(RAIZ, '..', 'sw-spacedragon-foundryvtt', 'node_modules',
              '@foundryvtt', 'foundryvtt-cli', 'index.mjs'),
  ];
  for (const c of candidatos) {
    try {
      const mod = await import(c.startsWith('@') ? c : 'file:///' + c.replace(/\\/g, '/'));
      if (mod.compilePack && mod.extractPack) {
        if (!c.startsWith('@')) console.log('  (usando o CLI do repo irmão)');
        return [mod.compilePack, mod.extractPack];
      }
    } catch { /* tenta o próximo */ }
  }
  throw new Error(
    'não achei @foundryvtt/foundryvtt-cli.\n' +
    '  Instale com:  npm install --save-dev @foundryvtt/foundryvtt-cli');
}

// ── id estável de 16 caracteres, derivado do nome ───────────────────────────
const ALFABETO = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
function id16(semente) {
  // hash simples e determinístico: o mesmo nome sempre dá o mesmo _id, para que
  // reconstruir o pack não troque os ids e não quebre referências nos mundos.
  let h1 = 0x811c9dc5, h2 = 0x01000193;
  for (let i = 0; i < semente.length; i++) {
    h1 = (h1 ^ semente.charCodeAt(i)) * 0x01000193 >>> 0;
    h2 = (h2 + semente.charCodeAt(i) * (i + 7)) >>> 0;
  }
  let out = '';
  for (let i = 0; i < 16; i++) {
    const n = i < 8 ? (h1 = (h1 * 1103515245 + 12345) >>> 0) : (h2 = (h2 * 1103515245 + 12345) >>> 0);
    out += ALFABETO[(n >>> (i % 4) * 5) % ALFABETO.length];
  }
  return out;
}

// ── a ficha de criatura como Actor do CSB ───────────────────────────────────
const TAM_CHAVE = {
  pequeno: 'tam_pequeno', medio: 'tam_medio', grande: 'tam_grande',
  imenso: 'tam_imenso', colossal: 'tam_colossal',
};
const AFIL_CHAVE = { leal: 'afil_leal', neutro: 'afil_neutro', rebelde: 'afil_rebelde' };

function outrosDeslocamentos(mov) {
  const partes = [];
  for (const [k, rot] of [['nadando', 'nadando'], ['voando', 'voando'],
                          ['escalando', 'escalando'], ['escavando', 'escavando']]) {
    if (mov[k] != null) partes.push(`${rot} ${mov[k]} m`);
  }
  if (mov.imovel) partes.push('imóvel');
  return partes.join(', ');
}

function criaturaDoc(c) {
  const nome = c.apelido ? `${c.nome} (${c.apelido})` : c.nome;
  const _id = id16('criatura:' + c.nome);
  return {
    _id,
    _key: `!actors!${_id}`,
    name: nome,
    type: 'character',
    img: 'icons/svg/mystery-man.svg',
    system: {
      template: null,          // o mundo liga à ficha "Criatura (SD Nativo)" ao importar
      props: {
        cr_tamanho: TAM_CHAVE[c.tamanho] ?? 'tam_medio',
        cr_afiliacao: AFIL_CHAVE[c.afiliacao] ?? 'afil_neutro',
        cr_for: c.atributos?.FOR ?? 10,
        cr_des: c.atributos?.DES ?? 10,
        cr_con: c.atributos?.CON ?? 10,
        cr_int: c.atributos?.INT ?? 10,
        cr_cie: c.atributos?.CIE ?? 10,
        cr_com: c.atributos?.COM ?? 10,
        cr_cp: c.cp,
        cr_jp: c.jp,
        cr_dv: c.dv ?? 0,
        cr_dv_bonus: c.dvBonus ?? 0,
        cr_pv_atual: c.pv,
        cr_pv_max: c.pv,
        cr_moral: c.moral,
        cr_mov: c.movimento.base ?? 0,
        cr_mov_outros: outrosDeslocamentos(c.movimento),
        cr_rm: c.rm ?? 0,
        cr_rd: c.rd ? c.rd.valor : 0,
        cr_rd_excecao: c.rd ? c.rd.excecao : '',
        cr_xp: c.xp,
        // as letras da linha de premios: O ofensiva, D defensiva, U utilitaria
        cr_premios: (c.reliquias ?? []).join(', '),
        cr_ataques: c.ataques,
        cr_descricao: '',
      },
    },
    items: [],
    effects: [],
    folder: null,
    sort: 0,
    ownership: { default: 0 },
    flags: { [ID]: { fonte: 'cofre', versao: 1 } },
  };
}

// ── as duas fichas-template, vindas de modulo/template-sdn.json ─────────────
function fichasDoc() {
  const p = path.join(RAIZ, 'modulo', 'template-sdn.json');
  if (!fs.existsSync(p)) {
    throw new Error('faltando modulo/template-sdn.json — rode node tools/gerar-template.mjs');
  }
  const exp = JSON.parse(fs.readFileSync(p, 'utf8'));
  return exp.actors.map((a) => {
    const _id = id16('ficha:' + a.name);
    return {
    _id,
    _key: `!actors!${_id}`,
    name: a.name,
    type: '_template',
    img: 'icons/svg/book.svg',
    system: a.data,
    items: [],
    effects: [],
    folder: null,
    sort: 0,
    ownership: { default: 0 },
    flags: { [ID]: { fonte: 'gerador', versao: 1 } },
    };
  });
}

// ── escrita e compilação ────────────────────────────────────────────────────
function escreverFonte(pack, docs) {
  const dir = path.join(SRC, pack);
  fs.rmSync(dir, { recursive: true, force: true });
  fs.mkdirSync(dir, { recursive: true });
  for (const d of docs) {
    const slug = d.name.toLowerCase()
      .normalize('NFD').replace(/[̀-ͯ]/g, '')
      .replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    fs.writeFileSync(path.join(dir, `${slug}.json`),
                     JSON.stringify(d, null, 2), 'utf8');
  }
  return docs.length;
}

const [compilePack, extractPack] = await carregarCli();
fs.mkdirSync(PACKS, { recursive: true });

function journalDoc(j) {
  const _id = id16('journal:' + j.name);
  return {
    _id, _key: `!journal!${_id}`,
    name: j.name,
    pages: j.pages.map((pg) => {
      const pid = id16('jpage:' + j.name + ':' + pg.name);
      return { ...pg, _id: pid, _key: `!journal.pages!${_id}.${pid}` };
    }),
    folder: null, sort: 0, ownership: { default: 2 },
    flags: { [ID]: { fonte: 'gerador', versao: 1 } },
  };
}

const tarefas = [
  ['sdn-fichas', fichasDoc()],
  ['sdn-bestiario', BESTIARIO.map(criaturaDoc)],
  ['sdn-journal', [journalDoc(journalCriacao())]],
];

for (const [pack, docs] of tarefas) {
  const n = escreverFonte(pack, docs);
  const destino = path.join(PACKS, pack);
  fs.rmSync(destino, { recursive: true, force: true });
  await compilePack(path.join(SRC, pack), destino, { log: false });

  // O CLI PULA EM SILENCIO todo documento sem _key. Conferir que o que entrou
  // foi mesmo o que saiu, senao o compendio instala vazio no Foundry.
  const conferencia = path.join(RAIZ, '_scratch', 'conferir-' + pack);
  fs.rmSync(conferencia, { recursive: true, force: true });
  await extractPack(destino, conferencia, { log: false });
  const gravados = fs.existsSync(conferencia) ? fs.readdirSync(conferencia).length : 0;
  fs.rmSync(conferencia, { recursive: true, force: true });
  if (gravados !== n) {
    console.error(`  ERRO ${pack}: escrevi ${n} documentos e o pack tem ${gravados}.`);
    console.error('       Falta _key ("!actors!<id>") nos documentos?');
    process.exit(1);
  }
  console.log(`  ok ${pack.padEnd(16)} ${String(n).padStart(3)} documentos (conferidos no pack)`);
}

// ids únicos entre todos os packs
const todos = tarefas.flatMap(([, d]) => d.map((x) => x._id));
const dup = todos.filter((x, i) => todos.indexOf(x) !== i);
if (dup.length) {
  console.error(`  ERRO: _id repetido: ${[...new Set(dup)].join(', ')}`);
  process.exit(1);
}
console.log(`\n${todos.length} documentos, ${new Set(todos).size} ids únicos`);
