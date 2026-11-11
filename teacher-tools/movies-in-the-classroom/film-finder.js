(() => {
  'use strict';
  const films = window.ETP_FILMS || [];
  const $ = id => document.getElementById(id);
  const esc = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  $('collectionIntro').textContent = `${films.length} starting selections • ${films.filter(f=>f.type==='Feature films').length} feature films • ${films.filter(f=>f.type==='Documentaries').length} documentaries. Grade suggestions are editorial guidance for teacher planning; preview the film and trailer before classroom use.`;
  $('filmType').options[0].textContent = `All selections (${films.length})`;
  let saved = [];
  try { const data = JSON.parse(localStorage.getItem('etp-saved-films') || '[]'); if(Array.isArray(data)) saved = data.filter(id => films.some(f => f.id === id)); } catch (_) {}
  for(const [id,key] of [['filmTopic','topics'],['filmEra','era'],['filmRegion','region']]) {
    [...new Set(films.flatMap(f => f[key]))].sort().forEach(value => $(id).add(new Option(value,value)));
  }
  function render() {
    const query = $('filmSearch').value.trim().toLocaleLowerCase();
    const found = films.filter(f => (!$('filmType').value || f.type === $('filmType').value) && (!$('filmGrade').value || f.grades.includes($('filmGrade').value)) && (!$('filmTopic').value || f.topics.includes($('filmTopic').value)) && (!$('filmEra').value || f.era === $('filmEra').value) && (!$('filmRegion').value || f.region === $('filmRegion').value) && (!$('savedOnly').checked || saved.includes(f.id)) && (!query || [f.title,f.context,f.region,...f.topics,...f.points].join(' ').toLocaleLowerCase().includes(query)));
    $('resultCount').textContent = `${found.length} of ${films.length} selections`;
    $('filmGrid').innerHTML = found.length ? found.map(f => `<article class="finder-card"><button type="button" class="finder-preview" data-trailer="${f.id}" aria-label="Watch ${esc(f.title)} trailer"><img src="https://i.ytimg.com/vi/${f.video}/hqdefault.jpg" alt="${esc(f.title)} YouTube trailer thumbnail" loading="lazy" width="480" height="270"><span>▶ Watch trailer</span></button><div class="finder-card-body"><div class="finder-tags"><span class="finder-tag">${f.type}</span><span class="finder-tag">${f.year}</span></div><h3>${esc(f.title)}</h3><div class="finder-meta">Grades ${f.grades.join(' / ')} • ${f.region}</div><p class="finder-summary">${esc(f.context)}</p><div class="finder-tags">${f.topics.map(t => `<span class="finder-tag">${esc(t)}</span>`).join('')}</div><details><summary>Content &amp; preview notes</summary><p>${esc(f.caution)}</p></details><div class="finder-card-actions"><button type="button" class="finder-select" data-select="${f.id}">Explore &amp; choose</button><button type="button" data-save="${f.id}" aria-label="${saved.includes(f.id)?'Unsave':'Save'} ${esc(f.title)}" aria-pressed="${saved.includes(f.id)}">${saved.includes(f.id)?'★ Saved':'☆ Save'}</button></div></div></article>`).join('') : '<div class="finder-empty"><h3>No matching selections yet</h3><p>Try a broader topic or reset the filters. This growing collection does not cover every era yet.</p><button type="button" id="emptyReset">Reset filters</button></div>';
    $('emptyReset')?.addEventListener('click', reset);
    $('filmGrid').querySelectorAll('img').forEach(img => img.addEventListener('error',()=>{img.remove();},{once:true}));
  }
  function reset() { for(const id of ['filmSearch','filmType','filmGrade','filmTopic','filmEra','filmRegion']) $(id).value=''; $('savedOnly').checked=false;render(); }
  function brief(f) {
    const box = $('filmBrief');box.hidden=false;
    box.innerHTML = `<div class="finder-brief"><div class="movie-kicker">Your Selected Film • Teaching Brief</div><h2 tabindex="-1">${esc(f.title)}</h2><p>${esc(f.context)}</p><p><strong>Planning guidance:</strong> Grades ${f.grades.join(' / ')} • ${f.era} • ${f.region}. Teacher preview required.</p><h3>Essential question</h3><p>${esc(f.inquiry)}</p><div class="finder-brief-grid"><div><h4>Key teaching points</h4><ul>${f.points.map(p=>`<li>${esc(p)}</li>`).join('')}</ul><h4>Clip planning cue</h4><p>${esc(f.scene)}</p><p class="finder-note">This is a scene-selection cue, not a verified timestamp. Preview your edition and record your chosen start/stop times in the planner.</p></div><div><h4>Questions to take into viewing</h4><ol>${f.questions.map(q=>`<li>${esc(q)}</li>`).join('')}</ol><h4>Preview notes</h4><p>${esc(f.caution)}</p></div></div><p><a href="${esc(f.evidence)}" target="_blank" rel="noopener">${esc(f.evidenceLabel)} ↗</a> • <a href="${esc(f.source)}" target="_blank" rel="noopener">Publisher / title background ↗</a></p><p class="finder-note">These links are starting points for teacher review. A film’s own site explains its account; it is not independent corroboration.</p><div class="movie-actions"><a class="movie-primary" href="../?film=${f.id}#planner">Use This Film in My Lesson</a><button type="button" data-trailer="${f.id}">▶ Preview Trailer</button><a href="#catalog">Back to results ↑</a></div></div>`;
    box.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'start'});box.querySelector('h2').focus({preventScroll:true});
    history.replaceState(null,'',`?film=${f.id}#filmBrief`);
  }
  const dialog = $('trailerDialog');
  function trailer(f) {
    $('trailerTitle').textContent=`${f.title} — Trailer`;
    $('youtubeFallback').href=`https://www.youtube.com/watch?v=${f.video}`;
    $('trailerPlayer').innerHTML=`<iframe title="${esc(f.title)} trailer" src="https://www.youtube-nocookie.com/embed/${f.video}?rel=0" allow="encrypted-media; picture-in-picture; fullscreen" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`;
    dialog.showModal();
  }
  document.addEventListener('click', event => {
    const b = event.target.closest('[data-trailer],[data-select],[data-save]');if(!b)return;
    const f = films.find(f=>f.id===(b.dataset.trailer||b.dataset.select||b.dataset.save));if(!f)return;
    if(b.dataset.trailer)trailer(f);
    else if(b.dataset.select)brief(f);
    else {saved=saved.includes(f.id)?saved.filter(id=>id!==f.id):[...saved,f.id];try{localStorage.setItem('etp-saved-films',JSON.stringify(saved));}catch(_){$('saveNote').textContent='Browser storage is unavailable. Saved films will last only while this page is open.';}const scroll=window.scrollY;render();document.querySelector(`[data-save="${f.id}"]`)?.focus({preventScroll:true});window.scrollTo(0,scroll);}
  });
  for(const id of ['filmSearch','filmType','filmGrade','filmTopic','filmEra','filmRegion','savedOnly'])$(id).addEventListener(id==='filmSearch'?'input':'change',render);
  $('clearFilters').addEventListener('click',reset);
  $('closeTrailer').addEventListener('click',()=>dialog.close());
  dialog.addEventListener('close',()=>{$('trailerPlayer').replaceChildren();});
  render();
  const selected = films.find(f=>f.id===new URLSearchParams(location.search).get('film'));if(selected)brief(selected);
})();
