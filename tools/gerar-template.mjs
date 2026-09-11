// Gera modulo/template-sdn.json — o export de templates do Custom System Builder
// com a ficha de personagem e a de criatura do Space Dragon nativo.
//
//   node tools/gerar-template.mjs
//
// O formato foi apurado a partir da ficha de Old Dragon 2 da sheet-library oficial do
// CSB (sheet-library/Old Dragon 2/Foundry_Old_Dragon_2_PT_Beico.json). Convenções:
//   · fórmula e interpolação vão entre ${ e }$
//   · `${nome:=[1d20]}$` rola e guarda numa variável reutilizável na mesma mensagem
//   · `numberField`/`textField` são digitáveis; `label` com `value` é calculado
//   · `label` com `rollMessage` vira clicável e manda a rolagem ao chat

import fs from 'fs';
import path from 'path';
import * as T from './data/tabelas.mjs';

// ── helpers de componente ───────────────────────────────────────────────────
const base = (extra = {}) => ({
  key: '', cssClass: '', role: '0', permission: '0', tooltip: '',
  visibilityFormula: null, ...extra,
});

const painel = (key, contents, extra = {}) => {
  const p = {
    contents, key, cssClass: null, role: 0, permission: 0, tooltip: null,
    flow: extra.flow ?? null, align: extra.align ?? null, type: 'panel',
    visibilityFormula: extra.visibilityFormula ?? null,
  };
  // titulo, grade e recolhimento sao nativos do Panel do CSB
  if (extra.title) { p.title = extra.title; p.titleStyle = extra.titleStyle ?? 'title'; }
  if (extra.collapsible) { p.collapsible = true; p.defaultCollapsed = !!extra.recolhido; }
  return p;
};

const aba = (key, name, contents, extra = {}) =>
  base({ key, cssClass: null, contents, name, type: 'tab', ...extra });

const abas = (contents) => base({ contents, type: 'tabbedPanel' });

const num = (key, label, extra = {}) => base({
  key, label, defaultValue: String(extra.defaultValue ?? ''), size: extra.size ?? 'm-small',
  allowDecimal: false, minVal: extra.minVal != null ? String(extra.minVal) : '',
  maxVal: extra.maxVal != null ? String(extra.maxVal) : '',
  allowRelative: !!extra.allowRelative, showControls: extra.showControls ?? true,
  type: 'numberField', tooltip: extra.tooltip ?? '',
});

const texto = (key, label, extra = {}) => base({
  key, label, defaultValue: extra.defaultValue ?? '', size: extra.size ?? 'full-size',
  charList: '', maxLength: '', type: 'textField', tooltip: extra.tooltip ?? '',
});

const area = (key, label, extra = {}) => base({
  key, label, defaultValue: '', size: extra.size ?? null,
  style: extra.style ?? 'dialog', type: 'textArea', tooltip: extra.tooltip ?? '',
});

const escolha = (key, label, options, extra = {}) => base({
  key, label, defaultValue: extra.defaultValue ?? options[0].key,
  size: extra.size ?? 'full-size', options, tableKey: null,
  tableKeyColumn: null, tableLabelColumn: null, type: 'select',
  tooltip: extra.tooltip ?? '',
});

/** Texto fixo ou valor calculado. `value` pode conter ${fórmula}$. */
const rotulo = (value, extra = {}) => base({
  key: extra.key ?? '', label: extra.label ?? null, defaultValue: null,
  size: extra.size ?? 'x-small', icon: extra.icon ?? '', value,
  prefix: extra.prefix ?? '', suffix: extra.suffix ?? '',
  rollMessage: extra.rollMessage ?? '', altRollMessage: extra.altRollMessage ?? '',
  style: extra.style ?? 'label', type: 'label',
  tooltip: extra.tooltip ?? '', cssClass: extra.cssClass ?? '',
});

const titulo = (txt) => rotulo(txt, { style: 'bold', size: 'full-size' });

/** Emite a consulta de uma tabela do livro como cadeia de ternários. */
const lookup = (tabela, coluna, prop) => T.ternario(tabela, coluna, prop);

// ── os seis atributos ───────────────────────────────────────────────────────
const ATRIBUTOS = [
  ['for', 'Força', 'FOR'],
  ['des', 'Destreza', 'DES'],
  ['con', 'Constituição', 'CON'],
  ['int', 'Intelecto', 'INT'],
  ['cie', 'Ciência', 'CIE'],
  ['com', 'Comunicação', 'COM'],
];

/** Teste de atributo: 1d20, passa com resultado MENOR OU IGUAL ao atributo. */
function blocoAtributo([slug, nome, sigla]) {
  const p = `pc_${slug}`;
  return painel(`pnl_atr_${slug}`, [
    rotulo(sigla, {
      key: `roll_${slug}`,
      style: 'button',
      tooltip: `Teste de ${nome}: 1d20, passa com resultado ≤ ${sigla}`,
      rollMessage:
        `<p><strong>Teste de ${nome}</strong> (alvo ${'${' + p + '}$'}):</p>\n` +
        `<p>${'${roll:=[1d20]}$'} ${'${roll <= ' + p + " ? '<strong>Sucesso</strong>' : 'Falha'}$"}</p>`,
    }),
    num(p, null, { defaultValue: 10, minVal: 1, maxVal: 29, size: 'm-small' }),
  ], { flow: 'horizontal' });
}

// derivados: [key, rótulo, tabela, coluna, propAtributo, sufixo]
const DERIVADOS = [
  ['der_for_ataque', 'Ataque/Dano CaC', T.T1_1, 1, 'pc_for', ''],
  ['der_for_subjugar', 'Subjugar', T.T1_1, 2, 'pc_for', '%'],
  ['der_carga_leve', 'Carga leve', T.T1_1, 3, 'pc_for', ' kg'],
  ['der_carga_media', 'Carga média', T.T1_1, 4, 'pc_for', ' kg'],
  ['der_carga_pesada', 'Carga pesada', T.T1_1, 5, 'pc_for', ' kg'],
  ['der_des_ataque', 'Ataque à distância e JPR', T.T1_2, 1, 'pc_des', ''],
  ['der_des_talentos', 'Ajuste nos talentos', T.T1_2, 2, 'pc_des', '%'],
  ['der_con_pv', 'PV e JPF', T.T1_3, 1, 'pc_con', ''],
  ['der_con_clonagem', 'Chance de clonagem', T.T1_3, 2, 'pc_con', '%'],
  ['der_danos_mortais', 'Morre em', T.T1_3, 3, 'pc_con', ' PV'],
  ['der_int_poder', 'Realizar/aprender poder', T.T1_4, 1, 'pc_int', '%'],
  ['der_int_alcance', 'Alcance adicional', T.T1_4, 2, 'pc_int', '%'],
  ['der_int_jpm', 'Ajuste de JPM', T.T1_4, 3, 'pc_int', ''],
  ['der_cie_robos', 'Robôs desativados/dia', T.T1_5, 1, 'pc_cie', ''],
  ['der_credito_tec', 'Crédito Tecnológico', T.T1_5, 2, 'pc_cie', '%'],
  ['der_com_seguidores', 'Máx. de seguidores', T.T1_6, 1, 'pc_com', ''],
  ['der_com_reacao', 'Ajuste de reação', T.T1_6, 2, 'pc_com', '%'],
  ['der_com_idiomas', 'Idiomas adicionais', T.T1_6, 3, 'pc_com', ''],
];

/** Cada derivado ocupa duas celulas da grade: o rotulo e o valor. */
function celulasDerivadas([key, label, tabela, coluna, prop, sufixo]) {
  return [
    rotulo(`${label}:`, { size: 'medium', style: 'bold' }),
    rotulo('${' + lookup(tabela, coluna, prop) + '}$', { key, suffix: sufixo, size: 'm-small' }),
  ];
}

// ── aba: Atributos ──────────────────────────────────────────────────────────
const abaAtributos = aba('tab_atributos', 'Atributos', [
  painel('pnl_atributos', [
    titulo('Atributos — 1d20, passa com resultado ≤ o valor'),
    painel('pnl_atr_linha', ATRIBUTOS.map(blocoAtributo), { flow: 'horizontal' }),
    painel('pnl_derivados', DERIVADOS.flatMap(celulasDerivadas),
           { flow: 'grid-4', title: 'Derivados das tabelas do livro' }),
    rotulo(
      'O Crédito Tecnológico é um número só: chance de sabotar máquinas, uso de ' +
      'aparatos ofensivos pelo Caçador e desconto do Técnico em qualquer compra.',
      { size: 'full-size', style: 'label' }),
    painel('pnl_ler', [
      rotulo('Idiomas que lê e escreve: ', { size: 'medium' }),
      rotulo('${floor(pc_com / 6)}$', { key: 'der_ler_escrever' }),
    ], { flow: 'horizontal' }),
  ]),
]);

// ── aba: Combate ────────────────────────────────────────────────────────────
const CP_NIVEL = lookup(T.T4_1, 1, 'pc_nivel');
const CP_TOTAL =
  'pc_veste_protecao + (' + lookup(T.T1_2, 1, 'pc_des') + ') + pc_cp_aparatos + (' + CP_NIVEL + ')';

const JPS = [
  ['jpr', 'JPR — Reflexos', lookup(T.T1_2, 1, 'pc_des')],
  ['jpf', 'JPF — Física', lookup(T.T1_3, 1, 'pc_con')],
  ['jpm', 'JPM — Mental', lookup(T.T1_4, 3, 'pc_int')],
];

function blocoJP([slug, nome, ajuste]) {
  return rotulo(nome, {
    key: `roll_${slug}`,
    style: 'button',
    size: 'medium',
    tooltip: `1d20 + ajuste ≥ o valor de JP da classe (${nome})`,
    rollMessage:
      `<p><strong>${nome}</strong> — alvo ${'${pc_jp}$'}:</p>\n` +
      `<p>${'${roll:=[1d20]}$'} + ${'${aj:=' + ajuste + '}$'} = ` +
      `${'${total:=roll + aj}$'} ${'${total >= pc_jp ? \'<strong>Passou</strong>\' : \'Falhou\'}$'}</p>`,
  });
}

const abaCombate = aba('tab_combate', 'Combate', [
  painel('pnl_combate', [
    titulo('Coeficiente de Proteção'),
    painel('pnl_cp_entradas', [
      num('pc_veste_protecao', 'Veste', {
        defaultValue: 10, minVal: 0, size: 'm-small',
        tooltip: 'Valor de proteção da veste equipada',
      }),
      num('pc_cp_aparatos', 'Aparatos', {
        defaultValue: 0, allowRelative: true, size: 'm-small',
        tooltip: 'Soma de aparatos defensivos e poderes que alteram o CP',
      }),
    ], { flow: 'horizontal' }),
    painel('pnl_cp_total', [
      rotulo('CP = ', { size: 'medium' }),
      rotulo('${' + CP_TOTAL + '}$', { key: 'pc_cp', size: 'medium', style: 'title' }),
    ], { flow: 'horizontal' }),
    rotulo(
      'O modificador de Destreza entra INTEIRO — o Space Dragon não tem teto de ' +
      'Destreza por armadura. O bônus de nível vem da Tabela 4-1 e não é cumulativo.',
      { size: 'full-size', style: 'label' }),

    titulo('Pontos de Vida'),
    painel('pnl_pv', [
      num('pc_pv_atual', 'PV atual', { defaultValue: 1, allowRelative: true }),
      num('pc_pv_max', 'PV máximo', { defaultValue: 1, minVal: 1 }),
      rotulo('Morre em:', { size: 'm-small', style: 'bold' }),
      rotulo('${' + lookup(T.T1_3, 3, 'pc_con') + '}$',
             { key: 'pc_danos_mortais', suffix: ' PV', size: 'm-small' }),
    ], { flow: 'horizontal' }),

    titulo('Base de Ataque e Jogadas de Proteção'),
    painel('pnl_ba_jp', [
      num('pc_ba', 'BA', { defaultValue: 0, allowRelative: true }),
      num('pc_jp', 'JP (alvo)', { defaultValue: 15, minVal: 1 }),
    ], { flow: 'horizontal' }),
    rotulo('Uma JP só, e ela DESCE com o nível. Rola-se 1d20 + ajuste e o total ' +
           'precisa IGUALAR OU SUPERAR o valor.', { size: 'full-size', style: 'label' }),
    painel('pnl_jps', JPS.map(blocoJP), { flow: 'horizontal' }),

    titulo('Ordem de Ação — o MENOR resultado age PRIMEIRO'),
    rotulo('Atacar: role o dado de dano da arma. Aparato ou poder: use o NT ou a ' +
           'Grandeza. Movimentação dupla e outras ações: 10 − ajuste de Destreza. ' +
           'Empates são simultâneos. A rodada dura o maior resultado × 2 segundos.',
           { size: 'full-size', style: 'label' }),
    painel('pnl_ordem', [
      rotulo('Outras ações: ', { size: 'medium' }),
      rotulo('${10 - (' + lookup(T.T1_2, 1, 'pc_des') + ')}$', { key: 'pc_ordem_outras' }),
    ], { flow: 'horizontal' }),
  ]),
]);

// ── aba: Classe ─────────────────────────────────────────────────────────────
const CLASSES = [
  { key: 'classe_veterano', value: 'Veterano (Cosmonauta, d10)' },
  { key: 'classe_operativo', value: 'Operativo (Gatuno, d6)' },
  { key: 'classe_tecnico', value: 'Técnico (Cientista, d8)' },
  { key: 'classe_sensivel', value: 'Sensível à Força (Mentálico, d4)' },
];

/** Talento em d%: rola d% e passa com resultado ≤ (valor + ajuste de Destreza). */
function talento(key, nome, comAjusteDes = true) {
  const alvo = comAjusteDes
    ? `${key} + (${lookup(T.T1_2, 2, 'pc_des')})`
    : key;
  return painel(`pnl_${key}`, [
    rotulo(nome, {
      key: `roll_${key}`,
      style: 'button',
      size: 'medium',
      tooltip: `d%, passa com resultado ≤ ${nome}`,
      rollMessage:
        `<p><strong>${nome}</strong> — alvo ${'${alvo:=' + alvo + '}$'}%:</p>\n` +
        `<p>${'${roll:=[1d100]}$'} ${'${roll <= alvo ? \'<strong>Sucesso</strong>\' : \'Falha\'}$'}</p>`,
    }),
    num(key, null, { defaultValue: 0, minVal: 0, maxVal: 99 }),
  ], { flow: 'horizontal' });
}

const vis = (c) => `pc_classe == '${c}'`;

const abaClasse = aba('tab_classe', 'Classe', [
  painel('pnl_classe', [
    escolha('pc_classe', 'Classe', CLASSES),
    texto('pc_especializacao', 'Especialização (abre no 5º nível)'),
    escolha('pc_afiliacao', 'Afiliação', [
      { key: 'afil_leal', value: 'Leal' },
      { key: 'afil_neutro', value: 'Neutro' },
      { key: 'afil_rebelde', value: 'Rebelde' },
    ]),

    // Veterano
    painel('pnl_veterano', [
      titulo('Veterano'),
      talento('pc_pilotar', 'Pilotar naves', false),
      talento('pc_desarmar', 'Desarmar e subjugar', false),
      num('pc_critico', 'Multiplicador de crítico', { defaultValue: 2, minVal: 2, maxVal: 5 }),
    ], { visibilityFormula: vis('classe_veterano') }),

    // Operativo — SEIS talentos, e só seis
    painel('pnl_operativo', [
      titulo('Operativo — os seis talentos de Gatuno'),
      talento('pc_sabotagem', 'Sabotagem (destrancar e avariar)'),
      texto('pc_sabotagem_rodadas', 'Rodadas do trabalho', { defaultValue: '1d8' }),
      talento('pc_escalar', 'Escalar', false),
      talento('pc_furtividade', 'Furtividade (esconder e silenciar)'),
      talento('pc_furtar', 'Furtar'),
      num('pc_percepcao', 'Percepção (faixa em 1d6)', { defaultValue: 2, minVal: 1, maxVal: 5 }),
      num('pc_atq_furtivo', 'Ataque Furtivo (×)', { defaultValue: 2, minVal: 2, maxVal: 5 }),
      rotulo('Sabotagem é a ÚNICA % que o Crédito Tecnológico modifica. Não existem ' +
             'talentos separados de "Arrombar" nem de "Esconder".',
             { size: 'full-size', style: 'label' }),
    ], { visibilityFormula: vis('classe_operativo') }),

    // Técnico
    painel('pnl_tecnico', [
      titulo('Técnico'),
      talento('pc_operar_maquinas', 'Operar Máquinas', false),
      num('pc_nt_max', 'NT máximo', { defaultValue: 1, minVal: 1, maxVal: 10 }),
      rotulo('O NT sobe um passo a cada DOIS níveis, chegando a 10 no 19º. Ele limita ' +
             'o que o Técnico CRIA, não o que pode usar.',
             { size: 'full-size', style: 'label' }),
    ], { visibilityFormula: vis('classe_tecnico') }),

    // Sensível à Força
    painel('pnl_sensivel', [
      titulo('Sensível à Força'),
      painel('pnl_alcance', [
        num('pc_alcance_gasto', 'Alcance gasto (%)', { defaultValue: 0, allowRelative: true }),
        num('pc_alcance_tabela', 'Alcance da tabela (%)', { defaultValue: 1, minVal: 1 }),
      ], { flow: 'horizontal' }),
      painel('pnl_alcance_max', [
        rotulo('Alcance máximo: ', { size: 'medium' }),
        rotulo('${pc_alcance_tabela + (' + lookup(T.T1_4, 2, 'pc_int') + ')}$',
               { key: 'pc_alcance_max', suffix: '%' }),
      ], { flow: 'horizontal' }),
      num('pc_grandeza_limite', 'Grandeza-Limite', { defaultValue: 1, minVal: 1, maxVal: 10 }),
      rotulo('Usar um poder desconta % igual à Grandeza dele, MESMO se falhar ou for ' +
             'anulado. Zera com 8 h de descanso. Nunca passe do máximo: tentar é risco ' +
             'de morte. Manifestar cobra −4 no CP, e exige concentração — mas não fala ' +
             'nem gesto.', { size: 'full-size', style: 'label' }),
      rotulo('Poder desconhecido', {
        key: 'roll_poder_desconhecido',
        style: 'button',
        size: 'full-size',
        tooltip: 'd% ≤ Realizar/Aprender Poder (Intelecto). A falha gasta o Alcance igual.',
        rollMessage:
          `<p><strong>Poder desconhecido</strong> — alvo ${'${alvo:=' + lookup(T.T1_4, 1, 'pc_int') + '}$'}%:</p>\n` +
          `<p>${'${roll:=[1d100]}$'} ${'${roll <= alvo ? \'<strong>Manifestou</strong>\' : \'Falhou — e o Alcance foi gasto\'}$'}` +
          ` ${'${roll > alvo * 2 ? \'<em>Passou do dobro: efeito colateral a critério do Mestre.</em>\' : \'\'}$'}</p>`,
      }),
      area('pc_poderes_conhecidos', 'Poderes conhecidos (começa com 2 de 1ª Grandeza)'),
    ], { visibilityFormula: vis('classe_sensivel') }),
  ]),
]);

// ── aba: Notas ──────────────────────────────────────────────────────────────
const abaNotas = aba('tab_notas', 'Notas', [
  painel('pnl_notas', [
    area('pc_equipamento', 'Equipamento'),
    area('pc_notas', 'Notas'),
  ]),
]);

// ── cabeçalho ───────────────────────────────────────────────────────────────
const cabecalho = painel('custom_header', [
  painel('pnl_id', [
    texto('pc_especie', 'Espécie'),
    num('pc_nivel', 'Nível', { defaultValue: 1, minVal: 1, maxVal: 20 }),
    num('pc_xp', 'XP', { defaultValue: 0, allowRelative: true, showControls: false }),
  ], { flow: 'horizontal' }),
  painel('pnl_mov', [
    rotulo('Movimento:', { size: 'm-small', style: 'bold' }),
    rotulo('${10 - pc_mov_penalidade}$', { key: 'pc_mov', suffix: ' m', size: 'm-small' }),
    num('pc_mov_penalidade', 'Penalidade', {
      defaultValue: 0, minVal: 0, size: 'm-small',
      tooltip: 'Soma das penalidades de veste, carga, gravidade e terreno',
    }),
  ], { flow: 'horizontal' }),
], { flow: 'vertical' });

// ── a ficha de personagem ───────────────────────────────────────────────────
const fichaPC = {
  type: '_template',
  name: 'Personagem (SD Nativo)',
  data: {
    hidden: [],
    header: cabecalho,
    body: painel('custom_body', [
      abas([abaAtributos, abaCombate, abaClasse, abaNotas]),
    ]),
    display: { width: '1020', height: '840', fix_size: false, pp_width: '64', pp_height: '64' },
    attributeBar: {
      PV: { value: '${pc_pv_atual}$', max: '${pc_pv_max}$' },
      Alcance: { value: '${pc_alcance_max - pc_alcance_gasto}$', max: '${pc_alcance_max}$' },
    },
    activeEffects: {},
    templateSystemUniqueVersion: String(Date.now()),
  },
};

// ── a ficha de criatura (bloco do capítulo 11) ──────────────────────────────
const fichaCriatura = {
  type: '_template',
  name: 'Criatura (SD Nativo)',
  data: {
    hidden: [],
    header: painel('custom_header', [
      painel('pnl_cr_id', [
        texto('cr_morfologia', 'Morfologia'),
        escolha('cr_tamanho', 'Tamanho', [
          { key: 'tam_pequeno', value: 'Pequeno (até 1 m)' },
          { key: 'tam_medio', value: 'Médio (até 2 m)' },
          { key: 'tam_grande', value: 'Grande (até 4 m)' },
          { key: 'tam_imenso', value: 'Imenso (até 6 m)' },
          { key: 'tam_colossal', value: 'Colossal (mais de 6 m)' },
        ]),
        escolha('cr_afiliacao', 'Afiliação', [
          { key: 'afil_leal', value: 'Leal' },
          { key: 'afil_neutro', value: 'Neutro' },
          { key: 'afil_rebelde', value: 'Rebelde' },
        ]),
      ], { flow: 'horizontal' }),
    ]),
    body: painel('custom_body', [
      painel('pnl_cr', [
        titulo('Atributos'),
        painel('pnl_cr_atr', ATRIBUTOS.map(([slug, , sigla]) =>
          num(`cr_${slug}`, sigla, { defaultValue: 10, minVal: 0, maxVal: 29 })),
          { flow: 'horizontal' }),
        rotulo('Intelecto 0 é irracional e imune a poderes mentais. Ciência 0 é ' +
               'totalmente primitivo. Comunicação 0 não se comunica de forma alguma.',
               { size: 'full-size', style: 'label' }),

        titulo('Defesa e vida'),
        painel('pnl_cr_def', [
          num('cr_cp', 'CP', { defaultValue: 10 }),
          num('cr_jp', 'JP', { defaultValue: 15 }),
          num('cr_dv', 'DV (d8)', { defaultValue: 1, minVal: 0 }),
          num('cr_dv_bonus', 'Bônus de DV', { defaultValue: 0 }),
        ], { flow: 'horizontal' }),
        painel('pnl_cr_pv', [
          num('cr_pv_atual', 'PV atual', { defaultValue: 8, allowRelative: true }),
          num('cr_pv_max', 'PV máximo', { defaultValue: 8, minVal: 1 }),
          rotulo('Rolar PV', {
            key: 'roll_cr_pv',
            style: 'button',
            tooltip: 'Criaturas usam SEMPRE d8',
            rollMessage: `<p>PV: ${'${[cr_dv + \'d8\'] + cr_dv_bonus}$'}</p>`,
          }),
        ], { flow: 'horizontal' }),
        rotulo('A JP é um valor único e já engloba JPR, JPF e JPM — não se aplica ' +
               'modificador nenhum. O CP já inclui a proteção natural.',
               { size: 'full-size', style: 'label' }),

        titulo('Resistências'),
        painel('pnl_cr_res', [
          num('cr_rm', 'RM (%)', { defaultValue: 0, minVal: 0, maxVal: 100 }),
          num('cr_rd', 'RD', { defaultValue: 0, minVal: 0 }),
          texto('cr_rd_excecao', 'RD não vale contra'),
        ], { flow: 'horizontal' }),
        rotulo('RM: a cada poder dirigido à criatura, role d%. Abaixo da RM, aquele ' +
               'poder NUNCA MAIS a afeta — e o Alcance do Sensível é gasto igual.',
               { size: 'full-size', style: 'label' }),

        titulo('Moral, movimento e prêmios'),
        painel('pnl_cr_moral', [
          num('cr_moral', 'Moral (%)', { defaultValue: 50, minVal: 0, maxVal: 100 }),
          rotulo('Rolar Moral', {
            key: 'roll_cr_moral',
            style: 'button',
            tooltip: 'Quando 50%+ da espécie cai: d% ≤ Moral para continuar lutando',
            rollMessage:
              `<p><strong>Moral</strong> — alvo ${'${cr_moral}$'}%:</p>\n` +
              `<p>${'${roll:=[1d100]}$'} ${'${roll <= cr_moral ? \'<strong>Segue lutando</strong>\' : \'Foge ou se rende\'}$'}</p>`,
          }),
          num('cr_mov', 'Movimento (m)', { defaultValue: 10, minVal: 0 }),
          texto('cr_mov_outros', 'Outros deslocamentos'),
        ], { flow: 'horizontal' }),
        rotulo('Moral 0% sempre foge; 100% nunca desiste. Robôs de mente simples vêm ' +
               'com 100% e só saem de combate por Desativação — a exceção é o ' +
               'Metahumano, com 80%.', { size: 'full-size', style: 'label' }),
        painel('pnl_cr_premios', [
          num('cr_xp', 'XP', { defaultValue: 0 }),
          texto('cr_habitat', 'Habitat'),
          texto('cr_encontros', 'Encontros'),
          texto('cr_premios', 'Prêmios (O/D/U)'),
        ], { flow: 'horizontal' }),

        titulo('Ataques'),
        area('cr_ataques', 'Ataques'),
        rotulo('O dado de dano do ataque é TAMBÉM a Ordem de Ação da criatura, e o ' +
               'menor resultado age primeiro.', { size: 'full-size', style: 'label' }),
        area('cr_descricao', 'Descrição e poderes'),
      ]),
    ]),
    display: { width: '780', height: '760', fix_size: false, pp_width: '64', pp_height: '64' },
    attributeBar: { PV: { value: '${cr_pv_atual}$', max: '${cr_pv_max}$' } },
    activeEffects: {},
    templateSystemUniqueVersion: String(Date.now() + 1),
  },
};

// ── escrita ─────────────────────────────────────────────────────────────────
const saida = {
  isCustomSystemExport: true,
  actors: [fichaPC, fichaCriatura],
  items: [],
};

const destino = path.join('modulo', 'template-sdn.json');
fs.mkdirSync('modulo', { recursive: true });
fs.writeFileSync(destino, JSON.stringify(saida, null, 2), 'utf8');

// sanidade
const relido = JSON.parse(fs.readFileSync(destino, 'utf8'));
let comp = 0;
const conta = (n) => {
  if (Array.isArray(n)) n.forEach(conta);
  else if (n && typeof n === 'object') {
    if (typeof n.type === 'string') comp++;
    Object.values(n).forEach(conta);
  }
};
conta(relido.actors);
console.log(`gerado ${destino}`);
console.log(`  ${relido.actors.length} fichas, ${comp} componentes, ` +
            `${(fs.statSync(destino).size / 1024).toFixed(1)} KB`);
