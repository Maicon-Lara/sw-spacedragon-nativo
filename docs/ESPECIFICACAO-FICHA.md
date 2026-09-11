# Ficha do Space Dragon Nativo — especificação

**Alvo:** Custom System Builder (CSB) 6.x, Foundry 13/14.
**Fonte:** *Space Dragon — Livro Básico Aprimorado*, conferido contra
`20 Space Dragon/Space Dragon Nativo/` na auditoria de 11/09/2026.

Este documento é o **contrato da ficha**. Toda fórmula aqui foi gerada a partir de
`tools/data/tabelas.mjs`, que está validado contra os exemplos impressos no livro. As
cadeias de ternário prontas para colar estão em [`_formulas.md`](_formulas.md).

> **Por que não dá para reaproveitar o módulo de OD2.** Onze pontos do Nativo não têm
> onde morar no `olddragon2e`: CP em vez de CA, **uma** JP em vez de três, Intelecto /
> Ciência / Comunicação em vez de Sabedoria / Inteligência / Carisma, níveis até 20,
> talentos de Gatuno em d% por 20 níveis, Alcance da Força em % do dia, NT do Técnico,
> especializações no 5º nível, naves com atributos próprios, Moral percentil e — o que
> decide — a **Ordem de Ação invertida**.

---

## 1. As cinco formas de rolar

O sistema inteiro se resolve com cinco formas, e elas correm em **duas direções
opostas**. Errar a direção é o erro mais fácil de cometer aqui.

| Forma | Rolagem | Passa quando |
|---|---|---|
| **Teste de atributo** | `1d20` | resultado **≤ atributo** |
| **Talento / chance** | `d%` | resultado **≤ a %** |
| **Jogada de Proteção** | `1d20 + ajuste` | resultado **≥ o valor de JP da classe** |
| **Ataque** | `1d20 + BA` | resultado **≥ CP do alvo** |
| **Jogada resistida** | `1d20 + atributo` | **maior** dos dois vence |

E a sexta, que não é um teste e sim uma ordenação:

| **Ordem de Ação** | ver §6 | **menor** resultado age **primeiro** |
|---|---|---|

---

## 2. Atributos

Seis props numéricas, faixa **1–29**, sem modificador derivado por fórmula única — cada
atributo governa colunas diferentes.

| Prop | Nome | Governa |
|---|---|---|
| `FOR` | Força | ataque e dano corpo a corpo, Subjugar, carga |
| `DES` | Destreza | ataque à distância, **JPR**, CP, talentos de Gatuno |
| `CON` | Constituição | PV, **JPF**, clonagem, danos mortais |
| `INT` | Intelecto | poderes da Força, **JPM** |
| `CIE` | Ciência | robôs desativados, **Crédito Tecnológico** |
| `COM` | Comunicação | seguidores, reação, idiomas |

**Teste de atributo:** `1d20`, passa com **≤ o valor**. No CSB, uma rolagem
`1d20` com o alvo exibido; o sucesso é `1d20 <= FOR` (e assim por diante).

### Props derivadas dos atributos

Todas são **somente leitura** (fórmula), nunca digitadas:

| Prop | Vem de | Coluna |
|---|---|---|
| `forAtaque` | T1-1 | ajuste de ataque e dano CaC |
| `forSubjugar` | T1-1 | % de Subjugar |
| `cargaLeve` `cargaMedia` `cargaPesada` | T1-1 | kg |
| `desAtaque` | T1-2 | ajuste de ataque à distância **e de JPR** |
| `desTalentos` | T1-2 | ajuste **único** nos talentos de Gatuno |
| `conPV` | T1-3 | ajuste de PV **e de JPF** |
| `conClonagem` | T1-3 | % de clonagem |
| `danosMortais` | T1-3 | PV negativos em que morre |
| `intPoder` | T1-4 | % de realizar/aprender poder desconhecido |
| `intAlcance` | T1-4 | Alcance da Força adicional, em pontos de % |
| `intJPM` | T1-4 | ajuste de JPM |
| `cieRobos` | T1-5 | dado de robôs desativados por dia |
| `creditoTec` | T1-5 | **Crédito Tecnológico** em % |
| `comSeguidores` | T1-6 | máximo de seguidores |
| `comReacao` | T1-6 | ajuste de reação em % |
| `comIdiomas` | T1-6 | idiomas adicionais falados |
| `lerEscrever` | regra | `floor(COM / 6)` |

> **O Crédito Tecnológico é um número só.** Ele é a chance de sabotar máquinas, o uso
> de aparatos ofensivos pelo Caçador de Recompensas e o desconto do Técnico em qualquer
> compra. Não faça três campos.

> **A Destreza tem um ajuste percentual só**, e ele vale para Furtividade, Furtar e
> Desarmar. O cofre chegou a ter duas colunas aqui; era erro, e foi corrigido.

---

## 3. Classe, nível e subatributos

| Prop | Tipo | Vem de |
|---|---|---|
| `classe` | escolha | Veterano · Operativo · Técnico · Sensível à Força |
| `especializacao` | escolha | abre no **5º nível**, filtrada por `afiliacao` |
| `nivel` | número | **1 a 20** |
| `xp` | número | tabela **própria de cada classe** — não há fórmula geral |
| `dv` | fórmula | dado de vida da classe (d10 / d6 / d8 / d4) |
| `ba` | fórmula | coluna BA da tabela da classe |
| `jp` | fórmula | coluna JP da tabela da classe — **desce** de 14–16 até 9–10 |

### Coeficiente de Proteção

```
CP = protecaoVeste + desAtaque + cpAparatos + cpPoderes + cpNivel
```

- `protecaoVeste` — número da veste equipada (10 a 24 na escala do cenário).
- `desAtaque` — **o modificador de Destreza entra inteiro**. O Space Dragon **não tem
  teto de Destreza por armadura**; se você vê um campo "Máx. Des", é importação de D&D.
- `cpNivel` — faixa da **T4-1**, e **não é cumulativa**: o valor da faixa *é* o total.

| Nível | 1–3 | 4–7 | 8–11 | 12–15 | 16–19 | 20 |
|---|---|---|---|---|---|---|
| Bônus no CP | — | +1 | +2 | +3 | +4 | +5 |

*Conferência com o exemplo do livro:* cosmonauta de 1º nível, vestes médias
(proteção 12), Destreza 13 (+1), sem aparatos → **CP 13**.

### Jogadas de Proteção

**Uma** JP por classe e por nível. O tipo só muda qual ajuste se soma:

| Tipo | Rolagem |
|---|---|
| **JPR** Reflexos | `1d20 + desAtaque ≥ jp` |
| **JPF** Física | `1d20 + conPV ≥ jp` |
| **JPM** Mental | `1d20 + intJPM ≥ jp` |

### Pontos de Vida e movimento

```
pvMax  = soma dos DV rolados + (conPV × nivel)
mov    = 10 − reducaoVeste − penalidadeCarga − penalidadeGravidade − penalidadeTerreno
```

**Movimento base 10 m.** Nove metros é OD2.

---

## 4. Blocos por classe

### Veterano *(chassi: Cosmonauta, d10)*
`pilotar` % · `desarmarSubjugar` % · `critico` (×2 a ×5) — todos da coluna da T3-3.

### Operativo *(chassi: Gatuno, d6)*
**Seis** talentos em d%, e só seis. Cada um soma `desTalentos`.

| Prop | Talento | Observação |
|---|---|---|
| `sabotagem` | Sabotagem | destranca **e** avaria; é a **única** % que o `creditoTec` modifica |
| `sabotagemRodadas` | Rodadas | dado do tempo do trabalho (1d8 → 1d6 → 1d4) |
| `escalar` | Escalar | 3 m por sucesso |
| `furtividade` | Furtividade | esconder-se **e** mover-se em silêncio |
| `furtar` | Furtar | dobro da dificuldade = todos percebem |
| `percepcao` | Percepção | **1d6** contra a faixa, não d% |
| `ataqueFurtivo` | Atq. Furtivo | multiplicador de dano, +2 no ataque |

> Não crie `Arrombar` nem `Esconder`. O cofre tinha essas duas colunas; eram
> desdobramentos indevidos de Sabotagem e Furtividade, e foram removidas na auditoria.

### Técnico *(chassi: Cientista, d8)*
`operarMaquinas` % · `ntMax` (1 a 10, **um passo a cada dois níveis**, chegando a 10 no
19º) · tabela **T3-2 Desativar Robôs**: oito colunas por classe de robô, valores `N`
(não afeta), número (alvo em 1d20), `A` (automático), `D` (destruído/expulso).

### Sensível à Força *(chassi: Mentálico, d4)*

| Prop | Regra |
|---|---|
| `alcanceMax` | coluna da tabela **+ `intAlcance`** |
| `alcanceGasto` | barra de recurso; **zera com 8 h de descanso** |
| `grandezaLimite` | 1ª a 10ª, pela tabela |
| `poderesConhecidos` | começa com **2 de 1ª Grandeza** |

- Usar um poder desconta **% igual à Grandeza**, **mesmo se falhar ou for anulado**.
- Poder **desconhecido**: `d% ≤ intPoder` antes de usar. Falhar **gasta o Alcance** de
  todo jeito, e passar do **dobro** da dificuldade pode dar efeito colateral.
- **Nunca** passar do `alcanceMax`. Tentar é risco de morte.
- Manifestar exige concentração, mas **não** fala nem gesto.
- Em combate: **−4 no CP**, e **JPM** para não perder a ação se for atingido antes.

---

## 5. Itens

| Tipo | Campos |
|---|---|
| **Arma** | custo, **dano** (também é a Ordem de Ação), tipo, CDT, peso, disponibilidade, alcance |
| **Veste** | custo, **proteção**, redução de movimento, tipo, peso, disponibilidade |
| **Aparato** | custo, **NT**, categoria (ofensivo/defensivo/utilitário), tempo de construção, efeito |
| **Poder da Força** | **Grandeza** (= % gasto), corrente `[U]`/`[L]`/`[S]`, alcance, duração |
| **Talento / habilidade** | nível em que abre, texto |

**Categoria de aparato manda em quem opera:** ofensivo só o Técnico; defensivo Técnico e
Veterano; utilitário todos. Usar não pede rolagem, salvo os três casos do capítulo 8.

---

## 6. Ordem de Ação

A peça que nenhum sistema de OD2 consegue expressar.

| Ação | Valor |
|---|---|
| Atacar (à distância, corpo a corpo, área) | **rolagem do dado de dano da arma** |
| Usar aparato ou poder da Força | **NT** do aparato ou **Grandeza** do poder |
| Movimentação dupla e outras ações | `10 − desAtaque` |

- **O menor resultado age primeiro.** Empates são simultâneos.
- **Duração da rodada** = maior resultado **× 2 segundos**.
- Coronhada e objeto sem função ofensiva usam **1d4**. Desarmado usa `forAtaque`,
  mínimo 1.

**Como fazer no CSB.** A iniciativa nativa do Foundry ordena do maior para o menor, e
isso não é configurável por fórmula. Duas saídas:

1. **Fórmula invertida** na iniciativa: usar `100 - (dado de dano)` como valor de
   iniciativa, de modo que a ordem visual do rastreador de combate fique certa. O número
   mostrado não é o da mesa, mas a ordem é.
2. **Macro** que lê o dado de dano da arma equipada de cada combatente, rola e ordena.
   Mais fiel, mais trabalho.

Recomendo começar pela opção 1 e marcar na ficha o valor real da Ordem de Ação num campo
ao lado, para o Mestre ler a duração da rodada.

---

## 7. O que fica de fora do CSB

Assumido de propósito, para não gastar esforço em automação frágil:

- **Duração da rodada em segundos** — conta de cabeça, é uma multiplicação.
- **Tabelas de crítico e falha** (T7-4, T7-5) — vão como RollTable, não como automação.
- **Defeitos de relíquia** (T11-4) — idem.
- **Corrosão ácida com redutor cumulativo** — o Mestre acompanha.

---

## 8. Conteúdo a gerar

Tudo isto já está auditado no cofre e sai de `tools/data/`:

| Compêndio | Volume |
|---|---|
| Bestiário | **46 criaturas** + os Dragões da Galáxia |
| Poderes da Força | **100**, 1ª a 10ª Grandeza, com corrente e Grandeza conferidas |
| Aparatos e feitos | **~65** por NT, custos conferidos contra o livro |
| Equipamento | armas, vestes, aparelhos, serviços — preços reancorados na régua do livro |
| Naves | **8 tipos** da T10-1 + o de-para da galáxia |
| Espécies | Humano, Droide e as 7 do cenário, sobre os três moldes |
| Journals | combate, aparatos, relíquias, Seção do Mestre |
