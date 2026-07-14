(function () {
  'use strict';
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var isMobile = function () { return matchMedia('(max-width:560px)').matches; };

  /* ---------- 深淺色切換 ---------- */
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

  /* ---------- 深度標尺高亮 ---------- */
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

  /* ---------- 進場淡入 ---------- */
  (function () {
    var els = document.querySelectorAll('.reveal');
    if (reduce) { els.forEach(function (el) { el.classList.add('in'); }); return; }
    var rev = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); rev.unobserve(e.target); } });
    }, { rootMargin: '0px 0px -8% 0px' });
    els.forEach(function (el) { rev.observe(el); });
  })();

  /* ---------- 引用浮層（點了不跳走） ---------- */
  (function () {
    var pop = null, backdrop = null, openFor = null;
    function close() {
      if (pop) { pop.classList.remove('show'); }
      if (backdrop) { backdrop.remove(); backdrop = null; }
      openFor = null;
    }
    function buildFrom(li) {
      var claim = li.querySelector('.src-claim');
      var quote = li.querySelector('.src-quote');
      var badges = li.querySelector('.src-badges');
      var ext = li.querySelector('.src-detail a[href^="http"]');
      var sid = li.id;
      var html = '<div class="cp-handle"></div>';
      if (badges) html += '<div class="cp-badges" style="margin-bottom:8px">' + badges.innerHTML + '</div>';
      if (claim) html += '<div class="cp-claim">' + claim.innerHTML + '</div>';
      if (quote) html += '<div class="cp-quote">' + quote.innerHTML + '</div>';
      html += '<div class="cp-foot">';
      html += '<a class="cp-more" href="#' + sid + '" data-jump="' + sid + '">在來源列表查看 ↓</a>';
      if (ext) html += '<a class="cp-more" href="' + ext.getAttribute('href') + '" target="_blank" rel="noopener">開啟原始來源 ↗</a>';
      html += '</div>';
      return html;
    }
    function place(el) {
      if (isMobile()) { pop.style.top = ''; pop.style.left = ''; return; } // 手機用底部面板，CSS 處理
      var r = el.getBoundingClientRect();
      var pw = pop.offsetWidth, ph = pop.offsetHeight, m = 12;
      var below = r.bottom + ph + 14 < innerHeight || r.top - ph - 14 < 0;
      var top = below ? r.bottom + 10 : r.top - ph - 10;
      var left = r.left + r.width / 2 - pw / 2;
      left = Math.max(m, Math.min(left, innerWidth - pw - m));
      pop.style.top = top + 'px'; pop.style.left = left + 'px';
      pop.classList.toggle('below', below); pop.classList.toggle('above', !below);
      var arrow = pop.querySelector('.cp-arrow');
      if (arrow) { arrow.style.left = Math.max(12, Math.min(r.left + r.width / 2 - left - 5, pw - 22)) + 'px'; }
    }
    function open(el, li) {
      close();
      backdrop = document.createElement('div'); backdrop.className = 'cp-backdrop';
      backdrop.addEventListener('click', close);
      document.body.appendChild(backdrop);
      if (!pop) {
        pop = document.createElement('div'); pop.className = 'cite-pop';
        document.body.appendChild(pop);
      }
      pop.innerHTML = '<span class="cp-arrow"></span>' + buildFrom(li);
      pop.style.top = '-9999px'; pop.style.left = '0';
      pop.classList.remove('above', 'below');
      // 綁定「跳到來源」
      var jump = pop.querySelector('[data-jump]');
      if (jump) jump.addEventListener('click', function (ev) {
        ev.preventDefault();
        jumpToSource(jump.getAttribute('data-jump'));
        close();
      });
      requestAnimationFrame(function () { place(el); pop.classList.add('show'); });
      openFor = el;
    }
    document.addEventListener('click', function (ev) {
      var a = ev.target.closest ? ev.target.closest('a.c[href^="#"]') : null;
      if (a) {
        var id = a.getAttribute('href').slice(1);
        var li = document.getElementById(id);
        if (li && li.classList.contains('src-claim') === false && li.querySelector('.src-claim')) {
          ev.preventDefault();
          if (openFor === a) { close(); } else { open(a, li); }
          return;
        }
      }
    });
    window.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(); });
    window.addEventListener('resize', close);
    window.addEventListener('scroll', function () { if (pop && !isMobile()) close(); }, { passive: true });
  })();

  /* ---------- 跳到來源 + 回到內文 ---------- */
  var backBtn = document.getElementById('backRef');
  var backY = null;
  function jumpToSource(sid) {
    var li = document.getElementById(sid);
    if (!li) return;
    backY = window.scrollY;
    li.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'center' });
    li.classList.remove('flash'); void li.offsetWidth; li.classList.add('flash');
    if (backBtn) { backBtn.classList.add('show'); }
    history.replaceState(null, '', '#' + sid);
  }
  if (backBtn) backBtn.addEventListener('click', function () {
    if (backY != null) window.scrollTo({ top: backY, behavior: reduce ? 'auto' : 'smooth' });
    backBtn.classList.remove('show');
  });

  /* ---------- 一般錨點平滑捲動（排除引用） ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    if (a.classList.contains('c')) return;
    a.addEventListener('click', function (ev) {
      var el = document.querySelector(a.getAttribute('href'));
      if (!el) return;
      ev.preventDefault();
      el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' });
      history.replaceState(null, '', a.getAttribute('href'));
    });
  });

  /* ---------- 回到頂端 + 進度條 ---------- */
  (function () {
    var toTop = document.getElementById('toTop');
    var bar = document.getElementById('progress');
    if (toTop) toTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
    });
    var ticking = false;
    function onScroll() {
      if (ticking) return; ticking = true;
      requestAnimationFrame(function () {
        var y = window.scrollY;
        var h = document.documentElement.scrollHeight - innerHeight;
        if (bar) bar.style.width = (h > 0 ? (y / h * 100) : 0) + '%';
        if (toTop) toTop.classList.toggle('show', y > 700);
        ticking = false;
      });
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  })();
})();
