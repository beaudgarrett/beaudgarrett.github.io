/* ═══════════════════════════════════════════════════════
   beaugarrett.dev — Parallax Engine + Particles + Reveals
   ═══════════════════════════════════════════════════════ */

(function () {
  'use strict';

  /* ─── Particle Starfield (Canvas Layer 1 — 0.3x scroll) ─── */
  const canvas = document.getElementById('particles');
  const ctx = canvas.getContext('2d');
  let particles = [];
  let animFrameId;
  let scrollY = 0;

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function createParticles() {
    particles = [];
    const count = Math.min(Math.floor((canvas.width * canvas.height) / 8000), 200);
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height * 3,
        r: Math.random() * 1.5 + 0.3,
        alpha: Math.random() * 0.6 + 0.1,
        speed: Math.random() * 0.3 + 0.05,
        drift: (Math.random() - 0.5) * 0.15,
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: Math.random() * 0.01 + 0.005,
      });
    }
  }

  function drawParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const offset = scrollY * 0.3;

    for (const p of particles) {
      p.pulse += p.pulseSpeed;
      const a = p.alpha * (0.7 + 0.3 * Math.sin(p.pulse));
      const drawY = ((p.y - offset) % (canvas.height * 3) + canvas.height * 3) % (canvas.height * 3);

      if (drawY > canvas.height + 10) continue;

      ctx.beginPath();
      ctx.arc(p.x + Math.sin(p.pulse * 0.5) * p.drift * 20, drawY, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(167, 139, 250, ${a})`;
      ctx.fill();

      if (p.r > 1.2) {
        ctx.beginPath();
        ctx.arc(p.x, drawY, p.r * 3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(139, 92, 246, ${a * 0.15})`;
        ctx.fill();
      }
    }

    /* ─── Draw Constellation Cursor (enhanced) ─── */
    if (mouseX > 0 && mouseY > 0) {
      var constellationNodes = [];
      var offset2 = scrollY * 0.3;
      for (var ci = 0; ci < particles.length; ci++) {
        var cp = particles[ci];
        var cDrawY = ((cp.y - offset2) % (canvas.height * 3) + canvas.height * 3) % (canvas.height * 3);
        if (cDrawY > canvas.height + 10) continue;
        var cpx = cp.x + Math.sin(cp.pulse * 0.5) * cp.drift * 20;
        var cdx = cpx - mouseX;
        var cdy = cDrawY - mouseY;
        var cdist = Math.sqrt(cdx * cdx + cdy * cdy);
        if (cdist < 220 && constellationNodes.length < 12) {
          constellationNodes.push({ x: cpx, y: cDrawY, dist: cdist, r: cp.r });
        }
      }
      constellationNodes.sort(function(a, b) { return a.dist - b.dist; });

      if (constellationNodes.length > 1) {
        // Lines from cursor to each node
        for (var li = 0; li < constellationNodes.length; li++) {
          var node = constellationNodes[li];
          var lineAlpha = (1 - node.dist / 220) * 0.55;
          ctx.beginPath();
          ctx.moveTo(mouseX, mouseY);
          ctx.lineTo(node.x, node.y);
          ctx.strokeStyle = 'rgba(167, 139, 250, ' + lineAlpha + ')';
          ctx.lineWidth = 1.2;
          ctx.stroke();
        }

        // Lines between adjacent nodes (constellation edges)
        for (var ei = 0; ei < constellationNodes.length - 1; ei++) {
          var n1 = constellationNodes[ei];
          var n2 = constellationNodes[ei + 1];
          var edgeDist = Math.sqrt((n1.x - n2.x) * (n1.x - n2.x) + (n1.y - n2.y) * (n1.y - n2.y));
          if (edgeDist < 250) {
            var edgeAlpha = (1 - edgeDist / 250) * 0.4;
            ctx.beginPath();
            ctx.moveTo(n1.x, n1.y);
            ctx.lineTo(n2.x, n2.y);
            ctx.strokeStyle = 'rgba(251, 191, 36, ' + edgeAlpha + ')';
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }

        // Cross-connect some non-adjacent nodes for denser web
        for (var xi = 0; xi < Math.min(constellationNodes.length, 6); xi++) {
          for (var xj = xi + 2; xj < Math.min(constellationNodes.length, 8); xj += 2) {
            var xn1 = constellationNodes[xi];
            var xn2 = constellationNodes[xj];
            var xd = Math.sqrt((xn1.x - xn2.x) * (xn1.x - xn2.x) + (xn1.y - xn2.y) * (xn1.y - xn2.y));
            if (xd < 200) {
              ctx.beginPath();
              ctx.moveTo(xn1.x, xn1.y);
              ctx.lineTo(xn2.x, xn2.y);
              ctx.strokeStyle = 'rgba(139, 92, 246, ' + ((1 - xd / 200) * 0.2) + ')';
              ctx.lineWidth = 0.6;
              ctx.stroke();
            }
          }
        }

        // Brighten constellation nodes with bigger glow
        for (var bi = 0; bi < constellationNodes.length; bi++) {
          var bn = constellationNodes[bi];
          var brightAlpha = (1 - bn.dist / 220) * 1.0;
          // Outer glow
          ctx.beginPath();
          ctx.arc(bn.x, bn.y, bn.r * 6, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(251, 191, 36, ' + (brightAlpha * 0.1) + ')';
          ctx.fill();
          // Inner glow
          ctx.beginPath();
          ctx.arc(bn.x, bn.y, bn.r * 3, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(251, 191, 36, ' + (brightAlpha * 0.2) + ')';
          ctx.fill();
          // Core
          ctx.beginPath();
          ctx.arc(bn.x, bn.y, bn.r + 2, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(251, 191, 36, ' + brightAlpha + ')';
          ctx.fill();
        }
      }

      // Cursor glow
      ctx.beginPath();
      ctx.arc(mouseX, mouseY, 12, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(139, 92, 246, 0.08)';
      ctx.fill();
      ctx.beginPath();
      ctx.arc(mouseX, mouseY, 3, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(251, 191, 36, 0.8)';
      ctx.fill();
    }

    /* ─── Draw Rockets ─── */
    for (var ri = 0; ri < rockets.length; ri++) {
      var rk = rockets[ri];
      rk.x += rk.vx;
      rk.y += rk.vy;

      ctx.save();
      ctx.translate(rk.x, rk.y);
      ctx.rotate(Math.atan2(rk.vy, rk.vx));

      // Flame trail
      for (var fi = 1; fi <= 5; fi++) {
        ctx.beginPath();
        ctx.arc(-8 - fi * 6, (Math.random() - 0.5) * 3, 3 - fi * 0.4, 0, Math.PI * 2);
        ctx.fillStyle = fi < 3 ? 'rgba(251, 191, 36, ' + (0.4 - fi * 0.07) + ')' : 'rgba(239, 68, 68, ' + (0.3 - fi * 0.05) + ')';
        ctx.fill();
      }

      // Rocket body
      ctx.beginPath();
      ctx.moveTo(10, 0);
      ctx.lineTo(-4, -4);
      ctx.lineTo(-6, -3);
      ctx.lineTo(-8, 0);
      ctx.lineTo(-6, 3);
      ctx.lineTo(-4, 4);
      ctx.closePath();
      ctx.fillStyle = 'rgba(248, 250, 252, ' + rk.alpha + ')';
      ctx.fill();

      // Nose glow
      ctx.beginPath();
      ctx.arc(8, 0, 2, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(251, 191, 36, ' + (rk.alpha * 0.6) + ')';
      ctx.fill();

      ctx.restore();

      // Remove if off screen
      if (rk.x < -60 || rk.x > canvas.width + 60 || rk.y < -60 || rk.y > canvas.height + 60) {
        rockets.splice(ri, 1);
        ri--;
      }
    }

    animFrameId = requestAnimationFrame(drawParticles);
  }

  /* ─── Mouse Tracking for Constellation ─── */
  var mouseX = -1;
  var mouseY = -1;

  window.addEventListener('mousemove', function (e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  window.addEventListener('mouseleave', function () {
    mouseX = -1;
    mouseY = -1;
  });

  /* ─── Rocket System ─── */
  var rockets = [];

  function spawnRocket() {
    var side = Math.random();
    var rk = { alpha: Math.random() * 0.4 + 0.3 };
    if (side < 0.5) {
      // Left to right
      rk.x = -20;
      rk.y = Math.random() * canvas.height * 0.6 + canvas.height * 0.1;
      var angle = (Math.random() - 0.5) * 0.4;
      var speed = Math.random() * 2 + 1.5;
      rk.vx = Math.cos(angle) * speed;
      rk.vy = Math.sin(angle) * speed;
    } else {
      // Right to left
      rk.x = canvas.width + 20;
      rk.y = Math.random() * canvas.height * 0.6 + canvas.height * 0.1;
      var angle2 = Math.PI + (Math.random() - 0.5) * 0.4;
      var speed2 = Math.random() * 2 + 1.5;
      rk.vx = Math.cos(angle2) * speed2;
      rk.vy = Math.sin(angle2) * speed2;
    }
    rockets.push(rk);
  }

  // Spawn a rocket every 8-15 seconds
  function scheduleRocket() {
    var delay = (Math.random() * 7000 + 8000);
    setTimeout(function () {
      spawnRocket();
      scheduleRocket();
    }, delay);
  }
  scheduleRocket();
  // Spawn one early so user sees it
  setTimeout(spawnRocket, 3000);

  resizeCanvas();
  createParticles();
  drawParticles();

  let resizeTimer;
  window.addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      resizeCanvas();
      createParticles();
    }, 200);
  });

  /* ─── Scroll Tracking ─── */
  let ticking = false;

  function onScroll() {
    scrollY = window.pageYOffset;
    if (!ticking) {
      requestAnimationFrame(updateOnScroll);
      ticking = true;
    }
  }

  function updateOnScroll() {
    updateParallax();
    updateNav();
    ticking = false;
  }

  window.addEventListener('scroll', onScroll, { passive: true });

  /* ─── Parallax Layers (Layer 2 — 0.4-0.6x scroll) ─── */
  const parallaxLayers = document.querySelectorAll('.parallax-layer');

  function updateParallax() {
    for (const layer of parallaxLayers) {
      const speed = parseFloat(layer.dataset.speed) || 0.5;
      const rect = layer.parentElement.getBoundingClientRect();
      const offset = rect.top * speed * -0.5;
      layer.style.transform = `translateY(${offset}px)`;
    }
  }

  /* ─── Navigation ─── */
  const nav = document.getElementById('nav');
  const navToggle = document.getElementById('navToggle');
  const navMobile = document.getElementById('navMobile');

  function updateNav() {
    if (scrollY > 60) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }

  navToggle.addEventListener('click', function () {
    navToggle.classList.toggle('active');
    navMobile.classList.toggle('open');
  });

  // Close mobile nav on link click
  navMobile.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      navToggle.classList.remove('active');
      navMobile.classList.remove('open');
    });
  });

  /* ─── Scroll Reveal (Intersection Observer) ─── */
  const reveals = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          const delay = parseInt(entry.target.dataset.delay) || 0;
          setTimeout(function () {
            entry.target.classList.add('visible');
          }, delay);
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
  );

  reveals.forEach(function (el) {
    revealObserver.observe(el);
  });

  /* ─── Smooth anchor scrolling ─── */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* ─── Active nav link highlight ─── */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

  const sectionObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach(function (link) {
            link.style.color =
              link.getAttribute('href') === '#' + id ? 'var(--fg)' : '';
          });
        }
      });
    },
    { threshold: 0.3 }
  );

  sections.forEach(function (section) {
    sectionObserver.observe(section);
  });
})();
