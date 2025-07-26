const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let particles = [];
let time = 0;

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  createParticles();
}

window.addEventListener('resize', resize);

// 点のクラス
class Particle {
  constructor(x, y, delay) {
    this.x = x;
    this.y = y;
    this.delay = delay;
    this.alpha = 0;
  }

  update(time) {
  const waveSpeed = 0.002;  // 時間の進み方（波の速さ）
  const waveLength = 0.015;  // 波の広がり（xやyの位置による変化の量）

  // x or y によって波を伝播させる（ここでは x を使うと横方向に波）
  const t = time * waveSpeed + this.x * waveLength;

  // sin波を0〜1の範囲に正規化（-1～1 → 0～1）
  this.alpha = (Math.sin(t) + 1) / 2;
}


  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, 6, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 255, 255, ${this.alpha})`; // 白点
    ctx.fill();
  }
}

// 点を作る
function createParticles() {
  particles = [];

  const fontSize = 200;
  const gap = 8;

  const offCanvas = document.createElement('canvas');
  const offCtx = offCanvas.getContext('2d');
  offCanvas.width = canvas.width;
  offCanvas.height = canvas.height;

  offCtx.font = `${fontSize}px sans-serif`;
  offCtx.textBaseline = 'middle';
  offCtx.textAlign = 'center';
  offCtx.fillStyle = 'black';
  offCtx.fillText('ANIMATION', canvas.width / 2, canvas.height / 2);

  const imageData = offCtx.getImageData(0, 0, offCanvas.width, offCanvas.height);
  const data = imageData.data;

  let delay = 0;
  for (let y = 0; y < offCanvas.height; y += gap) {
    for (let x = 0; x < offCanvas.width; x += gap) {
      const index = (y * offCanvas.width + x) * 4;
      const alpha = data[index + 3];
      if (alpha > 128) {
        particles.push(new Particle(x, y, delay));
        delay += 50; 
      }
    }
  }
}

let lastTime = 0;
function animate(timestamp = 0) {
  if (!lastTime) lastTime = timestamp;
  const delta = timestamp - lastTime;
  lastTime = timestamp;
  time += delta;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // 黒背景塗りつぶし
  ctx.fillStyle = '#111';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  particles.forEach(p => {
    p.update(time);
    p.draw(ctx);
  });

  requestAnimationFrame(animate);
}

resize();
requestAnimationFrame(animate);
