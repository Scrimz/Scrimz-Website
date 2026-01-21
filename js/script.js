function typeText(el, text, speed = 100, callback) {
  let i = 0;
  function typeChar() {
    if (i < text.length) {
      el.textContent += text[i];
      i++;
      setTimeout(typeChar, speed);
    } else if (callback) {
      callback();
    }
  }
  typeChar();
}

window.addEventListener('DOMContentLoaded', () => {
  const overlay = document.getElementById('image-overlay');
  const hoverImg = document.getElementById('org-hover-img');
  const closeBtn = document.getElementById('close-btn');

  const cmd1 = document.getElementById('cmd1');
  const out1 = document.getElementById('out1');
  const cmd2 = document.getElementById('cmd2');
  const out2 = document.getElementById('out2');
  const cursor = document.getElementById('cursor');

  if (cursor) cursor.style.display = 'none';

  typeText(cmd1, 'whoami', 120, () => {
    typeText(out1, 'scrimz', 120, () => {
      typeText(cmd2, 'uptime --pretty', 120, () => {
        typeText(out2, 'up 6 years', 120, () => {
          if (cursor) cursor.style.display = 'inline-block'; 
        });
      });
    });
  });

  const certTrigger = document.querySelector('.cert-trigger');
  if (certTrigger) {
    certTrigger.addEventListener('mouseenter', () => {
      setTimeout(() => {
        const imgSrc = certTrigger.getAttribute('data-img');
        hoverImg.src = imgSrc;
        overlay.classList.add('show');
        document.body.style.overflow = 'hidden';
      }, 100);
    });
  }
  
  const sections = document.querySelectorAll('section');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        const children = entry.target.querySelectorAll(
          '.skill, .course-card, .org-tile, .writeup-card, .profile-card, .experience-item, .education-item'
        );
        children.forEach((el, i) => {
          el.style.setProperty('--i', i * 0.1 + 's'); 
        });
      } else {
        entry.target.classList.remove('visible');
      }
    });
  }, { threshold: 0.15 });
  
  sections.forEach(section => observer.observe(section));

  const orgTiles = document.querySelectorAll('.org-tile');

  orgTiles.forEach(tile => {
    const imgSrc = tile.getAttribute('data-img');

    tile.addEventListener('mouseenter', () => {
      if (overlay.classList.contains('show')) return;
      setTimeout(() => {
        if (tile.matches(':hover')) {
          hoverImg.src = imgSrc;
          overlay.classList.add('show');
          document.body.style.overflow = 'hidden'; 
        }
      }, 250); 
    });
  });

  const closeOverlay = () => {
    overlay.classList.remove('show');
    document.body.style.overflow = 'auto'; 
    setTimeout(() => {
      if (!overlay.classList.contains('show')) {
        hoverImg.src = '';
      }
    }, 300);
  };

  if (closeBtn) closeBtn.addEventListener('click', closeOverlay);

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeOverlay();
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('show')) {
      closeOverlay();
    }
  });
});
