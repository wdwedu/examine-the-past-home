(async()=>{
 const BASE="/examine-the-past-home/games/assets/";
 async function inject(id,file){
   const node=document.getElementById(id); if(!node)return;
   try{const r=await fetch(BASE+file,{cache:"no-store"});if(!r.ok)throw new Error(file);node.innerHTML=await r.text();}
   catch(e){console.error("Shell load failed",file,e);}
 }
 await Promise.all([inject("game-shell-nav","nav.html"),inject("game-shell-footer","footer.html")]);

 document.querySelectorAll('a[href^="https://www.examinethepast.com"]').forEach(a=>{
   a.addEventListener("click",e=>{
     const href=a.href;if(!href)return;
     e.preventDefault();
     try{window.top.location.assign(href);}
     catch(err){window.open(href,"_blank","noopener");}
   });
 });

 const btn=document.getElementById("soundToggle");
 const icon=document.getElementById("soundIcon");
 const label=document.getElementById("soundText");
 const audio=document.getElementById("gameAudio");
 if(!btn||!audio)return;

 const source=document.body.dataset.musicSource||"https://wdwedu.github.io/blooms-taxonomy/";
 const volume=parseFloat(document.body.dataset.musicVolume||".28");
 let loaded=false,wantsSound=true;
 audio.volume=Number.isFinite(volume)?volume:.28;

 async function loadTrack(){
   if(loaded&&audio.src)return true;
   const r=await fetch(source,{cache:"force-cache"});
   if(!r.ok)throw new Error("audio unavailable");
   const t=await r.text();
   const m=t.match(/data:audio\/mpeg;base64,[^"']+/);
   if(!m)throw new Error("track missing");
   audio.src=m[0];loaded=true;return true;
 }
 function ui(){
   const on=wantsSound&&!audio.paused;
   icon.textContent=on?"🔊":"🔇";
   label.textContent=on?"Sound On":"Sound Off";
   btn.setAttribute("aria-label",on?"Turn background sound off":"Turn background sound on");
 }
 async function start(){
   try{await loadTrack();if(wantsSound)await audio.play();}catch(e){}
   ui();
 }
 btn.addEventListener("click",async()=>{
   if(!audio.paused){wantsSound=false;audio.pause();}
   else{wantsSound=true;await start();}
   ui();
 });
 window.addEventListener("load",start,{once:true});
 document.addEventListener("pointerdown",()=>{if(wantsSound&&audio.paused)start()},{once:true});
 audio.addEventListener("play",ui);audio.addEventListener("pause",ui);ui();
})();