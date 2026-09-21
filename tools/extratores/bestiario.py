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
roster = s[s.index('## Roster nativo'):s.index('## Atributos das criaturas')]

# a tabela de atributos, que o livro publica por criatura (SD, Cap. 11)
atributos = {}
tab = s[s.index('## Atributos das criaturas'):s.index('## Os Drag')]
for ln in tab.split('\n'):
    if not ln.startswith('|') or '---' in ln or 'Criatura' in ln:
        continue
    c = [x.strip() for x in ln.strip('|').split('|')]
    if len(c) != 7 or not c[1].lstrip('-').isdigit():
        continue
    chave = re.sub(r'\*+', '', c[0])
    chave = re.sub(r'\s*\(.*?\)\s*', ' ', chave).strip()
    atributos[chave] = dict(zip(('FOR', 'DES', 'CON', 'INT', 'CIE', 'COM'), map(int, c[1:])))

criaturas = []
# As colunas sao lidas PELO NOME do cabecalho, nao pela posicao: assim acrescentar
# uma coluna nova ao roster (como a de Reliquias) nao desloca as outras.
COL = {}
for ln in roster.split('\n'):
    if ln.startswith('| Criatura |'):
        for k, titulo in enumerate(x.strip() for x in ln.strip('|').split('|')):
            COL[titulo] = k
        break
if not COL:
    raise SystemExit('nao achei o cabecalho do roster')


def col(celulas, titulo, padrao=''):
    i = COL.get(titulo)
    return celulas[i].strip() if i is not None and i < len(celulas) else padrao


for ln in roster.split('\n'):
    if not ln.startswith('|') or '---' in ln or ln.startswith('| Criatura |'):
        continue
    c = [x.strip() for x in ln.strip('|').split('|')]
    if len(c) < 9 or not (col(c, 'CP').isdigit() and col(c, 'JP').isdigit()):
        continue

    bruto = col(c, 'Criatura')
    nome = re.sub(r'\*+', '', bruto)
    apelido = None
    m = re.search(r'\((.+?)\)', nome)
    if m:
        apelido = m.group(1).strip()
        nome = re.sub(r'\s*\(.*?\)\s*', ' ', nome).strip()
    nome = re.sub(r'\s+', ' ', nome).strip()

    # Tam./Afil.  ->  "Gd / R"
    tam, afil = None, None
    mt = re.match(r'([^/]+)/\s*([ANR])\s*$', col(c, 'Tam./Afil.'))
    if mt:
        tam = TAM.get(mt.group(1).strip(), mt.group(1).strip().lower())
        afil = AFIL[mt.group(2)]

    # movimento: "9", "6, voo 4", "10, escala 6", "6 (escava)"
    mov = {}
    mov_txt = col(c, 'Mov.')
    mm = re.match(r'(\d+)', mov_txt)
    if mm:
        mov['base'] = int(mm.group(1))
    elif u'imóvel' in mov_txt.lower():
        # o livro escreve "MOVIMENTO -" para quem nao se locomove
        mov['base'] = 0
        mov['imovel'] = True
    else:
        raise SystemExit("movimento nao reconhecido em %r: %r" % (bruto, mov_txt))
    for chave, rot in ((u'nada', 'nadando'), (u'voo', 'voando'),
                       (u'escala', 'escalando'), (u'escava', 'escavando')):
        me = re.search(chave + r'\s*(\d+)', mov_txt)
        if me:
            mov[rot] = int(me.group(1))
        elif chave in mov_txt:
            mov[rot] = mov.get('base')

    dv_txt = col(c, 'DV (PV)')
    mdv = re.match(r'([0-9]+)(?:\+([0-9]+))?\s*\((\d[\d.]*)\)', dv_txt)
    mfixo = re.match(r'^(\d+)\s*PV$', dv_txt)
    pvFixo = False
    if mdv:
        dv = int(mdv.group(1))
        dvb = int(mdv.group(2)) if mdv.group(2) else 0
        pv = int(mdv.group(3).replace('.', ''))
    elif mfixo:
        # o livro escreve "DV 1 PV": pontos de vida fixos, sem rolar dado
        dv, dvb, pv, pvFixo = None, 0, int(mfixo.group(1)), True
    else:
        raise SystemExit("DV nao reconhecido em %r: %r" % (bruto, dv_txt))

    ataques = col(c, 'Ataques')
    rm = re.search(r'RM\s*(\d{1,3})\s*%', ataques)
    rd = re.search(r'RD\s*(\d+)\s*/\s*([^;*]+)', ataques)

    criaturas.append({
        'nome': nome,
        'apelido': apelido,
        'tamanho': tam,
        'afiliacao': afil,
        'movimento': mov,
        'cp': int(col(c, 'CP')),
        'jp': int(col(c, 'JP')),
        'dv': dv,
        'dvBonus': dvb,
        'pv': pv,
        'pvFixo': pvFixo,
        'moral': int(re.sub(r'\D', '', col(c, 'Moral')) or 0),
        'ataques': ataques,
        'rm': int(rm.group(1)) if rm else None,
        'rd': (int(rd.group(1)), rd.group(2).strip().rstrip('*')) if rd else None,
        'xp': int(re.sub(r'\D', '', col(c, 'XP')) or 0),
        # O ofensiva, D defensiva, U utilitaria (SD, Cap. 11)
        'reliquias': [x for x in col(c, 'Relíquias').replace(' ', '').split(',') if x in ('O', 'D', 'U')],
        'atributos': atributos.get(nome),
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
    if cr.get('reliquias'):
        linhas.append('    reliquias: %s,' % json.dumps(cr['reliquias']))
    if cr.get('atributos'):
        a = cr['atributos']
        linhas.append('    atributos: { %s },'
                      % ', '.join('%s: %d' % (k, a[k]) for k in ('FOR', 'DES', 'CON', 'INT', 'CIE', 'COM')))
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
