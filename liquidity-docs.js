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
  if(head){const note=document.createElement('div');note.className='process-note';note.innerHTML='<b>Stosowany format</b>Historie zapisuję według prostego schematu <strong>Jako… / chcę… / żeby…</strong>, a pod nimi dopisuję kryteria akceptacji. Dzięki temu cel użytkownika pozostaje czytelny przed wejściem w szczegóły rozwiązania.';head.insertAdjacentElement('afterend',note)}
  const ids=storyPage.querySelectorAll('.story-id');if(ids[0])ids[0].textContent='101';if(ids[1])ids[1].textContent='102';
  const stories=storyPage.querySelectorAll('.story p');
  if(stories[0])stories[0].innerHTML='<b>Jako</b> Treasury Manager <b>chcę</b> zobaczyć salda wszystkich podłączonych rachunków w jednym miejscu, <b>żeby</b> nie rozpoczynać przeglądu płynności od ręcznej konsolidacji.';
  if(stories[1])stories[1].innerHTML='<b>Jako</b> Finance Director <b>chcę</b> zobaczyć, że prognozowane saldo spadnie poniżej ustalonego bufora, <b>żeby</b> móc zareagować zanim powstanie problem.';
  storyPage.querySelectorAll('h4').forEach(h=>h.textContent='Kryteria akceptacji');
}

const techPage=document.querySelector('#doc-tech');
if(techPage){
 const board=techPage.querySelector('.risk-board');
 if(board)board.innerHTML=`
  <div><span>FE investigation</span><h3>Frontend i doświadczenie użytkownika</h3><ul><li>czytelny widok wielu rachunków i podmiotów,</li><li>filtrowanie, multi-currency i stany pusty/błąd/stare dane,</li><li>czy alert tłumaczy przyczynę, a nie tylko pokazuje kolor,</li><li>wydajność interfejsu przy 100+ rachunkach,</li><li>dostępność i responsywność.</li></ul></div>
  <div><span>BE investigation</span><h3>Backend i logika danych</h3><ul><li>źródło sald: agregator, bank API czy CSV w pilocie,</li><li>harmonogram odświeżania, retry i obsługa błędów,</li><li>agregacja per podmiot / waluta,</li><li>7-dniowy forecast i źródła inflow/outflow,</li><li>audit trail oraz spójność danych.</li></ul></div>
  <div><span>Infrastructure investigation</span><h3>Infrastruktura i niezawodność</h3><ul><li>kolejki / joby do synchronizacji danych,</li><li>monitoring, alerting i observability,</li><li>rate limits providerów i strategia fallbacku,</li><li>skalowanie wraz z liczbą klientów i rachunków,</li><li>koszt utrzymania integracji.</li></ul></div>
  <div><span>Security investigation</span><h3>Bezpieczeństwo i enterprise readiness</h3><ul><li>read-only credentials i bezpieczne przechowywanie sekretów,</li><li>tenant isolation oraz role/uprawnienia per konto i podmiot,</li><li>szyfrowanie, audytowalność i dostęp administracyjny,</li><li>wymagania compliance / data residency,</li><li>co zmieniłoby się przy przyszłych write actions.</li></ul></div>`;
}

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