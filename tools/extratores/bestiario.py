# -*- coding: utf-8 -*-
"""Gera tools/data/bestiario.mjs a partir do roster auditado do cofre."""
import io, re, json, os

COFRE = (r"C:\Users\MaiconDouglasFrancad\Documents\Ekhoria\20 Space Dragon"
         r"\Space Dragon Nativo\SW-SDN-Bestiario.md")
SAIDA = (r"C:\Users\MaiconDouglasFrancad\Documents\sw-foundry\sw-spacedragon-nativo"
         r"\tools\data\bestiario.mjs")

TAM = {u'Peq': 'pequeno', u'M\u00e9d': 'medio', u'Gd': 'grande',
       u'Imenso': 'imenso', u'Colossal': 'colossal'}
AFIL = {'A': 'leal', 'N': 'neutro', 'R': 'rebelde'}

s = io.open(COFRE, encoding='utf8').read()
roster = s[s.index('## Roster nativo'):s.index('## Os Drag')]

criaturas = []
for ln in roster.split('\n'):
    if not ln.startswith('|') or '---' in ln:
        continue
    c = [x.strip() for x in ln.strip('|').split('|')]
    if len(c) < 9 or not (c[3].isdigit() and c[4].isdigit()):
        continue

    bruto = c[0]
    nome = re.sub(r'\*+', '', bruto)
    apelido = None
    m = re.search(r'\((.+?)\)', nome)
    if m:
        apelido = m.group(1).strip()
        nome = re.sub(r'\s*\(.*?\)\s*', ' ', nome).strip()
    nome = re.sub(r'\s+', ' ', nome).strip()

    # Tam./Afil.  ->  "Gd / R"
    tam, afil = None, None
    mt = re.match(r'([^/]+)/\s*([ANR])\s*$', c[1].strip())
    if mt:
        tam = TAM.get(mt.group(1).strip(), mt.group(1).strip().lower())
        afil = AFIL[mt.group(2)]

    # movimento: "9", "6, voo 4", "10, escala 6", "6 (escava)"
    mov = {}
    mm = re.match(r'(\d+)', c[2])
    if mm:
        mov['base'] = int(mm.group(1))
    elif u'imóvel' in c[2].lower():
        # o livro escreve "MOVIMENTO -" para quem nao se locomove
        mov['base'] = 0
        mov['imovel'] = True
    else:
        raise SystemExit("movimento nao reconhecido em %r: %r" % (c[0], c[2]))
    for chave, rot in ((u'nada', 'nadando'), (u'voo', 'voando'),
                       (u'escala', 'escalando'), (u'escava', 'escavando')):
        me = re.search(chave + r'\s*(\d+)', c[2])
        if me:
            mov[rot] = int(me.group(1))
        elif chave in c[2]:
            mov[rot] = mov.get('base')

    mdv = re.match(r'([0-9]+)(?:\+([0-9]+))?\s*\((\d[\d.]*)\)', c[5])
    mfixo = re.match(r'^(\d+)\s*PV$', c[5])
    pvFixo = False
    if mdv:
        dv = int(mdv.group(1))
        dvb = int(mdv.group(2)) if mdv.group(2) else 0
        pv = int(mdv.group(3).replace('.', ''))
    elif mfixo:
        # o livro escreve "DV 1 PV": pontos de vida fixos, sem rolar dado
        dv, dvb, pv, pvFixo = None, 0, int(mfixo.group(1)), True
    else:
        raise SystemExit("DV nao reconhecido em %r: %r" % (c[0], c[5]))

    ataques = c[7]
    rm = re.search(r'RM\s*(\d{1,3})\s*%', ataques)
    rd = re.search(r'RD\s*(\d+)\s*/\s*([^;*]+)', ataques)

    criaturas.append({
        'nome': nome,
        'apelido': apelido,
        'tamanho': tam,
        'afiliacao': afil,
        'movimento': mov,
        'cp': int(c[3]),
        'jp': int(c[4]),
        'dv': dv,
        'dvBonus': dvb,
        'pv': pv,
        'pvFixo': pvFixo,
        'moral': int(re.sub(r'\D', '', c[6]) or 0),
        'ataques': ataques,
        'rm': int(rm.group(1)) if rm else None,
        'rd': (int(rd.group(1)), rd.group(2).strip().rstrip('*')) if rd else None,
        'xp': int(re.sub(r'\D', '', c[8]) or 0),
    })

print("criaturas extraidas: %d" % len(criaturas))

corpo = []
for cr in criaturas:
    linhas = ['  {']
    for k in ('nome', 'apelido', 'tamanho', 'afiliacao'):
        v = cr[k]
        linhas.append('    %s: %s,' % (k, json.dumps(v, ensure_ascii=False)))
    linhas.append('    movimento: %s,' % json.dumps(cr['movimento'], ensure_ascii=False))
    for k in ('cp', 'jp', 'dv', 'dvBonus', 'pv', 'moral', 'xp'):
        linhas.append('    %s: %s,' % (k, json.dumps(cr[k])))
    if cr['pvFixo']:
        linhas.append('    pvFixo: true,  // o livro escreve "DV 1 PV": nao se rola dado')
    if cr['rm'] is not None:
        linhas.append('    rm: %d,' % cr['rm'])
    if cr['rd'] is not None:
        linhas.append('    rd: { valor: %d, excecao: %s },'
                      % (cr['rd'][0], json.dumps(cr['rd'][1], ensure_ascii=False)))
    linhas.append('    ataques: %s,' % json.dumps(cr['ataques'], ensure_ascii=False))
    linhas.append('  },')
    corpo.append('\n'.join(linhas))

CAB = u"""// Bestiário do Space Dragon Nativo, vestido de Star Wars.
//
// GERADO de 20 Space Dragon/Space Dragon Nativo/SW-SDN-Bestiario.md — não editar à mão.
// O roster foi conferido criatura por criatura contra o capítulo 11 do Livro Básico
// Aprimorado na auditoria de 11/09/2026; 44 das 46 batiam, e as 5 divergências reais
// (Aranha gigante, Autômato, Cristaloide, Multiforma, Metahumano) foram corrigidas.
//
// Convenções do livro que valem para todas:
//   · DV é SEMPRE d8. `pv` é o MÁXIMO (o livro imprime médio/máximo).
//   · `jp` é um valor único e já engloba JPR, JPF e JPM — não se aplica modificador.
//   · `cp` já inclui o bônus de proteção natural.
//   · `moral` é percentil: quando 50%+ da espécie cai, os demais rolam d% <= moral.
//   · Robôs não fogem por Moral; só saem de combate por Desativação.
//   · `movimento.base` em metros.

export const BESTIARIO = [
"""

io.open(SAIDA, 'w', encoding='utf8').write(CAB + '\n'.join(corpo) + '\n];\n')
print("gerado %s" % os.path.basename(SAIDA))
