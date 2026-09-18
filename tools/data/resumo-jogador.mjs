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
    chassi: 'Cosmonauta',
    papel: 'Ação, combate e pilotagem. O soldado, o pistoleiro, o capitão.',
    dv: 'd10',
    chave: 'Força e Destreza (12+ nas duas)',
    creditos: '2d10 × 10.000',
    armas: 'qualquer uma',
    vestes: 'qualquer uma, e escudos',
    aparatos: 'defensivos e utilitários',
    talentos: 'Pilotar naves · Desarmar e subjugar · multiplicador de crítico',
    poderes: [
      ['Dano Crítico', '1º', 'No acerto crítico o dano multiplica pela coluna da tabela: <strong>×2 no 1º, subindo até ×5 no 20º</strong>. É a marca da classe.'],
      ['Pilotar Naves', '1º', 'Talento em d%. Pilota qualquer nave ou veículo, e é o <strong>capitão natural</strong> de uma tripulação. A falha perde a rota ou complica a manobra.'],
      ['Desarmar e Subjugar', '1º', 'Talento em d%. Sacrificando um ataque, <strong>desarma</strong> (soma Destreza) ou <strong>subjuga</strong> (soma Força). Desarmar vem antes de subjugar.'],
      ['Ataques Múltiplos', '7º', '<strong>Um ataque a mais por rodada</strong>, com a segunda Base de Ataque da tabela (no 7º, <code>+7/+1</code>). Pode trocar o extra por Desarmar ou Subjugar.'],
    ],
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
    creditos: '2d8 × 10.000',
    armas: 'só as de uma mão',
    vestes: 'leves ou médias, sem escudo — com escudo você perde os talentos',
    aparatos: 'só utilitários',
    talentos: 'Sabotagem · Escalar · Furtividade · Furtar · Percepção · Ataque Furtivo',
    poderes: [
      ['Sabotagem', '1º', 'Destranca portas <em>e</em> avaria máquinas — é <strong>um talento só</strong>. Uma tentativa por objeto, e precisa dos instrumentos em mão. A coluna <em>Rodadas</em> diz quanto tempo leva. É a <strong>única</strong> % modificada pelo Crédito Tecnológico.'],
      ['Escalar', '1º', 'Cada sucesso sobe 3 m. A falha derruba: 1d6 a cada 3 m já escalados — e nada se a falha for na primeira jogada.'],
      ['Furtividade', '1º', 'Esconder-se <em>e</em> mover-se em silêncio, também <strong>um talento só</strong>. O Mestre rola em segredo, porque você se julga bem-sucedido até algo provar o contrário. Atacar revela a posição.'],
      ['Furtar', '1º', 'Se a rolagem passar do <strong>dobro</strong> da dificuldade, todo mundo percebe — a vítima inclusive.'],
      ['Percepção', '1º', 'Rola <strong>1d6</strong>, não d%, contra a faixa do seu nível.'],
      ['Ataque Furtivo', '1º', 'Depois de uma Furtividade bem-sucedida: <strong>+2 no ataque</strong> e dano <strong>multiplicado</strong> pela coluna. Depois dele a posição está revelada.'],
    ],
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
    creditos: '2d6 × 10.000',
    armas: 'só armas de fogo de energia',
    vestes: 'qualquer uma, e aparatos defensivos',
    aparatos: 'constrói e opera qualquer um — só ele usa os ofensivos',
    talentos: 'Operar Máquinas · Nível Tecnológico (NT) · Desativar Robôs',
    poderes: [
      ['Operar e Consertar Máquinas', '1º', 'Talento em d%. Opera e conserta qualquer máquina, e <strong>pilota naves</strong> — pior que o Veterano, mas pilota. Máquina avariada precisa de conserto antes de funcionar.'],
      ['Aparatos e Feitos Científicos', '1º', 'Constrói as engenhocas e realiza os feitos. O <strong>Nível Tecnológico</strong> limita o que você <strong>cria</strong>, nunca o que pode usar.'],
      ['Desativar Robôs', '1º', 'Com o disruptor, rola <strong>1d20</strong> contra a Tabela 3-2. São oito categorias de robô, e o alvo melhora conforme você sobe.'],
      ['Crédito Tecnológico', '1º', 'Desconto em <strong>qualquer</strong> gasto com equipamento, pela sua Ciência. O mesmo número vale como chance de sabotar máquinas.'],
    ],
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
    creditos: '2d4 × 10.000',
    armas: 'sabre de luz e pistolas',
    vestes: 'só leves — veste pesada ou escudo BLOQUEIA os poderes (o Guardião é a exceção)',
    aparatos: 'só utilitários',
    talentos: 'Alcance da Força (% do dia) · Grandeza-Limite · poderes conhecidos',
    poderes: [
      ['Poderes da Força', '1º', 'Começa <strong>conhecendo dois de 1ª Grandeza</strong>. Poder conhecido você usa à vontade; <strong>desconhecido</strong> pede <code>d% ≤ Intelecto</code> antes — e a falha <strong>gasta o Alcance do mesmo jeito</strong>.'],
      ['Alcance da Força', '1º', 'Seu combustível diário, em <strong>%</strong>. Cada poder desconta % igual à <strong>Grandeza</strong> dele, mesmo que falhe ou seja anulado. Zera com <strong>8 h de descanso</strong>. <em>Passar do limite é risco de morte.</em>'],
      ['Aprender Poderes', '1º', 'Depois de manifestar um poder desconhecido com sucesso, uma <strong>segunda rolagem</strong> o memoriza de vez.'],
      ['Duelo da Força', '1º', 'Ao ser alvo de um poder, gaste Alcance igual à Grandeza dele e faça <strong>1d6 + seu nível</strong> resistido contra quem lançou. Vencer pelo <strong>dobro</strong> deixa revidar na hora.'],
      ['Resistência Mental', '1º', 'Se a sua rolagem ficar <strong>abaixo da RM</strong> da criatura, ela <strong>nunca mais</strong> poderá ser afetada por <em>aquele</em> poder.'],
    ],
    specs: [
      ['Guardião', '—', 'o Jedi ou Sith de sabre'],
      ['Consular', '—', 'o conjurador'],
      ['Sentinela', '—', 'o equilíbrio, caçador e investigador'],
      ['Vidente', '—', 'o místico dos nexos'],
      ['Artífice', '—', 'o engenheiro de kyber'],
    ],
    nota: 'As Sendas do Sensível <strong>não têm trava de Afiliação</strong>. Quem manda na moral é o <strong>Caminho</strong> — Luz, Sombra ou <strong>Cinza</strong> — e a Corrupção. O Caminho também decide qual coluna do corpo congela primeiro.',
  },
];

export const ESPECIES = [
  {
    nome: 'Humano', molde: 'Humano', mods: '+2 e −2 à sua escolha',
    resumo: 'Versátil: é quem <strong>escolhe onde põe</strong> o +2 e o −2. O <strong>+1 em um atributo a cada 4 níveis</strong> (4º, 8º, 12º, 16º, 20º) vale para <strong>todas</strong> as espécies do molde Humano — só o Mutante não o recebe.',
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
