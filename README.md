> ## ⚠️ Projeto arquivado — use o outro módulo
>
> Em 25/09/2026 este projeto foi encerrado. A adaptação de **Star Wars para
> Space Dragon** passou a ter um caminho único:
>
> - **sistema:** [space-dragon-foundryvtt](https://github.com/Maicon-Lara/space-dragon-foundryvtt)
> - **módulo de conteúdo:** [starwars-spacedragon-foundryvtt](https://github.com/Maicon-Lara/starwars-spacedragon-foundryvtt)
>
> Aquele par cobre muito mais — classes, espécies, poderes, naves, equipamento,
> macros e a Referência do Mestre — e não depende do Custom System Builder.
> Tudo o que existia aqui está lá, e é lá que as mudanças continuam.
>
> Este repositório fica de pé só como histórico. A v0.9.1 continua instalável,
> mas não recebe mais correções.

# Star Wars — Space Dragon (Nativo) · Foundry VTT

Conteúdo e ficha da adaptação de **Star Wars para o Space Dragon nativo**, sobre o
**Custom System Builder**. Obra de fã, não oficial e sem fins lucrativos.

## Por que é um projeto novo

Existe já o `sw-spacedragon`, que é um **módulo de conteúdo para o sistema
`olddragon2e`**. Ele continua válido e mantido — mas serve à versão ***Dragão
Estelar***, que é Old Dragon 2 de verdade, com CA, três JPs, Carisma e escala 1–15.

Este projeto é a outra coisa: o **Space Dragon como ele é no livro**. Níveis 1–20, CP,
uma JP, Intelecto / Ciência / Comunicação, talentos em d%, Alcance da Força em
porcentagem, Nível Tecnológico, e a **Ordem de Ação em que o menor resultado age
primeiro**. Nada disso cabe no `olddragon2e`, nem por módulo: a iniciativa invertida é
configuração de sistema.

| | `sw-spacedragon` | este projeto |
|---|---|---|
| Versão do cenário | Dragão Estelar | Space Dragon Nativo |
| Sistema | `olddragon2e` | `custom-system-builder` |
| Escala | 1–15 | **1–20** |
| Proteção | CA ascendente | **CP** |
| Salvaguardas | três JPs | **uma JP**, número-alvo |
| Iniciativa | d20, maior vence | **Ordem de Ação, menor vence** |

## Fonte da verdade

O cofre, em `Documents/Ekhoria/20 Space Dragon/Space Dragon Nativo/`, auditado contra o
*Space Dragon — Livro Básico Aprimorado* em 11/09/2026. `tools/data/*.mjs` transcreve o
cofre; **nunca editar compêndios gerados à mão** — o build sobrescreve.

## Estrutura

```
docs/
  ESPECIFICACAO-FICHA.md   contrato da ficha: campos, fórmulas, o que fica de fora
  _formulas.md             as 19 cadeias de ternário, prontas para colar no CSB
tools/
  data/tabelas.mjs         T1-1 a T1-6 e T4-1, validadas contra os exemplos do livro
```

## Estado

- [x] Tabelas de atributo e de CP por nível (T1-1 a T1-6, T4-1), validadas
- [x] Especificação da ficha
- [x] `npm run verificar` — portão de qualidade que roda sem Foundry
- [x] Bestiário: **46 criaturas** extraídas e verificadas
- [ ] Poderes da Força (100), aparatos (~65), equipamento, naves (8), espécies (10)
- [ ] Template do CSB (falta um template exportado de referência — ver abaixo)
- [ ] Macro ou fórmula invertida da Ordem de Ação

```
$ npm run verificar
1. Tabelas de atributo contra os exemplos do livro
  ok     10 conferências
2. Bestiário
  46 criaturas · 9 com RM · 3 com RD · 1 de PV fixo
PASSOU — 0 erro(s), 0 aviso(s)
```

### O que falta para gerar o template

O CSB importa templates por **"Import Templates JSON"**, mas o formato interno da 6.x não
está documentado em página que se possa ler de fora. Para não entregar um import quebrado,
o caminho é um destes:

1. Montar a ficha na interface do CSB seguindo `docs/ESPECIFICACAO-FICHA.md` e
   `docs/_formulas.md`, e **exportar** o template. Com esse arquivo de referência em mão,
   o resto passa a ser gerado.
2. Ou exportar qualquer template CSB simples de um mundo de teste — serve igual como
   referência de esquema.

## Licença e créditos

Texto de **Maicon Lara** · CC BY-SA 4.0 · Star Wars © Lucasfilm Ltd. ·
*Space Dragon* © Old Dragon Editora.
