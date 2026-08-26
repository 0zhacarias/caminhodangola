---
paths:
  - 'resources/js/components/admin/dialogs/**'
---

# Dialogs

## Edição com ficheiros usa put() direto, sem _method spoofing
Nos diálogos do admin, submeter edição com upload de ficheiro usa put(url, options) diretamente (Inertia converte automaticamente para FormData quando existe um File em data). NÃO usar transform()+post() com _method:'put' e forceFormData dentro do handler de submit — padrão quebrou a atualização da foto em membros-equipa (commit 4cc1b9c). O backend (MembrosEquipaController::validated) aceita tanto JSON (URL string) como multipart (UploadedFile).
