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
  Coworking: ['💻', 'Libre jusqu\'à 14h – prises et wifi disponibles'],
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

// Défis avec descriptions et récompenses enrichies pour le modal détail
const CHALL = [
  {
    title: '100 000 marches dans les escaliers',
    type: 'Collectif',
    cur: 63400,
    max: 100000,
    unit: 'marches',
    desc: 'Objectif de la copropriété : privilégier les escaliers actifs au lieu des ascenseurs. Chaque palier compte !',
    reward: '+150 pts Intersport individuels + apéro partagé offert par Nexity au 100k',
    place: 'Escaliers Bâtiments A & B'
  },
  {
    title: 'Défi du mois : 500 séances à la résidence',
    type: 'Collectif',
    cur: 340,
    max: 500,
    unit: 'séances',
    desc: 'Cumul des entraînements dans la salle modulable, le City Stade et sur le parcours santé.',
    reward: '+200 points et renouvellement du matériel de fitness Spartek',
    place: 'Toute la résidence'
  },
  {
    title: '5 séances cette semaine',
    type: 'Individuel',
    cur: 3,
    max: 5,
    unit: 'séances',
    desc: 'Votre engagement personnel hebdomadaire pour maintenir une régularité physique optimale.',
    reward: 'Badge Champion Hebdo + 50 points bonus',
    place: 'Au choix'
  },
  {
    title: '30 jours de yoga & étirements',
    type: 'Individuel',
    cur: 12,
    max: 30,
    unit: 'jours',
    desc: 'Au moins 10 minutes d\'étirements ou de yoga chaque jour, chez soi ou en salle commune.',
    reward: 'Bon d\'achat Intersport de 10 € offert',
    place: 'Appartement ou Salle RDC'
  }
];

// Sessions enrichies avec détails (lieu, durée, matériel, etc.)
let GROUPS = [
  {
    title: 'Yoga du matin',
    organizer: 'Géraldine',
    participants: 'Géraldine + 4 voisins',
    time: 'Mar · 7h30',
    place: 'Salle modulable (RDC)',
    level: 'Tous niveaux',
    duration: '45 min',
    womenOnly: false,
    gear: 'Tapis de sol (fourni dans le kit d\'accueil), bouteille d\'eau',
    joined: false
  },
  {
    title: 'Course douce du dimanche',
    organizer: 'Marc',
    participants: 'Marc + 6 voisins',
    time: 'Dim · 9h00',
    place: 'Départ Hall Bâtiment B',
    level: 'Débutant à intermédiaire',
    duration: '45 min',
    womenOnly: false,
    gear: 'Chaussures de running, montre ou smartphone',
    joined: false
  },
  {
    title: 'Renfo entre voisines',
    organizer: 'Inès',
    participants: 'Inès + 3 voisines',
    time: 'Jeu · 19h00',
    place: 'Salle modulable (RDC)',
    level: 'Intermédiaire',
    duration: '40 min',
    womenOnly: true,
    gear: 'Élastiques de résistance Intersport, tenue de sport',
    joined: false
  },
  {
    title: 'Pilates 100 % voisines',
    organizer: 'Sana',
    participants: 'Sana + 5 voisines',
    time: 'Sam · 10h00',
    place: 'Toiture végétalisée (ou Salle RDC si pluie)',
    level: 'Tous niveaux',
    duration: '50 min',
    womenOnly: true,
    gear: 'Tapis confortable, serviette',
    joined: false
  },
  {
    title: 'Match de badminton amical',
    organizer: 'Paul',
    participants: 'Paul + 2 voisins',
    time: 'Ven · 18h00',
    place: 'City Stade central',
    level: 'Tous niveaux',
    duration: '1 heure',
    womenOnly: false,
    gear: 'Raquettes (prêt possible par la copropriété), volants fournis',
    joined: false
  }
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

// Professionnels de santé enrichis pour la présentation jury
const PROS = [
  {
    name: 'Dr Léa Martin',
    badge: 'Kinésithérapeute D.E.',
    avatar: '🩺',
    desc: 'Rééducation fonctionnelle, bilan postural et réathlétisation.',
    slots: ['Lun 9h00', 'Lun 14h00', 'Mer 11h00']
  },
  {
    name: 'Hugo Bernard',
    badge: 'Ostéopathe du Sport D.O.',
    avatar: '🦴',
    desc: 'Mobilité articulaire, soulagement des douleurs de dos et posture.',
    slots: ['Mar 10h00', 'Jeu 10h00', 'Jeu 15h00']
  },
  {
    name: 'Sana Idrissi',
    badge: 'Nutritionniste & Diététique',
    avatar: '🥗',
    desc: 'Équilibre nutritionnel, énergie sportive et atelier cuisine du vendredi.',
    slots: ['Ven 12h00', 'Ven 17h00']
  }
];

const DAY = [
  ['7h – 9h', 'Yoga', '#C8F23A'], 
  ['9h – 12h', 'Coworking', '#BFD0FF'],
  ['12h – 14h', 'Activités enfants', '#FFC62E'], 
  ['14h – 17h', 'Coworking', '#BFD0FF'],
  ['17h – 19h', 'Musculation', '#FF9D85'], 
  ['19h – 21h', 'Yoga', '#C8F23A']
];

/* ---------- Système de Confettis Célébration ---------- */
const canvas = $('#confetti');
const ctx = canvas ? canvas.getContext('2d') : null;
let confettiParticles = [];
let confettiAnimId = null;

function resizeCanvas() {
  if (!canvas) return;
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

function launchConfetti(count = 65) {
  if (!ctx || !canvas) return;
  const colors = ['#3256ec', '#cbf327', '#ff4757', '#ffb703', '#10b981', '#5375fe'];
  for (let i = 0; i < count; i++) {
    confettiParticles.push({
      x: canvas.width * 0.5 + (Math.random() - 0.5) * 260,
      y: canvas.height * 0.42 + (Math.random() - 0.5) * 80,
      vx: (Math.random() - 0.5) * 16,
      vy: (Math.random() - 0.8) * 18,
      size: Math.random() * 8 + 5,
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.random() * 360,
      rotSpeed: (Math.random() - 0.5) * 12,
      opacity: 1,
      gravity: 0.42
    });
  }
  if (!confettiAnimId) updateConfetti();
}

function updateConfetti() {
  if (!ctx || !canvas) return;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  confettiParticles.forEach((p, index) => {
    p.x += p.vx;
    p.y += p.vy;
    p.vy += p.gravity;
    p.vx *= 0.98;
    p.rotation += p.rotSpeed;
    p.opacity -= 0.012;

    ctx.save();
    ctx.globalAlpha = Math.max(0, p.opacity);
    ctx.translate(p.x, p.y);
    ctx.rotate((p.rotation * Math.PI) / 180);
    ctx.fillStyle = p.color;
    ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 1.4);
    ctx.restore();

    if (p.opacity <= 0 || p.y > canvas.height + 50) {
      confettiParticles.splice(index, 1);
    }
  });

  if (confettiParticles.length > 0) {
    confettiAnimId = requestAnimationFrame(updateConfetti);
  } else {
    confettiAnimId = null;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
}

/* ---------- Outils & Notifications ---------- */
let tt;
function toast(msg) {
  const t = $('#toast');
  if (!t) return;
  t.textContent = msg; 
  t.classList.add('show');
  clearTimeout(tt); 
  tt = setTimeout(() => t.classList.remove('show'), 2800);
}

function count(el, to, ms = 1100) {
  const from = parseInt(el.textContent.replace(/\s/g, '')) || 0, t0 = performance.now();
  (function f(t) {
    const p = Math.min((t - t0) / ms, 1), e = 1 - Math.pow(1 - p, 3);
    el.textContent = Math.round(from + (to - from) * e).toLocaleString('fr-FR');
    if (p < 1) requestAnimationFrame(f);
  })(t0);
}

function setPts(n) { 
  S.pts = n; 
  $$('.ptsval').forEach(e => {
    count(e, n, 800);
    e.style.transform = 'scale(1.15)';
    e.style.transition = 'transform 0.25s ease';
    setTimeout(() => e.style.transform = 'scale(1)', 280);
  }); 
}

const li = (ic, t, s, extra = '') =>
  `<li><span class="ic">${ic}</span><div><b>${t}</b><small>${s}</small></div>${extra}</li>`;

/* ---------- Navigation & Vues ---------- */
function go(id) {
  $$('.view').forEach(v => {
    const isOn = v.id === id;
    v.classList.toggle('on', isOn);
    if (isOn) {
      const cards = v.querySelectorAll('.card, .list li');
      cards.forEach((c, i) => {
        c.style.opacity = '0';
        c.style.transform = 'translateY(14px)';
        setTimeout(() => {
          c.style.transition = 'opacity 0.35s ease, transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)';
          c.style.opacity = '1';
          c.style.transform = 'translateY(0)';
        }, i * 40);
      });
    }
  });

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
  if (b) { 
    setMode(b.dataset.m); 
    toast('Salle : Mode ' + b.dataset.m + ' activé ⚡'); 
  }
});
setMode('Yoga');

const flameEl = $('.flame');
if (flameEl) {
  flameEl.style.cursor = 'pointer';
  flameEl.addEventListener('click', () => {
    launchConfetti(35);
    toast('Série active : 5 jours consécutifs d\'effort ! 🔥');
  });
}

/* ---------- 2. Défis & Programmes ---------- */
let disc = 'Tout';
function renderChips() {
  $('#chips').innerHTML = DISC.map(d => `<button class="chip ${d === disc ? 'on' : ''}">${d}</button>`).join('');
}

function isChallengeAccepted(title) {
  return CHALL.some(c => c.title === title);
}

function renderProgs() {
  $('#programs').innerHTML = PROGS.filter(p => disc === 'Tout' || p[2] === disc).map((p) => {
    const origIdx = PROGS.indexOf(p);
    const accepted = isChallengeAccepted(p[1]);
    return `
      <article class="card prog" style="animation-delay:${origIdx * 45}ms">
        <span class="em">${p[0]}</span>
        <h3>${p[1]}</h3>
        <span class="tag ${p[2] === 'Bâtiment' ? 'b' : ''}">${p[2]}</span>
        <small>${p[3]}</small>
        <p>
          ${accepted 
            ? `<button class="btn sm ok" disabled style="opacity:0.9;cursor:default;">En cours ✓</button>` 
            : `<button class="btn sm" data-accept="${origIdx}">+ Participer au défi</button>`}
        </p>
      </article>
    `;
  }).join('');
}

$('#chips').addEventListener('click', e => {
  const c = e.target.closest('.chip'); 
  if (!c) return;
  disc = c.textContent; 
  renderChips(); 
  renderProgs();
});

// Clic pour accepter un nouveau défi (ne donne pas de points immédiatement)
$('#programs').addEventListener('click', e => {
  const b = e.target.closest('[data-accept]'); 
  if (!b) return;
  const idx = +b.dataset.accept;
  const p = PROGS[idx];

  // Ajout du défi dans les "Défis en cours"
  CHALL.unshift({
    title: p[1],
    type: p[2],
    cur: 0,
    max: 1,
    unit: 'séance',
    desc: `Objectif : Réaliser l'entraînement "${p[1]}" (${p[3]}). Validez votre séance sur les équipements de la résidence pour remporter vos points !`,
    reward: `+${p[4]} points Intersport à la validation`,
    place: p[2] === 'Bâtiment' ? 'Salle modulable (RDC)' : 'Résidence L\'Impulsion',
    ptsToWin: p[4],
    isCustom: true,
    validated: false
  });

  renderProgs();
  renderChall();
  animateMeters();
  toast('Défi accepté ! Retrouvez-le ci-dessous dans vos "Défis en cours" 🎯');
});

// Rendu des défis avec clic pour voir le détail
function renderChall() {
  $('#challenges').innerHTML = CHALL.map((c, idx) => {
    const pct = Math.round((c.cur / c.max) * 100);
    const isValidated = c.validated;
    return `
      <article class="card chall-card" data-chall-idx="${idx}">
        <div class="chall-header-row">
          <span class="tag ${c.type === 'Collectif' ? 'b' : ''}">${c.type}</span>
          <span class="chall-hint">${isValidated ? 'Validé ✓' : 'Détails 👁️'}</span>
        </div>
        <h3>${c.title}</h3>
        <div class="meter"><i data-w="${pct}"></i></div>
        <small><b>${c.cur.toLocaleString('fr-FR')}</b> / ${c.max.toLocaleString('fr-FR')} ${c.unit} (${pct}%)</small>
      </article>
    `;
  }).join('');
}

function animateMeters() {
  $$('.meter i').forEach(i => { 
    i.style.width = '0%'; 
    setTimeout(() => {
      i.style.width = i.dataset.w + '%';
    }, 80); 
  });
}

// Modal Détails d'un Défi en cours (l'utilisateur y participe déjà)
let currentChallIdx = 0;
$('#challenges').addEventListener('click', e => {
  const card = e.target.closest('[data-chall-idx]');
  if (!card) return;
  currentChallIdx = +card.dataset.challIdx;
  const c = CHALL[currentChallIdx];

  $('#detChallTitle').textContent = c.title;
  $('#detChallType').textContent = c.type;
  $('#detChallType').className = `tag ${c.type === 'Collectif' ? 'b' : ''}`;
  $('#detChallDesc').textContent = c.desc;
  $('#detChallCurrent').textContent = c.cur.toLocaleString('fr-FR');
  $('#detChallTarget').textContent = `/ ${c.max.toLocaleString('fr-FR')} ${c.unit}`;
  
  const pct = Math.round((c.cur / c.max) * 100);
  $('#detChallPct').textContent = `${pct}% complété · Lieu : ${c.place}`;
  $('#detChallBar').style.width = pct + '%';
  $('#detChallReward').textContent = c.reward;

  $('#modalChallengeDetail').hidden = false;
});

$('#closeChallBtn').addEventListener('click', () => $('#modalChallengeDetail').hidden = true);
$('#closeChallActionBtn').addEventListener('click', () => $('#modalChallengeDetail').hidden = true);

/* ---------- QR Scanner Normal & Simple (Sans bouton instantané) ---------- */
let scanTimeout = null;

function startCameraScan() {
  const o = $('#scan'), t = $('#scanTxt');
  o.hidden = false;
  t.textContent = 'Alignez le QR code dans le cadre…';

  clearTimeout(scanTimeout);
  scanTimeout = setTimeout(() => {
    t.textContent = '⚡ QR Code détecté : Équipement Spartek';
    setTimeout(() => {
      t.textContent = '✅ Séance validée ! +50 points ajoutés';
      setPts(S.pts + 50);

      // Si un défi accepté est en cours, le valider
      const pendingProg = CHALL.find(c => c.isCustom && !c.validated);
      if (pendingProg) {
        pendingProg.cur = pendingProg.max;
        pendingProg.validated = true;
        setPts(S.pts + (pendingProg.ptsToWin || 30));
        renderChall();
        animateMeters();
      }

      launchConfetti(70);
      setTimeout(() => {
        o.hidden = true;
        toast('Bravo Géraldine ! Séance enregistrée (+50 pts) 🔥');
      }, 1400);
    }, 700);
  }, 1800);
}

$('#scanBtn').addEventListener('click', startCameraScan);

$('#closeScanBtn').addEventListener('click', () => {
  clearTimeout(scanTimeout);
  $('#scan').hidden = true;
});

renderChips(); 
renderProgs(); 
renderChall();

/* ---------- 3. Communauté & Voisins ---------- */

// Rendu des sessions avec bouton "Détails" et "Rejoindre"
function renderGroups() {
  const only = $('#women').checked;
  const filtered = GROUPS.filter(g => !only || g.womenOnly);

  $('#groups').innerHTML = filtered.map((g, i) => {
    const origIdx = GROUPS.indexOf(g);
    return `
      <li class="${g.womenOnly ? 'fem' : ''}">
        <div class="session-main">
          <span class="ic">${g.womenOnly ? '🌸' : '🤝'}</span>
          <div>
            <b>${g.title}</b>
            <small>${g.participants} · ${g.time}</small>
          </div>
        </div>
        <div class="session-actions">
          <button class="btn-detail" data-detail="${origIdx}">Détails 👁️</button>
          <button class="btn sm ${g.joined ? 'ok' : ''}" data-join="${origIdx}">
            ${g.joined ? 'Inscrite ✓' : 'Rejoindre'}
          </button>
        </div>
      </li>
    `;
  }).join('');
}

$('#women').addEventListener('change', renderGroups);

// Interaction Rejoindre / Annuler depuis la liste
$('#groups').addEventListener('click', e => {
  const joinBtn = e.target.closest('[data-join]');
  if (joinBtn) {
    const idx = +joinBtn.dataset.join;
    GROUPS[idx].joined = !GROUPS[idx].joined;
    if (GROUPS[idx].joined) launchConfetti(35);
    renderGroups();
    toast(GROUPS[idx].joined ? 'Tu es inscrite à la session ! 🎉' : 'Inscription annulée');
    return;
  }

  const detailBtn = e.target.closest('[data-detail]');
  if (detailBtn) {
    openSessionDetail(+detailBtn.dataset.detail);
  }
});

// Modal Détail de Session
let currentSessionIdx = 0;
function openSessionDetail(idx) {
  currentSessionIdx = idx;
  const g = GROUPS[idx];
  
  $('#detTitle').textContent = g.title + (g.womenOnly ? ' 🌸' : '');
  $('#detWhen').textContent = g.time;
  $('#detWhere').textContent = g.place;
  $('#detLevel').textContent = g.level + ` · Durée : ${g.duration}`;
  $('#detOrganizer').textContent = g.organizer;
  $('#detParticipants').textContent = g.participants;
  $('#detGear').textContent = g.gear;

  const actionBtn = $('#detActionJoinBtn');
  actionBtn.textContent = g.joined ? 'Me désinscrire de la session' : 'Rejoindre la session';
  actionBtn.className = `btn ${g.joined ? 'btn-outline' : ''}`;

  $('#modalSessionDetail').hidden = false;
}

$('#closeSessionDetailBtn').addEventListener('click', () => $('#modalSessionDetail').hidden = true);
$('#closeDetailActionBtn').addEventListener('click', () => $('#modalSessionDetail').hidden = true);

$('#detActionJoinBtn').addEventListener('click', () => {
  const g = GROUPS[currentSessionIdx];
  g.joined = !g.joined;
  if (g.joined) launchConfetti(40);
  renderGroups();
  $('#modalSessionDetail').hidden = true;
  toast(g.joined ? 'Tu es inscrite à la session ! 🎉' : 'Inscription annulée');
});

// Modal Création de Session (remplace prompt/confirm)
$('#newGroup').addEventListener('click', () => {
  $('#newSessionForm').reset();
  $('#modalNewSession').hidden = false;
});

$('#closeNewSessionBtn').addEventListener('click', () => $('#modalNewSession').hidden = true);
$('#cancelNewSessionBtn').addEventListener('click', () => $('#modalNewSession').hidden = true);

$('#newSessionForm').addEventListener('submit', e => {
  e.preventDefault();
  const title = $('#sessionTitle').value.trim();
  const time = $('#sessionDayTime').value.trim();
  const place = $('#sessionPlace').value;
  const level = $('#sessionLevel').value;
  const duration = $('#sessionDuration').value;
  const womenOnly = $('#sessionWomenOnly').checked;

  if (!title || !time) return;

  GROUPS.unshift({
    title: title,
    organizer: 'Géraldine (vous)',
    participants: 'Géraldine + voisins bienvenus',
    time: time,
    place: place,
    level: level,
    duration: duration,
    womenOnly: womenOnly,
    gear: 'Tenue de sport confortable, gourde d\'eau',
    joined: true
  });

  renderGroups();
  $('#modalNewSession').hidden = true;
  launchConfetti(55);
  toast('Nouvelle session sportive publiée dans la résidence ! 🚀');
});

// Chat de copropriété
function addMsg(who, txt, me) {
  const m = $('#msgs');
  m.insertAdjacentHTML('beforeend', `<div class="m ${me ? 'me' : ''}"><small>${who}</small>${txt}</div>`);
  m.scrollTop = m.scrollHeight;
}

function sendMsg() {
  const i = $('#msgIn'), v = i.value.trim(); 
  if (!v) return;
  const safe = document.createElement('div'); 
  safe.textContent = v;
  addMsg('Moi', safe.innerHTML, true); 
  i.value = '';
  setTimeout(() => addMsg('Marc', 'Super idée, je rejoins le créneau ! 💪'), 1200);
}

$('#msgBtn').addEventListener('click', sendMsg);
$('#msgIn').addEventListener('keydown', e => e.key === 'Enter' && sendMsg());
MSGS.forEach(m => addMsg(m[0], m[1], false));
renderGroups();

/* ---------- 4. Boutique Intersport ---------- */
$('#rewards').innerHTML = REWARDS.map(r =>
  `<article class="card rw">
     <span class="em">${r[0]}</span>
     <b>${r[1]}</b>
     <small>${r[2]}</small>
     <span class="cost">${r[3].toLocaleString('fr-FR')} pts</span>
     <button class="btn sm" data-buy="${r[3]}" data-name="${r[1]}">Échanger</button>
   </article>`).join('');

$('#rewards').addEventListener('click', e => {
  const b = e.target.closest('[data-buy]'); 
  if (!b) return;
  const c = +b.dataset.buy;
  if (S.pts < c) return toast(`Il vous manque ${(c - S.pts).toLocaleString('fr-FR')} points pour cette récompense !`);
  
  setPts(S.pts - c);
  launchConfetti(70);
  const code = 'SPORT-' + Math.random().toString(36).slice(2, 7).toUpperCase();
  toast(`🎉 Récompense Intersport validée ! Code de retrait : ${code}`);
});

/* ---------- 5. Services & Professionnels de Santé (Affichage Clair) ---------- */
function renderPros() {
  $('#pros').innerHTML = PROS.map(p => `
    <div class="pro-card">
      <div class="pro-header">
        <div class="pro-avatar">${p.avatar}</div>
        <div class="pro-info">
          <b>${p.name}</b>
          <span class="pro-badge">${p.badge}</span>
        </div>
      </div>
      <div class="pro-meta">
        <span>📍 Cabinet partagé RDC</span>
        <span>⏱️ 45 min</span>
        <span>${p.desc}</span>
      </div>
      <div class="pro-slots-title">📅 Créneaux disponibles au RDC :</div>
      <div class="slots">
        ${p.slots.map(s => `<button class="slot-btn" data-pro="${p.name}" data-slot="${s}"><span>🕒</span> ${s}</button>`).join('')}
      </div>
    </div>
  `).join('');
}

$('#pros').addEventListener('click', e => {
  const b = e.target.closest('.slot-btn'); 
  if (!b) return;
  const on = b.classList.toggle('on');
  if (on) launchConfetti(30);
  toast(on ? `Rendez-vous réservé : ${b.dataset.pro} (${b.dataset.slot}) au cabinet RDC` : 'Réservation annulée');
});
renderPros();

$('#timeline').innerHTML = DAY.map((d, i) =>
  `<li style="background:${d[2]};animation-delay:${i * 70}ms">
     ${d[0]}<span>${d[1]}</span>
     <small>${d[1] === 'Coworking' ? '💻' : d[1] === 'Yoga' ? '🧘' : d[1] === 'Musculation' ? '🏋️' : '🧒'}</small>
   </li>`).join('');

// Fermeture des modals au clic sur l'arrière-plan sombre
$$('.overlay').forEach(ov => {
  ov.addEventListener('click', e => {
    if (e.target === ov) ov.hidden = true;
  });
});

/* ---------- Démarrage : Points + Jauge SVG circulaire ---------- */
window.addEventListener('load', () => {
  setTimeout(() => setPts(S.pts), 250);
  setTimeout(() => {
    const arc = $('#arc');
    if (arc) arc.style.strokeDashoffset = 264 * (1 - 0.68);
    count($('#pct'), 68, 1600);
    setTimeout(() => {
      if ($('#pct')) $('#pct').textContent = '68%';
    }, 1700);
  }, 100);
});
