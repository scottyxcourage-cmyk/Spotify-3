# 🎵 BeatDrop Official

> Premium Music Streaming & Discovery Platform — Powered by Spotify

A cinematic, dark-themed music discovery web app with full Spotify API integration, 30-second track previews, artist profiles, album browsing, real-time search, and a fully featured music player.

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment
```bash
cp .env.example .env
```
Edit `.env` and add your Spotify credentials:
```
SPOTIFY_CLIENT_ID=your_spotify_client_id
SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
```

### 3. Get Spotify Credentials
1. Go to [developer.spotify.com/dashboard](https://developer.spotify.com/dashboard)
2. Create a new app
3. Copy the **Client ID** and **Client Secret**

### 4. Run
```bash
npm start
```
Then open [http://localhost:3000](http://localhost:3000)

---

## 📁 Project Structure

```
BeatDrop/
├── server.js          ← Express server + Spotify API proxy
├── package.json
├── .env.example
├── .gitignore
└── public/
    ├── index.html     ← SPA shell
    ├── css/
    │   └── style.css  ← Premium dark UI
    └── js/
        ├── data.js    ← Demo fallback data
        └── app.js     ← Frontend SPA engine
```

---

## 🌐 Deploy to Render

1. Push to GitHub
2. Connect repo in [render.com](https://render.com) → New Web Service
3. Set **Build Command**: `npm install`
4. Set **Start Command**: `node server.js`
5. Add Environment Variables:
   - `SPOTIFY_CLIENT_ID`
   - `SPOTIFY_CLIENT_SECRET`
6. Deploy ✅

---

## 🔌 API Endpoints

| Endpoint | Description |
|---|---|
| `GET /api/trending` | Trending tracks |
| `GET /api/new-releases` | New album releases |
| `GET /api/playlists/featured` | Featured playlists |
| `GET /api/genres` | Browse categories |
| `GET /api/search?q=query` | Search everything |
| `GET /api/artists/:id` | Artist profile |
| `GET /api/artists/:id/tracks` | Artist top tracks |
| `GET /api/artists/:id/albums` | Artist albums |
| `GET /api/albums/:id` | Album with tracks |
| `GET /api/playlists/:id/tracks` | Playlist tracks |
| `GET /api/status` | API connection status |

---

## ✨ Features

- **Demo Mode** — Works without Spotify credentials using built-in demo data
- **Spotify Integration** — Live trending, search, artists, albums, playlists
- **30-Second Previews** — iTunes Search API fallback for maximum compatibility
- **Full Music Player** — Play/pause, next/prev, shuffle, repeat, volume, progress
- **Sidebar Navigation** — 17 pages including info, legal, and developer docs
- **Real-time Search** — Instant dropdown + dedicated search page
- **Favorites & History** — Locally persisted, no account required
- **Responsive** — Mobile-first, works on all screen sizes
- **Dark Premium UI** — Glassmorphism, neon glows, cinematic animations

---

## 🎨 Tech Stack

- **Backend**: Node.js + Express
- **Frontend**: Vanilla HTML/CSS/JavaScript (no framework)
- **Music API**: Spotify Web API (Client Credentials)
- **Fonts**: Google Fonts (Space Grotesk, Inter)
- **Hosting**: Render.com compatible

---

Built by **Scotty♤C©**
