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
    "exemplo": "Boba Fett, Cad Bane, Bossk, Fennec. Casa com a [[SW-SDN-Senda-Mandaloriana|Senda Mandaloriana]].",
    "texto": "Passa a **operar aparatos ofensivos** e a **operar e consertar máquinas**, usando como chance a **% de Desarmar/Subjugar** somada ao **Crédito Tecnológico** da sua Ciência. O talento **muda de ofício**: como manobra de desarmar e subjugar, ele **para de progredir no 5º**; a progressão da tabela continua, mas passa a valer só para aparatos e máquinas.\n- `10º` **Ataque extra:** logo depois do primeiro ataque do turno, pode rolar **Desarmar/Subjugar com a % do 5º nível**. Sucesso: faz **mais dois ataques** naquele turno, os dois com a **2ª BA** — três no total. Falha: **não faz mais nada** no turno. O ataque extra pode ser trocado por uma tentativa de desarmar ou subjugar.\n- `20º` usa **qualquer aparato** como um Técnico de igual nível e faz **sempre 3 ataques** por turno, sem rolar — o extra com a 2ª BA, e ainda podendo virar desarme ou submissão."
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
    "texto": "Troca a amplitude do poder pela maestria da lâmina.\n- `5º` **Adestramento de Combate:** sua **Base de Ataque passa a evoluir como a de um Veterano** (Cosmonauta) e você usa **vestes médias** sem bloquear os poderes.\n- `5º` **Formas de Sabre:** domina **uma das sete Formas** (Shii-Cho, Makashi, Soresu, Ataru, Djem So, Niman, Juyo/Vaapad) — detalhadas em [[SW-SDN-Sabre-e-Cristais]].\n- **Troca:** a **JP congela no 5º** e o **teto de Grandeza passa a ser a 6ª** — os feitos lendários (7ª+) ficam para os conjuradores. Como toda especialização de Mentálico, ele paga com uma das duas colunas de corpo; trocou a Base de Ataque por uma melhor, então a conta vem na Proteção. O Guardião bate como um soldado e **resiste como um místico que parou de treinar a mente**.\n\n> Obi-Wan, Anakin, Ahsoka, Darth Maul, Darth Vader. *(Não há especialização guerreira nativa do Mentálico; esta Senda é design do cenário, com a BA emprestada do Cosmonauta.)*\n\n<!-- tabela-spec: Guardião -->\n\n**Progressão do Guardião** — do 5º ao 20º nível.\n\n| Nv | DV | BA | JP | Alcance | Grandeza |\n|---|---|---|---|---|---|\n| **5** | 5 | **+5** | ⊘ 13 | 9% | 3ª |\n| **6** | 6 | **+6** | ⊘ 13 | 13% | **3ª** |\n| **7** | 7 | **+7/+1** | ⊘ 13 | 17% | 4ª |\n| **8** | 8 | **+8/+2** | ⊘ 13 | 23% | **4ª** |\n| **9** | 9 | **+9/+3** | ⊘ 13 | 28% | 5ª |\n| **10** | +1 | **+10/+4** | ⊘ 13 | 36% | **5ª** |\n| **11** | +1 | **+10/+4** | ⊘ 13 | 43% | **6ª (teto)** |\n| **12** | +1 | **+11/+5** | ⊘ 13 | 53% | **6ª (teto)** |\n| **13** | +1 | **+11/+5** | ⊘ 13 | 62% | **6ª (teto)** |\n| **14** | +1 | **+12/+6** | ⊘ 13 | 74% | **6ª (teto)** |\n| **15** | +2 | **+12/+6** | ⊘ 13 | 86% | **6ª (teto)** |\n| **16** | +2 | **+13/+7** | ⊘ 13 | 100% | **6ª (teto)** |\n| **17** | — | **+13/+7** | ⊘ 13 | 115% | **6ª (teto)** |\n| **18** | — | **+14/+8** | ⊘ 13 | 131% | **6ª (teto)** |\n| **19** | — | **+14/+8** | ⊘ 13 | 139% | **6ª (teto)** |\n| **20** | — | **+15/+9** | ⊘ 13 | 150% | **6ª (teto)** |\n\n⊘ = congelado, repete o valor em que travou · **em negrito** = o valor desta especialização, no lugar do da classe base.\n\n> A BA passa a evoluir como a de um Veterano e você usa vestes médias sem bloquear os poderes. Em troca, o teto de Grandeza para na 6ª.\n\n<!-- /tabela-spec -->"
  },
  {
    "classe": "Sensível à Força",
    "nome": "Consular",
    "sabor": "o Jedi/Sith conjurador",
    "exemplo": "",
    "texto": "Mergulha na Força até o fundo, deixando o corpo para trás — e, quando o Alcance acaba, ainda tem a carne para queimar.\n- `5º` ganha a **4ª Grandeza direto** (englobando a 3ª) e **+1 Grandeza a cada 2 níveis** (chega à 10ª no 17º); a **BA congela** no 5º.\n- `10º` a **JP congela**; seu Alcance conta como o de um Sensível **+2 níveis** (100% já no 14º); começa a **perder 1-2 PV** a cada nível que sobe.\n- `17º+` a cada subida de nível, faça **JPF ou perca 1 de Constituição** (permanente).\n- `20º` **JPF ou morre**; Alcance a **200%**; realiza qualquer poder **sem rolagem**.\n\n> Yoda, Palpatine, Dooku, a Bruxa Mãe. A Força é a arma inteira — e o corpo, só o combustível.\n\n<!-- tabela-spec: Consular -->\n\n**Progressão do Consular** — do 5º ao 20º nível.\n\n| Nv | DV | BA | JP | Alcance | Grandeza | O preço |\n|---|---|---|---|---|---|---|\n| **5** | 5 | ⊘ +2 | 13 | **17%** | **4ª** | — |\n| **6** | 6 | ⊘ +2 | 13 | **23%** | **4ª** | — |\n| **7** | 7 | ⊘ +2 | 12 | **28%** | **5ª** | — |\n| **8** | 8 | ⊘ +2 | 12 | **36%** | **5ª** | — |\n| **9** | 9 | ⊘ +2 | 12 | **43%** | **6ª** | — |\n| **10** | +1 | ⊘ +2 | ⊘ 11 | **53%** | **6ª** | −1-2 PV/nível |\n| **11** | +1 | ⊘ +2 | ⊘ 11 | **62%** | **7ª** | −1-2 PV/nível |\n| **12** | +1 | ⊘ +2 | ⊘ 11 | **74%** | **7ª** | −1-2 PV/nível |\n| **13** | +1 | ⊘ +2 | ⊘ 11 | **86%** | **8ª** | −1-2 PV/nível |\n| **14** | +1 | ⊘ +2 | ⊘ 11 | **100%** | **8ª** | −1-2 PV/nível |\n| **15** | +2 | ⊘ +2 | ⊘ 11 | **115%** | **9ª** | −1-2 PV/nível |\n| **16** | +2 | ⊘ +2 | ⊘ 11 | **131%** | **9ª** | −1-2 PV/nível |\n| **17** | — | ⊘ +2 | ⊘ 11 | **139%** | **10ª** | JPF ou −1 CON |\n| **18** | — | ⊘ +2 | ⊘ 11 | **150%** | **10ª** | JPF ou −1 CON |\n| **19** | — | ⊘ +2 | ⊘ 11 | **150%** | 10ª | JPF ou −1 CON |\n| **20** | — | ⊘ +2 | ⊘ 11 | **200%** | **10ª** | JPF ou morre |\n\n⊘ = congelado, repete o valor em que travou · **em negrito** = o valor desta especialização, no lugar do da classe base.\n\n> Ganha a 4ª Grandeza direto no 5º e +1 a cada 2 níveis, chegando à 10ª no 17º. O Alcance conta como o de um Sensível +2 níveis. O corpo paga a conta.\n\n<!-- /tabela-spec -->"
  },
  {
    "classe": "Sensível à Força",
    "nome": "Sentinela",
    "sabor": "o equilíbrio, caçador e investigador",
    "exemplo": "",
    "texto": "Nem tanque nem canhão: o Sensível que se move pelo mundo real, farejando a Sombra e sobrevivendo a ela.\n- `5º` **Ofícios do Submundo:** ganha **três talentos de Operativo** à escolha (Furtividade, Sabotagem, Escalar, Ataque Furtivo…), com a % de um Gatuno de **metade** do seu nível (mínimo 1).\n- `10º` **Vontade Inquebrável:** **+4 nas JPM** contra poderes da Força e efeitos mentais. Em troca, a sua **JP congela** neste nível.\n- `15º` **Caçador da Força:** sente a presença de outros Sensíveis por perto e leva **+2 no primeiro Duelo da Força** de cada confronto (soma ao `1d6 + nível`).\n- **Progressão:** mantém a Grandeza e o Alcance da coluna normal — sem o teto do Guardião nem o salto do Consular. É a mais versátil das quatro, e por isso paga **mais tarde**: a JP só congela no 10º, enquanto as outras pagam já no 5º.\n\n> Kanan, Ezra, os Inquisidores caçando Jedi, os Guardas de Templo.\n\n<!-- tabela-spec: Sentinela -->\n\n**Progressão do Sentinela** — do 5º ao 20º nível.\n\n| Nv | DV | BA | JP | Alcance | Grandeza | Talentos (metade do nível) | JPM contra a Força |\n|---|---|---|---|---|---|---|---|\n| **5** | 5 | +2 | 13 | 9% | 3ª | 25% | — |\n| **6** | 6 | +2 | 13 | 13% | — | 30% | — |\n| **7** | 7 | +3 | 12 | 17% | 4ª | 30% | — |\n| **8** | 8 | +3 | 12 | 23% | — | 35% | — |\n| **9** | 9 | +3 | 12 | 28% | 5ª | 35% | — |\n| **10** | +1 | +4 | ⊘ 11 | 36% | — | 40% | +4 |\n| **11** | +1 | +4 | ⊘ 11 | 43% | 6ª | 40% | +4 |\n| **12** | +1 | +4 | ⊘ 11 | 53% | — | 45% | +4 |\n| **13** | +1 | +5 | ⊘ 11 | 62% | 7ª | 45% | +4 |\n| **14** | +1 | +5 | ⊘ 11 | 74% | — | 50% | +4 |\n| **15** | +2 | +5 | ⊘ 11 | 86% | 8ª | 50% | +4 |\n| **16** | +2 | +6 | ⊘ 11 | 100% | — | 55% | +4 |\n| **17** | — | +6 | ⊘ 11 | 115% | 9ª | 55% | +4 |\n| **18** | — | +6 | ⊘ 11 | 131% | — | 60% | +4 |\n| **19** | — | +6 | ⊘ 11 | 139% | 10ª | 60% | +4 |\n| **20** | — | +6 | ⊘ 11 | 150% | — | 65% | +4 |\n\n⊘ = congelado, repete o valor em que travou.\n\n> Escolhe três talentos de Operativo, com a % de um Gatuno de metade do seu nível. A JP congela no 10º — mais tarde que nas outras Sendas, que é o preço de ser a mais versátil — mas em compensação ganha **+4 nas JPM** contra a Força e efeitos mentais.\n\n<!-- /tabela-spec -->"
  },
  {
    "classe": "Sensível à Força",
    "nome": "Vidente",
    "sabor": "o místico dos nexos",
    "exemplo": "",
    "texto": "*\"A Força não está em mim. Eu é que estou nela.\"* Nem Jedi nem Sith: puxa a Força do **mundo ao redor** — dos vivos, das raízes, das pedras, dos nexos.\n- `5º` **Comunhão:** canaliza a Força dos seres vivos inteligentes **amigáveis ou neutros a 20 m**, ganhando Alcance extra igual à **soma dos bônus de Intelecto** deles — até **1/4** do seu Alcance Diário (deixa de somar o próprio bônus de Intelecto). A **JP congela**.\n- `10º` a Comunhão alcança **40 m** e o teto sobe para **1/3**; a **BA congela**; passa a ter **30% de atrair descargas elétricas** por perto (a sintonia é involuntária).\n- `20º` a Comunhão alcança **100 m** e o teto é **metade** do Alcance (podendo passar de 200%); a atração de descargas sobe para **80%** — estar perto dele numa tempestade ou num tiroteio é perigoso para todos.\n\n> **Troca:** o Vidente **não é treinado** — não usa sabre de luz sem penalidade e seu **teto de Grandeza é a 8ª** (os feitos de 9ª–10ª exigem uma disciplina formal que ele não tem).\n\n> As Nightsisters de Dathomir, Bendu, os místicos dos Whills, a velha do vilarejo que sabia que você vinha.\n\n<!-- tabela-spec: Vidente -->\n\n**Progressão do Vidente** — do 5º ao 20º nível.\n\n| Nv | DV | BA | JP | Alcance | Grandeza | Comunhão | Teto da Comunhão | Atrai descargas |\n|---|---|---|---|---|---|---|---|---|\n| **5** | 5 | +2 | ⊘ 13 | 9% | 3ª | 20 m | ¼ | — |\n| **6** | 6 | +2 | ⊘ 13 | 13% | — | 20 m | ¼ | — |\n| **7** | 7 | +3 | ⊘ 13 | 17% | 4ª | 20 m | ¼ | — |\n| **8** | 8 | +3 | ⊘ 13 | 23% | — | 20 m | ¼ | — |\n| **9** | 9 | +3 | ⊘ 13 | 28% | 5ª | 20 m | ¼ | — |\n| **10** | +1 | ⊘ +4 | ⊘ 13 | 36% | — | 40 m | ⅓ | 30% |\n| **11** | +1 | ⊘ +4 | ⊘ 13 | 43% | 6ª | 40 m | ⅓ | 30% |\n| **12** | +1 | ⊘ +4 | ⊘ 13 | 53% | — | 40 m | ⅓ | 30% |\n| **13** | +1 | ⊘ +4 | ⊘ 13 | 62% | 7ª | 40 m | ⅓ | 30% |\n| **14** | +1 | ⊘ +4 | ⊘ 13 | 74% | — | 40 m | ⅓ | 30% |\n| **15** | +2 | ⊘ +4 | ⊘ 13 | 86% | 8ª | 40 m | ⅓ | 30% |\n| **16** | +2 | ⊘ +4 | ⊘ 13 | 100% | — | 40 m | ⅓ | 30% |\n| **17** | — | ⊘ +4 | ⊘ 13 | 115% | 9ª | 40 m | ⅓ | 30% |\n| **18** | — | ⊘ +4 | ⊘ 13 | 131% | — | 40 m | ⅓ | 30% |\n| **19** | — | ⊘ +4 | ⊘ 13 | 139% | 10ª | 40 m | ⅓ | 30% |\n| **20** | — | ⊘ +4 | ⊘ 13 | 150% | — | 100 m | ½ do Alcance | 80% |\n\n⊘ = congelado, repete o valor em que travou.\n\n> Canaliza a Força dos seres inteligentes por perto, somando os bônus de Intelecto deles. A sintonia é involuntária: do 10º em diante ele atrai raios.\n\n<!-- /tabela-spec -->"
  },
  {
    "classe": "Sensível à Força",
    "nome": "Artífice",
    "sabor": "o engenheiro de kyber",
    "exemplo": "Darth Plagueis; os antigos Zeffo, que moviam as próprias máquinas com a Força; e o que Galen Erso teria sido se tivesse nascido com o dom.",
    "texto": "*\"Vocês a chamam de mística porque nunca a mediram.\"*\n\nPara o Artífice, a Força não é fé — é **fenômeno**. Ele procura as bases da doutrina\nna ciência, e encontra: o cristal **kyber** responde, focaliza, amplifica. O que o Jedi\nfaz com anos de meditação, ele faz com uma lente bem cortada. E funciona.\n\nO preço é que **a Força dele atrofia**. Quem extrai poder da pedra deixa de exercitar o\npróprio, e a explicação corrói a intuição: quanto mais ele entende a Força, menos ela lhe\nobedece.\n\n- `5º` **A Lente:** usa **aparatos defensivos** livremente. Sua **Grandeza trava na 3ª**\n  e o **Alcance passa a avançar uma linha da tabela a cada dois níveis** — no 5º você\n  tem 9%, e só no 7º sobe para 13%, que é o valor do 6º.\n- `9º` a Grandeza destrava na **4ª**.\n- `10º` **Mãos de Oficina:** opera **qualquer** aparato com um teste de Operar Máquinas,\n  como um Técnico de **metade** dos seus níveis. A Grandeza trava de novo.\n- `13º` a Grandeza destrava na **5ª** e volta a subir de dois em dois — **teto prático na 8ª**.\n- `17º` **Carne Compensada:** você nunca alcança a plenitude mental do 16º, e o corpo cobre\n  a lacuna: **+2 PV por nível** daí em diante.\n- `20º` **O Preço da Lente:** usa aparatos como um Técnico de **nível igual** e os **cria**\n  como um Técnico de metade. Mas você já desaprendeu a sentir: **todo** poder da Força\n  passa a exigir uma rolagem percentual para funcionar.\n\n- **Troca:** **BA e JP congelam no 5º** e nunca mais progridem. É a única Senda que paga as\n  duas colunas de uma vez — e, por isso, **a única em que o Caminho não decide nada**. Ele\n  está tão fora do eixo místico que nem a escolha moral chega ao corpo dele.\n\n> **O que ele constrói.** O sabre é só o começo. Kyber move hipermotores, alimenta canhões,\n> guarda memória em holocrons — e um superlaser é kyber industrial. O Artífice é quem\n> pega a pedra que canta e a transforma em ferramenta. Por isso o Império o procura, a\n> Ordem o despreza, e ele é a única pessoa viva capaz de desmontar a arma que vai destruir\n> o planeta.\n>\n> **O Sangramento dele é laboratório, não ódio** (ver [[SW-SDN-Sabre-e-Cristais]]). Um Sith\n> tradicional acha isso uma blasfêmia — e talvez tenha razão."
  }
];
