const options={
  spend:{name:'Spend',scores:{pain:4,commercial:4,icp:4,expansion:3,acquisition:5,leverage:3,differentiation:2,revenue:3,validation:4,risk:2}},
  treasury:{name:'Treasury',scores:{pain:5,commercial:5,icp:4,expansion:5,acquisition:3,leverage:5,differentiation:3,revenue:4,validation:4,risk:3}},
  working:{name:'Working Capital',scores:{pain:5,commercial:3,icp:4,expansion:5,acquisition:2,leverage:5,differentiation:5,revenue:3,validation:3,risk:4}}
};
const dimensions=['pain','commercial','icp','expansion','acquisition','leverage','differentiation','revenue','validation','risk'];
const defaults={pain:15,commercial:15,icp:10,expansion:10,acquisition:5,leverage:15,differentiation:10,revenue:10,validation:5,risk:5};

function getWeights(){const w={};dimensions.forEach(d=>{const el=document.querySelector(`[data-weight="${d}"]`);w[d]=Number(el?.value||defaults[d]);});return w}
function scoreOption(key,weights){let total=0,weightSum=0;dimensions.forEach(d=>{total+=options[key].scores[d]*weights[d];weightSum+=weights[d]});return weightSum?total/weightSum:0}
function renderScores(){const weights=getWeights();dimensions.forEach(d=>{const v=document.querySelector(`[data-value="${d}"]`);if(v)v.textContent=`${weights[d]}%`});let winner=null,winnerScore=-1;Object.keys(options).forEach(key=>{const s=scoreOption(key,weights);if(s>winnerScore){winner=key;winnerScore=s}const bar=document.querySelector(`[data-score-bar="${key}"]`);const label=document.querySelector(`[data-score-label="${key}"]`);if(bar)bar.style.width=`${(s/5)*100}%`;if(label)label.textContent=s.toFixed(2)});const win=document.querySelector('#winner-name');const expl=document.querySelector('#winner-expl');if(win)win.textContent=options[winner].name;if(expl){const text={spend:'Przy tych wagach największą wartość ma szeroki acquisition wedge i wielkość rynku. To sygnał do walidacji, nie automatyczny green light do budowy.',treasury:'Przy tych wagach wygrywa połączenie bólu CFO, cross-sellu, platform leverage i relatywnie krótkiego time-to-revenue.',working:'Przy tych wagach największą wartość ma wykorzystanie danych z całej platformy i differentiation. Najpierw trzeba jednak zredukować ryzyko WTP i zaufania.'};expl.textContent=text[winner]}}

document.querySelectorAll('[data-weight]').forEach(el=>el.addEventListener('input',renderScores));
const reset=document.querySelector('#reset-weights');if(reset)reset.addEventListener('click',()=>{dimensions.forEach(d=>{const el=document.querySelector(`[data-weight="${d}"]`);if(el)el.value=defaults[d]});renderScores()});

const approve=document.querySelector('#approve-transfer');if(approve){approve.addEventListener('click',()=>{approve.textContent='Rekomendacja przyjęta';approve.classList.add('done');approve.disabled=true;const status=document.querySelector('#transfer-status');if(status)status.textContent='Symulacja: utworzono draft transferu $240k do zatwierdzenia przez uprawnioną osobę. Żaden prawdziwy transfer nie został wykonany.'})}

const copyBtn=document.querySelector('#copy-cheat');if(copyBtn){copyBtn.addEventListener('click',async()=>{const text=`DECYZJA: Treasury do walidacji w pierwszej kolejności.\nPORTFOLIO: Insights nie killujemy; hipoteza to shared intelligence layer.\nBUYER: CFO. USERS: Treasury/FP&A/Controller/AR/AP.\nZASADA: nie wybieram produktu do zbudowania — wybieram produkt, który zasługuje na kolejną inwestycję w evidence.\nGATE: 12 rozmów, 5 buyerów, 3 design partnerów, >=1 płatny pilot, ACV >= $60k.\nAI: cheapest sufficient intelligence; routing, caching, RAG, scoped context, subagents.\nENGINEERING: Builder udowadnia co powinno istnieć; Engineering zapewnia enterprise readiness.`;try{await navigator.clipboard.writeText(text);copyBtn.textContent='Skopiowano';setTimeout(()=>copyBtn.textContent='Kopiuj skrót',1800)}catch(e){copyBtn.textContent='Nie udało się skopiować'}})}

renderScores();
