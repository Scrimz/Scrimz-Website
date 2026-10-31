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
  const overlayTitle = document.getElementById('overlay-title');
  const overlayDescription = document.getElementById('overlay-description');
  const overlayLink = document.getElementById('overlay-link');
  const closeBtn = document.getElementById('close-btn');

  const navLinks = document.querySelectorAll('.nav-link');
  const currentPath = window.location.pathname.replace(/\/+$/, '') || '/';

  navLinks.forEach(link => {
    const page = link.getAttribute('data-page');
    const isHome = page === 'home' && (currentPath === '/' || currentPath === '/home');
    const isBlog = page === 'blog' && currentPath === '/blog';

    if (isHome || isBlog) {
      link.classList.add('active');

      link.addEventListener('click', event => {
        event.preventDefault();
      });
    }
  });

  const cmd1 = document.getElementById('cmd1');
  const out1 = document.getElementById('out1');
  const cmd2 = document.getElementById('cmd2');
  const out2 = document.getElementById('out2');
  const cursor = document.getElementById('cursor');

  if (cursor) cursor.style.display = 'none';

  typeText(cmd1, 'whoami', 120, () => {
    typeText(out1, 'scrimz', 120, () => {
      typeText(cmd2, 'uptime', 120, () => {
        typeText(out2, 'up 6 years', 120, () => {
          if (cursor) cursor.style.display = 'inline-block';
        });
      });
    });
  });

  const openOverlay = (imgSrc, titleText = '', descriptionText = '', linkUrl = '') => {
    if (!imgSrc) return;

    hoverImg.src = imgSrc;

    if (overlayTitle) {
      overlayTitle.textContent = titleText;
      overlayTitle.style.display = titleText ? 'block' : 'none';
    }

    if (overlayDescription) {
      overlayDescription.textContent = descriptionText;
      overlayDescription.style.display = descriptionText ? 'block' : 'none';
    }

    if (overlayLink) {
      if (linkUrl) {
        overlayLink.href = linkUrl;
        overlayLink.style.display = 'inline-block';
      } else {
        overlayLink.removeAttribute('href');
        overlayLink.style.display = 'none';
      }
    }

    overlay.classList.add('show');
    document.body.style.overflow = 'hidden';
  };

  const certTrigger = document.querySelector('.cert-trigger');

  if (certTrigger) {
    const imgSrc = certTrigger.getAttribute('data-img');
    const titleText = certTrigger.getAttribute('data-title') || '';
    const descriptionText = certTrigger.getAttribute('data-description') || '';

    certTrigger.addEventListener('mouseenter', () => {
      setTimeout(() => {
        openOverlay(imgSrc, titleText, descriptionText, '');
      }, 100);
    });

    certTrigger.addEventListener('click', () => {
      openOverlay(imgSrc, titleText, descriptionText, '');
    });
  }

  const courseCards = document.querySelectorAll('.course-card');

  courseCards.forEach(card => {
    const imgSrc = card.getAttribute('data-img');
    const linkUrl = card.getAttribute('data-link') || '';

    if (imgSrc) {
      card.addEventListener('mouseenter', () => {
        if (overlay.classList.contains('show')) return;

        setTimeout(() => {
          if (card.matches(':hover')) {
            openOverlay(imgSrc, '', '', linkUrl);
          }
        }, 250);
      });

      card.addEventListener('click', () => {
        openOverlay(imgSrc, '', '', linkUrl);
      });
    }
  });

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
          openOverlay(imgSrc, '', '', '');
        }
      }, 250);
    });

    tile.addEventListener('click', () => {
      tile.style.transform = 'rotateY(180deg) scale(1.15)';
      tile.style.webkitTransform = 'rotateY(180deg) scale(1.15)';

      const innerText = tile.querySelector('span') || tile;

      if (innerText !== tile) {
        innerText.style.transform = 'rotateY(180deg)';
        innerText.style.webkitTransform = 'rotateY(180deg)';
      }

      setTimeout(() => {
        openOverlay(imgSrc, '', '', '');

        setTimeout(() => {
          tile.style.transform = '';
          tile.style.webkitTransform = '';

          if (innerText !== tile) {
            innerText.style.transform = '';
            innerText.style.webkitTransform = '';
          }
        }, 500);
      }, 400);
    });
  });

  const closeOverlay = () => {
    overlay.classList.remove('show');
    document.body.style.overflow = 'auto';

    setTimeout(() => {
      if (!overlay.classList.contains('show')) {
        hoverImg.src = '';

        if (overlayTitle) {
          overlayTitle.textContent = '';
          overlayTitle.style.display = 'none';
        }

        if (overlayDescription) {
          overlayDescription.textContent = '';
          overlayDescription.style.display = 'none';
        }

        if (overlayLink) {
          overlayLink.removeAttribute('href');
          overlayLink.style.display = 'none';
        }
      }
    }, 300);
  };

  if (closeBtn) {
    closeBtn.addEventListener('click', closeOverlay);
  }
});