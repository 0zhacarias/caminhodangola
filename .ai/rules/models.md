---
paths:
  - app/Models/PerguntaFrequente.php
---

# Models

## FAQ categoria é FK + accessor 'categoria'
perguntas_frequentes.categoria_id é FK para categorias_perguntas_frequentes (cascadeOnDelete). O modelo expõe o accessor appended 'categoria' (nome da categoria) para o frontend continuar a agrupar por nome; o admin usa categoria_id nas opções/validação. A migração das categorias foi renomeada para 2026_08_20 para correr antes da tabela de perguntas.
