// Texto ORIGINAL de cada especializacao, como esta escrito no cofre.
//
// GERADO de Space Dragon Nativo/ pelo tools/extratores/textos-spec.py — nao editar.
// O guia mostra este texto tal e qual; o que ele acrescenta e a tabela derivada.

export const TEXTOS_SPEC = [
  {
    "classe": "Veterano",
    "nome": "Mercenário",
    "sabor": "o soldado/pistoleiro (Neutro)",
    "exemplo": "Stormtroopers de elite, mercenários, pistoleiros do submundo, soldados clones.",
    "texto": "Para de progredir em **Pilotar Naves**. Escolhe **uma arma** com a qual fica mais perigoso do que nunca: o dano crítico com ela é sempre **um multiplicador acima** do da tabela do Veterano. Assim, um Mercenário de **5º nível** tem crítico **×4** com a arma preferida, e um de **18º nível** tem **×6**.\n- `10º` **−4** ao usar qualquer arma que não a preferida e **+2** com ela (só no 1º ataque); pode **sacrificar o 2º ataque** para garantir chance de crítico; a **JP para de progredir**.\n- `20º` só usa a arma escolhida, mas **garante chance de crítico nos dois ataques**."
  },
  {
    "classe": "Veterano",
    "nome": "Caçador de Recompensas",
    "sabor": "o caçador (Rebelde)",
    "exemplo": "Boba Fett, Cad Bane, Bossk, Fennec. Casa com a Senda Mandaloriana (fase 2).",
    "texto": "- `5º` passa a **operar aparatos ofensivos** e a **operar/consertar máquinas**, usando a **% de Desarmar/Subjugar** como chance.\n- `10º` a rolagem de Desarmar/Subjugar rende um **ataque extra**, chegando a **+2 ataques** (com a 2ª BA).\n- `20º` usa **qualquer aparato** como um Técnico de igual nível e desfere **sempre 3 ataques**."
  },
  {
    "classe": "Veterano",
    "nome": "Emissário",
    "sabor": "o diplomata/senador/capitão-líder (Leal)",
    "exemplo": "Leia Organa, Bail, Mon Mothma, um capitão contrabandista que virou general da Aliança.",
    "texto": "Para de progredir em **Dano Crítico**, mas usa essa progressão como **multiplicador do ajuste de reação** (Comunicação). Recebe **salário de $20.000 × nível/mês** do indivíduo ou organização que representa.\n- `10º` para em **Desarmar/Subjugar**; ganha uma **nave patrocinada** (combustível e reparos custeados) e pode ter tripulação até seu número máximo de seguidores.\n- `20º` a tripulação **triplica**; usa a **% de Desarmar/Subjugar** como chance de tornar **amigável** a reação de uma criatura inteligente."
  },
  {
    "classe": "Operativo",
    "nome": "Espião",
    "sabor": "agente de inteligência (Leal)",
    "exemplo": "Cassian Andor, Fulcrum, agentes do ISB.",
    "texto": "Sua **Sabotagem** sobe para a **% de Furtividade** e passa a progredir junto com ela. O **Crédito Tecnológico** (por Ciência) conta **dobrado**. Usa a **% de Furtar** para **passar-se por outra pessoa**, somando o ajuste de reação por Comunicação.\n- `10º` usa a **% de Escalar** como chance de **obter informação** relevante, por contatos ou registros; usa **aparatos defensivos** como um Técnico.\n- `20º` **Furtividade, Sabotagem e Furtar igualam os 99% de Escalar**."
  },
  {
    "classe": "Operativo",
    "nome": "Sabotador",
    "sabor": "demolições e armadilhas (Neutro)",
    "exemplo": "Demolicionista rebelde, saboteur de bases imperiais.",
    "texto": "Ganha um **bônus em Sabotagem** igual à diferença entre a % de Escalar e 100% (ex.: no 5º, Escalar 84% → **+16%**). O bônus **não é cumulativo**: a cada nível ele é recalculado sobre a % da tabela, resultando numa porcentagem nova. Para de progredir em **Furtar** e **Ataque Furtivo**.\n- `10º` para de progredir em **todo talento exceto Sabotagem**, e passa a **criar armadilhas** com as máquinas que sabota: a chance de **desarmá-las** é inversa à sua % de Sabotagem (quanto melhor ele sabota, mais difícil desfazer sua obra). No 10º isso dá **29% de desarme**, contra os 71% de sabotagem já com o bônus e sem contar atributo. *(O livro imprime 27%/73% neste exemplo, mas isso só fecha com a linha do 11º nível: no 10º a Sabotagem é 60% e Escalar 89%, então o bônus é +11% e o total 71%. A fórmula confere com o exemplo do 5º nível, que o próprio livro dá: Escalar 84% → +16%.)*\n- `20º` Sabota a **99%**; armadilhas dele têm **1% de chance de desarme**."
  },
  {
    "classe": "Operativo",
    "nome": "Assassino",
    "sabor": "a lâmina do submundo (Neutro)",
    "exemplo": "Matadores da Aurora Negra, agentes de eliminação do submundo.",
    "texto": "Para de progredir em **Escalar** e **Sabotagem**. O **Ataque Furtivo** ganha **+1 no multiplicador** (×3 já no 5º, ×4 no 6º…).\n- `10º` para de progredir em **Furtar**; qualquer acerto passa a ter **20%** de contar como Ataque Furtivo (fora os que já contariam); desenvolve **venenos**, de efeito acertado com o Mestre.\n- `20º` **todos os seus ataques** contam como Ataque Furtivo; num crítico, o alvo faz **JPF ou morre** (dano massivo)."
  },
  {
    "classe": "Operativo",
    "nome": "Contrabandista",
    "sabor": "o malandro espacial (Rebelde)",
    "exemplo": "Hondo Ohnaka, os capitães do Cartel, o próprio Han em modo pirataria.",
    "texto": "Para de progredir em **Sabotagem** e **Furtar**. Usa o **Crédito Tecnológico** (por Ciência) como desconto em **qualquer negociação**, e o **dobro** dessa % para **extorsão**; é proficiente em **escudos de energia**.\n- `10º` para de progredir também em **Furtividade**, mas usa a **% de Furtividade** já alcançada como chance de um **ataque adicional** no turno (com a BA de 7 níveis abaixo); pilota e usa qualquer aparato como um Técnico de **metade** dos seus níveis; **tripulação fiel** = seu número máximo de seguidores (mínimo 2).\n- `20º` desfere **sempre 2 ataques** (o 2º com a BA de 5 níveis abaixo); **dobra/quadruplica** o Crédito; tripulação **triplica** (mínimo 4)."
  },
  {
    "classe": "Técnico",
    "nome": "Médico de Campo",
    "sabor": "o curandeiro (Leal)",
    "exemplo": "Médicos rebeldes, cirurgiões de bacta, os que remendam heróis entre uma batalha e outra.",
    "texto": "Para de progredir em **Operar Máquinas**, mas o **Crédito Tecnológico sobe +1%/nível**; abre mão de armas, exceto os artefatos que ele mesmo cria. Dedica a ciência à carne viva — cirurgia, bacta, próteses, antídotos.\n- `10º` usa a **% de Operar Máquinas** como chance de ter à mão a informação ou o artefato médico relevante; em troca, seus aparatos contam **2 NT acima** (limitando-o a criar até o 8º NT).\n- `20º` Crédito Tecnológico de **100%**; submete-se a um código de ética: **proibido causar dano a seres vivos** — quebrar isso suspende as habilidades da especialização até uma reparação."
  },
  {
    "classe": "Técnico",
    "nome": "Engenheiro",
    "sabor": "o inventor (Neutro)",
    "exemplo": "Construtores de droides (um Anakin criança), os engenheiros de Mon Cala, o gênio que monta uma nave com sucata.",
    "texto": "Salta para o **4º Nível Tecnológico** já no 5º nível e ganha **+1 NT a cada 2 níveis** (chega ao 10º NT no 17º). O Crédito Tecnológico vira **custo adicional** — inventar do zero sai mais caro que comprar pronto.\n- `10º` o prejuízo **dobra**, mas ele passa a **combinar até 3 aparatos** num só engenho.\n- `20º` cria **qualquer** máquina e realiza **qualquer** feito, a custo dobrado, independente das condições."
  },
  {
    "classe": "Técnico",
    "nome": "Slicer",
    "sabor": "o mestre dos sistemas (Rebelde)",
    "exemplo": "Slicers, ratos de dados, os técnicos que juram que a nave tem alma — e talvez tenham razão.",
    "texto": "- `5º` passa a **sabotar e reprogramar máquinas como um Operativo de 1/3 dos seus níveis** (arromba fechaduras eletrônicas, derruba alarmes, força cofres de dados).\n- `10º` para de progredir na sabotagem, mas passa a **Reprogramar Robôs**: contra a Tabela 3-2, um resultado **\"D\"** significa **robô reprogramado permanentemente** para servi-lo, e um **\"A\"**, controlável por **24 horas**. Não destrói o exército de droides do inimigo — vira-o contra o dono.\n- `20º` **Faísca do Oculto:** de tanto mergulhar nos fluxos de dados, a mente do Slicer toca o **Espírito Galáctico** e passa a manifestar **poderes da Força de 1ª Grandeza** (lista Universal), com **alcance mental diário = bônus de Ciência**.\n\n> ⚙️ **Divergência deliberada do livro (travada).** No SD nativo, a faísca do Niilógico corre pelo **Intelecto** — mas o Niilógico é um **Mentálico** (classe de Intelecto). Nosso Slicer é um **Técnico** (Cientista, classe de **Ciência**), então a faísca dele nasce da **maestria científica**: usa **Ciência**. Isso mantém o Slicer num atributo só (sem atributo secundário órfão) e preserva o contraste do cenário — *o Jedi sente (Intelecto), o hacker calcula (Ciência)*. *Variante fiel ao livro: troque por Intelecto se quiser o número nativo cru.*"
  },
  {
    "classe": "Sensível à Força",
    "nome": "Guardião",
    "sabor": "o Jedi/Sith de sabre",
    "exemplo": "",
    "texto": "Troca a amplitude do poder pela maestria da lâmina.\n- `5º` **Adestramento de Combate:** sua **Base de Ataque passa a evoluir como a de um Veterano** (Cosmonauta) e você usa **vestes médias** sem bloquear os poderes.\n- `5º` **Formas de Sabre:** domina **uma das sete Formas** (Shii-Cho, Makashi, Soresu, Ataru, Djem So, Niman, Juyo/Vaapad) — detalhadas em *Sabre e Cristais* (fase 2).\n- **Troca:** seu **teto de Grandeza passa a ser a 6ª** — os feitos lendários (7ª+) ficam para os conjuradores. A lâmina cobra o preço da profundidade.\n\n> Obi-Wan, Anakin, Ahsoka, Darth Maul, Darth Vader. *(Não há especialização guerreira nativa do Mentálico; esta Senda é design do cenário, com a BA emprestada do Cosmonauta.)*"
  },
  {
    "classe": "Sensível à Força",
    "nome": "Consular",
    "sabor": "o Jedi/Sith conjurador",
    "exemplo": "",
    "texto": "Mergulha na Força até o fundo, deixando o corpo para trás — e, quando o Alcance acaba, ainda tem a carne para queimar.\n- `5º` ganha a **4ª Grandeza direto** (englobando a 3ª) e **+1 Grandeza a cada 2 níveis** (chega à 10ª no 17º); a **BA congela** no 5º.\n- `10º` a **JP congela**; seu Alcance conta como o de um Sensível **+2 níveis** (100% já no 14º); começa a **perder 1-2 PV** a cada nível que sobe.\n- `17º+` a cada subida de nível, faça **JPF ou perca 1 de Constituição** (permanente).\n- `20º` **JPF ou morre**; Alcance a **200%**; realiza qualquer poder **sem rolagem**.\n\n> Yoda, Palpatine, Dooku, a Bruxa Mãe. A Força é a arma inteira — e o corpo, só o combustível."
  },
  {
    "classe": "Sensível à Força",
    "nome": "Sentinela",
    "sabor": "o equilíbrio, caçador e investigador",
    "exemplo": "",
    "texto": "Nem tanque nem canhão: o Sensível que se move pelo mundo real, farejando a Sombra e sobrevivendo a ela.\n- `5º` **Ofícios do Submundo:** ganha **três talentos de Operativo** à escolha (Furtividade, Sabotagem, Escalar, Ataque Furtivo…), com a % de um Gatuno de **metade** do seu nível (mínimo 1).\n- `10º` **Vontade Inquebrável:** suas JP contra poderes da Força e efeitos mentais são **Fáceis**.\n- `15º` **Caçador da Força:** sente a presença de outros Sensíveis por perto e leva **vantagem no primeiro Duelo da Força** de cada confronto.\n- **Progressão:** mantém a coluna normal da Tabela (sem o teto do Guardião nem o salto do Consular) — o mais versátil dos três.\n\n> Kanan, Ezra, os Inquisidores caçando Jedi, os Guardas de Templo."
  },
  {
    "classe": "Sensível à Força",
    "nome": "Vidente",
    "sabor": "o místico dos nexos",
    "exemplo": "",
    "texto": "*\"A Força não está em mim. Eu é que estou nela.\"* Nem Jedi nem Sith: puxa a Força do **mundo ao redor** — dos vivos, das raízes, das pedras, dos nexos.\n- `5º` **Comunhão:** canaliza a Força dos seres vivos inteligentes **amigáveis ou neutros a 20 m**, ganhando Alcance extra igual à **soma dos bônus de Intelecto** deles — até **1/4** do seu Alcance Diário (deixa de somar o próprio bônus de Intelecto). A **JP congela**.\n- `10º` a Comunhão alcança **40 m** e o teto sobe para **1/3**; a **BA congela**; passa a ter **30% de atrair descargas elétricas** por perto (a sintonia é involuntária).\n- `20º` a Comunhão alcança **100 m** e o teto é **metade** do Alcance (podendo passar de 200%); a atração de descargas sobe para **80%** — estar perto dele numa tempestade ou num tiroteio é perigoso para todos.\n\n> **Troca:** o Vidente **não é treinado** — não usa sabre de luz sem penalidade e seu **teto de Grandeza é a 8ª** (os feitos de 9ª–10ª exigem uma disciplina formal que ele não tem).\n\n> As Nightsisters de Dathomir, Bendu, os místicos dos Whills, a velha do vilarejo que sabia que você vinha.\n\n---"
  }
];
