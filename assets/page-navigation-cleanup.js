/* One page-level Back control; keep activity, unit and collection navigation. */
(() => {
  function cleanReturnControls() {
    const nav = document.querySelector('.etp-page-nav');
    if (!nav) return;
    document.querySelectorAll('.etp-return').forEach(row => row.remove());
    const protectedArea = '#etpSiteHeader,footer,#etpSiteFooter,.etp-page-nav,[role="dialog"],dialog';
    document.querySelectorAll('a.etp-back-link,a.back,a.back-link,a.nav-home,a.nav-btn.home').forEach(link => {
      if (link.closest(protectedArea)) return;
      const label = link.textContent.trim().replace(/^[←‹⬅↩\s]+/, '').trim();
      if (/^(?:back(?:\s+to\s+.+)?|home)$/i.test(label)) link.remove();
    });
    // Plain Home links in old local navigation are redundant with the shared header.
    document.querySelectorAll('a').forEach(link => {
      if (link.closest(protectedArea)) return;
      if (!/^[←‹⬅↩\s]*home\s*$/i.test(link.textContent)) return;
      const target = new URL(link.href, location.href);
      if (target.hostname.replace(/^www\./, '') === location.hostname.replace(/^www\./, '') && /^\/(?:index\.html)?$/.test(target.pathname)) link.remove();
    });
  }
  function measureNavigation() {
    const header = document.getElementById('etpSiteHeader');
    const nav = document.querySelector('.etp-page-nav');
    if (header) document.documentElement.style.setProperty('--etp-header-height', header.getBoundingClientRect().height + 'px');
    document.documentElement.style.setProperty('--etp-page-nav-height', (nav?.getBoundingClientRect().height || 0) + 'px');
  }
  function boot() {
    cleanReturnControls();
    const observer = new ResizeObserver(measureNavigation);
    ['#etpSiteHeader', '.etp-page-nav'].forEach(selector => {
      const element = document.querySelector(selector);
      if (element) observer.observe(element);
    });
    measureNavigation();
    window.addEventListener('resize', measureNavigation, {passive: true});
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot, {once: true});
  else boot();
  window.addEventListener('load', cleanReturnControls, {once: true});
})();
