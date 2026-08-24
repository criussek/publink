const approveButton=document.querySelector('#approve-transfer');
const transferStatus=document.querySelector('#transfer-status');
if(approveButton&&transferStatus){approveButton.addEventListener('click',()=>{approveButton.disabled=true;approveButton.classList.add('done');approveButton.textContent='Szkic zapisany';transferStatus.textContent='Symulacja: zapisano szkic decyzji do omówienia przez zespół finansowy. Żadna operacja finansowa nie została wykonana.'})}

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
const stageNames={start:'Start',krok1:'1 / Portfolio',krok2:'2 / Wybór',krok3:'3 / Rozmowy',krok4:'4 / MVP',krok5:'5 / GTM',krok6:'6 / Decyzja',ai:'AI', 'enterprise-model':'Załącznik'};
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
  docsLink.innerHTML='<span>Przykład warsztatu dokumentacyjnego</span><b>Otwórz interaktywną dokumentację opcji „Płynność” →</b><small>Problem discovery, meeting notes, feedback, solution discovery, AC, walidacja, tech, GTM, success metrics i KNOW / SAY / SHOW.</small>';
  mvpSection.insertAdjacentElement('afterend',docsLink);
}

const enterprise=document.querySelector('#enterprise-model');
if(enterprise){
  const figjam=document.createElement('section');
  figjam.className='figjam-section';
  figjam.innerHTML=`<div class="wrap figjam-layout"><div><div class="section-title"><span>FigJam — mapa procesu</span><h2>Ten sam case pokazany jako mapa decyzji i reasoning.</h2></div><p class="lead-small">Na planszy rozdzielam główny flow od karteczek z pytaniami, założeniami, sposobem myślenia i decyzjami. To jest warstwa do wspólnej rozmowy z zespołem — mniej dokumentacji, więcej widocznego toku rozumowania.</p><div class="figjam-actions"><a class="primary-btn" href="https://www.figma.com/board/IA8Ehhix9sHvfyql18zCe2" target="_blank" rel="noreferrer">Otwórz FigJam ↗</a><span class="lead-small">Board jest interaktywny i edytowalny.</span></div></div><div class="figjam-card"><iframe title="FigJam — Product Builder, Płynność" loading="lazy" allowfullscreen src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Fboard%2FIA8Ehhix9sHvfyql18zCe2"></iframe></div></div>`;
  enterprise.insertAdjacentElement('afterend',figjam);
}

const cheat=document.querySelector('.cheat-section');
if(cheat){
  const why=document.createElement('section');
  why.className='why-section';
  why.innerHTML=`<div class="wrap"><div class="section-title"><span>Dlaczego przygotowałem zadanie w tej formie?</span><h2>Chciałem pokazać nie tylko odpowiedź, ale też sposób pracy Product Buildera.</h2></div><p class="lead-small">Wiem, że brief nie oczekuje idealnego rozwiązania. Dlatego potraktowałem go jako okazję do pokazania, jak w kilka godzin można przejść od problemu do prototypu, dokumentacji, mapy decyzji i business-owner overview.</p><div class="why-grid"><article><b>01 / szybkość</b><h3>Od niepewności do czegoś, o czym można rozmawiać</h3><p>Prototyp, dokumentacja i mapa procesu nie mają udawać gotowego produktu. Mają szybko dać zespołowi wspólny punkt odniesienia do kolejnej decyzji.</p></article><article><b>02 / AI-native workflow</b><h3>AI i integracje traktuję jako realny warsztat pracy</h3><p>Wykorzystanie Codexa oraz integracji z GitHubem, Vercel i Figmą pokazuje, jak można skrócić drogę od pomysłu do działającego artefaktu bez wielodniowej koordynacji.</p></article><article><b>03 / wczesna walidacja</b><h3>AI pozwala tanio przygotować pierwsze materiały do walidacji</h3><p>Na pierwszym etapie Builder może sam przygotować wariant UI, demo, opis rozwiązania czy flow do rozmowy. Inne osoby angażuję wtedy, gdy ich specjalizacja realnie redukuje kolejne ryzyko.</p></article><article><b>04 / zakres kompetencji</b><h3>Łączę produkt, biznes, sprzedaż, technologię i rozmowę z klientem</h3><p>Case pokazuje zarówno decyzje produktowe i komercyjne, jak i techniczne ograniczenia oraz sposób prowadzenia discovery bez sugerowania klientowi odpowiedzi.</p></article></div></div>`;
  cheat.insertAdjacentElement('afterend',why);
}