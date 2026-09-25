// Monta o journal "Criação de Personagem" a partir de tools/data/resumo-jogador.mjs.
// É o que o jogador abre no Foundry enquanto preenche a ficha.

import { CLASSES, ESPECIES } from './data/resumo-jogador.mjs';
import { paginaEspecs } from './journal-especs.mjs';
import { paginaForca } from './journal-forca.mjs';

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// os textos do resumo já vêm com <strong>/<em> de propósito
const cru = (s) => String(s);

const pagina = (nome, html, sort) => ({
  name: nome,
  type: 'text',
  title: { show: true, level: 1 },
  text: { format: 1, content: html.trim() },
  sort,
  ownership: { default: -1 },
  flags: {},
});

// ── 1. Como se rola ─────────────────────────────────────────────────────────
const COMO_ROLA = `
<p>O Space Dragon resolve tudo com cinco formas, e elas correm em <strong>duas direções
opostas</strong>. Se você vem do Old Dragon 2, é aqui que se erra.</p>

<table>
<thead><tr><th>Forma</th><th>Rolagem</th><th>Passa quando</th></tr></thead>
<tbody>
<tr><td><strong>Teste de atributo</strong></td><td><code>1d20</code></td><td>resultado <strong>≤ o atributo</strong> (um 20 natural sempre falha)</td></tr>
<tr><td><strong>Talento / chance</strong></td><td><code>d%</code></td><td>resultado <strong>≤ a porcentagem</strong></td></tr>
<tr><td><strong>Jogada de Proteção</strong></td><td><code>1d20 + ajuste</code></td><td>total <strong>≥ o valor de JP</strong> da sua classe</td></tr>
<tr><td><strong>Ataque</strong></td><td><code>1d20 + BA</code></td><td>total <strong>≥ o CP</strong> do alvo</td></tr>
<tr><td><strong>Jogada resistida</strong></td><td><code>1d20 + atributo</code></td><td><strong>o maior</strong> dos dois vence</td></tr>
</tbody>
</table>

<p>Decore isto: <strong>atributo e talento rolam por baixo. Proteção e ataque rolam por
cima.</strong></p>

<h2>As três Jogadas de Proteção</h2>
<p>Você tem <strong>um</strong> valor de JP, que vem da sua classe e <strong>desce</strong>
conforme você sobe de nível. O tipo só diz qual ajuste você soma:</p>
<ul>
<li><strong>JPR</strong> — Reflexos. Explosão, queda, surpresa. Soma <strong>Destreza</strong>.</li>
<li><strong>JPF</strong> — Física. Veneno, doença, dano massivo, não morrer. Soma <strong>Constituição</strong>.</li>
<li><strong>JPM</strong> — Mental. Resistir à Força e a efeitos mentais. Soma <strong>Intelecto</strong>.</li>
</ul>

<h2>Ordem de Ação</h2>
<p>Não existe iniciativa. <strong>O menor resultado age primeiro.</strong></p>
<ul>
<li><strong>Atacar:</strong> role o <strong>dado de dano da sua arma</strong>.</li>
<li><strong>Aparato ou poder da Força:</strong> use o <strong>NT</strong> do aparato ou a <strong>Grandeza</strong> do poder.</li>
<li><strong>Correr ou fazer outra coisa:</strong> <code>10 − seu ajuste de Destreza</code>.</li>
</ul>
<p>Empate é simultâneo. A faca é rápida; o rifle pesado é lento.</p>
`;

// ── 2. Passo a passo ────────────────────────────────────────────────────────
const PASSOS = `
<p>Oito passos. Dá para fazer em dez minutos.</p>

<ol>
<li><strong>Role 3d6 seis vezes</strong> e distribua os resultados livremente entre Força,
Destreza, Constituição, Intelecto, Ciência e Comunicação.</li>

<li><strong>Escolha a espécie</strong> e aplique o +2 e o −2 dela.</li>

<li><strong>Escolha a classe.</strong> Repare no atributo-chave: ele diz se o personagem vai
funcionar.</li>

<li><strong>Escolha a Afiliação</strong> — Leal, Neutro ou Rebelde. Ela tranca quais
especializações você poderá pegar no 5º nível. <em>O Sensível à Força é a exceção: as Sendas
dele não têm trava.</em></li>

<li><strong>Pontos de Vida.</strong> No 1º nível você recebe o <strong>máximo</strong> do seu
dado de vida, sem rolar, mais o ajuste de Constituição.</li>

<li><strong>Créditos iniciais.</strong> Role o que a sua classe manda e compre equipamento
no compêndio.</li>

<li><strong>Coeficiente de Proteção.</strong>
<p style="text-align:center"><strong>CP = proteção da veste + ajuste de Destreza + aparatos e poderes + bônus de nível</strong></p>
<p>O ajuste de Destreza entra <strong>inteiro</strong> — não existe teto de Destreza por
armadura neste sistema. O bônus de nível é <strong>+1 no 4º, +2 no 8º, +3 no 12º, +4 no 16º
e +5 no 20º</strong>, e o valor da faixa <em>é</em> o total, não se somam entre si.</p></li>

<li><strong>Movimento 10 metros</strong>, menos o que a veste, a carga, a gravidade e o
terreno tirarem.</li>
</ol>

<h2>Na ficha do Foundry</h2>
<p>Crie o ator, escolha <strong>Personagem (SD Nativo)</strong> no seletor <em>Template</em> e
clique no <strong>botão de recarregar</strong> ao lado. Sem esse clique a ficha vem em branco.
Depois é só digitar os seis atributos: todo o resto se calcula sozinho.</p>
`;

// ── 3. Classes ──────────────────────────────────────────────────────────────
function paginaClasses() {
  const linhas = CLASSES.map((c) => `
<tr>
  <td><strong>${esc(c.nome)}</strong><br><small>${esc(c.chassi)}</small></td>
  <td>${esc(c.dv)}</td>
  <td>${cru(c.chave)}</td>
  <td>${esc(c.creditos)}</td>
</tr>`).join('');

  const blocos = CLASSES.map((c) => `
<h2>${esc(c.nome)}</h2>
<p><em>${esc(c.papel)}</em></p>
<ul>
  <li><strong>Dado de Vida:</strong> ${esc(c.dv)} · <strong>Atributo-chave:</strong> ${cru(c.chave)} · <strong>Créditos:</strong> ${esc(c.creditos)} CR</li>
  <li><strong>Armas:</strong> ${cru(c.armas)}</li>
  <li><strong>Vestes:</strong> ${cru(c.vestes)}</li>
  <li><strong>Aparatos:</strong> ${cru(c.aparatos)}</li>
  <li><strong>O que você anota na ficha:</strong> ${cru(c.talentos)}</li>
</ul>
<table>
<thead><tr><th>Habilidade</th><th>Nível</th><th>O que faz</th></tr></thead>
<tbody>${c.poderes.map(([n, lv, d]) =>
  `<tr><td><strong>${esc(n)}</strong></td><td>${esc(lv)}</td><td>${cru(d)}</td></tr>`).join('')}
</tbody>
</table>
<p><strong>Especializações, no 5º nível:</strong> ${c.specs.map(
    ([n, a, d]) => `${esc(n)}${a !== '—' ? ` <small>(${esc(a)})</small>` : ''} — <em>${esc(d)}</em>`
  ).join(' · ')}</p>
${c.nota ? `<p>${cru(c.nota)}</p>` : ''}`).join('');

  return `
<table>
<thead><tr><th>Classe</th><th>DV</th><th>Atributo-chave</th><th>Créditos iniciais</th></tr></thead>
<tbody>${linhas}</tbody>
</table>
${blocos}`;
}

// ── 4. Espécies ─────────────────────────────────────────────────────────────
function paginaEspecies() {
  const linhas = ESPECIES.map((e) => `
<tr>
  <td><strong>${esc(e.nome)}</strong></td>
  <td>${esc(e.mods)}</td>
  <td>${cru(e.resumo)}</td>
</tr>`).join('');

  return `
<p>Todas as espécies têm <strong>movimento 10 m</strong> e valem desde o 1º nível. O
<strong>Humano</strong> e o <strong>Droide</strong> são os moldes nativos do Space Dragon; as
outras sete são deste cenário, construídas sobre o molde Humano.</p>

<table>
<thead><tr><th>Espécie</th><th>Ajustes</th><th>O que ela te dá</th></tr></thead>
<tbody>${linhas}</tbody>
</table>

<p><strong>Um detalhe que decide escolha:</strong> só o Humano e o Droide ganham
<strong>+1 num atributo a cada 4 níveis</strong>. As espécies do cenário trocam esse
crescimento pelos talentos próprias delas.</p>
`;
}


// ── 5. Especializações ──────────────────────────────────────────────────────
export function journalCriacao() {
  return {
    name: 'Criação de Personagem — o essencial',
    pages: [
      pagina('1 · Como se rola', COMO_ROLA, 100),
      pagina('2 · Passo a passo', PASSOS, 200),
      pagina('3 · As quatro classes', paginaClasses(), 300),
      pagina('4 · As espécies', paginaEspecies(), 400),
      pagina('5 · Especializações', paginaEspecs(), 500),
      pagina('6 · A Força — núcleo e módulos', paginaForca(), 600),
    ],
  };
}
