/* Shared, browser-local invitation timing. All durations are milliseconds. */
(function(root){
  'use strict';
  const MINUTE=60000,WEEK=7*24*60*MINUTE;
  function initial(){return {version:1,activeMs:0,dueMs:MINUTE,shows:0,cooldownUntil:0,suppressed:false};}
  function normalize(raw,now){
    if(!raw||raw.version!==1)return initial();
    const number=(v,f)=>Number.isFinite(v)&&v>=0?v:f;
    const state={version:1,activeMs:number(raw.activeMs,0),dueMs:number(raw.dueMs,MINUTE),shows:Math.min(2,Math.floor(number(raw.shows,0))),cooldownUntil:number(raw.cooldownUntil,0),suppressed:raw.suppressed===true};
    if(state.cooldownUntil && state.cooldownUntil<=now && !state.suppressed)return initial();
    // Recover interrupted second invitations without leaving an unlimited-repeat state.
    if(state.shows===2&&!state.cooldownUntil)state.cooldownUntil=now+WEEK;
    return state;
  }
  function advance(raw,elapsed,now){const s=normalize(raw,now);if(!s.suppressed&&!s.cooldownUntil)s.activeMs+=Math.max(0,elapsed);return s;}
  function eligible(raw,now){const s=normalize(raw,now);return !s.suppressed&&!s.cooldownUntil&&s.shows<2&&s.activeMs>=s.dueMs;}
  function opened(raw,now){const s=normalize(raw,now);s.shows=Math.min(2,s.shows+1);s.dueMs=s.activeMs+10*MINUTE;if(s.shows===2)s.cooldownUntil=now+WEEK;return s;}
  function dismissed(raw,now){const s=normalize(raw,now);if(s.suppressed)return s;s.shows=Math.max(1,s.shows);s.dueMs=s.activeMs+10*MINUTE;if(s.shows===2&&!s.cooldownUntil)s.cooldownUntil=now+WEEK;return s;}
  function suppress(raw,now){return {...normalize(raw,now),suppressed:true};}
  const api={initial,normalize,advance,eligible,opened,dismissed,suppress};
  if(typeof module!=='undefined'&&module.exports)module.exports=api;
  else root.ETPNewsletterPolicy=api;
})(typeof window!=='undefined'?window:globalThis);
