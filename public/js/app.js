/* ============================================================
   BeatDrop Official — app.js
   Premium music SPA: Spotify API + demo fallback
   Sidebar nav · Music player · Search · All pages
============================================================ */
(function () {
  'use strict';

  /* ─── Icons ──────────────────────────────────────────────── */
  const I = {
    home:    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 11.5 12 4l9 7.5"/><path d="M5 10v9a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1v-9"/></svg>`,
    trend:   `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 17l5-5 4 4 8-9"/><path d="M14 7h6v6"/></svg>`,
    discover:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="m16.2 7.8-2.6 5.6-5.6 2.6 2.6-5.6z"/></svg>`,
    artist:  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 21v-1a8 8 0 0 1 16 0v1"/></svg>`,
    album:   `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="3"/><path d="M15 12a3 3 0 0 0-3-3"/></svg>`,
    playlist:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 6h11M4 12h11M4 18h7"/><circle cx="18" cy="16" r="3"/><path d="M21 16V6l-3 1"/></svg>`,
    genre:   `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z"/></svg>`,
    heart:   `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21s-7.5-4.6-10-9.3C.3 8.4 2 4.8 5.7 4.2c2.1-.3 3.8.8 6.3 3 2.5-2.2 4.2-3.3 6.3-3 3.7.6 5.4 4.2 3.7 7.5C19.5 16.4 12 21 12 21z"/></svg>`,
    heartFill:`<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 21s-7.5-4.6-10-9.3C.3 8.4 2 4.8 5.7 4.2c2.1-.3 3.8.8 6.3 3 2.5-2.2 4.2-3.3 6.3-3 3.7.6 5.4 4.2 3.7 7.5C19.5 16.4 12 21 12 21z"/></svg>`,
    clock:   `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/></svg>`,
    search:  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="m20 20-3-3"/></svg>`,
    about:   `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 16v-5M12 8h.01"/></svg>`,
    shield:  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2 3 7v6c0 5 3.9 9.3 9 10.4C18.1 22.3 22 18 22 13V7z"/></svg>`,
    file:    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M16 13H8M16 17H8M10 9H8"/></svg>`,
    star:    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2l3.1 6.2 6.9 1-5 4.9 1.2 6.9L12 17.7l-6.2 3.3 1.2-6.9L2 9.2l6.9-1z"/></svg>`,
    support: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M9.1 9a3 3 0 0 1 5.8 1c0 2-3 3-3 3M12 17h.01"/></svg>`,
    mail:    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m2 7 10 7 10-7"/></svg>`,
    code:    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="m16 18 6-6-6-6M8 6l-6 6 6 6"/></svg>`,
    play:    `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M7 4.5v15l13-7.5z"/></svg>`,
    pause:   `<svg viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/></svg>`,
    next:    `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M6 4.5v15L17 12z"/><rect x="17" y="5" width="2" height="14" rx="1"/></svg>`,
    prev:    `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M18 4.5v15L7 12z"/><rect x="5" y="5" width="2" height="14" rx="1"/></svg>`,
    shuffle: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h3.5c2 0 3.2 1 4.3 2.5L13 12M3 18h3.5c2 0 3.2-1 4.3-2.5l.4-.5"/><path d="m17 4 4 2-4 2M17 18l4 2-4 2"/><path d="M13 12c1.1 1.5 2.3 2.5 4.3 2.5H21M17.3 7.5H21"/></svg>`,
    repeat:  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="m17 2 4 4-4 4"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><path d="m7 22-4-4 4-4"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/></svg>`,
    vol:     `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M11 5 6 9H3v6h3l5 4z"/><path d="M16 8a5 5 0 0 1 0 8M19 5a9 9 0 0 1 0 14"/></svg>`,
    mute:    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M11 5 6 9H3v6h3l5 4z"/><path d="m17 9 5 5m0-5-5 5"/></svg>`,
    queue:   `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 6h16M4 12h10M4 18h6"/></svg>`,
    check:   `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>`,
    warn:    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m10.3 3.4-8.5 15A1 1 0 0 0 2.7 20h18.6a1 1 0 0 0 .9-1.5l-8.5-15a1 1 0 0 0-1.8 0z"/><path d="M12 9v4M12 17h.01"/></svg>`,
    spotify: `<svg viewBox="0 0 24 24" fill="#1DB954"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/></svg>`,
    arrow:   `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="14" height="14"><path d="M5 12h14M13 6l6 6-6 6"/></svg>`,
  };

  /* ─── State ──────────────────────────────────────────────── */
  const LS = { favs:'bd_favs', recent:'bd_recent', vol:'bd_vol' };
  function lsGet(k, fb) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : fb; } catch { return fb; } }
  function lsSet(k, v)  { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} }

  const S = {
    route: 'home', routeParam: null,
    favs:   new Set(lsGet(LS.favs, [])),
    recent: lsGet(LS.recent, []),
    queue: [], qIdx: -1,
    shuffle: false, repeat: 'off',
    isPlaying: false,
    volume: lsGet(LS.vol, 0.75),
    muted: false,
    isDemo: false,
    searchTerm: '',
    sidebarOpen: false,
  };

  function persistFavs()   { lsSet(LS.favs,   [...S.favs]); }
  function persistRecent() { lsSet(LS.recent,  S.recent); }
  function persistVol()    { lsSet(LS.vol,     S.volume); }

  /* ─── Audio Engine ───────────────────────────────────────── */
  const audio = new Audio();
  audio.volume = S.volume;

  const previewCache = {}; // trackId → url | 'none'

  function currentTrack() {
    return S.queue[S.qIdx] || null;
  }

  async function fetchPreview(track) {
    if (!track) return null;
    if (previewCache[track.id]) return previewCache[track.id] === 'none' ? null : previewCache[track.id];

    // Try YouTube full-track stream via proxy endpoint
    try {
      const q = encodeURIComponent(`${track.title} ${track.artist}`);
      const r = await fetch(`/api/stream?q=${q}`);
      if (r.ok) {
        const d = await r.json();
        if (d.audio) {
          previewCache[track.id] = d.audio;
          if (d.thumbnail && !track.cover) track.cover = d.thumbnail;
          return d.audio;
        }
      }
    } catch {}

    // Fallback: iTunes 30-second preview
    try {
      const q = encodeURIComponent(`${track.title} ${track.artist}`);
      const r = await fetch(`https://itunes.apple.com/search?term=${q}&entity=song&limit=3&media=music`);
      const d = await r.json();
      const hit = d.results?.find(x => x.previewUrl);
      const url = hit?.previewUrl || null;
      previewCache[track.id] = url || 'none';
      if (hit?.artworkUrl100 && !track.cover) track.cover = hit.artworkUrl100.replace('100x100','400x400');
      return url;
    } catch { previewCache[track.id] = 'none'; return null; }
  }

  function addToRecent(id) {
    S.recent = [id, ...S.recent.filter(x => x !== id)].slice(0, 50);
    persistRecent();
  }

  async function loadAndPlay() {
    const t = currentTrack();
    if (!t) return;
    addToRecent(t.id);
    renderPlayerBar();
    setPlayerLoading(true);
    showToast(`Loading track…`, I.search);
    const url = await fetchPreview(t);
    setPlayerLoading(false);
    if (!url) { showToast(`No audio found for "${t.title}"`, I.warn); S.isPlaying = false; renderPlayerBar(); return; }
    audio.src = url;
    audio.currentTime = 0;
    try {
      await audio.play();
      S.isPlaying = true;
      renderPlayerBar();
      renderActiveStates();
      // Update art in case iTunes gave us a real cover
      const artEl = document.getElementById('player-art');
      if (artEl) artEl.src = t.cover || '';
    } catch { S.isPlaying = false; renderPlayerBar(); }
  }

  function setPlayerLoading(on) {
    const btn = document.getElementById('btn-play');
    if (!btn) return;
    if (on) { btn.innerHTML = spinnerSvg(20); btn.disabled = true; btn.classList.add('loading'); }
    else     { btn.disabled = false; btn.classList.remove('loading'); syncPlayBtn(); }
  }
  function spinnerSvg(s) {
    return `<svg viewBox="0 0 24 24" width="${s}" height="${s}" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><circle cx="12" cy="12" r="9" stroke-opacity=".2"/><path d="M21 12a9 9 0 0 1-9 9"/></svg>`;
  }

  function syncPlayBtn() {
    const btn = document.getElementById('btn-play');
    if (!btn) return;
    btn.innerHTML = S.isPlaying ? I.pause : I.play;
    btn.classList.toggle('playing', S.isPlaying);
  }

  function togglePlay() {
    if (!currentTrack()) {
      const ids = (S.isDemo ? DEMO_DATA.tracks : []).slice(0, 20);
      if (ids.length) { S.queue = ids; S.qIdx = 0; loadAndPlay(); }
      return;
    }
    if (audio.paused) {
      audio.play().then(() => { S.isPlaying = true; renderPlayerBar(); renderActiveStates(); }).catch(() => {});
    } else {
      audio.pause(); S.isPlaying = false; renderPlayerBar();
    }
  }

  function nextTrack(force) {
    if (!S.queue.length) return;
    if (S.repeat === 'one' && !force) { audio.currentTime = 0; audio.play(); return; }
    if (S.shuffle) {
      let i; do { i = Math.floor(Math.random() * S.queue.length); } while (S.queue.length > 1 && i === S.qIdx);
      S.qIdx = i;
    } else {
      S.qIdx = (S.qIdx + 1) % S.queue.length;
    }
    loadAndPlay();
  }

  function prevTrack() {
    if (audio.currentTime > 3) { audio.currentTime = 0; return; }
    S.qIdx = (S.qIdx - 1 + S.queue.length) % S.queue.length;
    loadAndPlay();
  }

  function playSingle(track, context) {
    if (context) { S.queue = context; S.qIdx = context.indexOf(track) >= 0 ? context.indexOf(track) : 0; }
    else          { S.queue = [track]; S.qIdx = 0; }
    loadAndPlay();
  }

  audio.addEventListener('ended', () => nextTrack(S.repeat === 'all'));
  audio.addEventListener('timeupdate', updateProgress);
  audio.addEventListener('error', () => { S.isPlaying = false; renderPlayerBar(); });

  function updateProgress() {
    const fill = document.getElementById('progress-fill');
    const curr = document.getElementById('time-curr');
    const dur  = document.getElementById('time-dur');
    if (!fill) return;
    const pct = audio.duration ? (audio.currentTime / audio.duration) * 100 : 0;
    fill.style.width = pct + '%';
    if (curr) curr.textContent = fmt(audio.currentTime);
    if (dur)  dur.textContent  = fmt(audio.duration || (currentTrack()?.duration || 0));
  }

  function fmt(sec) {
    if (!isFinite(sec) || sec < 0) sec = 0;
    const m = Math.floor(sec / 60), s = Math.floor(sec % 60);
    return m + ':' + String(s).padStart(2, '0');
  }
  function fmtNum(n) {
    if (n >= 1e6) return (n/1e6).toFixed(1)+'M';
    if (n >= 1e3) return (n/1e3).toFixed(0)+'K';
    return String(n||0);
  }
  function esc(s) { return String(s||'').replace(/[&<>"']/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }

  /* ─── API + Demo helpers ─────────────────────────────────── */
  async function api(path) {
    try {
      const r = await fetch(path);
      const d = await r.json();
      return d.ok ? d.data : null;
    } catch { return null; }
  }

  function demoBanner() {
    return S.isDemo
      ? `<div class="demo-banner">${I.warn} <span>Demo mode — Deezer API unavailable. Showing sample data.</span></div>`
      : '';
  }

  /* ─── Routing ─────────────────────────────────────────────── */
  const ROUTES = ['home','trending','discover','artists','albums','playlists','genres','favorites','recent','search','about','privacy','terms','credits','support','contact','developer'];

  function navigate(route, param) {
    S.route = route;
    S.routeParam = param || null;
    closeSidebar();
    renderApp();
    window.scrollTo(0, 0);
    document.getElementById('page-content')?.focus();
  }

  // Expose navigate for auth module
  window.__bdNavigate = navigate;

  /* ─── Sidebar ─────────────────────────────────────────────── */
  const NAV_SECTIONS = [
    { label: 'Music', items: [
      { id:'home',      label:'Home',            icon: I.home    },
      { id:'trending',  label:'Trending',         icon: I.trend   },
      { id:'discover',  label:'Discover',         icon: I.discover},
      { id:'artists',   label:'Artists',          icon: I.artist  },
      { id:'albums',    label:'Albums',           icon: I.album   },
      { id:'playlists', label:'Playlists',        icon: I.playlist},
      { id:'genres',    label:'Genres',           icon: I.genre   },
    ]},
    { label: 'Library', items: [
      { id:'favorites', label:'Favorites',        icon: I.heart   },
      { id:'recent',    label:'Recently Played',  icon: I.clock   },
      { id:'search',    label:'Search',           icon: I.search  },
    ]},
    { label: 'Info', items: [
      { id:'about',     label:'About Us',         icon: I.about   },
      { id:'privacy',   label:'Privacy Policy',   icon: I.shield  },
      { id:'terms',     label:'Terms of Service', icon: I.file    },
      { id:'credits',   label:'Credits',          icon: I.star    },
      { id:'support',   label:'Support Center',   icon: I.support },
      { id:'contact',   label:'Contact',          icon: I.mail    },
      { id:'developer', label:'Developer Info',   icon: I.code    },
      { id:'settings',  label:'Settings',           icon: I.settings || '⚙' },
    ]},
  ];

  function renderSidebar() {
    const nav = document.getElementById('sidebar-nav');
    if (!nav) return;
    nav.innerHTML = NAV_SECTIONS.map(sec => `
      <div class="nav-section">
        <div class="nav-section-label">${sec.label}</div>
        ${sec.items.map(item => `
          <div class="nav-item ${S.route === item.id ? 'active' : ''}" data-route="${item.id}">
            ${item.icon}
            <span>${item.label}</span>
          </div>
        `).join('')}
      </div>
    `).join('');
    nav.querySelectorAll('[data-route]').forEach(el => {
      el.addEventListener('click', () => navigate(el.dataset.route));
    });
  }

  function closeSidebar() {
    S.sidebarOpen = false;
    document.getElementById('sidebar')?.classList.remove('open');
    document.getElementById('sidebar-overlay')?.classList.remove('show');
    document.getElementById('hamburger-btn')?.setAttribute('aria-expanded', 'false');
  }

  /* ─── Player Bar ─────────────────────────────────────────── */
  function renderPlayerBar() {
    const bar = document.getElementById('player-bar');
    if (!bar) return;
    const t = currentTrack();
    const isFav = t && S.favs.has(t.id);
    bar.innerHTML = `
      <div class="player-now">
        <img class="player-art${S.isPlaying?' playing':''}" id="player-art"
             src="${t ? esc(t.cover || '') : ''}" alt=""
             onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%2248%22 height=%2248%22%3E%3Crect width=%2248%22 height=%2248%22 fill=%22%23222%22/%3E%3C/svg%3E'"/>
        <div class="player-track-info">
          <div class="player-title">${t ? esc(t.title) : 'Nothing playing'}</div>
          <div class="player-artist">${t ? esc(t.artist) : 'Select a track'}</div>
        </div>
        ${t ? `<button class="player-fav-btn${isFav?' active':''}" id="player-fav" aria-label="Favorite">
          ${isFav ? I.heartFill : I.heart}</button>` : ''}
      </div>

      <div class="player-center">
        <div class="player-controls">
          <button class="ctrl-btn${S.shuffle?' active':''}" id="btn-shuffle" aria-label="Shuffle">${I.shuffle}</button>
          <button class="ctrl-btn" id="btn-prev" aria-label="Previous">${I.prev}</button>
          <button class="ctrl-btn-main${S.isPlaying?' playing':''}" id="btn-play" aria-label="${S.isPlaying?'Pause':'Play'}">
            ${S.isPlaying ? I.pause : I.play}
          </button>
          <button class="ctrl-btn" id="btn-next" aria-label="Next">${I.next}</button>
          <button class="ctrl-btn${S.repeat!=='off'?' active':''}" id="btn-repeat" aria-label="Repeat">${I.repeat}</button>
        </div>
        <div class="player-progress">
          <span class="player-time" id="time-curr">0:00</span>
          <div class="progress-track" id="progress-track">
            <div class="progress-fill" id="progress-fill" style="width:0%"></div>
          </div>
          <span class="player-time right" id="time-dur">${t ? fmt(t.duration) : '0:00'}</span>
          
        </div>
      </div>

      <div class="player-right">
        <button class="vol-btn" id="btn-vol" aria-label="Volume">${S.muted || S.volume === 0 ? I.mute : I.vol}</button>
        <div class="vol-track" id="vol-track">
          <div class="vol-fill" id="vol-fill" style="width:${S.muted ? 0 : S.volume * 100}%"></div>
        </div>
        <button class="queue-btn" id="btn-queue" aria-label="Queue">${I.queue}</button>
        ${t ? `<button class="ctrl-btn" id="btn-download" aria-label="Download" title="Download track">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="18" height="18"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
        </button>` : ''}
      </div>
    `;
    bindPlayerEvents();
    updateProgress();
  }

  function bindPlayerEvents() {
    const on = (id, ev, fn) => { const el = document.getElementById(id); if (el) el.addEventListener(ev, fn); };
    on('btn-play',    'click', togglePlay);
    on('btn-next',    'click', () => nextTrack(true));
    on('btn-prev',    'click', prevTrack);
    on('btn-shuffle', 'click', () => { S.shuffle = !S.shuffle; renderPlayerBar(); });
    on('btn-repeat',  'click', () => { S.repeat = S.repeat==='off'?'all':S.repeat==='all'?'one':'off'; renderPlayerBar(); });
    on('btn-vol',     'click', () => { S.muted = !S.muted; audio.muted = S.muted; renderPlayerBar(); });
    on('btn-download', 'click', async () => {
      const t = currentTrack();
      if (!t) return;
      showToast('Preparing download…', '⬇');
      let url = audio.src;
      if (!url) {
        url = await fetchPreview(t);
      }
      if (!url) { showToast('No audio available to download', '⚠'); return; }
      const a = document.createElement('a');
      a.href = url;
      a.download = `${t.title} - ${t.artist}.mp3`;
      a.target = '_blank';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      showToast('Download started!', '⬇');
    });
    on('player-fav',  'click', () => {
      const t = currentTrack(); if (!t) return;
      S.favs.has(t.id) ? S.favs.delete(t.id) : S.favs.add(t.id);
      persistFavs(); renderPlayerBar(); showToast(S.favs.has(t.id)?'Added to Favorites':'Removed from Favorites', I.heart);
    });
    const pt = document.getElementById('progress-track');
    if (pt) pt.addEventListener('click', e => {
      const r = pt.getBoundingClientRect();
      if (audio.duration) { audio.currentTime = ((e.clientX - r.left) / r.width) * audio.duration; }
    });
    const vt = document.getElementById('vol-track');
    if (vt) vt.addEventListener('click', e => {
      const r = vt.getBoundingClientRect();
      S.volume = Math.max(0, Math.min(1, (e.clientX - r.left) / r.width));
      audio.volume = S.volume; S.muted = S.volume === 0; audio.muted = S.muted;
      persistVol(); renderPlayerBar();
    });
  }

  function renderActiveStates() {
    const t = currentTrack();
    if (!t) return;
    document.querySelectorAll('.track-row').forEach(row => {
      row.classList.toggle('playing', row.dataset.id === t.id);
    });
    document.querySelectorAll('.card-play-btn').forEach(btn => {
      btn.classList.toggle('playing', btn.dataset.id === t.id);
    });
  }

  /* ─── Toast ──────────────────────────────────────────────── */
  let toastTimer;
  function showToast(msg, icon = '') {
    const el = document.getElementById('toast');
    if (!el) return;
    el.innerHTML = (icon ? `<span>${icon}</span>` : '') + esc(msg);
    el.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove('show'), 2800);
  }

  /* ─── Render App ─────────────────────────────────────────── */
  async function renderApp() {
    renderSidebar();
    const content = document.getElementById('page-content');
    if (!content) return;
    content.innerHTML = `<div class="loading-state"><div class="spinner"></div></div>`;

    switch (S.route) {
      case 'home':      await renderHome(content);      break;
      case 'trending':  await renderTrending(content);  break;
      case 'discover':  await renderDiscover(content);  break;
      case 'artists':   S.routeParam ? await renderArtistDetail(content, S.routeParam) : await renderArtists(content); break;
      case 'albums':    S.routeParam ? await renderAlbumDetail(content, S.routeParam)  : await renderAlbums(content);  break;
      case 'playlists': S.routeParam ? await renderPlaylistDetail(content, S.routeParam): await renderPlaylists(content); break;
      case 'genres':    S.routeParam ? await renderGenreDetail(content, S.routeParam)  : await renderGenres(content);  break;
      case 'favorites': renderFavorites(content);        break;
      case 'recent':    renderRecentPlayed(content);     break;
      case 'search':    renderSearchPage(content);       break;
      case 'about':     renderAbout(content);            break;
      case 'privacy':   renderPrivacy(content);          break;
      case 'terms':     renderTerms(content);            break;
      case 'credits':   renderCredits(content);          break;
      case 'support':   renderSupport(content);          break;
      case 'contact':   renderContact(content);          break;
      case 'developer': renderDeveloper(content);        break;
      case 'settings':   renderSettings(content);         break;
      default:          await renderHome(content);
    }
  }

  /* ─── Shared Components ───────────────────────────────────── */
  function trackCard(t, context) {
    const cid = context?.map(x=>x.id||x).join(',') || '';
    return `
      <div class="card track-card" data-id="${esc(t.id)}" data-ctx="${esc(cid)}" tabindex="0" role="button" aria-label="Play ${esc(t.title)}">
        <div class="card-img-wrap">
          <img class="card-img" src="${esc(t.cover||'')}" alt="${esc(t.title)}" loading="lazy"
               onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22160%22 height=%22160%22%3E%3Crect width=%22160%22 height=%22160%22 fill=%22%23222%22/%3E%3C/svg%3E'"/>
          <button class="card-play-btn${S.isPlaying && currentTrack()?.id===t.id?' playing':''}" data-id="${esc(t.id)}" aria-label="Play">${I.play}</button>
        </div>
        <div class="card-info">
          <div class="card-title">${esc(t.title)}</div>
          <div class="card-sub">${esc(t.artist)}</div>
          ${t.explicit ? '<div class="card-meta"><span class="card-explicit">E</span></div>' : ''}
        </div>
      </div>`;
  }

  function artistCard(a) {
    return `
      <div class="card artist-card" data-artist-id="${esc(a.id)}" tabindex="0" role="button" aria-label="${esc(a.name)}">
        <div class="card-img-wrap">
          <img class="card-img" src="${esc(a.image||a.imageLarge||'')}" alt="${esc(a.name)}" loading="lazy"
               onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22110%22 height=%22110%22%3E%3Ccircle cx=%2255%22 cy=%2255%22 r=%2255%22 fill=%22%23333%22/%3E%3C/svg%3E'"/>
        </div>
        <div class="card-info">
          <div class="card-title">${esc(a.name)}</div>
          <div class="artist-genre">${esc((a.genres||[a.genre||'']).slice(0,2).join(' · '))}</div>
          ${a.followers ? `<div class="card-sub">${fmtNum(a.followers)} followers</div>` : ''}
        </div>
      </div>`;
  }

  function albumCard(a) {
    return `
      <div class="card album-card" data-album-id="${esc(a.id)}" tabindex="0" role="button" aria-label="${esc(a.name)}">
        <div class="card-img-wrap">
          <img class="card-img" src="${esc(a.cover||'')}" alt="${esc(a.name)}" loading="lazy"
               onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22160%22 height=%22160%22%3E%3Crect width=%22160%22 height=%22160%22 fill=%22%23222%22/%3E%3C/svg%3E'"/>
          <button class="card-play-btn" data-album-id="${esc(a.id)}" aria-label="Open album">${I.play}</button>
        </div>
        <div class="card-info">
          <div class="card-title">${esc(a.name)}</div>
          <div class="card-sub">${esc(a.artist||'')} ${a.year?'· '+a.year:''}</div>
          ${a.totalTracks ? `<div class="card-sub">${a.totalTracks} tracks</div>` : ''}
        </div>
      </div>`;
  }

  function playlistCard(p) {
    return `
      <div class="card playlist-card" data-playlist-id="${esc(p.id)}" tabindex="0" role="button" aria-label="${esc(p.name)}">
        <div class="card-img-wrap">
          <img class="card-img" src="${esc(p.cover||'')}" alt="${esc(p.name)}" loading="lazy"
               onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22160%22 height=%22160%22%3E%3Crect width=%22160%22 height=%22160%22 fill=%22%23222%22/%3E%3C/svg%3E'"/>
          <button class="card-play-btn" data-playlist-id="${esc(p.id)}" aria-label="Open playlist">${I.play}</button>
        </div>
        <div class="card-info">
          <div class="card-title">${esc(p.name)}</div>
          <div class="card-sub">${esc(p.owner||'BeatDrop')}${p.tracks?' · '+p.tracks+' tracks':''}</div>
        </div>
      </div>`;
  }

  function trackRow(t, idx, context) {
    const isFav = S.favs.has(t.id);
    const isPlaying = currentTrack()?.id === t.id;
    const ctxIds = context?.map(x=>x.id||x)||[];
    return `
      <div class="track-row${isPlaying?' playing':''}" data-id="${esc(t.id)}" data-ctx='${JSON.stringify(ctxIds)}' tabindex="0" role="row">
        <div class="tr-num">
          <span class="num">${idx+1}</span>
          <span class="play-icon">${isPlaying ? I.pause : I.play}</span>
        </div>
        <img class="tr-art" src="${esc(t.cover||'')}" alt="" loading="lazy"
             onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%2244%22 height=%2244%22%3E%3Crect width=%2244%22 height=%2244%22 fill=%22%23333%22/%3E%3C/svg%3E'"/>
        <div class="tr-info">
          <div class="tr-title">${esc(t.title)}${t.explicit?` <span class="card-explicit">E</span>`:''}</div>
          <div class="tr-artist" data-artist-id="${esc(t.artistId||'')}">${esc(t.artist)}</div>
        </div>
        <div class="tr-album">${esc(t.album||'')}</div>
        <div class="tr-dur">${fmt(t.duration)}</div>
        <div class="tr-actions">
          <button class="tr-action-btn${isFav?' active':''}" data-fav="${esc(t.id)}" title="Favorite" aria-label="Favorite">
            ${isFav ? I.heartFill : I.heart}
          </button>
          ${t.externalUrl ? `<a href="${esc(t.externalUrl)}" target="_blank" rel="noopener" class="tr-action-btn" title="Open in Spotify">${I.spotify}</a>` : ''}
        </div>
      </div>`;
  }

  function hScrollSection(title, icon, cards, seeAllRoute) {
    return `
      <div class="section">
        <div class="section-header">
          <h2 class="section-title">${icon||''}${esc(title)}</h2>
          ${seeAllRoute ? `<span class="section-link" data-route="${seeAllRoute}">See all ${I.arrow}</span>` : ''}
        </div>
        <div class="h-scroll">${cards}</div>
      </div>`;
  }

  /* ─── HOME ───────────────────────────────────────────────── */
  async function renderHome(el) {
    const [trending, releases, playlists, genres] = await Promise.all([
      api('/api/trending'),
      api('/api/new-releases'),
      api('/api/playlists/featured'),
      api('/api/genres'),
    ]);
    // isDemo already set from /api/status in init(); only override if we got real data
    if (trending || releases) S.isDemo = false;

    const tracks  = trending  || DEMO_DATA.tracks.slice(0, 12);
    const albums  = releases  || DEMO_DATA.albums;
    const pls     = playlists || DEMO_DATA.playlists;
    const gnrs    = genres    || DEMO_DATA.genres;

    updateStatusDot(S.isDemo ? 'demo' : 'connected');

    el.innerHTML = `
      ${demoBanner()}
      <div class="hero">
        <div class="hero-bg"></div>
        <div class="hero-orbs"><div class="hero-orb"></div><div class="hero-orb"></div><div class="hero-orb"></div></div>
        <div class="hero-content">
          <div class="hero-eyebrow">Now Playing</div>
          <h1 class="hero-title">Feel the <span>Drop.</span><br>Live the Music.</h1>
          <p class="hero-desc">Discover trending songs, explore artists, and stream 30-second previews — no account required.</p>
          <div class="hero-actions">
            <button class="btn btn-primary" id="hero-play">${I.play} Play Trending</button>
            <button class="btn btn-ghost" id="hero-browse">${I.playlist} Browse Playlists</button>
          </div>
        </div>
      </div>

      ${hScrollSection('🔥 Trending Now', '', tracks.slice(0,12).map(t => trackCard(t, tracks)).join(''), 'trending')}
      ${hScrollSection('💿 New Releases', '', albums.slice(0,10).map(albumCard).join(''), 'albums')}
      ${hScrollSection('🎵 Featured Playlists', '', pls.slice(0,8).map(playlistCard).join(''), 'playlists')}
      ${hScrollSection('🎸 Browse Genres', '', gnrs.slice(0,12).map(g => genreChip(g)).join(''), 'genres')}
    `;
    bindContentEvents(el, tracks);
    el.querySelector('#hero-play')?.addEventListener('click', () => { S.queue = tracks; S.qIdx = 0; loadAndPlay(); });
    el.querySelector('#hero-browse')?.addEventListener('click', () => navigate('playlists'));
  }

  function genreChip(g) {
    const [c1, c2] = g.colors || ['#8b5cf6','#ff2ec4'];
    const icon = g.icons || '';
    return `<div class="genre-card" data-genre-id="${esc(g.id)}" style="background:linear-gradient(135deg,${c1},${c2})">
      <span>${icon} ${esc(g.name)}</span>
    </div>`;
  }

  /* ─── TRENDING ────────────────────────────────────────────── */
  async function renderTrending(el) {
    const data = await api('/api/trending') || DEMO_DATA.tracks;
    S.isDemo = !data || data === DEMO_DATA.tracks;
    el.innerHTML = `
      ${demoBanner()}
      <div class="page-header">
        <h1 class="page-title">${I.trend} Trending Now</h1>
        <p class="page-subtitle">The hottest tracks right now</p>
      </div>
      <div class="track-list">${data.map((t,i) => trackRow(t, i, data)).join('')}</div>
    `;
    bindContentEvents(el, data);
  }

  /* ─── DISCOVER ───────────────────────────────────────────── */
  async function renderDiscover(el) {
    const [releases, playlists] = await Promise.all([api('/api/new-releases'), api('/api/playlists/featured')]);
    const albums = releases  || DEMO_DATA.albums;
    const pls    = playlists || DEMO_DATA.playlists;
    el.innerHTML = `
      ${demoBanner()}
      <div class="page-header">
        <h1 class="page-title">${I.discover} Discover</h1>
        <p class="page-subtitle">Fresh drops and new sounds</p>
      </div>
      ${hScrollSection('New Albums', '', albums.map(albumCard).join(''), 'albums')}
      ${hScrollSection('Editor\'s Picks', '', pls.map(playlistCard).join(''), 'playlists')}
    `;
    bindContentEvents(el);
  }

  /* ─── ARTISTS ─────────────────────────────────────────────── */
  async function renderArtists(el) {
    const data = await api('/api/artists/popular') || DEMO_DATA.artists;
    el.innerHTML = `
      ${demoBanner()}
      <div class="page-header">
        <h1 class="page-title">${I.artist} Popular Artists</h1>
      </div>
      <div class="cards-grid">${data.map(artistCard).join('')}</div>
    `;
    bindContentEvents(el);
  }

  async function renderArtistDetail(el, id) {
    const [artist, tracks, albums, related] = await Promise.all([
      api(`/api/artists/${id}`),
      api(`/api/artists/${id}/tracks`),
      api(`/api/artists/${id}/albums`),
      api(`/api/artists/${id}/related`),
    ]);
    if (!artist) { el.innerHTML = `<div class="empty-state"><p>Artist not found.</p></div>`; return; }
    el.innerHTML = `
      <div class="artist-hero">
        <div class="artist-hero-bg"></div>
        ${artist.imageLarge ? `<img class="artist-hero-img" src="${esc(artist.imageLarge)}" alt=""/>` : ''}
        <div class="artist-hero-content">
          <img class="artist-avatar" src="${esc(artist.image||artist.imageLarge||'')}" alt="${esc(artist.name)}"/>
          <h1 class="artist-name">${esc(artist.name)}</h1>
          <div class="artist-meta">
            ${(artist.genres||[]).map(g=>`<span class="genre-tag">${esc(g)}</span>`).join('')}
            ${artist.followers ? `<span class="artist-meta-item">${fmtNum(artist.followers)} followers</span>` : ''}
            ${artist.popularity ? `<span class="artist-meta-item">Popularity ${artist.popularity}</span>` : ''}
          </div>
          <div style="margin-top:16px; display:flex; gap:10px; flex-wrap:wrap;">
            ${artist.externalUrl ? `<a class="spotify-link" href="${esc(artist.externalUrl)}" target="_blank" rel="noopener">${I.spotify} Open in Spotify</a>` : ''}
          </div>
        </div>
      </div>
      ${tracks?.length ? `
        <div class="section">
          <h2 class="section-title">Top Tracks</h2>
          <div class="track-list">${tracks.map((t,i) => trackRow(t, i, tracks)).join('')}</div>
        </div>` : ''}
      ${albums?.length ? hScrollSection('Albums', '', albums.map(albumCard).join('')) : ''}
      ${related?.length ? hScrollSection('Related Artists', '', related.map(artistCard).join('')) : ''}
    `;
    bindContentEvents(el, tracks);
  }

  /* ─── ALBUMS ──────────────────────────────────────────────── */
  async function renderAlbums(el) {
    const data = await api('/api/new-releases') || DEMO_DATA.albums;
    el.innerHTML = `
      ${demoBanner()}
      <div class="page-header">
        <h1 class="page-title">${I.album} New Releases</h1>
      </div>
      <div class="cards-grid">${data.map(albumCard).join('')}</div>
    `;
    bindContentEvents(el);
  }

  async function renderAlbumDetail(el, id) {
    const album = await api(`/api/albums/${id}`);
    if (!album) { el.innerHTML = `<div class="empty-state"><p>Album not found.</p></div>`; return; }
    const tracks = album.tracks || [];
    el.innerHTML = `
      <div class="hero" style="min-height:200px">
        <div class="hero-bg"></div>
        <div class="hero-orbs"><div class="hero-orb"></div></div>
        <div class="hero-content" style="display:flex;align-items:center;gap:24px;flex-wrap:wrap">
          <img src="${esc(album.coverLarge||album.cover||'')}" alt="" style="width:120px;height:120px;border-radius:12px;object-fit:cover;flex-shrink:0"/>
          <div>
            <div style="font-size:11px;letter-spacing:2px;color:var(--text-2);text-transform:uppercase;margin-bottom:6px">${esc(album.albumType||'Album')}</div>
            <h1 style="font-family:'Space Grotesk',sans-serif;font-size:28px;font-weight:700;color:var(--text-1)">${esc(album.name)}</h1>
            <div style="color:var(--text-2);margin-top:6px">${esc(album.artist)} · ${esc(album.year||'')} · ${album.totalTracks||tracks.length} tracks</div>
            <div style="margin-top:12px;display:flex;gap:10px;flex-wrap:wrap">
              <button class="btn btn-primary" id="album-play-btn">${I.play} Play Album</button>
              ${album.externalUrl ? `<a class="spotify-link" href="${esc(album.externalUrl)}" target="_blank" rel="noopener">${I.spotify} Spotify</a>` : ''}
            </div>
          </div>
        </div>
      </div>
      ${tracks.length ? `<div class="track-list" style="margin-top:24px">${tracks.map((t,i)=>trackRow(t,i,tracks)).join('')}</div>` : ''}
    `;
    el.querySelector('#album-play-btn')?.addEventListener('click', () => { if (tracks.length) { S.queue=tracks; S.qIdx=0; loadAndPlay(); }});
    bindContentEvents(el, tracks);
  }

  /* ─── PLAYLISTS ───────────────────────────────────────────── */
  async function renderPlaylists(el) {
    const data = await api('/api/playlists/featured') || DEMO_DATA.playlists;
    el.innerHTML = `
      ${demoBanner()}
      <div class="page-header">
        <h1 class="page-title">${I.playlist} Featured Playlists</h1>
      </div>
      <div class="cards-grid">${data.map(playlistCard).join('')}</div>
    `;
    bindContentEvents(el);
  }

  async function renderPlaylistDetail(el, id) {
    const [playlist, tracks] = await Promise.all([api(`/api/playlists/${id}`), api(`/api/playlists/${id}/tracks`)]);
    const pl = playlist || DEMO_DATA.playlists.find(p => p.id === id);
    const tks = tracks || DEMO_DATA.tracks.slice(0, 12);
    if (!pl) { el.innerHTML = `<div class="empty-state"><p>Playlist not found.</p></div>`; return; }
    el.innerHTML = `
      <div class="hero" style="min-height:200px">
        <div class="hero-bg"></div>
        <div class="hero-orbs"><div class="hero-orb"></div></div>
        <div class="hero-content" style="display:flex;align-items:center;gap:24px;flex-wrap:wrap">
          <img src="${esc(pl.cover||'')}" alt="" style="width:120px;height:120px;border-radius:12px;object-fit:cover;flex-shrink:0"/>
          <div>
            <h1 style="font-family:'Space Grotesk',sans-serif;font-size:28px;font-weight:700">${esc(pl.name)}</h1>
            <div style="color:var(--text-2);margin-top:4px">${esc(pl.description||'')} · ${esc(pl.owner||'BeatDrop')}</div>
            <div style="margin-top:12px;display:flex;gap:10px;flex-wrap:wrap">
              <button class="btn btn-primary" id="pl-play-btn">${I.play} Play All</button>
              ${pl.externalUrl ? `<a class="spotify-link" href="${esc(pl.externalUrl)}" target="_blank" rel="noopener">${I.spotify} Spotify</a>` : ''}
            </div>
          </div>
        </div>
      </div>
      ${tks.length ? `<div class="track-list" style="margin-top:24px">${tks.map((t,i)=>trackRow(t,i,tks)).join('')}</div>` : '<div class="empty-state"><p>No tracks found.</p></div>'}
    `;
    el.querySelector('#pl-play-btn')?.addEventListener('click', () => { if (tks.length) { S.queue=tks; S.qIdx=0; loadAndPlay(); }});
    bindContentEvents(el, tks);
  }

  /* ─── GENRES ──────────────────────────────────────────────── */
  async function renderGenres(el) {
    const data = await api('/api/genres') || DEMO_DATA.genres;
    const gnrs = data.map ? data : DEMO_DATA.genres;
    el.innerHTML = `
      ${demoBanner()}
      <div class="page-header">
        <h1 class="page-title">${I.genre} Browse Genres</h1>
      </div>
      <div class="h-scroll" style="flex-wrap:wrap;overflow:visible">${gnrs.map(g=>{
        const dg = DEMO_DATA.genres.find(d=>d.id===g.id||d.name.toLowerCase()===g.name?.toLowerCase());
        const [c1,c2] = dg?.colors || ['#8b5cf6','#ff2ec4'];
        const icon = dg?.icons || '🎵';
        return `<div class="genre-card" data-genre-id="${esc(g.id)}" style="background:linear-gradient(135deg,${c1},${c2});width:160px;height:90px;"><span>${icon} ${esc(g.name)}</span></div>`;
      }).join('')}</div>
    `;
    bindContentEvents(el);
  }

  async function renderGenreDetail(el, id) {
    const [playlists, genres] = await Promise.all([api(`/api/genres/${id}/playlists`), api('/api/genres')]);
    const genre = (genres||DEMO_DATA.genres).find(g=>g.id===id);
    const pls = playlists || DEMO_DATA.playlists.slice(0,6);
    el.innerHTML = `
      <div class="page-header">
        <h1 class="page-title">${esc(genre?.name||'Genre')}</h1>
        <p class="page-subtitle">Browse playlists in this genre</p>
      </div>
      <div class="cards-grid">${pls.map(playlistCard).join('')}</div>
    `;
    bindContentEvents(el);
  }

  /* ─── FAVORITES ───────────────────────────────────────────── */
  function renderFavorites(el) {
    const tracks = [...S.favs].map(id => {
      return DEMO_DATA.tracks.find(t => t.id === id) || { id, title:'Unknown', artist:'', cover:'', duration:0 };
    });
    el.innerHTML = `
      <div class="page-header">
        <h1 class="page-title">${I.heart} Your Favorites</h1>
        <p class="page-subtitle">${tracks.length} saved tracks</p>
      </div>
      ${tracks.length ? `<div class="track-list">${tracks.map((t,i)=>trackRow(t,i,tracks)).join('')}</div>`
        : `<div class="empty-state">
             <div class="fav-empty-icon">${I.heart}</div>
             <p>No favorites yet. Hit the ♥ on any track to save it here.</p>
           </div>`}
    `;
    bindContentEvents(el, tracks);
  }

  /* ─── RECENTLY PLAYED ─────────────────────────────────────── */
  function renderRecentPlayed(el) {
    const tracks = [...new Set(S.recent)].slice(0, 30).map(id =>
      DEMO_DATA.tracks.find(t => t.id === id) || { id, title:'Unknown', artist:'', cover:'', duration:0 }
    );
    el.innerHTML = `
      <div class="page-header">
        <h1 class="page-title">${I.clock} Recently Played</h1>
        <p class="page-subtitle">${tracks.length} tracks</p>
      </div>
      ${tracks.length ? `<div class="track-list">${tracks.map((t,i)=>trackRow(t,i,tracks)).join('')}</div>`
        : `<div class="empty-state">${I.clock}<p>No history yet. Start listening!</p></div>`}
    `;
    bindContentEvents(el, tracks);
  }

  /* ─── SEARCH PAGE ─────────────────────────────────────────── */
  function renderSearchPage(el) {
    el.innerHTML = `
      <div class="page-header">
        <h1 class="page-title">${I.search} Search</h1>
      </div>
      <div style="max-width:520px;margin-bottom:28px">
        <div class="topbar-search-wrap" style="position:relative;display:flex;align-items:center;max-width:none">
          <div class="search-icon-wrap" style="position:absolute;left:14px;z-index:1">${I.search}</div>
          <input class="search-input" id="search-page-input" type="search" placeholder="Search songs, artists, albums, playlists…" autocomplete="off" style="width:100%"/>
        </div>
      </div>
      <div id="search-page-results"></div>
      <div class="section" style="margin-top:8px">
        <h2 class="section-title">Browse Genres</h2>
        <div class="h-scroll">${(DEMO_DATA.genres).map(g => {
          const [c1,c2] = g.colors;
          return `<div class="genre-card" data-genre-id="${esc(g.id)}" style="background:linear-gradient(135deg,${c1},${c2})"><span>${g.icons} ${esc(g.name)}</span></div>`;
        }).join('')}</div>
      </div>
    `;
    const input = el.querySelector('#search-page-input');
    const results = el.querySelector('#search-page-results');
    let timer;
    input?.addEventListener('input', e => {
      clearTimeout(timer);
      timer = setTimeout(() => doPageSearch(e.target.value.trim(), results), 350);
    });
    bindContentEvents(el);
  }

  async function doPageSearch(q, container) {
    if (!q) { container.innerHTML = ''; return; }
    container.innerHTML = `<div class="loading-state"><div class="spinner"></div></div>`;
    const data = await api(`/api/search?q=${encodeURIComponent(q)}&types=track,artist,album,playlist`);
    if (!data || (!data.tracks?.length && !data.artists?.length && !data.albums?.length && !data.playlists?.length)) {
      // Demo fallback
      const lq = q.toLowerCase();
      const tracks  = DEMO_DATA.tracks.filter(t => t.title.toLowerCase().includes(lq) || t.artist.toLowerCase().includes(lq));
      const artists = DEMO_DATA.artists.filter(a => a.name.toLowerCase().includes(lq));
      renderSearchResults(container, { tracks, artists, albums:[], playlists:[] });
    } else {
      renderSearchResults(container, data);
    }
  }

  function renderSearchResults(container, data) {
    const { tracks=[], artists=[], albums=[], playlists=[] } = data;
    if (!tracks.length && !artists.length && !albums.length && !playlists.length) {
      container.innerHTML = `<div class="empty-state"><p>No results found. Try a different search.</p></div>`;
      return;
    }
    container.innerHTML = `
      ${tracks.length ? `<div class="section"><h2 class="section-title">Songs</h2><div class="track-list">${tracks.slice(0,6).map((t,i)=>trackRow(t,i,tracks)).join('')}</div></div>` : ''}
      ${artists.length ? hScrollSection('Artists', '', artists.slice(0,8).map(artistCard).join('')) : ''}
      ${albums.length  ? hScrollSection('Albums',  '', albums.slice(0,8).map(albumCard).join(''))  : ''}
      ${playlists.length ? hScrollSection('Playlists','',playlists.slice(0,6).map(playlistCard).join('')) : ''}
    `;
    bindContentEvents(container, tracks);
  }

  /* ─── INFO PAGES ──────────────────────────────────────────── */
  function renderAbout(el) {
    el.innerHTML = `<div class="info-page">
      <h1>About BeatDrop Official</h1>
      <p class="lead">BeatDrop Official is a premium music streaming and discovery platform that lets you explore trending songs, discover artists, browse albums, and preview tracks — all without creating an account.</p>
      <h2>Our Mission</h2>
      <p>We believe music should be accessible to everyone. BeatDrop bridges the gap between music discovery and listening by providing a beautiful, cinematic interface powered by the Spotify catalog.</p>
      <h2>Features</h2>
      <ul>
        <li>Stream full tracks via YouTube</li>
        <li>Discover trending tracks and new releases</li>
        <li>Explore artists, albums, playlists, and genres</li>
        <li>Save favorites and track your listening history</li>
        <li>Real-time search across the entire Spotify catalog</li>
        <li>Works on all devices — no account required</li>
      </ul>
      <h2>Technology</h2>
      <p>BeatDrop is built with Node.js, Express, and vanilla JavaScript. Music data is sourced from the Spotify Web API. The UI is designed for a cinematic, premium dark experience with glassmorphism effects and smooth animations.</p>
      <div style="margin-top:28px;padding:20px;background:var(--bg-card);border-radius:var(--radius);border:1px solid var(--border)">
        <div style="display:flex;align-items:center;gap:12px">
          <div style="width:40px;height:40px;border-radius:50%;background:linear-gradient(135deg,#8b5cf6,#ff2ec4);display:flex;align-items:center;justify-content:center">${I.spotify}</div>
          <div><div style="font-weight:600">Powered by Spotify</div><div style="font-size:12px;color:var(--text-2)">Music data from the Spotify Web API</div></div>
        </div>
      </div>
    </div>`;
  }

  function renderPrivacy(el) {
    el.innerHTML = `<div class="info-page">
      <h1>Privacy Policy</h1>
      <p class="lead">Your privacy is important to us. This policy explains how BeatDrop Official handles your information.</p>
      <h2>Data We Collect</h2>
      <p>BeatDrop Official does not collect personal data. Favorites, listening history, and preferences are stored locally in your browser using localStorage and never sent to our servers.</p>
      <h2>Third-Party APIs</h2>
      <p>We use the Spotify Web API to fetch music data. Your searches may be passed to Spotify's servers. Please review <a href="https://www.spotify.com/privacy" target="_blank">Spotify's Privacy Policy</a> for details.</p>
      <h2>Cookies</h2>
      <p>BeatDrop does not use tracking cookies. We may use technical session data to maintain your listening session.</p>
      <h2>Children's Privacy</h2>
      <p>BeatDrop is not directed at children under 13. We do not knowingly collect information from children.</p>
      <h2>Changes</h2>
      <p>We may update this policy from time to time. Continued use of the platform after changes constitutes your acceptance of the updated policy.</p>
      <h2>Contact</h2>
      <p>If you have privacy concerns, please contact us via the <span class="section-link" data-route="contact" style="cursor:pointer">Contact page</span>.</p>
    </div>`;
    el.querySelector('[data-route="contact"]')?.addEventListener('click', () => navigate('contact'));
  }

  function renderTerms(el) {
    el.innerHTML = `<div class="info-page">
      <h1>Terms of Service</h1>
      <p class="lead">By using BeatDrop Official, you agree to these Terms of Service.</p>
      <h2>Acceptance</h2>
      <p>Use of BeatDrop Official constitutes acceptance of these terms. If you disagree, please discontinue use.</p>
      <h2>Music Content</h2>
      <p>Music is streamed via YouTube. BeatDrop does not host or distribute audio files.</p>
      <h2>Permitted Use</h2>
      <ul>
        <li>Personal, non-commercial music discovery and preview</li>
        <li>Sharing links to artists, albums, and playlists</li>
      </ul>
      <h2>Prohibited Use</h2>
      <ul>
        <li>Downloading or redistributing audio content</li>
        <li>Scraping or bulk-fetching music data</li>
        <li>Commercial use without written permission</li>
      </ul>
      <h2>Disclaimers</h2>
      <p>BeatDrop is provided "as is" without warranties. We are not responsible for the availability or accuracy of third-party music data.</p>
      <h2>Termination</h2>
      <p>We reserve the right to restrict access for violations of these terms.</p>
    </div>`;
  }

  function renderCredits(el) {
    el.innerHTML = `<div class="info-page">
      <h1>Credits</h1>
      <p class="lead">BeatDrop Official is made possible by these amazing technologies and services.</p>
      <h2>Music Data</h2>
      <ul>
        <li><a href="https://developer.spotify.com" target="_blank">Spotify Web API</a> — Music catalog, previews, and metadata</li>
        <li><a href="https://affiliate.itunes.apple.com/resources/documentation/itunes-store-web-service-search-api/" target="_blank">iTunes Search API</a> — Fallback preview URLs</li>
      </ul>
      <h2>Technologies</h2>
      <ul>
        <li>Node.js + Express — Backend server</li>
        <li>Vanilla JavaScript — Frontend SPA</li>
        <li>Google Fonts — Space Grotesk & Inter typefaces</li>
        <li>Render.com — Cloud hosting</li>
      </ul>
      <h2>Design Inspiration</h2>
      <ul>
        <li>Spotify — UI patterns and music player design</li>
        <li>Apple Music — Visual hierarchy and typography</li>
        <li>Audiomack — Dark theme aesthetics</li>
      </ul>
      <h2>Open Source</h2>
      <p>BeatDrop uses the <a href="https://www.npmjs.com/package/dotenv" target="_blank">dotenv</a> and <a href="https://www.npmjs.com/package/node-fetch" target="_blank">node-fetch</a> npm packages.</p>
    </div>`;
  }

  function renderSupport(el) {
    el.innerHTML = `<div class="info-page">
      <h1>Support Center</h1>
      <p class="lead">Having trouble? We've got answers to common questions.</p>
      <h2>Playback Issues</h2>
      <p><strong>No preview playing?</strong> Spotify only provides 30-second previews for most tracks. Some tracks may not have previews available — this is a Spotify limitation, not a BeatDrop issue.</p>
      <p><strong>Audio not loading?</strong> Check your internet connection. Preview clips are fetched from Spotify's CDN and require network access.</p>
      <h2>Spotify API / Live Data</h2>
      <p><strong>Seeing demo data?</strong> The platform administrator needs to add <code>SPOTIFY_CLIENT_ID</code> and <code>SPOTIFY_CLIENT_SECRET</code> environment variables. Contact the developer.</p>
      <h2>Favorites Not Saving</h2>
      <p>Favorites are stored in your browser's localStorage. Make sure you're not in private/incognito mode, and that you haven't disabled localStorage in your browser settings.</p>
      <h2>Search Not Working</h2>
      <p>Search requires an active Spotify API connection. In demo mode, search will only find tracks from the demo catalog.</p>
      <h2>Still Need Help?</h2>
      <p>Contact us via the <span class="section-link" data-route="contact" style="cursor:pointer">Contact page</span> and we'll get back to you as soon as possible.</p>
    </div>`;
    el.querySelector('[data-route="contact"]')?.addEventListener('click', () => navigate('contact'));
  }

  function renderContact(el) {
    el.innerHTML = `<div class="info-page">
      <h1>Contact Us</h1>
      <p class="lead">Have a question, suggestion, or found a bug? Reach out!</p>
      <div id="contact-msg-banner"></div>
      <div class="contact-form">
        <div class="form-group">
          <label class="form-label">Your Name</label>
          <input class="form-input" type="text" id="contact-name" placeholder="Jane Doe"/>
        </div>
        <div class="form-group">
          <label class="form-label">Email Address</label>
          <input class="form-input" type="email" id="contact-email" placeholder="jane@example.com"/>
        </div>
        <div class="form-group">
          <label class="form-label">Subject</label>
          <input class="form-input" type="text" id="contact-subject" placeholder="Bug report, feature request, etc."/>
        </div>
        <div class="form-group">
          <label class="form-label">Message</label>
          <textarea class="form-textarea" id="contact-message" placeholder="Tell us what's on your mind…"></textarea>
        </div>
        <button class="btn btn-primary" id="contact-submit">${I.mail} Send Message</button>
      </div>
    </div>`;

    el.querySelector('#contact-submit')?.addEventListener('click', async () => {
      const name    = el.querySelector('#contact-name')?.value.trim();
      const email   = el.querySelector('#contact-email')?.value.trim();
      const subject = el.querySelector('#contact-subject')?.value.trim();
      const message = el.querySelector('#contact-message')?.value.trim();
      const banner  = el.querySelector('#contact-msg-banner');
      const btn     = el.querySelector('#contact-submit');

      if (!name || !email || !message) {
        banner.innerHTML = `<div class="demo-banner" style="margin-bottom:16px">${I.warn} Please fill in your name, email and message.</div>`;
        return;
      }

      btn.disabled = true;
      btn.innerHTML = `${spinnerSvg(16)} Sending…`;
      banner.innerHTML = '';

      try {
        const r = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, subject, message }),
        });
        const d = await r.json();
        if (d.ok) {
          banner.innerHTML = `<div style="background:rgba(29,185,84,0.1);border:1px solid rgba(29,185,84,0.3);border-radius:10px;padding:14px 16px;color:#1DB954;margin-bottom:16px;display:flex;align-items:center;gap:10px">${I.check} Message sent! We'll get back to you soon.</div>`;
          el.querySelector('#contact-name').value = '';
          el.querySelector('#contact-email').value = '';
          el.querySelector('#contact-subject').value = '';
          el.querySelector('#contact-message').value = '';
        } else {
          banner.innerHTML = `<div class="demo-banner" style="margin-bottom:16px">${I.warn} ${d.error || 'Failed to send. Please try again.'}</div>`;
        }
      } catch {
        banner.innerHTML = `<div class="demo-banner" style="margin-bottom:16px">${I.warn} Network error. Please try again.</div>`;
      }

      btn.disabled = false;
      btn.innerHTML = `${I.mail} Send Message`;
    });
  }

  function renderDeveloper(el) {
    el.innerHTML = `<div class="info-page">
      <h1>Developer Info</h1>
      <p class="lead">Behind the scenes of BeatDrop Official.</p>
      <div class="dev-card">
        <div class="dev-avatar">S</div>
        <div>
          <div class="dev-name">Scotty C</div>
          <div class="dev-handle">Scotty♤C©</div>
          <div class="dev-bio">Independent developer and entrepreneur building premium web platforms. Passionate about music, clean UI, and developer tools. Based in Zimbabwe.</div>
        </div>
      </div>
      <h2>Project Stack</h2>
      <ul>
        <li><strong>Runtime:</strong> Node.js 18+</li>
        <li><strong>Framework:</strong> Express.js</li>
        <li><strong>Frontend:</strong> Vanilla HTML/CSS/JavaScript (no framework)</li>
        <li><strong>Music API:</strong> Spotify Web API (Client Credentials)</li>
        <li><strong>Hosting:</strong> Render.com (free tier compatible)</li>
        <li><strong>Dev Environment:</strong> Termux on Android + Render cloud deploy</li>
      </ul>
      <h2>Environment Variables</h2>
      <p>To enable live Spotify data, set these on your Render dashboard (or <code>.env</code> locally):</p>
      <pre style="background:var(--bg-card);padding:16px;border-radius:var(--radius-sm);font-size:13px;color:var(--cyan);overflow-x:auto">SPOTIFY_CLIENT_ID=your_client_id
SPOTIFY_CLIENT_SECRET=your_client_secret</pre>
      <p style="margin-top:12px">Get credentials at <a href="https://developer.spotify.com/dashboard" target="_blank">developer.spotify.com/dashboard</a></p>
      <h2>API Endpoints</h2>
      <ul>
        <li><code>GET /api/trending</code> — Trending tracks</li>
        <li><code>GET /api/new-releases</code> — New album releases</li>
        <li><code>GET /api/playlists/featured</code> — Featured playlists</li>
        <li><code>GET /api/genres</code> — Browse categories</li>
        <li><code>GET /api/search?q=query</code> — Search Spotify</li>
        <li><code>GET /api/artists/:id</code> — Artist profile</li>
        <li><code>GET /api/albums/:id</code> — Album detail</li>
        <li><code>GET /api/playlists/:id</code> — Playlist detail</li>
      </ul>
    </div>`;
  }

  /* ─── Settings Page ──────────────────────────────────────── */
  function renderSettings(el) {
    const S_local = window.__bdState || {};
    const user = (() => { try { return JSON.parse(localStorage.getItem('bd_auth_user')) || null; } catch { return null; } })();
    el.innerHTML = `<div class="info-page settings-page">
      <h1>Settings</h1>

      <h2>Account</h2>
      ${user ? `
        <div class="settings-row">
          <div>
            <div class="settings-label">Signed in as</div>
            <div class="settings-value">${user.email}</div>
          </div>
          <button class="settings-btn danger" id="s-signout">Sign Out</button>
        </div>` : `
        <div class="settings-row">
          <div class="settings-label">Not signed in</div>
          <button class="settings-btn" id="s-signin">Sign In</button>
        </div>`}

      <h2>Playback</h2>
      <div class="settings-row">
        <div class="settings-label">Volume</div>
        <input type="range" min="0" max="1" step="0.05" value="${localStorage.getItem('bd_volume') || 0.8}" id="s-volume" style="width:140px;accent-color:var(--purple)"/>
      </div>
      <div class="settings-row">
        <div class="settings-label">Audio Quality</div>
        <select class="settings-select" id="s-quality">
          <option value="mp3" ${(localStorage.getItem('bd_quality')||'mp3')==='mp3'?'selected':''}>MP3 (Best)</option>
          <option value="720" ${localStorage.getItem('bd_quality')==='720'?'selected':''}>720p Video</option>
          <option value="360" ${localStorage.getItem('bd_quality')==='360'?'selected':''}>360p Video</option>
        </select>
      </div>

      <h2>Appearance</h2>
      <div class="settings-row">
        <div class="settings-label">Theme</div>
        <div style="display:flex;gap:8px">
          <button class="settings-btn ${!document.body.classList.contains('light') ? 'active' : ''}" id="s-dark">Dark</button>
          <button class="settings-btn ${document.body.classList.contains('light') ? 'active' : ''}" id="s-light">Light</button>
        </div>
      </div>

      <h2>Data</h2>
      <div class="settings-row">
        <div class="settings-label">Clear play history</div>
        <button class="settings-btn danger" id="s-clear-history">Clear</button>
      </div>
      <div class="settings-row">
        <div class="settings-label">Clear favorites</div>
        <button class="settings-btn danger" id="s-clear-favs">Clear</button>
      </div>

      <h2>About</h2>
      <div class="settings-row"><div class="settings-label">Version</div><div class="settings-value">2.0.0</div></div>
      <div class="settings-row"><div class="settings-label">Music source</div><div class="settings-value">YouTube via api-madrin</div></div>
    </div>`;

    // Handlers
    el.querySelector('#s-signout')?.addEventListener('click', () => {
      localStorage.removeItem('bd_auth_user');
      if (window.__bdRenderTopbarAuth) window.__bdRenderTopbarAuth();
      showToast('Signed out');
      navigate('home');
    });
    el.querySelector('#s-signin')?.addEventListener('click', () => navigate('home'));
    el.querySelector('#s-volume')?.addEventListener('input', e => {
      const v = parseFloat(e.target.value);
      localStorage.setItem('bd_volume', v);
      document.querySelector('audio') && (document.querySelector('audio').volume = v);
    });
    el.querySelector('#s-quality')?.addEventListener('change', e => {
      localStorage.setItem('bd_quality', e.target.value);
      showToast('Quality updated — takes effect on next track');
    });
    el.querySelector('#s-dark')?.addEventListener('click', () => {
      document.body.classList.remove('light');
      localStorage.setItem('bd_theme', 'dark');
      el.querySelector('#s-dark')?.classList.add('active');
      el.querySelector('#s-light')?.classList.remove('active');
    });
    el.querySelector('#s-light')?.addEventListener('click', () => {
      document.body.classList.add('light');
      localStorage.setItem('bd_theme', 'light');
      el.querySelector('#s-light')?.classList.add('active');
      el.querySelector('#s-dark')?.classList.remove('active');
    });
    el.querySelector('#s-clear-history')?.addEventListener('click', () => {
      localStorage.removeItem('bd_recent');
      showToast('History cleared');
    });
    el.querySelector('#s-clear-favs')?.addEventListener('click', () => {
      localStorage.removeItem('bd_favs');
      showToast('Favorites cleared');
    });
  }


  /* ─── Bind Content Events ─────────────────────────────────── */
  function bindContentEvents(el, tracks) {
    // Track cards
    el.querySelectorAll('.track-card').forEach(card => {
      const id = card.dataset.id;
      const ctx = card.dataset.ctx ? card.dataset.ctx.split(',').map(x=>tracks?.find(t=>t.id===x)).filter(Boolean) : null;
      card.addEventListener('click', () => {
        const t = tracks?.find(t=>t.id===id) || DEMO_DATA.tracks.find(t=>t.id===id);
        if (t) playSingle(t, ctx||tracks||[t]);
      });
    });
    // Track rows
    el.querySelectorAll('.track-row').forEach(row => {
      row.addEventListener('click', e => {
        if (e.target.closest('[data-fav]') || e.target.closest('[data-artist-id]')) return;
        try {
          const ctx = JSON.parse(row.dataset.ctx || '[]');
          const ctxTracks = ctx.length && tracks ? tracks.filter(t=>ctx.includes(t.id)) : tracks||[];
          const t = tracks?.find(t=>t.id===row.dataset.id) || DEMO_DATA.tracks.find(t=>t.id===row.dataset.id);
          if (t) playSingle(t, ctxTracks.length ? ctxTracks : [t]);
        } catch {}
      });
      // Artist name click
      row.querySelector('[data-artist-id]')?.addEventListener('click', e => {
        const aid = e.target.closest('[data-artist-id]')?.dataset.artistId;
        if (aid) { e.stopPropagation(); navigate('artists', aid); }
      });
      // Favorite button
      row.querySelector('[data-fav]')?.addEventListener('click', e => {
        e.stopPropagation();
        const id = e.currentTarget.dataset.fav;
        S.favs.has(id) ? S.favs.delete(id) : S.favs.add(id);
        persistFavs();
        const btn = e.currentTarget;
        const isFav = S.favs.has(id);
        btn.classList.toggle('active', isFav);
        btn.innerHTML = isFav ? I.heartFill : I.heart;
        showToast(isFav ? 'Added to Favorites' : 'Removed', I.heart);
      });
    });
    // Artist cards
    el.querySelectorAll('[data-artist-id]').forEach(card => {
      if (card.classList.contains('tr-artist')) return; // handled above
      card.addEventListener('click', () => navigate('artists', card.dataset.artistId));
    });
    // Album cards
    el.querySelectorAll('[data-album-id]').forEach(card => {
      if (card.dataset.albumId) card.addEventListener('click', () => navigate('albums', card.dataset.albumId));
    });
    // Playlist cards
    el.querySelectorAll('[data-playlist-id]').forEach(card => {
      if (card.dataset.playlistId) card.addEventListener('click', () => navigate('playlists', card.dataset.playlistId));
    });
    // Genre cards
    el.querySelectorAll('[data-genre-id]').forEach(card => {
      card.addEventListener('click', () => navigate('genres', card.dataset.genreId));
    });
    // Section "See all" links
    el.querySelectorAll('[data-route]').forEach(link => {
      link.addEventListener('click', () => navigate(link.dataset.route));
    });
    renderActiveStates();
  }

  /* ─── Topbar Search Dropdown ─────────────────────────────── */
  function bindTopbarSearch() {
    const input   = document.getElementById('search-input');
    const results = document.getElementById('search-results');
    if (!input || !results) return;
    let timer;
    input.addEventListener('input', e => {
      clearTimeout(timer);
      const q = e.target.value.trim();
      if (!q) { results.classList.remove('open'); return; }
      results.classList.add('open');
      results.innerHTML = `<div class="search-loading">${spinnerSvg(18)} Searching…</div>`;
      timer = setTimeout(() => doTopbarSearch(q, results, input), 400);
    });
    input.addEventListener('keydown', e => {
      if (e.key === 'Enter') {
        S.searchTerm = input.value.trim();
        results.classList.remove('open');
        navigate('search');
      }
    });
    document.addEventListener('click', e => {
      if (!e.target.closest('.topbar-search-wrap')) results.classList.remove('open');
    });
    // Sidebar search
    const ssi = document.getElementById('sidebar-search-input');
    if (ssi) ssi.addEventListener('input', e => {
      const q = e.target.value.trim();
      if (q.length > 1) { S.searchTerm = q; navigate('search'); }
    });
    // Keyboard shortcut
    document.addEventListener('keydown', e => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') { e.preventDefault(); input.focus(); }
      if (e.code === 'Space' && document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
        e.preventDefault(); togglePlay();
      }
      if (e.code === 'ArrowRight' && e.ctrlKey) nextTrack(true);
      if (e.code === 'ArrowLeft'  && e.ctrlKey) prevTrack();
    });
  }

  async function doTopbarSearch(q, results, input) {
    const data = await api(`/api/search?q=${encodeURIComponent(q)}&types=track,artist,playlist`);
    if (!results.classList.contains('open')) return;
    const tracks   = data?.tracks   || DEMO_DATA.tracks.filter(t=>t.title.toLowerCase().includes(q.toLowerCase())||t.artist.toLowerCase().includes(q.toLowerCase())).slice(0,4);
    const artists  = data?.artists  || DEMO_DATA.artists.filter(a=>a.name.toLowerCase().includes(q.toLowerCase())).slice(0,3);
    const playlists= data?.playlists|| [];
    if (!tracks.length && !artists.length) {
      results.innerHTML = `<div class="search-empty">No results for "${esc(q)}"</div>`;
      return;
    }
    results.innerHTML = `
      ${tracks.length ? `<div class="search-section-label">Tracks</div>` : ''}
      ${tracks.slice(0,4).map(t=>`
        <div class="search-result-item" data-play-id="${esc(t.id)}">
          <img class="sr-img" src="${esc(t.cover||'')}" alt="" onerror="this.style.display='none'"/>
          <div><div class="sr-title">${esc(t.title)}</div><div class="sr-sub">${esc(t.artist)}</div></div>
          <span class="sr-badge">Track</span>
        </div>`).join('')}
      ${artists.length ? `<div class="search-section-label">Artists</div>` : ''}
      ${artists.slice(0,3).map(a=>`
        <div class="search-result-item" data-artist-id="${esc(a.id)}">
          <img class="sr-img circle" src="${esc(a.image||'')}" alt="" onerror="this.style.display='none'"/>
          <div><div class="sr-title">${esc(a.name)}</div><div class="sr-sub">${esc((a.genres||[]).slice(0,2).join(', '))}</div></div>
          <span class="sr-badge">Artist</span>
        </div>`).join('')}
      ${playlists.length ? `<div class="search-section-label">Playlists</div>` : ''}
      ${playlists.slice(0,2).map(p=>`
        <div class="search-result-item" data-playlist-id="${esc(p.id)}">
          <img class="sr-img" src="${esc(p.cover||'')}" alt="" onerror="this.style.display='none'"/>
          <div><div class="sr-title">${esc(p.name)}</div><div class="sr-sub">${esc(p.owner||'')}</div></div>
          <span class="sr-badge">Playlist</span>
        </div>`).join('')}
    `;
    results.querySelectorAll('[data-play-id]').forEach(item => {
      item.addEventListener('click', () => {
        const t = tracks.find(x=>x.id===item.dataset.playId);
        if (t) playSingle(t, tracks);
        results.classList.remove('open'); input.value = '';
      });
    });
    results.querySelectorAll('[data-artist-id]').forEach(item => {
      item.addEventListener('click', () => {
        navigate('artists', item.dataset.artistId);
        results.classList.remove('open'); input.value = '';
      });
    });
    results.querySelectorAll('[data-playlist-id]').forEach(item => {
      item.addEventListener('click', () => {
        navigate('playlists', item.dataset.playlistId);
        results.classList.remove('open'); input.value = '';
      });
    });
  }

  /* ─── Status dot ─────────────────────────────────────────── */
  function updateStatusDot(status) {
    const dot = document.querySelector('.status-dot');
    if (!dot) return;
    dot.className = 'status-dot ' + (status || '');
    dot.title = status === 'connected' ? 'Spotify connected' : status === 'demo' ? 'Demo mode (no Spotify credentials)' : 'Checking…';
  }

  /* ─── Init ───────────────────────────────────────────────── */
  async function init() {
    // Check API status
    const status = await api('/api/status');
    S.isDemo = status?.demo ?? false; // Deezer is always free, assume connected
    updateStatusDot(S.isDemo ? 'demo' : 'connected');

    renderPlayerBar();
    bindTopbarSearch();

    // Sidebar toggle
    document.getElementById('theme-toggle')?.addEventListener('click', () => navigate('settings'));
    document.getElementById('hamburger-btn')?.addEventListener('click', () => {
      S.sidebarOpen = !S.sidebarOpen;
      document.getElementById('sidebar')?.classList.toggle('open', S.sidebarOpen);
      document.getElementById('sidebar-overlay')?.classList.toggle('show', S.sidebarOpen);
      document.getElementById('hamburger-btn')?.setAttribute('aria-expanded', String(S.sidebarOpen));
    });
    document.getElementById('sidebar-overlay')?.addEventListener('click', closeSidebar);
    document.getElementById('sidebar-close-btn')?.addEventListener('click', closeSidebar);

    // Page loader
    setTimeout(() => {
      const loader = document.getElementById('page-loader');
      if (loader) loader.classList.add('gone');
    }, 1200);

    // Topbar scroll effect
    const topbar = document.getElementById('topbar');
    if (topbar) {
      const mc = document.getElementById('main-col');
      (mc || window).addEventListener('scroll', () => {
        topbar.style.boxShadow = (mc?.scrollTop || window.scrollY) > 10 ? '0 4px 24px rgba(0,0,0,0.4)' : 'none';
      }, { passive: true });
    }

    renderApp();
  }

  document.addEventListener('DOMContentLoaded', init);
})();

/* ============================================================
   BeatDrop Auth — Email OTP Login
============================================================ */
(function () {
  'use strict';

  const AUTH_KEY = 'bd_auth_user';
  function getUser() { try { return JSON.parse(localStorage.getItem(AUTH_KEY)) || null; } catch { return null; } }
  function setUser(u) { if (u) localStorage.setItem(AUTH_KEY, JSON.stringify(u)); else localStorage.removeItem(AUTH_KEY); }

  let _pendingEmail = '';
  let _menuOpen = false;
  function $(id) { return document.getElementById(id); }
  function showError(id, msg) { const el = $(id); if (el) el.textContent = msg || ''; }

  /* ── Topbar ───────────────────────────────────────────────── */
  function renderTopbarAuth() {
    const slot = $('topbar-auth-slot');
    if (!slot) return;
    const user = getUser();
    if (!user) {
      slot.innerHTML = `<button class="login-btn" id="open-login-btn">Sign In</button>`;
      $('open-login-btn')?.addEventListener('click', openModal);
    } else {
      const initials = (user.name || user.email).slice(0, 2).toUpperCase();
      const displayName = user.name || user.email.split('@')[0];
      const avatarHtml = user.picture
        ? `<img src="${user.picture}" style="width:28px;height:28px;border-radius:50%;object-fit:cover" referrerpolicy="no-referrer"/>`
        : `<div class="user-avatar">${initials}</div>`;
      slot.innerHTML = `
        <button class="user-btn avatar-only" id="user-menu-btn" title="${user.email}">
          ${avatarHtml}
        </button>
        <div class="user-menu hidden" id="user-menu">
          <div class="user-menu-header">
            <div class="user-menu-label">Signed in as</div>
            <div class="user-menu-email">${user.email}</div>
          </div>
          <button class="user-menu-item" id="user-menu-favs">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" width="15" height="15" stroke-linecap="round"><path d="M12 21s-7.5-4.6-10-9.3C.3 8.4 2 4.8 5.7 4.2c2.1-.3 3.8.8 6.3 3 2.5-2.2 4.2-3.3 6.3-3 3.7.6 5.4 4.2 3.7 7.5C19.5 16.4 12 21 12 21z"/></svg>
            My Favorites
          </button>
          <button class="user-menu-item danger" id="user-menu-signout">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" width="15" height="15" stroke-linecap="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"/></svg>
            Sign Out
          </button>
        </div>`;
      $('user-menu-btn')?.addEventListener('click', (e) => {
        e.stopPropagation();
        _menuOpen = !_menuOpen;
        $('user-menu')?.classList.toggle('hidden', !_menuOpen);
      });
      $('user-menu-favs')?.addEventListener('click', () => {
        _menuOpen = false; $('user-menu')?.classList.add('hidden');
        if (window.__bdNavigate) window.__bdNavigate('favorites');
      });
      $('user-menu-signout')?.addEventListener('click', () => {
        setUser(null); _menuOpen = false;
        renderTopbarAuth();
        bdToast('Signed out');
      });
    }
  }

  document.addEventListener('click', (e) => {
    if (_menuOpen && !e.target.closest('#user-menu') && !e.target.closest('#user-menu-btn')) {
      _menuOpen = false; $('user-menu')?.classList.add('hidden');
    }
  });

  function bdToast(msg) {
    const t = document.getElementById('toast');
    if (!t) return;
    t.textContent = msg; t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), 3000);
  }

  /* ── Modal ────────────────────────────────────────────────── */
  function openModal() {
    showStep('email');
    showError('auth-email-error', '');
    showError('auth-otp-error', '');
    $('auth-overlay')?.classList.remove('hidden');
    setTimeout(() => $('auth-email-input')?.focus(), 60);
  }
  function closeModal() {
    $('auth-overlay')?.classList.add('hidden');
  }
  function showStep(step) {
    const e = $('auth-step-email'), o = $('auth-step-otp');
    if (e) e.style.display = step === 'email' ? '' : 'none';
    if (o) o.style.display = step === 'otp'   ? '' : 'none';
  }

  /* ── OTP flow ─────────────────────────────────────────────── */
  async function handleSend() {
    const email = ($('auth-email-input')?.value || '').trim();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return showError('auth-email-error', 'Please enter a valid email address.');
    }
    const btn = $('auth-send-btn');
    if (btn) { btn.disabled = true; btn.textContent = 'Sending…'; }
    showError('auth-email-error', '');

    let data;
    try {
      const r = await fetch('/api/auth/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      data = await r.json();
    } catch {
      showError('auth-email-error', 'Network error — is the server running?');
      if (btn) { btn.disabled = false; btn.textContent = 'Continue with Email'; }
      return;
    }

    if (btn) { btn.disabled = false; btn.textContent = 'Continue with Email'; }

    if (!data.ok) {
      showError('auth-email-error', data.error || 'Something went wrong.');
      return;
    }

    _pendingEmail = email;

    if (data.devCode) {
      // Email not configured — display code right here
      const sub = $('auth-otp-sub');
      if (sub) sub.textContent = 'Email delivery not configured. Use the code below:';
      const inp = $('auth-otp-input');
      if (inp) inp.value = data.devCode;
      showError('auth-otp-error', `🔑 Your code: ${data.devCode}`);
    } else {
      const sub = $('auth-otp-sub');
      if (sub) sub.textContent = `We sent a 6-digit code to ${email}`;
      showError('auth-otp-error', '');
    }
    showStep('otp');
    setTimeout(() => $('auth-verify-btn')?.focus(), 60);
  }

  async function handleVerify() {
    const code = ($('auth-otp-input')?.value || '').replace(/\D/g, '').trim();
    if (code.length !== 6) return showError('auth-otp-error', 'Enter the 6-digit code.');
    const btn = $('auth-verify-btn');
    if (btn) { btn.disabled = true; btn.textContent = 'Verifying…'; }
    showError('auth-otp-error', '');

    let data;
    try {
      const r = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: _pendingEmail, code }),
      });
      data = await r.json();
    } catch {
      showError('auth-otp-error', 'Network error. Please try again.');
      if (btn) { btn.disabled = false; btn.textContent = 'Verify & Sign In'; }
      return;
    }

    if (!data.ok) {
      showError('auth-otp-error', data.error || 'Invalid code.');
      if (btn) { btn.disabled = false; btn.textContent = 'Verify & Sign In'; }
      return;
    }

    setUser({ email: data.email });
    closeModal();
    renderTopbarAuth();
    bdToast(`Welcome, ${data.email.split('@')[0]}! 🎵`);
  }

  async function handleResend() {
    const btn = $('auth-resend-btn');
    if (btn) { btn.disabled = true; btn.textContent = 'Sending…'; }
    showError('auth-otp-error', '');
    try {
      const r = await fetch('/api/auth/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: _pendingEmail }),
      });
      const d = await r.json();
      if (d.devCode) {
        const inp = $('auth-otp-input');
        if (inp) inp.value = d.devCode;
        showError('auth-otp-error', `🔑 Your code: ${d.devCode}`);
      } else {
        showError('auth-otp-error', d.ok ? '✓ New code sent!' : (d.error || 'Failed.'));
      }
    } catch { showError('auth-otp-error', 'Network error.'); }
    setTimeout(() => { const b = $('auth-resend-btn'); if (b) { b.disabled = false; b.textContent = 'Resend code'; } }, 30000);
  }

  /* ── Wire events ──────────────────────────────────────────── */
  document.addEventListener('DOMContentLoaded', () => {
    renderTopbarAuth();

    // Google OAuth button
    $('auth-google-btn')?.addEventListener('click', () => {
      window.location.href = '/auth/google';
    });

    // Handle Google callback — server redirects back with ?google_user=<base64>
    const urlParams = new URLSearchParams(window.location.search);
    const googleUser = urlParams.get('google_user');
    const authError  = urlParams.get('auth_error');
    if (googleUser) {
      try {
        const user = JSON.parse(atob(googleUser.replace(/-/g,'+').replace(/_/g,'/')));
        setUser({ email: user.email, name: user.name, picture: user.picture });
        // Clean URL
        window.history.replaceState({}, '', '/');
        renderTopbarAuth();
        bdToast(`Welcome, ${user.name || user.email.split('@')[0]}! 🎵`);
      } catch(e) { console.error('Google user parse error', e); }
    } else if (authError) {
      window.history.replaceState({}, '', '/');
      bdToast('Google sign-in failed: ' + decodeURIComponent(authError));
    }

    $('auth-close-btn')?.addEventListener('click', closeModal);
    $('auth-overlay')?.addEventListener('click', (e) => { if (e.target === $('auth-overlay')) closeModal(); });

    $('auth-send-btn')?.addEventListener('click', handleSend);
    $('auth-email-input')?.addEventListener('keydown', (e) => { if (e.key === 'Enter') handleSend(); });

    $('auth-verify-btn')?.addEventListener('click', handleVerify);
    $('auth-otp-input')?.addEventListener('keydown', (e) => { if (e.key === 'Enter') handleVerify(); });
    $('auth-otp-input')?.addEventListener('input', (e) => { e.target.value = e.target.value.replace(/\D/g, '').slice(0, 6); });

    $('auth-resend-btn')?.addEventListener('click', handleResend);
  });

})();
