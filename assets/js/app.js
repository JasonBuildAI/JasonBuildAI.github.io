/* 黄江南 · 个人简历网站：导航高亮 / 复制邮箱 / 年份 */
document.querySelectorAll('[data-copy]').forEach(function (btn) {
  btn.addEventListener('click', function () {
    var text = btn.getAttribute('data-copy');
    var done = function () {
      var original = btn.textContent;
      btn.textContent = '已复制';
      btn.classList.add('is-done');
      setTimeout(function () {
        btn.textContent = original;
        btn.classList.remove('is-done');
      }, 1600);
    };
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).then(done, function () { fallback(text, done); });
    } else {
      fallback(text, done);
    }
  });
});

function fallback(text, done) {
  var ta = document.createElement('textarea');
  ta.value = text;
  ta.setAttribute('readonly', '');
  ta.style.position = 'absolute';
  ta.style.left = '-9999px';
  document.body.appendChild(ta);
  ta.select();
  try { document.execCommand('copy'); } catch (e) { /* 忽略 */ }
  document.body.removeChild(ta);
  done();
}

(function () {
  var links = Array.prototype.slice.call(document.querySelectorAll('.nav a'));
  if (!links.length || !('IntersectionObserver' in window)) return;
  var map = {};
  links.forEach(function (a) { map[a.getAttribute('href').slice(1)] = a; });
  var targets = Object.keys(map).map(function (id) { return document.getElementById(id); }).filter(Boolean);
  if (!targets.length) return;
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      links.forEach(function (a) { a.classList.remove('is-active'); });
      if (map[entry.target.id]) map[entry.target.id].classList.add('is-active');
    });
  }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });
  targets.forEach(function (t) { observer.observe(t); });
})();

(function () {
  var year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());
})();
