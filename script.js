// === Visioneers Theory script.js ===
// Floating emoji generator + horizontal swipe/pan logic + wheel->horizontal conversion

document.addEventListener('DOMContentLoaded', () => {
  createFloatingEmojis();
  enableDragScroll('.members-gallery');
  enableDragScroll('.activities-gallery');
  enableDragScroll('.activities-gallery, .members-gallery, .activities-gallery .planet-row, .planet-row'); // extra selectors safe
  enableWheelToHorizontal('.activities-gallery');
  enableWheelToHorizontal('.members-gallery');
});

/* Create floating emojis across pages */
function createFloatingEmojis() {
  const emojiChoices = ['🌌','✨','🌙','💫','🪐','🚀','🌠','☄️'];
  // If the page already includes some .floating-emoji elements (inline), don't duplicate too many.
  const existing = document.querySelectorAll('.floating-emoji');
  const targetCount = Math.max(8, existing.length);
  // create additional to reach targetCount total
  for (let i = existing.length; i < targetCount; i++) {
    const el = document.createElement('div');
    el.className = 'floating-emoji';
    el.textContent = emojiChoices[Math.floor(Math.random() * emojiChoices.length)];
    el.style.left = Math.random()*90 + 'vw';
    el.style.top = Math.random()*80 + 'vh';
    el.style.fontSize = (12 + Math.random()*24) + 'px';
    el.style.opacity = 0.3 + Math.random()*0.6;
    el.style.animationDuration = (8 + Math.random()*8) + 's';
    document.body.appendChild(el);
    // reposition at each animation iteration for subtle randomness
    el.addEventListener('animationiteration', () => {
      el.style.left = Math.random()*90 + 'vw';
    });
  }
}

/* Enable mouse/touch drag-to-scroll on horizontal containers */
function enableDragScroll(selector) {
  document.querySelectorAll(selector).forEach(container => {
    let isDown = false, startX, scrollLeft;
    container.addEventListener('mousedown', e => {
      isDown = true;
      container.classList.add('dragging');
      startX = e.pageX - container.offsetLeft;
      scrollLeft = container.scrollLeft;
    });
    container.addEventListener('mouseleave', () => { isDown = false; container.classList.remove('dragging'); });
    container.addEventListener('mouseup', () => { isDown = false; container.classList.remove('dragging'); });
    container.addEventListener('mousemove', e => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - container.offsetLeft;
      const walk = (x - startX) * 1.8;
      container.scrollLeft = scrollLeft - walk;
    });

    // touch support
    let touchStartX=0, touchScrollLeft=0;
    container.addEventListener('touchstart', e => {
      touchStartX = e.touches[0].pageX - container.offsetLeft;
      touchScrollLeft = container.scrollLeft;
    }, {passive:true});
    container.addEventListener('touchmove', e => {
      const x = e.touches[0].pageX - container.offsetLeft;
      const walk = (x - touchStartX) * 1.6;
      container.scrollLeft = touchScrollLeft - walk;
    }, {passive:true});
  });
}

/* Convert vertical wheel to horizontal scroll for better UX on planet rows */
function enableWheelToHorizontal(selector) {
  document.querySelectorAll(selector).forEach(el => {
    el.addEventListener('wheel', (e) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault();
        el.scrollBy({ left: e.deltaY + e.deltaX, behavior: 'smooth' });
      }
    }, { passive:false });
  });
        }
