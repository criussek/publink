const docs=[
  ['overview','Development phase'],['meeting','Meeting notes'],['problem','Problem discovery / Research'],['market','Competitor & Market'],['feedback','Feedback & Data'],['stakeholders','Stakeholder Motivation'],['solution','Solution discovery'],['stories','Stories, AC & Flows'],['validation','Solution validation'],['tech','Tech investigations'],['gtm','GTM strategy'],['metrics','Success metrics'],['handover','Product Handover'],['tour','Product tour'],['leftout','Ideas left out'],['post','Post development']
];
const pages=[...document.querySelectorAll('.doc-page')];
const links=[...document.querySelectorAll('.doc-link')];
const progressLabel=document.querySelector('#progress-label');
const progressBar=document.querySelector('#progress-bar');
const prev=document.querySelector('#doc-prev');
const next=document.querySelector('#doc-next');
const bottomProgress=document.querySelector('#bottom-progress');
const bottomTitle=document.querySelector('#bottom-title');
let current='overview';

const polishAndLayoutFix=document.createElement('style');
polishAndLayoutFix.textContent=`
  .docs-title b{font-size:22px;letter-spacing:-.02em}.docs-title span{font-size:13px;margin-top:2px;display:block}
  .doc-nav-bottom button{width:220px;min-height:46px;display:inline-flex;align-items:center;justify-content:center;text-align:center}
  .doc-nav-bottom button:first-child{justify-self:start}.doc-nav-bottom button:last-child{justify-self:end}
  .tour-flow>div{position:relative;padding-top:58px!important;min-height:190px}
  .tour-flow>div>span{position:absolute;top:18px;left:20px;margin:0}
  #doc-tech .risk-board{grid-template-columns:repeat(2,minmax(0,1fr))}
  #doc-tech .risk-board>div{min-height:240px}
  .process-note{background:#eef3ff;border:1px solid #ccd7f7;border-radius:14px;padding:16px 18px;margin:0 0 18px;color:#43506d}
  .process-note b{display:block;color:#314a9b;margin-bottom:4px}
  @media(max-width:760px){.doc-nav-bottom button{width:100%}#doc-tech .risk-board{grid-template-columns:1fr}.docs-title b{font-size:18px}}
`;
document.head.appendChild(polishAndLayoutFix);

const storyPage=document.querySelector('#doc-stories');
if(storyPage){
  const head=storyPage.querySelector('.doc-head');
  if(head){const note=document.createElement('div');note.className='process-note';note.innerHTML='<b>Format, którego używam</b>Historię zapisuję prostym schematem <strong>Jako… / chcę… / żeby…</strong>, a pod nią dopisuję kryteria akceptacji. Najpierw chcę, żeby wszyscy rozumieli po co coś robimy, dopiero potem wchodzę w szczegóły rozwiązania.';head.insertAdjacentElement('afterend',note)}
  const ids=storyPage.querySelectorAll('.story-id');if(ids[0])ids[0].textContent='101';if(ids[1])ids[1].textContent='102';
  const stories=storyPage.querySelectorAll('.story p');
  if(stories[0])stories[0].innerHTML='<b>Jako</b> Treasury Manager <b>chcę</b> zobaczyć salda wszystkich podłączonych rachunków w jednym miejscu, <b>żeby</b> nie zaczynać przeglądu płynności od ręcznego składania danych.';
  if(stories[1])stories[1].innerHTML='<b>Jako</b> Finance Director <b>chcę</b> zobaczyć, że prognozowane saldo spadnie poniżej ustalonego bufora, <b>żeby</b> móc zareagować zanim pojawi się realny problem.';
  storyPage.querySelectorAll('h4').forEach(h=>h.textContent='Kryteria akceptacji');
}

const techPage=document.querySelector('#doc-tech');
if(techPage){
 const board=techPage.querySelector('.risk-board');
 if(board)board.innerHTML=`
  <div><span>FE investigation</span><h3>Frontend i doświadczenie użytkownika</h3><ul><li>czytelny widok wielu rachunków i podmiotów,</li><li>filtrowanie, wiele walut oraz jasne stany: brak danych / błąd / dane nieaktualne,</li><li>alert, który tłumaczy przyczynę, a nie tylko pokazuje kolor,</li><li>wydajność interfejsu przy 100+ rachunkach,</li><li>dostępność i responsywność.</li></ul></div>
  <div><span>BE investigation</span><h3>Backend i logika danych</h3><ul><li>skąd bierzemy salda: agregator, bank API czy CSV w pilocie,</li><li>jak często odświeżamy dane i co robimy przy błędzie,</li><li>agregacja po podmiocie i walucie,</li><li>7-dniowa prognoza i źródła wpływów / wydatków,</li><li>audit trail i spójność danych.</li></ul></div>
  <div><span>Infrastructure investigation</span><h3>Infrastruktura i niezawodność</h3><ul><li>joby / kolejki do synchronizacji danych,</li><li>monitoring i alerty,</li><li>limity dostawców danych oraz fallback,</li><li>skalowanie wraz z liczbą klientów i rachunków,</li><li>koszt utrzymania integracji.</li></ul></div>
  <div><span>Security investigation</span><h3>Bezpieczeństwo i wymagania enterprise</h3><ul><li>dostęp tylko do odczytu i bezpieczne przechowywanie sekretów,</li><li>izolacja klientów oraz role/uprawnienia per konto i podmiot,</li><li>szyfrowanie, audyt i dostęp administracyjny,</li><li>compliance i wymagania dotyczące miejsca przechowywania danych,</li><li>co musiałoby się zmienić, gdybyśmy kiedyś dodali operacje zapisu.</li></ul></div>`;
}

function setText(selector,text){const el=document.querySelector(selector);if(el)el.textContent=text}
function setHTML(selector,html){const el=document.querySelector(selector);if(el)el.innerHTML=html}
function setList(selector,items){document.querySelectorAll(selector).forEach((el,i)=>{if(items[i]!==undefined)el.textContent=items[i]})}

// Nazwy szablonów zostawiam w oryginalnej formie. Resztę redaguję tak, jak opisałbym to normalnie zespołowi.
setText('.sidebar-intro .eyebrow','SZABLONY Z DAYFORCE / PRZYKŁAD');
setText('.sidebar-intro p','Przykład tego, jak trzymałbym w jednym miejscu wiedzę o „Płynności” — od pierwszych rozmów do decyzji po pilocie.');

const caseNotes=document.querySelectorAll('.case-note>div');
if(caseNotes[0])caseNotes[0].innerHTML='<b>Po co ten dokument?</b><p>Główny case pokazuje decyzje. Tutaj pokazuję, jak porządkuję rozmowy, założenia, feedback, zakres i ustalenia wokół produktu.</p>';
if(caseNotes[1])caseNotes[1].innerHTML='<b>Nie robię dokumentacji dla samej dokumentacji</b><p>To celowo uproszczony przykład. W prawdziwym produkcie zakres rośnie razem z zespołem, ryzykiem i liczbą klientów.</p>';
if(caseNotes[2])caseNotes[2].innerHTML='<b>Skąd ten układ?</b><p>Bazuję na szablonach i strukturze dokumentacji, z których korzystałem przy produktach enterprise w Dayforce.</p>';

setText('#doc-overview .doc-lead','Jedna strona, która ma pozwolić nowej osobie szybko zrozumieć: co robimy, po co, czego na razie nie robimy i kto będzie potrzebny do kolejnych decyzji.');
setText('#doc-overview .doc-grid.three section:nth-child(1) h3','Cel');
setText('#doc-overview .doc-grid.three section:nth-child(2) h3','Co chcę mieć na koniec');
setText('#doc-overview .doc-grid.three section:nth-child(3) h3','Ograniczenia');
setText('#doc-overview .doc-grid.two section:nth-child(1) h3','Kto może być potrzebny');
setText('#doc-overview .doc-grid.two section:nth-child(2) h3','Gdzie jesteśmy');
setText('#doc-overview .callout p','„Płynność” ma dać CFO i zespołowi finansowemu jeden widok sald z wielu rachunków i podmiotów, krótką prognozę oraz ostrzeżenie, jeśli gdzieś zaczyna brakować gotówki.');

setText('#doc-meeting .doc-lead','Każdą rozmowę zapisuję podobnie, żeby po kilku spotkaniach dało się je naprawdę porównać, a nie tylko przypomnieć sobie ogólne wrażenie.');
const meetingSections=document.querySelectorAll('#doc-meeting .doc-grid section h3');
['Jak robią to dziś','Gdzie boli','Jak sobie radzą','Po demo'].forEach((t,i)=>{if(meetingSections[i])meetingSections[i].textContent=t});
setText('#doc-meeting .callout p','kto mówił • jak wygląda proces • gdzie jest problem • jak często się pojawia • jakie ma konsekwencje • jak klient radzi sobie dziś • ważne cytaty • reakcja na koncept • obiekcje • ustalony kolejny krok.');

setText('#doc-problem .doc-lead','Nie wrzucam tutaj całego researchu. Ta strona ma odpowiadać na jedno pytanie: co już wiem o problemie i czy jest wystarczająco ważny, żeby inwestować dalej.');
setText('#doc-problem .doc-grid.three section:nth-child(2) h3','Czego szukam');
setText('#doc-problem .subhead','Skąd biorę informacje');
setList('#doc-problem .method-row span',['Rozmowy z klientami','CRM / Sales','CSM / Support','Dane o użyciu','Szybki przegląd rynku','Ocena techniczna']);
setText('#doc-problem .doc-grid.three section:nth-child(3) p','Na tym etapie inwestuję w dalsze sprawdzenie problemu i MVP. Nie w pełny produkt ani szeroką architekturę integracji bankowych.');

setText('#doc-market .doc-lead','Nie potrzebuję na starcie wielkiej analizy konkurencji. Chcę wiedzieć, jak rynek rozwiązuje ten problem, za co klienci płacą i gdzie mamy przewagę dzięki CashFlow.');
setText('#doc-market .doc-grid.three section:nth-child(3) p','Najważniejszym konkurentem MVP może być nie inny SaaS, tylko Excel i proces, który „jakoś działa” i nie wymaga zakupu nowego narzędzia.');
const marketRows=document.querySelectorAll('#doc-market .compare-mini>div');
if(marketRows[1])marketRows[1].lastElementChild.textContent='Czy klienci kupują przede wszystkim lepszą widoczność, kontrolę, prognozę czy mniejsze ryzyko?';
if(marketRows[2])marketRows[2].lastElementChild.textContent='Co jest minimum, bez którego produkt nie ma sensu, a co pojawia się dopiero w dojrzałym systemie treasury?';
if(marketRows[3])marketRows[3].lastElementChild.textContent='Od czego naturalnie może zależeć cena: liczby rachunków, podmiotów, użytkowników czy połączenia z innymi modułami?';
if(marketRows[4])marketRows[4].lastElementChild.textContent='Co możemy zrobić lepiej dlatego, że produkt powstaje obok CashFlow, a nie jako osobne narzędzie od zera?';

setText('#doc-feedback .doc-head h2','Jedna karta rozmowy = jeden sygnał, który mogę porównać z resztą');
setText('#doc-feedback .doc-lead','Zapisuję nie tylko to, co klient powiedział, ale też kto to powiedział, w jakim kontekście i jak mocny jest to dla mnie sygnał.');
const feedbackLabels=document.querySelectorAll('#doc-feedback .feedback-form span');
['Klient','Skala','Forma rozmowy','Źródło'].forEach((t,i)=>{if(feedbackLabels[i])feedbackLabels[i].textContent=t});
const feedbackHeads=document.querySelectorAll('#doc-feedback .doc-grid h3');
if(feedbackHeads[0])feedbackHeads[0].textContent='Co usłyszałem';if(feedbackHeads[1])feedbackHeads[1].textContent='Jak robię z tego wniosek';
setText('#doc-feedback .muted','Po kilku rozmowach patrzę, które tematy wracają, u jakich klientów i czy różnią się między rolami.');

setText('#doc-stakeholders .doc-lead','W enterprise jeden ekran potrafi dotknąć kilku zespołów. Chcę wiedzieć, kto czego potrzebuje i gdzie ich interesy mogą się rozjechać.');
const stakeholderHeader=document.querySelectorAll('#doc-stakeholders .stakeholder-table .header span');
['Kto','Czego chce','Co może być problemem'].forEach((t,i)=>{if(stakeholderHeader[i])stakeholderHeader[i].textContent=t});

setText('#doc-solution .doc-lead','Nie zakładam od razu, że odpowiedzią musi być dashboard. Rozpisuję dzisiejszy proces, ograniczenia i kilka możliwych sposobów rozwiązania problemu, a dopiero potem wybieram jeden do testu.');
setText('#doc-solution .doc-grid.two section:nth-child(1) h3','Jak jest dziś');
setText('#doc-solution .callout.green p','Wybieram koncept B. Jest wystarczająco konkretny, żeby sprawdzić zachowanie użytkownika, ale nie wymaga od nas budowania całego systemu treasury zanim wiemy, czy klienci naprawdę tego potrzebują.');

setText('#doc-stories .doc-lead','Na tym etapie nie potrzebuję kilkudziesięciu ticketów. Wystarczy kilka historii, które jasno pokazują najważniejszy cel użytkownika i granice MVP.');

setText('#doc-validation .doc-lead','Szablon daje kilka metod, ale nie robię wszystkich. Wybieram tylko te, które odpowiadają na największe niewiadome tego produktu.');
const validationLabels=document.querySelectorAll('#doc-validation .validation-grid section>span');
['Używam','Używam','Używam','Nie teraz','Dodatkowo','Dodatkowo'].forEach((t,i)=>{if(validationLabels[i])validationLabels[i].textContent=t});
setText('#doc-validation .validation-grid section:nth-child(1) p','Czy problem, język i sposób pracy, który opisujemy, są prawdziwe dla użytkownika?');
setText('#doc-validation .validation-grid section:nth-child(2) p','Czy użytkownik rozumie salda, prognozę i alert bez długiego tłumaczenia?');
setText('#doc-validation .validation-grid section:nth-child(3) p','Czy rozwiązanie działa na prawdziwych danych i faktycznie wraca do regularnego procesu klienta?');
setText('#doc-validation .validation-grid section:nth-child(4) p','Za wcześnie. Nie mamy jeszcze skali ani stabilnego rozwiązania, żeby taki test coś sensownego powiedział.');
setText('#doc-validation .callout.yellow b','Co musi się wydarzyć, żebym poszedł dalej');
setText('#doc-validation .callout.yellow p','Chcę mieć co najmniej kilku klientów gotowych sprawdzić produkt na prawdziwym procesie oraz pewność, że sam koncept jest dla nich zrozumiały.');

setText('#doc-tech .doc-lead','Nie próbuję tutaj projektować całej architektury. Z Engineeringiem spisuję pytania, które mogą mocno zmienić koszt, zakres albo sens produktu.');

setText('#doc-gtm .doc-lead','W Dayforce GTM był osobnym obszarem prowadzonym razem z Product Marketingiem. Tutaj pokazuję tylko to, czego potrzebowałbym jako Builder przy pierwszych klientach.');
setText('#doc-gtm .gtm-doc-grid section:nth-child(2) p','Jedno miejsce, w którym szybko widzę dzisiejszą pozycję gotówkową i problem, który może pojawić się za kilka dni.');
setText('#doc-gtm .gtm-doc-grid section:nth-child(5) p','Do sprawdzenia w rozmowach: dodatek do CashFlow czy osobny moduł. Nie zamykam modelu cenowego zanim nie wiem, za co klient faktycznie chce płacić.');
setText('#doc-gtm .callout.green p','Jestem przy pierwszych rozmowach, żeby na bieżąco poprawiać sposób opisywania problemu, demo, zakres pilota i argumenty. Nie po to, żeby na stałe zastąpić Sales.');

setText('#doc-metrics .doc-lead','Progi są robocze. Nie mają udawać prawdy objawionej — mają mi pomóc po określonym czasie powiedzieć: inwestujemy dalej, coś zmieniamy albo kończymy temat.');
setText('#doc-metrics .callout.blue p','Łączę dane z produktu z cotygodniowymi rozmowami podczas pilota i review po kolejnych tygodniach. Jeśli okaże się, że inna metryka lepiej pokazuje wartość, zmieniam sposób pomiaru.');

setText('#doc-handover .doc-lead','To jeden z najbardziej praktycznych szablonów: osoba, która później sprzedaje, wdraża albo wspiera produkt, powinna wiedzieć co to jest, umieć o tym opowiedzieć i potrafić to pokazać.');

setText('#doc-tour .doc-lead','Product tour porządkuje prostą ścieżkę przez produkt: skąd użytkownik zaczyna, co widzi dalej i w którym momencie dostaje wartość. Dla tego MVP wystarczą cztery kroki.');
const tourHeads=document.querySelectorAll('#doc-tour .doc-grid h3');if(tourHeads[0])tourHeads[0].textContent='Przykładowy scenariusz';if(tourHeads[1])tourHeads[1].textContent='Jak zbieram feedback';

setText('#doc-leftout .doc-lead','Lista „nie teraz” jest ważna tak samo jak backlog. Dzięki niej dobry pomysł nie rozszerza automatycznie MVP tylko dlatego, że pojawił się na spotkaniu.');
setText('#doc-leftout .callout.pink p','„Poza zakresem” nie znaczy „zły pomysł”. Znaczy tylko: nie potrzebuję tego, żeby odpowiedzieć na pytanie, które sprawdzam teraz.');

setText('#doc-post .doc-lead','Dokumentacja nie kończy się w dniu wdrożenia. Wracam tu z tym, czego dowiedzieliśmy się po użyciu produktu: co zadziałało, co nie, gdzie pojawił się koszt i co robimy dalej.');
setText('#doc-post .decision-banner p','Zapisuję decyzję razem z najważniejszymi powodami, żeby za kilka miesięcy było wiadomo nie tylko co zrobiliśmy, ale też dlaczego.');

function currentPosition(){return Math.max(0,docs.findIndex(([id])=>id===current));}
function show(id,push=true){
  const target=document.querySelector(`#doc-${id}`);
  if(!target)return;
  current=id;
  pages.forEach(p=>p.classList.toggle('active',p===target));
  links.forEach(l=>l.classList.toggle('active',l.dataset.doc===id));
  const pos=currentPosition();
  const total=docs.length;
  progressLabel.textContent=`${pos+1} / ${total}`;
  progressBar.style.width=`${((pos+1)/total)*100}%`;
  bottomProgress.textContent=String(pos+1).padStart(2,'0')+' / '+String(total).padStart(2,'0');
  bottomTitle.textContent=docs[pos][1];
  prev.disabled=pos===0;
  next.disabled=pos===total-1;
  if(push)history.replaceState(null,'',`#${id}`);
  window.scrollTo({top:0,behavior:'smooth'});
  const active=document.querySelector(`.doc-link[data-doc="${id}"]`);
  active?.scrollIntoView({block:'nearest',inline:'nearest'});
}
links.forEach(link=>link.addEventListener('click',()=>show(link.dataset.doc)));
prev.addEventListener('click',()=>{const p=currentPosition();if(p>0)show(docs[p-1][0]);});
next.addEventListener('click',()=>{const p=currentPosition();if(p<docs.length-1)show(docs[p+1][0]);});
document.addEventListener('keydown',e=>{
  if(e.key==='ArrowRight'){const p=currentPosition();if(p<docs.length-1)show(docs[p+1][0]);}
  if(e.key==='ArrowLeft'){const p=currentPosition();if(p>0)show(docs[p-1][0]);}
});
const hash=location.hash.replace('#','');
show(docs.some(([id])=>id===hash)?hash:'overview',false);