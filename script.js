window.requestAnimFrame = (function(){ return window.requestAnimationFrame })();
var canvas = document.getElementById("space");
var c = canvas.getContext("2d");

var numStars = 1900;
var radius = '0.' + Math.floor(Math.random() * 9) + 1;
var focalLength = canvas.width * 2;
var centerX, centerY;

var stars = [], star;
var words = [
 'Achieve', 'Believe', 'Courage', 'Determination', 'Empower',
  'Fearless', 'Goal', 'Hope', 'Inspire', 'Joy',
  'Kindness', 'Limitless', 'Motivation', 'Never give up', 'Optimism',
  'Passion', 'Perseverance', 'Resilience', 'Strength', 'Success',
  'Tenacity', 'Unstoppable', 'Victory', 'Willpower', 'Zeal',
  'Dream', 'Create', 'Imagine', 'Transform', 'Shine',
  'Thrive', 'Grow', 'Learn', 'Rise', 'Soar',
  'Excel', 'Focus', 'Wisdom', 'Purpose', 'Journey',
  'Balance', 'Harmony', 'Peace', 'Grace', 'Unity',
  'Vision', 'Faith', 'Trust', 'Love', 'Light',
  'Power', 'Strengthen', 'Endurance', 'Grit', 'Courageous',
  'Overcome', 'Inspire', 'Believe in yourself', 'Self-discipline', 'Persistence',
  'Confidence', 'Hard work', 'Dedication', 'Excellence', 'Hustle',
  'Leadership', 'Breakthrough', 'Elevate', 'Challenge', 'Adapt',
  'Innovate', 'Push forward', 'Empowerment', 'Strive', 'Keep going',
  'Fearless mindset', 'Boldness', 'Drive', 'Conquer', 'Brave',
  'Strength within', 'Keep fighting', 'Momentum', 'Take action', 'Mastery',
  'Ambition', 'Greatness', 'No limits', 'Never quit', 'Be relentless',
  'Dominate', 'Take charge', 'Believe in dreams', 'Rise above', 'Stay strong',
  'Keep moving', 'Stay hungry', 'Own your power', 'Go beyond', 'Make it happen'
];
initializeStars();

function executeFrame() {
  requestAnimFrame(executeFrame);
  moveStars();
  drawStars();
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function initializeStars() {
  centerX = canvas.width / 2;
  centerY = canvas.height / 2;
  const shuffledWords = shuffleArray([...words]);
  stars = [];

  for (let i = 0; i < numStars; i++) {
    stars.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      z: Math.random() * canvas.width,
      o: '0.' + Math.floor(Math.random() * 99) + 1,
      word: shuffledWords[i % shuffledWords.length]
    });
  }
}

function moveStars() {
  for (let i = 0; i < numStars; i++) {
    star = stars[i];
    star.z--;
    if (star.z <= 0) star.z = canvas.width;
  }
}

function drawStars() {
  if (canvas.width !== window.innerWidth || canvas.height !== window.innerHeight) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initializeStars();
  }

  c.fillStyle = "rgba(0,10,20,1)";
  c.fillRect(0, 0, canvas.width, canvas.height);
  c.fillStyle = "rgba(209, 255, 255, " + radius + ")";

  for (let i = 0; i < numStars; i++) {
    star = stars[i];
    let pixelX = (star.x - centerX) * (focalLength / star.z) + centerX;
    let pixelY = (star.y - centerY) * (focalLength / star.z) + centerY;
    let scale = focalLength / star.z;

    if (pixelX < 0 || pixelX > canvas.width || pixelY < 0 || pixelY > canvas.height) continue;
    c.beginPath();
    c.arc(pixelX, pixelY, scale/2, 0, Math.PI * 2);
    c.fill();
    c.fillStyle = "rgba(209, 255, 255, " + star.o + ")";
    c.font = Math.floor(scale * 3) + 'px Montserrat';
    c.fillText(star.word, pixelX, pixelY);
  }
}

executeFrame();
