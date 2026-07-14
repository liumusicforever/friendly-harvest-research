// 深淺色切換
(function () {
  var btn = document.querySelector('.theme-toggle');
  var root = document.documentElement;
  function apply(t) { if (t) root.setAttribute('data-theme', t); else root.removeAttribute('data-theme'); }
  var saved = null; try { saved = localStorage.getItem('fh-theme'); } catch (e) {}
  if (saved) apply(saved);
  if (btn) btn.addEventListener('click', function () {
    var cur = root.getAttribute('data-theme');
    var sysDark = matchMedia('(prefers-color-scheme: dark)').matches;
    var next = cur ? (cur === 'dark' ? 'light' : 'dark') : (sysDark ? 'light' : 'dark');
    apply(next);
    try { localStorage.setItem('fh-theme', next); } catch (e) {}
  });
})();

// 深度標尺捲動高亮
(function () {
  var ticks = [].slice.call(document.querySelectorAll('.tick'));
  if (!ticks.length) return;
  var targets = ticks.map(function (t) { return document.querySelector(t.getAttribute('href')); }).filter(Boolean);
  var spy = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (!e.isIntersecting) return;
      var i = targets.indexOf(e.target);
      ticks.forEach(function (t, n) { t.classList.toggle('on', n === i); });
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  targets.forEach(function (t) { spy.observe(t); });
})();

// 進場淡入
(function () {
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var els = document.querySelectorAll('.reveal');
  if (reduce) { els.forEach(function (el) { el.classList.add('in'); }); return; }
  var rev = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); rev.unobserve(e.target); } });
  }, { rootMargin: '0px 0px -8% 0px' });
  els.forEach(function (el) { rev.observe(el); });
})();

// 錨點平滑捲動
(function () {
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (ev) {
      var el = document.querySelector(a.getAttribute('href'));
      if (!el) return;
      ev.preventDefault();
      el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' });
      history.replaceState(null, '', a.getAttribute('href'));
    });
  });
})();
