---
paths:
  - config/cache.php
---

# Config

## Novos models devem entrar na whitelist serializable_classes
Ao criar um novo model Eloquent que é guardado em cache (directa ou como relação de outro model em cache), tem de ser adicionado a config/cache.php 'serializable_classes', senão ao desserializar a relação vira __PHP_Incomplete_Class e é silenciosamente descartada do JSON (relação "desaparece" no Inertia). Adicionar também o preload em AppServiceProvider::preloadCachedModels().
