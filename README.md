# Product Builder — zadanie rekrutacyjne

To repozytorium pokazuje **sposób podejmowania decyzji**, a nie próbę zaprojektowania idealnego produktu dla fikcyjnej firmy.

## Założenie

Firma to globalny B2B SaaS finansowy z pięcioma istniejącymi modułami. Ma trzy nowe kierunki i budżet pozwalający rozpocząć tylko jeden.

Na potrzeby zadania zakładam:

- głównym decydentem budżetowym jest CFO,
- użytkownikami są zespoły finansowe,
- Product Builder odpowiada za wynik biznesowy produktu oraz aktywnie współtworzy pierwszą strategię GTM,
- Product Builder może budować prototyp sam, ale w enterprise zwykle robi to wspólnie z Product Designerem / UX/UI, Engineeringiem lub innymi osobami potrzebnymi do redukcji konkretnego ryzyka,
- AI jest normalnym narzędziem do przyspieszania researchu, prototypów, kodu i iteracji,
- wszystkie nazwy produktów i dane biznesowe są fikcyjne.

## Tok działania

1. **Kontekst portfela** — sprawdzam, czy obecne produkty zmieniają sens inwestowania w kolejny kierunek.
2. **Wybór opcji** — tworzę trzy proste możliwości: Wydatki, Płynność i Kapitał obrotowy. Jako pierwszą sprawdzam Płynność.
3. **Rozmowy i discovery** — dobieram rozmówców z obecnych klientów, CRM, CSM / Support oraz kilku firm spoza obecnej bazy; każdą rozmowę zapisuję w ustrukturyzowany sposób i syntetyzuję wspólne wzorce.
4. **MVP** — buduję tylko tyle, ile potrzeba, żeby sprawdzić kluczowy workflow na czymś działającym.
5. **GTM i pierwsze wdrożenia** — Product Builder współtworzy ICP, value proposition, demo, ofertę pilota i bierze udział w pierwszych rozmowach, ale nie próbuje zastępować Sales.
6. **Decyzja inwestycyjna** — rozwijamy, zmieniamy kierunek albo zatrzymujemy na podstawie problemu, adopcji, retencji, wartości, monetyzacji i ryzyk enterprise.

## Uproszczenie na potrzeby zadania

Główna strona celowo pokazuje ograniczoną liczbę danych. W prawdziwym enterprise SaaS model byłby szerszy i obejmował m.in.:

- activation i time-to-value,
- adopcję na poziomie kont i ról,
- retention / kohorty,
- conversion pilot → paid, ACV, pipeline i expansion,
- integracje, security, support load, SLA i reliability,
- wpływ na NRR, cross-sell i całe portfolio.

Pełniejszy model znajduje się w `enterprise-model.svg`.

## AI i warsztat

AI służy do skrócenia czasu od pytania do kolejnej iteracji. Korzystam m.in. z:

- prostego routingu zadań między szybszymi i mocniejszymi modelami,
- cache / ograniczania powtarzanego kontekstu,
- pracy na konkretnym pliku lub diffie zamiast całego repo,
- subagentów do wyspecjalizowanych zadań,
- dodatkowych pluginów / skills,
- eksperymentalnych narzędzi takich jak Caveman do redukcji nadmiarowego użycia tokenów.

Przykładowe źródła narzędzi:

- https://github.com/hashgraph-online/awesome-codex-plugins
- https://github.com/nsEytgXm/subagents_configs
- https://github.com/juliusbrussee/caveman

## Uruchomienie

Aplikacja jest statyczna. Wystarczy otworzyć `index.html` lub uruchomić prosty serwer HTTP.

---

Wszystkie dane finansowe i nazwy produktów w tym case są modelowymi założeniami przygotowanymi wyłącznie na potrzeby procesu rekrutacyjnego.