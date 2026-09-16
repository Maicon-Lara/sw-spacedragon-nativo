// Página das especializações do journal: o TEXTO ORIGINAL do cofre, mais a tabela
// de progressão derivada da classe base.
//
// Separado de journal.mjs por um motivo prático: este arquivo é cheio de escapes de
// markdown e de HTML, e editá-lo por script de shell quebra o código. Aqui ele fica
// isolado e se edita à mão.

import { TEXTOS_SPEC } from './data/textos-spec.mjs';
import { tabelaDaSpec } from './data/tabelas-spec.mjs';

const esc = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/** Markdown simples do cofre para HTML, preservando o texto como ele foi escrito. */
export function mdParaHtml(txt) {
  const out = [];
  let lista = false;
  for (let ln of String(txt).split('\n')) {
    ln = esc(ln)
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/(^|[^*])\*([^*]+?)\*/g, '$1<em>$2</em>')
      .replace(/`(.+?)`/g, '<code>$1</code>')
      .replace(/\[\[[^\]|]*\|([^\]]+)\]\]/g, '$1')
      .replace(/\[\[([^\]]+)\]\]/g, '$1');

    const item = ln.match(/^-\s+(.*)/);
    if (item) {
      if (!lista) { out.push('<ul>'); lista = true; }
      out.push(`<li>${item[1]}</li>`);
      continue;
    }
    if (lista) { out.push('</ul>'); lista = false; }
    if (ln.trim()) out.push(`<p>${ln}</p>`);
  }
  if (lista) out.push('</ul>');
  return out.join('');
}

function tabelaHtml(t) {
  const cabecalho = ['Nv', ...t.colunas].map((c) => `<th>${esc(c)}</th>`).join('');
  const corpo = t.linhas.map((l) => {
    const celulas = l.valores.map((v, i) => {
      const k = t.chaves[i];
      if (l.congelado.has(k)) {
        return `<td style="opacity:.55" title="congelado">⊘ ${esc(v)}</td>`;
      }
      if (l.trocado.has(k)) {
        return `<td title="valor próprio desta especialização"><strong>${esc(v)}</strong></td>`;
      }
      return `<td>${esc(v)}</td>`;
    }).join('');
    return `<tr><td><strong>${l.nivel}</strong></td>${celulas}</tr>`;
  }).join('');
  return `<table style="font-size:.85em"><thead><tr>${cabecalho}</tr></thead>` +
         `<tbody>${corpo}</tbody></table>`;
}

export function paginaEspecs() {
  const porClasse = {};
  for (const e of TEXTOS_SPEC) (porClasse[e.classe] ??= []).push(e);

  const blocos = Object.entries(porClasse).map(([classe, lista]) => {
    const specs = lista.map((e) => {
      const t = tabelaDaSpec(e.nome);
      const legenda = [];
      if (t && Object.keys(t.congela).length) {
        legenda.push('⊘ = congelado, repete o valor em que travou');
      }
      if (t && t.linhas.some((l) => l.trocado.size)) {
        legenda.push('<strong>em negrito</strong> = o valor desta especialização, ' +
                     'no lugar do da classe base');
      }
      const tabela = t ? [
        `<p><strong>Progressão do ${esc(e.nome)}</strong> — do 5º ao 20º nível.</p>`,
        tabelaHtml(t),
        `<p style="font-size:.85em">${legenda.length
          ? legenda.join(' · ') + '.'
          : '<em>Nada congela nem muda: a tabela é a mesma da classe base.</em>'}</p>`,
        t.nota ? `<p>${t.nota}</p>` : '',
      ].join('') : '';

      return [
        `<h3>${esc(e.nome)}${e.sabor ? ` — <em>${esc(e.sabor)}</em>` : ''}</h3>`,
        mdParaHtml(e.texto),
        e.exemplo ? `<p><em>${esc(e.exemplo)}</em></p>` : '',
        tabela,
      ].join('');
    }).join('');
    return `<h2>${esc(classe)}</h2>${specs}`;
  }).join('');

  return [
    '<p>No Space Dragon uma especialização é uma <strong>troca</strong>, não um acréscimo.',
    'Ela abre no <strong>5º nível</strong>, e a maioria <strong>congela</strong> algum',
    'talento em troca do que dá.</p>',
    '<p>Cada uma traz a <strong>mesma tabela da classe base</strong>, já resolvida para o',
    'caminho dela: as colunas congeladas repetem o número em que travaram, e as colunas',
    'novas são as que só aquela especialização tem.</p>',
    blocos,
  ].join(' ');
}
