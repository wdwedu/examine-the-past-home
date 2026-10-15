/* Compatibility entry: all game pages use the same header/footer as Home. */
(()=>{if(document.getElementById('etpSiteHeader'))return;
const src=new URL('../../assets/site-shell.js?v=20261015-etp-r2',document.currentScript.src).href;
if([...document.scripts].some(s=>s.src===src))return;
const script=document.createElement('script');script.src=src;script.async=false;document.head.append(script);
})();
