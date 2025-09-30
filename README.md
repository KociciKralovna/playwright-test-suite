## 🎭 Playwright Test Suite – OpenLibrary

👩‍💻 Autor: Anna Kratochvílová

Repozitář obsahuje automatizované testy psané v Playwrightu (TypeScript).
Projekt je zaměřený na testování OpenLibrary – zahrnuje testy REST API a end-to-end scénáře.

## Poznámka

Projekt je stále ve vývoji. Struktura testů se může rozšiřovat a některé části (např. integrační testy) zatím nejsou hotové.  
Postupně se budou doplňovat nové scénáře, data a utility.

## 📁 Struktura

- `tests/api/` – REST API testy 
- `tests/integration/` – Integrační testy kombinující API a UI 
- `tests/specs/` – E2E testy 
- `tests/pages/` – Page Objecty 
- `tests/data/` – Testovací data a konstanty 
- `tests/utils/` – Pomocné utility a validace 

## 🚀 GitHub Actions  

V projektu jsou k dispozici GitHub Actions pro spouštění testů.  

### Workflow **Playwright Tests** umožňuje:
- spuštění všech testů v projektu  
- volbu konkrétního prohlížeče (`chromium`, `firefox`, `webkit`, `all`) – výchozí je `chromium`  
- spuštění pouze vybraných testů podle tagu (např. `@auth`, `@search`)  

### Jak spustit:
1. V GitHubu přejdi do **Actions** → vyber workflow **Manual Run**.  
2. Zvol vstupy:
   - **Branch** – větev, ze které se testy spustí  
   - **Select which tests to run** – např. `all`, `specs`, `api`  
   - **Browser project** – prohlížeč, na kterém se testy spustí  
   - **Run only tests with given @tag** – volitelné omezení testů podle tagu  
3. Klikni na **Run workflow**.

### 📊 Výstupy

Po dokončení běhu workflow se v GitHub Actions zobrazí **souhrn výsledků testů**:  
- celkový počet Passed / Failed / Skipped  
- výsledky jsou seskupené po testovacích souborech  
- pro každý test je dostupný detail (status, délka běhu, tagy, případná chyba)  
- generuje se **Playwright HTML report** – dostupný jako artifact ke stažení
