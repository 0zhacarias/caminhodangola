# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: admin-crud.spec.ts >> Listagem: Estatísticas >> visualizar detalhes, editar, imprimir e eliminar
- Location: tests\e2e\admin-crud.spec.ts:7:9

# Error details

```
Test timeout of 90000ms exceeded.
```

```
Error: page.waitForSelector: Test timeout of 90000ms exceeded.
Call log:
  - waiting for locator('h1') to be visible

```

# Page snapshot

```yaml
- generic [ref=f1e2]:
  - generic [ref=f1e3]:
    - generic [ref=f1e7]:
      - list [ref=f1e9]:
        - listitem [ref=f1e10]:
          - link "Caminho d'Angola" [ref=f1e11] [cursor=pointer]:
            - /url: /dashboard
      - generic [ref=f1e17]:
        - generic [ref=f1e18]:
          - generic [ref=f1e19]: Platform
          - list [ref=f1e20]:
            - listitem [ref=f1e21]:
              - link "Dashboard" [ref=f1e22] [cursor=pointer]:
                - /url: /dashboard
        - generic [ref=f1e29]:
          - generic [ref=f1e30]: Administração
          - list [ref=f1e31]:
            - listitem [ref=f1e32]:
              - link "Painel" [ref=f1e33] [cursor=pointer]:
                - /url: /admin/dashboard
        - generic [ref=f1e40]:
          - generic [ref=f1e41]: Pacotes
          - list [ref=f1e42]:
            - listitem [ref=f1e43]:
              - link "Categorias" [ref=f1e44] [cursor=pointer]:
                - /url: /admin/categorias-pacotes
            - listitem [ref=f1e50]:
              - link "Pacotes" [ref=f1e51] [cursor=pointer]:
                - /url: /admin/pacotes
            - listitem [ref=f1e57]:
              - link "Dias de Itinerário" [ref=f1e58] [cursor=pointer]:
                - /url: /admin/dias-itinerario
            - listitem [ref=f1e62]:
              - link "Galerias de Pacotes" [ref=f1e63] [cursor=pointer]:
                - /url: /admin/galerias-pacotes
        - generic [ref=f1e70]:
          - generic [ref=f1e71]: Conteúdo
          - list [ref=f1e72]:
            - listitem [ref=f1e73]:
              - link "Slides Hero" [ref=f1e74] [cursor=pointer]:
                - /url: /admin/slides-hero
            - listitem [ref=f1e79]:
              - link "Secções" [ref=f1e80] [cursor=pointer]:
                - /url: /admin/seccoes
            - listitem [ref=f1e86]:
              - link "Estatísticas" [ref=f1e87] [cursor=pointer]:
                - /url: /admin/estatisticas
            - listitem [ref=f1e91]:
              - link "Galerias" [ref=f1e92] [cursor=pointer]:
                - /url: /admin/galerias
            - listitem [ref=f1e98]:
              - link "Depoimentos" [ref=f1e99] [cursor=pointer]:
                - /url: /admin/depoimentos
            - listitem [ref=f1e105]:
              - link "Perguntas Frequentes" [ref=f1e106] [cursor=pointer]:
                - /url: /admin/perguntas-frequentes
            - listitem [ref=f1e111]:
              - link "Membros da Equipa" [ref=f1e112] [cursor=pointer]:
                - /url: /admin/membros-equipa
        - generic [ref=f1e119]:
          - generic [ref=f1e120]: Sistema
          - list [ref=f1e121]:
            - listitem [ref=f1e122]:
              - link "Itens de Menu" [ref=f1e123] [cursor=pointer]:
                - /url: /admin/itens-menu
            - listitem [ref=f1e126]:
              - link "Configurações" [ref=f1e127] [cursor=pointer]:
                - /url: /admin/configuracoes
        - generic [ref=f1e132]:
          - generic [ref=f1e133]: Reservas
          - list [ref=f1e134]:
            - listitem [ref=f1e135]:
              - link "Reservas" [ref=f1e136] [cursor=pointer]:
                - /url: /admin/reservas
      - generic [ref=f1e141]:
        - list [ref=f1e144]:
          - listitem [ref=f1e145]:
            - link "Repository" [ref=f1e146] [cursor=pointer]:
              - /url: https://github.com/laravel/react-starter-kit
          - listitem [ref=f1e153]:
            - link "Documentation" [ref=f1e154] [cursor=pointer]:
              - /url: https://laravel.com/docs/starter-kits#react
        - list [ref=f1e158]:
          - listitem [ref=f1e159]:
            - button "AE Admin E2E" [ref=f1e160]:
              - generic [ref=f1e161]: AE
              - generic [ref=f1e163]: Admin E2E
    - main [ref=f1e168]:
      - generic [ref=f1e170]:
        - button "Toggle sidebar" [ref=f1e171]
        - navigation "breadcrumb" [ref=f1e173]:
          - list [ref=f1e174]:
            - listitem [ref=f1e175]:
              - link "Estatísticas" [disabled] [ref=f1e176]
      - generic [ref=f1e179]:
        - generic [ref=f1e180]:
          - generic [ref=f1e181]:
            - heading "Estatísticas" [level=2] [ref=f1e182]
            - paragraph [ref=f1e183]: Gerir as estatísticas exibidas no site.
          - generic [ref=f1e184]:
            - button "Imprimir" [ref=f1e185]
            - button "Nova estatística" [ref=f1e186]
        - generic [ref=f1e187]:
          - textbox "Pesquisar..." [ref=f1e192]
          - table [ref=f1e194]:
            - rowgroup [ref=f1e195]:
              - row [ref=f1e196]:
                - columnheader "Rótulo" [ref=f1e197]
                - columnheader "Valor" [ref=f1e198]
                - columnheader "Ícone" [ref=f1e199]
                - columnheader "Ativa" [ref=f1e200]
                - columnheader "Ações" [ref=f1e201]
            - rowgroup [ref=f1e202]:
              - row [ref=f1e203]:
                - cell "E2E Destinos Editados" [ref=f1e204]
                - cell "50+" [ref=f1e205]
                - cell "—" [ref=f1e206]
                - cell "Sim" [ref=f1e207]
                - cell [ref=f1e208]:
                  - generic [ref=f1e209]:
                    - button "Visualizar" [ref=f1e210]
                    - button "Editar" [ref=f1e211]
                    - button "Eliminar" [ref=f1e212]
          - paragraph [ref=f1e213]: 1 de 1 registos
  - region "Notifications alt+T"
```

# Test source

```ts
  5   | for (const caso of casos) {
  6   |     test.describe.serial(`Listagem: ${caso.titulo}`, () => {
  7   |         test('visualizar detalhes, editar, imprimir e eliminar', async ({
  8   |             page,
  9   |         }) => {
  10  |             await page.goto(caso.caminho);
  11  | 
  12  |             await expect(
  13  |                 page.getByText(caso.titulo, { exact: false }).first(),
  14  |             ).toBeVisible();
  15  | 
  16  |             const linha = page
  17  |                 .locator('tbody tr')
  18  |                 .filter({ hasText: caso.item })
  19  |                 .first();
  20  | 
  21  |             await expect(linha).toBeVisible();
  22  | 
  23  |             // 1. Visualizar detalhes
  24  |             await linha.getByRole('button', { name: 'Visualizar' }).click();
  25  | 
  26  |             const dialogoDetalhes = page
  27  |                 .getByRole('dialog')
  28  |                 .filter({ hasText: 'Detalhes' });
  29  | 
  30  |             await expect(dialogoDetalhes).toBeVisible();
  31  |             await expect(
  32  |                 dialogoDetalhes
  33  |                     .getByText(caso.detalheTitulo, { exact: false })
  34  |                     .first(),
  35  |             ).toBeVisible();
  36  | 
  37  |             await dialogoDetalhes
  38  |                 .getByRole('button', { name: 'Fechar' })
  39  |                 .click();
  40  | 
  41  |             await expect(dialogoDetalhes).toBeHidden();
  42  | 
  43  |             // 2. Editar
  44  |             await linha.getByRole('button', { name: 'Editar' }).click();
  45  | 
  46  |             if (caso.reservaEstado === true) {
  47  |                 const dialogoEdicao = page
  48  |                     .getByRole('dialog')
  49  |                     .filter({ hasText: 'Reserva' });
  50  | 
  51  |                 await dialogoEdicao.locator('#estado').click();
  52  |                 await page
  53  |                     .getByRole('option', { name: 'Confirmada' })
  54  |                     .click();
  55  | 
  56  |                 await dialogoEdicao
  57  |                     .getByRole('button', { name: 'Guardar' })
  58  |                     .click();
  59  |             } else if (caso.caminho === '/admin/pacotes') {
  60  |                 await page.waitForURL(/\/edit$/);
  61  |                 await page
  62  |                     .locator(`#${caso.campoId}`)
  63  |                     .fill(caso.novoValor ?? '');
  64  |                 await page.getByRole('button', { name: 'Guardar' }).click();
  65  |                 await page.waitForURL(/\/admin\/pacotes$/);
  66  |             } else {
  67  |                 const dialogoEdicao = page.getByRole('dialog').last();
  68  | 
  69  |                 await expect(dialogoEdicao).toBeVisible();
  70  |                 await dialogoEdicao
  71  |                     .locator(`#${caso.campoId}`)
  72  |                     .fill(caso.novoValor ?? '');
  73  | 
  74  |                 await dialogoEdicao
  75  |                     .getByRole('button', { name: 'Guardar' })
  76  |                     .click();
  77  |             }
  78  | 
  79  |             await esperarToast(page, /atualizad[oa] com sucesso/);
  80  | 
  81  |             const linhaEditada = page
  82  |                 .locator('tbody tr')
  83  |                 .filter({ hasText: caso.item })
  84  |                 .first();
  85  | 
  86  |             await expect(linhaEditada).toBeVisible();
  87  | 
  88  |             if (caso.assertEdicao === 'src') {
  89  |                 await expect(
  90  |                     linhaEditada.locator('img').first(),
  91  |                 ).toHaveAttribute('src', caso.novoValor ?? '');
  92  |             } else if (caso.novoValor !== undefined) {
  93  |                 await expect(
  94  |                     linhaEditada.getByText(caso.novoValor, { exact: false }),
  95  |                 ).toBeVisible();
  96  |             }
  97  | 
  98  |             // 3. Imprimir
  99  |             const popupPromise = page.waitForEvent('popup');
  100 | 
  101 |             await page.getByRole('button', { name: 'Imprimir' }).click();
  102 | 
  103 |             const popup = await popupPromise;
  104 | 
> 105 |             await popup.waitForSelector('h1');
      |                         ^ Error: page.waitForSelector: Test timeout of 90000ms exceeded.
  106 |             await popup.waitForSelector('tbody tr');
  107 | 
  108 |             const conteudo = await popup.locator('body').innerText();
  109 | 
  110 |             expect(conteudo).toContain(caso.titulo);
  111 |             expect(conteudo).toContain(caso.imprimirContem);
  112 | 
  113 |             await popup.close();
  114 | 
  115 |             // 4. Eliminar
  116 |             await linhaEditada
  117 |                 .getByRole('button', { name: 'Eliminar' })
  118 |                 .click();
  119 | 
  120 |             const dialogoEliminar = page
  121 |                 .getByRole('dialog')
  122 |                 .filter({ hasText: 'Eliminar registo' });
  123 | 
  124 |             await expect(dialogoEliminar).toBeVisible();
  125 | 
  126 |             await dialogoEliminar
  127 |                 .getByRole('button', { name: 'Eliminar' })
  128 |                 .click();
  129 | 
  130 |             await esperarToast(page, /eliminad[oa] com sucesso/);
  131 | 
  132 |             await expect(
  133 |                 page
  134 |                     .locator('tbody tr')
  135 |                     .filter({ hasText: caso.item })
  136 |                     .first(),
  137 |             ).toHaveCount(0);
  138 |         });
  139 |     });
  140 | }
  141 | 
```