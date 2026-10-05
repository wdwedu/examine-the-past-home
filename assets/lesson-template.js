(()=>{
const blocks=[...document.querySelectorAll('.block')],bar=document.querySelector('.progress-bar'),label=document.querySelector('.progress-label');
function updateProgress(){let seen=0;const marker=window.scrollY+window.innerHeight*.55;blocks.forEach(b=>{if(b.offsetTop<marker)seen++});const pct=Math.min(100,Math.round((seen/blocks.length)*100));bar.style.width=pct+'%';label.textContent=pct+'%';}
addEventListener('scroll',updateProgress,{passive:true});updateProgress();
document.querySelectorAll('.vocab button').forEach(b=>b.addEventListener('click',()=>b.closest('.vocab').classList.toggle('open')));
function celebrate(target){
  const layer=document.createElement('div');layer.className='celebration';document.body.appendChild(layer);
  const r=target.getBoundingClientRect(),cx=r.left+r.width/2,cy=r.top+r.height/2;
  const colors=['#ffed00','#b7ff4b','#ffffff','#f6a623'];
  for(let i=0;i<24;i++){const p=document.createElement('i');p.className='burst-piece';p.style.left=cx+'px';p.style.top=cy+'px';p.style.background=colors[i%colors.length];const a=(Math.PI*2*i)/24,dist=55+Math.random()*80;p.style.setProperty('--x',Math.cos(a)*dist+'px');p.style.setProperty('--y',Math.sin(a)*dist+'px');layer.appendChild(p)}
  const icon=document.createElement('div');icon.className='burst-icon';icon.textContent=['✨','⭐','👏','🎉'][Math.floor(Math.random()*4)];icon.style.left=cx+'px';icon.style.top=cy+'px';layer.appendChild(icon);
  setTimeout(()=>layer.remove(),1000);
}
document.querySelectorAll('.quiz-card').forEach(card=>{const correct=card.dataset.correct;card.querySelectorAll('.choice').forEach(btn=>btn.addEventListener('click',()=>{card.querySelectorAll('.choice').forEach(x=>x.classList.remove('correct','wrong'));const ok=btn.dataset.value===correct;btn.classList.add(ok?'correct':'wrong');card.querySelector('.feedback').textContent=ok?'Correct — '+card.dataset.why:'Not quite. '+card.dataset.why;if(ok)celebrate(btn);}))});
const preBtn=document.querySelector('#scorePrecheck');
preBtn?.addEventListener('click',()=>{
  const cards=[...document.querySelectorAll('.precheck-card')];let answered=0,score=0;
  cards.forEach(card=>{const selected=card.querySelector('input:checked');if(selected){answered++;if(selected.value===card.dataset.correct)score++;}});
  const out=document.querySelector('#precheckResult');
  if(!answered){out.textContent='Choose at least one answer so the lesson can estimate your starting point.';return;}
  let msg=score===cards.length?'Strong starting knowledge. Move through the lesson looking for deeper evidence and connections.':score>=Math.ceil(cards.length/2)?'You already have some useful background knowledge. The lesson will help sharpen and extend it.':'This is a good starting point. Use the lesson to build the key context and vocabulary before the source-analysis tasks.';
  out.textContent=`Starting point: ${score} of ${cards.length} correct. ${msg}`;
});
document.querySelector('#markComplete')?.addEventListener('click',e=>{e.currentTarget.textContent='✓ Lesson Complete';e.currentTarget.disabled=true;document.querySelector('#completeMessage').textContent='Lesson complete. In a member version, this can save progress and results to the learner account.';celebrate(e.currentTarget);});
})();