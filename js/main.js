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
      '<img class="sig-img" src="' + item.image + '" alt="' + item.name + '" width="900" height="700" />' +
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
        '<img class="menu-img" src="' + item.image + '" alt="' + item.name + '" width="800" height="600" loading="lazy" />' +
        "<div>" +
        '<h3 class="card-headline menu-name">' + item.name + "</h3>" +
        '<p class="body-small menu-desc">' + item.desc + "</p>" +
        priceBlock(item.price) +
        "</div>" +
        "</article>"
      );
    }).join("");
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
      item.querySelector(".faq-sign").textContent = open ? "−" : "+";
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
      l.style.color = l.getAttribute("href") === "#" + current
        ? "var(--color-coral-orange)"
        : "";
    });
  }, { passive: true });
})();
