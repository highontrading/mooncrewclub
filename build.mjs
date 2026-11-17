// ---------------------------------------------------------------------------
// Mooncrew Club — static site generator (zero dependencies)
// Usage: node build.mjs   →  writes the finished website to ./dist
// ---------------------------------------------------------------------------
import { mkdirSync, rmSync, writeFileSync, readFileSync, cpSync, existsSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { dirname, join } from 'node:path';
import {
  site, nav, trip, strip, stats, words, days, included, notIncluded, plans, audiences, steps, promises, faqs, gallery,
} from './src/data.mjs';

const OUT = 'dist';
const hash = (f) => createHash('md5').update(readFileSync(f)).digest('hex').slice(0, 8);
const V = { css: hash('assets/css/style.css'), js: hash('assets/js/main.js') };

// ---------- helpers --------------------------------------------------------
const esc = (s = '') => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const pad = (n) => String(n).padStart(2, '0');
const label = (t) => `<span class="label">${t}</span>`;
const arrow = `<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17 17 7M8 7h9v9" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="square"/></svg>`;
const plus = `<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 4v16M4 12h16" fill="none" stroke="currentColor" stroke-width="1.7"/></svg>`;
const check = `<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12.5 4.5 4.5L19 7.5" fill="none" stroke="currentColor" stroke-width="1.7"/></svg>`;
const waIco = `<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.7.8-.8 1-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.8 11.9 11.9 0 0 0 4.6 4c1.7.7 2.4.8 3.2.7a2.8 2.8 0 0 0 1.9-1.3 2.3 2.3 0 0 0 .2-1.3c-.1-.1-.2-.2-.4-.3Z"/></svg>`;
const phoneIco = `<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" fill="none" stroke="currentColor" stroke-width="1.6"/></svg>`;
const igIco = `<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><rect x="3.5" y="3.5" width="17" height="17" rx="5" fill="none" stroke="currentColor" stroke-width="1.6"/><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" stroke-width="1.6"/><circle cx="17.3" cy="6.7" r="1.1" fill="currentColor"/></svg>`;
const roll = (t) => `<span class="roll"><span class="roll__in" data-text="${esc(t)}">${esc(t)}</span></span>`;
const btn = (text, href, { variant = 'light', ext = false, icon = arrow, attrs = '' } = {}) =>
  `<a class="btn btn--${variant}" href="${href}"${ext ? ' target="_blank" rel="noopener"' : ''} data-magnetic ${attrs}>${roll(text)}${icon ? `<span class="btn__ico">${icon}</span>` : ''}</a>`;
const countAttrs = (v) => {
  const m = String(v).match(/^([^\d-]*)(-?\d+(?:\.\d+)?)(.*)$/);
  if (!m) return `>${esc(v)}`;
  return ` data-count="${m[2]}" data-prefix="${esc(m[1])}" data-suffix="${esc(m[3])}">${esc(v)}`;
};
const I = (name, sm = false) => `/assets/img/${name}${sm ? '-sm' : ''}.webp`;
const img = (name, alt = '', { cls = '', eager = false, sm = false } = {}) =>
  `<img src="${I(name, sm)}" alt="${esc(alt)}"${cls ? ` class="${cls}"` : ''} ${eager ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async" width="1080" height="1350">`;
const wa = (num, text = '') => `https://wa.me/${num}${text ? `?text=${encodeURIComponent(text)}` : ''}`;
const ig = () => (site.instagram ? `https://instagram.com/${site.instagram}` : '');
const waHello = "Hi Mooncrew! I'd like to know more about the Hilltop trip (4–8 Feb 2027).";
const mark = `<svg class="moon" viewBox="0 0 140 120" aria-hidden="true"><defs><mask id="mcm"><rect width="140" height="120" fill="#fff"/><circle cx="74" cy="60" r="50" fill="#000"/></mask></defs><circle cx="58" cy="60" r="50" fill="currentColor" mask="url(#mcm)"/><circle cx="74" cy="60" r="50" fill="none" stroke="currentColor" stroke-width="2"/></svg>`;
const logo = `<span class="logo">${mark}<span class="logo__t"><span class="logo__wm">MOONCREW</span><span class="logo__club"><i></i>Club<i></i></span></span></span>`;

// ---------- layout ---------------------------------------------------------
const contactLinks = (cls = '') => site.contacts.map((c) => `
  <div class="person ${cls}">
    <span class="person__name">${esc(c.name)}</span>
    <a href="tel:+${c.phone}">${roll(c.show)}</a>
    <a href="${wa(c.phone, waHello)}" target="_blank" rel="noopener">${roll('WhatsApp')}</a>
  </div>`).join('');

const header = (path) => `
<header class="hdr" data-hdr>
  <a class="hdr__logo" href="/" aria-label="${site.name} home">${logo}</a>
  <nav class="hdr__links" aria-label="Primary">
    ${nav.slice(1, 3).map((n) => `<a href="${n.href}"${path === n.href ? ' aria-current="page"' : ''}>${roll(n.label)}</a>`).join('')}
    <a href="${wa(site.whatsapp, waHello)}" target="_blank" rel="noopener">${roll('WhatsApp')}</a>
  </nav>
  <div class="hdr__actions">
    <button class="menu-btn" type="button" aria-expanded="false" aria-controls="menu" data-menu-toggle>
      <span class="menu-btn__icon" aria-hidden="true"><i></i><i></i></span>
      <span class="menu-btn__text"><span>Menu</span><span>Close</span></span>
    </button>
    <a class="btn btn--gold btn--sm" href="/apply/" data-magnetic>${roll('Apply')}</a>
  </div>
</header>

<div class="menu" id="menu" aria-hidden="true" data-menu>
  <div class="menu__inner">
    <div class="menu__preview" aria-hidden="true">
      ${nav.map((n, i) => `<img src="${n.img}" alt="" data-menu-img="${i}"${i === 0 ? ' class="is-on"' : ''} loading="lazy">`).join('')}
    </div>
    <nav class="menu__nav" aria-label="Menu">
      <ul>
        ${nav.map((n, i) => `<li style="--i:${i}"><a class="menu__link" href="${n.href}" data-menu-link="${i}"${path === n.href ? ' aria-current="page"' : ''}><span class="menu__idx">${pad(i + 1)}</span><span class="menu__txt"><span>${n.label}</span></span></a></li>`).join('')}
      </ul>
    </nav>
    <div class="menu__foot">
      <div><span class="menu__k">Call or WhatsApp</span>${site.contacts.map((c) => `<a href="tel:+${c.phone}">${esc(c.name)} · ${esc(c.show)}</a>`).join('')}</div>
      <div><span class="menu__k">Next trip</span><span>${trip.name}</span><span>${trip.dates} · ${trip.where}</span></div>
      <div><span class="menu__k">Follow</span>${site.instagram ? `<a href="${ig()}" target="_blank" rel="noopener">Instagram @${esc(site.instagram)}</a>` : '<span>Instagram</span>'}<a href="${wa(site.whatsapp, waHello)}" target="_blank" rel="noopener">WhatsApp</a></div>
    </div>
  </div>
</div>`;

const footer = () => `
<footer class="ftr">
  <div class="ftr__cta container">
    <div class="ftr__cta-top">${label('Twenty seats')}<span class="status"><i></i>${site.status}</span></div>
    <h2 class="ftr__title" data-split>See you <em>on the hill.</em></h2>
    <div class="ftr__cta-row">
      <p class="ftr__lead" data-reveal="fade">Call us, WhatsApp us or DM us on Instagram. A real person replies, usually the same day.</p>
      <div class="ftr__btns" data-reveal="fade">
        ${btn('Apply for a seat', '/apply/', { variant: 'gold' })}
        ${btn('WhatsApp us', wa(site.whatsapp, waHello), { variant: 'ghost', ext: true, icon: waIco })}
        ${site.instagram ? btn('Instagram', ig(), { variant: 'ghost', ext: true, icon: igIco }) : ''}
      </div>
    </div>
  </div>
  <div class="ftr__grid container">
    <div class="ftr__col"><span class="ftr__k">Pages</span>${nav.map((n) => `<a href="${n.href}">${roll(n.label)}</a>`).join('')}</div>
    <div class="ftr__col"><span class="ftr__k">Talk to us</span>${site.contacts.map((c) => `<a href="tel:+${c.phone}">${roll(`${c.name} · ${c.show}`)}</a>`).join('')}<a href="${wa(site.whatsapp, waHello)}" target="_blank" rel="noopener">${roll('WhatsApp')}</a>${site.instagram ? `<a href="${ig()}" target="_blank" rel="noopener">${roll(`Instagram @${site.instagram}`)}</a>` : ''}</div>
    <div class="ftr__col"><span class="ftr__k">Next trip</span><span>${trip.name}</span><span>${trip.dates}</span><span>${trip.where}</span></div>
    <div class="ftr__col"><span class="ftr__k">Based in</span>${site.location.map((a) => `<span>${a}</span>`).join('')}<span class="ftr__clock">Goa <b data-clock>--:--</b> IST</span></div>
  </div>
  <div class="ftr__mark container" aria-hidden="true"><div class="fit-wrap" data-fit><span class="fit">MOONCREW</span></div></div>
  <div class="ftr__bar container">
    <span>© <span data-year>2026</span> ${site.name}</span>
    <span>An independent trip host. Not the organiser of Hilltop Festival.</span>
    <button type="button" class="ftr__top" data-to-top>${roll('Back to top')}<span class="btn__ico btn__ico--up">${arrow}</span></button>
  </div>
</footer>`;

const layout = ({ title, description = site.description, path = '/', body, pt = 'Home', cls = '' }) => {
  const fullTitle = title ? `${title} · ${site.name}` : `${site.name} · Hilltop Festival Weekend 2 · Goa, 4–8 Feb 2027`;
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(fullTitle)}</title>
<meta name="description" content="${esc(description)}">
<meta name="theme-color" content="#0A0A0B">
<link rel="canonical" href="${site.url}${path}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="${site.name}">
<meta property="og:title" content="${esc(fullTitle)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${site.url}${path}">
<meta property="og:image" content="${site.url}/assets/img/og.jpg">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="/assets/img/favicon.svg" type="image/svg+xml">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Manrope:wght@400;500;600&family=Michroma&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/assets/css/style.css?v=${V.css}">
<script>
(function(){var d=document.documentElement;d.classList.add('js');try{var s=sessionStorage;if(!s.getItem('mc:v')){d.classList.add('is-preloading');s.setItem('mc:v','1');s.removeItem('mc:pt')}else if(s.getItem('mc:pt')){d.classList.add('pt-enter');d.setAttribute('data-pt',s.getItem('mc:pt'));s.removeItem('mc:pt')}}catch(e){}})();
</script>
</head>
<body class="${cls}" data-page="${esc(pt)}">
<a class="skip" href="#main">Skip to content</a>

<div class="preloader" aria-hidden="true">
  <div class="preloader__top"><span>${logo}</span><span>${trip.name}</span></div>
  <div class="preloader__mid">${mark}</div>
  <div class="preloader__row"><span class="preloader__k">Loading the night</span><div class="preloader__count"><span data-preload-count>0</span><sup>%</sup></div></div>
  <div class="preloader__bar"><i data-preload-bar></i></div>
</div>

<div class="pt" aria-hidden="true"><div class="pt__inner"><span class="pt__k">${mark} Mooncrew Club</span><span class="pt__label" data-pt-label>${esc(pt)}</span></div></div>

<div class="cursor" aria-hidden="true"><span class="cursor__label" data-cursor-label></span></div>
<div class="hover-reveal" aria-hidden="true"><div class="hover-reveal__in"></div></div>

${header(path)}

<main id="main">
${body}
</main>
${footer()}

<div class="lightbox" role="dialog" aria-modal="true" aria-label="Photo viewer" aria-hidden="true" data-lightbox>
  <div class="lightbox__bg" data-lightbox-close></div>
  <div class="lightbox__frame"><div class="lightbox__media" data-lightbox-media></div>
    <div class="lightbox__bar"><span data-lightbox-title></span>
      <span class="lightbox__nav"><button type="button" data-lightbox-prev aria-label="Previous photo">${roll('Prev')}</button><button type="button" data-lightbox-next aria-label="Next photo">${roll('Next')}</button></span>
      <button type="button" class="lightbox__close" data-lightbox-close>${roll('Close')}<span class="btn__ico">${plus}</span></button></div>
  </div>
</div>

<a class="fab" href="${wa(site.whatsapp, waHello)}" target="_blank" rel="noopener" aria-label="WhatsApp Mooncrew">${waIco}</a>

<script src="/assets/vendor/lenis.min.js" defer></script>
<script src="/assets/js/main.js?v=${V.js}" defer></script>
</body>
</html>`;
};

// ---------- reusable sections ---------------------------------------------
const pageHero = ({ k, title, lead, extra = '' }) => `
<section class="phero container">
  <div class="phero__top">${label(k)}<span class="status"><i></i>${site.status}</span></div>
  <h1 class="phero__title" data-split>${title}</h1>
  <div class="phero__row"><span class="phero__meta" data-reveal="fade">${trip.dates}<br>${trip.where}</span><p class="phero__lead" data-reveal="fade">${lead}</p></div>
  ${extra}
</section>`;

const stripTile = (t, hidden) => {
  const a = hidden ? ' aria-hidden="true"' : '';
  if (t.big === 'price') return `<div class="tile tile--gold"${a}><span class="tile__k">From</span><b>₹84K</b><span>per person · 4 nights</span></div>`;
  if (t.big === 'seats') return `<div class="tile tile--ivory"${a}><span class="tile__k">Crew</span><b>20</b><span>seats · one villa</span></div>`;
  if (t.video) return `<div class="tile tile--media"${a}><video src="/assets/video/${t.video}.mp4" autoplay muted loop playsinline preload="none" aria-label="${esc(t.alt)}"></video></div>`;
  return `<div class="tile tile--media"${a}>${img(t.img, hidden ? '' : t.alt, { sm: true })}</div>`;
};

const statsBlock = () => `
<div class="stats">
  ${stats.map((s, i) => `<div class="stat" data-reveal="fade" style="--d:${i * 0.08}s"><span class="stat__num"${s.value === '2020' ? `>${s.value}` : countAttrs(s.value)}</span><span class="stat__label">${s.label}</span></div>`).join('')}
</div>`;

const wordMarquee = () => {
  const pics = ['night-purple', 'pool', 'decks', 'pink', 'day-canopy', 'moon'];
  const row = (hidden) => words.map((w, i) => `<span class="wm__word"${hidden ? ' aria-hidden="true"' : ''}>${w}</span><span class="wm__pic" aria-hidden="true"><img src="${I(pics[i % pics.length], true)}" alt="" loading="lazy"></span>`).join('');
  return `<div class="wm" aria-label="${words.join(', ')}"><div class="wm__track">${row(false)}${row(true)}</div></div>`;
};

const itinerary = () => `
<div class="itin" role="list">
  ${days.map((d, i) => `
  <div class="itin__row${d.hl ? ' is-hl' : ''}" role="listitem" data-hover-img="${I(d.img, true)}" data-reveal="fade" style="--d:${i * 0.06}s">
    <span class="itin__day"><b>${d.d}</b>${d.date}</span>
    <span class="itin__title">${d.title}</span>
    <span class="itin__text">${d.text}</span>
    <span class="itin__tag">${d.tag}</span>
    <span class="itin__thumb">${img(d.img, '', { sm: true })}</span>
  </div>`).join('')}
</div>`;

const includedCards = () => `
<div class="cards">
  ${included.map((c, i) => `
  <article class="card" data-reveal="fade" style="--d:${(i % 3) * 0.08}s">
    <div class="card__media media" data-reveal="img">${img(c.img, '', { sm: true })}</div>
    <div class="card__body"><span class="card__k">${pad(i + 1)} · ${c.k}</span><h3 class="card__title">${c.title}</h3><p>${c.text}</p></div>
  </article>`).join('')}
</div>`;

const plansBlock = () => `
<div class="plans">
  ${plans.map((p, i) => `
  <article class="plan${p.featured ? ' plan--featured' : ''}" data-reveal="fade" style="--d:${i * 0.1}s">
    <div class="plan__top"><span class="plan__name">${p.name}</span>${p.featured ? '<span class="plan__badge">Most guests</span>' : ''}</div>
    <div class="plan__price${/\d/.test(p.price) ? '' : ' plan__price--text'}">${p.price}<small>${p.per}</small></div>
    <span class="plan__note">${p.note}</span>
    <ul>${p.points.map((x) => `<li>${check}${x}</li>`).join('')}</ul>
    ${btn(p.cta, p.featured ? '/apply/' : `/apply/?room=private`, { variant: p.featured ? 'dark' : 'ghost' })}
  </article>`).join('')}
  <aside class="plans__aside" data-reveal="fade" style="--d:.2s">
    <span class="label">How you pay</span>
    <p><b>${trip.advance}</b> advance locks your seat.</p>
    <p>Balance by <b>${trip.balanceBy}</b>.</p>
    <p>The trip runs once <b>${trip.minGuests} guests</b> confirm by ${trip.decisionBy}. If not, your advance comes back in full.</p>
    <p class="muted">Flights not included.</p>
  </aside>
</div>`;

const audienceList = () => `
<div class="aud">
  ${audiences.map((a, i) => `<div class="aud__row" data-reveal="fade" style="--d:${i * 0.06}s"><span class="aud__idx">${pad(i + 1)}</span><h3>${a.title}</h3><p>${a.text}</p></div>`).join('')}
</div>`;

const stepsBlock = () => `
<ol class="steps">
  ${steps.map((s, i) => `<li class="step" data-reveal="fade" style="--d:${i * 0.08}s"><span class="step__n">${pad(i + 1)}</span><h3>${s.title}</h3><p>${s.text}</p></li>`).join('')}
</ol>`;

const promiseBlock = () => `
<section class="promise">
  <div class="promise__bg" data-reveal="img"><img src="${I('pink')}" alt="" data-parallax="0.12" loading="lazy"></div>
  <div class="promise__in container">
    <div class="sec__head">${label('Our promise')}<h2 class="h2" data-split>Wild nights. <em>Safe hands.</em></h2></div>
    <ul class="promise__list">${promises.map((p, i) => `<li data-reveal="fade" style="--d:${i * 0.05}s">${check}<span>${p}</span></li>`).join('')}</ul>
  </div>
</section>`;

const faqBlock = (list = faqs) => `
<div class="acc" data-acc>
  ${list.map((f, i) => `
  <div class="acc__item${i === 0 ? ' is-open' : ''}" data-reveal="fade" style="--d:${i * 0.04}s">
    <button class="acc__q" type="button" aria-expanded="${i === 0}" aria-controls="faq-${i}" id="faq-q-${i}"><span class="acc__idx">${pad(i + 1)}</span><span class="acc__text">${f.q}</span><span class="acc__ico">${plus}</span></button>
    <div class="acc__a" id="faq-${i}" role="region" aria-labelledby="faq-q-${i}"><div><p>${f.a}</p></div></div>
  </div>`).join('')}
</div>`;

// ---------- pages ----------------------------------------------------------
const home = () => layout({
  path: '/', pt: 'Home', cls: 'page-home',
  body: `
<section class="hero">
  <div class="hero__top container">
    ${label('Hilltop Festival · Weekend 2')}
    <span class="status"><i></i>${site.status}</span>
    <span class="hero__where">${trip.where} · ${trip.dates}</span>
  </div>
  <h1 class="hero__mark container"><span class="sr">Mooncrew Club: a private crew trip to Hilltop Festival</span><span class="fit-wrap" data-fit aria-hidden="true"><span class="fit" data-split="chars">MOONCREW</span></span></h1>
  <div class="hero__row container">
    <p class="hero__lead">Four days at Hilltop. <em>One villa. Twenty of us.</em></p>
    <div class="hero__side">
      <p>A private crew trip to Hilltop Festival's Weekend 2. The villa, the food, the passes, two house parties and every ride, handled by Goa locals.</p>
      <div class="hero__btns">${btn('Apply for a seat', '/apply/', { variant: 'gold' })}${btn('See the plan', '/hilltop/', { variant: 'ghost' })}</div>
    </div>
  </div>
  <div class="strip" aria-label="Photos from Hilltop and Goa"><div class="strip__track">${strip.map((t) => stripTile(t, false)).join('')}${strip.map((t) => stripTile(t, true)).join('')}</div></div>
</section>

<section class="sec sec--light about">
  <div class="container about__grid">
    <div class="about__side">${label('Why Mooncrew')}<div class="about__video media" data-reveal="img"><video src="/assets/video/hilltop.mp4" poster="${I('hilltop-poster')}" autoplay muted loop playsinline preload="metadata" aria-label="The Hilltop stage lighting up at night"></video></div></div>
    <div>
      <p class="about__fill" data-fill>Most people fly in for Hilltop and lose half of it to cab queues, bad stays and groups that fall apart. We live here. We take twenty people, put them in one villa and handle everything else, so the only thing you do is dance.</p>
      <div class="about__btns" data-reveal="fade">${btn('How the trip works', '/hilltop/', { variant: 'dark' })}${btn('Meet your hosts', '/apply/', { variant: 'ghost-dark' })}</div>
    </div>
  </div>
  <div class="container">${statsBlock()}</div>
</section>

<section class="sec pillhead-sec">
  <div class="container">
    <h2 class="pillhead" data-reveal="fade">Four days <span class="pimg">${img('day-canopy', '', { sm: true })}</span> on the hill. One villa <span class="pimg pimg--round">${img('pool', '', { sm: true })}</span> by the sea. Twenty <span class="pimg"><video src="/assets/video/hands.mp4" autoplay muted loop playsinline preload="none"></video></span> of us.</h2>
  </div>
  ${wordMarquee()}
</section>

<section class="sec" id="plan">
  <div class="container">
    <div class="sec__head sec__head--row">
      <div>${label('The plan · 4–8 Feb')}<h2 class="h2" data-split>Five days, <em>one rhythm.</em></h2></div>
      <p class="sec__lead" data-reveal="fade">Beach by day, Hilltop by night, the villa in between. Hover a day to see it.</p>
    </div>
    ${itinerary()}
    <p class="small" data-reveal="fade">House parties are sunset sessions, 5 to 10 pm, in line with Goa's music rules. Festival timings follow the official schedule.</p>
  </div>
</section>

<section class="sec sec--light" id="included">
  <div class="container">
    <div class="sec__head sec__head--row">
      <div>${label("What's included")}<h2 class="h2" data-split>You get to Goa. <em>We handle the rest.</em></h2></div>
      <p class="sec__lead" data-reveal="fade">Not included: ${notIncluded.join(', ').toLowerCase()}.</p>
    </div>
    ${includedCards()}
  </div>
</section>

<section class="sec" id="price">
  <div class="container">
    <div class="sec__head">${label('Price')}<h2 class="h2" data-split>One price. <em>No surprises.</em></h2></div>
    ${plansBlock()}
  </div>
</section>

<section class="sec sec--light">
  <div class="container">
    <div class="sec__head sec__head--row">
      <div>${label('Who this is for')}<h2 class="h2" data-split>Built for people <em>who'd rather dance.</em></h2></div>
    </div>
    ${audienceList()}
  </div>
</section>

<section class="sec sec--light sec--tight">
  <div class="container">
    <div class="sec__head">${label('How it works')}<h2 class="h2" data-split>Four steps. <em>Then just arrive.</em></h2></div>
    ${stepsBlock()}
  </div>
</section>

${promiseBlock()}

<section class="sec sec--light" id="faq">
  <div class="container faq__grid">
    <div class="sec__head">${label('FAQ')}<h2 class="h2" data-split>Before you <em>apply.</em></h2><p class="sec__lead" data-reveal="fade">Still curious? Call or WhatsApp us. We like questions.</p><div data-reveal="fade" class="faq__contacts">${contactLinks('person--dark')}</div></div>
    ${faqBlock()}
  </div>
</section>`,
});

const hilltopPage = () => layout({
  title: 'The Trip', path: '/hilltop/', pt: 'The Trip',
  description: 'Hilltop Festival 2027, Weekend 2 with Mooncrew Club: itinerary, what is included, price and how to book. 4–8 Feb 2027, Vagator, Goa.',
  body: `
${pageHero({ k: 'The trip', title: 'Hilltop, <em>the Mooncrew way.</em>', lead: "Hilltop's 16th edition runs over two weekends for the first time. We're going for Weekend 2: four days on the hill, four nights in a private villa, with a crew of twenty." })}

<section class="container facts" aria-label="Trip facts">
  ${[['Dates', trip.dates], ['Festival', `Hilltop · ${trip.festivalDates}`], ['Stay', 'Private villa, 10–15 min away'], ['Crew', `${trip.seats} seats`], ['Price', `${trip.price} per person`], ['Applications', `Close ${trip.closes}`]]
    .map(([k, v], i) => `<div class="fact" data-reveal="fade" style="--d:${i * 0.05}s"><span>${k}</span><b>${v}</b></div>`).join('')}
</section>

<section class="sec sec--tight">
  <div class="container split">
    <div class="split__media media" data-reveal="img"><img src="${I('night-purple')}" alt="The Hilltop canopy lit up at night" data-parallax="0.1" loading="lazy"></div>
    <div class="split__text">
      ${label('The festival')}
      <h2 class="h2" data-split>A hill in Vagator. <em>Giant glowing canopies.</em></h2>
      <p data-reveal="fade">Hilltop is Goa's best-known psytrance stage: a hillside venue under huge painted canopies, where the crowd doesn't stop. The festival announces its own line-up, and we share it in the crew group the day it's out.</p>
      <p data-reveal="fade">We are independent hosts, not the organisers. We buy your Weekend 2 pass through the official channel and handle everything around it.</p>
    </div>
  </div>
</section>

<section class="sec" id="plan">
  <div class="container">
    <div class="sec__head">${label('Day by day')}<h2 class="h2" data-split>The plan, <em>hour by hour-ish.</em></h2></div>
    ${itinerary()}
    <p class="small" data-reveal="fade">House parties are sunset sessions, 5 to 10 pm, in line with Goa's music rules.</p>
  </div>
</section>

<section class="sec sec--light">
  <div class="container">
    <div class="sec__head">${label("What's included")}<h2 class="h2" data-split>Everything, <em>except the flight.</em></h2></div>
    ${includedCards()}
    <div class="notinc" data-reveal="fade"><span class="label">Not included</span><ul>${notIncluded.map((n) => `<li>${n}</li>`).join('')}</ul></div>
  </div>
</section>

<section class="sec">
  <div class="container">
    <div class="sec__head">${label('Price')}<h2 class="h2" data-split>One price. <em>No surprises.</em></h2></div>
    ${plansBlock()}
  </div>
</section>

<section class="sec sec--light sec--tight">
  <div class="container">
    <div class="sec__head">${label('How it works')}<h2 class="h2" data-split>Four steps. <em>Then just arrive.</em></h2></div>
    ${stepsBlock()}
  </div>
</section>

${promiseBlock()}

<section class="sec sec--light">
  <div class="container faq__grid">
    <div class="sec__head">${label('FAQ')}<h2 class="h2" data-split>Good <em>questions.</em></h2></div>
    ${faqBlock()}
  </div>
</section>`,
});

const galleryPage = () => {
  const types = ['All', ...new Set(gallery.map((g) => g.type))];
  return layout({
    title: 'Gallery', path: '/gallery/', pt: 'Gallery',
    description: 'Photos from Hilltop Festival and North Goa: the nights on the hill and the slow days in between.',
    body: `
${pageHero({ k: 'Gallery', title: 'Hilltop and Goa, <em>through our lens.</em>', lead: 'Our own photos from Hilltop and around North Goa: the nights on the hill and the slow days in between. Tap any photo to open it.' })}
<section class="container gal">
  <div class="chips" role="group" aria-label="Filter photos">
    ${types.map((t, i) => `<button type="button" class="chip${i === 0 ? ' is-on' : ''}" data-filter="${t}" aria-pressed="${i === 0}">${t}<sup>${t === 'All' ? gallery.length : gallery.filter((g) => g.type === t).length}</sup></button>`).join('')}
  </div>
  <div class="gal__grid">
    ${gallery.map((g, i) => `
    <button type="button" class="witem" data-type="${g.type}" data-photo="${I(g.img)}" data-photo-title="${esc(g.alt)}" data-cursor="View" style="--d:${(i % 4) * 0.06}s">
      <span class="media" data-reveal="img">${img(g.img, g.alt, { sm: true })}</span>
      <span class="witem__meta"><span>${pad(i + 1)}</span><span>${g.type}</span></span>
    </button>`).join('')}
  </div>
</section>`,
  });
};

const applyPage = () => layout({
  title: 'Apply', path: '/apply/', pt: 'Apply',
  description: 'Apply for a seat on the Mooncrew Club Hilltop trip, or call and WhatsApp Siddharth or Vinita.',
  body: `
<section class="contact container">
  <div class="contact__left">
    <div class="phero__top">${label('Apply · 20 seats')}<span class="status"><i></i>${site.status}</span></div>
    <h1 class="contact__title" data-split>Let's <em>talk.</em></h1>
    <p class="contact__lead" data-reveal="fade">Fill in the form and it opens WhatsApp with your application ready to send. Prefer to talk first? Call or WhatsApp either of us, or DM us on Instagram.</p>
    <div class="contact__people" data-reveal="fade">
      ${site.contacts.map((c) => `
      <div class="pcard">
        <span class="pcard__k">${c.role}</span>
        <span class="pcard__name">${esc(c.name)}</span>
        <a class="pcard__num" href="tel:+${c.phone}">${esc(c.show)}</a>
        <div class="pcard__btns">
          <a class="pill" href="tel:+${c.phone}">${phoneIco}<span>Call</span></a>
          <a class="pill" href="${wa(c.phone, waHello)}" target="_blank" rel="noopener">${waIco}<span>WhatsApp</span></a>
        </div>
      </div>`).join('')}
      <div class="pcard pcard--ig">
        <span class="pcard__k">Instagram</span>
        <span class="pcard__name">${site.instagram ? '@' + esc(site.instagram) : 'Mooncrew Club'}</span>
        <span class="pcard__num">DM us anytime</span>
        <div class="pcard__btns">${site.instagram ? `<a class="pill" href="${ig()}" target="_blank" rel="noopener">${igIco}<span>Open Instagram</span></a>` : `<span class="pill pill--muted">${igIco}<span>Search “Mooncrew Club”</span></span>`}</div>
      </div>
    </div>
  </div>

  <div class="contact__right" data-reveal="fade">
    <form class="form" data-form novalidate>
      <div class="form__head"><span class="label">Application</span><span>${trip.name} · ${trip.dates}</span></div>
      <div class="field"><label for="f-name">Your name</label><input id="f-name" name="name" required autocomplete="name"></div>
      <div class="field"><label for="f-phone">WhatsApp number</label><input id="f-phone" name="phone" required autocomplete="tel" inputmode="tel"></div>
      <div class="field"><label for="f-ig">Instagram</label><input id="f-ig" name="instagram" placeholder="@"></div>
      <div class="field"><label for="f-city">City</label><input id="f-city" name="city" autocomplete="address-level2"></div>
      <fieldset class="field field--full"><legend>How many of you?</legend>
        <div class="radios">${['Just me', 'Two of us', '3–4 of us', '5 or more'].map((o, i) => `<label class="radio"><input type="radio" name="people" value="${o}"${i === 0 ? ' checked' : ''}><span>${o}</span></label>`).join('')}</div>
      </fieldset>
      <fieldset class="field field--full"><legend>Room</legend>
        <div class="radios">${['Happy to share', 'Ask me about a private room'].map((o, i) => `<label class="radio"><input type="radio" name="room" value="${o}"${i === 0 ? ' checked' : ''} data-room="${i ? 'private' : 'shared'}"><span>${o}</span></label>`).join('')}</div>
      </fieldset>
      <div class="field field--full"><label for="f-msg">Your best night so far, or anything we should know</label><textarea id="f-msg" name="message" rows="3"></textarea></div>
      <fieldset class="field field--full"><legend>Send it to</legend>
        <div class="radios">${site.contacts.map((c, i) => `<label class="radio"><input type="radio" name="to" value="${c.phone}"${i === 0 ? ' checked' : ''}><span>${esc(c.name)}</span></label>`).join('')}</div>
      </fieldset>
      <div class="form__foot"><p class="form__msg" data-form-msg role="alert"></p>${`<button class="btn btn--gold" type="submit" data-magnetic>${roll('Continue on WhatsApp')}<span class="btn__ico">${waIco}</span></button>`}</div>
    </form>
    <div class="form__done" data-form-done hidden>
      <span class="label">Almost done</span>
      <h2 class="h2">Check <em>WhatsApp.</em></h2>
      <p>Your application is ready in WhatsApp. Just press send. If WhatsApp didn't open, copy the text below and send it to us.</p>
      <pre data-form-text></pre>
      <div class="hero__btns"><button type="button" class="btn btn--dark" data-copy>${roll('Copy text')}</button><a class="btn btn--ghost-dark" data-form-wa href="#" target="_blank" rel="noopener">${roll('Open WhatsApp again')}<span class="btn__ico">${waIco}</span></a></div>
    </div>
  </div>
</section>

<section class="sec sec--light sec--tight">
  <div class="container">
    <div class="sec__head">${label('What happens next')}<h2 class="h2" data-split>Four steps. <em>Then just arrive.</em></h2></div>
    ${stepsBlock()}
  </div>
</section>`,
});

const notFound = () => layout({
  title: 'Lost on the hill', path: '/404.html', pt: '404',
  body: `${pageHero({ k: '404', title: 'Lost on <em>the hill.</em>', lead: 'This page has left the party. Head back home or apply for a seat.', extra: `<div class="hero__btns container-none">${btn('Back home', '/', { variant: 'gold' })}${btn('Apply', '/apply/', { variant: 'ghost' })}</div>` })}`,
});

// ---------- write ----------------------------------------------------------
const write = (p, html) => {
  const f = join(OUT, p);
  mkdirSync(dirname(f), { recursive: true });
  writeFileSync(f, html);
};

rmSync(OUT, { recursive: true, force: true });
mkdirSync(OUT, { recursive: true });
cpSync('assets', join(OUT, 'assets'), { recursive: true });
if (existsSync('public')) cpSync('public', OUT, { recursive: true });
write('index.html', home());
write('hilltop/index.html', hilltopPage());
write('gallery/index.html', galleryPage());
write('apply/index.html', applyPage());
write('404.html', notFound());
write('sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${['/', '/hilltop/', '/gallery/', '/apply/'].map((p) => `  <url><loc>${site.url}${p}</loc></url>`).join('\n')}
</urlset>`);
console.log('Built 5 pages → dist/');
