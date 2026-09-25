// A camada da Força do cenário: o que é núcleo, o que é módulo opcional, e os
// Domínios do Eco da Senda.
//
// Espelha 20 Space Dragon/Space Dragon Nativo/SW-SDN-Forca.md — quando aquele
// capítulo mudar, mude aqui também. A separação núcleo/módulos existe porque o
// Sensível é a classe mais densa do cenário: só o núcleo é regra.

export const NUCLEO = [
  'a tabela da classe',
  'o <strong>Alcance da Força</strong> (% diário)',
  'a <strong>Grandeza-Limite</strong>',
  'poderes <strong>conhecidos × desconhecidos</strong>',
  'o <strong>Duelo da Força</strong>',
  'a <strong>Senda</strong> do 5º nível',
  'a trilha de <strong>Corrupção</strong>',
];

export const MODULOS = [
  ['A Tentação', 'compra de sucesso pagando Corrupção'],
  ['Eco da Senda', 'o Alcance que volta, no 10º e no 15º'],
  ['Caminho Cinza', 'as três listas de poderes, conquistado em jogo'],
  ['Formas de Sabre', 'as sete Formas do Guardião'],
];

// A trilha de Corrupção, 0 a 10 (SW-SDN-Forca § Corrupção)
export const CORRUPCAO = [
  ['0–2', 'Sereno', 'Sem penalidade.'],
  ['3–5', 'Marcado', 'Olhos amarelam sob esforço; testes sociais com não-corrompidos ficam Difíceis quando a Força é usada à vista.'],
  ['6–8', 'Tomado', 'Surtos de fúria; em estresse extremo o Mestre pode assumir uma ação.'],
  ['9', 'À beira', 'Todas as penalidades de <em>Tomado</em> — e a Sombra passa a <strong>oferecer</strong>.'],
  ['10', '<strong>Queda</strong> ou <strong>Consumido</strong>', 'Luz/neutro vira Sombra e volta a 7; quem já era da Sombra vira PNJ do Mestre.'],
];

export const TENTACAO = [
  ['Insistir', '+1',
   'Você falhou numa rolagem e não aceita a falha: <strong>rerrole</strong> e fique com o <strong>segundo resultado, seja ele qual for</strong>.'],
  ['Sentenciar', '+1',
   'Um ataque que <strong>já acertou</strong> vira <strong>crítico</strong>, ou um poder que <strong>já passou</strong> tem dano, duração ou número de alvos <strong>dobrados</strong>.'],
];

// Listas FECHADAS: o Domínio existe para não haver arbitragem no meio da cena.
// Um mesmo poder pode constar em dois Domínios — cada personagem tem uma Senda
// só, então nunca há conflito.
export const DOMINIOS = [
  {
    senda: 'Guardião',
    dominio: 'O Corpo e a Lâmina',
    sobre: 'A Força que empurra, sustenta, apara e golpeia matéria.',
    poderes: [
      ['1ª', ['Rajada da Força', 'Empurrão da Força', 'Sentir o Perigo']],
      ['2ª', ['Levitação']],
      ['3ª', ['Correr com a Força', 'Salto da Força', 'Deflexão da Força', 'Coragem', 'Estrangular']],
      ['4ª', ['Telecinésia', 'Absorver Energia']],
      ['6ª', ['Tempestade da Força']],
      ['7ª', ['Barreira da Força']],
      ['8ª', ['Meditação de Batalha']],
    ],
  },
  {
    senda: 'Consular',
    dominio: 'A Mente e o Domínio',
    sobre: 'A Força que fala, convence, dobra e escraviza vontades.',
    poderes: [
      ['1ª', ['Truque Mental Menor', 'Telepatia', 'Toque Adormecedor']],
      ['2ª', ['Sugestão Sutil', 'Telepatia em Grupo', 'Aterrorizar', 'Enfraquecer']],
      ['3ª', ['Truque Mental', 'Sugestão da Força', 'Implantar Pensamento', 'Prisão da Força', 'Choque da Força', 'Serenidade em Área', 'Domínio Hipnótico']],
      ['4ª', ['Nublar a Mente', 'Induzir Convicção', 'Transferir Pensamento', 'Pesadelo', 'Reescrever Memória']],
      ['5ª', ['Extirpar Emoção', 'Implantar Memória', 'Inverter a Alma']],
      ['6ª', ['Escudo Mental', 'Fortaleza da Força', 'Arrancar Segredos', 'Dominação Mental', 'Drenar a Mente']],
      ['7ª', ['Tormento', 'Enlouquecer', 'Fraturar a Mente', 'Ceifar a Mente']],
      ['8ª', ['Despertar o Outro', 'Aprisionar a Mente']],
      ['9ª', ['Sono Eterno', 'Colapso Mental']],
      ['10ª', ['Prisão do Infinito', 'Morte pela Força']],
    ],
  },
  {
    senda: 'Sentinela',
    dominio: 'O Rastro e o Véu',
    sobre: 'A Força que procura, revela e esconde.',
    poderes: [
      ['1ª', ['Sentir a Força', 'Miragem', 'Compreender a Fala', 'Vínculo da Força']],
      ['2ª', ['Localizar pela Força', 'Discernir a Verdade', 'Ler a Corrente', 'Ver o Oculto', 'Ocultar-se da Força', 'Manto de Escuridão']],
      ['3ª', ['Sondar a Mente', 'Ler a Mente', 'Dissipar a Força']],
      ['4ª', ['Revelar o Subconsciente']],
      ['5ª', ['Contatar Sensível', 'Vínculo Sensorial', 'Copiar Memória']],
      ['6ª', ['Rastrear pela Força', 'Vínculo com o Lugar', 'Máscara da Loucura', 'Apagar Rastros', 'Forjar Rastros', 'Mente Coletiva', 'Rede da Força']],
      ['7ª', ['Mapa da Força', 'Ecos do Lugar']],
      ['8ª', ['Projeção Astral']],
      ['9ª', ['Projeção da Força']],
    ],
  },
  {
    senda: 'Vidente',
    dominio: 'A Vida e a Presciência',
    sobre: 'A Força que corre nos vivos e no tempo.',
    poderes: [
      ['1ª', ['Vínculo da Força', 'Sentir o Perigo']],
      ['2ª', ['Fortalecer']],
      ['3ª', ['Cura pela Força']],
      ['4ª', ['Premonição', 'Tecer Sonhos', 'Sonho Compartilhado', 'Círculo de Foco']],
      ['5ª', ['Repelir a Fera', 'Estase da Fera', 'Realocar Vigor']],
      ['6ª', ['Comungar com a Força', 'Vivenciar Memória']],
      ['7ª', ['Presciência', 'Falar com os Mortos', 'Caminhar na Memória', 'Reanimar a Mente']],
      ['8ª', ['Restaurar a Mente', 'Recriar a Mente', 'Possuir os Mortos']],
      ['9ª', ['Tornar-se Espírito', 'Resgatar a Alma', 'Reencarnar']],
      ['10ª', ['Tornar-se Um com a Força']],
    ],
  },
  {
    senda: 'Artífice',
    dominio: 'A Matéria e o Cristal',
    sobre: 'A Força que lê, molda e desperta objetos — e a que mexe na engenharia dos próprios poderes.',
    poderes: [
      ['1ª', ['Sentir a Força']],
      ['2ª', ['Localizar pela Força', 'Sintonia Eletrônica']],
      ['3ª', ['Dissipar a Força', 'Ampliar a Força']],
      ['4ª', ['Telecinésia', 'Círculo de Foco']],
      ['5ª', ['Combinar Poderes']],
      ['6ª', ['Impregnar Objeto', 'Apagar Rastros', 'Forjar Rastros']],
      ['7ª', ['Ecos do Lugar', 'Despertar a Mente']],
      ['8ª', ['Transferir a Alma']],
      ['9ª', ['Cárcere da Alma']],
      ['10ª', ['Criar uma Alma']],
    ],
  },
];

// Quem trilhou a Senda Mandaloriana abriu mão da especialização — e do Domínio.
export const SEM_ECO = 'Senda Mandaloriana';
