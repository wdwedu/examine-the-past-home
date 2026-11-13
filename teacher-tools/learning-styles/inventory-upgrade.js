/* Learning Styles & Strategies Lab inventory access upgrade */
(()=>{'use strict';if(window.ETPInventoryUpgrade)return;window.ETPInventoryUpgrade=true;
const profile=document.getElementById('profile'),side=document.getElementById('questionSide'),lab=profile?.querySelector('.lab-wrap');
if(!profile||!side||!lab)return;
const intro=document.createElement('section');intro.className='etp-inventory-intro';intro.setAttribute('aria-labelledby','etp-inventory-intro-title');
intro.innerHTML='<h3 id="etp-inventory-intro-title">Learning Styles Inventory</h3><p>Explore how you prefer to engage with information and discover flexible ways to study. This is an <strong>educational self-reflection inventory</strong>, not a diagnostic test or a measurement of fixed learning abilities.</p><div class="etp-lab-badges"><span>14 sections</span><span>70 rating statements</span><span>About 15–20 minutes</span><span>Free • No account</span></div><p><strong>How to complete it:</strong> Use the same five-point agreement-with-yourself scale throughout: 1 = Not like me at all, 2 = Slightly like me, 3 = Somewhat like me, 4 = Mostly like me, 5 = Very much like me. Rate all five statements per section, then click Continue. You may go Back to revise any response. At the end, generate your detailed profile and practical learning strategies.</p><div class="etp-lab-choice" role="group" aria-label="How you will use the inventory"><label><input type="radio" name="etp-use-mode" value="learner" checked> Student / Independent Learner</label><label><input type="radio" name="etp-use-mode" value="teacher"> Teacher / Classroom Use</label></div><button class="etp-lab-start" type="button" id="etp-start-inventory">Start My Learning Inventory →</button><p class="tiny">Your responses remain in this page session; no account is required. You can print or save your report as a PDF. Results describe preferences, not intelligence or ability.</p>';
lab.before(intro);
const help=document.createElement('div');help.className='etp-lab-help';help.innerHTML='<strong>Answer the statements here.</strong> Select a number from 1 to 5 for each statement, then use Continue to move to the next section. You can return to earlier sections with Back.';
side.prepend(help);
const nav=document.createElement('nav');nav.className='etp-lab-stepnav';nav.setAttribute('aria-label','Ten-section inventory progress');help.after(nav);
const feedback=document.createElement('p');feedback.className='etp-lab-feedback';feedback.setAttribute('role','status');nav.after(feedback);
let mode='learner',previous=-1;
function activeStep(){return Number(side.querySelector('.q-step.active')?.dataset.step||0)}
function sync(){
const current=activeStep();nav.replaceChildren();const steps=[...side.querySelectorAll('.q-step')];
for(let i=0;i<steps.length;i++){const inputs=[...steps[i].querySelectorAll('input[type=radio]')],names=[...new Set(inputs.map(x=>x.name))],count=names.filter(n=>inputs.some(x=>x.name===n&&x.checked)).length;
const chip=document.createElement('button');chip.type='button';chip.textContent=String(i+1);chip.title='Section '+(i+1)+': '+count+' of '+names.length+' responses';chip.setAttribute('aria-label',chip.title);chip.disabled=true;if(i===current)chip.setAttribute('aria-current','step');nav.append(chip)}
if(current!==previous){feedback.textContent='Section '+(current+1)+' of '+steps.length+' • 1 = Not like me at all; 5 = Very much like me';previous=current}
}
intro.querySelectorAll('input[name=etp-use-mode]').forEach(el=>el.addEventListener('change',()=>{if(el.checked)mode=el.value}));
document.getElementById('etp-start-inventory').addEventListener('click',()=>{profile.classList.add('etp-lab-started');sync();lab.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion:reduce)').matches?'instant':'smooth',block:'start'});setTimeout(()=>side.querySelector('.q-step.active input[type=radio]')?.focus({preventScroll:true}),200)});
side.addEventListener('click',e=>{const button=e.target.closest('.step-actions button');if(!button||!/Continue|Generate my profile/i.test(button.textContent))return;
const step=side.querySelector('.q-step.active');if(!step)return;const names=[...new Set([...step.querySelectorAll('input[type=radio]')].map(x=>x.name))];
const missing=names.find(n=>!step.querySelector('input[name="'+n+'"]:checked'));
if(missing){feedback.textContent='Please rate all five statements before continuing.';step.querySelector('input[name="'+missing+'"]')?.focus()}},true);
side.addEventListener('change',e=>{if(e.target.matches('input[type=radio]')){feedback.textContent='Choice selected. Continue after rating all five statements.';sync()}});
const counter=document.getElementById('pageCounter');
function onCounter(){sync();if(!counter?.textContent.includes('COMPLETE'))return;
setTimeout(()=>{const report=document.getElementById('finalReport');if(!report?.classList.contains('show'))return;
if(!report.querySelector('.etp-report-instructions')){const box=document.createElement('p');box.className='etp-report-instructions';box.textContent=mode==='teacher'?'Classroom interpretation: use these responses to start conversations about study strategies, not to group students into fixed learning types.':'Your results describe reported preferences, not fixed ability. Try the suggested strategies, practice retrieval, and measure what helps you remember later.';report.prepend(box)}
report.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion:reduce)').matches?'instant':'smooth',block:'start'})},150)}
if(counter)new MutationObserver(onCounter).observe(counter,{childList:true,characterData:true,subtree:true});
const report=document.getElementById('finalReport');report?.addEventListener('click',e=>{const b=e.target.closest('button');if(b&&/start over|restart|try again/i.test(b.textContent))setTimeout(()=>{profile.classList.remove('etp-lab-started');previous=-1;intro.scrollIntoView({behavior:'smooth',block:'start'})},100)});
const research=document.getElementById('research'),note=research?.querySelector('.section-head p');if(note)note.append(' The inventory scores are not validated measures of learning aptitude and should not be used to restrict instruction or learner opportunities.');
sync();
})();