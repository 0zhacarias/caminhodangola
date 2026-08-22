# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: admin-crud.spec.ts >> Listagem: Depoimentos >> visualizar detalhes, editar, imprimir e eliminar
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
- generic [ref=e2]:
  - generic [ref=e3]:
    - generic [ref=e7]:
      - list [ref=e9]:
        - listitem [ref=e10]:
          - link "Caminho d'Angola" [ref=e11] [cursor=pointer]:
            - /url: /dashboard
      - generic [ref=e17]:
        - generic [ref=e18]:
          - generic [ref=e19]: Platform
          - list [ref=e20]:
            - listitem [ref=e21]:
              - link "Dashboard" [ref=e22] [cursor=pointer]:
                - /url: /dashboard
        - generic [ref=e29]:
          - generic [ref=e30]: Administração
          - list [ref=e31]:
            - listitem [ref=e32]:
              - link "Painel" [ref=e33] [cursor=pointer]:
                - /url: /admin/dashboard
        - generic [ref=e40]:
          - generic [ref=e41]: Pacotes
          - list [ref=e42]:
            - listitem [ref=e43]:
              - link "Categorias" [ref=e44] [cursor=pointer]:
                - /url: /admin/categorias-pacotes
            - listitem [ref=e50]:
              - link "Pacotes" [ref=e51] [cursor=pointer]:
                - /url: /admin/pacotes
            - listitem [ref=e57]:
              - link "Dias de Itinerário" [ref=e58] [cursor=pointer]:
                - /url: /admin/dias-itinerario
            - listitem [ref=e62]:
              - link "Galerias de Pacotes" [ref=e63] [cursor=pointer]:
                - /url: /admin/galerias-pacotes
        - generic [ref=e70]:
          - generic [ref=e71]: Conteúdo
          - list [ref=e72]:
            - listitem [ref=e73]:
              - link "Slides Hero" [ref=e74] [cursor=pointer]:
                - /url: /admin/slides-hero
            - listitem [ref=e79]:
              - link "Secções" [ref=e80] [cursor=pointer]:
                - /url: /admin/seccoes
            - listitem [ref=e86]:
              - link "Estatísticas" [ref=e87] [cursor=pointer]:
                - /url: /admin/estatisticas
            - listitem [ref=e91]:
              - link "Galerias" [ref=e92] [cursor=pointer]:
                - /url: /admin/galerias
            - listitem [ref=e98]:
              - link "Depoimentos" [ref=e99] [cursor=pointer]:
                - /url: /admin/depoimentos
            - listitem [ref=e105]:
              - link "Perguntas Frequentes" [ref=e106] [cursor=pointer]:
                - /url: /admin/perguntas-frequentes
            - listitem [ref=e111]:
              - link "Membros da Equipa" [ref=e112] [cursor=pointer]:
                - /url: /admin/membros-equipa
        - generic [ref=e119]:
          - generic [ref=e120]: Sistema
          - list [ref=e121]:
            - listitem [ref=e122]:
              - link "Itens de Menu" [ref=e123] [cursor=pointer]:
                - /url: /admin/itens-menu
            - listitem [ref=e126]:
              - link "Configurações" [ref=e127] [cursor=pointer]:
                - /url: /admin/configuracoes
        - generic [ref=e132]:
          - generic [ref=e133]: Reservas
          - list [ref=e134]:
            - listitem [ref=e135]:
              - link "Reservas" [ref=e136] [cursor=pointer]:
                - /url: /admin/reservas
      - generic [ref=e141]:
        - list [ref=e144]:
          - listitem [ref=e145]:
            - link "Repository" [ref=e146] [cursor=pointer]:
              - /url: https://github.com/laravel/react-starter-kit
          - listitem [ref=e153]:
            - link "Documentation" [ref=e154] [cursor=pointer]:
              - /url: https://laravel.com/docs/starter-kits#react
        - list [ref=e158]:
          - listitem [ref=e159]:
            - button "AE Admin E2E" [ref=e160]:
              - generic [ref=e161]: AE
              - generic [ref=e163]: Admin E2E
    - main [ref=e168]:
      - generic [ref=e170]:
        - button "Toggle sidebar" [ref=e171]
        - navigation "breadcrumb" [ref=e173]:
          - list [ref=e174]:
            - listitem [ref=e175]:
              - link "Depoimentos" [disabled] [ref=e176]
      - generic [ref=e179]:
        - generic [ref=e180]:
          - generic [ref=e181]:
            - heading "Depoimentos" [level=2] [ref=e182]
            - paragraph [ref=e183]: Gerir os depoimentos exibidos no site.
          - generic [ref=e184]:
            - button "Imprimir" [active] [ref=e185]
            - button "Novo depoimento" [ref=e186]
        - generic [ref=e187]:
          - textbox "Pesquisar..." [ref=e192]
          - table [ref=e194]:
            - rowgroup [ref=e195]:
              - row [ref=e196]:
                - columnheader "Nome" [ref=e197]
                - columnheader "Localização" [ref=e198]
                - columnheader "Avaliação" [ref=e199]
                - columnheader "Destaque" [ref=e200]
                - columnheader "Ações" [ref=e201]
            - rowgroup [ref=e202]:
              - row [ref=e203]:
                - cell "E2E Cliente Editado" [ref=e204]
                - cell "Luanda" [ref=e205]
                - cell "5 estrelas" [ref=e206]
                - cell "Sim" [ref=e207]
                - cell [ref=e208]:
                  - generic [ref=e209]:
                    - button "Visualizar" [ref=e210]
                    - button "Editar" [ref=e211]
                    - button "Eliminar" [ref=e212]
          - paragraph [ref=e213]: 1 de 1 registos
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