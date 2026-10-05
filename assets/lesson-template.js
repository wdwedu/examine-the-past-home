(()=>{
const blocks=[...document.querySelectorAll('.block')],bar=document.querySelector('.progress-bar'),label=document.querySelector('.progress-label');
function updateProgress(){let seen=0;const marker=window.scrollY+window.innerHeight*.55;blocks.forEach(b=>{if(b.offsetTop<marker)seen++});const pct=Math.min(100,Math.round((seen/blocks.length)*100));bar.style.width=pct+'%';label.textContent=pct+'%';}
addEventListener('scroll',updateProgress,{passive:true});updateProgress();
document.querySelectorAll('.vocab button').forEach(b=>b.addEventListener('click',()=>b.closest('.vocab').classList.toggle('open')));
document.querySelectorAll('.quiz-card').forEach(card=>{const correct=card.dataset.correct;card.querySelectorAll('.choice').forEach(btn=>btn.addEventListener('click',()=>{card.querySelectorAll('.choice').forEach(x=>x.classList.remove('correct','wrong'));const ok=btn.dataset.value===correct;btn.classList.add(ok?'correct':'wrong');card.querySelector('.feedback').textContent=ok?'Correct — '+card.dataset.why:'Not quite. '+card.dataset.why;}))});
document.querySelector('#markComplete')?.addEventListener('click',e=>{e.currentTarget.textContent='✓ Lesson Complete';e.currentTarget.disabled=true;document.querySelector('#completeMessage').textContent='Prototype complete. In a member version, this could save progress to the learner account.'});
})();