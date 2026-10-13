const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];
const S = { pts: 1240 };

/* ---------- Données de démo ---------- */
const FEED = [
  ['🧘', 'Yoga sur le toit', 'Mardi · 18h'],
  ['🧒', 'Animation enfants du mercredi', 'Mercredi · 15h'],
  ['🩺', 'Créneau santé / ostéo', 'Jeudi · 10h'],
  ['🏃', 'Course entre voisins', 'Samedi · 9h']
];
const MODES = {
  Coworking: ['💻', 'Libre jusqu\'à 14h – prise et wifi disponibles'],
  Yoga: ['🧘', 'Cours en cours – 4 places restantes'],
  Musculation: ['🏋️', 'Libre – 2 personnes sur les machines']
};
const DISC = ['Tout', 'Bâtiment', 'Marche', 'Yoga/Pilates', 'Renforcement', 'Course'];
const PROGS = [
  ['🏢', 'Salle modulable : circuit 20 min', 'Bâtiment', 'Débutant · 20 min', 40],
  ['🌳', 'Parcours santé extérieur', 'Bâtiment', 'Tous niveaux · 30 min', 50],
  ['🪜', 'Escaliers : montée express', 'Bâtiment', 'Intermédiaire · 10 min', 30],
  ['🎗️', 'Élastiques ancrés chez soi', 'Bâtiment', 'Débutant · 15 min', 30],
  ['🚶', 'Marche active du soir', 'Marche', 'Tous niveaux · 40 min', 40],
  ['🧘', 'Yoga doux du réveil', 'Yoga/Pilates', 'Débutant · 25 min', 35],
  ['🤸', 'Pilates gainage', 'Yoga/Pilates', 'Intermédiaire · 30 min', 45],
  ['💪', 'Renfo corps entier', 'Renforcement', 'Intermédiaire · 35 min', 50],
  ['👟', 'Fractionné autour du quartier', 'Course', 'Avancé · 30 min', 60]
];
const CHALL = [
  ['100 000 marches dans les escaliers', 'Collectif', 63400, 100000, 'marches'],
  ['Défi du mois : 500 séances à la résidence', 'Collectif', 340, 500, 'séances'],
  ['5 séances cette semaine', 'Individuel', 3, 5, 'séances'],
  ['30 jours de yoga', 'Individuel', 12, 30, 'jours']
];
const GROUPS = [
  ['Yoga du matin', 'Camille + 4 voisins', 'Mar · 7h30', false],
  ['Course douce du dimanche', 'Marc + 6 voisins', 'Dim · 9h', false],
  ['Renfo entre voisines', 'Inès + 3 voisines', 'Jeu · 19h', true],
  ['Pilates 100 % voisines', 'Sana + 5 voisines', 'Sam · 10h', true],
  ['Match de badminton', 'Paul + 2 voisins', 'Ven · 18h', false]
];
const MSGS = [
  ['Inès', 'Quelqu\'un a un tapis de yoga à prêter ce week-end ?'],
  ['Marc', 'Oui, il y en a dans le kit d\'accueil ! Je te le monte 🙌'],
  ['Sana', 'Astuce : 5 min d\'étirements après les escaliers, ça change tout.']
];
const REWARDS = [
  ['🛒', '-10 % sur l\'équipement sport', 'Intersport', 300],
  ['🧒', '-15 % accessoires enfants', 'Intersport', 450],
  ['🚲', 'Révision vélo à -20 %', 'Atelier Intersport', 600],
  ['🎽', 'Bon d\'achat de 10 €', 'Intersport', 1000],
  ['👟', '-25 € sur des chaussures de running', 'Intersport', 2500]
];
const PROS = [
  ['Dr Léa Martin', 'Kinésithérapeute', ['Lun 9h', 'Lun 14h', 'Mer 11h']],
  ['Hugo Bernard', 'Ostéopathe', ['Mar 10h', 'Jeu 10h', 'Jeu 15h']],
  ['Sana Idrissi', 'Nutritionniste · atelier le vendredi', ['Ven 12h', 'Ven 17h']]
];
const DAY = [
  ['7h – 9h', 'Yoga', '#C8F23A'], ['9h – 12h', 'Coworking', '#BFD0FF'],
  ['12h – 14h', 'Activités enfants', '#FFC62E'], ['14h – 17h', 'Coworking', '#BFD0FF'],
  ['17h – 19h', 'Musculation', '#FF9D85'], ['19h – 21h', 'Yoga', '#C8F23A']
];

/* ---------- Outils ---------- */
let tt;
function toast(msg) {
  const t = $('#toast');
  t.textContent = msg; t.classList.add('show');
  clearTimeout(tt); tt = setTimeout(() => t.classList.remove('show'), 2600);
}
function count(el, to, ms = 1100) {
  const from = parseInt(el.textContent.replace(/\s/g, '')) || 0, t0 = performance.now();
  (function f(t) {
    const p = Math.min((t - t0) / ms, 1), e = 1 - Math.pow(1 - p, 3);
    el.textContent = Math.round(from + (to - from) * e).toLocaleString('fr-FR');
    if (p < 1) requestAnimationFrame(f);
  })(t0);
}
function setPts(n) { S.pts = n; $$('.ptsval').forEach(e => count(e, n, 800)); }
const li = (ic, t, s, extra = '') =>
  `<li><span class="ic">${ic}</span><div><b>${t}</b><small>${s}</small></div>${extra}</li>`;

/* ---------- Navigation ---------- */
function go(id) {
  $$('.view').forEach(v => v.classList.toggle('on', v.id === id));
  $$('.nav button').forEach(b => b.classList.toggle('on', b.dataset.go === id));
  window.scrollTo({ top: 0, behavior: 'smooth' });
  if (id === 'defis') animateMeters();
}
document.addEventListener('click', e => {
  const b = e.target.closest('[data-go]');
  if (b) go(b.dataset.go);
});

/* ---------- Accueil ---------- */
$('#feed').innerHTML = FEED.map(f => li(...f)).join('');
function setMode(m) {
  $('#modes').innerHTML = Object.keys(MODES).map(k =>
    `<button class="${k === m ? 'on' : ''}" data-m="${k}">${MODES[k][0]} ${k}</button>`).join('');
  $('#roomState').textContent = `Mode ${m} · ${MODES[m][1]}`;
}
$('#modes').addEventListener('click', e => {
  const b = e.target.closest('[data-m]');
  if (b) { setMode(b.dataset.m); toast('Mode ' + b.dataset.m + ' affiché'); }
});
setMode('Yoga');

/* ---------- Défis ---------- */
let disc = 'Tout';
function renderChips() {
  $('#chips').innerHTML = DISC.map(d => `<button class="chip ${d === disc ? 'on' : ''}">${d}</button>`).join('');
}
function renderProgs() {
  $('#programs').innerHTML = PROGS.filter(p => disc === 'Tout' || p[2] === disc).map((p, i) =>
    `<article class="card prog" style="animation-delay:${i * 60}ms"><span class="em">${p[0]}</span>
     <h3>${p[1]}</h3><span class="tag ${p[2] === 'Bâtiment' ? 'b' : ''}">${p[2]}</span><small>${p[3]}</small>
     <p><button class="btn sm" data-start="${p[4]}">Démarrer · +${p[4]} pts</button></p></article>`).join('');
}
$('#chips').addEventListener('click', e => {
  const c = e.target.closest('.chip'); if (!c) return;
  disc = c.textContent; renderChips(); renderProgs();
});
$('#programs').addEventListener('click', e => {
  const b = e.target.closest('[data-start]'); if (!b) return;
  toast('Programme lancé ! Scanne le QR code pour valider ta séance.');
});
function renderChall() {
  $('#challenges').innerHTML = CHALL.map(c =>
    `<article class="card"><span class="tag">${c[1]}</span><h3>${c[0]}</h3>
     <div class="meter"><i data-w="${Math.round(c[2] / c[3] * 100)}"></i></div>
     <small>${c[2].toLocaleString('fr-FR')} / ${c[3].toLocaleString('fr-FR')} ${c[4]}</small></article>`).join('');
}
function animateMeters() {
  $$('.meter i').forEach(i => { i.style.width = '0'; setTimeout(() => i.style.width = i.dataset.w + '%', 60); });
}
$('#scanBtn').addEventListener('click', () => {
  const o = $('#scan'), t = $('#scanTxt');
  o.hidden = false; t.textContent = 'Vise le QR code de la machine…';
  setTimeout(() => { t.textContent = '✅ Séance validée ! +50 points'; setPts(S.pts + 50); }, 2200);
  setTimeout(() => { o.hidden = true; toast('Bravo, série de 6 jours en vue 🔥'); }, 3500);
});
renderChips(); renderProgs(); renderChall();

/* ---------- Communauté ---------- */
function renderGroups() {
  const only = $('#women').checked;
  $('#groups').innerHTML = GROUPS.filter(g => !only || g[3]).map((g, i) =>
    `<li class="${g[3] ? 'fem' : ''}"><span class="ic">${g[3] ? '🌸' : '🤝'}</span>
     <div><b>${g[0]}</b><small>${g[1]} · ${g[2]}</small></div>
     <button class="btn sm" data-join="${i}">Rejoindre</button></li>`).join('');
}
$('#women').addEventListener('change', renderGroups);
$('#groups').addEventListener('click', e => {
  const b = e.target.closest('[data-join]'); if (!b) return;
  const on = b.classList.toggle('ok');
  b.textContent = on ? 'Inscrite ✓' : 'Rejoindre';
  toast(on ? 'Tu es inscrite à la session !' : 'Inscription annulée');
});
$('#newGroup').addEventListener('click', () => {
  const t = prompt('Nom de ta session (ex : Footing du jeudi)');
  if (!t) return;
  const f = confirm('Réserver cette session aux voisines uniquement ?');
  GROUPS.unshift([t, 'Camille (organisatrice)', 'À fixer', f]);
  renderGroups(); toast('Session créée !');
});
function addMsg(who, txt, me) {
  const m = $('#msgs');
  m.insertAdjacentHTML('beforeend', `<div class="m ${me ? 'me' : ''}"><small>${who}</small>${txt}</div>`);
  m.scrollTop = m.scrollHeight;
}
function sendMsg() {
  const i = $('#msgIn'), v = i.value.trim(); if (!v) return;
  const safe = document.createElement('div'); safe.textContent = v;
  addMsg('Moi', safe.innerHTML, true); i.value = '';
  setTimeout(() => addMsg('Marc', 'Bonne idée, je suis partant ! 💪'), 1200);
}
$('#msgBtn').addEventListener('click', sendMsg);
$('#msgIn').addEventListener('keydown', e => e.key === 'Enter' && sendMsg());
MSGS.forEach(m => addMsg(m[0], m[1], false));
renderGroups();

/* ---------- Boutique ---------- */
$('#rewards').innerHTML = REWARDS.map(r =>
  `<article class="card rw"><span class="em">${r[0]}</span><b>${r[1]}</b><small>${r[2]}</small>
   <span class="cost">${r[3].toLocaleString('fr-FR')} pts</span>
   <button class="btn sm" data-buy="${r[3]}" data-name="${r[1]}">Échanger</button></article>`).join('');
$('#rewards').addEventListener('click', e => {
  const b = e.target.closest('[data-buy]'); if (!b) return;
  const c = +b.dataset.buy;
  if (S.pts < c) return toast(`Il te manque ${(c - S.pts).toLocaleString('fr-FR')} points`);
  setPts(S.pts - c);
  toast('Code : SPORT-' + Math.random().toString(36).slice(2, 7).toUpperCase());
});

/* ---------- Services ---------- */
$('#pros').innerHTML = PROS.map((p, i) =>
  `<div class="pro"><b>${p[0]}</b><br><small>${p[1]}</small>
   <div class="slots">${p[2].map(s => `<button class="chip" data-slot="${p[0]}">${s}</button>`).join('')}</div></div>`).join('');
$('#pros').addEventListener('click', e => {
  const b = e.target.closest('[data-slot]'); if (!b) return;
  const on = b.classList.toggle('on');
  toast(on ? `Réservé : ${b.dataset.slot}, ${b.textContent}` : 'Réservation annulée');
});
$('#timeline').innerHTML = DAY.map((d, i) =>
  `<li style="background:${d[2]};animation-delay:${i * 80}ms">${d[0]}<span>${d[1]}</span><small>${d[1] === 'Coworking' ? '💻' : d[1] === 'Yoga' ? '🧘' : d[1] === 'Musculation' ? '🏋️' : '🧒'}</small></li>`).join('');

/* ---------- Démarrage : points + jauge ---------- */
window.addEventListener('load', () => {
  setTimeout(() => setPts(S.pts), 300);
  setTimeout(() => {
    $('#arc').style.strokeDashoffset = 264 * (1 - .68);
    count($('#pct'), 68, 1600);
    setTimeout(() => $('#pct').textContent = '68%', 1700);
  }, 100);
});
