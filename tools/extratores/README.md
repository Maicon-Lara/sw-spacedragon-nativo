# Extratores

Cada script lê **um arquivo do cofre** e escreve **um módulo em `tools/data/`**.
Rode a partir da raiz do projeto:

```
python tools/extratores/bestiario.py
```

Regra dos extratores: **falhar alto**. Se o cofre trouxer uma forma que o script não
reconhece (um dado de vida escrito diferente, um movimento novo), o script para com a
mensagem em vez de emitir `null` silencioso. O cofre é escrito à mão, então é ele quem
manda — e é o script que tem de acompanhar.

| Script | Lê do cofre | Escreve |
|---|---|---|
| `bestiario.py` | `SW-SDN-Bestiario.md` (seção *Roster nativo*) | `data/bestiario.mjs` |
