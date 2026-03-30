// Website der Freiwilligen Feuerwehr Steinabrueckl

(function () {
  // Fuhrpark-Daten: pro Fahrzeug können beliebige Detail-Felder eingetragen werden.
  var VEHICLES = [
    {
      id: 1,
      name: 'Rüstlöschfahrzeug',
      shortName: 'RLFA 2000',
      image: 'assets/images/fuhrpark/RLFA2000.png',
      details: [
        { label: 'Typ', value: 'Rüstlöschfahrzeug' },
        { label: 'Wasser', value: '2400 L' },
      ],
    },
    {
      id: 2,
      name: 'Hilfeleistungsfahrzeug',
      shortName: 'HLFA 1 VF',
      image: 'assets/images/fuhrpark/HLFA1-VF.png',
      details: [
        { label: 'Typ', value: 'Hilfeleistungsfahrzeug' },
        { label: 'Beladung', value: '' },
      ],
    },
    {
      id: 3,
      name: 'Kleinlöschfahrzeug',
      shortName: 'KLF',
      image: 'assets/images/fuhrpark/KLF.png',
      details: [{ label: 'Typ', value: 'Kleinlöschfahrzeug' }],
    },
    {
      id: 4,
      name: 'Mannschaftstransportfahrzeug',
      shortName: 'MTFA',
      image: 'assets/images/fuhrpark/MTFA.png',
      details: [
        { label: 'Typ', value: 'Mannschaftstransportfahrzeug' },
        { label: 'Einsatz', value: 'Transport' },
      ],
    },
    {
      id: 5,
      name: 'Kommandofahrzeug',
      shortName: 'KDTF',
      image: 'assets/images/fuhrpark/KDTF.png',
      details: [{ label: 'Typ', value: 'Kommandofahrzeug' }],
    },
  ];

  var SLOGANS = [
    'Im Einsatz für unser Zuhause.',
    'Allzeit bereit.',
    '365 Tage im Jahr.',
    'Schnell. Verlässlich.',
    'Für unsere Bevölkerung.',
  ];

  var PAGE_IDS = ['home', 'team', 'fleet'];
  var state = {
    menuOpen: false,
    currentPage: 'home',
  };

  function getElement(id) {
    return document.getElementById(id);
  }

  function getPages() {
    return document.querySelectorAll('.page-content');
  }

  function setMenuOpen(isOpen) {
    var overlay = getElement('menu-overlay');
    var hamburger = getElement('hamburger-btn');

    state.menuOpen = isOpen;

    if (!overlay || !hamburger) {
      return;
    }

    overlay.classList.toggle('open', isOpen);
    document.body.classList.toggle('menu-open', isOpen);
    hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  }

  function closeMenu() {
    setMenuOpen(false);
  }

  function toggleMenu() {
    setMenuOpen(!state.menuOpen);
  }

  function getPageFromHash() {
    var rawHash = (window.location.hash || '').replace('#', '').trim();
    return PAGE_IDS.indexOf(rawHash) !== -1 ? rawHash : null;
  }

  function setHashForPage(pageName) {
    var targetHash = '#' + pageName;

    if (window.location.hash === targetHash) {
      return;
    }

    if (pageName === 'home') {
      window.history.replaceState(null, '', window.location.pathname);
      return;
    }

    window.history.pushState(null, '', targetHash);
  }

  function navigateTo(pageName, options) {
    var targetPage = PAGE_IDS.indexOf(pageName) !== -1 ? pageName : 'home';
    var routeOptions = options || {};
    var shouldUpdateHash = routeOptions.updateHash !== false;

    closeMenu();
    getPages().forEach(function (page) {
      page.classList.add('hidden');
    });

    var selectedPage = getElement('page-' + targetPage);
    if (selectedPage) {
      selectedPage.classList.remove('hidden');
      state.currentPage = targetPage;

      if (shouldUpdateHash) {
        setHashForPage(targetPage);
      }
    }
  }

  function createVehicleSpec(labelText, valueText) {
    var specItem = document.createElement('div');
    specItem.className = 'vehicle-spec';

    var label = document.createElement('span');
    label.className = 'vehicle-spec-label';
    label.textContent = labelText;

    var value = document.createElement('span');
    value.className = 'vehicle-spec-value';
    value.textContent = valueText;

    specItem.appendChild(label);
    specItem.appendChild(value);

    return specItem;
  }

  function createVehicleCard(vehicle) {
    var box = document.createElement('div');
    box.className = 'vehicle-box';

    var imageWrap = document.createElement('div');
    imageWrap.className = 'vehicle-image-wrap';

    var image = document.createElement('img');
    image.src = vehicle.image;
    image.alt = vehicle.name;
    image.loading = 'lazy';
    image.decoding = 'async';
    image.addEventListener('error', function () {
      image.remove();

      var fallback = document.createElement('span');
      fallback.className = 'vehicle-image-fallback';
      fallback.textContent = 'Kein Bild verfügbar';
      imageWrap.appendChild(fallback);
    });
    imageWrap.appendChild(image);

    var content = document.createElement('div');
    content.className = 'vehicle-content';

    var name = document.createElement('h3');
    name.className = 'vehicle-name';
    name.textContent = vehicle.name;
    content.appendChild(name);

    if (vehicle.shortName) {
      var shortName = document.createElement('p');
      shortName.className = 'vehicle-short';
      shortName.textContent = vehicle.shortName;
      content.appendChild(shortName);
    }

    var specs = document.createElement('div');
    specs.className = 'vehicle-specs';
    var hasDetails = false;

    (vehicle.details || []).forEach(function (detail) {
      if (!detail || !detail.label || !detail.value) {
        return;
      }

      specs.appendChild(createVehicleSpec(detail.label, detail.value));
      hasDetails = true;
    });

    if (!hasDetails) {
      var empty = document.createElement('p');
      empty.className = 'vehicle-empty';
      empty.textContent = 'Details folgen';
      content.appendChild(empty);
    } else {
      content.appendChild(specs);
    }

    box.appendChild(imageWrap);
    box.appendChild(content);

    return box;
  }

  function renderVehicles() {
    var grid = getElement('vehicle-grid');
    var fragment = document.createDocumentFragment();

    if (!grid) {
      return;
    }

    grid.innerHTML = '';
    VEHICLES.forEach(function (vehicle) {
      fragment.appendChild(createVehicleCard(vehicle));
    });

    grid.appendChild(fragment);
  }

  function initTypingText() {
    var target = getElement('typing-text');
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

    if (!target) {
      return;
    }

    function sleep(ms, callback) {
      window.setTimeout(callback, ms);
    }

    function step() {
      var phrase = SLOGANS[phraseIndex];

      if (isDeleting) {
        charIndex = Math.max(0, charIndex - 1);
        target.textContent = phrase.slice(0, charIndex);

        if (charIndex === 0) {
          isDeleting = false;
          phraseIndex = (phraseIndex + 1) % SLOGANS.length;
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
      target.textContent = SLOGANS[0];
      window.setInterval(function () {
        phraseIndex = (phraseIndex + 1) % SLOGANS.length;
        target.textContent = SLOGANS[phraseIndex];
      }, 2600);
      return;
    }

    target.textContent = '';
    step();
  }

  function bindClick(id, handler) {
    var element = getElement(id);

    if (element) {
      element.addEventListener('click', handler);
    }
  }

  function bindMenuLinks() {
    var menuLinks = document.querySelectorAll('.menu-link');

    menuLinks.forEach(function (link) {
      link.addEventListener('click', function (event) {
        event.preventDefault();
        navigateTo(link.getAttribute('data-page'));
      });
    });
  }

  function bindHashRouting() {
    window.addEventListener('hashchange', function () {
      var pageFromHash = getPageFromHash() || 'home';
      navigateTo(pageFromHash, { updateHash: false });
    });
  }

  function bindKeyboardShortcuts() {
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && state.menuOpen) {
        closeMenu();
      }
    });
  }

  function initNavigation() {
    bindClick('brand-home', function () {
      navigateTo('home');
    });
    bindClick('hamburger-btn', toggleMenu);
    bindClick('menu-close', closeMenu);
    bindMenuLinks();
    bindHashRouting();
    bindKeyboardShortcuts();
  }

  function resetScrollPosition() {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    window.scrollTo(0, 0);
  }

  function init() {
    resetScrollPosition();
    initTypingText();
    initNavigation();
    renderVehicles();
    navigateTo(getPageFromHash() || state.currentPage, { updateHash: false });

    window.requestAnimationFrame(function () {
      window.scrollTo(0, 0);
    });
  }

  document.addEventListener('DOMContentLoaded', init);
})();
