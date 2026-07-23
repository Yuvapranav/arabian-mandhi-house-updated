/* ============================================================
   90's Kids Mandi House — behaviour
   Nav overlay · signature carousel · menu filtering · FAQ · scroll spy
   ============================================================ */

(function () {
  "use strict";

  /* ---------------- Mobile nav overlay ---------------- */
  const navToggle = document.getElementById("navToggle");
  const navOverlay = document.getElementById("navOverlay");

  function closeNav() {
    navOverlay.hidden = true;
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.setAttribute("aria-label", "Open menu");
    document.body.style.overflow = "";
  }

  navToggle.addEventListener("click", function () {
    const open = navOverlay.hidden;
    navOverlay.hidden = !open;
    navToggle.setAttribute("aria-expanded", String(open));
    navToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    document.body.style.overflow = open ? "hidden" : "";
  });

  navOverlay.querySelectorAll("a").forEach(function (a) {
    a.addEventListener("click", closeNav);
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !navOverlay.hidden) closeNav();
  });

  /* ---------------- Signature carousel ---------------- */
  const track = document.getElementById("carouselTrack");
  const dotsWrap = document.getElementById("carouselDots");
  const prevBtn = document.getElementById("carPrev");
  const nextBtn = document.getElementById("carNext");

  SIGNATURE_DATA.forEach(function (item) {
    const card = document.createElement("article");
    card.className = "sig-card";
    card.innerHTML =
      '<div class="media"><img class="sig-img" src="' + item.image + '" alt="' + item.name + '" width="900" height="700" /></div>' +
      '<h3 class="card-headline sig-name">' + item.name + "</h3>" +
      '<p class="body-small sig-desc">' + item.desc + "</p>" +
      '<p class="sig-price">&#8377;' + item.priceFrom + " <small>onwards</small></p>";
    track.appendChild(card);
  });

  const cards = Array.prototype.slice.call(track.children);

  function perView() {
    if (window.innerWidth <= 767) return 1;
    if (window.innerWidth <= 1199) return 2;
    return 3;
  }

  let index = 0;

  function maxIndex() {
    return Math.max(0, cards.length - perView());
  }

  function buildDots() {
    dotsWrap.innerHTML = "";
    for (let i = 0; i <= maxIndex(); i++) {
      const dot = document.createElement("button");
      dot.className = "dot";
      dot.type = "button";
      dot.setAttribute("aria-label", "Go to slide " + (i + 1));
      dot.addEventListener("click", function () {
        index = i;
        render();
      });
      dotsWrap.appendChild(dot);
    }
  }

  function render() {
    index = Math.min(index, maxIndex());
    if (!cards.length) return;
    const step = cards[0].getBoundingClientRect().width +
      parseFloat(getComputedStyle(track).columnGap || "0");
    track.style.transform = "translateX(" + -(index * step) + "px)";
    Array.prototype.forEach.call(dotsWrap.children, function (d, i) {
      d.classList.toggle("is-active", i === index);
    });
  }

  prevBtn.addEventListener("click", function () {
    index = index > 0 ? index - 1 : maxIndex();
    render();
  });
  nextBtn.addEventListener("click", function () {
    index = index < maxIndex() ? index + 1 : 0;
    render();
  });

  let resizeTimer;
  window.addEventListener("resize", function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      buildDots();
      render();
    }, 120);
  });

  buildDots();
  render();

  /* ---------------- Menu tabs + grid ---------------- */
  const tabsWrap = document.getElementById("menuTabs");
  const grid = document.getElementById("menuGrid");

  function priceBlock(price) {
    if (typeof price.single === "number") {
      return (
        '<div class="price-row">' +
        '<div class="price-cell">' +
        '<span class="price-label">Each</span>' +
        '<span class="price-value">&#8377;' + price.single + "</span>" +
        "</div></div>"
      );
    }
    return (
      '<div class="price-row">' +
      '<div class="price-cell"><span class="price-label">Half</span><span class="price-value">&#8377;' + price.half + "</span></div>" +
      '<div class="price-cell"><span class="price-label">Full</span><span class="price-value">&#8377;' + price.full + "</span></div>" +
      '<div class="price-cell"><span class="price-label">Family</span><span class="price-value">&#8377;' + price.family + "</span></div>" +
      "</div>"
    );
  }

  function renderMenu(category) {
    const items = category === "All"
      ? MENU_DATA
      : MENU_DATA.filter(function (i) { return i.category === category; });

    grid.innerHTML = items.map(function (item) {
      return (
        '<article class="menu-card">' +
        '<div class="media"><img class="menu-img" src="' + item.image + '" alt="' + item.name + '" width="800" height="600" loading="lazy" /></div>' +
        "<div>" +
        '<h3 class="card-headline menu-name">' + item.name + "</h3>" +
        '<p class="body-small menu-desc">' + item.desc + "</p>" +
        priceBlock(item.price) +
        "</div>" +
        "</article>"
      );
    }).join("");

    // Stagger the entrance so a tab switch reads as a transition
    // rather than a hard swap. Capped so long lists don't crawl.
    grid.querySelectorAll(".menu-card").forEach(function (card, i) {
      card.style.animationDelay = Math.min(i * 0.05, 0.4) + "s";
    });
  }

  MENU_CATEGORIES.forEach(function (cat, i) {
    const btn = document.createElement("button");
    btn.className = "tab" + (i === 0 ? " is-active" : "");
    btn.type = "button";
    btn.setAttribute("role", "tab");
    btn.setAttribute("aria-selected", i === 0 ? "true" : "false");
    btn.textContent = cat.label;
    btn.addEventListener("click", function () {
      tabsWrap.querySelectorAll(".tab").forEach(function (t) {
        t.classList.remove("is-active");
        t.setAttribute("aria-selected", "false");
      });
      btn.classList.add("is-active");
      btn.setAttribute("aria-selected", "true");
      renderMenu(cat.key);
    });
    tabsWrap.appendChild(btn);
  });

  renderMenu("All");

  /* ---------------- FAQ accordion ---------------- */
  document.querySelectorAll(".faq-item").forEach(function (item) {
    const q = item.querySelector(".faq-q");
    q.addEventListener("click", function () {
      const open = item.classList.toggle("is-open");
      q.setAttribute("aria-expanded", String(open));
      // The sign rotates 45deg into an "x" via CSS — no glyph swap.
    });
  });

  /* ---------------- Active nav on scroll ---------------- */
  const sections = ["experience", "signature", "menu", "faq"].map(function (id) {
    return document.getElementById(id);
  });
  const navLinks = document.querySelectorAll(".nav-desktop .nav-item");

  window.addEventListener("scroll", function () {
    let current = "";
    sections.forEach(function (s) {
      if (s && window.scrollY >= s.offsetTop - 200) current = s.id;
    });
    navLinks.forEach(function (l) {
      l.classList.toggle("is-active", l.getAttribute("href") === "#" + current);
    });
  }, { passive: true });

  /* ---------------- Motion ----------------
     Everything below degrades safely: if the OS asks for reduced
     motion, or IntersectionObserver is unavailable, content is
     shown immediately rather than left hidden.                   */

  const reduceMotion =
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const revealEls = document.querySelectorAll(".reveal");
  const canObserve = "IntersectionObserver" in window;

  function showAll() {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  }

  if (reduceMotion || !canObserve) {
    showAll();
  } else {
    // Failsafe: a browser delivers an initial callback for every
    // observed target almost immediately, whatever the scroll
    // position. If nothing has been delivered shortly after load,
    // the observer is not running — reveal everything rather than
    // leave the page stranded at opacity 0.
    let delivered = false;
    setTimeout(function () { if (!delivered) showAll(); }, 2000);

    const revealObserver = new IntersectionObserver(function (entries) {
      delivered = true;
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        const el = entry.target;

        // Stagger siblings that come into view together, so grids
        // cascade instead of all landing on the same frame.
        const group = Array.prototype.filter.call(
          el.parentElement.children,
          function (c) { return c.classList.contains("reveal"); }
        );
        const i = group.indexOf(el);
        if (i > 0) el.style.transitionDelay = Math.min(i * 0.1, 0.4) + "s";

        el.classList.add("is-visible");
        revealObserver.unobserve(el);
      });
    }, { rootMargin: "0px 0px -80px 0px", threshold: 0.15 });

    revealEls.forEach(function (el) { revealObserver.observe(el); });
  }

  /* ---------------- Stat count-up ---------------- */
  const statNums = document.querySelectorAll(".stat-num[data-count]");

  function countUp(el) {
    const target = parseInt(el.getAttribute("data-count"), 10);
    const width = el.textContent.trim().length; // keeps the "04" padding

    function paint(value) {
      let s = String(value);
      while (s.length < width) s = "0" + s;
      el.textContent = s;
    }

    if (reduceMotion || typeof requestAnimationFrame !== "function") {
      paint(target);
      return;
    }

    const duration = 1100;
    const started = performance.now();

    (function tick(now) {
      const p = Math.min((now - started) / duration, 1);
      paint(Math.round(target * (1 - Math.pow(1 - p, 3)))); // ease-out cubic
      if (p < 1) requestAnimationFrame(tick);
    })(started);
  }

  if (canObserve && !reduceMotion) {
    const statObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        countUp(entry.target);
        statObserver.unobserve(entry.target);
      });
    }, { threshold: 0.5 });
    statNums.forEach(function (el) { statObserver.observe(el); });
  }
})();
