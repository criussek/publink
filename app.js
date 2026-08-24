const approveButton=document.querySelector('#approve-transfer');
const transferStatus=document.querySelector('#transfer-status');
if(approveButton&&transferStatus){approveButton.addEventListener('click',()=>{approveButton.disabled=true;approveButton.classList.add('done');approveButton.textContent='Szkic zapisany';transferStatus.textContent='Symulacja: szkic decyzji został zapisany do dalszej rozmowy w zespole. Żadna operacja finansowa nie została wykonana.'})}

const layoutFix=document.createElement('style');
layoutFix.textContent=`
  .cheat-section{padding:110px 0 120px!important;scroll-margin-top:76px}
  .cheat-section .section-title{margin:0 0 34px;padding:0;max-width:900px}
  .cheat-section .section-title h2{font-size:clamp(38px,4vw,52px);line-height:1.06}
  .cheat-grid{gap:18px!important}
  .cheat-grid>div{padding:24px!important;min-height:150px;align-items:flex-start!important}
  .cheat-grid span{font-size:16px!important;line-height:1.55}
  .enterprise-model-section{scroll-margin-top:76px}
  .svg-card{overflow-x:auto;overflow-y:hidden}
  .svg-card img{display:block;width:100%;height:auto;max-width:none}
  .product-docs-link{display:grid;gap:4px;margin:20px 0 4px;padding:18px 20px;border:1px solid #cdd7f3;border-radius:16px;background:#fff;color:#17203a;text-decoration:none;box-shadow:0 12px 32px rgba(35,52,105,.08)}
  .product-docs-link span{font-size:12px;text-transform:uppercase;letter-spacing:.07em;color:#5368b4;font-weight:850}
  .product-docs-link b{font-size:21px;color:#334a9d}
  .product-docs-link small{font-size:14px;color:#65708a}
  .product-docs-link:hover{transform:translateY(-1px);border-color:#8fa0da}
  .figjam-section{padding:92px 0;background:#fff;border-bottom:1px solid var(--line)}
  .figjam-layout{display:grid;grid-template-columns:minmax(0,.72fr) minmax(0,1.28fr);gap:34px;align-items:start}
  .figjam-card{background:#f7f9fc;border:1px solid var(--line);border-radius:20px;padding:14px;box-shadow:var(--shadow)}
  .figjam-card iframe{display:block;width:100%;height:620px;border:0;border-radius:13px;background:#eef2f8}
  .figjam-actions{display:flex;gap:14px;align-items:center;margin-top:22px;flex-wrap:wrap}
  .why-section{padding:100px 0 120px;background:#101735;color:#fff}
  .why-section .section-title>span{color:#9eaff1}.why-section .section-title h2{color:#fff;max-width:900px}
  .why-section .lead-small{color:#cbd3ef;max-width:900px}
  .why-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:16px;margin-top:34px}
  .why-grid article{background:#18234d;border:1px solid #2b3970;border-radius:18px;padding:24px}
  .why-grid b{display:block;color:#aebdff;font-size:12px;text-transform:uppercase;letter-spacing:.07em;margin-bottom:8px}
  .why-grid h3{font-size:24px;line-height:1.2;margin:0 0 10px;color:#fff}
  .why-grid p{color:#d5dcf4;margin:0;font-size:16px;line-height:1.6}
  @media(max-width:900px){.svg-card img{min-width:1050px}.cheat-section{padding:90px 0 100px!important}.figjam-layout,.why-grid{grid-template-columns:1fr}.figjam-card iframe{height:520px}}
`;
document.head.appendChild(layoutFix);

const stageIds=['start','krok1','krok2','krok3','krok4','krok5','krok6','ai','enterprise-model'];
const stageNames={start:'Start',krok1:'1 / Portfolio',krok2:'2 / Wybór',krok3:'3 / Rozmowy',krok4:'4 / MVP',krok5:'5 / GTM',krok6:'6 / Decyzja',ai:'AI','enterprise-model':'Załącznik'};
const prevButton=document.querySelector('#prev-step');
const nextButton=document.querySelector('#next-step');
const indicator=document.querySelector('#step-indicator');
const navLinks=[...document.querySelectorAll('.step-nav a')];
let currentId='start';

function visibleStage(){const y=window.innerHeight*.42;let best='start';let bestDistance=Infinity;stageIds.forEach(id=>{const el=document.getElementById(id);if(!el)return;const rect=el.getBoundingClientRect();const center=rect.top+Math.min(rect.height,window.innerHeight)/2;const distance=Math.abs(center-y);if(rect.bottom>70&&rect.top<window.innerHeight&&distance<bestDistance){best=id;bestDistance=distance}});return best}
function updateNavigation(){currentId=visibleStage();if(indicator)indicator.textContent=stageNames[currentId]||currentId;navLinks.forEach(link=>link.classList.toggle('active',link.getAttribute('href')===`#${currentId}`));const index=stageIds.indexOf(currentId);if(prevButton)prevButton.disabled=index<=0;if(nextButton)nextButton.disabled=index>=stageIds.length-1}
function go(delta){const index=Math.max(0,stageIds.indexOf(currentId));const target=stageIds[Math.min(stageIds.length-1,Math.max(0,index+delta))];document.getElementById(target)?.scrollIntoView({behavior:'smooth',block:'start'})}
prevButton?.addEventListener('click',()=>go(-1));
nextButton?.addEventListener('click',()=>go(1));
window.addEventListener('scroll',()=>requestAnimationFrame(updateNavigation),{passive:true});
window.addEventListener('resize',updateNavigation);
updateNavigation();

const mvpSection=document.querySelector('#krok4 .mvp-explainer');
if(mvpSection){
  const docsLink=document.createElement('a');
  docsLink.href='liquidity-docs.html';
  docsLink.className='product-docs-link';
  docsLink.innerHTML='<span>Przykład dokumentacji produktu</span><b>Zobacz, jak rozpisałbym opcję „Płynność” →</b><small>Rozmowy, problem, feedback, rozwiązanie, kryteria akceptacji, analiza techniczna, GTM, miary sukcesu i przekazanie produktu.</small>';
  mvpSection.insertAdjacentElement('afterend',docsLink);
}

const enterprise=document.querySelector('#enterprise-model');
if(enterprise){
  const figjam=document.createElement('section');
  figjam.className='figjam-section';
  figjam.innerHTML=`<div class="wrap figjam-layout"><div><div class="section-title"><span>FigJam — mapa procesu</span><h2>Ten sam tok decyzji, tylko w formie do wspólnej rozmowy.</h2></div><p class="lead-small">Na planszy widać główny przebieg oraz karteczki z pytaniami, założeniami i decyzjami. To format, którego użyłbym podczas pracy z zespołem: mniej opisu, więcej wspólnego rozumienia tego, co właśnie próbujemy ustalić.</p><div class="figjam-actions"><a class="primary-btn" href="https://www.figma.com/board/IA8Ehhix9sHvfyql18zCe2" target="_blank" rel="noreferrer">Otwórz FigJam ↗</a><span class="lead-small">Planszę można normalnie przeglądać w FigJam.</span></div></div><div class="figjam-card"><iframe title="FigJam — Product Builder, Płynność" loading="lazy" allowfullscreen src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Fboard%2FIA8Ehhix9sHvfyql18zCe2"></iframe></div></div>`;
  enterprise.insertAdjacentElement('afterend',figjam);
}

const cheat=document.querySelector('.cheat-section');
if(cheat){
  const why=document.createElement('section');
  why.className='why-section';
  why.innerHTML=`<div class="wrap"><div class="section-title"><span>Dlaczego zrobiłem to właśnie tak?</span><h2>Chciałem pokazać nie tylko odpowiedź, ale też sposób, w jaki pracuję.</h2></div><p class="lead-small">Wiem, że brief nie wymagał idealnego rozwiązania. Dlatego zamiast dokładać kolejne slajdy, wykorzystałem te kilka godzin do przygotowania rzeczy, które naprawdę przydałyby się w pracy nad nowym produktem: prototypu, dokumentacji, mapy decyzji i krótkiego spojrzenia biznesowego.</p><div class="why-grid"><article><b>01 / tempo</b><h3>W kilka godzin można dojść do czegoś, o czym da się konkretnie rozmawiać</h3><p>Nie chodzi o udawanie gotowego produktu. Chodzi o szybkie zamienienie niejasnego pomysłu w coś, co można pokazać zespołowi albo klientowi i od razu zebrać sensowny feedback.</p></article><article><b>02 / AI w praktyce</b><h3>AI jest dla mnie narzędziem pracy, a nie osobnym tematem</h3><p>W tym zadaniu użyłem Codexa oraz integracji z GitHubem, Vercel i Figmą. Taki sposób pracy skraca drogę od pomysłu do działającego materiału i pozwala dużo szybciej iterować.</p></article><article><b>03 / pierwsze kroki</b><h3>Na początku mogę przygotować dużo sam, zanim zaangażuję kolejne osoby</h3><p>AI dobrze sprawdza się przy pierwszym UI, demo, opisie rozwiązania, analizie czy flow do rozmowy. Designera, Engineering albo Security angażuję wtedy, gdy ich wiedza naprawdę pomaga zmniejszyć kolejne ryzyko.</p></article><article><b>04 / zakres roli</b><h3>Chciałem pokazać połączenie produktu, biznesu, sprzedaży i technologii</h3><p>Poza samym rozwiązaniem pokazuję też sposób prowadzenia rozmów, podejście do decyzji, myślenie o GTM i techniczne pytania, które potrafią zmienić sens produktu jeszcze zanim zaczniemy go szeroko budować.</p></article></div></div>`;
  cheat.insertAdjacentElement('afterend',why);
}

function setText(selector,text){const el=document.querySelector(selector);if(el)el.textContent=text}
function setHTML(selector,html){const el=document.querySelector(selector);if(el)el.innerHTML=html}
function setList(selector,items){document.querySelectorAll(selector).forEach((el,i)=>{if(items[i]!==undefined)el.textContent=items[i]})}

// Redakcja: mniej języka frameworków, więcej zwykłego opisu tego, co faktycznie robię.
setText('.hero .lead','Na potrzeby zadania ograniczam liczbę danych i metryk. Chcę przede wszystkim pokazać, jak dochodzę do decyzji: co sprawdzam najpierw, co odkładam na później i kiedy jestem gotów zainwestować więcej.');
setText('.hero-note strong','Nie zaczynam od budowania.');
setText('.hero-note p','Najpierw sprawdzam, czy problem jest realny i czy warto się nim zajmować. Dopiero później dokładam czas, ludzi i większy zakres.');
setHTML('.simplification-note','<b>Uproszczenie na potrzeby zadania:</b> w prawdziwym produkcie patrzyłbym szerzej — na adopcję, retencję, przychód, koszt wdrożenia i utrzymania, support, integracje, bezpieczeństwo oraz wpływ na całe portfolio. Na dole pokazuję taki pełniejszy obraz.');

setText('#krok1 .stage-head h2','Zanim dołożę kolejny produkt, chcę wiedzieć, czy nie ma ważniejszej rzeczy do zrobienia w tym, co już mamy.');
setText('#krok1 .thinking-grid article:nth-child(1) p','Robię szybki przegląd pięciu obecnych modułów: etap rozwoju, przychód, trend, adopcja i koszt dalszej pracy. Nie robię pełnego review portfolio — szukam tylko czegoś, co mogłoby zmienić sens dokładania nowego produktu.');
setList('#krok1 .thinking-grid article:nth-child(2) li',['Czy któryś produkt rośnie i warto w niego dołożyć zamiast otwierać nowy temat?','Czy któryś zabiera dużo pracy, a daje za mało wartości?','Czy nowy kierunek może skorzystać z klientów, danych albo elementów, które już mamy?']);
setList('#krok1 .thinking-grid article:nth-child(3) li',['Nie zmieniam zadania tylko po to, żeby znaleźć łatwiejszą odpowiedź.','Insights zapisuję jako osobny temat do sprawdzenia.','Wracam do briefu i wybieram jeden z trzech nowych kierunków.']);
setText('#krok1 .sticky-row .sticky.blue strong','Brief jest jasny: mam wybrać jeden z trzech nowych kierunków.');
setText('#krok1 .sticky-row .sticky.blue p','Przegląd obecnych produktów ma pomóc podjąć lepszą decyzję, a nie ominąć zadanie.');

setText('#krok2 .compare-head p','To tylko szybki filtr. Oceny są założeniami na start — ich zadaniem jest wskazać, który kierunek warto sprawdzić jako pierwszy.');
setText('#krok2 .dark-notes .sticky.yellow strong','Duży rynek sam w sobie mnie nie przekonuje.');
setText('#krok2 .dark-notes .sticky.yellow p','Jeżeli dojście do wartości wymaga ogromnego zakresu i lat pracy, wolę najpierw sprawdzić coś, co daje szybszą odpowiedź.');
setText('#krok2 .dark-notes .sticky.pink strong','Najpierw patrzę na to, co jest blisko produktu i klientów, których już mamy.');
setText('#krok2 .dark-notes .sticky.pink p','„Płynność” pasuje do CashFlow, więc na starcie mamy lepszy dostęp do danych, kontekstu i rozmów z klientami.');
setText('#krok2 .dark-notes .sticky.blue strong','Liczy się też koszt sprawdzenia pomysłu.');
setText('#krok2 .dark-notes .sticky.blue p','Nie potrzebuję od razu pełnego produktu. Chcę możliwie szybko zobaczyć, czy założenia trzymają się rzeczywistości.');
setText('#krok2 .dark-notes .sticky.green strong','Najpierw sprawdzam opcję „Płynność”.');
setText('#krok2 .dark-notes .sticky.green p','To decyzja o kolejnym kroku, nie zgoda na budowę całego produktu.');

setText('#krok3 .stage-head h2','Zanim dopracuję rozwiązanie, chcę zobaczyć, jak ten problem wygląda dzisiaj u użytkownika, u CFO i od strony technicznej.');
setText('#krok3 .source-grid article:nth-child(1) h3','Zaczynam od miejsc, do których już mam dostęp');
setList('#krok3 .source-grid article:nth-child(1) li',['obecni klienci CashFlow — najszybszy sposób, żeby sprawdzić, czy kierunek rzeczywiście pasuje do obecnej bazy,','klienci, u których podobny temat pojawiał się w rozmowach z CSM albo Supportem,','otwarte szanse w CRM, które pasują do profilu klienta,','kilka firm spoza obecnej bazy, żeby nie słuchać wyłącznie własnych klientów.']);
setText('#krok3 .source-grid article:nth-child(2) h3','Najpierw pytam o dzisiejszy proces, demo pokazuję później');
setList('#krok3 .source-grid article:nth-child(2) li',['15–20 min: jak robią to dziś i gdzie tracą czas,','10 min: co ten problem oznacza dla biznesu,','dopiero potem krótkie demo,','na końcu: co musiałoby się wydarzyć, żeby spróbowali pilota.']);
setText('#krok3 .source-grid article:nth-child(3) h3','Każdą rozmowę zapisuję w tym samym formacie');
setList('#krok3 .source-grid article:nth-child(3) li',['rozmowa wideo; jeśli klient się zgadza — nagranie i transkrypcja,','rola, firma, obecny sposób pracy, problem, obejścia i ważne cytaty,','reakcja na demo, obiekcje i ustalony kolejny krok,','po kilku rozmowach robię syntezę wspólnych tematów w jednym miejscu.']);
setText('#krok3 .sticky-row .sticky.yellow strong','Klient pokazuje prawdziwy proces i chce wciągnąć do rozmowy kolejną osobę.');
setText('#krok3 .sticky-row .sticky.pink p','Sama pozytywna opinia niewiele znaczy. Dużo ważniejsze jest to, czy klient robi kolejny konkretny krok.');
setText('#krok3 .sticky-row .sticky.blue strong','W tym samym czasie sprawdzam rzeczy, które mogą zablokować produkt.');
setText('#krok3 .sticky-row .sticky.blue p','Integracje z bankami, uprawnienia, bezpieczeństwo, świeżość danych i wpływ na obecną architekturę.');
setText('#krok3 .sticky-row .sticky.green strong','Po serii rozmów chcę mieć wnioski, a nie stos notatek.');
setText('#krok3 .sticky-row .sticky.green p','Co się powtarza, dla kogo problem jest ważny, jakie są obiekcje i co muszę sprawdzić w kolejnej iteracji.');

setText('#krok4 .stage-head h2','Buduję możliwie małe MVP, które pozwoli sprawdzić jeden konkretny scenariusz na czymś działającym.');
setText('#krok4 .mvp-explainer>div:nth-child(1) h3','Zespół finansowy składa salda z kilku banków ręcznie i zbyt późno zauważa, że w jednej spółce zaczyna brakować gotówki.');
setText('#krok4 .mvp-explainer>div:nth-child(2) h3','Jeden widok z saldami, prostą prognozą na 7 dni i alertem, że wybrany podmiot spadnie poniżej ustalonego bufora.');
setText('#krok4 .mvp-explainer>div:nth-child(3) h3','Czy taki widok pozwala szybciej przejść przez przegląd płynności i zauważyć problem wcześniej niż w obecnym procesie?');
setText('#krok4 .sticky-row .sticky.yellow strong','Sprawdzam konkretny sposób pracy, a nie kompletność produktu.');
setText('#krok4 .sticky-row .sticky.yellow p','Na tym etapie nie potrzebuję przelewów, pełnego systemu treasury, rozbudowanych uprawnień ani integracji ze wszystkimi bankami.');
setText('#krok4 .sticky-row .sticky.blue strong','Dobieram ludzi do ryzyka, które właśnie sprawdzam.');
setText('#krok4 .sticky-row .sticky.blue p','Pierwszą wersję mogę przygotować sam. Jeśli największa niewiadoma leży w UX, technologii albo bezpieczeństwie, od razu angażuję właściwą osobę.');
setText('#krok4 .sticky-row .sticky.pink strong','AI skraca czas do pierwszej wersji.');
setText('#krok4 .sticky-row .sticky.pink p','Pomaga mi szybciej przygotować research, tekst, UI, kod czy warianty rozwiązania. Nie zastępuje rozmowy z klientem ani decyzji produktowej.');
setText('#krok4 .sticky-row .sticky.green strong','Mierzę tylko to, co pomaga odpowiedzieć na pytanie MVP.');
setText('#krok4 .sticky-row .sticky.green p','Jak szybko użytkownik dochodzi do wartości, czy kończy kluczowy proces, czy wraca i co mówi po użyciu produktu.');

setText('#krok5 .stage-lead','W tej roli zakładam, że Product Builder jest blisko pierwszych klientów. Pomaga ułożyć komunikat, demo, profil klienta i ofertę pilota, a potem oddaje powtarzalny proces zespołowi Sales.');
const gtmCards=[
 ['Od kogo zaczynam?','Obecni klienci CashFlow, którzy mają kilka podmiotów, wiele rachunków i regularnie robią przegląd płynności.'],
 ['Jak mówię o wartości?','Nie sprzedaję „dashboardu”. Mówię o tym, że zespół szybciej widzi, gdzie jest gotówka i gdzie za kilka dni może pojawić się problem.'],
 ['Co pokazuję?','Jedną prostą historię: widzę salda → widzę ryzyko za 5 dni → wiem, gdzie trzeba zareagować.'],
 ['Jak wygląda pilot?','Wąski zakres na wybranych rachunkach i podmiotach, z ustalonym czasem, odpowiedzialnością i prostymi kryteriami sukcesu.'],
 ['Po co jestem na rozmowie?','Chcę usłyszeć obiekcje bez pośredników, zobaczyć czego brakuje i sprawdzić, jak klient sam opisuje wartość produktu.'],
 ['Kiedy Sales może działać bez Buildera?','Gdy wiemy, komu to sprzedajemy, jaki problem rozwiązujemy, jak wygląda demo, ile kosztuje pilot i jakie pytania wracają na rozmowach.']
];
document.querySelectorAll('#krok5 .gtm-grid article').forEach((card,i)=>{if(!gtmCards[i])return;const h=card.querySelector('h3');const p=card.querySelector('p');if(h)h.textContent=gtmCards[i][0];if(p)p.textContent=gtmCards[i][1]});
setText('#krok5 .dark-notes .sticky.yellow strong','Nie zastępuję Sales. Jestem blisko pierwszych klientów, dopóki uczymy się, jak ten produkt sprzedawać.');
setText('#krok5 .dark-notes .sticky.pink strong','Chcę wiedzieć, co naprawdę zatrzymuje klienta przed decyzją.');
setText('#krok5 .dark-notes .sticky.pink p','Cena, timing, bezpieczeństwo, integracje, procurement albo po prostu za mała wartość problemu.');
setText('#krok5 .dark-notes .sticky.blue strong','Na start przygotowuję: profil klienta, jednozdaniowy opis wartości, demo, ofertę pilota, pierwsze założenie cenowe i listę typowych obiekcji.');
setText('#krok5 .dark-notes .sticky.green strong','Patrzę, czy klient faktycznie przechodzi do kolejnego kroku.');
setText('#krok5 .dark-notes .sticky.green p','Rozmowa → demo → pilot → regularne użycie → decyzja o płatnym wdrożeniu. To mówi mi więcej niż „fajny pomysł”.');

setText('#krok6 .stage-head h2','Po pilocie nie pytam, czy zespół dowiózł feature. Pytam, czy mamy wystarczająco dużo powodów, żeby inwestować dalej.');
setList('#krok6 .metric-strips>div span',['Czy problem powtarza się i jest wystarczająco ważny dla właściwych klientów?','Czy użytkownicy naprawdę wykonują kluczowy proces, a nie tylko zaglądają do pilota?','Czy wracają do produktu po pierwszym użyciu i użycie utrzymuje się przez kolejne tygodnie?','Czy produkt faktycznie oszczędza czas, upraszcza pracę albo pomaga wcześniej zauważyć ryzyko?','Czy CFO chce przejść z pilota do płatnego wdrożenia i czy cena ma sens dla obu stron?','Czy integracje, bezpieczeństwo, wdrożenie i support nie sprawiają, że produkt staje się zbyt drogi lub trudny w utrzymaniu?']);
setText('#krok6 .decision-option.go p','Przechodzę z zespołem do wersji produkcyjnej, dokładam potrzebną analitykę, plan wdrożenia, GTM i kolejne segmenty klientów.');
setText('#krok6 .decision-option.pivot p','Problem zostaje, ale zmieniam rozwiązanie, segment albo model biznesowy i robię kolejny mały test.');
setText('#krok6 .decision-option.stop p','Kończę temat zanim zamieni się w duży projekt utrzymywany tylko dlatego, że już dużo w niego włożyliśmy.');
setList('#krok6 .enterprise-action-grid>div span',['docelowy zakres, priorytety i plan kolejnych wersji wspólnie z Designem i Engineeringiem','analityka produktu, segmentacja klientów, kohorty i regularne łączenie danych z rozmowami','onboarding, integracje, przegląd bezpieczeństwa, plan wdrożenia i czas do pierwszej wartości','cena i pakiety, materiały dla Sales/CS, demo, pierwsze case studies i referencje','ARR, pipeline, expansion, koszt utrzymania, wpływ na churn i wartość całego portfolio','regularne rozmowy z klientami, feedback z Supportu i Sales oraz świadome decyzje, czego nie budować']);
setList('#krok6 .timeline-track>div span',['szybki przegląd portfolio i danych wewnętrznych, lista rozmówców, przygotowanie scenariusza','rozmowy z użytkownikami i CFO, równolegle pierwsza ocena wykonalności technicznej','MVP / prototyp, poprawki po rozmowach i przygotowanie prostego pilota','pierwsze demo, wybór partnerów pilotażowych i dopracowanie komunikatu GTM','pilot na prawdziwych danych, podstawowa analityka i cotygodniowe rozmowy z użytkownikami','sprawdzenie powrotów do produktu, wartości, ceny i ryzyk enterprise → decyzja co dalej']);

setText('#ai .lead-small','AI nie jest dla mnie osobnym projektem. Używam go tam, gdzie realnie skraca pracę: przy researchu, pierwszych prototypach, kodzie, testach, porządkowaniu feedbacku i powtarzalnych zadaniach.');

setText('.cheat-grid>div:nth-child(1) span','Najpierw sprawdzam obecne portfolio, ale trzymam się briefu: wybieram jeden z trzech nowych kierunków.');
setText('.cheat-grid>div:nth-child(2) span','Jako pierwszy sprawdzam „Płynność”, bo problem jest ważny, a kierunek dobrze pasuje do CashFlow i obecnych klientów.');
setText('.cheat-grid>div:nth-child(3) span','Rozmawiam z użytkownikami i CFO, a równolegle sprawdzam największe ryzyka techniczne. Każdą rozmowę zapisuję w tym samym formacie i szukam wzorców.');
setText('.cheat-grid>div:nth-child(4) span','Buduję małe MVP pod jeden konkretny scenariusz — sam albo z właściwymi osobami z Designu i Engineeringu, zależnie od tego, co chcę sprawdzić.');
setText('.cheat-grid>div:nth-child(5) span','Współtworzę pierwszy GTM i jestem blisko pierwszych klientów, dopóki nie mamy procesu, który Sales może powtarzać bez mojego stałego udziału.');
setText('.cheat-grid>div:nth-child(6) span','Dalej inwestuję tylko wtedy, gdy razem zgadzają się: problem, użycie, powroty do produktu, realna wartość, gotowość do zapłaty i sens wdrożenia w enterprise.');
