/* Topic-specific media, source reading, and accessible visual context. */
(() => {
  const modal = document.getElementById('modal');
  const chart = document.getElementById('modalChart');
  const buttons = [...document.querySelectorAll('main.timeline .explore')];
  let token = 0, opener = null, coastline;
  const catalog = fetch('media/deeper-learning.json?v=20261113-1').then(r => {
    if (!r.ok) throw new Error('Media catalog unavailable');
    return r.json();
  });
  // Handle a failed preload without suppressing the visible fallback on opening.
  catalog.catch(() => {});
  function el(tag, cls, text) {
    const node = document.createElement(tag);
    if (cls) node.className = cls;
    if (text !== undefined) node.textContent = text;
    return node;
  }
  function link(title, url) {
    const a = el('a', '', title + ' ↗');
    a.href = url; a.target = '_blank'; a.rel = 'noopener noreferrer';
    return a;
  }
  const heading = text => el('h4', '', text);
  const mount = el('section', 'deeper-media');
  mount.setAttribute('aria-label', 'Watch and investigate');
  document.getElementById('modalText').after(mount);

  function videoCard(record, index) {
    const card = el('article', 'learning-video');
    const watch = el('button', 'video-poster');
    watch.type = 'button'; watch.setAttribute('aria-label', 'Play ' + record.title);
    if (record.provider !== 'brightcove') {
      const image = el('img'); image.src = 'https://i.ytimg.com/vi/' + record.id + '/hqdefault.jpg';
      image.alt = ''; image.loading = 'lazy'; image.width = 480; image.height = 360; watch.append(image);
    }
    const play = el('span', 'video-play', '▶'); play.setAttribute('aria-hidden', 'true');
    watch.append(play);
    const frameBox = el('div', 'video-frame-box'); frameBox.append(watch);
    card.append(frameBox, el('h5', '', record.title), el('p', 'video-publisher', record.publisher), link(record.provider === 'brightcove' ? 'Open museum video and lesson' : 'Watch on YouTube', record.watchUrl || 'https://www.youtube.com/watch?v=' + record.id));
    watch.addEventListener('click', () => {
      modal.querySelectorAll('.deeper-media iframe').forEach(frame => {
        const parent = frame.closest('.video-frame-box');
        parent.replaceChildren(parent._poster); // Stop the previous player.
      });
      frameBox._poster = watch;
      const frame = el('iframe');
      frame.src = record.embedUrl ? record.embedUrl + '&autoplay=true' : 'https://www.youtube-nocookie.com/embed/' + record.id + '?autoplay=1&rel=0&playsinline=1';
      frame.title = record.title + ' — ' + record.publisher;
      frame.allow = 'autoplay; encrypted-media; picture-in-picture; fullscreen';
      frame.allowFullscreen = true;
      frame.referrerPolicy = 'strict-origin-when-cross-origin';
      frameBox.replaceChildren(frame); frame.focus();
    });
    return card;
  }

  function renderVisual(visual, sources) {
    chart.replaceChildren(heading(visual.title)); chart.style.display = 'block';
    if (visual.kind === 'bars') {
      chart.append(el('p', 'visual-note', visual.unit));
      const graph = el('div', 'evidence-bars');
      visual.nodes.forEach((node, index) => {
        const row = el('div', 'evidence-bar-row');
        const track = el('div', 'evidence-bar-track');
        const bar = el('div', 'evidence-bar');
        bar.style.width = (visual.values[index] / visual.maximum * 100) + '%';
        track.append(bar); row.append(el('span', '', node.label), track, el('strong', '', visual.values[index] + '%')); graph.append(row);
      });
      const axis = el('div', 'evidence-axis');
      [0, 3, 6, 9, 12].forEach(n => axis.append(el('span', '', n + '%')));
      graph.append(axis); chart.append(graph);
    } else {
      const list = el(visual.kind === 'sequence' || visual.kind === 'timeline' ? 'ol' : 'ul', 'visual-nodes visual-' + visual.kind);
      visual.nodes.forEach(node => {
        const item = el('li'); item.append(el('strong', '', node.label), el('p', '', node.text)); list.append(item);
      });
      chart.append(list);
    }
    chart.append(el('p', 'visual-note', visual.note || (visual.kind === 'compare' ? 'Evidence comparison: these are categories of interpretation, not numerical measurements.' : 'Concept diagram: connections are schematic, not a measured scale or a claim of one inevitable outcome.')));
    const cite = el('p', 'visual-source', 'Source reading: ');
    cite.append(link(sources[0].title, sources[0].url)); chart.append(cite);
  }

  async function renderMap(data, currentToken) {
    const section = el('section', 'learning-map'); section.append(heading('Geographic context'));
    const box = el('div', 'map-box'); section.append(box, el('p', 'visual-note', data.note));
    chart.append(section);
    try {
      coastline ||= fetch('media/land-outline.json').then(r => { if (!r.ok) throw new Error('Map unavailable'); return r.json(); });
      const land = await coastline;
      if (currentToken !== token) return;
      const [west, south, east, north] = data.bounds;
      const width = 700, height = 280;
      const project = (lon, lat) => [(lon - west) / (east - west) * width, (north - lat) / (north - south) * height];
      const ns = 'http://www.w3.org/2000/svg';
      const svg = document.createElementNS(ns, 'svg');
      svg.setAttribute('viewBox', '0 0 700 280'); svg.setAttribute('role', 'img');
      const title = document.createElementNS(ns, 'title'); title.textContent = 'Reference map of ' + data.points.map(p => p.name).join(', '); svg.append(title);
      const desc = document.createElementNS(ns, 'desc'); desc.textContent = data.note; svg.append(desc);
      const landPath = document.createElementNS(ns, 'path');
      landPath.setAttribute('class', 'map-land');
      landPath.setAttribute('d', land.polygons.map(ring => ring.map(([x,y],i) => {const p=project(x,y);return (i ? 'L' : 'M') + p.map(n=>n.toFixed(1)).join(',');}).join(' ')+'Z').join(' ')); svg.append(landPath);
      const route = document.createElementNS(ns, 'polyline');
      route.setAttribute('points', data.points.map(p=>project(p.lon,p.lat).join(',')).join(' ')); route.setAttribute('class','map-connection'); svg.append(route);
      data.points.forEach((p,index) => {
        const [x,y] = project(p.lon,p.lat);
        const circle = document.createElementNS(ns,'circle'); circle.setAttribute('cx',x);circle.setAttribute('cy',y);circle.setAttribute('r',5);svg.append(circle);
        const label = document.createElementNS(ns,'text');label.setAttribute('x',Math.max(8,Math.min(width-8,x)));label.setAttribute('y',Math.max(18,Math.min(height-8,y+(index%2?25:-13))));label.setAttribute('text-anchor',x>width-110?'end':x<110?'start':'middle');label.textContent=p.name;svg.append(label);
      });
      box.append(svg);
      const locations = el('p','map-locations',data.points.map(p=>p.name).join(' · '));section.append(locations);
      const credit = el('p','visual-source','Geography: ');credit.append(link('Natural Earth (public domain)',land.sourceUrl),document.createTextNode(' · Historical context: '),link(data.source.title,data.source.url));section.append(credit);
    } catch { box.append(el('p','','The map cannot load right now. The named locations and source reading remain available below.'),el('p','',data.points.map(p=>p.name).join(' · '))); }
  }

  async function render(button) {
    const currentToken = ++token; opener = button;
    mount.replaceChildren(heading('Watch and investigate'),el('p','','Loading selected learning resources…'));
    const card = button.closest('.event');
    document.getElementById('modalTitle').textContent = card.querySelector('h3').textContent;
    document.getElementById('modalVideoWrap').style.display='none';
    document.getElementById('modalVideo').removeAttribute('src');
    modal.querySelector('.modal-card').scrollTop=0;
    modal.querySelector('.close').focus();
    try {
      const data = await catalog;
      if (currentToken !== token) return;
      const topic = data.topics[buttons.indexOf(button)];
      if (!topic || topic.cardTitle !== card.querySelector('h3').textContent) throw new Error('Topic mismatch');
      mount.replaceChildren(heading('Watch and investigate'),el('p','video-fit',topic.videoFit));
      const grid = el('div','learning-video-grid');topic.videoIds.forEach((id,i)=>grid.append(videoCard(data.videos[id],i)));mount.append(grid);
      if (topic.lead) document.getElementById('modalText').textContent=topic.lead;
      document.getElementById('modalWhy').textContent=topic.why;
      document.getElementById('modalEvidence').textContent=topic.evidence;
      document.getElementById('modalContext').textContent=topic.context;
      renderVisual(topic.visual,topic.sources);
      if (topic.map) renderMap(topic.map,currentToken);
      const question = el('section','learning-question');question.append(heading('Investigate the evidence'),el('p','',topic.question));chart.append(question);
      const sourceBox = document.getElementById('modalSource');sourceBox.replaceChildren(heading('Read and compare sources'));
      topic.sources.forEach(s=>sourceBox.append(link(s.title,s.url)));
      sourceBox.append(el('p','media-caption','Videos are selected educational resources, not a view-count ranking. Some are broader context, as labeled above. Choose a question before watching; compare the video’s claims with the source reading.'));
      const oldLink=document.getElementById('modalSourceLink');oldLink.href=topic.sources[0].url;oldLink.textContent='Open source reading ↗';oldLink.style.display='inline-flex';
    } catch {
      if(currentToken !== token)return;
      mount.replaceChildren(heading('Learning resources'),el('p','','The media list is temporarily unavailable. The historical overview and source reading below are still available.'));
    }
  }
  function stop() {++token;mount.querySelectorAll('iframe').forEach(f=>f.remove());if(opener?.isConnected)opener.focus();}
  modal.addEventListener('keydown',event=>{
    if(event.key!=='Tab')return;
    const focusable=[...modal.querySelectorAll('button,a[href],iframe')].filter(n=>n.getClientRects().length);
    const first=focusable[0],last=focusable.at(-1);
    if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus();}
    else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus();}
  });
  window.ETPTimelineDetails={render,stop};
})();
