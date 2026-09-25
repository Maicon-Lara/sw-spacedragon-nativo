// Página da camada da Força: o que é núcleo e o que é módulo opcional, a trilha
// de Corrupção, a Tentação e os Domínios do Eco da Senda.
//
// Existe porque o journal trazia as tabelas das Sendas mas não a camada que corre
// por cima delas — o jogador de Sensível abria a ficha sem saber o que era regra e
// o que a mesa podia deixar desligado.

import { NUCLEO, MODULOS, CORRUPCAO, TENTACAO, DOMINIOS, SEM_ECO } from './data/forca.mjs';

const esc = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// os textos de data/forca.mjs já vêm com <strong>/<em> de propósito
const cru = (s) => String(s);

function blocoNucleo() {
  const nucleo = NUCLEO.map((x) => `<li>${cru(x)}</li>`).join('');
  const modulos = MODULOS
    .map(([nome, sobre]) => `<li><strong>${esc(nome)}</strong> — ${esc(sobre)}</li>`)
    .join('');
  return `
<p>O Sensível é a classe mais densa do cenário — e não precisa ser usada toda de uma vez.
Só o <strong>núcleo</strong> é regra; o resto é <strong>módulo</strong>, e se liga quando a
mesa quiser.</p>

<table>
<thead><tr><th style="width:8em">Núcleo <em>(sempre)</em></th><th>Módulos <em>(opcionais)</em></th></tr></thead>
<tbody><tr>
<td><ul>${nucleo}</ul></td>
<td><ul>${modulos}</ul></td>
</tr></tbody>
</table>

<p>Um Jedi que tenha só o núcleo joga do 1º ao 20º sem buraco nenhum. Ligue os módulos um
por vez, de preferência depois que a mesa já estiver à vontade com o Alcance.</p>

<p><em>Para o Mestre:</em> os módulos são o que cobra <strong>julgamento seu em tempo
real</strong>. Se a sessão está corrida, o primeiro a desligar é a Tentação.</p>`;
}

function blocoCorrupcao() {
  const linhas = CORRUPCAO
    .map(([faixa, estado, efeito]) =>
      `<tr><td><strong>${esc(faixa)}</strong></td><td>${cru(estado)}</td><td>${cru(efeito)}</td></tr>`)
    .join('');
  return `
<h2>Corrupção — a trilha que fica na ficha</h2>

<p>Uma trilha de <strong>0 a 10</strong> que mede o quanto a Sombra já enraizou. Isto é
<strong>núcleo</strong>: vale mesmo sem nenhum módulo ligado.</p>

<table>
<thead><tr><th style="width:5em">Corrupção</th><th style="width:9em">Estado</th><th>O que muda</th></tr></thead>
<tbody>${linhas}</tbody>
</table>

<p><strong>Ganhar (+1):</strong> usar poder da lista Sombra, crueldade deliberada, ceder ao
ódio numa cena-chave. · <strong>Perder (−1):</strong> atos definidores de compaixão e
sacrifício, meditação orientada, recusar o caminho fácil quando custa caro.</p>`;
}

function blocoTentacao() {
  const linhas = TENTACAO
    .map(([nome, custo, texto]) =>
      `<tr><td><strong>${esc(nome)}</strong></td><td>${esc(custo)}</td><td>${cru(texto)}</td></tr>`)
    .join('');
  return `
<h2>A Tentação <em>(módulo)</em></h2>

<p>Na galáxia, a Sombra não multa ninguém: ela <strong>oferece</strong>. É mais rápida, é
mais fácil, e funciona.</p>

<table>
<thead><tr><th style="width:7em">Oferta</th><th style="width:4em">Corrupção</th><th>O que você compra</th></tr></thead>
<tbody>${linhas}</tbody>
</table>

<p><strong>A trava é a regra toda:</strong> <strong>1×/cena</strong> e no máximo
<strong>3×/dia de jogo</strong>. Não há o que julgar sobre a rolagem ser ou não decisiva —
vale para <strong>qualquer</strong> rolagem sua, e é o limite que impede o abuso.</p>

<p>Vale igual para Luz e Sombra; muda só a paisagem da descida. Com poderes ★ os custos
somam. Em <strong>Corrupção 9</strong> a Sombra oferece sozinha. <strong>Recusar nunca exige
rolagem nem penalidade</strong> — Corrupção pega sem escolha não é tentação, é imposto.</p>`;
}

function blocoEco() {
  const sendas = DOMINIOS.map((d) => {
    const linhas = d.poderes
      .map(([g, ps]) => `<tr><td><strong>${esc(g)}</strong></td><td>${ps.map(esc).join(' · ')}</td></tr>`)
      .join('');
    return `
<h3>${esc(d.senda)} — <em>${esc(d.dominio)}</em></h3>
<p>${esc(d.sobre)}</p>
<table style="font-size:.9em">
<thead><tr><th style="width:4em">Grandeza</th><th>Poderes do Domínio</th></tr></thead>
<tbody>${linhas}</tbody>
</table>`;
  }).join('');

  return `
<h2>Eco da Senda <em>(módulo)</em></h2>

<p>Chega um ponto em que a Força para de ser esforço — <strong>só naquilo que é o seu
ofício</strong>. Cada Senda tem um <strong>Domínio</strong>: uma <strong>lista fechada</strong>
de poderes. Não há o que julgar na mesa — o poder está na lista ou não está.</p>

<ul>
<li><strong>10º · Eco.</strong> Gastou Alcance num poder do seu Domínio? Role
<strong>1d10</strong> depois de resolver o poder: num <strong>1</strong>, o <strong>% gasto
volta</strong>.</li>
<li><strong>15º · Eco Maior.</strong> A rolagem passa a <strong>1d4</strong>; além disso, os
poderes de <strong>1ª Grandeza do seu Domínio não custam Alcance</strong> — no máximo
<strong>um por rodada</strong>.</li>
</ul>
${sendas}
<p><strong>Sobreposição é normal.</strong> Um mesmo poder pode constar em dois Domínios —
cada personagem tem <strong>uma</strong> Senda, então nunca há conflito. Quem trilhou a
<strong>${esc(SEM_ECO)}</strong> abriu mão da especialização — e do Domínio:
<strong>não tem Eco da Senda</strong>.</p>`;
}

export function paginaForca() {
  return [blocoNucleo(), blocoCorrupcao(), blocoTentacao(), blocoEco()].join('\n');
}
