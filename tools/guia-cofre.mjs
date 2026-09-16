// Emite o guia do jogador em markdown, para o cofre do Obsidian.
//
//   node tools/guia-cofre.mjs
//
// Mesma fonte do journal do Foundry (tools/data/resumo-jogador.mjs), para os dois
// nunca descolarem. Este aqui é escrito para VIRAR PDF DIAGRAMADO: tabela em vez de
// lista sempre que couber, linha curta, sem HTML.

import fs from 'node:fs';
import path from 'node:path';
import { CLASSES, ESPECIES } from './data/resumo-jogador.mjs';
import { matrizCongelamento } from './data/especializacoes.mjs';
import { TEXTOS_SPEC } from './data/textos-spec.mjs';
import { tabelaDaSpec } from './data/tabelas-spec.mjs';

const DESTINO = path.join(
  'C:', 'Users', 'MaiconDouglasFrancad', 'Documents', 'Ekhoria',
  '20 Space Dragon', 'Space Dragon Nativo', 'SW-SDN-Guia-do-Jogador.md');

// tira o HTML que o journal usa e devolve markdown
const md = (s) => String(s)
  .replace(/<strong>(.*?)<\/strong>/g, '**$1**')
  .replace(/<em>(.*?)<\/em>/g, '*$1*')
  .replace(/<\/?[^>]+>/g, '');

const L = [];
const p = (...linhas) => L.push(...linhas, '');

p(`---
title: "Guia do Jogador — criação de personagem"
author: Maicon Lara
date: 2026
tags:
  - spacedragon
  - starwars
---`);

p('# Criação de Personagem — o essencial');

p('> O básico para preencher a ficha, numa página. O detalhe mora em',
  '> [[SW-SDN-Atributos]], [[SW-SDN-Classes]], [[SW-SDN-Forca]] e [[SW-SDN-Especies]].');

// ── as cinco formas ─────────────────────────────────────────────────────────
p('## Como se rola');

p('O sistema inteiro se resolve com cinco formas, e elas correm em **duas direções',
  'opostas**. Se você vem do Old Dragon 2, é aqui que se erra.');

p('| Forma | Rolagem | Passa quando |',
  '|---|---|---|',
  '| **Teste de atributo** | `1d20` | resultado **≤ o atributo** (20 natural sempre falha) |',
  '| **Talento / chance** | `d%` | resultado **≤ a porcentagem** |',
  '| **Jogada de Proteção** | `1d20 + ajuste` | total **≥ o valor de JP** da classe |',
  '| **Ataque** | `1d20 + BA` | total **≥ o CP** do alvo |',
  '| **Jogada resistida** | `1d20 + atributo` | **o maior** dos dois vence |');

p('> **Atributo e talento rolam por baixo. Proteção e ataque rolam por cima.**');

p('**As três Jogadas de Proteção.** Você tem **um** valor de JP, que vem da classe e',
  '**desce** conforme sobe de nível. O tipo só diz qual ajuste somar: **JPR** (Reflexos,',
  'Destreza), **JPF** (Física, Constituição), **JPM** (Mental, Intelecto).');

p('**Ordem de Ação.** Não existe iniciativa: **o menor resultado age primeiro**. Atacar',
  'rola o **dado de dano da arma**; aparato ou poder usa o **NT** ou a **Grandeza**; correr',
  'e outras ações usam `10 − ajuste de Destreza`. Empate é simultâneo.');

// ── passo a passo ───────────────────────────────────────────────────────────
p('## Passo a passo');

p('1. **Role 3d6 seis vezes** e distribua livremente entre Força, Destreza, Constituição,',
  '   Intelecto, Ciência e Comunicação.',
  '2. **Escolha a espécie** e aplique o +2 e o −2 dela.',
  '3. **Escolha a classe.** Olhe o atributo-chave: ele diz se o personagem vai funcionar.',
  '4. **Escolha a Afiliação** — Leal, Neutro ou Rebelde. Ela tranca as especializações do',
  '   5º nível. *O Sensível à Força é a exceção: as Sendas dele não têm trava.*',
  '5. **PV:** no 1º nível você recebe o **máximo** do dado de vida, sem rolar, + ajuste de',
  '   Constituição.',
  '6. **Créditos iniciais:** role o que a classe manda e compre equipamento.',
  '7. **CP = proteção da veste + ajuste de Destreza + aparatos e poderes + bônus de nível.**',
  '   A Destreza entra **inteira** (não há teto por armadura). O bônus de nível é +1 no 4º,',
  '   +2 no 8º, +3 no 12º, +4 no 16º e +5 no 20º — o valor da faixa *é* o total.',
  '8. **Movimento 10 m**, menos veste, carga, gravidade e terreno.');

// ── classes ─────────────────────────────────────────────────────────────────
p('## As quatro classes');

p('| Classe | Chassi | DV | Atributo-chave | Créditos |',
  '|---|---|---|---|---|',
  ...CLASSES.map((c) =>
    `| **${c.nome}** | ${c.chassi} | ${c.dv} | ${md(c.chave)} | ${c.creditos} |`));

for (const c of CLASSES) {
  p(`### ${c.nome}`);
  p(`*${c.papel}*`);
  p(`| | |`, `|---|---|`,
    `| **Armas** | ${md(c.armas)} |`,
    `| **Vestes** | ${md(c.vestes)} |`,
    `| **Aparatos** | ${md(c.aparatos)} |`,
    `| **Na ficha** | ${md(c.talentos)} |`);
  p('| Habilidade | Nível | O que faz |', '|---|---|---|',
    ...c.poderes.map(([n, lv, d]) => `| **${n}** | ${lv} | ${md(d)} |`));
  p('**Especializações (5º nível):** ' + c.specs.map(
    ([n, a, d]) => `**${n}**${a !== '—' ? ` (${a})` : ''} — *${d}*`).join(' · '));
  if (c.nota) p('> ' + md(c.nota));
}


// ── especializações ─────────────────────────────────────────────────────────
p('## As especializações');

p('No Space Dragon uma especialização é uma **troca**, não um acréscimo. Ela abre no',
  '**5º nível** e quase sempre **congela** algum talento em troca do que dá.');

p('> **ANOTE é o passo que a mesa esquece.** No momento em que um talento congela,',
  '> **escreva o valor dele na ficha**. Seis sessões depois ninguém lembra em que número',
  '> parou, e a discussão come a cena.');

// a matriz: de relance, o que cada caminho do Operativo sacrifica
{
  const { talentos, specs, matriz } = matrizCongelamento('Operativo');
  p('### O que cada caminho do Operativo sacrifica');
  p('| Talento | ' + specs.join(' | ') + ' |',
    '|---|' + specs.map(() => '---').join('|') + '|',
    ...talentos.map((t) => '| **' + t + '** | ' + specs.map((sp) => {
      const n = matriz[t][sp];
      return n ? `~~congela no ${n}º~~` : 'segue';
    }).join(' | ') + ' |'));
  p('> O **Espião** não congela nada — é a única do Operativo que só soma. O **Sabotador**',
    '> congela cinco dos seis: ele aposta tudo numa carta.');
}

const porClasse = {};
for (const e of TEXTOS_SPEC) (porClasse[e.classe] ??= []).push(e);

for (const [classe, lista] of Object.entries(porClasse)) {
  p(`### ${classe}`);
  for (const e of lista) {
    p(`#### ${e.nome}${e.sabor ? ` — *${e.sabor}*` : ''}`);
    // TEXTO ORIGINAL, como esta no cofre
    p(e.texto);
    if (e.exemplo) p(`> *${e.exemplo}*`);

    const t = tabelaDaSpec(e.nome);
    if (!t) continue;
    p(`**Progressão do ${e.nome}** — do 5º ao 20º nível.`);
    p('| Nv | ' + t.colunas.join(' | ') + ' |',
      '|---|' + t.colunas.map(() => '---').join('|') + '|',
      ...t.linhas.map((l) => `| **${l.nivel}** | ` + l.valores.map((v, i) =>
        l.congelado.has(t.chaves[i]) ? `⊘ ${v}` : v).join(' | ') + ' |'));
    const travadas = Object.keys(t.congela);
    p('⊘ = congelado, repete o valor em que travou.'
      + (travadas.length ? '' : ' *(esta especialização não congela nada.)*'));
    if (t.nota) p('> ' + t.nota);
  }
}

// ── espécies ────────────────────────────────────────────────────────────────
p('## As espécies');

p('Todas com **movimento 10 m**, e tudo vale desde o 1º nível. **Humano** e **Droide** são',
  'os moldes nativos do Space Dragon; as outras sete são criações deste cenário, sobre o',
  'molde Humano.');

p('| Espécie | Ajustes | O que ela te dá |',
  '|---|---|---|',
  ...ESPECIES.map((e) => `| **${e.nome}** | ${e.mods} | ${md(e.resumo)} |`));

p('> **O detalhe que decide escolha:** só o **Humano** e o **Droide** ganham **+1 num',
  '> atributo a cada 4 níveis**. As espécies do cenário trocam esse crescimento pelos',
  '> talentos próprios delas.');

p('---');
p('*Star Wars — Adaptação para Space Dragon (regras nativas)* · texto de **Maicon Lara** ·',
  'obra de fã, não oficial e sem fins lucrativos · CC BY-SA 4.0 · Star Wars © Lucasfilm Ltd. ·',
  '*Space Dragon* © Old Dragon Editora.');

fs.writeFileSync(DESTINO, L.join('\n').replace(/\n{3,}/g, '\n\n'), 'utf8');
const txt = fs.readFileSync(DESTINO, 'utf8');
console.log(`gerado ${path.basename(DESTINO)}`);
console.log(`  ${txt.split('\n').length} linhas · ${txt.split(/\s+/).length} palavras`);
