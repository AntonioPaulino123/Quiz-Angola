const questions = [
  {
    q: 'Quais são as três línguas mais faladas em Angola depois do Português?',
    options: ['Inglês, Francês e Lingala', 'Lingala, Kikongo e Inglês', 'Umbundu, Kimbundu e Kikongo', 'Kimbundu, Inglês e Kikongo'],
    correct: 2
  },
  {
    q: 'Qual é o gênero musical tradicional angolano que deu origem ao Kuduro?',
    options: ['Semba', 'Rebita', 'Kundu-Kundu', 'Kizomba'],
    correct: 1
  },
  {
    q: 'Qual é o significado do termo "NGOLA" na origem do nome "Angola"?',
    options: ['Governante', 'Obrigado', 'Reino do Ndongo', 'Terra de sofrimento'],
    correct: 0
  },
  {
    q: 'Quem foi Mano Chaba?',
    options: ['Escritor', 'Ministro da Cultura', 'Apresentador', 'Cantor'],
    correct: 3
  },
  {
    q: 'Que música angolana faz os mais velhos dançarem como se tivessem 20 anos?',
    options: ['Kuduro', 'Semba rasgadinho', 'Kizomba', 'Afro house'],
    correct: 1
  },
  {
    q: 'Se alguém te chama de "Cota" significa que:',
    options: ['Você é um treinador de futebol', 'Que Você é mal educado', 'Que Você tem duas mulheres', 'Que você é mais velho e merece respeito'],
    correct: 3
  },
  {
    q: 'Qual desses é um instrumento tradicional da música angolana?',
    options: ['Vuvuzela', 'Ukulele', 'Kissange', 'Tambor'],
    correct: 2
  },
  {
    q: 'Quem foram os três presidentes de Angola desde a independência?',
    options: ['António Lando Paulino, Agostinho Neto e José Eduardo dos Santos', 'Agostinho Neto, José Eduardo dos Santos e João Lourenço', 'Jonas Malheiro Savimbi, João Lourenço e António Lando Paulino', 'Isaías Samakuva, Adalberto Costa Junior e Jonas Malheiro Savimbi'],
    correct: 1
  },
  {
    q: 'Em que hemisfério está localizado Angola geograficamente?',
    options: ['Hemisfério Sul', 'Hemisfério Norte', 'Sudeste', 'Nordeste'],
    correct: 0
  }
];

let current = 0;
let score = 0;
let answered = false;

const startBtn = document.getElementById('startBtn');
const startScreen = document.getElementById('start');
const quizScreen = document.getElementById('quiz');
const endScreen = document.getElementById('end');
const questionText = document.getElementById('questionText');
const opts = Array.from(document.querySelectorAll('.opt'));
const nextBtn = document.getElementById('nextBtn');
const restartBtn = document.getElementById('restartBtn');

function showScreen(screen){
  startScreen.classList.add('hidden');
  quizScreen.classList.add('hidden');
  endScreen.classList.add('hidden');
  screen.classList.remove('hidden');
}

function buildTimeline(){
  const timeline = document.getElementById('timeline');
  if(!timeline) return;
  timeline.innerHTML = '';
  for(let i = 0; i < questions.length; i++){
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'marker';
    btn.setAttribute('data-index', i);
    btn.setAttribute('aria-label', `Questão ${i+1}`);
    btn.disabled = true;
    btn.textContent = (i+1);
    timeline.appendChild(btn);
  }
  updateCurrentMarker();
}

function updateCurrentMarker(){
  const markers = Array.from(document.querySelectorAll('.marker'));
  markers.forEach((m, i) => {
    m.classList.toggle('current', i === current && !quizScreen.classList.contains('hidden'));
  });
}

function markTimelineResult(index, correct){
  const markers = document.querySelectorAll('.marker');
  const m = markers[index];
  if(!m) return;
  m.classList.remove('current');
  if(correct) m.classList.add('correct'); else m.classList.add('wrong');
}

function resetTimeline(){
  const markers = document.querySelectorAll('.marker');
  markers.forEach(m => { m.className = 'marker'; });
  updateCurrentMarker();
}

function renderQuestion(){
  const q = questions[current];
  questionText.textContent = q.q;
  opts.forEach((btn, i) => {
    btn.textContent = q.options[i] || '';
    btn.classList.remove('correct','wrong');
    btn.disabled = false;
  });
  answered = false;
  nextBtn.disabled = true;
  updateCurrentMarker();
} 

function handleChoice(e){
  if(answered) return;
  const idx = Number(e.currentTarget.dataset.index);
  const q = questions[current];
  answered = true;
  if(idx === q.correct){
    e.currentTarget.classList.add('correct');
    score++;
  } else {
    e.currentTarget.classList.add('wrong');
    const correctBtn = opts[q.correct];
    if(correctBtn) correctBtn.classList.add('correct');
  }
  markTimelineResult(current, idx === q.correct);
  opts.forEach(b => b.disabled = true);
  nextBtn.disabled = false;
} 

function next(){
  current++;
  if(current >= questions.length){
    showEnd();
    return;
  }
  renderQuestion();
}

function showEnd(){
  showScreen(endScreen);
  const endLabel = document.getElementById('endLabel');
  const endScore = document.getElementById('endScore');
  if(endLabel) endLabel.textContent = 'Você acertou:';
  if(endScore) endScore.textContent = `${score}/${questions.length}`;
  const btn = document.getElementById('restartBtn');
  if(btn) btn.focus();
}

startBtn.addEventListener('click', () => { current = 0; score = 0; resetTimeline(); showScreen(quizScreen); renderQuestion(); });
const headerStartBtn = document.getElementById('headerStartBtn');
if(headerStartBtn) headerStartBtn.addEventListener('click', () => { current = 0; score = 0; resetTimeline(); showScreen(quizScreen); renderQuestion(); });

const siteTitle = document.getElementById('siteTitle');
if(siteTitle){
  siteTitle.addEventListener('click', () => { current = 0; score = 0; resetTimeline(); showScreen(startScreen); });
  siteTitle.addEventListener('keydown', (e) => { if(e.key === 'Enter' || e.key === ' ') { e.preventDefault(); siteTitle.click(); } });
}

opts.forEach(b => b.addEventListener('click', handleChoice));
nextBtn.addEventListener('click', next);
restartBtn.addEventListener('click', () => { showScreen(startScreen); current = 0; score = 0; resetTimeline(); });

buildTimeline();
showScreen(startScreen);