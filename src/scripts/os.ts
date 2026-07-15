import { typedRoles, bootLines, companionMessages, companionQuips, KONAMI_CODE } from '../data/os';

const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

// --- Screen switching -------------------------------------------------

const screens = document.querySelectorAll<HTMLElement>('[data-screen]');
const dockButtons = document.querySelectorAll<HTMLButtonElement>('.os-dock-btn');
const companionBubble = document.getElementById('companion-bubble');
let activeScreen = 'home';
let quipIndex = -1;

function replayBubble() {
  if (!companionBubble) return;
  companionBubble.style.animation = 'none';
  void companionBubble.offsetWidth;
  companionBubble.style.animation = '';
}

function setCompanionMessage() {
  if (!companionBubble) return;
  companionBubble.textContent =
    quipIndex >= 0 ? companionQuips[quipIndex % companionQuips.length] : (companionMessages[activeScreen] ?? '');
  replayBubble();
}

function goToScreen(id: string) {
  if (id === activeScreen) return;
  activeScreen = id;
  quipIndex = -1;

  screens.forEach((screen) => {
    screen.hidden = screen.dataset.screen !== id;
  });
  dockButtons.forEach((btn) => {
    btn.setAttribute('aria-current', String(btn.dataset.screenTarget === id));
  });
  document.querySelector('.os-viewport')?.scrollTo(0, 0);
  setCompanionMessage();

  const dock = document.getElementById('os-dock');
  const menuToggle = document.getElementById('os-menu-toggle');
  dock?.classList.remove('is-open');
  menuToggle?.setAttribute('aria-expanded', 'false');
}

document.querySelectorAll<HTMLElement>('[data-screen-target]').forEach((el) => {
  el.addEventListener('click', () => {
    const target = el.dataset.screenTarget;
    if (target) goToScreen(target);
  });
});

// --- Mobile dock toggle -------------------------------------------------

const menuToggle = document.getElementById('os-menu-toggle');
const dock = document.getElementById('os-dock');
menuToggle?.addEventListener('click', () => {
  const isOpen = dock?.classList.toggle('is-open');
  menuToggle.setAttribute('aria-expanded', String(Boolean(isOpen)));
});

// --- Boot sequence -------------------------------------------------

const bootOverlay = document.getElementById('boot-overlay');
const bootLineEls = document.querySelectorAll<HTMLElement>('[data-boot-line]');

function hideBoot() {
  bootOverlay?.remove();
}

if (reduceMotion || !bootOverlay) {
  hideBoot();
} else {
  bootLineEls.forEach((el, i) => {
    setTimeout(() => el.classList.add('is-shown'), 300 + i * 420);
  });
  const totalMs = 300 + bootLines.length * 420 + 600;
  const bootTimer = setTimeout(hideBoot, totalMs);
  bootOverlay.addEventListener('click', () => {
    clearTimeout(bootTimer);
    hideBoot();
  });
}

// --- Typewriter -------------------------------------------------

const typedEl = document.querySelector<HTMLElement>('[data-typed-role]');

if (typedEl) {
  if (reduceMotion) {
    typedEl.textContent = typedRoles[0];
  } else {
    let roleIndex = 0;
    let pos = 0;
    let dir = 1;
    let pause = 0;

    setInterval(() => {
      const role = typedRoles[roleIndex];
      if (pause > 0) {
        pause--;
        return;
      }
      pos += dir;
      if (pos >= role.length) {
        pos = role.length;
        dir = -1;
        pause = 34;
      }
      if (pos <= 0 && dir === -1) {
        pos = 0;
        dir = 1;
        roleIndex = (roleIndex + 1) % typedRoles.length;
        pause = 8;
      }
      typedEl.textContent = role.slice(0, pos);
    }, 55);
  }
}

// --- Live clock -------------------------------------------------

const clockEl = document.querySelector<HTMLElement>('[data-clock]');
if (clockEl) {
  const tick = () => {
    clockEl.textContent = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  };
  tick();
  setInterval(tick, 1000);
}

// --- Cursor glow -------------------------------------------------

const glowEl = document.querySelector<HTMLElement>('.os-glow');
if (glowEl && !reduceMotion) {
  window.addEventListener('mousemove', (e) => {
    glowEl.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
  });
}

// --- Konami code -------------------------------------------------

const glitchOverlay = document.getElementById('glitch-overlay');
let keySeq: string[] = [];
let glitchTimer: ReturnType<typeof setTimeout> | undefined;

window.addEventListener('keydown', (e) => {
  keySeq.push(e.key.length === 1 ? e.key.toLowerCase() : e.key);
  keySeq = keySeq.slice(-KONAMI_CODE.length);
  if (KONAMI_CODE.every((k, i) => keySeq[i] === k)) {
    keySeq = [];
    if (glitchOverlay) {
      glitchOverlay.hidden = false;
      clearTimeout(glitchTimer);
      glitchTimer = setTimeout(() => {
        glitchOverlay.hidden = true;
      }, 3200);
    }
  }
});

// --- Companion -------------------------------------------------

const companionAvatar = document.getElementById('companion-avatar');
companionAvatar?.addEventListener('click', () => {
  quipIndex++;
  setCompanionMessage();
});

setCompanionMessage();
