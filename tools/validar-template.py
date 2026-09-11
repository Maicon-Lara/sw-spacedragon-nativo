#!/usr/bin/env python3
"""Valida modulo/template-sdn.json contra a ficha de referencia do Custom System Builder.

A referencia e a ficha de Old Dragon 2 da sheet-library oficial do CSB. Baixa uma vez e
guarda em _ref/ (ignorado pelo git).

    python tools/validar-template.py

Confere tres coisas:
  1. cada tipo de componente tem as mesmas chaves que na referencia
  2. nenhuma chave de propriedade esta duplicada (duplicata quebra a ficha)
  3. as formulas ${...}$ estao balanceadas e so citam props que existem
"""
import collections
import json
import os
import re
import sys
import urllib.request

RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ALVO = os.path.join(RAIZ, "modulo", "template-sdn.json")
REF_DIR = os.path.join(RAIZ, "_ref")
REF = os.path.join(REF_DIR, "csb-old-dragon-2.json")
REF_URL = ("https://gitlab.com/custom-system-builder/custom-system-builder/-/raw/main/"
           "sheet-library/Old%20Dragon%202/Foundry_Old_Dragon_2_PT_Beico.json")

# Campos que guardam um valor digitado ou calculado, e portanto definem uma prop.
CAMPOS = ("numberField", "textField", "textArea", "select", "checkbox", "label")

# Nomes que aparecem em formula sem ser prop da ficha.
INTERNAS = {"roll", "alvo", "aj", "total", "item"}
FUNCOES = {"floor", "ceil", "round", "abs", "min", "max"}

problemas = []


def baixar_referencia():
    if os.path.exists(REF):
        return
    os.makedirs(REF_DIR, exist_ok=True)
    print("  baixando a ficha de referencia do CSB...")
    with urllib.request.urlopen(REF_URL, timeout=60) as r, open(REF, "wb") as f:
        f.write(r.read())


def componentes(no, saco):
    if isinstance(no, list):
        for v in no:
            componentes(v, saco)
    elif isinstance(no, dict):
        t = no.get("type")
        if isinstance(t, str):
            saco[t].append(no)
        for v in no.values():
            componentes(v, saco)


def props_definidas(ator):
    achadas = set()

    def anda(n):
        if isinstance(n, list):
            for v in n:
                anda(v)
        elif isinstance(n, dict):
            if n.get("key") and n.get("type") in CAMPOS:
                achadas.add(n["key"])
            for v in n.values():
                anda(v)

    anda(ator["data"])
    return achadas


def limpar_formula(corpo):
    """Remove literais de texto e expressoes de dado, que nao sao props."""
    corpo = re.sub(r"'[^']*'", " ", corpo)     # 'Sucesso', '<strong>'
    corpo = re.sub(r'"[^"]*"', " ", corpo)
    corpo = re.sub(r"\[[^\]]*\]", " ", corpo)  # [1d20], [cr_dv + 'd8']
    return corpo


def main():
    if not os.path.exists(ALVO):
        sys.exit("faltando modulo/template-sdn.json — rode node tools/gerar-template.mjs")
    baixar_referencia()

    novo = json.load(open(ALVO, encoding="utf8"))
    ref = json.load(open(REF, encoding="utf8"))

    if not novo.get("isCustomSystemExport"):
        problemas.append("o arquivo nao tem isCustomSystemExport: true")

    cref, cnovo = collections.defaultdict(list), collections.defaultdict(list)
    componentes(ref["actors"], cref)
    componentes(novo["actors"], cnovo)

    print("\n1. Forma dos componentes, contra a referencia oficial")
    for tipo in sorted(cnovo):
        if tipo == "_template":
            continue
        if tipo not in cref:
            problemas.append("tipo de componente %r nao existe na referencia" % tipo)
            print("  !! %-14s tipo desconhecido" % tipo)
            continue
        permitidas = set()
        for c in cref[tipo]:
            permitidas |= set(c.keys())
        obrigatorias = set(cref[tipo][0].keys())
        for c in cref[tipo][1:]:
            obrigatorias &= set(c.keys())

        ruim = 0
        for c in cnovo[tipo]:
            quem = c.get("key") or c.get("name") or "(sem chave)"
            extra = sorted(set(c.keys()) - permitidas)
            if extra:
                problemas.append("%s %r tem chave(s) estranha(s): %s" % (tipo, quem, extra))
                ruim += 1
            falta = sorted(obrigatorias - set(c.keys()))
            if falta:
                problemas.append("%s %r sem chave obrigatoria: %s" % (tipo, quem, falta))
                ruim += 1
        print("  %s %-14s %3d componentes" % ("ok" if ruim == 0 else "!!", tipo, len(cnovo[tipo])))

    print("\n2. Chaves de propriedade duplicadas")
    for ator in novo["actors"]:
        contagem = collections.Counter()

        def anda(n):
            if isinstance(n, list):
                for v in n:
                    anda(v)
            elif isinstance(n, dict):
                if n.get("key") and n.get("type") in CAMPOS:
                    contagem[n["key"]] += 1
                for v in n.values():
                    anda(v)

        anda(ator["data"])
        dup = sorted(k for k, v in contagem.items() if v > 1)
        if dup:
            problemas.append("%s: chaves duplicadas %s" % (ator["name"], dup))
        print("  %s %-26s %3d props%s"
              % ("ok" if not dup else "!!", ator["name"], len(contagem),
                 "" if not dup else "  duplicadas: %s" % dup))

    print("\n3. Formulas")
    texto = json.dumps(novo, ensure_ascii=False)
    abre, fecha = texto.count("${"), len(re.findall(r"\}\$", texto))
    if abre != fecha:
        problemas.append("formulas desbalanceadas: %d abrem, %d fecham" % (abre, fecha))
    print("  %s %d formulas, delimitadores balanceados" % ("ok" if abre == fecha else "!!", abre))

    definidas = set()
    for ator in novo["actors"]:
        definidas |= props_definidas(ator)
    # nomes das barras de atributo tambem valem como identificador valido
    for ator in novo["actors"]:
        definidas |= set(ator["data"].get("attributeBar", {}).keys())

    usadas = set()
    for m in re.finditer(r"\$\{(.*?)\}\$", texto):
        for id_ in re.findall(r"[A-Za-z_][A-Za-z0-9_]*", limpar_formula(m.group(1))):
            usadas.add(id_)
    orfas = sorted(usadas - definidas - INTERNAS - FUNCOES)
    if orfas:
        problemas.append("props citadas em formula e nao definidas: %s" % orfas)
    print("  %s %d props citadas em formula, todas definidas"
          % ("ok" if not orfas else "!!", len(usadas & definidas)))
    if orfas:
        print("     orfas: %s" % orfas)

    print()
    if problemas:
        print("FALHOU — %d problema(s):" % len(problemas))
        for p in problemas:
            print("   · %s" % p)
        sys.exit(1)
    print("PASSOU — template valido para importar no CSB\n")


if __name__ == "__main__":
    main()
