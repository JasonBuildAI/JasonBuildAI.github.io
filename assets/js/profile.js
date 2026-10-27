(function () {
  'use strict';

  function initMenu() {
    var toggle = document.querySelector('[data-menu-toggle]');
    var nav = document.getElementById('site-nav');

    if (!toggle || !nav) return;

    function setOpen(open) {
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? '关闭导航' : '打开导航');
      nav.classList.toggle('is-open', open);
    }

    toggle.addEventListener('click', function () {
      setOpen(toggle.getAttribute('aria-expanded') !== 'true');
    });

    nav.addEventListener('click', function (event) {
      if (event.target.closest('a')) setOpen(false);
    });

    document.addEventListener('click', function (event) {
      if (toggle.getAttribute('aria-expanded') !== 'true') return;
      if (nav.contains(event.target) || toggle.contains(event.target)) return;
      setOpen(false);
    });

    document.addEventListener('keydown', function (event) {
      if (event.key !== 'Escape' || toggle.getAttribute('aria-expanded') !== 'true') return;
      setOpen(false);
      toggle.focus();
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth > 840) setOpen(false);
    });
  }

  function initSectionNavigation() {
    var links = Array.prototype.slice.call(document.querySelectorAll('.site-nav a[href^="#"]'));
    if (!links.length) return;

    var sections = links.map(function (link) {
      return document.querySelector(link.getAttribute('href'));
    }).filter(Boolean);

    if (!sections.length) return;

    var ticking = false;

    function setCurrent(sectionId) {
      links.forEach(function (link) {
        if (link.getAttribute('href') === '#' + sectionId) {
          link.setAttribute('aria-current', 'location');
        } else {
          link.removeAttribute('aria-current');
        }
      });
    }

    function update() {
      var marker = Math.min(window.innerHeight * 0.26, 190);
      var current = sections[0];

      sections.forEach(function (section) {
        if (section.getBoundingClientRect().top <= marker) current = section;
      });

      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) {
        current = sections[sections.length - 1];
      }

      setCurrent(current.id);
      ticking = false;
    }

    function requestUpdate() {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(update);
    }

    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);
    update();
  }

  function copyText(value) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(value);
    }

    return new Promise(function (resolve, reject) {
      var input = document.createElement('textarea');
      input.value = value;
      input.setAttribute('readonly', '');
      input.style.position = 'fixed';
      input.style.top = '-1000px';
      input.style.opacity = '0';
      document.body.appendChild(input);
      input.select();

      try {
        var copied = document.execCommand('copy');
        document.body.removeChild(input);
        copied ? resolve() : reject(new Error('Copy command failed'));
      } catch (error) {
        document.body.removeChild(input);
        reject(error);
      }
    });
  }

  function initCopyButtons() {
    var buttons = Array.prototype.slice.call(document.querySelectorAll('[data-copy-text]'));
    var status = document.querySelector('[data-copy-status]');
    if (!buttons.length) return;

    buttons.forEach(function (button) {
      var original = button.textContent;
      var resetTimer;

      button.addEventListener('click', function () {
        var value = button.getAttribute('data-copy-text');

        copyText(value).then(function () {
          window.clearTimeout(resetTimer);
          button.textContent = '已复制';
          button.setAttribute('data-copied', 'true');
          if (status) status.textContent = '微信号已复制到剪贴板';
          resetTimer = window.setTimeout(function () {
            button.textContent = original;
            button.removeAttribute('data-copied');
          }, 1800);
        }).catch(function () {
          button.textContent = '复制失败';
          if (status) status.textContent = '无法自动复制，请手动选择微信号';
          window.setTimeout(function () {
            button.textContent = original;
          }, 1800);
        });
      });
    });
  }

  function initYear() {
    var target = document.querySelector('[data-current-year]');
    if (target) target.textContent = String(new Date().getFullYear());
  }

  initMenu();
  initSectionNavigation();
  initCopyButtons();
  initYear();
}());
