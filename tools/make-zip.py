#!/usr/bin/env python3
"""Gera sw-spacedragon-nativo.zip a partir de modulo/.

Usa zipfile (zip padrao, separadores '/', sem data descriptors) — compativel com o
extrator do Foundry. NAO usar `tar` do Windows: ele ignora a extensao .zip e gera um
tar disfarcado, que o Foundry rejeita com FILE_ENDED.

Uso: python tools/make-zip.py   (a partir da raiz do repositorio)
"""
import json
import os
import sys
import zipfile

RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(RAIZ, "modulo")
OUT = os.path.join(RAIZ, "sw-spacedragon-nativo.zip")

# O Foundry espera esses itens na RAIZ do zip.
ITENS = ["module.json", "packs", "lang", "LICENSE", "template-sdn.json"]

# Lixo de runtime do LevelDB: nao deve viajar no pacote. O LOCK atrapalha, e os
# LOG so contam o que aconteceu na maquina que compilou.
IGNORAR = {"LOCK", "LOG", "LOG.old"}


def main():
    manifesto = os.path.join(SRC, "module.json")
    if not os.path.exists(manifesto):
        sys.exit("faltando modulo/module.json")
    with open(manifesto, encoding="utf8") as f:
        m = json.load(f)

    if os.path.exists(OUT):
        os.remove(OUT)

    with zipfile.ZipFile(OUT, "w", zipfile.ZIP_DEFLATED) as z:
        for item in ITENS:
            caminho = os.path.join(SRC, item)
            if not os.path.exists(caminho):
                continue
            if os.path.isfile(caminho):
                z.write(caminho, item)
            else:
                for dirpath, _, arquivos in os.walk(caminho):
                    for a in arquivos:
                        if a in IGNORAR:
                            continue
                        cheio = os.path.join(dirpath, a)
                        arc = os.path.relpath(cheio, SRC).replace(os.sep, "/")
                        z.write(cheio, arc)

    # Sanidade: o zip tem de abrir, usar '/' e conter o manifesto na raiz.
    with zipfile.ZipFile(OUT) as z:
        nomes = z.namelist()
        assert z.testzip() is None, "zip corrompido"
        assert not any("\\" in n for n in nomes), "separador de caminho invalido"
        assert "module.json" in nomes, "module.json nao esta na raiz do zip"

    # Avisa se um pack declarado no manifesto nao foi empacotado.
    faltando = [p["name"] for p in m.get("packs", [])
                if not any(n.startswith(p["path"].rstrip("/") + "/") for n in nomes)]

    print("  OK %s  v%s  %d entradas" % (os.path.basename(OUT), m["version"], len(nomes)))
    if faltando:
        print("  aviso: %d pack(s) declarados e ainda vazios: %s"
              % (len(faltando), ", ".join(faltando)))


if __name__ == "__main__":
    main()
