// Website der Freiwilligen Feuerwehr Steinabrueckl

(function () {
  var VEHICLES = [
    {
      id: 1,
      name: 'Löschfahrzeug LF 10',
      year: 2018,
      power: '250 PS',
      water: '2500 L',
      purpose: 'Brandbekämpfung',
      image: 'assets/images/fahrzeuge/fahrzeug1.jpg',
    },
    {
      id: 2,
      name: 'Drehleiter DL 30',
      year: 2015,
      power: '280 PS',
      water: '1500 L',
      purpose: 'Höhenrettung',
      image: 'assets/images/fahrzeuge/fahrzeug2.jpg',
    },
    {
      id: 3,
      name: 'Tanklöschfahrzeug TLF',
      year: 2020,
      power: '320 PS',
      water: '4000 L',
      purpose: 'Großflächenbrände',
      image: 'assets/images/fahrzeuge/fahrzeug3.jpg',
    },
    {
      id: 4,
      name: 'Mannschaftstransport MTW',
      year: 2019,
      power: '190 PS',
      water: '400 L',
      purpose: 'Personentransport',
      image: 'assets/images/fahrzeuge/fahrzeug4.jpg',
    },
    {
      id: 5,
      name: 'Rüstwagen RW',
      year: 2017,
      power: '260 PS',
      water: '800 L',
      purpose: 'Technische Hilfe',
      image: 'assets/images/fahrzeuge/fahrzeug5.jpg',
    },
    {
      id: 6,
      name: 'Einsatzleitwagen ELW',
      year: 2021,
      power: '210 PS',
      water: '600 L',
      purpose: 'Einsatzleitung',
      image: 'assets/images/fahrzeuge/fahrzeug6.jpg',
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

  function navigateTo(pageName) {
    var targetPage = PAGE_IDS.indexOf(pageName) !== -1 ? pageName : 'home';

    closeMenu();
    getPages().forEach(function (page) {
      page.classList.add('hidden');
    });

    var selectedPage = getElement('page-' + targetPage);
    if (selectedPage) {
      selectedPage.classList.remove('hidden');
      state.currentPage = targetPage;
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
    imageWrap.appendChild(image);

    var content = document.createElement('div');
    content.className = 'vehicle-content';

    var name = document.createElement('h3');
    name.className = 'vehicle-name';
    name.textContent = vehicle.name;
    content.appendChild(name);

    var specs = document.createElement('div');
    specs.className = 'vehicle-specs';
    specs.appendChild(createVehicleSpec('Baujahr', vehicle.year));
    specs.appendChild(createVehicleSpec('Leistung', vehicle.power));
    specs.appendChild(createVehicleSpec('Wasser', vehicle.water));
    specs.appendChild(createVehicleSpec('Einsatzzweck', vehicle.purpose));

    content.appendChild(specs);
    box.appendChild(imageWrap);
    box.appendChild(content);

    return box;
  }

  function renderVehicles() {
    var grid = getElement('vehicle-grid');

    if (!grid) {
      return;
    }

    grid.innerHTML = '';
    VEHICLES.forEach(function (vehicle) {
      grid.appendChild(createVehicleCard(vehicle));
    });
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
    bindKeyboardShortcuts();
  }

  function init() {
    initTypingText();
    initNavigation();
    renderVehicles();
    navigateTo(state.currentPage);
  }

  document.addEventListener('DOMContentLoaded', init);
})();
