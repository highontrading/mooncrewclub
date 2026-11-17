/* ==========================================================================
   Mooncrew Club — interactions & motion
   Preloader · page transitions · smooth scroll · split-text reveals ·
   menu · cursor · parallax · scroll-fill text · counters · sliders ·
   accordion · filters · lightbox · tabs · forms
   ========================================================================== */
(() => {
  'use strict';

  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const html = document.documentElement;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine = matchMedia('(hover: hover) and (pointer: fine)').matches;
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  const lerp = (a, b, t) => a + (b - a) * t;
  const wait = (ms) => new Promise((r) => setTimeout(r, ms));
  const store = {
    get: (k) => { try { return sessionStorage.getItem(k); } catch { return null; } },
    set: (k, v) => { try { sessionStorage.setItem(k, v); } catch {} },
  };

  /* ------------------------------------------------------------------ */
  /* Smooth scroll                                                       */
  /* ------------------------------------------------------------------ */
  let lenis = null;
  if (!reduce && window.Lenis) {
    lenis = new window.Lenis({ lerp: 0.105, smoothWheel: true, wheelMultiplier: 1 });
  }
  const scrollTo = (target, opts = {}) => {
    if (lenis) lenis.scrollTo(target, { offset: -70, duration: 1.4, ...opts });
    else {
      const y = typeof target === 'number' ? target : target.getBoundingClientRect().top + scrollY - 70;
      scrollTo.native(y);
    }
  };
  scrollTo.native = (y) => window.scrollTo({ top: y, behavior: reduce ? 'auto' : 'smooth' });
  const lockScroll = (on) => {
    if (lenis) on ? lenis.stop() : lenis.start();
    document.body.style.overflow = on ? 'hidden' : '';
  };

  /* ------------------------------------------------------------------ */
  /* Text splitting                                                      */
  /* ------------------------------------------------------------------ */
  function splitWords(el) {
    let i = 0;
    const walk = (node) => {
      [...node.childNodes].forEach((n) => {
        if (n.nodeType === 3) {
          const parts = n.textContent.split(/(\s+)/);
          const frag = document.createDocumentFragment();
          parts.forEach((p) => {
            if (!p) return;
            if (/^\s+$/.test(p)) { frag.appendChild(document.createTextNode(' ')); return; }
            const w = document.createElement('span');
            w.className = 'w';
            const wi = document.createElement('span');
            wi.className = 'wi';
            wi.style.setProperty('--i', i++);
            wi.textContent = p;
            w.appendChild(wi);
            frag.appendChild(w);
          });
          n.replaceWith(frag);
        } else if (n.nodeType === 1 && n.tagName !== 'BR') {
          if (n.tagName === 'SUP') {
            // keep superscripts atomic
            const w = document.createElement('span');
            w.className = 'w';
            const wi = document.createElement('span');
            wi.className = 'wi';
            wi.style.setProperty('--i', i++);
            n.replaceWith(w);
            wi.appendChild(n);
            w.appendChild(wi);
          } else walk(n);
        }
      });
    };
    walk(el);
  }

  function splitChars(el) {
    let i = 0;
    const walk = (node) => {
      [...node.childNodes].forEach((n) => {
        if (n.nodeType === 3) {
          const frag = document.createDocumentFragment();
          [...n.textContent].forEach((c) => {
            if (c === ' ') { frag.appendChild(document.createTextNode(' ')); return; }
            const s = document.createElement('span');
            s.className = 'ch';
            s.innerHTML = `<span class="chi" style="--i:${i++}"></span>`;
            s.firstChild.textContent = c;
            frag.appendChild(s);
          });
          n.replaceWith(frag);
        } else if (n.nodeType === 1) {
          if (n.tagName === 'SUP') {
            const s = document.createElement('span');
            s.className = 'ch';
            const inner = document.createElement('span');
            inner.className = 'chi';
            inner.style.setProperty('--i', i++);
            n.replaceWith(s);
            inner.appendChild(n);
            s.appendChild(inner);
          } else walk(n);
        }
      });
    };
    walk(el);
  }

  $$('[data-split]').forEach((el) => (el.dataset.split === 'chars' ? splitChars(el) : splitWords(el)));
  $$('[data-split-static]').forEach(splitWords);

  // Words for scroll-fill paragraphs
  $$('[data-fill]').forEach((el) => {
    const words = el.textContent.trim().split(/\s+/);
    el.innerHTML = words.map((w) => `<span class="fw">${w}</span>`).join(' ');
  });

  /* ------------------------------------------------------------------ */
  /* Fit text (giant wordmarks)                                          */
  /* ------------------------------------------------------------------ */
  // CSS sizes the wordmarks with container units; this measures the real
  // rendered text and corrects for the exact font (incl. fallback fonts).
  const fitEls = $$('[data-fit]');
  const fitWidths = new WeakMap();
  function fitOne(el) {
    const inner = $('.fit', el);
    const target = el.clientWidth;
    if (!inner || !target) return;
    el.style.fontSize = '100px';
    // offsetWidth is layout width: unaffected by the intro transforms.
    const w = inner.offsetWidth;
    el.style.fontSize = w > 0 ? `${((100 * target) / w) * 0.985}px` : '';
    fitWidths.set(el, target);
  }
  function fit() { fitEls.forEach(fitOne); }
  fit();
  if ('ResizeObserver' in window) {
    // Fires on any width change: window resize, scrollbar appearing after the
    // preloader, device rotation, embedded preview panes…
    const ro = new ResizeObserver((entries) => entries.forEach((e) => {
      if (fitWidths.get(e.target) !== e.target.clientWidth) fitOne(e.target);
    }));
    fitEls.forEach((el) => ro.observe(el));
  }
  if (document.fonts) {
    document.fonts.ready.then(fit);
    document.fonts.addEventListener?.('loadingdone', fit);
  }
  addEventListener('load', fit);
  let rT;
  addEventListener('resize', () => { clearTimeout(rT); rT = setTimeout(() => { fit(); measureParallax(); }, 120); });

  /* ------------------------------------------------------------------ */
  /* Reveal on scroll                                                    */
  /* ------------------------------------------------------------------ */
  const revealIO = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        const proxied = imgProxies.get(e.target);
        if (proxied) { proxied.forEach((m) => m.classList.add('is-in')); revealIO.unobserve(e.target); return; }
        e.target.classList.add('is-in');
        if (e.target.hasAttribute('data-count')) countUp(e.target);
        $$('[data-count]', e.target).forEach(countUp);
        revealIO.unobserve(e.target);
      });
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.12 }
  );
  // Fully clip-path'd elements never report as intersecting, so image
  // reveals are triggered by observing their parent element instead.
  const imgProxies = new Map();
  function startReveals() {
    $$('[data-split]:not([data-split="chars"]), [data-reveal]:not([data-reveal="img"]), .stat__num[data-count]').forEach((el) => revealIO.observe(el));
    $$('[data-reveal="img"]').forEach((el) => {
      const p = el.parentElement;
      if (!imgProxies.has(p)) imgProxies.set(p, []);
      imgProxies.get(p).push(el);
    });
    imgProxies.forEach((_, p) => revealIO.observe(p));
  }

  /* ------------------------------------------------------------------ */
  /* Count-up                                                            */
  /* ------------------------------------------------------------------ */
  function countUp(el) {
    if (el.dataset.counted) return;
    el.dataset.counted = '1';
    const to = parseFloat(el.dataset.count);
    const pre = el.dataset.prefix || '';
    const suf = el.dataset.suffix || '';
    const dec = (el.dataset.count.split('.')[1] || '').length;
    if (reduce) { el.textContent = pre + to.toFixed(dec) + suf; return; }
    const dur = 1800;
    const t0 = performance.now();
    const ease = (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));
    const tick = (now) => {
      const p = clamp((now - t0) / dur, 0, 1);
      const v = to * ease(p);
      el.textContent = pre + (dec ? v.toFixed(dec) : Math.round(v).toLocaleString('en-US')) + suf;
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }

  /* ------------------------------------------------------------------ */
  /* Parallax + scroll-fill (driven from a single rAF loop)              */
  /* ------------------------------------------------------------------ */
  let parallaxEls = [];
  function measureParallax() {
    parallaxEls = $$('[data-parallax]').map((el) => ({ el, speed: parseFloat(el.dataset.parallax) || 0.1 }));
  }
  measureParallax();
  const fillEls = $$('[data-fill]').map((el) => ({ el, words: $$('.fw', el), last: -1 }));

  function onFrame() {
    const vh = innerHeight;
    if (!reduce) {
      for (const p of parallaxEls) {
        const r = p.el.parentElement.getBoundingClientRect();
        if (r.bottom < -100 || r.top > vh + 100) continue;
        const lim = r.height * 0.085; // stays inside the 1.18 scale overscan
        const off = clamp((r.top + r.height / 2 - vh / 2) * -p.speed, -lim, lim);
        p.el.style.transform = `translate3d(0, ${off.toFixed(1)}px, 0)`;
      }
    }
    for (const f of fillEls) {
      const r = f.el.getBoundingClientRect();
      const p = reduce ? 1 : clamp((vh * 0.85 - r.top) / (r.height + vh * 0.3), 0, 1);
      const n = Math.round(p * f.words.length);
      if (n !== f.last) {
        f.words.forEach((w, i) => w.classList.toggle('on', i < n));
        f.last = n;
      }
    }
  }

  /* ------------------------------------------------------------------ */
  /* Header (hide on scroll down, show on up)                            */
  /* ------------------------------------------------------------------ */
  const hdr = $('[data-hdr]');
  let lastY = scrollY;
  function onScroll(y) {
    if (!hdr || html.classList.contains('menu-open')) return;
    hdr.classList.toggle('is-scrolled', y > 20);
    if (y > 160 && y > lastY + 4) hdr.classList.add('is-hidden');
    else if (y < lastY - 4 || y < 160) hdr.classList.remove('is-hidden');
    lastY = y;
  }
  if (lenis) lenis.on('scroll', (e) => onScroll(e.scroll));
  else addEventListener('scroll', () => onScroll(scrollY), { passive: true });

  /* ------------------------------------------------------------------ */
  /* Cursor + hover-reveal image                                         */
  /* ------------------------------------------------------------------ */
  const cursor = $('.cursor');
  const cursorLabel = $('[data-cursor-label]');
  const hoverReveal = $('.hover-reveal');
  const hoverIn = $('.hover-reveal__in');
  const mouse = { x: innerWidth / 2, y: innerHeight / 2 };
  const cur = { x: mouse.x, y: mouse.y };
  const hov = { x: mouse.x, y: mouse.y, vx: 0 };

  if (fine && !reduce) {
    html.classList.add('has-cursor');
    cursor.classList.add('is-hidden');
    addEventListener('pointermove', (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      cursor.classList.remove('is-hidden');
    }, { passive: true });
    document.addEventListener('pointerleave', () => cursor.classList.add('is-hidden'));
    document.addEventListener('pointerover', (e) => {
      const t = e.target.closest('[data-cursor]');
      if (t) {
        cursorLabel.textContent = t.dataset.cursor;
        cursor.classList.add('is-active');
        cursor.classList.remove('is-link');
        return;
      }
      cursor.classList.remove('is-active');
      cursor.classList.toggle('is-link', !!e.target.closest('a, button, label, input, textarea'));
    });

    // hover-reveal list (case studies index)
    $$('[data-hover-img]').forEach((row) => {
      const pre = new Image();
      pre.src = row.dataset.hoverImg;
      row.addEventListener('pointerenter', () => {
        hoverIn.style.backgroundImage = `url("${row.dataset.hoverImg}")`;
        hoverReveal.classList.add('is-on');
      });
      row.addEventListener('pointerleave', () => hoverReveal.classList.remove('is-on'));
    });
  }

  function cursorFrame() {
    if (!html.classList.contains('has-cursor')) return;
    cur.x = lerp(cur.x, mouse.x, 0.2);
    cur.y = lerp(cur.y, mouse.y, 0.2);
    cursor.style.transform = `translate3d(${cur.x}px, ${cur.y}px, 0)`;
    if (hoverReveal.classList.contains('is-on')) {
      const px = hov.x;
      hov.x = lerp(hov.x, mouse.x, 0.12);
      hov.y = lerp(hov.y, mouse.y, 0.12);
      hov.vx = lerp(hov.vx, hov.x - px, 0.2);
      hoverReveal.style.left = `${hov.x}px`;
      hoverReveal.style.top = `${hov.y}px`;
      hoverIn.style.transform = `rotate(${clamp(hov.vx * 0.6, -12, 12)}deg)`;
    } else {
      hov.x = mouse.x;
      hov.y = mouse.y;
    }
  }

  // Magnetic buttons
  if (fine && !reduce) {
    $$('[data-magnetic]').forEach((el) => {
      el.addEventListener('pointermove', (e) => {
        const r = el.getBoundingClientRect();
        const x = (e.clientX - r.left - r.width / 2) * 0.22;
        const y = (e.clientY - r.top - r.height / 2) * 0.3;
        el.style.transform = `translate(${x}px, ${y}px)`;
      });
      el.addEventListener('pointerleave', () => {
        el.style.transition = 'transform .7s cubic-bezier(.22,1,.36,1), color .4s, background-color .4s, border-color .4s';
        el.style.transform = '';
        setTimeout(() => (el.style.transition = ''), 700);
      });
    });
  }

  /* ------------------------------------------------------------------ */
  /* Master rAF loop                                                     */
  /* ------------------------------------------------------------------ */
  function raf(t) {
    if (lenis) lenis.raf(t);
    onFrame();
    cursorFrame();
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  /* ------------------------------------------------------------------ */
  /* Menu                                                                */
  /* ------------------------------------------------------------------ */
  const menu = $('[data-menu]');
  const menuBtn = $('[data-menu-toggle]');
  function setMenu(open) {
    if (open === html.classList.contains('menu-open')) return;
    html.classList.toggle('menu-open', open);
    menuBtn.setAttribute('aria-expanded', open);
    menu.setAttribute('aria-hidden', !open);
    lockScroll(open);
    if (open) {
      hdr.classList.remove('is-hidden');
      setTimeout(() => $('.menu__link', menu)?.focus({ preventScroll: true }), 500);
    } else {
      html.classList.add('menu-closing');
      setTimeout(() => html.classList.remove('menu-closing'), 900);
    }
  }
  menuBtn?.addEventListener('click', () => setMenu(!html.classList.contains('menu-open')));
  addEventListener('keydown', (e) => {
    if (e.key === 'Escape') { setMenu(false); closeLightbox(); }
  });
  $$('[data-menu-link]').forEach((a) => {
    a.addEventListener('pointerenter', () => {
      $$('[data-menu-img]').forEach((img) => img.classList.toggle('is-on', img.dataset.menuImg === a.dataset.menuLink));
    });
  });

  /* ------------------------------------------------------------------ */
  /* Page transitions                                                    */
  /* ------------------------------------------------------------------ */
  const ptLabel = $('[data-pt-label]');
  const setPtLabel = (txt) => { ptLabel.innerHTML = `<span></span>`; ptLabel.firstChild.textContent = txt; };

  function labelFor(a, url) {
    if (a.dataset.ptLabel) return a.dataset.ptLabel;
    const map = { '/': 'Home', '/hilltop/': 'The Trip', '/gallery/': 'Gallery', '/apply/': 'Apply' };
    return map[url.pathname] || (a.textContent || '').trim().split('\n')[0].slice(0, 28) || 'Loading';
  }

  document.addEventListener('click', (e) => {
    const a = e.target.closest('a[href]');
    if (!a) return;
    const href = a.getAttribute('href');
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    if (a.target === '_blank' || a.hasAttribute('download') || /^(mailto|tel|javascript):/.test(href)) return;
    const url = new URL(a.href, location.href);
    if (url.origin !== location.origin) return;

    // same-page anchor → smooth scroll
    if (url.pathname === location.pathname && url.search === location.search) {
      e.preventDefault();
      if (html.classList.contains('menu-open')) setMenu(false);
      if (url.hash) {
        const t = document.getElementById(url.hash.slice(1));
        if (t) scrollTo(t);
      } else scrollTo(0);
      return;
    }

    e.preventDefault();
    if (reduce) { location.href = url.href; return; }
    setPtLabel(labelFor(a, url));
    store.set('mc:pt', labelFor(a, url));
    html.classList.add('pt-active');
    setTimeout(() => (location.href = url.href), 780);
  });

  // Back/forward cache restore → clear transition state
  addEventListener('pageshow', (e) => {
    if (e.persisted) {
      html.classList.remove('pt-active', 'pt-enter', 'pt-leave', 'menu-open');
      lockScroll(false);
    }
  });

  /* ------------------------------------------------------------------ */
  /* Boot sequence: preloader → page transition → ready                  */
  /* ------------------------------------------------------------------ */
  async function preloader() {
    const num = $('[data-preload-count]');
    const bar = $('[data-preload-bar]');
    const imgs = $$('.strip img, .phero img, .split img').slice(0, 8);
    let loaded = 0;
    const total = Math.max(imgs.length, 1);
    imgs.forEach((im) => {
      if (im.complete) loaded++;
      else im.addEventListener('load', () => loaded++, { once: true }), im.addEventListener('error', () => loaded++, { once: true });
    });
    lockScroll(true);
    const t0 = performance.now();
    let shown = 0;
    await new Promise((resolve) => {
      const step = (now) => {
        const timeP = clamp((now - t0) / 1700, 0, 1);
        const loadP = loaded / total;
        const target = Math.min(timeP, Math.max(loadP, timeP * 0.9)) * 100;
        shown = lerp(shown, (now - t0) > 4000 ? 100 : target, 0.12);
        if (target >= 100 && shown > 99.4) shown = 100;
        num.textContent = Math.round(shown);
        bar.style.transform = `scaleX(${shown / 100})`;
        if (shown >= 100) resolve();
        else requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    });
    await wait(180);
    html.classList.add('preload-out');
    await wait(450);
    lockScroll(false);
    ready();
    await wait(700);
    html.classList.remove('is-preloading', 'preload-out');
  }

  async function enterTransition() {
    setPtLabel(html.getAttribute('data-pt') || document.body.dataset.page || '');
    await wait(60);
    html.classList.add('pt-leave');
    await wait(260);
    ready();
    await wait(800);
    html.classList.remove('pt-enter', 'pt-leave');
  }

  let isReady = false;
  function ready() {
    if (isReady) return;
    isReady = true;
    fit();
    html.classList.add('is-ready');
    startReveals();
    if (location.hash) {
      const t = document.getElementById(location.hash.slice(1));
      if (t) setTimeout(() => scrollTo(t, { immediate: true }), 50);
    }
    document.dispatchEvent(new CustomEvent('app:ready'));
  }

  if (reduce) {
    html.classList.remove('is-preloading', 'pt-enter');
    ready();
  } else if (html.classList.contains('is-preloading')) preloader();
  else if (html.classList.contains('pt-enter')) enterTransition();
  else ready();

  /* ------------------------------------------------------------------ */
  /* Accordion                                                           */
  /* ------------------------------------------------------------------ */
  $$('[data-acc]').forEach((acc) => {
    const items = $$('.acc__item', acc);
    items.forEach((it) => {
      const q = $('.acc__q', it);
      q.addEventListener('click', () => {
        const open = !it.classList.contains('is-open');
        items.forEach((o) => { o.classList.remove('is-open'); $('.acc__q', o).setAttribute('aria-expanded', 'false'); });
        if (open) { it.classList.add('is-open'); q.setAttribute('aria-expanded', 'true'); }
      });
    });
  });

  /* ------------------------------------------------------------------ */
  /* Testimonials slider                                                 */
  /* ------------------------------------------------------------------ */
  $$('[data-slider]').forEach((root) => {
    const slides = $$('[data-slide]', root);
    const idx = $('[data-slider-index]', root);
    const bar = $('[data-slider-bar]', root);
    const DUR = 7000;
    let i = 0, t0 = performance.now(), paused = false, visible = false, elapsed = 0;

    const go = (n) => {
      slides[i].classList.remove('is-active', 'is-in');
      i = (n + slides.length) % slides.length;
      const s = slides[i];
      s.classList.add('is-active');
      void s.offsetWidth; // restart word animation
      requestAnimationFrame(() => s.classList.add('is-in'));
      idx.textContent = String(i + 1).padStart(2, '0');
      elapsed = 0;
      t0 = performance.now();
    };
    $('[data-slider-next]', root).addEventListener('click', () => go(i + 1));
    $('[data-slider-prev]', root).addEventListener('click', () => go(i - 1));
    root.addEventListener('pointerenter', () => { paused = true; elapsed += performance.now() - t0; });
    root.addEventListener('pointerleave', () => { paused = false; t0 = performance.now(); });

    // swipe
    let sx = null;
    root.addEventListener('touchstart', (e) => (sx = e.touches[0].clientX), { passive: true });
    root.addEventListener('touchend', (e) => {
      if (sx === null) return;
      const dx = e.changedTouches[0].clientX - sx;
      if (Math.abs(dx) > 50) go(dx < 0 ? i + 1 : i - 1);
      sx = null;
    });

    new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible && !slides[i].classList.contains('is-in')) slides[i].classList.add('is-in');
      if (visible) t0 = performance.now();
    }, { threshold: 0.35 }).observe(root);

    const loop = (now) => {
      if (visible && !paused && !reduce) {
        const p = (elapsed + now - t0) / DUR;
        bar.style.transform = `scaleX(${clamp(p, 0, 1)})`;
        if (p >= 1) go(i + 1);
      }
      requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);
  });

  /* ------------------------------------------------------------------ */
  /* Work filters                                                        */
  /* ------------------------------------------------------------------ */
  const chips = $$('[data-filter]');
  chips.forEach((chip) => {
    chip.addEventListener('click', async () => {
      chips.forEach((c) => { c.classList.toggle('is-on', c === chip); c.setAttribute('aria-pressed', c === chip); });
      const f = chip.dataset.filter;
      const items = $$('.witem');
      items.forEach((it) => it.classList.add('is-out'));
      await wait(reduce ? 0 : 380);
      items.forEach((it) => {
        const show = f === 'All' || it.dataset.type === f;
        it.hidden = !show;
        it.classList.add('is-in');
      });
      requestAnimationFrame(() => requestAnimationFrame(() => {
        items.forEach((it) => it.classList.remove('is-out'));
        $$('.witem:not([hidden]) [data-reveal="img"]').forEach((m) => m.classList.add('is-in'));
      }));
      if (lenis) lenis.resize();
    });
  });

  /* ------------------------------------------------------------------ */
  /* Lightbox (photos)                                                   */
  /* ------------------------------------------------------------------ */
  const lb = $('[data-lightbox]');
  const lbMedia = $('[data-lightbox-media]');
  const lbTitle = $('[data-lightbox-title]');
  let lbReturn = null, lbList = [], lbI = 0;
  function showPhoto(i) {
    lbI = (i + lbList.length) % lbList.length;
    const b = lbList[lbI];
    lbMedia.innerHTML = '';
    if (b.dataset.kind === 'video') {
      const v = document.createElement('video');
      v.src = b.dataset.photo; v.controls = true; v.loop = true; v.playsInline = true; v.autoplay = true;
      v.setAttribute('aria-label', b.dataset.photoTitle || '');
      lbMedia.appendChild(v);
      v.play?.().catch(() => { v.muted = true; v.play?.().catch(() => {}); });
    } else {
      const im = new Image();
      im.src = b.dataset.photo;
      im.alt = b.dataset.photoTitle || '';
      lbMedia.appendChild(im);
    }
    lbTitle.textContent = `${String(lbI + 1).padStart(2, '0')} / ${String(lbList.length).padStart(2, '0')} · ${b.dataset.photoTitle || ''}`;
  }
  function openLightbox(from) {
    lbReturn = from;
    lbList = $$('[data-photo]').filter((x) => !x.hidden);
    showPhoto(lbList.indexOf(from));
    lb.classList.add('is-open');
    lb.setAttribute('aria-hidden', 'false');
    lockScroll(true);
    setTimeout(() => $('.lightbox__close', lb).focus(), 300);
  }
  function closeLightbox() {
    if (!lb || !lb.classList.contains('is-open')) return;
    lb.classList.remove('is-open');
    lb.setAttribute('aria-hidden', 'true');
    lockScroll(false);
    setTimeout(() => (lbMedia.innerHTML = ''), 500);
    lbReturn?.focus({ preventScroll: true });
  }
  $$('[data-photo]').forEach((b) => b.addEventListener('click', () => openLightbox(b)));
  // Gallery video tiles: preview on hover (desktop only)
  if (fine && !reduce) {
    $$('.witem--video').forEach((t) => {
      const v = $('video', t);
      t.addEventListener('pointerenter', () => { v.play?.().then(() => t.classList.add('is-playing')).catch(() => {}); });
      t.addEventListener('pointerleave', () => { v.pause?.(); t.classList.remove('is-playing'); });
    });
  }
  $$('[data-lightbox-close]').forEach((b) => b.addEventListener('click', closeLightbox));
  $('[data-lightbox-prev]')?.addEventListener('click', () => showPhoto(lbI - 1));
  $('[data-lightbox-next]')?.addEventListener('click', () => showPhoto(lbI + 1));
  addEventListener('keydown', (e) => {
    if (!lb?.classList.contains('is-open')) return;
    if (e.key === 'ArrowLeft') showPhoto(lbI - 1);
    if (e.key === 'ArrowRight') showPhoto(lbI + 1);
  });

  /* ------------------------------------------------------------------ */
  /* Application form → WhatsApp                                          */
  /* ------------------------------------------------------------------ */
  const form = $('[data-form]');
  if (form) {
    const msg = $('[data-form-msg]');
    const done = $('[data-form-done]');
    if (new URLSearchParams(location.search).get('room') === 'private') {
      const r = $('[data-room="private"]', form); if (r) r.checked = true;
    }
    const validate = () => {
      let ok = true;
      $$('[required]', form).forEach((f) => {
        const bad = !f.value.trim() || (f.name === 'phone' && f.value.replace(/\D/g, '').length < 10);
        f.closest('.field').classList.toggle('is-invalid', bad);
        if (bad) ok = false;
      });
      return ok;
    };
    form.addEventListener('input', (e) => e.target.closest('.field')?.classList.remove('is-invalid'));
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      msg.textContent = '';
      if (!validate()) { msg.textContent = 'Please add your name and a WhatsApp number.'; return; }
      const d = new FormData(form);
      const txt = [
        "Hi Mooncrew! I'd like to apply for the Hilltop Festival trip (Weekend 2, 4–8 Feb 2027).", '',
        `Name: ${d.get('name')}`, `WhatsApp: ${d.get('phone')}`,
        d.get('instagram') ? `Instagram: ${d.get('instagram')}` : '', d.get('city') ? `City: ${d.get('city')}` : '',
        `People: ${d.get('people')}`, `Room: ${d.get('room')}`,
        d.get('message') ? `\n${d.get('message')}` : '',
      ].filter(Boolean).join('\n');
      const url = `https://wa.me/${d.get('to')}?text=${encodeURIComponent(txt)}`;
      $('[data-form-text]').textContent = txt;
      $('[data-form-wa]').href = url;
      window.open(url, '_blank', 'noopener');
      form.hidden = true;
      done.hidden = false;
      if (lenis) lenis.resize();
      scrollTo(done);
    });
    $('[data-copy]')?.addEventListener('click', (e) => {
      const t = $('[data-form-text]').textContent;
      const b = e.currentTarget;
      const ok = () => { $('.roll__in', b).textContent = 'Copied'; };
      try { navigator.clipboard.writeText(t).then(ok, ok); } catch { ok(); }
    });
  }

  /* ------------------------------------------------------------------ */
  /* Anatomy segments                                                    */
  /* ------------------------------------------------------------------ */
  const segs = $$('[data-seg]');
  const segCols = $$('[data-seg-col]');
  const pick = (n) => {
    segs.forEach((s) => s.classList.toggle('is-on', s.dataset.seg === n));
    segCols.forEach((c) => c.classList.toggle('is-on', c.dataset.segCol === n));
  };
  segs.forEach((s) => {
    s.addEventListener('pointerenter', () => pick(s.dataset.seg));
    s.addEventListener('click', () => pick(s.dataset.seg));
  });
  segCols.forEach((c) => c.addEventListener('pointerenter', () => pick(c.dataset.segCol)));

  /* ------------------------------------------------------------------ */
  /* Footer bits                                                         */
  /* ------------------------------------------------------------------ */
  $$('[data-year]').forEach((el) => (el.textContent = new Date().getFullYear()));
  const clock = $('[data-clock]');
  if (clock) {
    const fmt = new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit', second: '2-digit' });
    const tick = () => (clock.textContent = fmt.format(new Date()));
    tick();
    setInterval(tick, 1000);
  }
  $$('[data-to-top]').forEach((b) => b.addEventListener('click', () => scrollTo(0, { duration: 2 })));

  // Pause marquees when off-screen (perf)
  const mq = new IntersectionObserver((es) => es.forEach((e) => (e.target.style.animationPlayState = e.isIntersecting ? '' : 'paused')));
  $$('.strip__track, .wm__track').forEach((t) => mq.observe(t));
  // Play videos only while they are on screen (battery + data)
  const vio = new IntersectionObserver((es) => es.forEach((e) => {
    const v = e.target;
    if (e.isIntersecting && !reduce) { v.play?.().catch(() => {}); } else v.pause?.();
  }), { rootMargin: '120px' });
  $$('video').filter((v) => !v.closest('.witem')).forEach((v) => { if (reduce) v.removeAttribute('autoplay'); vio.observe(v); });
})();
