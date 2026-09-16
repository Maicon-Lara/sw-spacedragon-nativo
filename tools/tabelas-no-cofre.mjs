// Insere (ou atualiza) a tabela de progressão de cada especialização nos arquivos
// do cofre, logo depois do texto dela.
//
//   node tools/tabelas-no-cofre.mjs            grava
//   node tools/tabelas-no-cofre.mjs --conferir  só diz o que mudaria
//
// O cofre é escrito à mão, então isto TEM de ser idempotente: cada tabela vive entre
// marcadores de comentário e é substituída na próxima execução, nunca duplicada. Se
// você editar algo dentro dos marcadores, a próxima execução desfaz — mexa em
// tools/data/tabelas-spec.mjs, que é a fonte.

import fs from 'node:fs';
import path from 'node:path';
import { tabelaDaSpec } from './data/tabelas-spec.mjs';
import { TEXTOS_SPEC } from './data/textos-spec.mjs';

const COFRE = path.join('C:', 'Users', 'MaiconDouglasFrancad', 'Documents', 'Ekhoria',
                        '20 Space Dragon');

// (pasta, arquivo de classes, arquivo da Força)
const VOLUMES = [
  ['Space Dragon Nativo', 'SW-SDN-Classes.md', 'SW-SDN-Forca.md'],
  ['Space Dragon Suplemento', 'SW-SUP-Classes.md', 'SW-SUP-Forca.md'],
];

const ABRE = (nome) => `<!-- tabela-spec: ${nome} -->`;
const FECHA = '<!-- /tabela-spec -->';

function blocoDaTabela(nome) {
  const t = tabelaDaSpec(nome);
  if (!t) return null;

  const linhas = [
    ABRE(nome),
    '',
    `**Progressão do ${nome}** — do 5º ao 20º nível.`,
    '',
    '| Nv | ' + t.colunas.join(' | ') + ' |',
    '|---|' + t.colunas.map(() => '---').join('|') + '|',
    ...t.linhas.map((l) => `| **${l.nivel}** | ` + l.valores.map((v, i) => {
      const k = t.chaves[i];
      if (l.congelado.has(k)) return `⊘ ${v}`;
      if (l.trocado.has(k)) return `**${v}**`;
      return v;
    }).join(' | ') + ' |'),
    '',
  ];

  const legenda = [];
  if (Object.keys(t.congela).length) {
    legenda.push('⊘ = congelado, repete o valor em que travou');
  }
  if (t.linhas.some((l) => l.trocado.size)) {
    legenda.push('**em negrito** = o valor desta especialização, no lugar do da classe base');
  }
  linhas.push(legenda.length
    ? legenda.join(' · ') + '.'
    : '*Nada congela nem muda: a tabela é a mesma da classe base.*');

  if (t.nota) {
    linhas.push('', '> ' + t.nota.replace(/<\/?strong>/g, '**').replace(/<\/?em>/g, '*'));
  }
  linhas.push('', FECHA);
  return linhas.join('\n');
}

// A Senda Mandaloriana nao tem cabecalho "### Nome" por especializacao: ela e uma
// secao so, com uma tabela de trocas textual. As quatro tabelas entram depois dela.
const MANDALORIANA = {
  arquivos: ['SW-SDN-Senda-Mandaloriana.md', 'SW-SUP-Senda-Mandaloriana.md'],
  ancora: '## Referência de equipamento',
  specs: ['Mandaloriano Veterano', 'Mandaloriano Operativo',
          'Mandaloriano Técnico', 'Mandaloriano Sensível'],
  abre: '<!-- tabelas-mandaloriana -->',
  fecha: '<!-- /tabelas-mandaloriana -->',
};

function blocoMandaloriana() {
  const partes = [
    MANDALORIANA.abre,
    '',
    '### As quatro tabelas da Senda',
    '',
    'A Senda substitui a especialização da classe, então a progressão muda conforme',
    'o chassi. Ache a sua e use a linha do seu nível.',
    '',
  ];
  for (const nome of MANDALORIANA.specs) {
    const bloco = blocoDaTabela(nome);
    if (!bloco) continue;
    // reaproveita o corpo, sem os marcadores individuais
    partes.push(bloco.split('\n').slice(1, -1).join('\n').trim(), '');
  }
  partes.push(MANDALORIANA.fecha);
  return partes.join('\n');
}

const conferir = process.argv.includes('--conferir');
let mudados = 0;
let inseridos = 0;
let atualizados = 0;

for (const [pasta, ...arquivos] of VOLUMES) {
  for (const arquivo of arquivos) {
    const caminho = path.join(COFRE, pasta, arquivo);
    if (!fs.existsSync(caminho)) {
      console.log(`  -- ${pasta}/${arquivo} não existe`);
      continue;
    }
    let texto = fs.readFileSync(caminho, 'utf8');
    const original = texto;

    // as especializações deste arquivo, na ordem em que aparecem
    const daqui = TEXTOS_SPEC.filter((e) => texto.includes(`### ${e.nome}`));

    for (const e of daqui) {
      const bloco = blocoDaTabela(e.nome);
      if (!bloco) continue;

      // 1. já existe um bloco nosso? substitui.
      const marcado = new RegExp(
        `${ABRE(e.nome).replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}[\\s\\S]*?${FECHA}`);
      if (marcado.test(texto)) {
        const novo = texto.replace(marcado, bloco);
        if (novo !== texto) atualizados++;
        texto = novo;
        continue;
      }

      // 2. não existe: insere no fim da seção da especialização
      const i = texto.indexOf(`### ${e.nome}`);
      if (i < 0) continue;
      // o fim é o próximo cabeçalho (### ou ## ou #) ou o separador ---
      const resto = texto.slice(i + 3);
      const m = resto.match(/\n(?=#{1,3} |---\s*\n)/);
      const fim = m ? i + 3 + m.index : texto.length;
      texto = texto.slice(0, fim) + '\n\n' + bloco + '\n' + texto.slice(fim);
      inseridos++;
    }

    if (texto !== original) {
      mudados++;
      if (!conferir) fs.writeFileSync(caminho, texto, 'utf8');
      console.log(`  ${conferir ? 'mudaria' : 'ok'} ${pasta}/${arquivo}  ` +
                  `(${daqui.length} especializações)`);
    } else {
      console.log(`  -- ${pasta}/${arquivo} já está em dia`);
    }
  }
}

// ── a Senda Mandaloriana ────────────────────────────────────────────────────
for (const [pasta] of VOLUMES) {
  for (const arquivo of MANDALORIANA.arquivos) {
    const caminho = path.join(COFRE, pasta, arquivo);
    if (!fs.existsSync(caminho)) continue;

    let texto = fs.readFileSync(caminho, 'utf8');
    const original = texto;
    const bloco = blocoMandaloriana();

    const marcado = new RegExp(
      `${MANDALORIANA.abre}[\\s\\S]*?${MANDALORIANA.fecha}`);
    if (marcado.test(texto)) {
      const novo = texto.replace(marcado, bloco);
      if (novo !== texto) atualizados += MANDALORIANA.specs.length;
      texto = novo;
    } else {
      const i = texto.indexOf(MANDALORIANA.ancora);
      if (i < 0) {
        console.log(`  !! ${pasta}/${arquivo}: não achei a âncora`);
        continue;
      }
      texto = texto.slice(0, i) + bloco + '\n\n' + texto.slice(i);
      inseridos += MANDALORIANA.specs.length;
    }

    if (texto !== original) {
      mudados++;
      if (!conferir) fs.writeFileSync(caminho, texto, 'utf8');
      console.log(`  ${conferir ? 'mudaria' : 'ok'} ${pasta}/${arquivo}  ` +
                  `(${MANDALORIANA.specs.length} tabelas da Senda)`);
    } else {
      console.log(`  -- ${pasta}/${arquivo} já está em dia`);
    }
  }
}

console.log(`\n${conferir ? 'conferência' : 'gravado'}: ${mudados} arquivo(s), ` +
            `${inseridos} tabela(s) inserida(s), ${atualizados} atualizada(s)`);
