/* Independent, progressively enhanced interactions for the personal site. */
(function themeController() {
  'use strict';
  var root = document.documentElement;
  var button = document.querySelector('[data-theme-toggle]');
  var meta = document.querySelector('meta[name="theme-color"]');
  if (!button) return;

  var colors = { dark: '#07120f', light: '#f5f2ea' };

  function currentTheme() {
    return root.dataset.theme === 'light' ? 'light' : 'dark';
  }

  function sync(theme) {
    root.dataset.theme = theme;
    root.style.colorScheme = theme;
    if (meta) meta.setAttribute('content', colors[theme]);
    var target = theme === 'dark' ? '浅色' : '深色';
    button.setAttribute('aria-label', '切换到' + target + '主题');
    button.setAttribute('title', '切换到' + target + '主题');
  }

  function save(theme) {
    try {
      localStorage.setItem('jc-theme', theme);
    } catch (error) {
      /* Storage can be unavailable; the visual switch still works for this visit. */
    }
  }

  sync(currentTheme());
  button.addEventListener('click', function () {
    var next = currentTheme() === 'light' ? 'dark' : 'light';
    sync(next);
    save(next);
  });
})();

(function mobileNavigation() {
  'use strict';
  var header = document.getElementById('site-header');
  var nav = document.getElementById('site-nav');
  var button = document.getElementById('menu-button');
  if (!header || !nav || !button) return;
  var desktop = window.matchMedia('(max-width: 980px)');

  function setOpen(open) {
    nav.classList.toggle('is-open', open);
    button.setAttribute('aria-expanded', String(open));
    button.setAttribute('aria-label', open ? '关闭导航' : '打开导航');
  }

  button.addEventListener('click', function () {
    setOpen(button.getAttribute('aria-expanded') !== 'true');
  });
  nav.addEventListener('click', function (event) {
    if (event.target.closest('a')) setOpen(false);
  });
  document.addEventListener('click', function (event) {
    if (!nav.classList.contains('is-open')) return;
    if (!header.contains(event.target)) setOpen(false);
  });
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && nav.classList.contains('is-open')) {
      setOpen(false);
      button.focus();
    }
  });
  desktop.addEventListener('change', function (event) {
    if (!event.matches) setOpen(false);
  });
})();

(function scrollChrome() {
  'use strict';
  var header = document.getElementById('site-header');
  var progress = document.getElementById('scroll-progress');
  var frame = 0;

  function render() {
    frame = 0;
    var top = window.scrollY || document.documentElement.scrollTop;
    if (header) header.classList.toggle('is-scrolled', top > 12);
    if (progress) {
      var range = document.documentElement.scrollHeight - window.innerHeight;
      var ratio = range > 0 ? Math.min(1, Math.max(0, top / range)) : 0;
      progress.style.transform = 'scaleX(' + ratio.toFixed(4) + ')';
    }
  }

  function schedule() {
    if (frame) return;
    frame = window.requestAnimationFrame(render);
  }

  render();
  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', schedule, { passive: true });
})();

(function sectionNavigation() {
  'use strict';
  var links = Array.prototype.slice.call(document.querySelectorAll('.site-nav a[href^="#"]'));
  if (!links.length || !('IntersectionObserver' in window)) return;

  var linkById = {};
  var targets = [];
  links.forEach(function (link) {
    var id = link.getAttribute('href').slice(1);
    var section = document.getElementById(id);
    if (!section) return;
    linkById[id] = link;
    targets.push(section);
  });
  if (!targets.length) return;

  function activate(id) {
    links.forEach(function (link) {
      var active = link === linkById[id];
      link.classList.toggle('is-active', active);
      if (active) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  }

  var visibleIds = new Set();

  function updateActive() {
    var visible = targets.filter(function (target) { return visibleIds.has(target.id); });
    if (!visible.length) {
      activate(null);
      return;
    }
    var readingLine = window.innerHeight * 0.33;
    visible.sort(function (a, b) {
      return Math.abs(a.getBoundingClientRect().top - readingLine) - Math.abs(b.getBoundingClientRect().top - readingLine);
    });
    activate(visible[0].id);
  }

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) visibleIds.add(entry.target.id);
      else visibleIds.delete(entry.target.id);
    });
    window.requestAnimationFrame(updateActive);
  }, {
    rootMargin: '-28% 0px -62% 0px',
    threshold: 0
  });

  targets.forEach(function (target) { observer.observe(target); });
})();

(function workFilter() {
  'use strict';
  var buttons = Array.prototype.slice.call(document.querySelectorAll('[data-filter]'));
  var items = Array.prototype.slice.call(document.querySelectorAll('.work-item[data-category]'));
  var status = document.getElementById('filter-status');
  if (!buttons.length || !items.length) return;

  function apply(button) {
    var filter = button.getAttribute('data-filter');
    var label = button.getAttribute('data-label') || filter;
    var shown = 0;

    buttons.forEach(function (item) {
      var pressed = item === button;
      item.classList.toggle('is-active', pressed);
      item.setAttribute('aria-pressed', String(pressed));
    });
    items.forEach(function (item) {
      var visible = filter === 'all' || item.getAttribute('data-category') === filter;
      item.hidden = !visible;
      if (visible) shown += 1;
    });

    if (status) {
      status.textContent = filter === 'all'
        ? shown + ' 个代表项目'
        : label + ' · ' + shown + ' / ' + items.length + ' 个代表项目';
    }
  }

  buttons.forEach(function (button) {
    button.addEventListener('click', function () { apply(button); });
  });
})();

(function copyContacts() {
  'use strict';
  var toast = document.getElementById('toast');
  var timer = 0;

  function showToast(message) {
    if (!toast) return;
    window.clearTimeout(timer);
    toast.textContent = message;
    toast.classList.add('is-visible');
    timer = window.setTimeout(function () {
      toast.classList.remove('is-visible');
    }, 2200);
  }

  function legacyCopy(text) {
    var area = document.createElement('textarea');
    area.value = text;
    area.setAttribute('readonly', '');
    area.style.position = 'fixed';
    area.style.top = '-1000px';
    area.style.opacity = '0';
    document.body.appendChild(area);
    area.select();
    var copied = false;
    try { copied = document.execCommand('copy'); } catch (error) { copied = false; }
    area.remove();
    return copied;
  }

  function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text).then(function () { return true; }, function () {
        return legacyCopy(text);
      });
    }
    return Promise.resolve(legacyCopy(text));
  }

  document.querySelectorAll('[data-copy]').forEach(function (button) {
    var label = button.textContent;
    var resetTimer = 0;
    button.addEventListener('click', function () {
      var text = button.getAttribute('data-copy');
      if (!text) return;
      copyText(text).then(function (success) {
        button.textContent = success ? '已复制' : '请手选';
        button.classList.toggle('is-done', success);
        showToast(success ? '已复制到剪贴板' : '复制失败，请手动选择文本');
        window.clearTimeout(resetTimer);
        resetTimer = window.setTimeout(function () {
          button.textContent = label;
          button.classList.remove('is-done');
        }, 1800);
      });
    });
  });
})();

(function currentYear() {
  'use strict';
  var year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());
})();
