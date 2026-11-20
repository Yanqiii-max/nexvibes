/* NexVibes demo platform — vanilla JS single-page app (hash routing, localStorage state). */
(() => {
'use strict';

/* ================= helpers ================= */
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const DAY = 864e5;
const KEY = 'nexvibes_demo_v1';

const _ = (en, zh) => (S.lang === 'zh' ? zh : en);
const tx = o => (o == null ? '' : typeof o === 'string' ? o : (o[S.lang] ?? o.en ?? ''));

const CAT = id => CATEGORIES.find(c => c.id === id) || CATEGORIES[0];
const COURSE = id => COURSES.find(c => c.id === id);
const CATC = {
  foundations: ['#5541DC', '#8E7BFF'], image: ['#7B3FE4', '#F15BB5'], video: ['#1E1660', '#3FC79C'],
  audio: ['#0E6E6D', '#5FD9B0'], story: ['#3D2C8D', '#F2A48A'], design: ['#B8326A', '#FF9E80'],
  film: ['#0C0A22', '#5541DC'], marketing: ['#E0533A', '#F7B733'], build: ['#0B3954', '#36C3A0']
};

const IC = {
  spark: '<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z"/><path d="M19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8z"/>',
  image: '<rect x="3" y="3" width="18" height="18" rx="3"/><circle cx="9" cy="9" r="2"/><path d="M21 15l-5-5L5 21"/>',
  film: '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="M7 4v16M17 4v16M2 9h5M2 15h5M17 9h5M17 15h5"/>',
  wave: '<path d="M3 10v4M7 7v10M11 4v16M15 8v8M19 6v12"/>',
  pen: '<path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 013 3L7 19l-4 1 1-4z"/>',
  palette: '<circle cx="13.5" cy="6.5" r="1.2"/><circle cx="17.5" cy="10.5" r="1.2"/><circle cx="8.5" cy="7.5" r="1.2"/><circle cx="6.5" cy="12.5" r="1.2"/><path d="M12 2a10 10 0 000 20c1.1 0 2-.9 2-2 0-.5-.2-1-.5-1.3-.3-.4-.5-.8-.5-1.3 0-1.1.9-2 2-2h2.4A5.6 5.6 0 0022 9.8C22 5.5 17.5 2 12 2z"/>',
  clapper: '<path d="M4 11v8a2 2 0 002 2h12a2 2 0 002-2v-8H4z"/><path d="M4 11l-.9-3.2a2 2 0 011.4-2.4l11.6-3.2a2 2 0 012.4 1.4L19 6.8 4 11z"/><path d="M7.6 4.6l3.1 3.9M12.6 3.3l3.1 3.9"/>',
  mega: '<path d="M3 11l18-5v12L3 14v-3z"/><path d="M11.6 16.8a3 3 0 11-5.8-1.6"/>',
  code: '<path d="M16 18l6-6-6-6M8 6l-6 6 6 6"/>',
  play: '<path d="M7 4v16l13-8z"/>',
  check: '<path d="M20 6L9 17l-5-5"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  book: '<path d="M4 19.5A2.5 2.5 0 016.5 17H20V3H6.5A2.5 2.5 0 004 5.5v14z"/><path d="M20 17v4H6.5a2.5 2.5 0 010-5"/>',
  users: '<path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.9M16 3.1a4 4 0 010 7.8"/>',
  award: '<circle cx="12" cy="8" r="6"/><path d="M15.5 13.5L17 22l-5-3-5 3 1.5-8.5"/>',
  cal: '<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>',
  upload: '<path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><path d="M17 8l-5-5-5 5M12 3v12"/>',
  link: '<path d="M10 13a5 5 0 007.5.5l3-3a5 5 0 00-7-7l-1.7 1.7"/><path d="M14 11a5 5 0 00-7.5-.5l-3 3a5 5 0 007 7l1.7-1.7"/>',
  globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 010 18M12 3a14 14 0 000 18"/>',
  arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  left: '<path d="M19 12H5M11 18l-6-6 6-6"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/>',
  lock: '<rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 018 0v4"/>',
  star: '<path d="M12 2l3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1z"/>',
  file: '<path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><path d="M14 2v6h6"/>',
  send: '<path d="M22 2L11 13M22 2l-7 20-4-9-9-4z"/>',
  video: '<path d="M23 7l-7 5 7 5V7z"/><rect x="1" y="5" width="15" height="14" rx="2"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  x: '<path d="M18 6L6 18M6 6l12 12"/>',
  menu: '<path d="M3 6h18M3 12h18M3 18h18"/>',
  grad: '<path d="M22 10L12 5 2 10l10 5 10-5z"/><path d="M6 12v5c3 2 9 2 12 0v-5"/>',
  chart: '<path d="M3 3v18h18"/><path d="M7 15l4-4 3 3 5-6"/>',
  msg: '<path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>',
  bell: '<path d="M18 8a6 6 0 00-12 0c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.7 21a2 2 0 01-3.4 0"/>',
  ext: '<path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/>',
  logout: '<path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9"/>',
  refresh: '<path d="M23 4v6h-6M1 20v-6h6"/><path d="M3.5 9a9 9 0 0114.9-3.4L23 10M1 14l4.6 4.4A9 9 0 0020.5 15"/>',
  building: '<rect x="4" y="2" width="16" height="20" rx="2"/><path d="M9 22v-4h6v4M8 6h.01M16 6h.01M12 6h.01M8 10h.01M16 10h.01M12 10h.01M8 14h.01M16 14h.01M12 14h.01"/>',
  layers: '<path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5M2 12l10 5 10-5"/>',
  download: '<path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/>',
  zap: '<path d="M13 2L3 14h9l-1 8 10-12h-9z"/>',
  dash: '<rect x="3" y="3" width="7" height="9" rx="1.5"/><rect x="14" y="3" width="7" height="5" rx="1.5"/><rect x="14" y="12" width="7" height="9" rx="1.5"/><rect x="3" y="16" width="7" height="5" rx="1.5"/>',
  clip: '<path d="M16 4h2a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2"/><rect x="8" y="2" width="8" height="4" rx="1"/><path d="M9 14l2 2 4-4"/>',
  live: '<circle cx="12" cy="12" r="2"/><path d="M16.2 7.8a6 6 0 010 8.4M7.8 16.2a6 6 0 010-8.4M19.1 4.9a10 10 0 010 14.2M4.9 19.1a10 10 0 010-14.2"/>'
};
const ic = (n, cls = '') => `<svg class="ic ${cls}" viewBox="0 0 24 24"${n === 'play' ? ' style="fill:currentColor;stroke:none"' : ''}>${IC[n] || ''}</svg>`;

function mulberry(a) { return () => { a |= 0; a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
const iso = t => new Date(t).toISOString();
function fmtDate(d, withTime) {
  const x = new Date(d);
  const loc = S.lang === 'zh' ? 'zh-CN' : 'en-GB';
  const o = { month: 'short', day: 'numeric' };
  if (withTime) Object.assign(o, { hour: '2-digit', minute: '2-digit', weekday: 'short' });
  return x.toLocaleString(loc, o);
}
function rel(d) {
  const diff = Math.round((new Date(d) - Date.now()) / DAY);
  if (diff === 0) return _('today', '今天');
  if (diff > 0) return _(`in ${diff} day${diff > 1 ? 's' : ''}`, `${diff} 天后`);
  return _(`${-diff} day${diff < -1 ? 's' : ''} ago`, `${-diff} 天前`);
}
function lessonsAvail(c) { return c.lessons.filter(l => l.src.t !== 'own' || override(c.id, l.id)); }
function pct(c) {
  if (S.user !== 'student') return 0;
  const done = (S.progress[c.id] || []).length;
  const tot = lessonsAvail(c).length;
  return tot ? Math.min(100, Math.round(done / tot * 100)) : 0;
}
const override = (cid, lid) => S.overrides[`${cid}/${lid}`];
const srcOf = (c, l) => override(c.id, l.id) || l.src;
const ytThumb = id => `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
const me = () => S.user ? DEMO_USERS[S.user] : null;
const isFile = location.protocol === 'file:';
let S = load();

/* ================= state ================= */
function load() {
  try { const s = JSON.parse(localStorage.getItem(KEY)); if (s && s.v === 1) return s; } catch (e) { /* ignore */ }
  return seed();
}
function save() { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) { /* storage full or blocked */ } }

function seed() {
  const now = Date.now();
  const R = mulberry(7);
  const lang = (navigator.language || '').toLowerCase().startsWith('zh') ? 'zh' : 'en';
  const asg = (id, course, title, offset) => ({ id, course, title, brief: COURSE(course).task, due: iso(now + offset * DAY), points: 100, rubric: true, created: iso(now - 30 * DAY) });
  const assignments = [
    asg('a1', 'prompting', { en: 'Prompt Portfolio: 10 Cinematic Prompts', zh: '提示词作品集：10 条电影感提示词' }, -10),
    asg('a2', 'image-gen', { en: 'Key Art for an Imaginary Film', zh: '为一部虚构电影设计主视觉' }, 4),
    asg('a3', 'hailuo', { en: 'A 15-Second Cinematic Shot', zh: '一个 15 秒的电影感镜头' }, 15),
    asg('a4', 'story', { en: 'Treatment & 6-Panel Storyboard', zh: '故事大纲 + 6 格分镜' }, 25),
    asg('a5', 'short-film', { en: 'Capstone: Your AI Short Film', zh: '毕业项目：你的 AI 短片' }, 62)
  ];
  const texts = [
    'I built my prompts around a single location — a night market — and changed one layer (light, lens, motion) at a time. AI use: Midjourney for frames, ChatGPT to brainstorm moods; all ideas and selection are mine.',
    'My concept is a retro sci-fi film set in 1970s Kuala Lumpur. I kept a style reference for consistency. AI use: Nano Banana for edits, final layout in Photoshop by me.',
    'I focused on emotion first: loneliness in a crowded city. I documented every iteration in the PDF. AI use statement attached.',
    'Experimented with colour palettes from batik patterns. Some results were too generic, so I added lens and lighting details. Process notes in the link.',
    'I wanted a dreamy, slow mood. The hardest part was keeping the character face consistent across frames. AI tools listed in my process doc.'
  ];
  const fb = [
    { en: 'Strong concept and a clear visual language. Push the lighting further — your best frames commit to one light source.', zh: '概念很强，视觉语言清晰。光线可以再大胆一些——你最好的几帧都只有一个明确的光源。' },
    { en: 'Good iteration log. The prompts are still a bit generic; add lens and shot size to gain control.', zh: '迭代记录做得好。提示词还有些笼统，加上镜头和景别会更可控。' },
    { en: 'Beautiful mood. Consistency drops in the last frames — use a style reference next time.', zh: '氛围很美。最后几帧的一致性下降了——下次试试风格参考。' },
    { en: 'Clear and well documented. I would like to see a bolder creative risk in the next assignment.', zh: '清晰、记录完整。希望下一次作业能有更大胆的创意尝试。' }
  ];
  const subs = [];
  const score = () => ({ concept: 68 + Math.round(R() * 28), exec: 65 + Math.round(R() * 30), vibe: 66 + Math.round(R() * 30), process: 60 + Math.round(R() * 35) });
  CLASSMATES.forEach(([uid, name], i) => {
    // a1: graded (one late & ungraded)
    if (uid === 'u-aisha') {
      subs.push({ id: 's-a1-' + uid, aid: 'a1', uid, name, at: iso(now - 12 * DAY), text: texts[0], link: 'https://portfolio.example.com/aisha/prompt-portfolio', files: [{ name: 'prompt-portfolio.pdf', size: 2400000, type: 'application/pdf' }], status: 'graded', rub: { concept: 90, exec: 85, vibe: 92, process: 80 }, score: 88, feedback: fb[0], gradedAt: iso(now - 6 * DAY) });
    } else if (uid === 'u-14') {
      subs.push({ id: 's-a1-' + uid, aid: 'a1', uid, name, at: iso(now - 2 * DAY), text: texts[3], link: '', files: [{ name: 'prompts_final.pdf', size: 1800000, type: 'application/pdf' }], status: 'submitted', late: true });
    } else {
      const rub = score();
      subs.push({ id: 's-a1-' + uid, aid: 'a1', uid, name, at: iso(now - (11 + Math.round(R() * 4)) * DAY), text: texts[i % texts.length], link: '', files: [{ name: 'portfolio.pdf', size: 1200000 + Math.round(R() * 3e6), type: 'application/pdf' }], status: 'graded', rub, score: weighted(rub), feedback: fb[i % fb.length], gradedAt: iso(now - 6 * DAY) });
    }
    // a2: several submitted
    if (uid === 'u-aisha') {
      subs.push({ id: 's-a2-' + uid, aid: 'a2', uid, name, at: iso(now - 1 * DAY), text: texts[1], link: 'https://portfolio.example.com/aisha/key-art', files: [{ name: 'key-art-poster.jpg', size: 3100000, type: 'image/jpeg' }, { name: 'mood-frames.zip', size: 8200000, type: 'application/zip' }], status: 'submitted' });
    } else if (i < 10) {
      const graded = uid === 'u-3';
      const rub = graded ? score() : null;
      subs.push({ id: 's-a2-' + uid, aid: 'a2', uid, name, at: iso(now - Math.round(R() * 3 + 1) * DAY), text: texts[(i + 2) % texts.length], link: '', files: [{ name: 'key-art.png', size: 2e6 + Math.round(R() * 2e6), type: 'image/png' }], status: graded ? 'graded' : 'submitted', rub, score: graded ? weighted(rub) : null, feedback: graded ? fb[2] : null, gradedAt: graded ? iso(now - DAY / 2) : null });
    }
    if (uid === 'u-7' || uid === 'u-11') {
      subs.push({ id: 's-a3-' + uid, aid: 'a3', uid, name, at: iso(now - DAY), text: texts[4], link: 'https://portfolio.example.com/shots/' + uid, files: [], status: 'submitted' });
    }
  });
  const cp = {};
  CLASSMATES.forEach(([uid]) => { cp[uid] = 25 + Math.round(R() * 60); });
  return {
    v: 1, lang, user: null,
    enrolled: [...CLASS.courses, 'vibe-coding'],
    progress: { foundations: ['f1', 'f2', 'f3', 'f4'], prompting: ['p1', 'p2', 'p3'], 'image-gen': ['i1', 'i2'], hailuo: ['h1'] },
    last: { c: 'image-gen', l: 'i3' },
    overrides: {},
    assignments, subs, classProgress: cp,
    comments: {
      'foundations/f1': [
        { n: 'Daniel Tan', at: iso(now - 9 * DAY), text: 'The “predict the next word” idea finally clicked for me. Does the same thing happen for image models?' },
        { n: 'Dr. Lim Wei Ming', teacher: true, at: iso(now - 8 * DAY), text: 'Great question, Daniel — image models work differently (diffusion), we cover that in Week 3. The transformer lesson is a good bridge.' }
      ],
      'image-gen/i3': [
        { n: 'Priya Nair', at: iso(now - 3 * DAY), text: 'My laptop has 8GB VRAM — is that enough for Flux locally?' },
        { n: 'Lee Wei Jie', at: iso(now - 2 * DAY), text: 'I run a smaller quantised version on 8GB, works but slow. Lab PCs are faster.' }
      ],
      'hailuo/h1': [
        { n: 'Chloe Wong', at: iso(now - DAY), text: 'Tip: describing the camera move in a separate sentence made my results much more stable!' }
      ]
    },
    announcements: [
      { id: 'n1', at: iso(now - 2 * DAY), text: { en: 'Welcome to Week 6! We move from still images to motion. Watch Lesson 1 of “AI Video with MiniMax Hailuo” before Thursday’s live critique.', zh: '欢迎来到第 6 周！我们将从静态图像进入动态影像。请在周四直播点评前看完《用 MiniMax 海螺做 AI 视频》第 1 课。' } },
      { id: 'n2', at: iso(now - 6 * DAY), text: { en: 'Prompt Portfolio grades and feedback are out. Class average: 82. Great work, everyone!', zh: '提示词作品集的成绩和评语已发布，班级平均分 82。大家做得很棒！' } }
    ],
    sessions: [
      { id: 'ls1', title: { en: 'Live critique: Key Art reviews', zh: '直播点评：主视觉作品' }, at: iso(new Date(now + 2 * DAY).setHours(19, 0, 0, 0)), platform: 'Zoom', url: 'https://zoom.us/' },
      { id: 'ls2', title: { en: 'Guest talk: Directing AI video for advertising', zh: '嘉宾分享：AI 广告视频导演' }, at: iso(new Date(now + 9 * DAY).setHours(15, 0, 0, 0)), platform: 'Tencent Meeting', url: 'https://meeting.tencent.com/' }
    ]
  };
}
function weighted(rub) { return Math.round(RUBRIC.reduce((s, r) => s + (rub[r.k] || 0) * r.w / 100, 0)); }

/* ================= shared UI ================= */
function accessBadge(c) {
  if (c.access === 'free') return `<span class="badge free">${_('Free', '免费')}</span>`;
  if (c.access === 'campus') return `<span class="badge campus">${ic('building', 'sm')}${_('Campus', '校园版')}</span>`;
  return `<span class="badge premium">${ic('star', 'sm')}${_('Premium', '付费')}</span>`;
}
const levelTxt = l => ({ beginner: _('Beginner', '入门'), intermediate: _('Intermediate', '进阶'), advanced: _('Advanced', '高阶') }[l]);
const kindTxt = k => ({ general: _('General Ed', '通识课'), pro: _('Professional', '专业课'), workshop: _('Workshop', '工作坊'), original: _('NexVibes Original', 'NexVibes 原创') }[k]);

function cover(c, big) {
  const [a, b] = CATC[c.cat];
  return `<div class="cover">
    <div class="art" style="background:linear-gradient(135deg,${a},${b})"></div>
    <div class="tl">${accessBadge(c)}${c.comingSoon ? `<span class="badge soon">${_('Coming soon', '即将上线')}</span>` : ''}${c.spotlight ? `<span class="badge dark">${ic('zap', 'sm')}${_('Model spotlight', '模型专题')}</span>` : ''}</div>
    ${c.capstone ? `<div class="tr"><span class="badge dark">${ic('award', 'sm')}${_('Capstone', '毕业项目')}</span></div>` : ''}
    <div class="gl">${ic(CAT(c.cat).icon)}</div>
    <div class="ct"${big ? ' style="font-size:24px"' : ''}>${esc(tx(c.title))}</div>
  </div>`;
}
function courseCard(c) {
  const p = S.user === 'student' && S.enrolled.includes(c.id) ? pct(c) : null;
  return `<a class="card" href="#/course/${c.id}">
    ${cover(c)}
    <div class="body">
      <div class="cat-l">${esc(tx(CAT(c.cat)))} · ${kindTxt(c.kind)}</div>
      <p class="sub">${esc(tx(c.sub))}</p>
      <div class="meta"><span>${ic('play', 'sm')}${c.lessons.length} ${_('lessons', '课时')}</span><span>${ic('clock', 'sm')}${c.hours}h</span><span>${ic('grad', 'sm')}${c.credits} ${_('credits', '学分')}</span><span>${levelTxt(c.level)}</span></div>
      ${p !== null ? `<div class="row" style="margin-top:6px"><div class="pbar" style="flex:1"><i style="width:${p}%"></i></div><span class="tiny muted">${p}%</span></div>` : ''}
    </div>
  </a>`;
}
function srcTag(src) {
  if (src.t === 'yt') return `<span class="src-tag yt">YouTube</span>`;
  if (src.t === 'bili') return `<span class="src-tag bili">Bilibili</span>`;
  return `<span class="src-tag own">NexVibes</span>`;
}
function thumbHTML(src, extra = '') {
  if (src.t === 'yt') return `<div class="thumb" style="background-image:url(${ytThumb(src.id)})">${extra}<div class="play">${ic('play')}</div></div>`;
  if (src.t === 'bili') return `<div class="thumb" style="background:linear-gradient(135deg,#0E8BC9,#5541DC)">${extra}<div class="ph-art" style="background:linear-gradient(135deg,#0E8BC9,#5541DC)"><div>${ic('video')}<b>bilibili</b><small>${_('Chinese video', '中文视频')}</small></div></div><div class="play">${ic('play')}</div></div>`;
  return `<div class="thumb">${extra}<div class="ph-art"><div>${ic('live')}<b style="font-family:var(--display)">${_('Recording soon', '即将录制')}</b><small>NexVibes Original</small></div></div></div>`;
}
function playerHTML(src, by, key) {
  if (src.t === 'own') {
    return `<div class="player"><div class="ph-player"><div>
      <img class="logo-w" src="assets/logo-white.png" alt="NexVibes">
      <div class="rec"><i></i>${_('Recording in progress', '录制中')}</div>
      <h3>${_('NexVibes original lesson — coming soon', 'NexVibes 原创课程——即将上线')}</h3>
      <p>${_('This slot is reserved for a lesson recorded by NexVibes faculty and guest creators. Once uploaded, it will play right here.', '这里预留给 NexVibes 讲师和客座创作者录制的课程。上传后将直接在这里播放。')}</p>
    </div></div></div>`;
  }
  const poster = src.t === 'yt'
    ? `<div class="poster" data-act="play" data-t="yt" data-id="${esc(src.id)}" style="background-image:url(${ytThumb(src.id)})"><div class="play">${ic('play')}</div><div class="src">${srcTag(src)} ${esc(by || '')}</div></div>`
    : `<div class="poster bili-poster" data-act="play" data-t="bili" data-id="${esc(src.id)}"><div class="play">${ic('play')}</div><div><b>bilibili</b><span class="small" style="opacity:.8">${esc(by || '')}</span></div><div class="src">${srcTag(src)} ${esc(src.id)}</div></div>`;
  return `<div class="player" id="player-${key || 'x'}">${poster}</div>`;
}
function embedURL(t, id) {
  return t === 'yt'
    ? `https://www.youtube-nocookie.com/embed/${encodeURIComponent(id)}?autoplay=1&rel=0&modestbranding=1&playsinline=1`
    : `https://player.bilibili.com/player.html?bvid=${encodeURIComponent(id)}&page=1&autoplay=1&high_quality=1&danmaku=0`;
}
const watchURL = src => src.t === 'yt' ? `https://www.youtube.com/watch?v=${src.id}` : `https://www.bilibili.com/video/${src.id}`;
function parseVideo(url) {
  url = (url || '').trim();
  let m = url.match(/(?:youtube\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/|live\/)|youtu\.be\/)([\w-]{11})/);
  if (m) return { t: 'yt', id: m[1] };
  m = url.match(/(BV[0-9A-Za-z]{10})/);
  if (m) return { t: 'bili', id: m[1] };
  return null;
}

function toast(msg) {
  const t = $('#toast');
  t.innerHTML = ic('check') + esc(msg);
  t.classList.add('show');
  clearTimeout(toast._t);
  toast._t = setTimeout(() => t.classList.remove('show'), 2600);
}
function openModal(html, wide) {
  const m = $('#modal');
  m.className = 'modal' + (wide ? ' wide' : '');
  m.innerHTML = html;
  requestAnimationFrame(() => m.classList.add('open'));
  $('#scrim').classList.add('open');
}
function openDrawer(html) { $('#drawer').innerHTML = html; $('#drawer').classList.add('open'); $('#scrim').classList.add('open'); }
function closeAll() { $('#modal').classList.remove('open'); $('#drawer').classList.remove('open'); $('#scrim').classList.remove('open'); }
const modalHead = (title, sub) => `<div class="mh"><div><h3>${title}</h3>${sub ? `<div class="muted small" style="margin-top:4px">${sub}</div>` : ''}</div><button class="x" data-act="close">${ic('x')}</button></div>`;

/* ================= header / footer ================= */
function header(path) {
  const u = me();
  const links = [
    ['courses', _('Courses', '课程')], ['lectures', _('Lectures', '讲座')], ['articles', _('Articles', '文章')],
    ['tools', _('AI Tools', '工具库')], ['showcase', _('Showcase', '作品展')], ['universities', _('For Universities', '高校合作')], ['about', _('About', '关于')]
  ];
  const roleName = { student: _('Student', '学生'), teacher: _('Teacher', '教师'), admin: _('Admin', '管理员') };
  $('#hdr').innerHTML = `<div class="wrap">
    <a class="logo" href="#/"><img src="assets/logo.png" alt="NexVibes"></a>
    <nav class="nav" id="nav">${links.map(([k, v]) => `<a href="#/${k}" class="${path === k || (k === 'courses' && ['course', 'learn'].includes(path)) || (k === 'lectures' && path === 'lecture') || (k === 'articles' && path === 'article') ? 'on' : ''}">${v}</a>`).join('')}</nav>
    <div class="hdr-r">
      <label class="search">${ic('search', 'sm')}<input id="q" placeholder="${_('Search courses…', '搜索课程…')}"></label>
      <div class="lang"><button data-act="lang" data-v="en" class="${S.lang === 'en' ? 'on' : ''}">EN</button><button data-act="lang" data-v="zh" class="${S.lang === 'zh' ? 'on' : ''}">中文</button></div>
      ${u ? `<div class="user-btn" data-act="umenu" role="button" tabindex="0"><span class="avatar sm">${u.initials}</span><span class="role">${roleName[S.user]}</span>
        <div class="menu" id="umenu">
          <div class="mh"><b>${esc(u.name)}</b><div class="tiny muted">${esc(tx(u.title))}</div></div><hr>
          <a href="#/dashboard">${ic('dash')}${_('Dashboard', '我的主页')}</a>
          <a href="#/assignments">${ic('clip')}${_('Assignments', '作业')}</a>
          ${S.user === 'teacher' ? `<a href="#/class">${ic('users')}${_('Class & gradebook', '班级与成绩册')}</a>` : ''}
          <hr><div class="mh tiny muted" style="padding-bottom:4px">${_('Switch demo role', '切换演示身份')}</div>
          ${['student', 'teacher', 'admin'].filter(r => r !== S.user).map(r => `<button data-act="login" data-role="${r}">${ic(r === 'student' ? 'grad' : r === 'teacher' ? 'users' : 'building')}${roleName[r]}</button>`).join('')}
          <hr><button data-act="reset">${ic('refresh')}${_('Reset demo data', '重置演示数据')}</button>
          <button data-act="logout">${ic('logout')}${_('Sign out', '退出登录')}</button>
        </div></div>`
      : `<a class="btn primary sm" href="#/login">${_('Sign in', '登录')}</a>`}
      <button class="burger" data-act="burger">${ic('menu')}</button>
    </div></div>`;
  const q = $('#q');
  q.addEventListener('keydown', e => { if (e.key === 'Enter') { F.q = q.value.trim(); location.hash = '#/courses'; if (curPath() === 'courses') render(); } });
}
function footer() {
  $('#ftr').innerHTML = `<div class="wrap"><div class="top">
    <div><img src="assets/logo-white.png" alt="NexVibes" style="height:24px;margin-bottom:16px">
      <p style="margin:0 0 6px;max-width:320px">${_('Leave the render to AI. Own the Vibe. The AI creative education platform for universities.', '把渲染交给 AI，把 Vibe 留给自己。面向高校的 AI 创意教育平台。')}</p></div>
    <div><h5>${_('Learn', '学习')}</h5><a href="#/courses">${_('Courses', '课程')}</a><a href="#/lectures">${_('Lectures', '讲座')}</a><a href="#/articles">${_('Articles', '文章')}</a><a href="#/tools">${_('AI Tools', '工具库')}</a></div>
    <div><h5>${_('Teach', '教学')}</h5><a href="#/universities">${_('For Universities', '高校合作')}</a><a href="#/login">${_('Teacher demo', '教师端演示')}</a><a href="#/showcase">${_('Student showcase', '学生作品展')}</a></div>
    <div><h5>NexVibes</h5><a href="#/about">${_('About & vision', '关于与愿景')}</a><a href="#/universities">${_('Contact', '联系我们')}</a></div>
  </div>
  <div class="bot"><span>© 2026 NexVibes · ${_('Demo build', '演示版')}</span><span>${_('Third-party videos are embedded with their official players and remain the property of their creators.', '第三方视频通过官方播放器嵌入，版权归原作者所有。')}</span></div></div>`;
}
function banner() {
  $('#banner').innerHTML = `<div class="demo-banner">${_('Demo prototype — sample data, no real accounts.', '演示原型——示例数据，非真实账号。')} ${S.user ? '' : `<button data-act="go" data-href="#/login">${_('Try the student / teacher view', '体验学生 / 教师端')}</button>`}</div>`;
}

/* ================= pages ================= */
const totalLessons = COURSES.reduce((s, c) => s + c.lessons.length, 0);
const curatedCount = COURSES.reduce((s, c) => s + c.lessons.filter(l => l.src.t !== 'own').length, 0) + LECTURES.filter(l => !l.upcoming).length;

function pHome() {
  const featured = COURSES.filter(c => c.featured);
  const tools = ['MiniMax Hailuo', 'Kling', 'Runway', 'Veo', 'Sora', 'Midjourney', 'Nano Banana', 'Flux', 'ComfyUI', 'Suno', 'ElevenLabs', 'MiniMax Audio', 'Firefly', 'NotebookLM', 'Claude', 'ChatGPT', 'DeepSeek', 'Jimeng 即梦'];
  return `
  <section class="hero"><div class="wrap">
    <div>
      <span class="eyebrow"><b>${_('NEW', '新')}</b>${_('Now partnering with universities in Southeast Asia', '正与东南亚高校展开合作')}</span>
      <h1>${_('Leave the render to AI.<br><span class="grad-text">Own the Vibe.</span>', '把渲染交给 AI，<br><span class="grad-text">把 Vibe 留给你。</span>')}</h1>
      <p class="lead">${_('NexVibes brings credit-bearing AI creative courses into universities — video, image, script, voice, music and more — with assignments, grading and analytics built in.', 'NexVibes 把可计学分的 AI 创意课程带进大学课堂——视频、图像、剧本、声音、音乐……并内置作业、评分与学情分析。')}</p>
      <div class="cta"><a class="btn mint" href="#/courses">${_('Explore courses', '浏览课程')} ${ic('arrow')}</a><a class="btn ghost-dark" href="#/universities">${_('For universities', '高校合作')}</a></div>
      <div class="hero-trust">
        <div><b>${COURSES.length}</b>${_('courses', '门课程')}</div>
        <div><b>${curatedCount}+</b>${_('curated video lessons', '精选视频课时')}</div>
        <div><b>${CATEGORIES.length}</b>${_('creative disciplines', '个创作方向')}</div>
        <div><b>EN / 中</b>${_('bilingual', '双语')}</div>
      </div>
    </div>
    <div class="stage">
      <div class="screen"><div class="bar"><i></i><i></i><i></i></div>
        <div class="vid" style="background-image:url(${ytThumb('BnwcL1mhoPY')})"><div class="pbtn">${ic('play')}</div></div>
        <div class="meta"><div><div style="font-weight:600;font-size:14px">${_('AI Video with MiniMax Hailuo', '用 MiniMax 海螺做 AI 视频')}</div><div class="tiny" style="opacity:.6">${_('Lesson 1 · Masterclass', '第 1 课 · 大师课')}</div></div><div class="pb"><i></i></div><span class="tiny" style="opacity:.7">62%</span></div>
      </div>
      <div class="float f1"><div class="fi" style="background:var(--mint-50);color:var(--mint-600)">${ic('award')}</div><div><b>${_('Graded · 88 / 100', '已评分 · 88 / 100')}</b><span class="muted tiny">${_('“Strong concept, push the light”', '“概念很强，光线再大胆些”')}</span></div></div>
      <div class="float f2"><div class="fi" style="background:var(--brand-50);color:var(--brand)">${ic('globe')}</div><div><b>EN ⇄ 中文</b><span class="muted tiny">${_('One click to switch', '一键切换')}</span></div></div>
      <div class="float f3"><div class="fi" style="background:#FFF4E0;color:#B26A00">${ic('grad')}</div><div><b>+3 ${_('credits', '学分')}</b><span class="muted tiny">AIGC Studio 101</span></div></div>
    </div>
  </div>
  <div class="marquee"><div class="track">${[...tools, ...tools].map(t => `<span>${t}</span>`).join('')}</div></div>
  </section>

  <section class="sec"><div class="wrap">
    <div class="sec-h"><div><span class="kicker">${_('Explore', '探索')}</span><h2>${_('Every way to create with AI', '用 AI 创作的每一种方式')}</h2><p>${_('From general AI literacy to professional tracks for film, design, media and music students.', '从全专业的 AI 通识，到面向电影、设计、传媒、音乐专业的专业课程。')}</p></div><a class="link-arrow" href="#/courses">${_('All courses', '全部课程')} ${ic('arrow', 'sm')}</a></div>
    <div class="cats">${CATEGORIES.map(c => { const [a, b] = CATC[c.id]; const n = COURSES.filter(x => x.cat === c.id).length; return `<a class="cat" href="#/courses?cat=${c.id}"><span class="n">${n}</span><div class="ci" style="background:linear-gradient(135deg,${a},${b})">${ic(c.icon)}</div><h4>${tx(c)}</h4><p>${tx(c.desc)}</p></a>`; }).join('')}</div>
  </div></section>

  <section class="sec alt"><div class="wrap">
    <div class="sec-h"><div><span class="kicker">${_('Featured', '精选')}</span><h2>${_('Start with these courses', '从这些课程开始')}</h2></div><a class="link-arrow" href="#/courses">${_('Browse catalog', '浏览课程目录')} ${ic('arrow', 'sm')}</a></div>
    <div class="grid">${featured.slice(0, 6).map(courseCard).join('')}</div>
  </div></section>

  <section class="sec"><div class="wrap">
    <div class="sec-h"><div><span class="kicker">${_('Our belief', '我们的理念')}</span><h2>${_('The skill that matters has changed', '真正重要的能力已经变了')}</h2></div></div>
${vsHTML()}
  </div></section>

  <section class="sec alt"><div class="wrap">
    <div class="sec-h"><div><span class="kicker">${_('Built for the classroom', '为课堂而生')}</span><h2>${_('Not just videos — a complete teaching platform', '不只是视频——一个完整的教学平台')}</h2><p>${_('Universities get curriculum, credits and classroom tools in one place. Live classes run on Zoom or Tencent Meeting — scheduled right here.', '高校在一个地方获得课程体系、学分和课堂工具。直播课借助 Zoom 或腾讯会议，在平台内统一排期。')}</p></div></div>
    <div class="pillars">
      <div class="pillar"><span class="num">01</span><h4>${_('Curated + original curriculum', '精选 + 原创课程体系')}</h4><p>${_('The best tutorials from YouTube and Bilibili, organised into courses — plus NexVibes originals recorded with industry creators.', '把 YouTube 和 B 站上最好的教程整理成系统课程——再加上与业界创作者合作录制的 NexVibes 原创课。')}</p></div>
      <div class="pillar"><span class="num">02</span><h4>${_('Assignments & grading', '作业与评分')}</h4><p>${_('Teachers post assignments, students submit files and links, teachers score with a rubric and give feedback.', '老师发布作业，学生提交文件和链接，老师按评分标准打分并点评。')}</p></div>
      <div class="pillar"><span class="num">03</span><h4>${_('Credit-bearing', '计入学分')}</h4><p>${_('Courses map to university credits, so students learn consistently through a whole semester.', '课程对应大学学分，学生在整个学期内持续、高频地学习。')}</p></div>
      <div class="pillar"><span class="num">04</span><h4>${_('Always up to date', '持续更新')}</h4><p>${_('AI tools change monthly. We update the curriculum so faculty don’t have to.', 'AI 工具每月都在变。我们负责更新课程，老师不必自己追赶。')}</p></div>
    </div>
  </div></section>

  <section class="sec"><div class="wrap">
    <div class="sec-h"><div><span class="kicker">${_('Lectures', '讲座')}</span><h2>${_('Learn from the best minds in AI', '向 AI 领域最顶尖的人学习')}</h2></div><a class="link-arrow" href="#/lectures">${_('All lectures', '全部讲座')} ${ic('arrow', 'sm')}</a></div>
    <div class="lec">${LECTURES.slice(0, 3).map(lecCard).join('')}</div>
  </div></section>

  <section class="sec alt"><div class="wrap">
    <div class="sec-h"><div><span class="kicker">${_('Read', '阅读')}</span><h2>${_('Articles & guides', '文章与指南')}</h2></div><a class="link-arrow" href="#/articles">${_('All articles', '全部文章')} ${ic('arrow', 'sm')}</a></div>
    <div class="grid">${ARTICLES.slice(0, 3).map(artCard).join('')}</div>
  </div></section>

  <section class="sec"><div class="wrap">
    <div class="band">
      <div><span class="kicker" style="color:var(--mint)">${_('For universities', '高校合作')}</span><h2>${_('Bring AI creativity into every classroom — this semester.', '本学期，就把 AI 创意课带进每一间教室。')}</h2><p>${_('A complete, always-current AI curriculum with credits, assignments and analytics. No need to build a new faculty from scratch.', '一套完整、持续更新的 AI 课程体系，含学分、作业与学情分析。无需从零组建新的师资团队。')}</p>
        <div class="row wrap-row" style="margin-top:24px"><a class="btn mint" href="#/universities">${_('Partner with us', '成为合作院校')} ${ic('arrow')}</a><a class="btn ghost-dark" href="#/login">${_('Try the teacher view', '体验教师端')}</a></div></div>
      <ul>${PARTNERS.map(p => `<li>${ic('building')}<div><b>${esc(tx(p.name))}</b> · <span style="opacity:.8">${esc(tx(p.country))}</span></div></li>`).join('')}</ul>
    </div>
  </div></section>`;
}

function vsHTML() {
  return `<div class="vs">
      <div class="past"><span class="kicker" style="color:var(--muted)">${_('Media education — before', '过去的传媒教育')}</span><h3>${_('Years spent mastering the machine', '花数年时间死磕机器')}</h3>
        <ul><li>${_('Memorising menus and shortcuts', '背菜单和快捷键')}</li><li>${_('Fighting render pipelines', '和渲染管线较劲')}</li><li>${_('Tweaking code and parameters', '调代码、调参数')}</li><li>${_('Tools outdated by graduation', '毕业时工具已经过时')}</li></ul></div>
      <div class="future"><span class="kicker" style="color:var(--mint)">${_('NexVibes — the future we teach', 'NexVibes 定义的未来教育')}</span><h3>${_('Owning the Vibe of the work', '把控作品的 Vibe')}</h3>
        <p>${_('With powerful multimodal models underneath, the technical barrier is flattened. Students compete on what AI can’t do for them:', '当底层有强大的多模态大模型支撑，技术门槛被极大抹平。学生的核心竞争力，是 AI 无法替代的部分：')}</p>
        <ul><li>${ic('check')}${_('The inner core of a story', '故事的内核')}</li><li>${ic('check')}${_('The rhythm of sound and picture', '视听的节奏')}</li><li>${ic('check')}${_('The tension of emotion', '情绪的张力')}</li><li>${ic('check')}${_('The tone of an aesthetic', '审美的调性')}</li></ul>
        <div class="vibe-words"><span>Nex = Next</span><span>${_('Creative rhythm', '创意律动')}</span><span>${_('Aesthetic intuition', '审美直觉')}</span><span>${_('Cultural resonance', '文化共鸣')}</span></div></div>
    </div>`;
}
function lecCard(l) {
  const extra = `<span class="badge dark tag">${esc(tx(l.tag))}</span>${l.dur !== '—' ? `<span class="badge dark dur">${l.dur}</span>` : ''}`;
  return `<a class="lec-item" href="#/lecture/${l.id}">${thumbHTML(l.src, extra)}<h4>${esc(tx(l.title))}</h4><p>${esc(tx(l.speaker))} · ${esc(tx(l.role))}</p></a>`;
}
function artCard(a) {
  return `<a class="art-card" href="#/article/${a.id}"><div class="ac" style="background:linear-gradient(135deg,${a.cover[0]},${a.cover[1]})"></div><div class="ab"><div class="tiny muted" style="margin-bottom:8px">${fmtDate(a.date)} · ${a.read} ${_('min read', '分钟阅读')}</div><h4>${esc(tx(a.title))}</h4><p>${esc(tx(a.excerpt))}</p></div></a>`;
}

/* ---------- catalog ---------- */
const F = { cat: 'all', level: 'all', access: 'all', kind: 'all', q: '', track: null };
function pCourses(q) {
  if (q.get('cat')) { F.cat = q.get('cat'); F.track = null; }
  return `<section class="ph"><div class="wrap"><div class="crumbs"><a href="#/">${_('Home', '首页')}</a> / ${_('Courses', '课程')}</div><h1>${_('Course catalog', '课程目录')}</h1><p>${_('General education for every major, professional tracks for creative disciplines, workshops, and NexVibes originals.', '面向全专业的通识课、面向创意专业的专业课、工作坊，以及 NexVibes 原创课。')}</p></div></section>
  <section class="sec tight"><div class="wrap">
    <div class="kicker">${_('Browse by major', '按专业浏览')}</div>
    <div class="tracks">${TRACKS.map(t => `<button class="track ${F.track === t.id ? 'on' : ''}" data-act="track" data-v="${t.id}"><b>${tx(t)}</b><span>${t.courses.length} ${_('courses', '门课程')}</span></button>`).join('')}</div>
    <div class="filters">
      <button class="chip ${F.cat === 'all' ? 'on' : ''}" data-act="fcat" data-v="all">${_('All', '全部')}</button>
      ${CATEGORIES.map(c => `<button class="chip ${F.cat === c.id ? 'on' : ''}" data-act="fcat" data-v="${c.id}">${ic(c.icon, 'sm')}${tx(c)}</button>`).join('')}
    </div>
    <div class="filters">
      <input class="input" id="fq" placeholder="${_('Search…', '搜索…')}" value="${esc(F.q)}" style="width:220px">
      <select id="flevel"><option value="all">${_('All levels', '全部难度')}</option>${['beginner', 'intermediate', 'advanced'].map(l => `<option value="${l}" ${F.level === l ? 'selected' : ''}>${levelTxt(l)}</option>`).join('')}</select>
      <select id="faccess"><option value="all">${_('Any access', '全部权限')}</option><option value="free" ${F.access === 'free' ? 'selected' : ''}>${_('Free', '免费')}</option><option value="campus" ${F.access === 'campus' ? 'selected' : ''}>${_('Campus license', '校园授权')}</option><option value="premium" ${F.access === 'premium' ? 'selected' : ''}>${_('Premium', '付费')}</option></select>
      <select id="fkind"><option value="all">${_('All types', '全部类型')}</option>${['general', 'pro', 'workshop', 'original'].map(k => `<option value="${k}" ${F.kind === k ? 'selected' : ''}>${kindTxt(k)}</option>`).join('')}</select>
      <span class="spacer"></span><span class="small muted" id="fcount"></span>
    </div>
    <div class="grid" id="cgrid" style="margin-top:18px"></div>
  </div></section>`;
}
function courseGrid() {
  const g = $('#cgrid'); if (!g) return;
  const t = F.track && TRACKS.find(x => x.id === F.track);
  const q = F.q.toLowerCase();
  const list = COURSES.filter(c =>
    (!t || t.courses.includes(c.id)) && (F.cat === 'all' || c.cat === F.cat) && (F.level === 'all' || c.level === F.level) &&
    (F.access === 'all' || c.access === F.access) && (F.kind === 'all' || c.kind === F.kind) &&
    (!q || [c.title.en, c.title.zh, c.sub.en, c.sub.zh, ...c.lessons.map(l => l.title.en + l.title.zh + l.by)].join(' ').toLowerCase().includes(q)));
  g.innerHTML = list.length ? list.map(courseCard).join('') : `<div class="empty" style="grid-column:1/-1">${_('No courses match these filters.', '没有符合条件的课程。')}</div>`;
  $('#fcount').textContent = _(`${list.length} courses`, `共 ${list.length} 门课程`);
}

/* ---------- course detail ---------- */
function pCourse(id) {
  const c = COURSE(id); if (!c) return notFound();
  const enrolled = S.enrolled.includes(c.id) && S.user === 'student';
  const p = pct(c);
  const first = c.lessons.find(l => !(S.progress[c.id] || []).includes(l.id) && srcOf(c, l).t !== 'own') || c.lessons[0];
  const done = S.progress[c.id] || [];
  const curated = c.lessons.filter(l => l.src.t !== 'own').length;
  let cta;
  if (c.comingSoon) cta = `<button class="btn primary block" data-act="notify">${ic('bell')}${_('Notify me at launch', '上线时通知我')}</button>`;
  else if (enrolled) cta = `<a class="btn primary block" href="#/learn/${c.id}/${first.id}">${p > 0 ? _('Continue learning', '继续学习') : _('Start learning', '开始学习')} ${ic('arrow')}</a><div class="row"><div class="pbar" style="flex:1"><i style="width:${p}%"></i></div><span class="small muted">${p}%</span></div>`;
  else cta = `<button class="btn primary block" data-act="enroll" data-id="${c.id}">${c.access === 'premium' ? ic('star') + _('Unlock with Premium', '开通付费课程') : _('Enroll for free', '免费加入')}</button><a class="btn ghost block" href="#/learn/${c.id}/${c.lessons[0].id}">${ic('play', 'sm')}${_('Preview first lesson', '试看第一课')}</a>`;
  return `<section class="ph cd-hero"><div class="wrap">
    <div>
      <div class="crumbs"><a href="#/">${_('Home', '首页')}</a> / <a href="#/courses">${_('Courses', '课程')}</a> / <a href="#/courses?cat=${c.cat}">${tx(CAT(c.cat))}</a></div>
      <div class="badges">${accessBadge(c)}<span class="badge dark">${kindTxt(c.kind)}</span><span class="badge dark">${levelTxt(c.level)}</span></div>
      <h1>${esc(tx(c.title))}</h1>
      <p>${esc(tx(c.sub))}</p>
      <div class="cd-stats"><span>${ic('play')}${c.lessons.length} ${_('lessons', '课时')}</span><span>${ic('clock')}${c.hours} ${_('hours', '小时')}</span><span>${ic('grad')}${c.credits} ${_('credits', '学分')}</span><span>${ic('globe')}${_('EN / 中文 notes', '中英双语讲义')}</span></div>
    </div>
    <div class="cd-card">${cover(c, true)}<div class="in">${cta}
      <ul><li>${ic('video')}${curated} ${_('curated video lessons', '节精选视频课')}</li><li>${ic('live')}${c.lessons.length - curated} ${_('NexVibes original sessions', '节 NexVibes 原创课')}</li><li>${ic('clip')}${_('1 graded assignment with rubric', '1 份带评分标准的作业')}</li><li>${ic('award')}${_('Certificate of completion', '结业证书')}</li></ul>
      ${c.access === 'campus' ? `<div class="callout brand small">${ic('building')}<div>${_('Included in your university’s campus license.', '已包含在你所在大学的校园授权中。')}</div></div>` : ''}
    </div></div>
  </div></section>
  <div class="wrap"><div class="cd-body">
    <div>
      <div class="box"><h3>${_('What you’ll learn', '你将学到')}</h3><ul class="outcomes">${tx(c.outcomes).map(o => `<li>${ic('check')}<span>${esc(o)}</span></li>`).join('')}</ul></div>
      <div class="box"><h3>${_('Syllabus', '课程大纲')}</h3><div class="syll">${c.lessons.map((l, i) => { const s = srcOf(c, l); return `<a href="#/learn/${c.id}/${l.id}"><span class="n ${done.includes(l.id) ? 'done' : ''}">${done.includes(l.id) ? ic('check', 'sm') : i + 1}</span><div class="t"><b>${esc(tx(l.title))}</b><span>${srcTag(s)} ${esc(l.by)} · ${l.dur}</span></div>${s.t === 'own' ? `<span class="badge soon">${_('Soon', '即将上线')}</span>` : ic('play', 'sm')}</a>`; }).join('')}</div></div>
      <div class="box"><h3>${_('Course assignment', '课程作业')}</h3><p style="margin:0 0 14px">${esc(tx(c.task))}</p><div class="small muted">${_('Graded with the NexVibes rubric:', '按 NexVibes 评分标准评分：')} ${RUBRIC.map(r => `${tx(r)} ${r.w}%`).join(' · ')}</div></div>
    </div>
    <div>
      <div class="box after-card"><h3>${_('About the curation', '关于课程编排')}</h3><p class="small muted" style="margin:0 0 12px">${_('NexVibes curates the clearest tutorials from creators worldwide, orders them into a learning path, and adds bilingual study notes, exercises and graded assignments. Videos play right inside the platform via the creators’ official players.', 'NexVibes 从全球创作者中挑选讲得最清楚的教程，编排成学习路径，并配上中英双语学习笔记、练习和可评分的作业。视频通过原作者的官方播放器在平台内直接播放。')}</p>
        <div class="tiny muted">${_('Creators in this course:', '本课程的视频作者：')}<br><b style="color:var(--ink)">${[...new Set(c.lessons.map(l => l.by))].map(esc).join(' · ')}</b></div></div>
      <div class="box"><h3>${_('Related courses', '相关课程')}</h3><div class="list">${COURSES.filter(x => x.id !== c.id && (x.cat === c.cat || x.kind === c.kind)).slice(0, 3).map(x => `<a class="li" href="#/course/${x.id}"><div class="li-ic" style="background:linear-gradient(135deg,${CATC[x.cat][0]},${CATC[x.cat][1]});color:#fff">${ic(CAT(x.cat).icon)}</div><div class="t"><b>${esc(tx(x.title))}</b><span>${x.lessons.length} ${_('lessons', '课时')} · ${levelTxt(x.level)}</span></div></a>`).join('')}</div></div>
    </div>
  </div></div>`;
}

/* ---------- learn ---------- */
function pLearn(cid, lid) {
  const c = COURSE(cid); if (!c) return notFound();
  const idx = Math.max(0, c.lessons.findIndex(l => l.id === lid));
  const l = c.lessons[idx];
  const src = srcOf(c, l);
  const done = S.progress[c.id] || [];
  const isDone = done.includes(l.id);
  const p = pct(c);
  const next = c.lessons[idx + 1];
  if (S.user === 'student') { S.last = { c: c.id, l: l.id }; save(); }
  const comments = S.comments[`${c.id}/${l.id}`] || [];
  const asg = S.assignments.find(a => a.course === c.id);
  const relTools = TOOLS.filter(t => t.cat === c.cat).slice(0, 4);
  const pts = tx(l.pts) || [];
  return `<div class="wrap"><div class="learn">
    <div>
      <div class="crumbs" style="color:var(--muted);margin:0 0 14px"><a href="#/course/${c.id}">${ic('left', 'sm')} ${esc(tx(c.title))}</a></div>
      ${playerHTML(src, l.by, l.id)}
      ${src.t === 'yt' && isFile ? `<div class="callout warn small" style="margin-top:12px">${ic('zap')}<div>${_('YouTube blocks playback on pages opened directly from a file. Run the site from a web server (see README) or <a style="text-decoration:underline" target="_blank" rel="noopener" href="' + watchURL(src) + '">watch on YouTube</a>.', 'YouTube 不允许在直接双击打开的本地文件里播放。请用本地服务器打开网站（见 README），或<a style="text-decoration:underline" target="_blank" rel="noopener" href="' + watchURL(src) + '">去 YouTube 观看</a>。')}</div></div>` : ''}
      ${l.alt ? `<div class="row wrap-row" style="margin-top:12px"><button class="chip" data-act="altsrc" data-t="${l.alt.t}" data-id="${l.alt.id}" data-key="${l.id}">${ic('globe', 'sm')}${_('Also available: ', '另有版本：')}${esc(l.alt.label)}</button></div>` : ''}
      ${src.t === 'own' && (S.user === 'teacher' || S.user === 'admin') ? `<div class="teacher-slot"><b class="small">${ic('upload', 'sm')} ${_('Teacher tools · add a video to this slot', '教师工具 · 为这个课时添加视频')}</b><p class="small muted" style="margin:6px 0 10px">${_('Paste a YouTube or Bilibili link (or your own recording once hosting is connected). It will play here for all students.', '粘贴 YouTube 或 B 站链接（接入视频托管后也可上传自己的录像），所有学生都会在这里看到。')}</p><div class="row"><input class="input full" id="ovr" placeholder="https://www.youtube.com/watch?v=…  /  https://www.bilibili.com/video/BV…"><button class="btn primary sm" data-act="override" data-c="${c.id}" data-l="${l.id}">${_('Save', '保存')}</button></div></div>` : ''}
      ${override(c.id, l.id) && (S.user === 'teacher' || S.user === 'admin') ? `<div class="row" style="margin-top:10px"><span class="small muted">${_('Custom video set by teacher.', '老师已设置自定义视频。')}</span><button class="chip" data-act="clearovr" data-c="${c.id}" data-l="${l.id}">${_('Remove', '移除')}</button></div>` : ''}
      <h2 class="l-title">${esc(tx(l.title))}</h2>
      <div class="l-meta"><span>${_('Lesson', '第')} ${idx + 1}${_(' of ', ' / ')}${c.lessons.length}${_('', ' 课')}</span><span>·</span><span>${srcTag(src)} ${esc(l.by)}</span><span>·</span><span>${ic('clock', 'sm')} ${l.dur}</span>
        <span class="spacer"></span>
        ${S.user === 'student' && src.t !== 'own' ? `<button class="btn ${isDone ? 'ghost' : 'primary'} sm" data-act="complete" data-c="${c.id}" data-l="${l.id}">${isDone ? ic('check', 'sm') + _('Completed', '已完成') : _('Mark as complete', '标记为已完成')}</button>` : ''}
        ${next ? `<a class="btn ghost sm" href="#/learn/${c.id}/${next.id}">${_('Next', '下一课')} ${ic('arrow', 'sm')}</a>` : ''}
      </div>
      <div class="tabs"><button class="on" data-act="tab" data-v="notes">${_('Study notes', '学习笔记')}</button><button data-act="tab" data-v="asg">${_('Assignment', '作业')}</button><button data-act="tab" data-v="disc">${_('Discussion', '讨论')} (${comments.length})</button><button data-act="tab" data-v="res">${_('Resources', '资源')}</button></div>
      <div data-panel="notes" class="notes">
        <p>${esc(tx(l.sum))}</p>
        ${pts.length ? `<div class="kicker">${_('Key takeaways', '要点')}</div><ul class="keypts">${pts.map((x, i) => `<li><span class="k">${i + 1}</span><span>${esc(x)}</span></li>`).join('')}</ul>` : ''}
        ${src.t !== 'own' ? `<div class="callout">${ic('zap')}<div><b>${_('Try it', '动手试试')}</b><br>${_('Pause the video after each section and reproduce the step in the tool yourself. Save your best result and one failed attempt — both are useful for your process log.', '每看完一段就暂停，在工具里亲手复现这一步。保存一个最好的结果和一个失败的尝试——两者都会用在你的过程记录里。')}</div></div>` : ''}
      </div>
      <div data-panel="asg" class="hidden">
        ${asg ? `<div class="box" style="margin:0"><div class="box-h"><h3>${esc(tx(asg.title))}</h3><span class="badge warn">${_('Due', '截止')} ${fmtDate(asg.due)}</span></div><p style="margin:0 0 16px">${esc(tx(asg.brief))}</p><a class="btn primary sm" href="#/assignment/${asg.id}">${_('Open assignment', '打开作业')} ${ic('arrow', 'sm')}</a></div>`
        : `<div class="box" style="margin:0"><h3>${_('Practice task', '练习任务')}</h3><p style="margin:0">${esc(tx(c.task))}</p><p class="small muted" style="margin:12px 0 0">${_('Your teacher can turn this into a graded assignment for your class.', '老师可以把它设置为班级的计分作业。')}</p></div>`}
      </div>
      <div data-panel="disc" class="hidden">
        <div class="box" style="margin:0">
          ${comments.length ? comments.map(cm => `<div class="comment"><span class="avatar sm">${esc(cm.n.split(' ').map(x => x[0]).join('').slice(0, 2))}</span><div><div class="who">${esc(cm.n)}${cm.teacher ? ` <span class="badge brand">${_('Teacher', '老师')}</span>` : ''}<small>${rel(cm.at)}</small></div><p>${esc(cm.text)}</p></div></div>`).join('') : `<p class="muted small" style="margin:0 0 10px">${_('No questions yet. Be the first to ask!', '还没有人提问，来做第一个吧！')}</p>`}
          ${S.user ? `<div class="row" style="margin-top:14px"><input class="input full" id="cmt" placeholder="${_('Ask a question or share a tip…', '提个问题或分享一个技巧…')}"><button class="btn primary sm" data-act="comment" data-k="${c.id}/${l.id}">${ic('send', 'sm')}</button></div>` : `<a class="btn ghost sm" href="#/login" style="margin-top:12px">${_('Sign in to join the discussion', '登录后参与讨论')}</a>`}
        </div>
      </div>
      <div data-panel="res" class="hidden"><div class="res-list">
        ${src.t !== 'own' ? `<a href="${watchURL(src)}" target="_blank" rel="noopener">${ic('ext')}<div><b>${_('Original video', '原视频')}</b><div class="tiny muted">${esc(l.by)} · ${src.t === 'yt' ? 'YouTube' : 'Bilibili'}</div></div></a>` : ''}
        ${relTools.map(t => `<a href="${t.url}" target="_blank" rel="noopener">${ic('zap')}<div><b>${esc(t.n)}</b><div class="tiny muted">${esc(t.by)} · ${esc(tx(t.d))}</div></div></a>`).join('')}
        <div class="r">${ic('download')}<div><b>${_('Slides & templates', '课件与模板')}</b><div class="tiny muted">${_('Available with NexVibes original lessons', '随 NexVibes 原创课程提供')}</div></div></div>
      </div></div>
    </div>
    <aside class="side">
      <div class="box">
        <div class="box-h" style="margin-bottom:10px"><h3 style="font-size:16px">${_('Course content', '课程内容')}</h3><span class="small muted">${p}%</span></div>
        <div class="pbar" style="margin-bottom:14px"><i style="width:${p}%"></i></div>
        <div class="lesson-list">${c.lessons.map((x, i) => { const s = srcOf(c, x); const d = done.includes(x.id); return `<a href="#/learn/${c.id}/${x.id}" class="${x.id === l.id ? 'on' : ''}"><span class="chk ${d ? 'done' : ''}">${d ? ic('check') : ''}</span><div><b>${i + 1}. ${esc(tx(x.title))}</b><span>${srcTag(s)} ${x.dur}</span></div></a>`; }).join('')}</div>
      </div>
      ${S.user ? '' : `<div class="box"><b>${_('Track your progress', '记录学习进度')}</b><p class="small muted" style="margin:6px 0 12px">${_('Sign in with your university account to save progress, submit assignments and earn credits.', '使用大学账号登录，保存进度、提交作业、获得学分。')}</p><a class="btn primary sm block" href="#/login">${_('Sign in', '登录')}</a></div>`}
    </aside>
  </div></div>`;
}

/* ---------- lectures / articles / tools / showcase ---------- */
function pLectures() {
  return `<section class="ph"><div class="wrap"><div class="crumbs"><a href="#/">${_('Home', '首页')}</a> / ${_('Lectures', '讲座')}</div><h1>${_('Lectures & talks', '讲座与分享')}</h1><p>${_('Keynotes from AI researchers, visual explainers, Chinese-language deep dives and the upcoming NexVibes Guest Lecture Series with industry directors.', 'AI 研究者的主题演讲、可视化讲解、中文深度解读，以及即将开讲的 NexVibes 业界导演客座讲座系列。')}</p></div></section>
  <section class="sec tight"><div class="wrap"><div class="lec">${LECTURES.map(lecCard).join('')}</div></div></section>`;
}
function pLecture(id) {
  const l = LECTURES.find(x => x.id === id); if (!l) return notFound();
  return `<div class="wrap" style="padding-top:24px;padding-bottom:64px;max-width:1000px">
    <div class="crumbs" style="color:var(--muted)"><a href="#/lectures">${ic('left', 'sm')} ${_('All lectures', '全部讲座')}</a></div>
    ${playerHTML(l.src, tx(l.speaker), 'lec')}
    ${l.src.t === 'yt' && isFile ? `<div class="callout warn small" style="margin-top:12px">${ic('zap')}<div>${_('YouTube needs the site to run from a web server.', 'YouTube 需要通过本地服务器打开网站才能播放。')} <a style="text-decoration:underline" target="_blank" rel="noopener" href="${watchURL(l.src)}">${_('Watch on YouTube', '去 YouTube 观看')}</a></div></div>` : ''}
    <div class="row" style="margin-top:22px"><span class="badge campus">${esc(tx(l.tag))}</span><span class="small muted">${l.dur}</span></div>
    <h1 style="font-size:32px;margin:10px 0 8px">${esc(tx(l.title))}</h1>
    <p class="muted" style="margin:0">${esc(tx(l.speaker))} · ${esc(tx(l.role))}</p>
    ${l.upcoming ? `<div class="callout brand" style="margin-top:20px">${ic('cal')}<div>${_('This lecture will be streamed live via Zoom and the recording posted here. Partner universities can register their students in advance.', '本讲座将通过 Zoom 直播，结束后录像发布在这里。合作院校可以提前为学生报名。')}</div></div>` : ''}
  </div>`;
}
function pArticles() {
  return `<section class="ph"><div class="wrap"><div class="crumbs"><a href="#/">${_('Home', '首页')}</a> / ${_('Articles', '文章')}</div><h1>${_('Articles & guides', '文章与指南')}</h1><p>${_('Essays, cheat sheets and educator guides from the NexVibes team.', 'NexVibes 团队撰写的观点文章、速查表和教师指南。')}</p></div></section>
  <section class="sec tight"><div class="wrap"><div class="grid">${ARTICLES.map(artCard).join('')}</div></div></section>`;
}
function pArticle(id) {
  const a = ARTICLES.find(x => x.id === id); if (!a) return notFound();
  const body = tx(a.body).map(([t, v]) => t === 'p' ? `<p>${esc(v)}</p>` : t === 'h' ? `<h2>${esc(v)}</h2>` : t === 'quote' ? `<blockquote>${esc(v)}</blockquote>` : t === 'code' ? `<pre>${esc(v)}</pre>` : `<ul>${v.map(x => `<li>${esc(x)}</li>`).join('')}</ul>`).join('');
  return `<section class="ph" style="background:linear-gradient(135deg,${a.cover[0]},${a.cover[1]})"><div class="wrap" style="max-width:860px"><div class="crumbs"><a href="#/articles">${_('Articles', '文章')}</a></div><h1>${esc(tx(a.title))}</h1><p>${esc(tx(a.excerpt))}</p><div class="small" style="margin-top:18px;opacity:.75">NexVibes · ${fmtDate(a.date)} · ${a.read} ${_('min read', '分钟阅读')}</div></div></section>
  <article class="article">${body}<div style="margin-top:40px"><a class="link-arrow" href="#/articles">${ic('left', 'sm')} ${_('More articles', '更多文章')}</a></div></article>`;
}
function pTools() {
  return `<section class="ph"><div class="wrap"><div class="crumbs"><a href="#/">${_('Home', '首页')}</a> / ${_('AI Tools', '工具库')}</div><h1>${_('AI tool directory', 'AI 工具库')}</h1><p>${_('The tools taught across NexVibes courses, organised by creative discipline. Links open the official sites.', 'NexVibes 课程中用到的工具，按创作方向整理，链接直达官网。')}</p></div></section>
  <section class="sec tight"><div class="wrap">${CATEGORIES.filter(c => TOOLS.some(t => t.cat === c.id)).map(c => `<div style="margin-bottom:34px"><h3 style="font-size:20px;margin-bottom:14px;display:flex;gap:10px;align-items:center">${ic(c.icon)}${tx(c)}</h3><div class="tools">${TOOLS.filter(t => t.cat === c.id).map(t => `<a class="tool" href="${t.url}" target="_blank" rel="noopener"><div class="tl" style="background:linear-gradient(135deg,${CATC[c.id][0]},${CATC[c.id][1]})">${esc(t.n[0])}</div><div style="flex:1;min-width:0"><b>${esc(t.n)}</b><span>${esc(t.by)} · ${esc(tx(t.d))}</span></div>${t.free ? `<span class="badge free">${_('Free tier', '有免费版')}</span>` : ''}</a>`).join('')}</div></div>`).join('')}</div></section>`;
}
function workArt(w) {
  const [a, b] = w.g;
  const kindLabel = { film: _('Short film', '短片'), image: _('Key art', '视觉作品'), audio: _('Audio', '音频'), board: _('Storyboard', '分镜'), web: _('Website', '网站') }[w.kind];
  return `<div class="work"><div class="wa" style="background:linear-gradient(180deg,${a},${a} 40%,${b})"><div class="sun" style="background:${b};opacity:.85"></div><div class="hz2" style="background:${a}"></div><div class="hz" style="background:linear-gradient(180deg,transparent,${a})"></div><span class="badge dark">${kindLabel}</span>${w.dur ? `<span class="badge dark dur">${ic('play', 'sm')}${w.dur}</span>` : ''}</div>
    <div class="wb"><h4>${esc(tx(w.t))}</h4><p>${esc(w.who)} · ${esc(w.uni)} · ${esc(tx(COURSE(w.course).title))}</p></div></div>`;
}
function pShowcase() {
  return `<section class="ph"><div class="wrap"><div class="crumbs"><a href="#/">${_('Home', '首页')}</a> / ${_('Showcase', '作品展')}</div><h1>${_('Student showcase', '学生作品展')}</h1><p>${_('The best work from NexVibes classrooms — selected by faculty at the end of each course.', '来自 NexVibes 课堂的优秀作品——每门课结束时由老师评选。')}</p></div></section>
  <section class="sec tight"><div class="wrap"><div class="callout warn small" style="margin-bottom:22px">${ic('zap')}<div>${_('Placeholder gallery: thumbnails and names below are illustrative. Real student work will appear here once the first cohort completes their courses.', '占位展示：以下缩略图和名字仅作示意。首批学生完成课程后，真实作品将展示在这里。')}</div></div><div class="show">${SHOWCASE.map(workArt).join('')}</div></div></section>`;
}

/* ---------- universities ---------- */
function pUniversities() {
  const feat = [
    ['layers', _('Ready-made AI curriculum', '现成的 AI 课程体系'), _('General education for every major plus professional tracks for film, design, media, animation and music.', '面向全专业的通识课，加上电影、设计、传媒、动画、音乐的专业课。')],
    ['clip', _('Assignments & grading', '作业与评分'), _('Teachers publish assignments, students submit files or links, teachers score with a rubric and return feedback.', '老师发布作业，学生提交文件或链接，老师按评分标准打分并返还评语。')],
    ['grad', _('Credit mapping', '学分对接'), _('Each course maps to your own course codes and credits, so learning counts toward the degree.', '每门课都可对应贵校的课程代码与学分，学习成果计入学位。')],
    ['chart', _('Learning analytics', '学情分析'), _('Completion, engagement and grades by faculty, class and course — exportable for accreditation.', '按学院、班级、课程查看完课率、活跃度和成绩，可导出用于教学评估。')],
    ['live', _('Live classes via Zoom / Tencent', '直播课：Zoom / 腾讯会议'), _('Schedule live critiques and guest talks; students join through the tools they already use.', '在平台内排期直播点评和嘉宾讲座，学生通过熟悉的会议软件加入。')],
    ['globe', _('Bilingual & global', '双语与国际化'), _('English and Chinese interface and notes from day one; more languages to follow.', '从第一天起支持中英文界面与讲义，后续增加更多语言。')]
  ];
  return `<section class="ph"><div class="wrap"><div class="crumbs"><a href="#/">${_('Home', '首页')}</a> / ${_('For Universities', '高校合作')}</div><h1>${_('An AI faculty, ready for your campus', '一支为你的校园准备好的 AI 师资')}</h1><p>${_('Every student needs AI skills — but AI changes every month, and few universities have the faculty to keep up. NexVibes delivers a complete, always-current curriculum with credits and classroom tools.', '每个大学生都需要 AI 技能——但 AI 每个月都在变，很少有大学有足够的师资跟上。NexVibes 提供一套完整、持续更新的课程体系，并配套学分与课堂工具。')}</p>
    <div class="row wrap-row" style="margin-top:26px"><a class="btn mint" href="#uni-contact" data-act="scroll" data-to="uni-contact">${_('Request a pilot', '申请试点')} ${ic('arrow')}</a><button class="btn ghost-dark" data-act="login" data-role="teacher">${_('Open the teacher demo', '打开教师端演示')}</button><button class="btn ghost-dark" data-act="login" data-role="admin">${_('Open the admin demo', '打开管理端演示')}</button></div></div></section>
  <section class="sec"><div class="wrap">
    <div class="sec-h"><div><span class="kicker">${_('How it works', '合作流程')}</span><h2>${_('From agreement to first class in weeks', '从签约到开课，只需几周')}</h2></div></div>
    <div class="steps">
      <div class="s"><h4>${_('Choose courses', '选择课程')}</h4><p>${_('Pick general-ed and major-specific courses for each faculty.', '为每个学院挑选通识课和专业课。')}</p></div>
      <div class="s"><h4>${_('Map credits', '对接学分')}</h4><p>${_('Link NexVibes courses to your course codes and credit hours.', '把 NexVibes 课程对应到贵校课程代码和学时。')}</p></div>
      <div class="s"><h4>${_('Onboard classes', '导入班级')}</h4><p>${_('Teachers and students sign in with university accounts.', '师生使用学校账号登录。')}</p></div>
      <div class="s"><h4>${_('Teach & grade', '教学与评分')}</h4><p>${_('Recorded lessons, assignments, live sessions and analytics.', '录播课、作业、直播课与学情分析。')}</p></div>
    </div>
  </div></section>
  <section class="sec alt"><div class="wrap">
    <div class="sec-h"><div><span class="kicker">${_('Platform', '平台功能')}</span><h2>${_('Everything a course needs', '一门课需要的一切')}</h2></div></div>
    <div class="feat">${feat.map(([i, h, p]) => `<div class="f"><div class="fi">${ic(i)}</div><h4>${h}</h4><p>${p}</p></div>`).join('')}</div>
  </div></section>
  <section class="sec"><div class="wrap">
    <div class="sec-h"><div><span class="kicker">${_('Example', '示例')}</span><h2>${_('Credit mapping — Faculty of Cinematic Arts', '学分对接示例——电影艺术学院')}</h2><p>${_('How a partner faculty can bundle NexVibes courses into one credit-bearing module.', '合作学院如何把 NexVibes 课程组合成一个可计学分的模块。')}</p></div></div>
    <div class="tbl-wrap"><table class="tbl credit-map"><thead><tr><th>${_('University module', '学校课程模块')}</th><th>${_('NexVibes courses', 'NexVibes 课程')}</th><th class="num">${_('Credits', '学分')}</th><th>${_('Assessment', '考核方式')}</th></tr></thead><tbody>
      <tr><td>AIGC Studio 101</td><td>${['foundations', 'prompting', 'image-gen', 'hailuo'].map(i => esc(tx(COURSE(i).title))).join('<br>')}</td><td class="num">3</td><td>${_('4 assignments (60%) + capstone (40%)', '4 次作业（60%）+ 毕业项目（40%）')}</td></tr>
      <tr><td>AI Narrative & Sound</td><td>${['story', 'voice-music'].map(i => esc(tx(COURSE(i).title))).join('<br>')}</td><td class="num">2</td><td>${_('2 assignments + portfolio', '2 次作业 + 作品集')}</td></tr>
      <tr><td>AI Film Production</td><td>${['video-tools', 'short-film'].map(i => esc(tx(COURSE(i).title))).join('<br>')}</td><td class="num">3</td><td>${_('Capstone short film', '毕业短片')}</td></tr>
    </tbody></table></div>
  </div></section>
  <section class="sec alt"><div class="wrap">
    <div class="sec-h"><div><span class="kicker">${_('Partners', '合作院校')}</span><h2>${_('Universities working with NexVibes', '与 NexVibes 合作的大学')}</h2></div></div>
    <div class="partners">${PARTNERS.map(p => `<div class="partner"><div class="pi">${esc(tx(p.name)[0])}</div><div><b>${esc(tx(p.name))}</b><span class="small muted">${esc(tx(p.country))}</span></div>${p.status === 'signed' ? `<span class="badge ok">${_('Partner', '合作中')}</span>` : `<span class="badge grey">${_('In discussion', '洽谈中')}</span>`}</div>`).join('')}</div>
  </div></section>
  <section class="sec"><div class="wrap">
    <div class="sec-h"><div><span class="kicker">${_('Plans', '方案')}</span><h2>${_('Licensing that fits your institution', '适合贵校的授权方案')}</h2></div></div>
    <div class="plans">
      <div class="plan"><h4>${_('Faculty Pilot', '学院试点')}</h4><div class="price">${_('Pilot', '试点')}</div><p class="muted small" style="margin:0">${_('One faculty, one semester — see the impact first.', '一个学院、一个学期——先看效果。')}</p><ul><li>${ic('check')}${_('Up to 3 courses', '最多 3 门课程')}</li><li>${ic('check')}${_('Assignments & grading', '作业与评分')}</li><li>${ic('check')}${_('Onboarding for teachers', '教师入门培训')}</li></ul><a class="btn ghost" href="#uni-contact" data-act="scroll" data-to="uni-contact">${_('Talk to us', '联系我们')}</a></div>
      <div class="plan hl"><span class="badge brand" style="align-self:flex-start;background:var(--mint);color:var(--night)">${_('Most popular', '最受欢迎')}</span><h4>${_('Campus License', '校园授权')}</h4><div class="price">${_('Per seat', '按人数')}</div><p class="muted small" style="margin:0">${_('Every student, every faculty, credit-bearing.', '全校学生、全部学院、计入学分。')}</p><ul><li>${ic('check')}${_('Full course catalog', '全部课程目录')}</li><li>${ic('check')}${_('Credit mapping & analytics', '学分对接与学情分析')}</li><li>${ic('check')}${_('NexVibes originals & guest lectures', 'NexVibes 原创课与客座讲座')}</li><li>${ic('check')}${_('Live sessions scheduling', '直播课排期')}</li></ul><a class="btn mint" href="#uni-contact" data-act="scroll" data-to="uni-contact">${_('Request a proposal', '获取方案')}</a></div>
      <div class="plan"><h4>${_('Individual Pro', '个人专业版')}</h4><div class="price">${_('Subscription', '订阅')}</div><p class="muted small" style="margin:0">${_('For creators and students outside partner campuses.', '面向合作院校以外的创作者和学生。')}</p><ul><li>${ic('check')}${_('Premium courses & workshops', '付费课程与工作坊')}</li><li>${ic('check')}${_('Certificates', '结业证书')}</li><li>${ic('check')}${_('Community showcase', '社区作品展')}</li></ul><a class="btn ghost" href="#/courses">${_('Browse courses', '浏览课程')}</a></div>
    </div>
  </div></section>
  <section class="sec alt" id="uni-contact"><div class="wrap" style="max-width:760px">
    <div class="sec-h" style="justify-content:center;text-align:center"><div><span class="kicker">${_('Contact', '联系')}</span><h2>${_('Start a pilot at your university', '在贵校启动试点')}</h2></div></div>
    <form class="box" data-form="contact">
      <div class="fgrid"><div class="fgroup"><label class="f">${_('Name', '姓名')}</label><input class="input full" required></div><div class="fgroup"><label class="f">${_('University', '学校')}</label><input class="input full" required></div></div>
      <div class="fgrid"><div class="fgroup"><label class="f">${_('Role', '职务')}</label><input class="input full"></div><div class="fgroup"><label class="f">${_('Work email', '工作邮箱')}</label><input class="input full" type="email" required></div></div>
      <div class="fgroup"><label class="f">${_('Which faculties are you interested in?', '感兴趣的学院有哪些？')}</label><textarea class="input"></textarea></div>
      <button class="btn primary" type="submit">${_('Send request', '提交申请')} ${ic('send', 'sm')}</button> <span class="tiny muted" style="margin-left:10px">${_('Demo form — nothing is sent.', '演示表单——不会真正发送。')}</span>
    </form>
  </div></section>`;
}

function pAbout() {
  return `<section class="ph"><div class="wrap"><div class="crumbs"><a href="#/">${_('Home', '首页')}</a> / ${_('About', '关于')}</div><h1>${_('Nex + Vibes', 'Nex + Vibes')}</h1><p>${_('Leave the technical generation to AI. Let young creators return to aesthetics, creativity and storytelling — and define the next wave of audiovisual culture.', '把底层的技术生成交给 AI，让青年创作者回归审美、创意与叙事本身，去定义属于下一代的视听浪潮。')}</p></div></section>
  <section class="sec"><div class="wrap">
    <div class="feat two">
      <div class="f" style="padding:36px"><div class="kicker">Nex</div><h4 style="font-size:34px;margin-bottom:12px">Next</h4><p style="font-size:16px">${_('The next generation — of creators, of tools, of media education.', '下一代——下一代的创作者、下一代的工具、下一代的传媒教育。')}</p></div>
      <div class="f" style="padding:36px;background:var(--night);color:#fff;border-color:var(--night)"><div class="kicker" style="color:var(--mint)">Vibes</div><h4 style="font-size:34px;margin-bottom:12px">${_('Rhythm · Intuition · Resonance', '律动 · 直觉 · 共鸣')}</h4><p style="font-size:16px;color:rgba(255,255,255,.75)">${_('Creative rhythm, aesthetic intuition and cultural resonance — the things that make work feel alive.', '创意律动、审美直觉与文化共鸣——让作品“活起来”的那些东西。')}</p></div>
    </div>
    <div class="box" style="margin-top:22px;padding:36px"><div class="kicker">${_('Cultural resonance across borders', '跨越国界的文化共振')}</div><h3 style="font-size:26px">${_('Languages differ. Vibes don’t.', '语言不同，共鸣相通。')}</h3><p style="font-size:16px;margin:0;color:var(--ink-2)">${_('The emotion carried by great audiovisual work crosses borders. That is why NexVibes is built bilingual from day one and starts with universities across Southeast Asia — where the next wave of storytellers is growing fastest.', '优质视听内容所传递的情绪与共鸣是无国界的。所以 NexVibes 从第一天起就是双语的，并从东南亚高校起步——那里正在成长最快的下一代讲故事的人。')}</p></div>
  </div></section>
  <section class="sec alt"><div class="wrap">${vsHTML()}</div></section>`;
}

/* ---------- login ---------- */
function pLogin() {
  const role = (r, i, bg, fg, h, p) => `<button class="role-card" data-act="login" data-role="${r}"><div class="ri" style="background:${bg};color:${fg}">${ic(i)}</div><div style="flex:1"><b>${h}</b><span>${p}</span></div>${ic('arrow')}</button>`;
  return `<div class="login"><div class="l"><img src="assets/logo-white.png" alt="NexVibes" style="height:28px;align-self:flex-start"><h2>${_('Welcome to your AI studio.', '欢迎来到你的 AI 工作室。')}</h2><p>${_('Students learn and submit. Teachers assign, grade and give feedback. Universities see the whole picture.', '学生学习、提交作业；老师布置、评分、点评；学校掌握全局。')}</p></div>
  <div class="r"><h2 style="font-size:30px;margin-bottom:8px">${_('Sign in', '登录')}</h2><p class="muted" style="margin:0 0 24px">${_('This is a demo — choose a role to explore. No password needed.', '这是演示版——选择一个身份即可体验，无需密码。')}</p>
    ${role('student', 'grad', 'var(--mint-50)', 'var(--mint-600)', _('Continue as Student', '以学生身份进入'), 'Aisha Rahman · MMU · ' + _('Cinematic Arts', '电影艺术'))}
    ${role('teacher', 'users', 'var(--brand-50)', 'var(--brand)', _('Continue as Teacher', '以教师身份进入'), 'Dr. Lim Wei Ming · AIGC Studio 101')}
    ${role('admin', 'building', '#FFF4E0', '#B26A00', _('Continue as University Admin', '以学校管理员身份进入'), _('Campus license & analytics', '校园授权与学情分析'))}
    <div class="or">${_('or, in the full version', '正式版中还可以')}</div>
    <div class="sso"><button class="btn ghost block" data-act="sso">${ic('building', 'sm')}${_('University SSO', '学校统一认证')}</button><button class="btn ghost block" data-act="sso">${ic('globe', 'sm')}Google</button></div>
  </div></div>`;
}

/* ---------- dashboards ---------- */
function pDashboard() {
  if (S.user === 'teacher') return dashTeacher();
  if (S.user === 'admin') return dashAdmin();
  return dashStudent();
}
const mySub = aid => S.subs.find(s => s.aid === aid && s.uid === DEMO_USERS.student.id);
function asgStatus(a) {
  const s = mySub(a.id);
  if (s && s.status === 'graded') return ['ok', _('Graded', '已评分')];
  if (s) return ['campus', _('Submitted', '已提交')];
  if (new Date(a.due) < Date.now()) return ['danger', _('Missing', '未提交')];
  return ['warn', _('To do', '待完成')];
}
function sessionsBox() {
  const list = [...S.sessions].filter(s => new Date(s.at) > Date.now() - DAY).sort((a, b) => new Date(a.at) - new Date(b.at));
  return `<div class="box"><div class="box-h"><h3>${_('Live sessions', '直播课')}</h3>${S.user === 'teacher' ? `<button class="btn ghost sm" data-act="newsession">${ic('plus', 'sm')}${_('Schedule', '排期')}</button>` : ''}</div>
    <div class="list">${list.length ? list.map(s => `<div class="li"><div class="li-ic">${ic('live')}</div><div class="t"><b>${esc(tx(s.title))}</b><span>${fmtDate(s.at, true)} · ${esc(s.platform)}</span></div><a class="btn ghost sm" href="${esc(s.url)}" target="_blank" rel="noopener">${_('Join', '加入')} ${ic('ext', 'sm')}</a></div>`).join('') : `<p class="small muted" style="margin:0">${_('No sessions scheduled.', '暂无直播课。')}</p>`}</div>
    <p class="tiny muted" style="margin:14px 0 0">${_('Live classes run on Zoom or Tencent Meeting; recordings are posted to the course afterwards.', '直播课通过 Zoom 或腾讯会议进行，结束后录像会发布到课程中。')}</p></div>`;
}
function annBox() {
  return `<div class="box"><div class="box-h"><h3>${_('Announcements', '班级公告')}</h3></div>
    ${S.user === 'teacher' ? `<div class="row" style="margin-bottom:14px"><input class="input full" id="annText" placeholder="${_('Write an announcement to the class…', '给全班发一条公告…')}"><button class="btn primary sm" data-act="announce">${ic('send', 'sm')}</button></div>` : ''}
    ${S.announcements.map(n => `<div class="ann"><div class="h"><span class="avatar sm" style="width:22px;height:22px;font-size:9px">LW</span>Dr. Lim · ${rel(n.at)}</div>${esc(tx(n.text))}</div>`).join('')}</div>`;
}
function dashStudent() {
  const u = DEMO_USERS.student;
  const my = S.enrolled.map(COURSE).filter(Boolean);
  const lastC = COURSE(S.last.c), lastL = lastC.lessons.find(l => l.id === S.last.l) || lastC.lessons[0];
  const lastSrc = srcOf(lastC, lastL);
  const todo = S.assignments.filter(a => !mySub(a.id)).sort((a, b) => new Date(a.due) - new Date(b.due));
  const graded = S.subs.filter(s => s.uid === u.id && s.status === 'graded');
  const completed = my.filter(c => pct(c) === 100);
  const credits = completed.reduce((s, c) => s + c.credits, 0);
  const totalCredits = my.reduce((s, c) => s + c.credits, 0);
  const overall = Math.round(my.reduce((s, c) => s + pct(c), 0) / my.length);
  return `<section class="ph"><div class="wrap"><div class="dash-h"><span class="avatar lg">${u.initials}</span><div><h1>${_('Welcome back, Aisha', '欢迎回来，Aisha')} 👋</h1><p>${esc(tx(CLASS.name))} · ${esc(CLASS.uni)} · ${esc(tx(CLASS.term))}</p></div></div></div></section>
  <div class="wrap"><div class="dgrid"><div>
    <div class="stats">
      <div class="stat"><div class="v">${overall}%</div><div class="l">${_('Overall progress', '总体进度')}</div></div>
      <div class="stat"><div class="v">${credits}<span class="small muted"> / ${totalCredits}</span></div><div class="l">${_('Credits earned', '已获学分')}</div></div>
      <div class="stat"><div class="v">${graded.length ? Math.round(graded.reduce((s, x) => s + x.score, 0) / graded.length) : '—'}</div><div class="l">${_('Average grade', '平均成绩')}</div></div>
      <div class="stat"><div class="v">6 🔥</div><div class="l">${_('Day streak', '连续学习天数')}</div></div>
    </div>
    <a class="continue" href="#/learn/${lastC.id}/${lastL.id}">${thumbHTML(lastSrc)}<div class="ci"><span class="k">${_('Continue learning', '继续学习')}</span><h3>${esc(tx(lastL.title))}</h3><span class="small" style="opacity:.7">${esc(tx(lastC.title))}</span><div class="pbar"><i style="width:${pct(lastC)}%"></i></div><span class="btn mint sm" style="align-self:flex-start">${_('Resume', '继续')} ${ic('arrow', 'sm')}</span></div></a>
    <div class="box"><div class="box-h"><h3>${_('My courses', '我的课程')}</h3><a class="link-arrow" href="#/courses">${_('Find more', '发现更多')} ${ic('arrow', 'sm')}</a></div>
      <div class="list">${my.map(c => { const p = pct(c); return `<a class="li" href="#/course/${c.id}"><div class="li-ic" style="background:linear-gradient(135deg,${CATC[c.cat][0]},${CATC[c.cat][1]});color:#fff">${ic(CAT(c.cat).icon)}</div><div class="t"><b>${esc(tx(c.title))}</b><div class="row" style="gap:10px;margin-top:6px"><div class="pbar" style="flex:1;max-width:260px"><i style="width:${p}%"></i></div><span class="tiny muted">${p}%</span></div></div>${p === 100 ? `<button class="btn ghost sm" data-act="cert" data-id="${c.id}">${ic('award', 'sm')}${_('Certificate', '证书')}</button>` : `<span class="tiny muted">${c.credits} ${_('cr', '学分')}</span>`}</a>`; }).join('')}</div></div>
  </div>
  <div>
    <div class="box"><div class="box-h"><h3>${_('Upcoming deadlines', '即将截止')}</h3><a class="link-arrow" href="#/assignments">${_('All', '全部')}</a></div>
      <div class="list">${todo.slice(0, 4).map(a => { const [cls] = asgStatus(a); return `<a class="li" href="#/assignment/${a.id}"><div class="li-ic ${cls === 'danger' ? 'danger' : 'warn'}">${ic('clip')}</div><div class="t"><b>${esc(tx(a.title))}</b><span>${_('Due', '截止')} ${fmtDate(a.due)} · ${rel(a.due)}</span></div></a>`; }).join('') || `<p class="small muted" style="margin:0">${_('All caught up!', '全部完成！')}</p>`}</div></div>
    <div class="box"><div class="box-h"><h3>${_('Recent feedback', '最新评语')}</h3></div>
      ${graded.map(s => { const a = S.assignments.find(x => x.id === s.aid); return `<a href="#/assignment/${a.id}" style="display:block"><div class="row" style="margin-bottom:8px"><b class="small" style="flex:1">${esc(tx(a.title))}</b><span class="score-pill">${s.score}<small>/100</small></span></div><div class="ann" style="margin:0">“${esc(tx(s.feedback))}”</div></a>`; }).join('') || `<p class="small muted" style="margin:0">${_('No feedback yet.', '暂无评语。')}</p>`}</div>
    ${annBox()}
    ${sessionsBox()}
  </div></div></div>`;
}
function dashTeacher() {
  const u = DEMO_USERS.teacher;
  const toGrade = S.subs.filter(s => s.status === 'submitted').sort((a, b) => new Date(a.at) - new Date(b.at));
  const graded = S.subs.filter(s => s.status === 'graded');
  const avg = graded.length ? Math.round(graded.reduce((s, x) => s + x.score, 0) / graded.length) : 0;
  const avgProg = Math.round(Object.values(S.classProgress).reduce((a, b) => a + b, 0) / CLASSMATES.length);
  return `<section class="ph"><div class="wrap"><div class="dash-h"><span class="avatar lg">${u.initials}</span><div><h1>${_('Good afternoon, Dr. Lim', '下午好，Lim 老师')}</h1><p>${esc(tx(CLASS.name))} · ${esc(tx(CLASS.faculty))} · ${esc(tx(CLASS.term))}</p></div><span class="spacer"></span><button class="btn mint" data-act="newasg">${ic('plus')}${_('New assignment', '布置作业')}</button></div></div></section>
  <div class="wrap"><div class="dgrid"><div>
    <div class="stats">
      <div class="stat"><div class="v">${CLASSMATES.length}</div><div class="l">${_('Students', '学生')}</div></div>
      <div class="stat"><div class="v" style="color:var(--brand)">${toGrade.length}</div><div class="l">${_('Waiting to grade', '待批改')}</div></div>
      <div class="stat"><div class="v">${avg}</div><div class="l">${_('Class average', '班级平均分')}</div></div>
      <div class="stat"><div class="v">${avgProg}%</div><div class="l">${_('Avg. course progress', '平均学习进度')}</div></div>
    </div>
    <div class="box"><div class="box-h"><h3>${_('To grade', '待批改')}</h3><span class="badge campus">${toGrade.length}</span></div>
      <div class="list">${toGrade.slice(0, 6).map(s => { const a = S.assignments.find(x => x.id === s.aid); return `<div class="li"><span class="avatar sm">${esc(initials(s.name))}</span><div class="t"><b>${esc(s.name)}</b><span>${esc(tx(a.title))} · ${_('submitted', '提交于')} ${rel(s.at)}${s.late ? ` · <span style="color:var(--danger)">${_('late', '迟交')}</span>` : ''}</span></div><button class="btn primary sm" data-act="grade" data-id="${s.id}">${_('Grade', '批改')}</button></div>`; }).join('') || `<p class="small muted" style="margin:0">${_('Nothing to grade. 🎉', '全部批改完毕 🎉')}</p>`}</div></div>
    <div class="box"><div class="box-h"><h3>${_('Assignments', '作业')}</h3><a class="link-arrow" href="#/assignments">${_('Manage', '管理')} ${ic('arrow', 'sm')}</a></div>${asgTable()}</div>
    <div class="box"><div class="box-h"><h3>${_('Courses in this class', '本班课程')}</h3><a class="link-arrow" href="#/class">${_('Gradebook', '成绩册')} ${ic('arrow', 'sm')}</a></div>
      <div class="list">${CLASS.courses.map(id => { const c = COURSE(id); return `<a class="li" href="#/course/${c.id}"><div class="li-ic" style="background:linear-gradient(135deg,${CATC[c.cat][0]},${CATC[c.cat][1]});color:#fff">${ic(CAT(c.cat).icon)}</div><div class="t"><b>${esc(tx(c.title))}</b><span>${c.lessons.length} ${_('lessons', '课时')} · ${c.credits} ${_('credits', '学分')}</span></div>${ic('arrow', 'sm')}</a>`; }).join('')}</div></div>
  </div>
  <div>${annBox()}${sessionsBox()}
    <div class="box"><h3 style="margin-bottom:10px">${_('Add your own lessons', '添加自己的课程')}</h3><p class="small muted" style="margin:0 0 12px">${_('Open any “NexVibes original” lesson slot to attach a YouTube / Bilibili link or your own recording.', '打开任意“NexVibes 原创”课时位置，即可挂上 YouTube / B 站链接或你自己的录像。')}</p><a class="btn ghost sm" href="#/learn/hailuo/h4">${_('Try it on a lesson', '在一节课上试试')} ${ic('arrow', 'sm')}</a></div>
  </div></div></div>`;
}
const initials = n => n.split(' ').map(x => x[0]).join('').slice(0, 2);
function asgTable() {
  return `<div class="tbl-wrap"><table class="tbl"><thead><tr><th>${_('Assignment', '作业')}</th><th>${_('Due', '截止')}</th><th class="num">${_('Submitted', '已交')}</th><th class="num">${_('Graded', '已评')}</th><th></th></tr></thead><tbody>
    ${[...S.assignments].sort((a, b) => new Date(a.due) - new Date(b.due)).map(a => { const subs = S.subs.filter(s => s.aid === a.id); return `<tr class="click" data-act="go" data-href="#/assignment/${a.id}"><td><b>${esc(tx(a.title))}</b><div class="tiny muted">${esc(tx(COURSE(a.course).title))}</div></td><td>${fmtDate(a.due)}</td><td class="num">${subs.length}/${CLASSMATES.length}</td><td class="num">${subs.filter(s => s.status === 'graded').length}</td><td>${ic('arrow', 'sm')}</td></tr>`; }).join('')}
  </tbody></table></div>`;
}
function dashAdmin() {
  const weeks = [120, 168, 190, 214, 236, 251, 268, 280, 291, 305, 309, 312];
  const W = 640, H = 200, pad = 28, max = 350;
  const pts = weeks.map((v, i) => [pad + i * (W - pad * 2) / (weeks.length - 1), H - pad - v / max * (H - pad * 2)]);
  const line = pts.map((p, i) => (i ? 'L' : 'M') + p[0].toFixed(1) + ' ' + p[1].toFixed(1)).join(' ');
  const area = line + ` L ${pts[pts.length - 1][0]} ${H - pad} L ${pts[0][0]} ${H - pad} Z`;
  const comp = [['foundations', 78], ['prompting', 71], ['image-gen', 54], ['hailuo', 38], ['story', 22], ['voice-music', 19], ['short-film', 6]];
  const fac = [[_('Cinematic Arts', '电影艺术学院'), 186, 64], [_('Creative Multimedia', '创意多媒体学院'), 142, 58], [_('Applied Communication', '应用传播学院'), 98, 41], [_('Management', '管理学院'), 54, 22]];
  return `<section class="ph"><div class="wrap"><div class="dash-h"><span class="avatar lg">FA</span><div><h1>${_('Campus overview', '校园总览')}</h1><p>Multimedia University · ${_('Campus License', '校园授权')} · ${esc(tx(CLASS.term))}</p></div><span class="spacer"></span><span class="demo-note">${ic('zap', 'sm')}${_('Illustrative demo data', '演示用示例数据')}</span></div></div></section>
  <div class="wrap" style="padding:32px 24px 64px">
    <div class="stats">
      <div class="stat"><div class="v">480<span class="small muted"> / 500</span></div><div class="l">${_('Seats in use', '已用席位')}</div></div>
      <div class="stat"><div class="v">312</div><div class="l">${_('Weekly active learners', '周活跃学生')}</div><div class="d">▲ 2.3%</div></div>
      <div class="stat"><div class="v">47%</div><div class="l">${_('Avg. completion', '平均完课率')}</div></div>
      <div class="stat"><div class="v">1,204</div><div class="l">${_('Assignments graded', '已批改作业')}</div></div>
    </div>
    <div class="dgrid two" style="padding:0">
      <div class="box chart"><div class="box-h"><h3>${_('Weekly active learners', '每周活跃学生')}</h3><span class="tiny muted">${_('Last 12 weeks', '近 12 周')}</span></div>
        <svg viewBox="0 0 ${W} ${H}"><defs><linearGradient id="ga" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#5541DC" stop-opacity=".25"/><stop offset="1" stop-color="#5541DC" stop-opacity="0"/></linearGradient></defs>
          ${[0, 100, 200, 300].map(v => { const y = H - pad - v / max * (H - pad * 2); return `<line x1="${pad}" x2="${W - pad}" y1="${y}" y2="${y}" stroke="#E9E7F5"/><text x="${pad - 6}" y="${y + 4}" font-size="10" fill="#9895B5" text-anchor="end">${v}</text>`; }).join('')}
          <path d="${area}" fill="url(#ga)"/><path d="${line}" fill="none" stroke="#5541DC" stroke-width="2.5" stroke-linejoin="round"/>
          <circle cx="${pts[pts.length - 1][0]}" cy="${pts[pts.length - 1][1]}" r="5" fill="#5541DC" stroke="#fff" stroke-width="2"/>
          ${pts.map((p, i) => i % 2 === 0 ? `<text x="${p[0]}" y="${H - 8}" font-size="10" fill="#9895B5" text-anchor="middle">W${i + 1}</text>` : '').join('')}
        </svg></div>
      <div class="box"><div class="box-h"><h3>${_('Completion by course', '各课程完课率')}</h3></div><div class="bars">${comp.map(([id, v]) => `<div class="b"><span style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${esc(tx(COURSE(id).title))}</span><div class="pbar"><i style="width:${v}%"></i></div><span class="v">${v}%</span></div>`).join('')}</div></div>
    </div>
    <div class="box" style="margin-top:22px"><div class="box-h"><h3>${_('Faculties', '学院使用情况')}</h3><button class="btn ghost sm" data-act="exportfac">${ic('download', 'sm')}${_('Export CSV', '导出 CSV')}</button></div>
      <div class="tbl-wrap"><table class="tbl"><thead><tr><th>${_('Faculty', '学院')}</th><th class="num">${_('Students', '学生数')}</th><th>${_('Avg. completion', '平均完课率')}</th><th class="num">${_('Credits awarded', '已授学分')}</th></tr></thead><tbody>
      ${fac.map(([n, s, c]) => `<tr><td><b>${n}</b></td><td class="num">${s}</td><td><div class="row"><div class="pbar" style="width:160px"><i style="width:${c}%"></i></div><span class="small">${c}%</span></div></td><td class="num">${Math.round(s * c / 100 * 2.5)}</td></tr>`).join('')}
      </tbody></table></div></div>
    <div class="box"><div class="box-h"><h3>${_('License', '授权信息')}</h3></div><div class="list">
      <div class="li"><div class="li-ic">${ic('building')}</div><div class="t"><b>${_('Campus License · 500 seats', '校园授权 · 500 席位')}</b><span>${_('Renews', '续约')} 2027-08-31</span></div></div>
      <div class="li"><div class="li-ic mint">${ic('grad')}</div><div class="t"><b>${_('Credit mapping: 3 modules · 8 credits', '学分对接：3 个模块 · 8 学分')}</b><span><a class="link-arrow" href="#/universities">${_('View mapping', '查看对接表')}</a></span></div></div>
      <div class="li"><div class="li-ic warn">${ic('users')}</div><div class="t"><b>${_('Teachers: 12 · Classes: 18', '教师：12 · 班级：18')}</b><span>${_('Single sign-on via university accounts', '通过学校账号统一登录')}</span></div></div>
    </div></div>
  </div>`;
}

/* ---------- assignments ---------- */
function pAssignments() {
  if (S.user === 'teacher' || S.user === 'admin') {
    return `<section class="ph"><div class="wrap"><div class="dash-h"><div><h1>${_('Assignments', '作业管理')}</h1><p>${esc(tx(CLASS.name))} · ${CLASSMATES.length} ${_('students', '名学生')}</p></div><span class="spacer"></span>${S.user === 'teacher' ? `<button class="btn mint" data-act="newasg">${ic('plus')}${_('New assignment', '布置作业')}</button>` : ''}</div></div></section>
    <div class="wrap" style="padding:32px 24px 64px">${asgTable()}</div>`;
  }
  return `<section class="ph"><div class="wrap"><h1>${_('My assignments', '我的作业')}</h1><p>${esc(tx(CLASS.name))} · ${esc(tx(CLASS.term))}</p></div></section>
  <div class="wrap" style="padding:32px 24px 64px"><div class="tbl-wrap"><table class="tbl"><thead><tr><th>${_('Assignment', '作业')}</th><th>${_('Course', '课程')}</th><th>${_('Due', '截止')}</th><th>${_('Status', '状态')}</th><th class="num">${_('Score', '分数')}</th></tr></thead><tbody>
  ${[...S.assignments].sort((a, b) => new Date(a.due) - new Date(b.due)).map(a => { const [cls, lab] = asgStatus(a); const s = mySub(a.id); return `<tr class="click" data-act="go" data-href="#/assignment/${a.id}"><td><b>${esc(tx(a.title))}</b></td><td class="small muted">${esc(tx(COURSE(a.course).title))}</td><td>${fmtDate(a.due)} <span class="tiny muted">· ${rel(a.due)}</span></td><td><span class="badge ${cls}">${lab}</span></td><td class="num">${s && s.status === 'graded' ? `<span class="score-pill" style="font-size:15px">${s.score}</span>` : '—'}</td></tr>`; }).join('')}
  </tbody></table></div></div>`;
}
let pending = [];
function pAssignment(id) {
  const a = S.assignments.find(x => x.id === id); if (!a) return notFound();
  const c = COURSE(a.course);
  const head = `<section class="ph"><div class="wrap"><div class="crumbs"><a href="#/assignments">${_('Assignments', '作业')}</a> / ${esc(tx(c.title))}</div><h1>${esc(tx(a.title))}</h1><div class="cd-stats" style="margin-top:14px"><span>${ic('cal')}${_('Due', '截止')} ${fmtDate(a.due, true)} · ${rel(a.due)}</span><span>${ic('star')}${a.points} ${_('points', '分')}</span><span>${ic('book')}<a href="#/course/${c.id}" style="text-decoration:underline">${esc(tx(c.title))}</a></span></div></div></section>`;
  const brief = `<div class="box"><h3>${_('Brief', '作业要求')}</h3><p style="margin:0 0 16px;font-size:15.5px">${esc(tx(a.brief))}</p><div class="callout brand small">${ic('zap')}<div>${_('Include a short AI-use statement: which tools you used, for which parts, and what you made yourself.', '请附上一段简短的 AI 使用说明：用了哪些工具、用在哪些部分、哪些是你自己完成的。')}</div></div></div>`;
  const rubric = `<div class="box"><h3>${_('Rubric', '评分标准')}</h3><div class="rub">${RUBRIC.map(r => `<div class="r"><span>${tx(r)}</span><b>${r.w}%</b></div>`).join('')}</div><a class="link-arrow small" style="margin-top:14px" href="#/article/grading-ai-work">${_('About this rubric', '关于这套评分标准')} ${ic('arrow', 'sm')}</a></div>`;
  if (S.user === 'teacher' || S.user === 'admin') {
    const subs = S.subs.filter(s => s.aid === a.id);
    const rows = CLASSMATES.map(([uid, name]) => { const s = subs.find(x => x.uid === uid); return { uid, name, s }; });
    return head + `<div class="wrap"><div class="asg-grid"><div>
      <div class="stats three"><div class="stat"><div class="v">${subs.length}<span class="small muted">/${CLASSMATES.length}</span></div><div class="l">${_('Submitted', '已提交')}</div></div><div class="stat"><div class="v">${subs.filter(s => s.status === 'graded').length}</div><div class="l">${_('Graded', '已评分')}</div></div><div class="stat"><div class="v">${subs.filter(s => s.status === 'graded').length ? Math.round(subs.filter(s => s.status === 'graded').reduce((x, s) => x + s.score, 0) / subs.filter(s => s.status === 'graded').length) : '—'}</div><div class="l">${_('Average', '平均分')}</div></div></div>
      <div class="tbl-wrap"><table class="tbl"><thead><tr><th>${_('Student', '学生')}</th><th>${_('Status', '状态')}</th><th>${_('Submitted', '提交时间')}</th><th class="num">${_('Score', '分数')}</th><th></th></tr></thead><tbody>
      ${rows.map(({ name, s }) => `<tr ${s ? `class="click" data-act="grade" data-id="${s.id}"` : ''}><td><div class="row" style="gap:10px"><span class="avatar sm">${esc(initials(name))}</span><b>${esc(name)}</b></div></td><td>${s ? (s.status === 'graded' ? `<span class="badge ok">${_('Graded', '已评分')}</span>` : `<span class="badge campus">${_('Needs grading', '待批改')}</span>`) + (s.late ? ` <span class="badge danger">${_('Late', '迟交')}</span>` : '') : (new Date(a.due) < Date.now() ? `<span class="badge danger">${_('Missing', '未提交')}</span>` : `<span class="badge grey">${_('Not yet', '未提交')}</span>`)}</td><td class="small muted">${s ? fmtDate(s.at, true) : '—'}</td><td class="num">${s && s.status === 'graded' ? `<b>${s.score}</b>` : '—'}</td><td>${s ? `<button class="btn ${s.status === 'graded' ? 'ghost' : 'primary'} sm">${s.status === 'graded' ? _('Review', '查看') : _('Grade', '批改')}</button>` : ''}</td></tr>`).join('')}
      </tbody></table></div></div>
      <div>${brief}${rubric}</div></div></div>`;
  }
  // student view
  const s = mySub(a.id);
  let main;
  if (s && s.status === 'graded') {
    main = `<div class="feedback"><div class="box-h"><h3>${_('Your grade', '你的成绩')}</h3><span class="score-pill" style="font-size:34px">${s.score}<small> / ${a.points}</small></span></div>
      <div class="rub" style="margin-bottom:18px">${RUBRIC.map(r => `<div class="r"><span>${tx(r)} <span class="tiny muted">(${r.w}%)</span></span><b>${s.rub[r.k]}</b><div class="pbar"><i style="width:${s.rub[r.k]}%"></i></div></div>`).join('')}</div>
      <div class="row" style="align-items:flex-start"><span class="avatar sm">LW</span><div><b class="small">Dr. Lim Wei Ming</b> <span class="tiny muted">${rel(s.gradedAt)}</span><p style="margin:4px 0 0">${esc(tx(s.feedback))}</p></div></div></div>
      <div class="box" style="margin-top:22px"><h3>${_('Your submission', '你的提交')}</h3>${subView(s)}</div>`;
  } else if (s) {
    main = `<div class="box"><div class="box-h"><h3>${_('Submitted', '已提交')} ✓</h3><span class="badge campus">${_('Waiting for grading', '等待老师批改')}</span></div><p class="small muted" style="margin:0 0 14px">${_('Submitted', '提交于')} ${fmtDate(s.at, true)}. ${_('You can edit your submission until it is graded.', '在老师批改之前，你都可以修改提交。')}</p>${subView(s)}<button class="btn ghost sm" style="margin-top:16px" data-act="resubmit" data-id="${a.id}">${ic('pen', 'sm')}${_('Edit submission', '修改提交')}</button></div>`;
  } else {
    main = submitForm(a);
  }
  return head + `<div class="wrap"><div class="asg-grid"><div>${S.user !== 'student' ? `<div class="callout warn" style="margin-bottom:20px">${ic('lock')}<div>${_('Sign in as a student to submit work.', '以学生身份登录后才能提交作业。')} <a href="#/login" style="text-decoration:underline">${_('Sign in', '登录')}</a></div></div>` : ''}${main}</div><div>${brief}${rubric}</div></div></div>`;
}
function submitForm(a, prev) {
  pending = prev ? [...(prev.files || [])] : [];
  return `<form class="box" data-form="submit" data-id="${a.id}"><h3>${_('Submit your work', '提交作业')}</h3>
    <div class="fgroup"><label class="f">${_('Reflection & AI-use statement', '创作说明与 AI 使用声明')}</label><textarea class="input" name="text" required placeholder="${_('Describe your idea, process and which AI tools you used…', '描述你的想法、过程，以及使用了哪些 AI 工具…')}">${esc(prev ? prev.text : '')}</textarea></div>
    <div class="fgroup"><label class="f">${_('Link (video, portfolio, drive)', '链接（视频、作品集、网盘）')}</label><input class="input full" name="link" type="url" value="${esc(prev ? prev.link : '')}" placeholder="https://"></div>
    <div class="fgroup"><label class="f">${_('Files', '文件')}</label><label class="drop" id="drop">${ic('upload')}<b>${_('Click or drop files here', '点击或拖拽文件到这里')}</b><div class="tiny muted">${_('Images, PDF, video, ZIP · images are previewed', '图片、PDF、视频、ZIP · 图片可预览')}</div><input type="file" id="fileIn" multiple hidden></label><div class="files" id="files">${filesHTML()}</div></div>
    <div class="row"><button class="btn primary" type="submit" ${S.user !== 'student' ? 'disabled' : ''}>${ic('send', 'sm')}${_('Submit assignment', '提交作业')}</button><span class="tiny muted">${_('Due', '截止')} ${fmtDate(a.due, true)}</span></div>
  </form>`;
}
function filesHTML() {
  return pending.map((f, i) => `<div class="file">${f.data ? `<img src="${f.data}" alt="">` : `<div class="fi">${ic('file')}</div>`}<div style="flex:1;min-width:0"><b style="display:block;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${esc(f.name)}</b><span class="tiny muted">${(f.size / 1e6).toFixed(1)} MB</span></div><button type="button" class="x" data-act="rmfile" data-i="${i}">${ic('x', 'sm')}</button></div>`).join('');
}
function subView(s) {
  const imgs = (s.files || []).filter(f => f.data);
  return `<p style="margin:0 0 12px;white-space:pre-wrap">${esc(s.text)}</p>
    ${s.link ? `<a class="link-arrow small" href="${esc(s.link)}" target="_blank" rel="noopener">${ic('link', 'sm')}${esc(s.link)}</a>` : ''}
    ${imgs.length ? `<div class="sub-imgs">${imgs.map(f => `<img src="${f.data}" alt="${esc(f.name)}">`).join('')}</div>` : ''}
    <div class="files">${(s.files || []).filter(f => !f.data).map(f => `<div class="file"><div class="fi">${ic('file')}</div><div style="flex:1"><b>${esc(f.name)}</b><div class="tiny muted">${(f.size / 1e6).toFixed(1)} MB</div></div></div>`).join('')}</div>`;
}
function gradeDrawer(sid) {
  const s = S.subs.find(x => x.id === sid); if (!s) return;
  const a = S.assignments.find(x => x.id === s.aid);
  const rub = s.rub || { concept: 80, exec: 80, vibe: 80, process: 80 };
  const quick = [_('Strong concept', '概念很强'), _('Push the lighting further', '光线可以更大胆'), _('Keep characters consistent', '注意角色一致性'), _('Great process log', '过程记录很棒'), _('Add your AI-use statement', '请补充 AI 使用说明'), _('Take a bolder creative risk', '可以更大胆地尝试')];
  openDrawer(`<div class="dh"><span class="avatar">${esc(initials(s.name))}</span><div style="flex:1"><b>${esc(s.name)}</b><div class="tiny muted">${esc(tx(a.title))} · ${_('submitted', '提交于')} ${fmtDate(s.at, true)}${s.late ? ' · ' + _('late', '迟交') : ''}</div></div><button class="x" data-act="close">${ic('x')}</button></div>
    <div class="db"><div class="box">${subView(s)}</div>
      <div class="box"><div class="box-h"><h3>${_('Rubric', '评分')}</h3><span class="score-pill" id="gtotal" style="font-size:28px">${weighted(rub)}<small>/100</small></span></div>
        <div class="rub">${RUBRIC.map(r => `<div class="r"><span>${tx(r)} <span class="tiny muted">(${r.w}%)</span></span><b id="gv-${r.k}">${rub[r.k]}</b><input type="range" min="0" max="100" value="${rub[r.k]}" data-rk="${r.k}"></div>`).join('')}</div></div>
      <div class="box"><h3>${_('Feedback', '评语')}</h3><textarea class="input" id="gfb" placeholder="${_('Write feedback for the student…', '写给学生的评语…')}">${esc(s.feedback ? tx(s.feedback) : '')}</textarea><div class="quick">${quick.map(q => `<button type="button" data-act="quick" data-v="${esc(q)}">+ ${esc(q)}</button>`).join('')}</div></div>
    </div>
    <div class="df"><span class="tiny muted" style="margin-right:auto">${s.status === 'graded' ? _('Already graded — saving will update it.', '已评分——保存将更新成绩。') : ''}</span><button class="btn ghost" data-act="close">${_('Cancel', '取消')}</button><button class="btn primary" data-act="savegrade" data-id="${s.id}">${ic('send', 'sm')}${_('Return to student', '发还给学生')}</button></div>`);
}

/* ---------- class / gradebook ---------- */
function pClass() {
  const asgs = [...S.assignments].sort((a, b) => new Date(a.due) - new Date(b.due));
  return `<section class="ph"><div class="wrap"><div class="dash-h"><div><h1>${esc(tx(CLASS.name))}</h1><p>${esc(tx(CLASS.faculty))} · ${esc(CLASS.uni)} · ${CLASS.credits} ${_('credits', '学分')} · ${esc(tx(CLASS.term))}</p></div><span class="spacer"></span><button class="btn ghost-dark" data-act="exportgb">${ic('download')}${_('Export gradebook', '导出成绩册')}</button></div></div></section>
  <div class="wrap" style="padding:32px 24px 64px">
    <div class="box-h"><h3>${_('Gradebook', '成绩册')}</h3><span class="small muted">${_('Click a score to open the submission', '点击分数查看提交')}</span></div>
    <div class="tbl-wrap"><table class="tbl"><thead><tr><th>${_('Student', '学生')}</th><th>${_('Progress', '学习进度')}</th>${asgs.map(a => `<th class="num" title="${esc(tx(a.title))}">${esc(tx(a.title)).split(/[:：]/)[0].slice(0, 16)}</th>`).join('')}<th class="num">${_('Average', '平均')}</th></tr></thead><tbody>
    ${CLASSMATES.map(([uid, name]) => { const sc = asgs.map(a => S.subs.find(s => s.aid === a.id && s.uid === uid)); const g = sc.filter(s => s && s.status === 'graded'); const prog = uid === 'u-aisha' ? Math.round(S.enrolled.map(COURSE).reduce((s, c) => s + pct(c), 0) / S.enrolled.length) : S.classProgress[uid]; return `<tr><td><div class="row" style="gap:10px"><span class="avatar sm">${esc(initials(name))}</span><b>${esc(name)}</b></div></td><td><div class="row" style="gap:8px"><div class="pbar" style="width:90px"><i style="width:${prog}%"></i></div><span class="tiny muted">${prog}%</span></div></td>${sc.map((s, i) => `<td class="num">${s ? (s.status === 'graded' ? `<button class="score-pill" style="font-size:15px" data-act="grade" data-id="${s.id}">${s.score}</button>` : `<button class="badge campus" data-act="grade" data-id="${s.id}">${_('grade', '待批')}</button>`) : (new Date(asgs[i].due) < Date.now() ? `<span class="badge danger">${_('missing', '缺交')}</span>` : '<span class="muted">·</span>')}</td>`).join('')}<td class="num"><b>${g.length ? Math.round(g.reduce((x, s) => x + s.score, 0) / g.length) : '—'}</b></td></tr>`; }).join('')}
    </tbody></table></div>
  </div>`;
}

function notFound() { return `<div class="wrap" style="padding:120px 24px;text-align:center"><h1>404</h1><p class="muted">${_('Page not found.', '页面不存在。')}</p><a class="btn primary" href="#/">${_('Back home', '返回首页')}</a></div>`; }

/* ================= router ================= */
const curPath = () => (location.hash.slice(2).split('?')[0].split('/')[0] || '');
function render(keepScroll) {
  const h = location.hash.slice(1) || '/';
  const [path, qs] = h.split('?');
  const parts = path.split('/').filter(Boolean);
  const q = new URLSearchParams(qs || '');
  const p0 = parts[0] || '';
  const needAuth = ['dashboard', 'assignments', 'assignment', 'class'];
  if (needAuth.includes(p0) && !S.user) { S.after = location.hash; save(); location.hash = '#/login'; return; }
  if (p0 === 'class' && S.user !== 'teacher' && S.user !== 'admin') { location.hash = '#/dashboard'; return; }
  document.documentElement.lang = S.lang === 'zh' ? 'zh-CN' : 'en';
  header(p0); footer(); banner();
  const pages = {
    '': pHome, courses: () => pCourses(q), course: () => pCourse(parts[1]), learn: () => pLearn(parts[1], parts[2]),
    lectures: pLectures, lecture: () => pLecture(parts[1]), articles: pArticles, article: () => pArticle(parts[1]),
    tools: pTools, showcase: pShowcase, universities: pUniversities, about: pAbout, login: pLogin,
    dashboard: pDashboard, assignments: pAssignments, assignment: () => pAssignment(parts[1]), class: pClass
  };
  const y = window.scrollY;
  $('#app').innerHTML = (pages[p0] || notFound)();
  $('#ftr').style.display = p0 === 'login' ? 'none' : '';
  if (p0 === 'courses') { courseGrid(); bindFilters(); }
  if (p0 === 'assignment') bindUpload();
  document.title = 'NexVibes · ' + (p0 ? (($('#app h1') || $('#app h2')) ? ($('#app h1') || $('#app h2')).textContent.trim().slice(0, 60) : 'NexVibes') : _('AI Creative Education', 'AI 创意教育'));
  window.scrollTo(0, keepScroll ? y : 0);
}
function bindFilters() {
  const fq = $('#fq');
  fq.addEventListener('input', () => { F.q = fq.value; courseGrid(); });
  [['#flevel', 'level'], ['#faccess', 'access'], ['#fkind', 'kind']].forEach(([s, k]) => $(s).addEventListener('change', e => { F[k] = e.target.value; courseGrid(); }));
}
function bindUpload() {
  const inp = $('#fileIn'), drop = $('#drop');
  if (!inp) return;
  const add = files => {
    [...files].forEach(f => {
      const item = { name: f.name, size: f.size, type: f.type };
      if (f.type.startsWith('image/') && f.size < 4e6) {
        const r = new FileReader();
        r.onload = () => { shrink(r.result, d => { item.data = d; pending.push(item); $('#files').innerHTML = filesHTML(); }); };
        r.readAsDataURL(f);
      } else { pending.push(item); $('#files').innerHTML = filesHTML(); }
    });
  };
  inp.addEventListener('change', () => add(inp.files));
  drop.addEventListener('dragover', e => { e.preventDefault(); drop.classList.add('over'); });
  drop.addEventListener('dragleave', () => drop.classList.remove('over'));
  drop.addEventListener('drop', e => { e.preventDefault(); drop.classList.remove('over'); add(e.dataTransfer.files); });
}
function shrink(dataURL, cb) {
  const img = new Image();
  img.onload = () => { const k = Math.min(1, 900 / Math.max(img.width, img.height)); const cv = document.createElement('canvas'); cv.width = img.width * k; cv.height = img.height * k; cv.getContext('2d').drawImage(img, 0, 0, cv.width, cv.height); cb(cv.toDataURL('image/jpeg', .8)); };
  img.onerror = () => cb(null);
  img.src = dataURL;
}
function downloadCSV(name, rows) {
  const csv = '﻿' + rows.map(r => r.map(v => `"${String(v).replace(/"/g, '""')}"`).join(',')).join('\n');
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv' }));
  a.download = name; a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 1000);
}

/* ================= actions ================= */
const ACT = {
  lang: el => { S.lang = el.dataset.v; save(); render(true); },
  go: el => { location.hash = el.dataset.href; },
  burger: () => $('#nav').classList.toggle('open'),
  umenu: (el, e) => { if (e.target.closest('.menu')) return; $('#umenu').classList.toggle('open'); },
  login: el => {
    S.user = el.dataset.role; save(); closeAll();
    const after = S.after; S.after = null; save();
    toast(_({ student: 'Signed in as student', teacher: 'Signed in as teacher', admin: 'Signed in as admin' }[S.user], { student: '已以学生身份登录', teacher: '已以教师身份登录', admin: '已以管理员身份登录' }[S.user]));
    if (after && location.hash !== after) location.hash = after;
    else if (curPath() === 'login' || curPath() === 'universities' || curPath() === 'class') location.hash = '#/dashboard';
    else render(true);
  },
  logout: () => { S.user = null; save(); location.hash = '#/'; render(); },
  reset: () => { const lang = S.lang, user = S.user; S = seed(); S.lang = lang; S.user = user; save(); toast(_('Demo data reset', '演示数据已重置')); render(true); },
  sso: () => toast(_('SSO will connect to each university’s identity system.', '正式版将对接各大学的统一身份认证。')),
  play: el => {
    const p = el.closest('.player');
    p.innerHTML = `<iframe src="${embedURL(el.dataset.t, el.dataset.id)}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen" allowfullscreen referrerpolicy="strict-origin-when-cross-origin" title="video"></iframe>`;
  },
  altsrc: el => { const p = $('#player-' + el.dataset.key); if (p) { p.innerHTML = `<iframe src="${embedURL(el.dataset.t, el.dataset.id)}" allow="autoplay; encrypted-media; fullscreen; picture-in-picture" allowfullscreen referrerpolicy="strict-origin-when-cross-origin"></iframe>`; p.scrollIntoView({ behavior: 'smooth', block: 'center' }); } },
  tab: el => { $$('.tabs button').forEach(b => b.classList.toggle('on', b === el)); $$('[data-panel]').forEach(p => p.classList.toggle('hidden', p.dataset.panel !== el.dataset.v)); },
  complete: el => {
    const { c, l } = el.dataset; const arr = S.progress[c] = S.progress[c] || [];
    const i = arr.indexOf(l);
    if (i >= 0) arr.splice(i, 1); else { arr.push(l); toast(_('Lesson completed', '本课已完成')); }
    save();
    const crs = COURSE(c);
    if (pct(crs) === 100 && i < 0) setTimeout(() => ACT.cert({ dataset: { id: c } }), 500);
    render(true);
  },
  enroll: el => {
    if (S.user !== 'student') { S.after = location.hash; save(); location.hash = '#/login'; toast(_('Sign in as a student to enroll', '请以学生身份登录后加入课程')); return; }
    const c = COURSE(el.dataset.id);
    if (!S.enrolled.includes(c.id)) S.enrolled.push(c.id);
    save(); toast(c.access === 'premium' ? _('Premium unlocked (demo)', '已开通付费课程（演示）') : _('Enrolled!', '已加入课程！')); render(true);
  },
  notify: () => toast(_('We’ll let you know when it launches.', '上线时我们会通知你。')),
  comment: el => {
    const inp = $('#cmt'); const v = inp.value.trim(); if (!v) return;
    const u = me(); (S.comments[el.dataset.k] = S.comments[el.dataset.k] || []).push({ n: u.name, teacher: S.user === 'teacher', at: iso(Date.now()), text: v });
    save(); render(true); ACT.tab($('[data-act="tab"][data-v="disc"]'));
  },
  override: el => {
    const v = parseVideo($('#ovr').value);
    if (!v) { toast(_('Please paste a valid YouTube or Bilibili link', '请粘贴有效的 YouTube 或 B 站链接')); return; }
    S.overrides[`${el.dataset.c}/${el.dataset.l}`] = v; save(); toast(_('Video added to this lesson', '视频已添加到本课')); render(true);
  },
  clearovr: el => { delete S.overrides[`${el.dataset.c}/${el.dataset.l}`]; save(); render(true); },
  cert: el => {
    const c = COURSE(el.dataset.id); const u = DEMO_USERS.student;
    openModal(modalHead(_('Certificate of completion', '结业证书')) + `<div class="mb"><div class="cert"><img src="assets/logo.png" alt="NexVibes"><div class="k">${_('Certificate of completion', '结业证书')}</div><h2>${esc(u.name)}</h2><div class="muted small">${_('has successfully completed', '已顺利完成')}</div><div class="c" style="margin-top:8px">${esc(tx(c.title))}</div><div class="small muted" style="margin-top:6px">${c.credits} ${_('credits', '学分')} · ${c.hours} ${_('hours', '小时')} · ${esc(u.uni)}</div>
      <div class="foot"><div><b>${fmtDate(Date.now())}</b>${_('Date', '日期')}</div><div style="text-align:right"><b>NV-${c.id.toUpperCase().slice(0, 4)}-${(Math.abs(hash(u.id + c.id)) % 1e6).toString().padStart(6, '0')}</b>${_('Certificate ID', '证书编号')}</div></div></div>
      <div class="row" style="margin-top:16px;justify-content:flex-end"><button class="btn ghost sm" data-act="close">${_('Close', '关闭')}</button><button class="btn primary sm" data-act="printcert">${ic('download', 'sm')}${_('Print / save PDF', '打印 / 存为 PDF')}</button></div></div>`, true);
  },
  printcert: () => window.print(),
  close: () => closeAll(),
  fcat: el => { F.cat = el.dataset.v; $$('[data-act="fcat"]').forEach(b => b.classList.toggle('on', b === el)); courseGrid(); },
  track: el => { F.track = F.track === el.dataset.v ? null : el.dataset.v; F.cat = 'all'; render(true); },
  scroll: (el, e) => { e.preventDefault(); const t = document.getElementById(el.dataset.to); if (t) t.scrollIntoView({ behavior: 'smooth' }); },
  rmfile: el => { pending.splice(+el.dataset.i, 1); $('#files').innerHTML = filesHTML(); },
  resubmit: el => {
    const a = S.assignments.find(x => x.id === el.dataset.id); const s = mySub(a.id);
    const box = el.closest('.box'); box.outerHTML = submitForm(a, s); bindUpload();
  },
  grade: el => gradeDrawer(el.dataset.id),
  quick: el => { const t = $('#gfb'); t.value = (t.value ? t.value.trimEnd() + ' ' : '') + el.dataset.v + '.'; t.focus(); },
  savegrade: el => {
    const s = S.subs.find(x => x.id === el.dataset.id);
    const rub = {}; $$('[data-rk]').forEach(r => { rub[r.dataset.rk] = +r.value; });
    s.rub = rub; s.score = weighted(rub); s.feedback = $('#gfb').value.trim() || _('Well done.', '做得好。'); s.status = 'graded'; s.gradedAt = iso(Date.now());
    save(); closeAll(); toast(_(`Grade returned to ${s.name}: ${s.score}/100`, `已发还给 ${s.name}：${s.score}/100`)); render(true);
  },
  newasg: () => {
    const d = new Date(Date.now() + 14 * DAY).toISOString().slice(0, 10);
    openModal(modalHead(_('New assignment', '布置新作业'), esc(tx(CLASS.name))) + `<form class="mb" data-form="newasg">
      <div class="fgroup"><label class="f">${_('Title', '标题')}</label><input class="input full" name="title" required placeholder="${_('e.g. A 30-second AI music video', '例如：一支 30 秒的 AI MV')}"></div>
      <div class="fgrid"><div class="fgroup"><label class="f">${_('Course', '所属课程')}</label><select class="input full" name="course">${COURSES.filter(c => !c.comingSoon).map(c => `<option value="${c.id}">${esc(tx(c.title))}</option>`).join('')}</select></div>
      <div class="fgroup"><label class="f">${_('Due date', '截止日期')}</label><input class="input full" type="date" name="due" value="${d}" required></div></div>
      <div class="fgroup"><label class="f">${_('Instructions', '作业要求')}</label><textarea class="input" name="brief" required placeholder="${_('What should students make and submit?', '学生需要做什么、提交什么？')}"></textarea></div>
      <div class="fgrid"><div class="fgroup"><label class="f">${_('Points', '总分')}</label><input class="input full" type="number" name="points" value="100" min="1"></div>
      <div class="fgroup"><label class="f">${_('Grading', '评分方式')}</label><select class="input full" name="rubric"><option value="1">${_('NexVibes rubric (4 criteria)', 'NexVibes 评分标准（4 项）')}</option><option value="0">${_('Single score', '单一分数')}</option></select></div></div>
      <div class="row" style="justify-content:flex-end"><button type="button" class="btn ghost" data-act="close">${_('Cancel', '取消')}</button><button class="btn primary" type="submit">${ic('send', 'sm')}${_('Publish to class', '发布给全班')}</button></div></form>`);
  },
  newsession: () => {
    const d = new Date(Date.now() + 3 * DAY); d.setHours(19, 0, 0, 0);
    const local = new Date(d - d.getTimezoneOffset() * 6e4).toISOString().slice(0, 16);
    openModal(modalHead(_('Schedule a live session', '安排直播课'), _('Students will see it on their dashboard with a Join button.', '学生会在主页看到它，并可一键加入。')) + `<form class="mb" data-form="session">
      <div class="fgroup"><label class="f">${_('Title', '标题')}</label><input class="input full" name="title" required placeholder="${_('e.g. Live critique: storyboards', '例如：直播点评——分镜')}"></div>
      <div class="fgrid"><div class="fgroup"><label class="f">${_('Date & time', '日期与时间')}</label><input class="input full" type="datetime-local" name="at" value="${local}" required></div>
      <div class="fgroup"><label class="f">${_('Platform', '平台')}</label><select class="input full" name="platform"><option>Zoom</option><option value="Tencent Meeting">${_('Tencent Meeting', '腾讯会议')}</option><option>Google Meet</option><option>Microsoft Teams</option></select></div></div>
      <div class="fgroup"><label class="f">${_('Meeting link', '会议链接')}</label><input class="input full" type="url" name="url" required placeholder="https://zoom.us/j/…"></div>
      <div class="row" style="justify-content:flex-end"><button type="button" class="btn ghost" data-act="close">${_('Cancel', '取消')}</button><button class="btn primary" type="submit">${_('Schedule', '确认排期')}</button></div></form>`);
  },
  announce: () => {
    const v = $('#annText').value.trim(); if (!v) return;
    S.announcements.unshift({ id: 'n' + Date.now(), at: iso(Date.now()), text: v }); save(); toast(_('Announcement posted', '公告已发布')); render(true);
  },
  exportgb: () => {
    const asgs = [...S.assignments].sort((a, b) => new Date(a.due) - new Date(b.due));
    downloadCSV('AIGC-Studio-101-gradebook.csv', [['Student', ...asgs.map(a => tx(a.title))], ...CLASSMATES.map(([uid, n]) => [n, ...asgs.map(a => { const s = S.subs.find(x => x.aid === a.id && x.uid === uid); return s ? (s.status === 'graded' ? s.score : 'submitted') : ''; })])]);
  },
  exportfac: () => downloadCSV('faculty-usage.csv', [['Faculty', 'Students', 'Completion %'], ['Cinematic Arts', 186, 64], ['Creative Multimedia', 142, 58], ['Applied Communication', 98, 41], ['Management', 54, 22]])
};
function hash(s) { let h = 0; for (const ch of s) h = (h * 31 + ch.charCodeAt(0)) | 0; return h; }

document.addEventListener('click', e => {
  const el = e.target.closest('[data-act]');
  if (!el) {
    const m = $('#umenu'); if (m && !e.target.closest('.user-btn')) m.classList.remove('open');
    if (!e.target.closest('.nav') && !e.target.closest('.burger')) { const n = $('#nav'); if (n) n.classList.remove('open'); }
    return;
  }
  const fn = ACT[el.dataset.act];
  if (fn) { if (el.tagName === 'BUTTON' && el.type !== 'submit') e.preventDefault(); fn(el, e); }
});
document.addEventListener('input', e => {
  if (e.target.dataset.rk) {
    $('#gv-' + e.target.dataset.rk).textContent = e.target.value;
    const rub = {}; $$('[data-rk]').forEach(r => { rub[r.dataset.rk] = +r.value; });
    $('#gtotal').innerHTML = weighted(rub) + '<small>/100</small>';
  }
});
document.addEventListener('submit', e => {
  const f = e.target.closest('form[data-form]'); if (!f) return;
  e.preventDefault();
  const fd = Object.fromEntries(new FormData(f));
  const kind = f.dataset.form;
  if (kind === 'contact') { f.reset(); toast(_('Thanks! (Demo — nothing was sent.)', '谢谢！（演示——未真正发送）')); }
  if (kind === 'submit') {
    const a = S.assignments.find(x => x.id === f.dataset.id); const u = DEMO_USERS.student;
    const old = mySub(a.id);
    const sub = { id: 's-' + a.id + '-' + u.id, aid: a.id, uid: u.id, name: u.name, at: iso(Date.now()), text: fd.text, link: fd.link, files: pending.slice(), status: 'submitted', late: new Date(a.due) < Date.now() };
    if (old) Object.assign(old, sub); else S.subs.push(sub);
    pending = []; save(); toast(_('Assignment submitted!', '作业已提交！')); render();
  }
  if (kind === 'newasg') {
    S.assignments.push({ id: 'a' + Date.now(), course: fd.course, title: fd.title, brief: fd.brief, due: iso(new Date(fd.due + 'T23:59')), points: +fd.points || 100, rubric: fd.rubric === '1', created: iso(Date.now()) });
    save(); closeAll(); toast(_('Assignment published to the class', '作业已发布给全班')); render(true);
  }
  if (kind === 'session') {
    S.sessions.push({ id: 'ls' + Date.now(), title: fd.title, at: iso(new Date(fd.at)), platform: fd.platform, url: fd.url });
    save(); closeAll(); toast(_('Live session scheduled', '直播课已排期')); render(true);
  }
});
$('#scrim').addEventListener('click', closeAll);
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeAll(); });
window.addEventListener('hashchange', () => { closeAll(); render(); });
render();
})();
