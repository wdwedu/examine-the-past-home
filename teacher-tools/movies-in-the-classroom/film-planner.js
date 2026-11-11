(() => {
  'use strict';
  const $=id=>document.getElementById(id);
  const esc=value=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const list=items=>'<ol>'+items.map(s=>`<li>${esc(s)}</li>`).join('')+'</ol>';
  const selected=(window.ETP_FILMS||[]).find(f=>f.id===new URLSearchParams(location.search).get('film'));
  const fields=['customTitle','unitFocus','sceneNotes','gradeBand','viewFormat','purpose','time','product'];
  const key='etp-film-plan-'+(selected?.id||'custom');
  let storageOK=true;
  if(selected){
    $('customTitle').value=selected.title;$('unitFocus').value=selected.inquiry;$('sceneNotes').value=selected.scene;
    $('gradeBand').value=selected.grades.includes('6–8')?'Grades 6–8':'Grades 9–12';
    if(selected.type==='Documentaries')$('viewFormat').value='Documentary Segment';
    const box=$('filmSelection');box.hidden=false;
    box.innerHTML=`<div class="movie-kicker">Selected from the Film Finder</div><h3>${esc(selected.title)}</h3><p>${esc(selected.context)}</p><p><strong>Preview notes:</strong> ${esc(selected.caution)}</p><a href="library/?film=${selected.id}#filmBrief">View teaching brief / change selection ↗</a>`;
  }
  try{const saved=JSON.parse(localStorage.getItem(key)||'null');if(saved&&typeof saved==='object')for(const id of fields){
    const el=$(id);if(typeof saved[id]==='string'&&(el.tagName!=='SELECT'||Array.from(el.options).some(o=>o.value===saved[id])))el.value=saved[id];
  }}catch(_){storageOK=false;}
  function enhance(){
    // Do not attach a catalog film's facts to a custom replacement title.
    const film=selected&&$('customTitle').value.trim()===selected.title?selected:null;
    const title=$('customTitle').value.trim()||'Historical Film Inquiry';
    const inquiry=$('unitFocus').value.trim()||film?.inquiry||'How does this film shape our understanding of its subject, and what evidence would test its account?';
    const notes=$('sceneNotes').value.trim();
    const time=$('time').value;
    const pace=time.includes('20')?[5,12,8]:time.includes('45')?[10,25,15]:time.includes('90')?[15,50,25]:[10,30,10];
    const total=pace.reduce((a,b)=>a+b,0);
    try{localStorage.setItem(key,JSON.stringify(Object.fromEntries(fields.map(id=>[id,$(id).value]))));}catch(_){storageOK=false;}
    const mismatch=film&&$('gradeBand').value==='Grades 6–8'&&!film.grades.includes('6–8')?'<p><strong>Grade mismatch:</strong> Catalog guidance for this title is grades 9–12. Review an excerpt and an alternative task before using with younger students.</p>':'';
    const intro=`<div class="movie-plan-kicker">Adaptable Teacher Plan</div><h3>${esc(title)}</h3><h4>Essential question</h4><p>${esc(inquiry)}</p>${mismatch}<p><strong>Learning target:</strong> Use specific film details and a related source to construct and qualify an answer to the inquiry question.</p>${film?`<h4>Key teaching points</h4>${list(film.points)}<p><strong>Teacher preview:</strong> ${esc(film.caution)}</p>`:'<p>Custom title: add your own context and review the film before assigning the general inquiry prompts below.</p>'}<h4>Materials / preparation</h4><p>Preview the actual edition, choose excerpt(s), record start/stop times and check captions. Select a credible comparison source and an age-appropriate passage. Prepare an evidence log and a map or timeline where relevant. Offer an equivalent source-based task for students who cannot view the material.</p><h4>Session timing</h4><p><strong>${total}-minute session:</strong> ${pace[0]} minutes before viewing, ${pace[1]} minutes for viewing and pauses, ${pace[2]} minutes for source comparison and synthesis.</p>${$('viewFormat').value==='Full Film'?'<p>This is a session template, not the film’s runtime. Divide full-film viewing across enough sessions to preserve preparation, pauses and synthesis.</p>':'<p>Fit chosen excerpts inside the viewing window, leaving time to pause and collect evidence.</p>'}${time==='Multi-day lesson'?'<p>Day 1: establish context and initial claims. Middle sessions: repeat the viewing-and-verification cycle. Final session: synthesize sources and complete the student product. Adjust the number of sessions to your film and timetable.</p>':''}<h4>Your scene notes</h4><p style="white-space:pre-wrap">${esc(notes||'Select and preview your excerpt; add its edition-specific times in the form.')}</p><p class="finder-note">Scene cues suggest material to preview; they are not verified timestamps.</p>${film?`<h4>Film-specific discussion questions</h4>${list(film.questions)}`:''}<h4>Teacher opening prompt</h4><p>“Our inquiry is: ${esc(inquiry)} As you watch, record what the film shows separately from what you think it means.”</p>`;
    const end=`<h4>Pause and re-entry prompt</h4><p>“Pause and record one exact detail. Take a moment to explain what it might suggest. Now let’s return to the scene and test that interpretation.”</p><h4>Student viewing companion</h4>${list(['Before: What do I already know, and what is our inquiry question?','Observe: Record two exact details. Add a scene time if available.','Interpret: What claim or perspective do these details suggest?','Verify: What does the comparison source support, challenge or leave uncertain?','Conclude: Answer the inquiry question and identify one limitation of your evidence.'])}<h4>Assessment — 8-point evidence check</h4>${list(['Claim: 0–2 points for a clear answer to the inquiry question.','Film evidence: 0–2 points for specific, relevant details.','Source comparison: 0–2 points for an accurate source connection.','Reasoning and limits: 0–2 points for explaining the connection and a limitation or uncertainty.'])}<p>For each criterion: 0 = missing or inaccurate; 1 = partial or general; 2 = specific, accurate and explained. Check claims against the actual scene and source. Multiple interpretations can earn full credit when supported; these open questions do not have a single automated answer key.</p>${film?`<h4>Source starting points</h4><p><a href="${esc(film.evidence)}" target="_blank" rel="noopener">${esc(film.evidenceLabel)}</a><br><a href="${esc(film.source)}" target="_blank" rel="noopener">Title / publisher background</a></p><p>The film’s own site explains its account; add an independent source to test its claims. Review linked material before assigning.</p>`:''}<div class="film-plan-actions"><button type="button" id="printFilmPlan">Print / Save as PDF</button><button type="button" id="downloadFilmPlan">Download Plan Text</button></div><p class="finder-note">${storageOK?'Planning settings save in this browser. Select Build My Viewing Plan after changing settings.':'Browser saving is unavailable; download the plan to keep it.'} This plan is a draft for teacher review.</p>`;
    const out=$('moviePlan');
    out.querySelector('.movie-plan-kicker')?.remove();out.querySelector('h3')?.remove();
    out.insertAdjacentHTML('afterbegin',intro);out.insertAdjacentHTML('beforeend',end);
    out.querySelectorAll('a').forEach(a=>a.style.color='#fff200');
    $('printFilmPlan').addEventListener('click',()=>window.print());
    $('downloadFilmPlan').addEventListener('click',()=>{
      const copy=out.cloneNode(true);copy.querySelector('.film-plan-actions')?.remove();
      const url=URL.createObjectURL(new Blob([copy.innerText+'\n\n'+(film?film.evidence+'\n'+film.source:'')],{type:'text/plain;charset=utf-8'}));
      const a=document.createElement('a');a.href=url;a.download='ETP_Film_Lesson_Plan.txt';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
    });
  }
  $('buildLesson').addEventListener('click',enhance);
  $('buildLesson').click();
})();
