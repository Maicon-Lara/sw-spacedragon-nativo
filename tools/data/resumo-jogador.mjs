// Resumo de criação de personagem, para o jogador consultar dentro do Foundry.
//
// Transcrito de 20 Space Dragon/Space Dragon Nativo/ (SW-SDN-Atributos.md,
// SW-SDN-Classes.md, SW-SDN-Forca.md, SW-SDN-Especies.md), auditados contra o
// Livro Básico Aprimorado em 11/09/2026.
//
// Regra de ouro deste arquivo: é RESUMO. Só o que a pessoa precisa para preencher
// a ficha. O detalhe mora nos compêndios e no cofre.

export const CLASSES = [
  {
    nome: 'Veterano',
    chassi: 'Homem Espacial',
    papel: 'Ação, combate e pilotagem. O soldado, o pistoleiro, o capitão.',
    dv: 'd10',
    chave: 'Força e Destreza (12+ nas duas)',
    creditos: '2d10 × 5.000',
    armas: 'qualquer uma',
    vestes: 'qualquer uma, e escudos',
    aparatos: 'defensivos e utilitários',
    talentos: 'Pilotar naves · Desarmar e subjugar · multiplicador de crítico',
    specs: [
      ['Emissário', 'Leal', 'diplomata, senador, capitão-líder'],
      ['Mercenário', 'Neutro', 'soldado e pistoleiro'],
      ['Caçador de Recompensas', 'Rebelde', 'o caçador'],
    ],
  },
  {
    nome: 'Operativo',
    chassi: 'Gatuno',
    papel: 'O submundo. Contrabandista, ladrão, espião, assassino.',
    dv: 'd6',
    chave: 'Destreza (12+); Ciência ajuda',
    creditos: '2d6 × 5.000',
    armas: 'só as de uma mão',
    vestes: 'leves ou médias, sem escudo — com escudo você perde os talentos',
    aparatos: 'só utilitários',
    talentos: 'Sabotagem · Escalar · Furtividade · Furtar · Percepção · Ataque Furtivo',
    specs: [
      ['Espião', 'Leal', 'agente de inteligência'],
      ['Sabotador', 'Neutro', 'demolições e armadilhas'],
      ['Assassino', 'Neutro', 'a lâmina do submundo'],
      ['Contrabandista', 'Rebelde', 'o malandro espacial'],
    ],
  },
  {
    nome: 'Técnico',
    chassi: 'Cientista',
    papel: 'A engenhoca. Mecânico de droides, médico de campo, engenheiro, slicer.',
    dv: 'd8',
    chave: 'Ciência (14+)',
    creditos: '1d8 × 5.000',
    armas: 'só armas de fogo de energia',
    vestes: 'qualquer uma, e aparatos defensivos',
    aparatos: 'constrói e opera qualquer um — só ele usa os ofensivos',
    talentos: 'Operar Máquinas · Nível Tecnológico (NT) · Desativar Robôs',
    specs: [
      ['Médico de Campo', 'Leal', 'o curandeiro'],
      ['Engenheiro', 'Neutro', 'o inventor'],
      ['Slicer', 'Rebelde', 'o mestre dos sistemas'],
    ],
  },
  {
    nome: 'Sensível à Força',
    chassi: 'Mentálico',
    papel: 'A Força. Jedi, Sith, e tudo o que anda entre os dois.',
    dv: 'd4',
    chave: 'Intelecto',
    creditos: '1d6 × 5.000',
    armas: 'sabre de luz e pistolas',
    vestes: 'só leves — veste pesada ou escudo BLOQUEIA os poderes (o Guardião é a exceção)',
    aparatos: 'só utilitários',
    talentos: 'Alcance da Força (% do dia) · Grandeza-Limite · poderes conhecidos',
    specs: [
      ['Guardião', '—', 'o Jedi ou Sith de sabre'],
      ['Consular', '—', 'o conjurador'],
      ['Sentinela', '—', 'o equilíbrio, caçador e investigador'],
      ['Vidente', '—', 'o místico dos nexos'],
    ],
    nota: 'As Sendas do Sensível <strong>não têm trava de Afiliação</strong>. Quem manda na moral é o Caminho (Luz ou Sombra) e a Corrupção.',
  },
];

export const ESPECIES = [
  {
    nome: 'Humano', molde: 'Humano', mods: '+2 e −2 à sua escolha',
    resumo: 'Versátil. Ganha <strong>+1 num atributo a cada 4 níveis</strong> — nenhuma outra espécie do cenário ganha isso, fora o Droide.',
  },
  {
    nome: 'Wookiee', molde: 'Humano', mods: '+2 Força, −2 Comunicação',
    resumo: 'Dano desarmado 1d6 · +2 no dano corpo a corpo com menos da metade dos PV · +1 de CP natural · +2 em JPM contra medo. <em>Arma de uma mão causa −1 de dano nas suas mãos.</em>',
  },
  {
    nome: "Twi'lek", molde: 'Humano', mods: '+2 Comunicação, −2 Constituição',
    resumo: 'Bônus em interação social · os lekku sentem má intenção a até 6 m (1-2 em 1d6, o Mestre rola) · resiste a calor.',
  },
  {
    nome: 'Rodiano', molde: 'Humano', mods: '+2 Destreza, −2 Comunicação',
    resumo: 'Caçador nato: bônus para rastrear e emboscar · visão térmica a 18 m · sangue-frio.',
  },
  {
    nome: 'Zabrak', molde: 'Humano', mods: '+2 Constituição, −2 Comunicação',
    resumo: 'Dois corações · resiste à dor · vontade férrea. O mais duro de derrubar.',
  },
  {
    nome: 'Mon Calamari', molde: 'Humano', mods: '+2 Ciência, −2 Força',
    resumo: 'Anfíbio, nada no movimento pleno · enxerga submerso e na penumbra a 18 m · engenho náutico e liderança serena.',
  },
  {
    nome: 'Trandoshano', molde: 'Humano', mods: '+2 Força, −2 Destreza',
    resumo: 'Regenera · garras e escamas · caçador de presas. <em>No frio intenso, testes de Destreza e movimento ficam Difíceis.</em>',
  },
  {
    nome: 'Chiss', molde: 'Humano', mods: '+2 Intelecto, −2 Comunicação',
    resumo: 'Infravisão 18 m · mente tática (−1 na Ordem de Ação, ou seja, age mais cedo) · começa com um idioma a mais.',
  },
  {
    nome: 'Droide', molde: 'Androide', mods: '+2 Força, −2 Comunicação',
    resumo: '<strong>Vence automaticamente toda JPF</strong> (menos estabilização) · RM 5% · infravisão 18 m · mantém o +1 a cada 4 níveis. <em>Não regenera PV sozinho, precisa de reparo. Dano de Íon dobra. Não pode ser Sensível à Força.</em>',
  },
];
