/* ============================================================
   BeatDrop Official — server.js
   Powered by Deezer API (free, no auth, no Premium needed)
   Render-compatible
============================================================ */

require('dotenv').config();
const express = require('express');
const path    = require('path');
const https   = require('https');

const app  = express();
const PORT = process.env.PORT || 3000;

/* ── Deezer API helper ───────────────────────────────────────── */
const DEEZER = 'https://api.deezer.com';

function deezerFetch(endpoint) {
  return new Promise((resolve, reject) => {
    const url = DEEZER + endpoint;
    https.get(url, { headers: { 'Accept': 'application/json' } }, res => {
      const chunks = [];
      res.on('data', c => chunks.push(c));
      res.on('end', () => {
        try {
          const data = JSON.parse(Buffer.concat(chunks).toString());
          if (data.error) { console.error(`Deezer error for ${endpoint}:`, data.error); resolve(null); }
          else resolve(data);
        } catch(e) { console.error('Deezer parse error:', e.message); resolve(null); }
      });
    }).on('error', e => { console.error('Deezer fetch error:', e.message); resolve(null); });
  });
}

/* ── Middleware ──────────────────────────────────────────────── */
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

function ok(res, data) { res.json({ ok: true, data }); }

/* ── Data Mappers ────────────────────────────────────────────── */
function mapTrack(t) {
  if (!t || !t.id) return null;
  return {
    id:          String(t.id),
    type:        'track',
    title:       t.title || t.title_short || '',
    artist:      t.artist?.name || '',
    artistId:    String(t.artist?.id || ''),
    album:       t.album?.title || '',
    albumId:     String(t.album?.id || ''),
    cover:       t.album?.cover_medium || t.album?.cover || t.md5_image
                   ? `https://e-cdns-images.dzcdn.net/images/cover/${t.md5_image}/300x300-000000-80-0-0.jpg`
                   : t.album?.cover_medium || null,
    coverLarge:  t.album?.cover_big || t.album?.cover_xl || null,
    duration:    t.duration || 0,
    preview:     t.preview || null,
    explicit:    t.explicit_lyrics || false,
    popularity:  t.rank || 0,
    externalUrl: t.link || null,
  };
}

function mapArtist(a) {
  if (!a || !a.id) return null;
  return {
    id:          String(a.id),
    type:        'artist',
    name:        a.name || '',
    genres:      [],
    image:       a.picture_medium || a.picture || null,
    imageLarge:  a.picture_xl || a.picture_big || null,
    followers:   a.nb_fan || 0,
    popularity:  0,
    externalUrl: a.link || null,
  };
}

function mapAlbum(a) {
  if (!a || !a.id) return null;
  return {
    id:          String(a.id),
    type:        'album',
    name:        a.title || '',
    artist:      a.artist?.name || '',
    artistId:    String(a.artist?.id || ''),
    cover:       a.cover_medium || a.cover || null,
    coverLarge:  a.cover_xl || a.cover_big || null,
    year:        a.release_date?.split('-')[0] || '',
    totalTracks: a.nb_tracks || 0,
    albumType:   'album',
    externalUrl: a.link || null,
  };
}

function mapPlaylist(p) {
  if (!p || !p.id) return null;
  return {
    id:          String(p.id),
    type:        'playlist',
    name:        p.title || '',
    description: p.description || '',
    cover:       p.picture_medium || p.picture || null,
    owner:       p.creator?.name || 'Deezer',
    tracks:      p.nb_tracks || p.tracks?.total || 0,
    externalUrl: p.link || null,
  };
}

/* ══════════════════════════════════════════════════════════════
   API ROUTES
══════════════════════════════════════════════════════════════ */

/* Trending tracks ────────────────────────────────────────── */
app.get('/api/trending', async (req, res) => {
  // Deezer chart — always free, always works
  const data = await deezerFetch('/chart/0/tracks?limit=25');
  if (data?.data?.length) return ok(res, data.data.map(mapTrack).filter(Boolean));
  ok(res, null);
});

/* New releases / top albums ──────────────────────────────── */
app.get('/api/new-releases', async (req, res) => {
  const data = await deezerFetch('/chart/0/albums?limit=20');
  if (data?.data?.length) return ok(res, data.data.map(mapAlbum).filter(Boolean));
  ok(res, null);
});

/* Featured playlists ─────────────────────────────────────── */
app.get('/api/playlists/featured', async (req, res) => {
  const data = await deezerFetch('/chart/0/playlists?limit=12');
  if (data?.data?.length) return ok(res, data.data.map(mapPlaylist).filter(Boolean));
  ok(res, null);
});

/* Playlist detail ────────────────────────────────────────── */
app.get('/api/playlists/:id', async (req, res) => {
  const data = await deezerFetch(`/playlist/${req.params.id}`);
  if (!data) return ok(res, null);
  ok(res, mapPlaylist(data));
});

/* Playlist tracks ────────────────────────────────────────── */
app.get('/api/playlists/:id/tracks', async (req, res) => {
  const data = await deezerFetch(`/playlist/${req.params.id}/tracks?limit=25`);
  if (!data) return ok(res, null);
  ok(res, data.data?.map(mapTrack).filter(Boolean) || []);
});

/* Genres ─────────────────────────────────────────────────── */
app.get('/api/genres', async (req, res) => {
  ok(res, [
    { id:'132',  name:'Pop',        icons:'🎤', colors:['#8b5cf6','#ff2ec4'] },
    { id:'116',  name:'Hip-Hop',    icons:'🎧', colors:['#1e3a5f','#3b82f6'] },
    { id:'165',  name:'R&B',        icons:'💜', colors:['#4c1d95','#8b5cf6'] },
    { id:'113',  name:'Dance',      icons:'⚡', colors:['#0c4a6e','#22d3ee'] },
    { id:'152',  name:'Rock',       icons:'🎸', colors:['#1c1c1c','#6b7280'] },
    { id:'197',  name:'Latin',      icons:'🌴', colors:['#7c2d12','#f97316'] },
    { id:'1116', name:'Afrobeats',  icons:'🥁', colors:['#14532d','#22c55e'] },
    { id:'129',  name:'Jazz',       icons:'🎷', colors:['#1a1205','#d97706'] },
    { id:'98',   name:'Classical',  icons:'🎻', colors:['#1e1b4b','#818cf8'] },
    { id:'169',  name:'Indie',      icons:'🌿', colors:['#1a3a1a','#34d399'] },
    { id:'144',  name:'Country',    icons:'🤠', colors:['#422006','#f59e0b'] },
    { id:'464',  name:'Afro Pop',   icons:'✨', colors:['#831843','#ec4899'] },
  ]);
});

/* Genre tracks ───────────────────────────────────────────── */
app.get('/api/genres/:id/playlists', async (req, res) => {
  const data = await deezerFetch(`/genre/${req.params.id}/artists?limit=6`);
  if (!data?.data?.length) return ok(res, null);
  // Get top tracks from first 2 artists
  const trackSets = await Promise.all(
    data.data.slice(0, 3).map(a => deezerFetch(`/artist/${a.id}/top?limit=8`))
  );
  const tracks = trackSets.flatMap(r => r?.data || []).map(mapTrack).filter(Boolean);
  ok(res, tracks);
});

/* Artist ─────────────────────────────────────────────────── */
app.get('/api/artists/popular', async (req, res) => {
  const data = await deezerFetch('/chart/0/artists?limit=12');
  if (data?.data?.length) return ok(res, data.data.map(mapArtist).filter(Boolean));
  ok(res, null);
});

app.get('/api/artists/:id', async (req, res) => {
  const data = await deezerFetch(`/artist/${req.params.id}`);
  if (!data) return ok(res, null);
  ok(res, mapArtist(data));
});

app.get('/api/artists/:id/tracks', async (req, res) => {
  const data = await deezerFetch(`/artist/${req.params.id}/top?limit=20`);
  if (!data) return ok(res, null);
  ok(res, data.data?.map(mapTrack).filter(Boolean) || []);
});

app.get('/api/artists/:id/albums', async (req, res) => {
  const data = await deezerFetch(`/artist/${req.params.id}/albums?limit=12`);
  if (!data) return ok(res, null);
  ok(res, data.data?.map(mapAlbum).filter(Boolean) || []);
});

app.get('/api/artists/:id/related', async (req, res) => {
  const data = await deezerFetch(`/artist/${req.params.id}/related?limit=6`);
  if (!data) return ok(res, null);
  ok(res, data.data?.map(mapArtist).filter(Boolean) || []);
});

/* Album ──────────────────────────────────────────────────── */
app.get('/api/albums/:id', async (req, res) => {
  const data = await deezerFetch(`/album/${req.params.id}`);
  if (!data) return ok(res, null);
  const album = mapAlbum(data);
  const tracks = (data.tracks?.data || []).map(t => mapTrack({ ...t, album: data })).filter(Boolean);
  ok(res, { ...album, tracks });
});

/* Search ─────────────────────────────────────────────────── */
app.get('/api/search', async (req, res) => {
  const q = req.query.q?.trim();
  if (!q) return ok(res, { tracks:[], artists:[], albums:[], playlists:[] });
  console.log(`[Search] q="${q}"`);
  const [tracks, artists, albums, playlists] = await Promise.all([
    deezerFetch(`/search/track?q=${encodeURIComponent(q)}&limit=12`),
    deezerFetch(`/search/artist?q=${encodeURIComponent(q)}&limit=8`),
    deezerFetch(`/search/album?q=${encodeURIComponent(q)}&limit=8`),
    deezerFetch(`/search/playlist?q=${encodeURIComponent(q)}&limit=6`),
  ]);
  console.log(`[Search] tracks=${tracks?.data?.length} artists=${artists?.data?.length}`);
  ok(res, {
    tracks:    tracks?.data?.map(mapTrack).filter(Boolean)    || [],
    artists:   artists?.data?.map(mapArtist).filter(Boolean)  || [],
    albums:    albums?.data?.map(mapAlbum).filter(Boolean)    || [],
    playlists: playlists?.data?.map(mapPlaylist).filter(Boolean) || [],
  });
});

/* Status ─────────────────────────────────────────────────── */
app.get('/api/status', async (req, res) => {
  const test = await deezerFetch('/chart/0/tracks?limit=1');
  const connected = !!(test?.data?.length);
  ok(res, { spotifyConnected: connected, demo: !connected, source: 'deezer' });
});

/* Contact form — Resend email ────────────────────────────── */
app.post('/api/contact', async (req, res) => {
  const { name, email, subject, message } = req.body || {};
  if (!name || !email || !message) {
    return res.status(400).json({ ok: false, error: 'Name, email and message are required.' });
  }

  const RESEND_API_KEY   = process.env.RESEND_API_KEY;
  const CONTACT_EMAIL    = process.env.CONTACT_EMAIL || 'tadiwamakumani2004zw.com@gmail.com';

  if (!RESEND_API_KEY) {
    console.warn('RESEND_API_KEY not set — contact form disabled');
    return res.status(503).json({ ok: false, error: 'Mail service not configured.' });
  }

  const html = `
    <div style="font-family:sans-serif;max-width:560px;margin:0 auto">
      <div style="background:linear-gradient(135deg,#8b5cf6,#ff2ec4);padding:24px;border-radius:12px 12px 0 0">
        <h2 style="color:#fff;margin:0;font-size:20px">📬 New BeatDrop Contact</h2>
      </div>
      <div style="background:#16161f;padding:24px;border-radius:0 0 12px 12px;border:1px solid #2a2a3a">
        <table style="width:100%;border-collapse:collapse">
          <tr><td style="color:#a8a8c0;padding:8px 0;width:80px">From</td><td style="color:#f0f0f8;padding:8px 0"><strong>${name}</strong> &lt;${email}&gt;</td></tr>
          <tr><td style="color:#a8a8c0;padding:8px 0">Subject</td><td style="color:#f0f0f8;padding:8px 0">${subject || '(no subject)'}</td></tr>
        </table>
        <hr style="border:none;border-top:1px solid #2a2a3a;margin:16px 0"/>
        <p style="color:#a8a8c0;margin:0 0 8px;font-size:12px;text-transform:uppercase;letter-spacing:1px">Message</p>
        <p style="color:#f0f0f8;line-height:1.7;white-space:pre-wrap">${message}</p>
        <hr style="border:none;border-top:1px solid #2a2a3a;margin:16px 0"/>
        <p style="color:#64648080;font-size:11px;margin:0">Sent from BeatDrop Official contact form</p>
      </div>
    </div>`;

  try {
    const response = await new Promise((resolve, reject) => {
      const body = JSON.stringify({
        from:    'BeatDrop Official <onboarding@resend.dev>',
        to:      [CONTACT_EMAIL],
        reply_to: email,
        subject: `[BeatDrop] ${subject || 'New message from ' + name}`,
        html,
      });
      const req2 = https.request({
        hostname: 'api.resend.com',
        path:     '/emails',
        method:   'POST',
        headers: {
          'Authorization': `Bearer ${RESEND_API_KEY}`,
          'Content-Type':  'application/json',
          'Content-Length': Buffer.byteLength(body),
        },
      }, res2 => {
        const chunks = [];
        res2.on('data', c => chunks.push(c));
        res2.on('end', () => {
          try { resolve({ status: res2.statusCode, data: JSON.parse(Buffer.concat(chunks).toString()) }); }
          catch(e) { resolve({ status: res2.statusCode, data: {} }); }
        });
      });
      req2.on('error', reject);
      req2.write(body);
      req2.end();
    });

    if (response.status >= 200 && response.status < 300) {
      console.log(`[Contact] Email sent from ${email}`);
      res.json({ ok: true, message: 'Message sent successfully!' });
    } else {
      console.error('[Contact] Resend error:', response.data);
      res.status(500).json({ ok: false, error: 'Failed to send email. Please try again.' });
    }
  } catch (err) {
    console.error('[Contact] Send error:', err.message);
    res.status(500).json({ ok: false, error: 'Server error. Please try again.' });
  }
});
/* ── Auth — Email OTP ─────────────────────────────────────── */
const otpStore = new Map(); // email → { code, expires }

function generateOtp() {
  return String(Math.floor(100000 + Math.random() * 900000));
}

app.post('/api/auth/send-otp', async (req, res) => {
  const { email } = req.body || {};
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ ok: false, error: 'Valid email required.' });
  }

  const code    = generateOtp();
  const expires = Date.now() + 10 * 60 * 1000; // 10 min
  otpStore.set(email.toLowerCase(), { code, expires });

  const RESEND_API_KEY = process.env.RESEND_API_KEY;

  // No API key — show code directly in UI (dev / self-hosted mode)
  if (!RESEND_API_KEY) {
    console.log(`[Auth] OTP for ${email}: ${code}`);
    return res.json({ ok: true, devCode: code });
  }

  const html = `
    <div style="font-family:sans-serif;max-width:480px;margin:0 auto">
      <div style="background:linear-gradient(135deg,#8b5cf6,#ff2ec4);padding:28px;border-radius:14px 14px 0 0;text-align:center">
        <svg viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg" width="52" height="52" style="display:block;margin:0 auto 12px">
          <circle cx="28" cy="28" r="26" fill="rgba(255,255,255,0.15)"/>
          <path d="M21 17v22l18-11z" fill="#fff"/>
        </svg>
        <h1 style="color:#fff;margin:0;font-size:22px;font-weight:700;letter-spacing:-0.5px">BeatDrop Login</h1>
      </div>
      <div style="background:#16161f;padding:32px;border-radius:0 0 14px 14px;border:1px solid rgba(255,255,255,0.06)">
        <p style="color:#a8a8c0;margin:0 0 20px;font-size:14px">Your one-time login code:</p>
        <div style="background:#0d0d12;border:1px solid rgba(139,92,246,0.3);border-radius:12px;padding:20px;text-align:center;margin:0 0 24px">
          <span style="font-size:38px;font-weight:700;letter-spacing:10px;color:#f0f0f8;font-family:monospace">${code}</span>
        </div>
        <p style="color:#6464880;font-size:12px;margin:0">This code expires in <strong style="color:#a8a8c0">10 minutes</strong>. If you did not request this, you can safely ignore it.</p>
      </div>
    </div>`;

  try {
    const result = await new Promise((resolve, reject) => {
      const body = JSON.stringify({
        from:    'BeatDrop Official <onboarding@resend.dev>',
        to:      [email],
        subject: `${code} — Your BeatDrop login code`,
        html,
      });
      const req2 = require('https').request({
        hostname: 'api.resend.com',
        path:     '/emails',
        method:   'POST',
        headers: {
          'Authorization':  `Bearer ${RESEND_API_KEY}`,
          'Content-Type':   'application/json',
          'Content-Length': Buffer.byteLength(body),
        },
      }, r => {
        const chunks = [];
        r.on('data', c => chunks.push(c));
        r.on('end', () => resolve({ status: r.statusCode, body: Buffer.concat(chunks).toString() }));
      });
      req2.on('error', reject);
      req2.write(body);
      req2.end();
    });

    if (result.status >= 200 && result.status < 300) {
      console.log(`[Auth] OTP sent to ${email}`);
      res.json({ ok: true });
    } else {
      // Email send failed (e.g. unverified sender domain) — fall back to showing
      // the code directly so login still works during development / testing.
      console.warn(`[Auth] Resend returned ${result.status} — falling back to devCode. Body: ${result.body}`);
      console.log(`[Auth] OTP for ${email}: ${code}`);
      res.json({ ok: true, devCode: code });
    }
  } catch (err) {
    console.error('[Auth] send-otp error:', err.message);
    // Network/infra error — same fallback
    console.log(`[Auth] OTP for ${email}: ${code}`);
    res.json({ ok: true, devCode: code });
  }
});

app.post('/api/auth/verify-otp', (req, res) => {
  const { email, code } = req.body || {};
  if (!email || !code) return res.status(400).json({ ok: false, error: 'Email and code required.' });

  const key    = email.toLowerCase();
  const record = otpStore.get(key);
  if (!record)                       return res.status(400).json({ ok: false, error: 'No code found. Request a new one.' });
  if (Date.now() > record.expires)   { otpStore.delete(key); return res.status(400).json({ ok: false, error: 'Code expired.' }); }
  if (record.code !== String(code).trim()) return res.status(400).json({ ok: false, error: 'Incorrect code.' });

  otpStore.delete(key);
  console.log(`[Auth] Verified login for ${email}`);
  res.json({ ok: true, email: key });
});


/* ── YouTube Stream Proxy ─────────────────────────────────── */
app.get('/api/stream', async (req, res) => {
  const q = req.query.q;
  if (!q) return res.status(400).json({ ok: false, error: 'q required' });

  try {
    // Step 1: Search YouTube for the track
    const searchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(q)}`;
    const searchHtml = await httpGet(searchUrl, {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120 Safari/537.36',
      'Accept-Language': 'en-US,en;q=0.9',
    });

    // Extract first video ID from ytInitialData
    const idMatch = searchHtml.match(/"videoId":"([a-zA-Z0-9_-]{11})"/);
    if (!idMatch) return res.status(404).json({ ok: false, error: 'No YouTube result found' });
    const videoId = idMatch[1];

    // Step 2: Fetch audio stream via the ytdl API
    const ytUrl = `https://api-madrin.zone.id/download/ytdl?apikey=test&url=https://www.youtube.com/watch?v=${videoId}`;
    const ytData = await httpGetJson(ytUrl);

    if (!ytData.status || !ytData.audio) {
      return res.status(502).json({ ok: false, error: 'ytdl API failed' });
    }

    console.log(`[Stream] ${ytData.title}`);
    res.json({
      ok: true,
      audio: ytData.audio,
      title: ytData.title,
      thumbnail: ytData.thumbnail,
      videoId,
    });
  } catch (err) {
    console.error('[Stream] error:', err.message);
    res.status(500).json({ ok: false, error: err.message });
  }
});

function httpGet(url, headers = {}) {
  return new Promise((resolve, reject) => {
    const mod = url.startsWith('https') ? https : require('http');
    const opts = Object.assign(require('url').parse(url), { headers });
    const req = mod.get(opts, r => {
      if (r.statusCode >= 300 && r.statusCode < 400 && r.headers.location) {
        return resolve(httpGet(r.headers.location, headers));
      }
      const chunks = [];
      r.on('data', c => chunks.push(c));
      r.on('end', () => resolve(Buffer.concat(chunks).toString()));
    });
    req.on('error', reject);
    req.setTimeout(10000, () => { req.destroy(); reject(new Error('timeout')); });
  });
}

function httpGetJson(url) {
  return httpGet(url, {
    'User-Agent': 'Mozilla/5.0',
    'Accept': 'application/json',
  }).then(text => JSON.parse(text));
}

/* ── Auth — Google OAuth 2.0 ─────────────────────────────── */
app.get('/auth/google', (req, res) => {
  const clientId    = process.env.GOOGLE_CLIENT_ID;
  const redirectUri = process.env.GOOGLE_REDIRECT_URI || `${req.protocol}://${req.get('host')}/auth/google/callback`;
  if (!clientId) return res.status(500).send('GOOGLE_CLIENT_ID not configured.');
  const params = new URLSearchParams({
    client_id:     clientId,
    redirect_uri:  redirectUri,
    response_type: 'code',
    scope:         'openid email profile',
    access_type:   'online',
    prompt:        'select_account',
  });
  res.redirect(`https://accounts.google.com/o/oauth2/v2/auth?${params}`);
});

app.get('/auth/google/callback', async (req, res) => {
  const { code, error } = req.query;
  if (error || !code) return res.redirect('/?auth_error=' + encodeURIComponent(error || 'no_code'));

  const clientId     = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  const redirectUri  = process.env.GOOGLE_REDIRECT_URI || `${req.protocol}://${req.get('host')}/auth/google/callback`;

  try {
    // Exchange code for tokens
    const tokenBody = new URLSearchParams({
      code, client_id: clientId, client_secret: clientSecret,
      redirect_uri: redirectUri, grant_type: 'authorization_code',
    }).toString();

    const tokenData = await new Promise((resolve, reject) => {
      const req2 = https.request({
        hostname: 'oauth2.googleapis.com',
        path: '/token', method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Content-Length': Buffer.byteLength(tokenBody) },
      }, r => {
        const chunks = [];
        r.on('data', c => chunks.push(c));
        r.on('end', () => { try { resolve(JSON.parse(Buffer.concat(chunks).toString())); } catch(e) { reject(e); } });
      });
      req2.on('error', reject);
      req2.write(tokenBody);
      req2.end();
    });

    if (tokenData.error) throw new Error(tokenData.error_description || tokenData.error);

    // Decode id_token (JWT payload — no signature verification needed for our use)
    const payload = JSON.parse(Buffer.from(tokenData.id_token.split('.')[1], 'base64url').toString());
    const user = { email: payload.email, name: payload.name || '', picture: payload.picture || '', sub: payload.sub };

    console.log(`[Auth] Google login: ${user.email}`);
    // Pass user back to the SPA via a redirect with encoded user in query param
    const encoded = Buffer.from(JSON.stringify(user)).toString('base64url');
    res.redirect(`/?google_user=${encoded}`);
  } catch (err) {
    console.error('[Auth] Google callback error:', err.message);
    res.redirect('/?auth_error=' + encodeURIComponent(err.message));
  }
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`🎵 BeatDrop Official running on http://localhost:${PORT}`);
  console.log(`   Music source: Deezer API (free, no auth required)`);
});
