(async()=>{
 const BASE="/examine-the-past-home/games/assets/";
 async function inject(id,file){
   const node=document.getElementById(id); if(!node)return;
   try{const r=await fetch(BASE+file,{cache:"no-store"});if(!r.ok)throw new Error(file);node.innerHTML=await r.text();}
   catch(e){console.error("Shell load failed",file,e);}
 }
 await Promise.all([inject("game-shell-nav","nav.html"),inject("game-shell-footer","footer.html")]);

 const gameNav=document.querySelector("#game-shell-nav .icon-nav");
 if(gameNav){
   const mobileToggle=document.createElement("button");
   mobileToggle.className="game-mobile-toggle";
   mobileToggle.type="button";
   mobileToggle.setAttribute("aria-label","Open navigation");
   mobileToggle.setAttribute("aria-expanded","false");
   mobileToggle.innerHTML="<span></span><span></span><span></span>";
   const mobileMenu=document.createElement("div");
   mobileMenu.className="game-mobile-menu";
   mobileMenu.hidden=true;
   mobileMenu.innerHTML=`
     <div class="game-mobile-row"><a href="/examine-the-past-home/#top" target="_top">🏠 <b>Home</b></a><a href="/examine-the-past-home/#about-us" target="_top">ℹ️ <b>About</b></a></div>
     <div class="game-mobile-heading">HISTORY HUB</div>
     <div class="game-mobile-grid">
       <a href="/examine-the-past-home/#us-history" target="_top">🇺🇸 <b>U.S. History</b></a><a href="/examine-the-past-home/#world-history" target="_top">🌍 <b>World History</b></a>
       <a href="/examine-the-past-home/#civics-government" target="_top">🏛️ <b>Civics & Government</b></a><a href="/examine-the-past-home/#geography" target="_top">🗺️ <b>Geography</b></a>
       <a href="/examine-the-past-home/#black-history" target="_top">✊🏾 <b>Black History</b></a><a href="/examine-the-past-home/#world-religions" target="_top">🕊️ <b>World Religions</b></a>
     </div>
     <div class="game-mobile-heading">EXPLORE</div>
     <div class="game-mobile-grid">
       <a href="/examine-the-past-home/#timeline" target="_top">⏳ <b>Timeline</b></a><a href="/examine-the-past-home/#history-maps" target="_top">🗺️ <b>History Maps</b></a>
       <a href="/examine-the-past-home/#today-history" target="_top">📅 <b>Today in History</b></a><a href="/examine-the-past-home/games/" target="_top">🎮 <b>History Unlocked</b></a>
     </div>
     <div class="game-mobile-heading">TEACHER TOOLS</div>
     <div class="game-mobile-grid">
       <a href="/examine-the-past-home/#blooms-taxonomy" target="_top">🧠 <b>Bloom's Taxonomy</b></a><a href="/examine-the-past-home/#movies-classroom" target="_top">🎬 <b>Movies</b></a>
       <a href="/examine-the-past-home/#classroom-management" target="_top">🏫 <b>Classroom Management</b></a><a href="/examine-the-past-home/#learner-supports" target="_top">👥 <b>Learner Supports</b></a>
     </div>
     <div class="game-mobile-row game-mobile-last">
       <a href="/examine-the-past-home/#hidden-treasures" target="_top">🛍️ <b>Shop History</b></a><a href="/examine-the-past-home/#contact-section" target="_top">📧 <b>Contact Us</b></a>
     </div>`;
   gameNav.prepend(mobileToggle);
   gameNav.appendChild(mobileMenu);
   const closeMenu=()=>{mobileMenu.hidden=true;mobileToggle.classList.remove("open");mobileToggle.setAttribute("aria-expanded","false");mobileToggle.setAttribute("aria-label","Open navigation")};
   mobileToggle.addEventListener("click",()=>{
      const open=mobileMenu.hidden;
      mobileMenu.hidden=!open;
      mobileToggle.classList.toggle("open",open);
      mobileToggle.setAttribute("aria-expanded",String(open));
      mobileToggle.setAttribute("aria-label",open?"Close navigation":"Open navigation");
   });
   mobileMenu.querySelectorAll("a").forEach(a=>a.addEventListener("click",closeMenu));
   document.addEventListener("keydown",e=>{if(e.key==="Escape")closeMenu()});
 }

 document.querySelectorAll('a[href^="https://www.examinethepast.com"]').forEach(a=>{
   a.addEventListener("click",e=>{
     const href=a.href;if(!href)return;
     e.preventDefault();
     try{window.top.location.assign(href);}
     catch(err){window.open(href,"_blank","noopener");}
   });
 });

 // Home-matched legal popup controls.
 let savedLegalScroll=0;
 const openLegalModal=(key,opener)=>{
   const modal=document.getElementById("legal-"+key);
   if(!modal)return;
   savedLegalScroll=window.scrollY;
   modal.dataset.openerId="";
   if(opener&&!opener.id){opener.id="legal-opener-"+Math.random().toString(36).slice(2)}
   if(opener)modal.dataset.openerId=opener.id;
   modal.classList.add("open");
   modal.setAttribute("aria-hidden","false");
   document.body.style.overflow="hidden";
   modal.querySelector(".legal-close-v4")?.focus({preventScroll:true});
 };
 const closeLegalModal=(modal)=>{
   if(!modal)return;
   const openerId=modal.dataset.openerId;
   modal.classList.remove("open");
   modal.setAttribute("aria-hidden","true");
   document.body.style.overflow="";
   window.scrollTo(0,savedLegalScroll);
   if(openerId)document.getElementById(openerId)?.focus({preventScroll:true});
 };
 document.querySelectorAll(".legal-open-v4").forEach(btn=>{
   btn.addEventListener("click",e=>{
     e.preventDefault();
     openLegalModal(btn.dataset.legal,btn);
   });
 });
 document.querySelectorAll(".legal-modal-v4").forEach(modal=>{
   modal.querySelector(".legal-close-v4")?.addEventListener("click",()=>closeLegalModal(modal));
   modal.querySelector(".legal-backdrop-v4")?.addEventListener("click",()=>closeLegalModal(modal));
 });
 document.addEventListener("keydown",e=>{
   if(e.key!=="Escape")return;
   const open=document.querySelector(".legal-modal-v4.open");
   if(open)closeLegalModal(open);
 });

 // Shared game-share controls. Each game automatically shares its own live URL.
 const cleanUrl=location.href.split("#")[0].replace(/([?&])build=[^&]+(&|$)/,(m,p1,p2)=>p2?p1:"").replace(/[?&]$/,"");
 const shareTitle=document.title||"History Unlocked";
 const shareText="Can you master this History Unlocked challenge?";
 const enc=encodeURIComponent;
 const shareLinks={
   facebook:"https://www.facebook.com/sharer/sharer.php?u="+enc(cleanUrl),
   x:"https://twitter.com/intent/tweet?text="+enc(shareText+" — "+shareTitle)+"&url="+enc(cleanUrl),
   pinterest:"https://www.pinterest.com/pin/create/button/?url="+enc(cleanUrl)+"&description="+enc(shareText+" — "+shareTitle),
   linkedin:"https://www.linkedin.com/sharing/share-offsite/?url="+enc(cleanUrl),
   email:"mailto:?subject="+enc("History Unlocked: "+shareTitle)+"&body="+enc(shareText+"\n\n"+cleanUrl)
 };
 Object.entries(shareLinks).forEach(([key,url])=>{const a=document.querySelector('[data-share="'+key+'"]');if(a)a.href=url;});
 const shareStatus=document.getElementById("shareStatus");
 const nativeShare=document.querySelector('[data-share="native"]');
 if(nativeShare){
   nativeShare.addEventListener("click",async()=>{
     try{
       if(navigator.share){await navigator.share({title:shareTitle,text:shareText,url:cleanUrl});}
       else if(navigator.clipboard){await navigator.clipboard.writeText(cleanUrl);if(shareStatus)shareStatus.textContent="Game link copied!";}
     }catch(e){}
   });
 }
 const instagramShare=document.querySelector('[data-share="instagram"]');
 if(instagramShare)instagramShare.addEventListener("click",async()=>{
   try{
     if(navigator.share){await navigator.share({title:shareTitle,text:shareText,url:cleanUrl});}
     else if(navigator.clipboard){await navigator.clipboard.writeText(cleanUrl);if(shareStatus){shareStatus.textContent="Game link copied — paste it into Instagram.";setTimeout(()=>shareStatus.textContent="",2400);}}
   }catch(e){}
 });
 const copyShare=document.querySelector('[data-share="copy"]');
 if(copyShare)copyShare.addEventListener("click",async()=>{
   try{
     await navigator.clipboard.writeText(cleanUrl);
     if(shareStatus){shareStatus.textContent="Game link copied!";setTimeout(()=>shareStatus.textContent="",1800);}
   }catch(e){
     const ta=document.createElement("textarea");ta.value=cleanUrl;document.body.appendChild(ta);ta.select();document.execCommand("copy");ta.remove();
     if(shareStatus){shareStatus.textContent="Game link copied!";setTimeout(()=>shareStatus.textContent="",1800);}
   }
 });

 const btn=document.getElementById("soundToggle");
 const icon=document.getElementById("soundIcon");
 const label=document.getElementById("soundText");
 const audio=document.getElementById("gameAudio");
 if(!audio)return;

 const autoplay=document.body.dataset.musicAutoplay==="true";
 const source=document.body.dataset.musicSource||"https://wdwedu.github.io/blooms-taxonomy/";
 const volume=parseFloat(document.body.dataset.musicVolume||".28");
 let loaded=false,wantsMusic=autoplay;
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
   if(!btn)return;
   const on=wantsMusic&&!audio.paused;
   if(icon)icon.textContent=on?"🔊":"🔇";
   if(label)label.textContent=on?"Music On":"Music Off";
   if(!icon&&!label)btn.textContent=on?"Music: On":"Music: Off";
   btn.setAttribute("aria-label",on?"Turn background music off":"Turn background music on");
 }
 async function startMusic(){
   try{await loadTrack();if(wantsMusic)await audio.play();}catch(e){}
   ui();
 }

 if(autoplay){
   window.addEventListener("load",startMusic,{once:true});
   document.addEventListener("pointerdown",()=>{if(wantsMusic&&audio.paused)startMusic()},{once:true});
 }else{
   wantsMusic=false;
   audio.pause();
 }
 if(btn&&autoplay){
   btn.addEventListener("click",async()=>{
     if(!audio.paused){wantsMusic=false;audio.pause();}
     else{wantsMusic=true;await startMusic();}
     ui();
   });
 }
 audio.addEventListener("play",ui);audio.addEventListener("pause",ui);ui();
})();