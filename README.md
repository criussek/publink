# Product Builder — case rekrutacyjny

Interaktywne rozwiązanie zadania rekrutacyjnego Product Builder.

## Co jest w repozytorium

- **Case** — decyzja inwestycyjna dla fikcyjnej globalnej platformy finansowej B2B SaaS.
- **Portfolio sanity check** — ocena 5 istniejących modułów przed uruchomieniem nowej inwestycji.
- **3 nowe kierunki** — Spend, Treasury i Working Capital.
- **Investment Console** — interaktywny model wag i scoringu, który pokazuje wrażliwość decyzji na założenia.
- **Walidacja** — hypothesis → evidence → eksperyment → próg → decyzja.
- **Founder-led sales** — sprzedaż jako część discovery i walidacji, nie etap po developmentcie.
- **Symulacja Mixpanel** — przykładowa taksonomia eventów, KPI i dane pilotażowe.
- **AI Delivery Economics** — routing modeli, caching, RAG, ograniczanie kontekstu, subagenci i zasada `cheapest sufficient intelligence`.
- **Vertical slice** — mały działający prototyp modułu Treasury.
- **Cheatsheet** — skrócona mapa decyzji i założeń do późniejszej dyskusji.

## Najważniejsze założenia

Opis zadania jest celowo powierzchowny, dlatego wszystkie dane biznesowe poniżej są **fikcyjne i jawnie oznaczone jako założenia**.

- Firma: **Northstar Finance Cloud** — globalny B2B SaaS dla mid-market i enterprise.
- Główny economic buyer: **CFO**.
- Wartość dla CFO nie wystarcza: produkt musi tworzyć powtarzalną wartość dla użytkowników operacyjnych (Treasury, FP&A, Controller, AR/AP).
- Business Owner odpowiada również za **revenue ownership**.
- Product Builder może sam tworzyć prototypy, landing pages, eksperymenty i vertical slices; docelowe productionisation odbywa się wspólnie z Engineeringiem.
- Waluta: **USD**.
- Budżet nadal pozwala uruchomić tylko **jeden nowy produkt**. Portfolio sanity check nie służy obchodzeniu tego ograniczenia.

## Decyzja w tej wersji case'u

**Najpierw waliduję Treasury. Nie decyduję jeszcze o pełnym buildzie.**

Powód: na przyjętych danych Treasury łączy najwyższy ból CFO, bardzo mocny cross-sell, najwyższy leverage istniejącego CashFlow i relatywnie krótki czas do pierwszego revenue. Spend ma większy rynek, ale niższą przewagę platformową i wyższy koszt wejścia. Working Capital ma największy potencjał różnicowania, ale najsłabszą pewność evidence i większe ryzyko zaufania do rekomendacji.

Kluczowa zasada:

> Nie wybieram produktu do zbudowania. Wybieram produkt, który zasługuje na kolejną inwestycję w dowody.

## AI

Całość jest świadomie przygotowywana z pomocą AI. AI służy do przyspieszenia researchu, syntezy, kodowania, testów i tworzenia artefaktów. Decyzje, priorytety, założenia, kryteria sukcesu i interpretacja evidence pozostają odpowiedzialnością Product Buildera.

## Dane i konkurenci

Realni konkurenci użyci jako punkty odniesienia:

- Ramp — spend management / procurement / AP: https://ramp.com/
- Kyriba — treasury / cash & liquidity management: https://www.kyriba.com/solutions/treasury/
- HighRadius — AR/AP forecasting, receivables i working capital: https://www.highradius.com/

W aplikacji pojawiają się również **fikcyjni konkurenci**, wyraźnie oznaczeni jako stworzeni na potrzeby case study.

## Uruchomienie lokalne

Aplikacja jest statyczna — wystarczy otworzyć `index.html` albo uruchomić prosty serwer HTTP.

---

Case study nie przedstawia danych Publinka ani żadnej realnej firmy finansowej. Wszystkie metryki Northstar Finance Cloud są modelowymi założeniami przygotowanymi wyłącznie na potrzeby zadania rekrutacyjnego.
