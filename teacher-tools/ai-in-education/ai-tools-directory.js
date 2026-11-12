(() => {
'use strict';
const $=id=>document.getElementById(id),tools=window.ETP_AI_TOOLS||[];
const esc=v=>String(v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const slug=v=>v.toLowerCase().replace(/[^a-z0-9]+/g,'-');
const safeURL=v=>{if(typeof v!=='string'||!v.trim())return null;try{const u=new URL(v,location.href);return ['https:','http:'].includes(u.protocol)?u.href:null;}catch(_){return null;}};
const categories=[...new Set(tools.map(t=>t.category))];
const icons={'Language Models & Assistants':'💬','Research & Sources':'🔎','Lesson Planning':'📚','Assessment & Practice':'✅','Reading & Writing':'✍️','Design & Images':'🎨','Video & Avatars':'🎬','Audio & Transcription':'🎙️','Presentations':'🖥️','Classroom Workflow':'🗂️'};
let saved=[],compared=[],shown=12;
try{const a=JSON.parse(localStorage.getItem('etp-ai-tool-shortlist')||'[]');if(Array.isArray(a))saved=a.filter(id=>tools.some(t=>t.id===id));}catch(_){}
categories.forEach(c=>$('toolCategory').add(new Option(c,c)));
function card(t){const affiliate=safeURL(t.affiliateUrl),destination=affiliate||safeURL(t.url),alt=t.siteAlternative;return `<article class="ai-tool-card"><div class="ai-prompt-tag">${esc(t.category)}</div><h4>${esc(t.name)}</h4><p>${esc(t.description)}</p><p class="ai-tool-use"><strong>Try it for:</strong> ${esc(t.bestFor)}</p><details><summary>What to check</summary><p>${esc(t.reviewNote)}</p><a href="${esc(t.source)}" target="_blank" rel="noopener">Official product details ↗</a></details>${alt?`<p class="ai-tool-local">On this site: <a href="${esc(alt.url)}">${esc(alt.label)}</a></p>`:''}<div class="ai-tool-actions"><a class="ai-tool-visit" href="${esc(destination)}" target="_blank" rel="${affiliate?'sponsored noopener':'noopener'}">Visit ${esc(t.name)} ↗</a><button type="button" data-tool-save="${t.id}" aria-pressed="${saved.includes(t.id)}" aria-label="${saved.includes(t.id)?'Unsave':'Save'} ${esc(t.name)}">${saved.includes(t.id)?'★ Saved':'☆ Save'}</button><button type="button" data-tool-compare="${t.id}" aria-pressed="${compared.includes(t.id)}" aria-label="${compared.includes(t.id)?'Remove from comparison':'Compare'} ${esc(t.name)}">${compared.includes(t.id)?'✓ Comparing':'Compare'}</button></div>${affiliate?'<p class="ai-affiliate-label">Affiliate link · A qualifying purchase may support this free site.</p>':''}</article>`;}
function render(){
 const query=$('toolSearch').value.trim().toLowerCase(),category=$('toolCategory').value;
 const found=tools.filter(t=>(!category||t.category===category)&&(!$('toolsSavedOnly').checked||saved.includes(t.id))&&(!query||[t.name,t.category,t.description,t.bestFor].join(' ').toLowerCase().includes(query)));
 const visible=found.slice(0,shown);
 $('toolCount').textContent=`${found.length} matching tools · ${saved.length} saved`;
 $('toolCategoryLinks').innerHTML=`<button type="button" data-tool-category="" aria-pressed="${!category}">All 40</button>`+categories.map(c=>`<button type="button" data-tool-category="${esc(c)}" aria-pressed="${category===c}">${icons[c]||'✦'} ${esc(c)}</button>`).join('');
 $('toolCards').innerHTML=found.length?categories.map(c=>{const items=visible.filter(t=>t.category===c);return items.length?`<section class="ai-tool-shelf" aria-labelledby="tool-heading-${slug(c)}"><div class="ai-tool-shelf-head"><h3 id="tool-heading-${slug(c)}">${icons[c]||'✦'} ${esc(c)}</h3><span>${found.filter(t=>t.category===c).length} selections</span></div><div class="ai-tool-grid">${items.map(card).join('')}</div></section>`:'';}).join(''):'<div class="ai-empty"><h3>No tools match those choices</h3><p>Try a broader search or choose Reset. Save a tool with ☆ Save to keep it in your shortlist.</p></div>';
 $('toolPaging').innerHTML=(shown<found.length?`<button type="button" id="moreTools">Show ${Math.min(12,found.length-shown)} More Tools ↓</button>`:'')+(shown>12?'<button type="button" id="fewerTools">Show Fewer ↑</button>':'');
 $('moreTools')?.addEventListener('click',()=>{shown+=12;render();});$('fewerTools')?.addEventListener('click',()=>{shown=Math.max(12,shown-12);render();$('ai-tools').scrollIntoView({block:'start'});});
 $('showToolComparison').textContent=`Compare Selected (${compared.length}/3)`;
 $('toolAffiliateDisclosure').hidden=!tools.some(t=>safeURL(t.affiliateUrl));
}
function reset(){shown=12;$('toolSearch').value='';$('toolCategory').value='';$('toolsSavedOnly').checked=false;render();}
$('toolSearch').addEventListener('input',()=>{shown=12;render();});for(const id of ['toolCategory','toolsSavedOnly'])$(id).addEventListener('change',()=>{shown=12;render();});$('resetTools').addEventListener('click',reset);
$('toolCategoryLinks').addEventListener('click',e=>{const b=e.target.closest('[data-tool-category]');if(!b)return;$('toolCategory').value=b.dataset.toolCategory;shown=12;render();});
$('toolCards').addEventListener('click',e=>{const b=e.target.closest('[data-tool-save],[data-tool-compare]');if(!b)return;const id=b.dataset.toolSave||b.dataset.toolCompare,y=scrollY;if(b.dataset.toolSave){saved=saved.includes(id)?saved.filter(x=>x!==id):[...saved,id];try{localStorage.setItem('etp-ai-tool-shortlist',JSON.stringify(saved));}catch(_){$('toolSaveNote').textContent='Saving is available for this visit. Browser storage is unavailable.';}}else{if(compared.includes(id))compared=compared.filter(x=>x!==id);else if(compared.length<3)compared.push(id);else{$('toolCount').textContent='Three tools are selected. Remove one from comparison to add another.';return;}}render();document.querySelector(`[data-${b.dataset.toolSave?'tool-save':'tool-compare'}="${id}"]`)?.focus({preventScroll:true});window.scrollTo(0,y);});
const dialog=$('toolCompareDialog');
$('showToolComparison').addEventListener('click',()=>{const selected=tools.filter(t=>compared.includes(t.id));if(selected.length<2){$('toolCount').textContent='Choose Compare on two or three tool cards, then open your comparison.';return;}
 const row=(label,fn)=>`<tr><th scope="row">${label}</th>${selected.map(t=>`<td>${fn(t)}</td>`).join('')}</tr>`;
 $('toolComparisonBody').innerHTML=`<p>Compare the task and workflow first. Check each provider for current plans, account requirements and school access.</p><div class="ai-comparison-scroll"><table><caption>Your selected AI tools</caption><thead><tr><th scope="col">Compare</th>${selected.map(t=>`<th scope="col">${esc(t.name)}</th>`).join('')}</tr></thead><tbody>${row('Category',t=>esc(t.category))}${row('Useful for',t=>esc(t.bestFor))}${row('What to check',t=>esc(t.reviewNote))}${row('Related here',t=>t.siteAlternative?`<a href="${esc(t.siteAlternative.url)}">${esc(t.siteAlternative.label)}</a>`:'Explore the prompt workshop for help preparing instructions.')}${row('Explore',t=>`<a href="${esc(safeURL(t.affiliateUrl)||safeURL(t.url))}" target="_blank" rel="${safeURL(t.affiliateUrl)?'sponsored noopener':'noopener'}">Official site${safeURL(t.affiliateUrl)?' · Affiliate link':''} ↗</a>`)}</tbody></table></div>`;dialog.showModal();});
$('closeToolComparison').addEventListener('click',()=>dialog.close());
// Close the comparison before following a related in-page link.
$('toolComparisonBody').addEventListener('click',e=>{if(e.target.closest('a[href^="#"]'))dialog.close();});
render();
})();
