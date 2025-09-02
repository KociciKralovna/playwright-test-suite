## 🎭 Playwright Test Suite – OpenLibrary

👩‍💻 Autor: Anna Kratochvílová

Repozitář obsahuje automatizované testy psané v Playwrightu (TypeScript).
Projekt je zaměřený na testování OpenLibrary – zahrnuje testy REST API a end-to-end scénáře.

## 📁 Struktura

- `tests/api/` – REST API testy 
- `tests/integration/` – integrační testy kombinující API a UI 
- `tests/specs/` – E2E testy 
- `tests/pages/` – Page Objecty 
- `tests/data/` – testovací data a konstanty 
- `tests/utils/` – pomocné utility a validace 
- `tests/locators/` – selektory a lokátory pro jednotlivé elementy

## 🚀 GitHub Actions

V projektu jsou k dispozici **GitHub Actions** pro spouštění  testů:

- Workflow **Playwright Tests** umožňuje:
  - spouštění všech testů v projektu
  - volbu konkrétního prohlížeče (`chrome`, `msedge`) – výchozí je `chrome`
  - spuštění pouze vybraných testů podle tagu (např. `@auth`, `@search`)
  - automatické cachování Node modulů a Playwright prohlížečů pro rychlejší běh

Spuštění probíhá ručně přes **workflow_dispatch** v GitHubu, kde si lze zvolit vstupy:
- `browser` – vybere projekt/prohlížeč, na kterém testy poběží
- `tag` – umožní omezit běh testů jen na testy označené daným tagem 


