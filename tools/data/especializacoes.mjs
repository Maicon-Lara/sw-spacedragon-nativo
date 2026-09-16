// As catorze especializações, no formato CONGELA / MANTÉM / GANHA.
//
// Transcrito de SW-SDN-Classes.md e SW-SDN-Forca.md.
//
// A ideia: no Space Dragon uma especialização é uma TROCA, não um acréscimo. Seis das
// dez mundanas congelam talentos, e três das quatro Sendas também — o Consular chega a
// pagar com PV e Constituição. Se a troca fica enterrada no meio de um parágrafo, a mesa
// esquece dela na sexta sessão. Por isso o bloco fixo de três linhas, sempre na mesma
// ordem, e o espaço em branco para anotar o valor onde o talento travou.
//
// `anota` é esse espaço: o que o jogador precisa escrever na ficha no momento em que
// congela, porque depois ninguém lembra.

/** Talentos de cada classe-base, para montar a linha MANTÉM por subtração. */
export const TALENTOS_BASE = {
  Veterano: ['Pilotar Naves', 'Desarmar e Subjugar', 'Dano Crítico', 'Ataques Múltiplos'],
  Operativo: ['Sabotagem', 'Escalar', 'Furtividade', 'Furtar', 'Percepção', 'Ataque Furtivo'],
  'Técnico': ['Operar Máquinas', 'Aparatos e Feitos', 'Desativar Robôs', 'Crédito Tecnológico'],
  'Sensível à Força': ['Poderes da Força', 'Alcance da Força', 'Grandeza-Limite', 'Duelo da Força'],
};

export const ESPECIALIZACOES = [
  // ── Veterano ──────────────────────────────────────────────────────────────
  {
    classe: 'Veterano', nome: 'Mercenário', afiliacao: 'Neutro',
    sabor: 'O soldado e o pistoleiro. Uma arma, e nenhuma outra.',
    passos: [
      {
        nivel: 5,
        congela: ['Pilotar Naves'],
        anota: ['Pilotar Naves', 'Arma'],
        ganha: ['Escolhe <strong>uma arma</strong>. Com ela, o crítico é sempre <strong>um multiplicador acima</strong> da tabela do Veterano — ×4 já no 5º nível.'],
      },
      {
        nivel: 10,
        congela: ['a JP'],
        anota: ['JP'],
        ganha: ['<strong>−4</strong> com qualquer arma que não seja a preferida, e <strong>+2</strong> com ela (só no primeiro ataque).',
                'Pode sacrificar o segundo ataque para <strong>garantir</strong> chance de crítico.'],
      },
      { nivel: 20, ganha: ['Só usa a arma escolhida, mas <strong>garante chance de crítico nos dois ataques</strong>.'] },
    ],
  },
  {
    classe: 'Veterano', nome: 'Caçador de Recompensas', afiliacao: 'Rebelde',
    sabor: 'O caçador. Aparato na mão e alvo na mira.',
    passos: [
      {
        nivel: 5, congela: [],
        ganha: ['Opera <strong>aparatos ofensivos</strong> e conserta máquinas, usando a <strong>% de Desarmar/Subjugar</strong> como chance.'],
      },
      { nivel: 10, ganha: ['A rolagem de Desarmar/Subjugar rende um <strong>ataque extra</strong>, chegando a <strong>+2 ataques</strong> com a segunda BA.'] },
      { nivel: 20, ganha: ['Usa <strong>qualquer</strong> aparato como um Técnico de igual nível, e desfere <strong>sempre 3 ataques</strong>.'] },
    ],
  },
  {
    classe: 'Veterano', nome: 'Emissário', afiliacao: 'Leal',
    sabor: 'O diplomata, o senador, o capitão que lidera pela palavra.',
    passos: [
      {
        nivel: 5,
        congela: ['Dano Crítico'],
        anota: ['Dano Crítico (×__)'],
        ganha: ['A progressão do crítico vira <strong>multiplicador do ajuste de reação</strong> (Comunicação).',
                'Recebe <strong>$20.000 × nível por mês</strong> de quem você representa.'],
      },
      {
        nivel: 10,
        congela: ['Desarmar e Subjugar'],
        anota: ['Desarmar/Subjugar'],
        ganha: ['<strong>Nave patrocinada</strong>: combustível e reparos por conta de quem o patrocina.',
                'Tripulação até o seu número máximo de seguidores.'],
      },
      { nivel: 20, ganha: ['A tripulação <strong>triplica</strong>. Usa a % de Desarmar/Subjugar como chance de tornar <strong>amigável</strong> a reação de uma criatura inteligente.'] },
    ],
  },

  // ── Operativo ─────────────────────────────────────────────────────────────
  {
    classe: 'Operativo', nome: 'Espião', afiliacao: 'Leal',
    sabor: 'Agente de inteligência. Cassian Andor, Fulcrum, o ISB.',
    passos: [
      {
        nivel: 5, congela: [],
        ganha: ['A <strong>Sabotagem sobe para a % de Furtividade</strong> e passa a progredir junto com ela.',
                'O <strong>Crédito Tecnológico conta dobrado</strong>.',
                'Usa a <strong>% de Furtar</strong> para passar-se por outra pessoa, somando o ajuste de reação.'],
      },
      { nivel: 10, ganha: ['Usa a <strong>% de Escalar</strong> como chance de já ter a informação relevante, por contatos ou registros.', 'Usa <strong>aparatos defensivos</strong> como um Técnico.'] },
      { nivel: 20, ganha: ['Furtividade, Sabotagem e Furtar <strong>igualam os 99% de Escalar</strong>.'] },
    ],
  },
  {
    classe: 'Operativo', nome: 'Sabotador', afiliacao: 'Neutro',
    sabor: 'Demolições e armadilhas. O saboteur de bases imperiais.',
    passos: [
      {
        nivel: 5,
        congela: ['Furtar', 'Ataque Furtivo'],
        anota: ['Furtar', 'Ataque Furtivo (×__)'],
        ganha: ['<strong>Bônus de Sabotagem = 100% − a sua % de Escalar</strong>. No 5º, com Escalar 84%, são <strong>+16%</strong>.',
                'O bônus <strong>não acumula</strong>: a cada nível é recalculado sobre a % da tabela.'],
      },
      {
        nivel: 10,
        congela: ['todo o resto, menos Sabotagem'],
        anota: ['Escalar', 'Furtividade', 'Percepção'],
        ganha: ['<strong>Cria armadilhas</strong> com as máquinas que sabota. Desarmá-las é o <strong>inverso</strong> da sua % de Sabotagem — no 10º, 27% de desarme contra 73% de sabotagem.'],
      },
      { nivel: 20, ganha: ['Sabota a <strong>99%</strong>. As armadilhas dele têm <strong>1%</strong> de chance de desarme.'] },
    ],
  },
  {
    classe: 'Operativo', nome: 'Assassino', afiliacao: 'Neutro',
    sabor: 'A lâmina do submundo. Os matadores da Aurora Negra.',
    passos: [
      {
        nivel: 5,
        congela: ['Escalar', 'Sabotagem'],
        anota: ['Escalar', 'Sabotagem'],
        ganha: ['O <strong>Ataque Furtivo ganha +1 no multiplicador</strong>: ×3 já no 5º, ×4 no 6º, e assim por diante.'],
      },
      {
        nivel: 10,
        congela: ['Furtar'],
        anota: ['Furtar'],
        ganha: ['Qualquer acerto tem <strong>20%</strong> de contar como Ataque Furtivo, fora os que já contariam.',
                'Desenvolve <strong>venenos</strong>, de efeito acertado com o Mestre.'],
      },
      { nivel: 20, ganha: ['<strong>Todos</strong> os seus ataques são Ataques Furtivos. Num crítico, o alvo faz <strong>JPF ou morre</strong>.'] },
    ],
  },
  {
    classe: 'Operativo', nome: 'Contrabandista', afiliacao: 'Rebelde',
    sabor: 'O malandro espacial. Hondo, os capitães do Cartel, o Han em modo pirataria.',
    passos: [
      {
        nivel: 5,
        congela: ['Sabotagem', 'Furtar'],
        anota: ['Sabotagem', 'Furtar'],
        ganha: ['O <strong>Crédito Tecnológico</strong> vira desconto em <strong>qualquer</strong> negociação, e o <strong>dobro</strong> dele é a sua chance de extorquir.',
                'Proficiente em <strong>escudos de energia</strong>.'],
      },
      {
        nivel: 10,
        congela: ['Furtividade'],
        anota: ['Furtividade'],
        ganha: ['A % de Furtividade já alcançada vira chance de um <strong>ataque adicional</strong> no turno, com a BA de 7 níveis abaixo.',
                'Pilota e usa qualquer aparato como um Técnico de <strong>metade</strong> dos seus níveis.',
                '<strong>Tripulação fiel</strong> igual ao seu máximo de seguidores, mínimo 2.'],
      },
      { nivel: 20, ganha: ['<strong>Sempre 2 ataques</strong> (o segundo com a BA de 5 níveis abaixo). Dobra e quadruplica o Crédito. Tripulação <strong>triplica</strong>, mínimo 4.'] },
    ],
  },

  // ── Técnico ───────────────────────────────────────────────────────────────
  {
    classe: 'Técnico', nome: 'Médico de Campo', afiliacao: 'Leal',
    sabor: 'O curandeiro. Cirurgia, bacta, próteses, antídotos.',
    passos: [
      {
        nivel: 5,
        congela: ['Operar Máquinas', 'armas (exceto os artefatos que ele cria)'],
        anota: ['Operar Máquinas'],
        ganha: ['O <strong>Crédito Tecnológico sobe +1% por nível</strong>.', 'A ciência dele passa a servir à carne viva.'],
      },
      {
        nivel: 10, congela: [],
        ganha: ['Usa a % de Operar Máquinas como chance de ter à mão a informação ou o artefato médico relevante.',
                '<em>Em troca:</em> os aparatos dele contam <strong>2 NT acima</strong>, o que o limita a criar até o 8º NT.'],
      },
      { nivel: 20, ganha: ['Crédito Tecnológico de <strong>100%</strong>.', '<em>Código de ética:</em> proibido causar dano a seres vivos. Quebrar suspende as habilidades até uma reparação.'] },
    ],
  },
  {
    classe: 'Técnico', nome: 'Engenheiro', afiliacao: 'Neutro',
    sabor: 'O inventor. Constrói o que ninguém mais consegue.',
    passos: [
      {
        nivel: 5, congela: [],
        ganha: ['Salta direto para o <strong>4º Nível Tecnológico</strong> e ganha <strong>+1 NT a cada 2 níveis</strong>, chegando ao 10º NT no 17º.',
                '<em>Em troca:</em> o Crédito Tecnológico vira <strong>custo adicional</strong> — inventar do zero sai mais caro que comprar pronto.'],
      },
      { nivel: 10, ganha: ['O prejuízo <strong>dobra</strong>, mas ele passa a <strong>combinar até 3 aparatos</strong> num engenho só.'] },
      { nivel: 20, ganha: ['Cria <strong>qualquer</strong> máquina e realiza <strong>qualquer</strong> feito, a custo dobrado, independente das condições.'] },
    ],
  },
  {
    classe: 'Técnico', nome: 'Slicer', afiliacao: 'Rebelde',
    sabor: 'O mestre dos sistemas. Fechaduras, alarmes, cofres de dados.',
    passos: [
      {
        nivel: 5, congela: [],
        ganha: ['Sabota e reprograma máquinas como um <strong>Operativo de 1/3 dos seus níveis</strong>: arromba fechaduras eletrônicas, derruba alarmes, força cofres de dados.'],
      },
      {
        nivel: 10,
        congela: ['a sabotagem'],
        anota: ['a % de sabotagem'],
        ganha: ['<strong>Reprograma robôs</strong>: contra a Tabela 3-2, um <strong>D</strong> significa robô reprogramado <strong>para sempre</strong> a serviço dele, e um <strong>A</strong>, controlável por <strong>24 horas</strong>.'],
      },
      { nivel: 20, ganha: ['<strong>Faísca do Oculto:</strong> a mente dele toca o Espírito Galáctico e passa a manifestar <strong>poderes da Força de 1ª Grandeza</strong> (lista Universal), com Alcance diário igual ao bônus de Ciência.'] },
    ],
  },

  // ── Sensível à Força ──────────────────────────────────────────────────────
  {
    classe: 'Sensível à Força', nome: 'Guardião', afiliacao: '—',
    sabor: 'O Jedi ou Sith de sabre. Obi-Wan, Vader, Maul.',
    passos: [
      {
        nivel: 5,
        congela: ['o teto de Grandeza, que passa a ser a <strong>6ª</strong>'],
        anota: ['Forma de Sabre'],
        ganha: ['<strong>Adestramento de Combate:</strong> a BA passa a evoluir como a de um Veterano, e você usa <strong>vestes médias</strong> sem bloquear os poderes.',
                '<strong>Formas de Sabre:</strong> domina uma das sete Formas.'],
      },
    ],
    nota: 'Troca a amplitude do poder pela maestria da lâmina: os feitos lendários da 7ª Grandeza para cima ficam para os conjuradores.',
  },
  {
    classe: 'Sensível à Força', nome: 'Consular', afiliacao: '—',
    sabor: 'O conjurador. Mergulha na Força até o fundo, e paga com o corpo.',
    passos: [
      {
        nivel: 5,
        congela: ['a BA'],
        anota: ['BA'],
        ganha: ['Ganha a <strong>4ª Grandeza direto</strong> (englobando a 3ª) e <strong>+1 Grandeza a cada 2 níveis</strong>, chegando à 10ª no 17º.'],
      },
      {
        nivel: 10,
        congela: ['a JP'],
        anota: ['JP'],
        ganha: ['O Alcance conta como o de um Sensível <strong>+2 níveis</strong> — 100% já no 14º.',
                '<em>O preço:</em> passa a <strong>perder 1-2 PV</strong> a cada nível que sobe.'],
      },
      { nivel: 17, ganha: ['<em>O preço aumenta:</em> a cada subida de nível, <strong>JPF ou perde 1 de Constituição</strong>, em definitivo.'] },
      { nivel: 20, ganha: ['<strong>JPF ou morre.</strong> Alcance a <strong>200%</strong>. Realiza qualquer poder <strong>sem rolagem</strong>.'] },
    ],
  },
  {
    classe: 'Sensível à Força', nome: 'Sentinela', afiliacao: '—',
    sabor: 'O equilíbrio. Caçador e investigador, move-se pelo mundo real.',
    passos: [
      {
        nivel: 5, congela: [],
        anota: ['Os três talentos'],
        ganha: ['<strong>Ofícios do Submundo:</strong> escolhe <strong>três talentos de Operativo</strong>, com a % de um Gatuno de <strong>metade</strong> do seu nível (mínimo 1).'],
      },
      { nivel: 10, ganha: ['<strong>Vontade Inquebrável:</strong> suas JP contra poderes da Força e efeitos mentais são <strong>Fáceis</strong>.'] },
      { nivel: 15, ganha: ['<strong>Caçador da Força:</strong> sente outros Sensíveis por perto e leva <strong>vantagem no primeiro Duelo</strong> de cada confronto.'] },
    ],
    nota: 'A única especialização do jogo que <strong>não troca nada</strong>. Mantém a coluna normal da tabela, sem o teto do Guardião nem o salto do Consular — a mais versátil das quatro.',
  },
  {
    classe: 'Sensível à Força', nome: 'Vidente', afiliacao: '—',
    sabor: '"A Força não está em mim. Eu é que estou nela." Puxa a Força do mundo ao redor.',
    passos: [
      {
        nivel: 5, congela: [],
        ganha: ['<strong>Comunhão:</strong> canaliza a Força dos seres inteligentes amigáveis ou neutros a <strong>20 m</strong>, ganhando Alcance igual à soma dos bônus de Intelecto deles — até <strong>1/4</strong> do seu Alcance diário.'],
      },
      {
        nivel: 10,
        congela: ['a BA'],
        anota: ['BA'],
        ganha: ['A Comunhão alcança <strong>40 m</strong> e o teto sobe para <strong>1/3</strong>.',
                '<em>O preço:</em> <strong>30% de atrair descargas elétricas</strong> por perto. A sintonia é involuntária.'],
      },
      { nivel: 20, ganha: ['Comunhão a <strong>100 m</strong>, teto de <strong>metade</strong> do Alcance (pode passar de 200%).', '<em>O preço:</em> a atração de descargas sobe para <strong>80%</strong> — estar perto dele num tiroteio é perigoso para todos.'] },
    ],
  },
];

/**
 * O que ainda progride NAQUELE nível: a base menos tudo o que congelou até ali.
 *
 * Tem de ser por nível, não no total. O Sabotador de 5º ainda tem Escalar,
 * Furtividade e Percepção — só perde no 10º. Mostrar o estado final na linha do
 * 5º ensina a regra errada.
 */
export function mantem(espec, ateNivel = Infinity) {
  const base = TALENTOS_BASE[espec.classe] ?? [];
  const congelados = espec.passos
    .filter((p) => p.nivel <= ateNivel)
    .flatMap((p) => p.congela ?? [])
    .join(' | ').toLowerCase();
  if (congelados.includes('todo o resto')) {
    const sobra = base.filter((t) => congelados.includes('menos ' + t.toLowerCase()));
    return sobra.length ? sobra : ['—'];
  }
  const vivos = base.filter((t) => !congelados.includes(t.toLowerCase()));
  return vivos.length ? vivos : ['—'];
}

/**
 * Em que nível cada especialização congela cada talento da base.
 * Devolve { [talento]: { [espec]: nivel | null } } — null = nunca congela.
 * É a matriz da "tarja": de relance se vê o que cada caminho sacrifica.
 */
export function matrizCongelamento(classe) {
  const base = TALENTOS_BASE[classe] ?? [];
  const specs = ESPECIALIZACOES.filter((e) => e.classe === classe);
  const m = {};
  for (const t of base) {
    m[t] = {};
    for (const e of specs) {
      let quando = null;
      for (const p of e.passos) {
        const txt = (p.congela ?? []).join(' | ').toLowerCase();
        if (!txt) continue;
        // "todo o resto, menos X" congela tudo fora o X
        if (txt.includes('todo o resto')) {
          if (!txt.includes('menos ' + t.toLowerCase())) { quando ??= p.nivel; }
        } else if (txt.includes(t.toLowerCase())) {
          quando ??= p.nivel;
        }
      }
      m[t][e.nome] = quando;
    }
  }
  return { talentos: base, specs: specs.map((e) => e.nome), matriz: m };
}
