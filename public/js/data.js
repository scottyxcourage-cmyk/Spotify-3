/* ============================================================
   BeatDrop Official — data.js
   Demo fallback data (used when Spotify API is unavailable)
============================================================ */

const DEMO_PALETTES = [
  ['#8b5cf6','#ff2ec4'], ['#43e8ff','#8b5cf6'], ['#ff2ec4','#43e8ff'],
  ['#7c3aed','#22d3ee'], ['#f472b6','#7c3aed'], ['#a78bfa','#fb7185'],
  ['#06b6d4','#a855f7'], ['#fb923c','#8b5cf6'], ['#34d399','#7c3aed'],
  ['#f43f5e','#6366f1'], ['#fbbf24','#8b5cf6'], ['#10b981','#06b6d4'],
];

function hashStr(s) {
  let h = 0;
  for (let i = 0; i < s.length; i++) { h = (h << 5) - h + s.charCodeAt(i); h |= 0; }
  return Math.abs(h);
}

function makeDemoArt(seed, label) {
  const idx = hashStr(seed) % DEMO_PALETTES.length;
  const [c1, c2] = DEMO_PALETTES[idx];
  const short = label.split(' ').slice(0, 2).join(' ');
  const fs = short.length > 12 ? 30 : 42;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300">
    <defs>
      <linearGradient id="g${idx}" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="${c1}"/>
        <stop offset="100%" stop-color="${c2}"/>
      </linearGradient>
    </defs>
    <rect width="300" height="300" fill="url(#g${idx})"/>
    <circle cx="${100 + hashStr(seed+'x')%100}" cy="${80 + hashStr(seed+'y')%80}" r="100" fill="#fff" opacity="0.08"/>
    <text x="50%" y="55%" font-family="Space Grotesk,sans-serif" font-size="${fs}" font-weight="700" fill="#fff" fill-opacity="0.9" text-anchor="middle">${short}</text>
  </svg>`;
  return 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svg)));
}

const DEMO_ARTISTS = [
  { id:'da1', type:'artist', name:'The Weeknd',      genres:['r&b','pop'],       followers:85000000, popularity:97, image: makeDemoArt('weeknd','TW')  },
  { id:'da2', type:'artist', name:'Drake',           genres:['hip-hop','rap'],   followers:72000000, popularity:95, image: makeDemoArt('drake','DR')   },
  { id:'da3', type:'artist', name:'Doja Cat',        genres:['pop','hip-hop'],   followers:38000000, popularity:93, image: makeDemoArt('doja','DC')    },
  { id:'da4', type:'artist', name:'Bad Bunny',       genres:['reggaeton','latin'],followers:65000000,popularity:96, image: makeDemoArt('badbunny','BB')},
  { id:'da5', type:'artist', name:'Taylor Swift',    genres:['pop','country'],   followers:96000000, popularity:100,image: makeDemoArt('taylor','TS')  },
  { id:'da6', type:'artist', name:'Kendrick Lamar',  genres:['hip-hop','rap'],   followers:22000000, popularity:91, image: makeDemoArt('kendrick','KL')},
  { id:'da7', type:'artist', name:'SZA',             genres:['r&b','soul'],      followers:18000000, popularity:94, image: makeDemoArt('sza','SZ')     },
  { id:'da8', type:'artist', name:'Metro Boomin',    genres:['trap','hip-hop'],  followers:12000000, popularity:88, image: makeDemoArt('metro','MB')   },
  { id:'da9', type:'artist', name:'Olivia Rodrigo',  genres:['pop','alt'],       followers:30000000, popularity:92, image: makeDemoArt('olivia','OR')  },
  {id:'da10', type:'artist', name:'Tyler the Creator',genres:['hip-hop','alt'],  followers:14000000, popularity:90, image: makeDemoArt('tyler','TC')   },
  {id:'da11', type:'artist', name:'Billie Eilish',   genres:['pop','alt'],       followers:72000000, popularity:94, image: makeDemoArt('billie','BE')  },
  {id:'da12', type:'artist', name:'Post Malone',     genres:['hip-hop','pop'],   followers:40000000, popularity:89, image: makeDemoArt('post','PM')    },
];

const DEMO_TRACKS = [
  { id:'dt1',  type:'track', title:'Blinding Lights',   artist:'The Weeknd',    artistId:'da1', album:'After Hours',     cover: makeDemoArt('blinding','BL'),  duration:200, preview:null, explicit:false, popularity:99 },
  { id:'dt2',  type:'track', title:'God\'s Plan',        artist:'Drake',         artistId:'da2', album:'Scorpion',        cover: makeDemoArt('gods','GP'),       duration:198, preview:null, explicit:true,  popularity:97 },
  { id:'dt3',  type:'track', title:'Say So',             artist:'Doja Cat',      artistId:'da3', album:'Hot Pink',        cover: makeDemoArt('sayso','SS'),      duration:237, preview:null, explicit:false, popularity:94 },
  { id:'dt4',  type:'track', title:'Tití Me Preguntó',   artist:'Bad Bunny',     artistId:'da4', album:'Un Verano Sin Ti',cover: makeDemoArt('titi','TM'),       duration:268, preview:null, explicit:true,  popularity:95 },
  { id:'dt5',  type:'track', title:'Anti-Hero',          artist:'Taylor Swift',  artistId:'da5', album:'Midnights',       cover: makeDemoArt('antihero','AH'),   duration:200, preview:null, explicit:false, popularity:100},
  { id:'dt6',  type:'track', title:'Not Like Us',        artist:'Kendrick Lamar',artistId:'da6', album:'Single',          cover: makeDemoArt('notlike','NL'),    duration:274, preview:null, explicit:true,  popularity:96 },
  { id:'dt7',  type:'track', title:'Kill Bill',          artist:'SZA',           artistId:'da7', album:'SOS',             cover: makeDemoArt('killbill','KB'),   duration:153, preview:null, explicit:false, popularity:93 },
  { id:'dt8',  type:'track', title:'Creepin\'',          artist:'Metro Boomin',  artistId:'da8', album:'HEROES & VILLAINS',cover:makeDemoArt('creepin','CR'),    duration:213, preview:null, explicit:true,  popularity:90 },
  { id:'dt9',  type:'track', title:'drivers license',    artist:'Olivia Rodrigo',artistId:'da9', album:'SOUR',            cover: makeDemoArt('drivers','DL'),    duration:242, preview:null, explicit:false, popularity:91 },
  { id:'dt10', type:'track', title:'EARFQUAKE',          artist:'Tyler the Creator',artistId:'da10',album:'IGOR',          cover: makeDemoArt('earfquake','EQ'), duration:200, preview:null, explicit:false, popularity:88 },
  { id:'dt11', type:'track', title:'Happier Than Ever',  artist:'Billie Eilish', artistId:'da11',album:'Happier Than Ever',cover:makeDemoArt('happier','HE'),    duration:244, preview:null, explicit:false, popularity:89 },
  { id:'dt12', type:'track', title:'Sunflower',          artist:'Post Malone',   artistId:'da12',album:'Spider-Man: ITSV',cover: makeDemoArt('sunflower','SF'),  duration:158, preview:null, explicit:false, popularity:96 },
  { id:'dt13', type:'track', title:'Starboy',            artist:'The Weeknd',    artistId:'da1', album:'Starboy',         cover: makeDemoArt('starboy','SB'),    duration:230, preview:null, explicit:true,  popularity:92 },
  { id:'dt14', type:'track', title:'SICKO MODE',         artist:'Drake',         artistId:'da2', album:'Astroworld',      cover: makeDemoArt('sickomode','SM'),  duration:312, preview:null, explicit:true,  popularity:93 },
  { id:'dt15', type:'track', title:'Need to Know',       artist:'Doja Cat',      artistId:'da3', album:'Planet Her',      cover: makeDemoArt('needtoknow','NK'),  duration:200, preview:null, explicit:true,  popularity:89 },
  { id:'dt16', type:'track', title:'Midnight Rain',      artist:'Taylor Swift',  artistId:'da5', album:'Midnights',       cover: makeDemoArt('midnight','MR'),   duration:174, preview:null, explicit:false, popularity:87 },
  { id:'dt17', type:'track', title:'Rich Flex',          artist:'Drake',         artistId:'da2', album:'Her Loss',        cover: makeDemoArt('richflex','RF'),   duration:211, preview:null, explicit:true,  popularity:94 },
  { id:'dt18', type:'track', title:'Snooze',             artist:'SZA',           artistId:'da7', album:'SOS',             cover: makeDemoArt('snooze','SN'),     duration:201, preview:null, explicit:false, popularity:92 },
  { id:'dt19', type:'track', title:'Save Your Tears',    artist:'The Weeknd',    artistId:'da1', album:'After Hours',     cover: makeDemoArt('savetears','ST'),  duration:215, preview:null, explicit:false, popularity:95 },
  { id:'dt20', type:'track', title:'good 4 u',           artist:'Olivia Rodrigo',artistId:'da9', album:'SOUR',            cover: makeDemoArt('good4u','G4'),     duration:178, preview:null, explicit:false, popularity:90 },
];

const DEMO_ALBUMS = [
  { id:'dal1', type:'album', name:'After Hours',      artist:'The Weeknd',    artistId:'da1', cover: makeDemoArt('afterhours','AH'),     year:'2020', totalTracks:14 },
  { id:'dal2', type:'album', name:'Scorpion',         artist:'Drake',         artistId:'da2', cover: makeDemoArt('scorpion','SC'),        year:'2018', totalTracks:25 },
  { id:'dal3', type:'album', name:'Planet Her',       artist:'Doja Cat',      artistId:'da3', cover: makeDemoArt('planether','PH'),       year:'2021', totalTracks:14 },
  { id:'dal4', type:'album', name:'Un Verano Sin Ti', artist:'Bad Bunny',     artistId:'da4', cover: makeDemoArt('verano','UV'),          year:'2022', totalTracks:23 },
  { id:'dal5', type:'album', name:'Midnights',        artist:'Taylor Swift',  artistId:'da5', cover: makeDemoArt('midnights','MN'),       year:'2022', totalTracks:13 },
  { id:'dal6', type:'album', name:'SOS',              artist:'SZA',           artistId:'da7', cover: makeDemoArt('sos','SZ'),             year:'2022', totalTracks:23 },
  { id:'dal7', type:'album', name:'HEROES & VILLAINS',artist:'Metro Boomin',  artistId:'da8', cover: makeDemoArt('heroes','HV'),          year:'2022', totalTracks:14 },
  { id:'dal8', type:'album', name:'SOUR',             artist:'Olivia Rodrigo',artistId:'da9', cover: makeDemoArt('sour','SR'),            year:'2021', totalTracks:11 },
  { id:'dal9', type:'album', name:'IGOR',             artist:'Tyler the Creator',artistId:'da10',cover:makeDemoArt('igor','IG'),          year:'2019', totalTracks:12 },
  {id:'dal10', type:'album', name:'Happier Than Ever',artist:'Billie Eilish', artistId:'da11',cover:makeDemoArt('happierthanever','HTE'), year:'2021', totalTracks:16 },
];

const DEMO_PLAYLISTS = [
  { id:'dp1', type:'playlist', name:'🔥 Hot Right Now',  description:'The biggest hits dominating right now.', cover: makeDemoArt('hotnow','HR'),    owner:'BeatDrop', tracks:50 },
  { id:'dp2', type:'playlist', name:'✨ Chill Vibes',     description:'Perfect beats for winding down.',       cover: makeDemoArt('chillvibes','CV'), owner:'BeatDrop', tracks:40 },
  { id:'dp3', type:'playlist', name:'💜 R&B Soul',        description:'Smooth r&b and neo-soul selections.',   cover: makeDemoArt('rnbsoul','RS'),    owner:'BeatDrop', tracks:35 },
  { id:'dp4', type:'playlist', name:'🎤 Rap Caviar',      description:'Hip-hop certified bangers.',            cover: makeDemoArt('rapcaviar','RC'),  owner:'BeatDrop', tracks:60 },
  { id:'dp5', type:'playlist', name:'🌙 Late Night Drive',description:'Dark, cinematic late-night vibes.',    cover: makeDemoArt('latenight','LN'), owner:'BeatDrop', tracks:30 },
  { id:'dp6', type:'playlist', name:'🎵 Indie Gems',      description:'Underground and indie discoveries.',    cover: makeDemoArt('indiegems','IG'),  owner:'BeatDrop', tracks:45 },
  { id:'dp7', type:'playlist', name:'⚡ Workout Mix',     description:'High-energy tracks for the gym.',       cover: makeDemoArt('workout','WO'),   owner:'BeatDrop', tracks:55 },
  { id:'dp8', type:'playlist', name:'🌅 Morning Coffee',  description:'Gentle wake-up tunes for early risers.',cover:makeDemoArt('morning','MC'),    owner:'BeatDrop', tracks:28 },
];

const DEMO_GENRES = [
  { id:'pop',       name:'Pop',        icons:'🎤', colors:['#8b5cf6','#ff2ec4'] },
  { id:'hip-hop',   name:'Hip-Hop',    icons:'🎧', colors:['#1e3a5f','#3b82f6'] },
  { id:'r-b',       name:'R&B',        icons:'💜', colors:['#4c1d95','#8b5cf6'] },
  { id:'electronic',name:'Electronic', icons:'⚡', colors:['#0c4a6e','#22d3ee'] },
  { id:'indie',     name:'Indie',      icons:'🎸', colors:['#1a3a1a','#34d399'] },
  { id:'reggaeton', name:'Reggaeton',  icons:'🌴', colors:['#7c2d12','#f97316'] },
  { id:'latin',     name:'Latin',      icons:'🎺', colors:['#7c2d12','#ef4444'] },
  { id:'rock',      name:'Rock',       icons:'🎸', colors:['#1c1c1c','#6b7280'] },
  { id:'jazz',      name:'Jazz',       icons:'🎷', colors:['#1a1205','#d97706'] },
  { id:'classical', name:'Classical',  icons:'🎻', colors:['#1e1b4b','#818cf8'] },
  { id:'country',   name:'Country',    icons:'🤠', colors:['#422006','#f59e0b'] },
  { id:'afrobeats', name:'Afrobeats',  icons:'🥁', colors:['#14532d','#22c55e'] },
];

// Expose globally
window.DEMO_DATA = {
  tracks:    DEMO_TRACKS,
  artists:   DEMO_ARTISTS,
  albums:    DEMO_ALBUMS,
  playlists: DEMO_PLAYLISTS,
  genres:    DEMO_GENRES,
};
