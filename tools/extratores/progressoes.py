#!/usr/bin/env python3
"""Extrai as tabelas de progressao das 4 classes base para tools/data/progressoes.mjs.

Le do cofre (auditado contra o Livro Basico Aprimorado) e emite um modulo com a
tabela de cada classe nivel a nivel. E a partir dela que se derivam as tabelas das
especializacoes: congelar uma coluna e repetir o valor onde ela travou.
"""
import io
import json
import os
import re

COFRE = (r"C:\Users\MaiconDouglasFrancad\Documents\Ekhoria\20 Space Dragon"
         r"\Space Dragon Nativo")
SAIDA = (r"C:\Users\MaiconDouglasFrancad\Documents\sw-foundry\sw-spacedragon-nativo"
         r"\tools\data\progressoes.mjs")

# (classe, arquivo, marcador do cabecalho, chaves das colunas depois de Nivel)
TABELAS = [
    ('Veterano', 'SW-SDN-Classes.md',
     '| Nível | XP | DV | BA | JP | Pilotar |',
     ['xp', 'dv', 'ba', 'jp', 'pilotar', 'desarmar', 'critico']),
    ('Operativo', 'SW-SDN-Classes.md',
     '| Nível | XP | DV | BA | JP |',
     ['xp', 'dv', 'ba', 'jp']),
    ('OperativoTalentos', 'SW-SDN-Classes.md',
     '| Nível | Sabotagem',
     ['sabotagem', 'rodadas', 'escalar', 'furtividade', 'furtar', 'percepcao', 'furtivo']),
    ('Técnico', 'SW-SDN-Classes.md',
     '| Nível | XP | DV | BA | JP | Operar Máquinas |',
     ['xp', 'dv', 'ba', 'jp', 'operar', 'nt']),
    ('Sensível à Força', 'SW-SDN-Forca.md',
     '| Nível | XP | DV | BA | JP | Alcance da Força |',
     ['xp', 'dv', 'ba', 'jp', 'alcance', 'grandeza']),
]


def limpa(c):
    c = re.sub(r'\*+', '', c).strip()
    return c


def extrai(arquivo, marcador, colunas):
    s = io.open(os.path.join(COFRE, arquivo), encoding='utf8').read()
    i = s.index(marcador)
    linhas = []
    for ln in s[i:].split('\n')[2:]:
        m = re.match(r'\|\s*(\d{1,2})\u00ba?\s*\|(.+)', ln)
        if not m:
            break
        cels = [limpa(c) for c in m.group(2).rstrip('|').split('|')]
        if len(cels) < len(colunas):
            raise SystemExit('%s: linha com %d celulas, esperava %d :: %s'
                             % (marcador[:30], len(cels), len(colunas), ln[:70]))
        linha = {'nivel': int(m.group(1))}
        for k, v in zip(colunas, cels):
            linha[k] = v
        linhas.append(linha)
    if len(linhas) != 20:
        raise SystemExit('%s: li %d niveis, esperava 20' % (marcador[:30], len(linhas)))
    return linhas


saida = {}
for nome, arquivo, marcador, colunas in TABELAS:
    saida[nome] = extrai(arquivo, marcador, colunas)
    print('  ok %-20s %d niveis, colunas: %s'
          % (nome, len(saida[nome]), ', '.join(colunas)))

corpo = ',\n'.join(
    '  %s: %s' % (json.dumps(k, ensure_ascii=False), json.dumps(v, ensure_ascii=False))
    for k, v in saida.items())

CAB = u"""// Tabelas de progressao das 4 classes base, nivel a nivel.
//
// GERADO de Space Dragon Nativo/ pelo tools/extratores/progressoes.py — nao editar.
//
// E a base das tabelas das especializacoes: congelar uma coluna e repetir o valor
// do nivel em que ela travou; acrescentar as colunas novas que a especializacao traz.

export const PROGRESSOES = {
"""

io.open(SAIDA, 'w', encoding='utf8').write(CAB + corpo + '\n};\n')
print('gerado %s' % os.path.basename(SAIDA))
