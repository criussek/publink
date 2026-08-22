# Product Builder — zadanie rekrutacyjne

To repozytorium pokazuje **sposób podejmowania decyzji**, a nie próbę zaprojektowania idealnego produktu dla fikcyjnej firmy.

## Założenie

Firma to globalny B2B SaaS finansowy z pięcioma istniejącymi modułami. Ma trzy nowe kierunki i budżet pozwalający rozpocząć tylko jeden.

Na potrzeby zadania zakładam:

- głównym decydentem budżetowym jest CFO,
- użytkownikami są zespoły finansowe,
- Product Builder odpowiada nie tylko za produkt, ale też za pierwszą sprzedaż i drogę do przychodu,
- wszystkie nazwy produktów i dane biznesowe są fikcyjne.

## Mój tok działania

1. **Portfolio check** — zanim dokładam kolejny produkt, sprawdzam czy obecne portfolio nie zmienia kontekstu decyzji.
2. **Wybór kierunku** — porównuję trzy proste opcje: Wydatki, Płynność i Kapitał obrotowy.
3. **Walidacja problemu** — rozmawiam równolegle z użytkownikiem, CFO i Engineeringiem.
4. **Mały prototyp** — buduję tylko tyle, ile potrzeba, żeby odpowiedzieć na najważniejsze pytanie.
5. **Pierwsza sprzedaż** — sam próbuję zdobyć piloty i sprawdzić gotowość do zapłaty.
6. **Bramka decyzji** — rozwijamy, zmieniamy kierunek albo zatrzymujemy temat.

W tej wersji jako pierwszy kierunek do sprawdzenia wybieram **Płynność**. To nie jest jeszcze decyzja o pełnej budowie produktu.

## AI

AI służy tutaj jako narzędzie do szybszego researchu, prototypowania i kodowania. Przy pracy z modelami stosuję m.in. prosty routing zadań, cache stałego kontekstu, RAG dla większej dokumentacji i ograniczanie kontekstu do potrzebnego fragmentu kodu. Decyzje biznesowe i interpretacja wyników pozostają po stronie Product Buildera.

## Uruchomienie

Aplikacja jest statyczna. Wystarczy otworzyć `index.html` lub uruchomić prosty serwer HTTP.

---

Wszystkie dane finansowe i nazwy produktów w tym case są modelowymi założeniami przygotowanymi wyłącznie na potrzeby procesu rekrutacyjnego.