(()=>{document.querySelectorAll('a[href^="#"]').forEach(a=>{a.addEventListener('click',e=>{const id=a.getAttribute('href');if(!id||id==='#')return;const el=document.querySelector(id);if(!el)return;e.preventDefault();el.scrollIntoView({behavior:'smooth',block:'start'});history.replaceState(null,'',id);});});})();

(()=> {
  if(!document.querySelector('link[href*="site-shell.css"]')){
    const l=document.createElement('link');
    l.rel='stylesheet'; l.href='assets/site-shell.css?v=48';
    document.head.appendChild(l);
  }
  if(!document.getElementById('etpSiteHeader')){
    const s=document.createElement('script');
    s.src='assets/site-shell.js?v=48';
    s.dataset.etpRoot='./';
    s.dataset.noFooter='true';
    document.body.appendChild(s);
  }
})();