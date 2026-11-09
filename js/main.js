(function () {
  const btn = document.getElementById('menuBtn');
  const nav = document.getElementById('nav');
  const toggle = (open) => {
    nav.classList.toggle('open', open);
    btn.setAttribute('aria-expanded', String(open));
    btn.setAttribute('aria-label', open ? 'মেনু বন্ধ করুন' : 'মেনু খুলুন');
  };
  btn.addEventListener('click', () => toggle(!nav.classList.contains('open')));
  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => toggle(false)));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') toggle(false); });

  // Header shadow on scroll
  const hdr = document.querySelector('.site-header');
  const onScroll = () => hdr.classList.toggle('scrolled', window.scrollY > 10);
  window.addEventListener('scroll', onScroll, { passive: true }); onScroll();

  // Footer year in Bangla digits
  const bn = '০১২৩৪৫৬৭৮৯';
  const y = document.getElementById('year');
  if (y) y.textContent = String(new Date().getFullYear()).replace(/\d/g, d => bn[d]);
})();

// ===== Gallery lightbox =====
(function () {
  const box = document.getElementById('lightbox');
  if (!box) return;
  const imgs = Array.from(document.querySelectorAll('.g-btn img'));
  const big = document.getElementById('lbImg');
  const cap = document.getElementById('lbCap');
  let idx = 0;

  const show = (i) => {
    idx = (i + imgs.length) % imgs.length;
    const src = imgs[idx];
    big.src = src.currentSrc || src.src;
    big.alt = src.alt;
    cap.textContent = src.alt;
  };
  const open = (i) => { show(i); if (!box.open) box.showModal(); };
  const close = () => box.open && box.close();

  document.querySelectorAll('.g-btn').forEach(b =>
    b.addEventListener('click', () => open(Number(b.dataset.index))));
  document.getElementById('lbClose').addEventListener('click', close);
  document.getElementById('lbPrev').addEventListener('click', () => show(idx - 1));
  document.getElementById('lbNext').addEventListener('click', () => show(idx + 1));

  // click on dark backdrop closes
  box.addEventListener('click', e => { if (e.target === box) close(); });
  document.addEventListener('keydown', e => {
    if (!box.open) return;
    if (e.key === 'ArrowLeft') show(idx - 1);
    if (e.key === 'ArrowRight') show(idx + 1);
  });

  // swipe on touch screens
  let x0 = null;
  box.addEventListener('touchstart', e => { x0 = e.touches[0].clientX; }, { passive: true });
  box.addEventListener('touchend', e => {
    if (x0 === null) return;
    const dx = e.changedTouches[0].clientX - x0;
    if (Math.abs(dx) > 50) show(idx + (dx < 0 ? 1 : -1));
    x0 = null;
  });
})();
