# 🎭 Playwright Tests

Autor: Anna Kratochvílová

Repozitář obsahuje end-to-end automatizované testy pro [sport.ceskatelevize.cz](https://sport.ceskatelevize.cz/) pomocí frameworku **Playwright** v jazyce **TypeScript**.

## 📁 Struktura

- `tests/specs/` – testovací scénáře (např. `rubrika.spec.ts`, `rubrika_mobile.spec.ts`)
- `tests/pages/` – Page Objecty pro jednotlivé části webu
- `tests/data/` – testovací data a konstanty
- `tests/utils/` – pomocné utility a funkce (zatím nepoužívané)

## 🚀 GitHub Actions

V projektu jsou k dispozici **dvě GitHub Actions**:

### 1. `manual-all.yml`  
Spustí **všechny testy** v projektu najednou.

### 2. `manual-specific.yml`  
Umožňuje vybrat **konkrétní test (`rubrika` nebo `mobile`)**  
a **prohlížeč** (`chromium`, `firefox`, `webkit`) přes webové UI v GitHubu (workflow_dispatch).

