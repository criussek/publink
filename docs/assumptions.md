# Założenia biznesowe case study

Wszystkie liczby poniżej są fikcyjne i służą do demonstracji procesu decyzyjnego.

## Northstar Finance Cloud

Globalna modułowa platforma B2B SaaS dla finansów przedsiębiorstw, sprzedawana do segmentu mid-market i enterprise.

- Economic buyer: CFO
- Główni użytkownicy: Treasury Manager, FP&A Manager, Controller, AR/AP Manager, Finance Analyst
- Model sprzedaży: moduły samodzielne + cross-sell / bundle
- Waluta: USD
- Revenue ownership: Business Owner / Product Builder odpowiada za drogę od opportunity do pierwszego powtarzalnego revenue

## Obecne portfolio

| Moduł | Faza | ARR | YoY | NRR | Klienci | ACV | Adoption | Attach rate | R&D / rok |
|---|---|---:|---:|---:|---:|---:|---:|---:|---:|
| CashFlow | Scaling | $8.4M | 46% | 123% | 168 | $50k | 71% | 62% | $1.8M |
| Plan | PMF | $5.6M | 39% | 117% | 103 | $54k | 64% | 41% | $1.4M |
| Close | PMF | $4.1M | 32% | 111% | 94 | $44k | 76% | 37% | $1.2M |
| Collect | MVP+ | $2.3M | 62% | 106% | 71 | $32k | 58% | 29% | $1.0M |
| Insights | MVP | $1.4M | 18% | 92% | 85 | $16.5k | 34% | 18% | $0.9M |

Łączne ARR portfela: **$21.8M**.

### Portfolio sanity check

Insights nie jest martwym produktem. Ma $1.4M ARR i wykorzystanie w części klientów, ale jako standalone ma słabszy NRR, adoption i attach rate. Hipoteza do sprawdzenia: zamiast rozwijać go jako osobny moduł, przekształcić część jego capabilities w **shared intelligence layer** dla innych produktów. Nie zmienia to constraintu zadania: nowa inwestycja nadal może dotyczyć tylko jednego z trzech nowych kierunków.

## Nowe kierunki

### 1. Spend — Spend Control & Procurement

- Problem: rozproszony spend, approvals, zakupy i vendor management
- Economic buyer: CFO
- Users: Procurement, AP, Finance Ops, managers
- Reachable market assumption: $1.2B
- Docelowy ACV: $75k
- Potencjalne ARR Y3: $9.0M
- Mocna strona: acquisition wedge i bardzo duży rynek
- Ryzyko: scope, konkurencja, integracje, cards/payments, słabszy leverage istniejącego portfolio

### 2. Treasury — Treasury & Liquidity Management

- Problem: rozproszona widoczność gotówki, liquidity planning, bank accounts, transfers i cash positioning
- Economic buyer: CFO
- Users: Treasury Manager, Treasury Analyst, Controller
- Reachable market assumption: $650M
- Docelowy ACV: $95k
- Potencjalne ARR Y3: $10.5M
- Mocna strona: bardzo silny cross-sell i re-use danych/integracji CashFlow
- Ryzyko: bank connectivity, security, enterprise complexity

### 3. Working Capital — Working Capital Optimisation

- Problem: decyzje AR/AP i cash są podejmowane silosowo, bez rekomendacji na poziomie całego cash conversion cycle
- Economic buyer: CFO
- Users: AR Manager, AP Manager, Treasury, Finance Analyst
- Reachable market assumption: $450M
- Docelowy ACV: $60k
- Potencjalne ARR Y3: $7.5M
- Mocna strona: najwyższy platform leverage i differentiation
- Ryzyko: jakość danych, explainability, trust, niepewność WTP

## Wagi Investment Scorecard

| Kryterium | Waga |
|---|---:|
| Ból klienta / urgency | 15% |
| Commercial value / WTP | 15% |
| Fit do obecnego ICP | 10% |
| Expansion / cross-sell | 10% |
| Acquisition potential | 5% |
| Platform leverage | 15% |
| Differentiation | 10% |
| Time to revenue | 10% |
| Koszt walidacji | 5% |
| Delivery risk | 5% |

### Domyślne oceny 1–5

| Kryterium | Spend | Treasury | Working Capital |
|---|---:|---:|---:|
| Ból klienta | 4 | 5 | 5 |
| Commercial value | 4 | 5 | 3 |
| Fit do ICP | 4 | 4 | 4 |
| Expansion | 3 | 5 | 5 |
| Acquisition | 5 | 3 | 2 |
| Platform leverage | 3 | 5 | 5 |
| Differentiation | 2 | 3 | 5 |
| Time to revenue | 3 | 4 | 3 |
| Koszt walidacji | 4 | 4 | 3 |
| Delivery risk | 2 | 3 | 4 |

Confidence w evidence na starcie:

- Spend: **średni**
- Treasury: **średni-wysoki**
- Working Capital: **niski-średni**

## Decyzja początkowa

Treasury dostaje **pierwszą inwestycję w evidence**, a nie automatyczny green light do pełnego developmentu.

## Pierwsze progi walidacyjne

Przed inwestycją w production build chcemy zobaczyć co najmniej:

- 12 rozmów problemowych z ICP, w tym minimum 5 economic buyerów
- ≥ 60% rozmów potwierdza problem jako co najmniej miesięczny i istotny biznesowo
- ≥ 5 klientów pokazuje istniejący workflow / dane zamiast tylko deklarować zainteresowanie
- ≥ 3 design partnerów zgadza się wejść do pilota
- ≥ 1 płatny pilot albo równoważny komercyjny commitment
- docelowy ACV nie niższy niż $60k
- brak krytycznego security / connectivity blocker, który niszczy economics

Jeżeli progi nie zostaną spełnione, decyzja może brzmieć: **pivot, odłóż albo zabij**.
