const approveButton=document.querySelector('#approve-transfer');
const transferStatus=document.querySelector('#transfer-status');
if(approveButton&&transferStatus){approveButton.addEventListener('click',()=>{approveButton.disabled=true;approveButton.classList.add('done');approveButton.textContent='Szkic zapisany';transferStatus.textContent='Symulacja: zapisano szkic decyzji do omówienia przez zespół finansowy. Żadna operacja finansowa nie została wykonana.'})}

// Drobne poprawki layoutu trzymam jako override, żeby nie komplikować głównego arkusza.
const layoutFix=document.createElement('style');
layoutFix.textContent=`
  .cheat-section{padding-top:130px!important;scroll-margin-top:76px}
  .cheat-section .section-title{margin-top:0;padding-top:0}
  .enterprise-model-section{scroll-margin-top:76px}
  .svg-card{overflow-x:auto;overflow-y:hidden}
  .svg-card img{display:block;width:100%;height:auto;max-width:none}
  .product-docs-link{display:grid;gap:4px;margin:20px 0 4px;padding:18px 20px;border:1px solid #cdd7f3;border-radius:16px;background:#fff;color:#17203a;text-decoration:none;box-shadow:0 12px 32px rgba(35,52,105,.08)}
  .product-docs-link span{font-size:12px;text-transform:uppercase;letter-spacing:.07em;color:#5368b4;font-weight:850}
  .product-docs-link b{font-size:21px;color:#334a9d}
  .product-docs-link small{font-size:14px;color:#65708a}
  .product-docs-link:hover{transform:translateY(-1px);border-color:#8fa0da}
  @media(max-width:900px){.svg-card img{min-width:1050px}.cheat-section{padding-top:105px!important}}
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