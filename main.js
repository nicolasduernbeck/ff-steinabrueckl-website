(function () {
  var target = document.getElementById('typing-text');

  if (!target) {
    return;
  }

  var slogans = [
    'Im Einsatz für unser Zuhause.',
    'Allzeit bereit.',
    '365 Tage im Jahr.',
    'Schnell. Verlässlich.',
    'Für unsere Bevölkerung.',
  ];

  var phraseIndex = 0;
  var charIndex = 0;
  var isDeleting = false;
  var typingDelay = 68;
  var deletingDelay = 42;
  var pauseAfterType = 1800;
  var pauseBeforeType = 360;

  var prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)',
  ).matches;

  function sleep(ms, callback) {
    window.setTimeout(callback, ms);
  }

  function step() {
    var phrase = slogans[phraseIndex];

    if (isDeleting) {
      charIndex = Math.max(0, charIndex - 1);
      target.textContent = phrase.slice(0, charIndex);

      if (charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % slogans.length;
        sleep(pauseBeforeType, step);
        return;
      }

      sleep(deletingDelay, step);
      return;
    }

    charIndex = Math.min(phrase.length, charIndex + 1);
    target.textContent = phrase.slice(0, charIndex);

    if (charIndex === phrase.length) {
      isDeleting = true;
      sleep(pauseAfterType, step);
      return;
    }

    sleep(typingDelay, step);
  }

  if (prefersReducedMotion) {
    target.textContent = slogans[0];
    window.setInterval(function () {
      phraseIndex = (phraseIndex + 1) % slogans.length;
      target.textContent = slogans[phraseIndex];
    }, 2600);
    return;
  }

  target.textContent = '';
  step();
})();
