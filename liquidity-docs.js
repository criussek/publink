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