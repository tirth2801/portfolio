const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
const targets = document.querySelectorAll<HTMLElement>('[data-reveal], [data-count-to]');

function animateCount(el: HTMLElement, target: number) {
  const duration = 1200;
  const start = performance.now();

  function tick(now: number) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = String(Math.round(target * eased));
    if (progress < 1) requestAnimationFrame(tick);
  }

  requestAnimationFrame(tick);
}

if (reduceMotion) {
  targets.forEach((el) => {
    el.classList.add('is-visible');
    const countTo = el.getAttribute('data-count-to');
    if (countTo) el.textContent = countTo;
  });
} else {
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const el = entry.target as HTMLElement;
        el.classList.add('is-visible');
        const countTo = el.getAttribute('data-count-to');
        if (countTo) animateCount(el, Number(countTo));
        observer.unobserve(el);
      }
    },
    { threshold: 0.2 },
  );

  targets.forEach((el) => observer.observe(el));
}
