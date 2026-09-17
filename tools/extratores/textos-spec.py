#!/usr/bin/env python3
"""Extrai o TEXTO ORIGINAL de cada especializacao do cofre.

O guia usa o texto como esta escrito em SW-SDN-Classes.md e SW-SDN-Forca.md — sem
reescrita. O que o guia acrescenta e a TABELA derivada (tools/data/tabelas-spec.mjs).
"""
import io
import json
import os
import re

COFRE = (r"C:\Users\MaiconDouglasFrancad\Documents\Ekhoria\20 Space Dragon"
         r"\Space Dragon Nativo")
SAIDA = (r"C:\Users\MaiconDouglasFrancad\Documents\sw-foundry\sw-spacedragon-nativo"
         r"\tools\data\textos-spec.mjs")

ARQUIVOS = [
    ('SW-SDN-Classes.md', {'Veterano': ['Mercenário', 'Caçador de Recompensas', 'Emissário'],
                           'Operativo': ['Espião', 'Sabotador', 'Assassino', 'Contrabandista'],
                           'Técnico': ['Médico de Campo', 'Engenheiro', 'Slicer']}),
    ('SW-SDN-Forca.md', {'Sensível à Força': ['Guardião', 'Consular', 'Sentinela', 'Vidente', 'Artífice']}),
]

saida = []
for arquivo, classes in ARQUIVOS:
    s = io.open(os.path.join(COFRE, arquivo), encoding='utf8').read()
    # cada especializacao e um bloco "### Nome — *sabor*" ate o proximo ### ou ##
    blocos = re.split(r'(?m)^###\s+', s)
    achados = {}
    for b in blocos[1:]:
        cabeca = b.split('\n')[0]
        nome = re.split(r'\s+[—-]\s+', cabeca)[0].strip()
        corpo = b[len(cabeca):]
        # corta no proximo cabecalho de nivel 1 ou 2
        corte = re.search(r'(?m)^#{1,2}\s', corpo)
        if corte:
            corpo = corpo[:corte.start()]
        achados[nome] = (cabeca, corpo.strip())

    for classe, nomes in classes.items():
        for nome in nomes:
            if nome not in achados:
                raise SystemExit('nao achei a especializacao %r em %s' % (nome, arquivo))
            cabeca, corpo = achados[nome]
            # sabor: o *italico* do cabecalho
            m = re.search(r'\*(.+?)\*', cabeca)
            sabor = m.group(1).strip() if m else ''
            # a linha de citacao final ("> *Cassian Andor...*") e exemplo, nao regra
            exemplo = ''
            me = re.search(r'(?m)^>\s*\*(.+?)\*\s*$', corpo)
            if me:
                exemplo = me.group(1).strip()
                corpo = corpo[:me.start()].strip()
            saida.append({
                'classe': classe,
                'nome': nome,
                'sabor': sabor,
                'exemplo': exemplo,
                'texto': corpo,
            })
            print('  ok %-14s %-24s %4d caracteres' % (classe[:14], nome, len(corpo)))

CAB = u"""// Texto ORIGINAL de cada especializacao, como esta escrito no cofre.
//
// GERADO de Space Dragon Nativo/ pelo tools/extratores/textos-spec.py — nao editar.
// O guia mostra este texto tal e qual; o que ele acrescenta e a tabela derivada.

export const TEXTOS_SPEC = """

io.open(SAIDA, 'w', encoding='utf8').write(
    CAB + json.dumps(saida, ensure_ascii=False, indent=2) + ';\n')
print('gerado %s  (%d especializacoes)' % (os.path.basename(SAIDA), len(saida)))
