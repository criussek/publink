const options={
  spend:{name:'Spend',scores:{pain:4,commercial:4,icp:4,expansion:3,acquisition:5,leverage:3,differentiation:2,revenue:3,validation:4,risk:2}},
  treasury:{name:'Treasury',scores:{pain:5,commercial:5,icp:4,expansion:5,acquisition:3,leverage:5,differentiation:3,revenue:4,validation:4,risk:3}},
  working:{name:'Working Capital',scores:{pain:5,commercial:3,icp:4,expansion:5,acquisition:2,leverage:5,differentiation:5,revenue:3,validation:3,risk:4}}
};
const dimensions=['pain','commercial','icp','expansion','acquisition','leverage','differentiation','revenue','validation','risk'];
const defaults={pain:15,commercial:15,icp:10,expansion:10,acquisition:5,leverage:15,differentiation:10,revenue:10,validation:5,risk:5};

const replacements={
  'Product Builder / Case':'Product Builder / Zadanie',
  '4h case':'zadanie w 4 godziny',
  'Economic buyer':'Decydent budżetowy',
  'Business Owner':'Właściciel biznesowy',
  'revenue ownership':'odpowiedzialność za przychód',
  'Revenue':'Przychód',
  'revenue':'przychód',
  'standalone':'samodzielny',
  'shared intelligence layer':'wspólna warstwa analityczna',
  'Option A':'Opcja A','Option B / start':'Opcja B / start','Option C':'Opcja C',
  'reachable market':'dostępny rynek','target ACV':'docelowe ACV','ARR Y3':'ARR w 3. roku',
  'acquisition wedge':'wejście do nowych klientów','cross-sell':'sprzedaż krzyżowa','Cross-sell':'Sprzedaż krzyżowa',
  'Investment Console':'Konsola inwestycyjna','Commercial value / WTP':'Wartość komercyjna / gotowość do zapłaty',
  'Fit do obecnego ICP':'Dopasowanie do obecnego ICP','Expansion / cross-sell':'Rozszerzenie sprzedaży',
  'Acquisition potential':'Potencjał pozyskania klientów','Platform leverage':'Wykorzystanie platformy',
  'Differentiation':'Wyróżnienie na rynku','Time to revenue':'Czas do przychodu','Delivery risk':'Wykonalność / ryzyko dostarczenia',
  'Score':'Wynik','score':'wynik','Confidence':'Pewność','confidence':'pewność','evidence':'dowody','Evidence':'Dowody',
  'Founder-led sales':'Sprzedaż prowadzona przez Product Buildera','founder-led sales':'sprzedaż prowadzona przez Product Buildera',
  'buyer demos':'prezentacji dla decydentów','design partnerów':'partnerów pilotażowych','design partner':'partner pilotażowy',
  'Kill / pivot criteria':'Kryteria zakończenia / zmiany kierunku','Opportunity':'Szansa biznesowa','Smoke tests':'Szybkie testy rynku',
  'Vertical slice':'Wąski działający fragment','vertical slice':'wąski działający fragment','Product analytics':'Analityka produktu',
  'AI Delivery Economics':'Ekonomika pracy z AI','Working prototype':'Działający prototyp','Engineering + Builder':'Zespół inżynierski + Product Builder',
  'Engineeringiem':'zespołem inżynierskim','Engineering':'Zespół inżynierski','Productionisation':'Przygotowanie produkcyjne',
  'build log':'dziennik zmian','green light':'zgoda','workflow':'proces roboczy','workflows':'procesy robocze',
  'userowi':'użytkownikowi','user value':'wartość dla użytkownika','buyer':'decydent','users':'użytkownicy',
  'market/competitor scan':'przegląd rynku i konkurencji','risk map':'mapa ryzyk','sales validation':'walidacja sprzedażowa',
  'success thresholds':'progi sukcesu','routing':'dobór modeli','cached context':'buforowany kontekst','scoped context':'ograniczony kontekst',
  'subagenci':'subagenci','enterprise readiness':'gotowość do pracy w środowisku enterprise','learning loop':'cykl uczenia się',
  'cost per learning loop':'koszt jednego cyklu uczenia się','cheap':'tani','Scale':'Skaluj','scale':'skaluj','Pivot':'Zmień kierunek','pivot':'zmień kierunek',
  'stop':'zatrzymaj','buildem':'budową','build':'budowa','prototype':'prototyp','Prototype':'Prototyp','pricing conversation':'rozmowa o cenie',
  'weekly active accounts':'aktywne konta tygodniowo','Workflow completion':'Ukończenie procesu','30-day retention':'Retencja 30-dniowa',
  'Global cash position':'Globalna pozycja gotówkowa','7-day projected':'Prognoza za 7 dni','surplus':'nadwyżka','projected shortfall in 5 days':'prognozowany niedobór za 5 dni','within target range':'w docelowym zakresie',
  'Realny':'Rzeczywisty','benchmark':'punkt odniesienia','benchmarki':'punkty odniesienia','Benchmark':'Punkt odniesienia',
  'Case':'Zadanie','CASE':'ZADANIE','BUYER':'DECYDENT','OPTIONS':'OPCJE','DECISION':'DECYZJA','SALES':'SPRZEDAŻ','METRICS':'METRYKI','GATES':'BRAMKI DECYZYJNE','BUILD':'BUDOWA','ANCHOR':'TEZA',
  'expected enterprise value':'oczekiwanej wartości biznesowej','outcome':'wynik biznesowy','metrics':'metryki','TAM':'wielkość rynku','WTP':'gotowość do zapłaty',
  'first revenue':'pierwszy przychód','first':'pierwszy','product':'produkt','Product':'Produkt','Shared':'Wspólna'
};
function localizeStaticCopy(){const walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);const nodes=[];while(walker.nextNode())nodes.push(walker.currentNode);nodes.forEach(node=>{let t=node.nodeValue;Object.entries(replacements).forEach(([from,to])=>{t=t.split(from).join(to)});node.nodeValue=t})}

function getWeights(){const w={};dimensions.forEach(d=>{const el=document.querySelector(`[data-weight="${d}"]`);w[d]=Number(el?.value||defaults[d]);});return w}
function scoreOption(key,weights){let total=0,weightSum=0;dimensions.forEach(d=>{total+=options[key].scores[d]*weights[d];weightSum+=weights[d]});return weightSum?total/weightSum:0}
function renderScores(){const weights=getWeights();dimensions.forEach(d=>{const v=document.querySelector(`[data-value="${d}"]`);if(v)v.textContent=`${weights[d]}%`});let winner=null,winnerScore=-1;Object.keys(options).forEach(key=>{const s=scoreOption(key,weights);if(s>winnerScore){winner=key;winnerScore=s}const bar=document.querySelector(`[data-score-bar="${key}"]`);const label=document.querySelector(`[data-score-label="${key}"]`);if(bar)bar.style.width=`${(s/5)*100}%`;if(label)label.textContent=s.toFixed(2)});const win=document.querySelector('#winner-name');const expl=document.querySelector('#winner-expl');if(win)win.textContent=options[winner].name;if(expl){const text={spend:'Przy tych wagach największą wartość ma szerokie wejście do nowych klientów i wielkość rynku. To sygnał do walidacji, nie automatyczna zgoda na budowę.',treasury:'Przy tych wagach wygrywa połączenie bólu CFO, sprzedaży krzyżowej, wykorzystania istniejącej platformy i relatywnie krótkiego czasu do przychodu.',working:'Przy tych wagach największą wartość ma wykorzystanie danych z całej platformy i wyróżnienie na rynku. Najpierw trzeba jednak zredukować ryzyko gotowości do zapłaty i zaufania.'};expl.textContent=text[winner]}}

document.querySelectorAll('[data-weight]').forEach(el=>el.addEventListener('input',renderScores));
const reset=document.querySelector('#reset-weights');if(reset)reset.addEventListener('click',()=>{dimensions.forEach(d=>{const el=document.querySelector(`[data-weight="${d}"]`);if(el)el.value=defaults[d]});renderScores()});

const approve=document.querySelector('#approve-transfer');if(approve){approve.addEventListener('click',()=>{approve.textContent='Rekomendacja przyjęta';approve.classList.add('done');approve.disabled=true;const status=document.querySelector('#transfer-status');if(status)status.textContent='Symulacja: utworzono projekt transferu $240k do zatwierdzenia przez uprawnioną osobę. Żaden prawdziwy transfer nie został wykonany.'})}

const copyBtn=document.querySelector('#copy-cheat');if(copyBtn){copyBtn.addEventListener('click',async()=>{const text=`DECYZJA: Treasury do walidacji w pierwszej kolejności.\nPORTFOLIO: Insights pozostaje w portfelu; hipoteza to wspólna warstwa analityczna.\nDECYDENT: CFO. UŻYTKOWNICY: Treasury / FP&A / Controller / AR / AP.\nZASADA: nie wybieram produktu do zbudowania — wybieram produkt, który zasługuje na kolejną inwestycję w dowody.\nBRAMKA: 12 rozmów, 5 decydentów, 3 partnerów pilotażowych, >=1 płatny pilot, ACV >= $60k.\nAI: najtańsza wystarczająca inteligencja; dobór modeli, cache, RAG, ograniczony kontekst, subagenci.\nINŻYNIERIA: Product Builder udowadnia co powinno istnieć; zespół inżynierski zapewnia gotowość enterprise.`;try{await navigator.clipboard.writeText(text);copyBtn.textContent='Skopiowano';setTimeout(()=>copyBtn.textContent='Kopiuj skrót',1800)}catch(e){copyBtn.textContent='Nie udało się skopiować'}})}

localizeStaticCopy();
renderScores();
