(function () {
  'use strict';

  function initMenu() {
    var toggle = document.querySelector('[data-menu-toggle]');
    var nav = document.getElementById('site-nav');
    var isEnglish = document.documentElement.lang.indexOf('en') === 0;
    var openLabel = isEnglish ? 'Open navigation' : '打开导航';
    var closeLabel = isEnglish ? 'Close navigation' : '关闭导航';

    if (!toggle || !nav) return;

    function setOpen(open) {
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? closeLabel : openLabel);
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
    var isEnglish = document.documentElement.lang.indexOf('en') === 0;
    if (!buttons.length) return;

    buttons.forEach(function (button) {
      var original = button.textContent;
      var resetTimer;

      button.addEventListener('click', function () {
        var value = button.getAttribute('data-copy-text');
        var label = button.getAttribute('data-copy-label') || '内容';

        copyText(value).then(function () {
          window.clearTimeout(resetTimer);
          button.textContent = isEnglish ? 'Copied' : '已复制';
          button.setAttribute('data-copied', 'true');
          if (status) {
            status.textContent = isEnglish
              ? label + ' copied to clipboard'
              : label + '已复制到剪贴板';
          }
          resetTimer = window.setTimeout(function () {
            button.textContent = original;
            button.removeAttribute('data-copied');
          }, 1800);
        }).catch(function () {
          button.textContent = isEnglish ? 'Copy failed' : '复制失败';
          if (status) {
            status.textContent = isEnglish
              ? 'Could not copy ' + label + ' automatically. Please select it and copy manually.'
              : '无法自动复制' + label + '，请手动选择';
          }
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
  initCopyButtons();
  initYear();
}());
