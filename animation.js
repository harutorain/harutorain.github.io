const toggleBtn = document.getElementById("menuToggle");
const menuBox = document.getElementById("menuBox");

let isMenuOpen = false;

toggleBtn.addEventListener("click", () => {
  toggleBtn.classList.toggle("active");

  if (!isMenuOpen) {
    menuBox.classList.add("visible");
    requestAnimationFrame(() => {
      menuBox.classList.add("show");
      menuBox.classList.remove("hide");
    });
  } else {
    menuBox.classList.remove("show");
    menuBox.classList.add("hide");

    setTimeout(() => {
      menuBox.classList.remove("visible");
    }, 400); 
  }

  isMenuOpen = !isMenuOpen;
});

// 各アニメーションブロックに処理
document.querySelectorAll(".anim-block").forEach(block => {
  const p = block.querySelector("p");
  const text = p.textContent;
  p.textContent = '';

  //spanに分解
  for (let i = 0; i < text.length; i++) {
    const span = document.createElement("span");
    span.textContent = text[i];
    p.appendChild(span);
  }

  const spans = p.querySelectorAll("span");

  block.addEventListener("mouseenter", () => {
    spans.forEach((span, i) => {
      if (block.classList.contains("wave")) {
        span.style.animation = `wave 0.6s ease-in-out infinite`;
        span.style.animationDelay = `${i * 0.1}s`;
      } else if (block.classList.contains("rotate")) {
        span.style.animation = `rotate 0.8s ease forwards`;
        span.style.animationDelay = `${i * 0.1}s`;
      } else if (block.classList.contains("expand")) {
        span.style.letterSpacing = `4px`;
      }
    });
  });

  block.addEventListener("mouseleave", () => {
    spans.forEach(span => {
      span.style.animation = '';
      span.style.transform = '';
      span.style.letterSpacing = '';
      span.style.fontWeight = '';  
    });
  });
});
