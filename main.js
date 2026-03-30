/*
╔════════════════════════════════════════════════════════════╗
║                                                            ║
║          Freiwillige Feuerwehr Steinabrückl               ║
║                  Website – Notruf 122                     ║
║                                                            ║
╚════════════════════════════════════════════════════════════╝
*/

// Website der Freiwilligen Feuerwehr Steinabrueckl

(function () {
  // Fuhrpark-Daten
  var VEHICLES = [
    {
      id: 1,
      name: 'Rüstlöschfahrzeug',
      shortName: 'RLFA 2400',
      image: 'assets/images/fuhrpark/RLFA2400.png',
      fullDetails: {
        motor: 'Steyr MAN LE 18.280 mit 279 PS',
        aufbau: 'Rosenbauer',
        baujahr: '2006',
        besatzung: '1:8 (9 Personen)',
        beladung: [
          'Branddienstausrüstung inkl. 3 Atemschutzgeräte',
          'Ausrüstung für technische Einsätze inkl. hydraulischen Rettungssatz',
          'Schadstoffausrüstung',
          'Hochleistungslüfter (elektrisch betrieben)',
          'Wärmebildkamera',
          'Seilwinde',
          '14 kVA tragbarer Stromerzeuger',
        ],
      },
    },
    {
      id: 2,
      name: 'Kleinlöschfahrzeug',
      shortName: 'KLF',
      image: 'assets/images/fuhrpark/KLF.png',
      fullDetails: {
        motor: 'Mercedes Sprinter 314/35 mit 143 PS',
        aufbau: 'Rosenbauer',
        baujahr: '1996',
        besatzung: '1:8 (9 Personen)',
        beladung: [
          'Branddienstausrüstung inkl. 3 Atemschutzgeräte',
          'Tragkraftspritze',
          'Rosenbauer Fox mit 1.200 Liter Leistung',
        ],
      },
    },
    {
      id: 3,
      name: 'Hilfeleistungsfahrzeug',
      shortName: 'HLFA 1-VF',
      image: 'assets/images/fuhrpark/HLFA1-VF.png',
      fullDetails: {
        motor: 'Mercedes Sprinter 519 CDI 4x4 mit 191 PS',
        aufbau: 'Rosenbauer',
        baujahr: '2022',
        besatzung: '1:5 (6 Personen)',
        beladung: [
          'Wechselbare Rollcontainer:',
          '  • Saugstelle',
          '  • Löschangriff',
          '  • Strom',
          '  • Schlauchleitung',
          '  • Technischer Einsatz',
          '  • Auspumparbeiten',
          '  • Belüftung',
          '  • Tankstelle',
          '  • Allzweck',
        ],
      },
    },
    {
      id: 4,
      name: 'Mannschaftstransportfahrzeug',
      shortName: 'MTFA',
      image: 'assets/images/fuhrpark/MTFA.png',
      fullDetails: {
        motor: 'Volkswagen T6 4Motion mit 150 PS',
        aufbau: 'Volkswagen',
        baujahr: '2018',
        besatzung: '1:8 (9 Personen)',
        beladung: ['Pflichtbeladung', 'Verkehrsleiteinrichtung'],
      },
    },
    {
      id: 5,
      name: 'Kommandantenfahrzeug',
      shortName: 'KDTF',
      image: 'assets/images/fuhrpark/KDTF.png',
      fullDetails: {
        motor: 'Ford Kuga Titanium 4WD mit 150 PS',
        aufbau: 'Eigenbau',
        baujahr: '2015, Umbau 2021',
        besatzung: '1:4 (5 Personen)',
        beladung: [
          'Pflichtbeladung',
          'Verkehrsleiteinrichtung',
          'Atemschutzgerät',
          'Führungsunterlagen',
        ],
      },
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
    vehicleModalOpen: false,
    selectedVehicleId: null,
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

  function createVehicleCard(vehicle) {
    var box = document.createElement('article');
    box.className = 'vehicle-box';
    box.setAttribute('data-vehicle-id', vehicle.id);
    box.setAttribute('data-vehicle-name', vehicle.name);
    box.setAttribute('data-vehicle-type', vehicle.shortName);

    var imageWrap = document.createElement('div');
    imageWrap.className = 'vehicle-image-wrap';

    var image = document.createElement('img');
    image.src = vehicle.image;
    image.alt = vehicle.name + ' - Feuerwehr Steinabrückl';
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

    var moreButton = document.createElement('button');
    moreButton.className = 'vehicle-more-btn';
    moreButton.textContent = 'Mehr Infos';
    moreButton.setAttribute(
      'aria-label',
      'Mehr Informationen zu ' + vehicle.name,
    );
    moreButton.addEventListener('click', function (event) {
      event.stopPropagation();
      openVehicleModal(vehicle.id);
    });
    content.appendChild(moreButton);

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
    var menuLinks = document.querySelectorAll('.menu-link, .footer-link');

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

      if (event.key === 'Escape' && state.vehicleModalOpen) {
        closeVehicleModal();
      }
    });
  }

  function closeVehicleModal() {
    var modal = getElement('vehicle-modal');
    var content = getElement('vehicle-modal-content');

    if (!modal) {
      return;
    }

    state.vehicleModalOpen = false;
    state.selectedVehicleId = null;

    document.body.style.overflow = '';

    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');

    if (content) {
      content.innerHTML = '';
    }

    setTimeout(function () {
      modal.style.display = 'none';
    }, 240);
  }

  function createVehicleDetailView(vehicle) {
    var container = document.createElement('div');
    container.className = 'modal-vehicle-content';

    var img = document.createElement('img');
    img.src = vehicle.image;
    img.alt =
      vehicle.name + ' (' + vehicle.shortName + ') - Feuerwehr Steinabrückl';
    img.className = 'modal-vehicle-image';
    img.loading = 'lazy';
    img.decoding = 'async';
    container.appendChild(img);

    var header = document.createElement('div');
    header.className = 'modal-vehicle-header';

    var name = document.createElement('h2');
    name.id = 'modal-vehicle-name';
    name.textContent = vehicle.name;
    header.appendChild(name);

    if (vehicle.shortName) {
      var shortName = document.createElement('p');
      shortName.className = 'modal-vehicle-shortname';
      shortName.textContent = vehicle.shortName;
      header.appendChild(shortName);
    }

    container.appendChild(header);

    if (vehicle.fullDetails) {
      var details = vehicle.fullDetails;

      var techSection = document.createElement('div');
      techSection.className = 'modal-vehicle-section';

      var techTitle = document.createElement('h3');
      techTitle.textContent = 'Fahrzeugdaten';
      techSection.appendChild(techTitle);

      var specsGrid = document.createElement('div');
      specsGrid.className = 'modal-specs-grid';

      var specs = [
        { label: 'Motor / Antrieb', value: details.motor },
        { label: 'Aufbau', value: details.aufbau },
        { label: 'Baujahr', value: details.baujahr },
        { label: 'Besatzung', value: details.besatzung },
      ];

      specs.forEach(function (spec) {
        var item = document.createElement('div');
        item.className = 'modal-spec-item';

        var label = document.createElement('span');
        label.className = 'modal-spec-label';
        label.textContent = spec.label;

        var value = document.createElement('span');
        value.className = 'modal-spec-value';
        value.textContent = spec.value;

        item.appendChild(label);
        item.appendChild(value);
        specsGrid.appendChild(item);
      });

      techSection.appendChild(specsGrid);
      container.appendChild(techSection);
    }

    if (vehicle.fullDetails && vehicle.fullDetails.beladung) {
      var equipmentSection = document.createElement('div');
      equipmentSection.className = 'modal-vehicle-section';

      var equipTitle = document.createElement('h3');
      equipTitle.textContent = 'Beladung';
      equipmentSection.appendChild(equipTitle);

      var equipList = document.createElement('div');
      equipList.className = 'modal-equipment-list';

      vehicle.fullDetails.beladung.forEach(function (item) {
        var listItem = document.createElement('div');

        if (item.startsWith('  •')) {
          listItem.className = 'modal-equipment-item';
          listItem.textContent = item.replace('  • ', '');
        } else if (item.endsWith(':')) {
          listItem.className = 'modal-equipment-item subtitle';
          listItem.textContent = item;
        } else {
          listItem.className = 'modal-equipment-item';
          listItem.textContent = item;
        }

        equipList.appendChild(listItem);
      });

      equipmentSection.appendChild(equipList);
      container.appendChild(equipmentSection);
    }

    return container;
  }

  function openVehicleModal(vehicleId) {
    var vehicle = VEHICLES.find(function (v) {
      return v.id === vehicleId;
    });

    if (!vehicle) {
      return;
    }

    var modal = getElement('vehicle-modal');
    var content = getElement('vehicle-modal-content');

    if (!modal || !content) {
      return;
    }

    state.vehicleModalOpen = true;
    state.selectedVehicleId = vehicleId;

    document.body.style.overflow = 'hidden';

    content.innerHTML = '';
    content.appendChild(createVehicleDetailView(vehicle));

    modal.style.display = 'flex';
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
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

  function initVehicleModal() {
    bindClick('vehicle-modal-close', closeVehicleModal);

    var modal = getElement('vehicle-modal');
    var modalPanel = getElement('vehicle-modal-panel');

    if (modal) {
      modal.addEventListener('click', function (event) {
        if (
          event.target === modal ||
          event.target.classList.contains('vehicle-modal-overlay')
        ) {
          closeVehicleModal();
        }
      });
    }

    if (modalPanel) {
      modalPanel.addEventListener('click', function (event) {
        event.stopPropagation();
      });
    }
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
    initVehicleModal();
    navigateTo(getPageFromHash() || state.currentPage, { updateHash: false });

    window.requestAnimationFrame(function () {
      window.scrollTo(0, 0);
    });
  }

  document.addEventListener('DOMContentLoaded', init);
})();
