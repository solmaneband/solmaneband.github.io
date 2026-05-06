(() => {
  const cursorAsset = 'assets/apple-touch-icon.png';
  const prefersFinePointer = window.matchMedia('(pointer: fine)').matches;

  if (!prefersFinePointer) {
    return;
  }

  const start = () => {
    if (!document.body || document.documentElement.classList.contains('cursor-enabled')) {
      return;
    }

    document.documentElement.classList.add('cursor-enabled');

    const cursor = document.createElement('div');
    cursor.className = 'star-cursor';
    cursor.setAttribute('aria-hidden', 'true');
    cursor.innerHTML = `<img src="${cursorAsset}" alt="">`;
    document.body.appendChild(cursor);

    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let currentX = targetX;
    let currentY = targetY;
    let angle = 0;
    let spinVelocity = 0;
    let clickPulseTimer = null;
    let visible = false;

    const updateVisibility = () => {
      if (!visible) {
        visible = true;
        cursor.classList.add('is-visible');
      }
    };

    const onPointerMove = (event) => {
      targetX = event.clientX;
      targetY = event.clientY;
      updateVisibility();
    };

    const onPointerEnter = (event) => {
      targetX = event.clientX;
      targetY = event.clientY;
      updateVisibility();
    };

    const onPointerLeave = () => {
      visible = false;
      cursor.classList.remove('is-visible');
    };

    const onMouseDown = (event) => {
      if (event.button !== 0) {
        return;
      }

      spinVelocity = Math.min(spinVelocity + 1.4, 24);
      cursor.classList.add('is-clicking');

      if (clickPulseTimer) {
        window.clearTimeout(clickPulseTimer);
      }

      clickPulseTimer = window.setTimeout(() => {
        cursor.classList.remove('is-clicking');
      }, 140);
    };

    const animate = () => {
      currentX += (targetX - currentX) * 0.22;
      currentY += (targetY - currentY) * 0.22;
      angle += spinVelocity;
      spinVelocity *= 0.985;

      if (Math.abs(spinVelocity) < 0.01) {
        spinVelocity = 0;
      }

      cursor.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) translate(-50%, -50%) rotate(${angle}deg)`;
      window.requestAnimationFrame(animate);
    };

    document.addEventListener('pointermove', onPointerMove, { passive: true });
    document.addEventListener('pointerenter', onPointerEnter, { passive: true });
    document.addEventListener('pointerleave', onPointerLeave, { passive: true });
    document.addEventListener('pointerdown', onMouseDown, { passive: true });

    window.requestAnimationFrame(animate);
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start, { once: true });
  } else {
    start();
  }
})();
