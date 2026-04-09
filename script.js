/* ═══════════════════════════════════════════════════════
   beaugarrett.dev — Parallax Engine + Particles + Reveals
   + Constellation Name + Typewriter
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

  /* ─── Constellation Name System ─── */
  var nameStars = [];
  var nameLines = [];
  var constellationPhase = 'waiting'; // waiting -> animating -> formed -> fading -> text
  var constellationStartTime = 0;
  var CONSTELLATION_DELAY = 2000;
  var CONSTELLATION_ANIM_DURATION = 2500;
  var CONSTELLATION_HOLD = 1500; // hold constellation before transitioning to text
  var CONSTELLATION_FADE = 800;  // fade constellation out while text fades in
  var constellationReady = false;
  var constellationAlpha = 0;
  var constellationFormedTime = 0;
  var constellationFadeStart = 0;

  function buildNameConstellation() {
    var heroTitle = document.getElementById('heroTitle');
    if (!heroTitle) return;

    // Element has visibility:hidden but still occupies layout — rect is accurate
    var rect = heroTitle.getBoundingClientRect();
    var cs = window.getComputedStyle(heroTitle);

    // Read the exact computed font properties from the element
    var fontSizePx = parseFloat(cs.fontSize);
    var fontWeight = cs.fontWeight;
    var fontFamily = cs.fontFamily;
    var letterSpacing = parseFloat(cs.letterSpacing) || 0;
    var lineHeightPx = parseFloat(cs.lineHeight);
    if (isNaN(lineHeightPx)) lineHeightPx = fontSizePx * 0.95;

    // Create offscreen canvas at the element's exact CSS pixel dimensions
    var offCanvas = document.createElement('canvas');
    var offCtx = offCanvas.getContext('2d');
    var ow = Math.ceil(rect.width);
    var oh = Math.ceil(rect.height);
    offCanvas.width = ow;
    offCanvas.height = oh;

    // Render text with the same font so the shape matches exactly
    offCtx.fillStyle = 'white';
    offCtx.font = fontWeight + ' ' + fontSizePx + 'px ' + fontFamily;
    offCtx.textBaseline = 'top';

    // Match the actual text: "Beau<br>Garrett" — render each line
    // Canvas doesn't support letter-spacing, so draw char by char
    var lines = ['Beau', 'Garrett'];
    for (var l = 0; l < lines.length; l++) {
      var line = lines[l];
      var y = l * lineHeightPx;
      var x = 0;
      for (var c = 0; c < line.length; c++) {
        offCtx.fillText(line[c], x, y);
        x += offCtx.measureText(line[c]).width + letterSpacing;
      }
    }

    // Sample pixel positions from the rendered text shape
    var imageData = offCtx.getImageData(0, 0, ow, oh);
    var textPoints = [];
    var step = 4;
    for (var py = 0; py < oh; py += step) {
      for (var px = 0; px < ow; px += step) {
        var idx = (py * ow + px) * 4;
        if (imageData.data[idx + 3] > 128) {
          textPoints.push({ x: px, y: py });
        }
      }
    }

    // Sample ~130 star positions from the text
    var numStars = Math.min(130, textPoints.length);
    var shuffled = textPoints.slice();
    for (var si = shuffled.length - 1; si > 0; si--) {
      var sj = Math.floor(Math.random() * (si + 1));
      var tmp = shuffled[si];
      shuffled[si] = shuffled[sj];
      shuffled[sj] = tmp;
    }
    shuffled = shuffled.slice(0, numStars);

    nameStars = [];
    for (var ni = 0; ni < shuffled.length; ni++) {
      var pt = shuffled[ni];
      // Direct 1:1 mapping — canvas is sized to element, so coords match exactly
      var tx = rect.left + pt.x;
      var ty = rect.top + pt.y;

      nameStars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        targetX: tx,
        targetY: ty,
        r: Math.random() * 1.2 + 0.6,
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: Math.random() * 0.015 + 0.008,
        progress: 0,
      });
    }

    // Pre-compute constellation lines between nearby target positions
    nameLines = [];
    var maxLineDist = 28;
    for (var li = 0; li < nameStars.length; li++) {
      for (var lj = li + 1; lj < nameStars.length; lj++) {
        var dx = nameStars[li].targetX - nameStars[lj].targetX;
        var dy = nameStars[li].targetY - nameStars[lj].targetY;
        var dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < maxLineDist) {
          nameLines.push({ a: li, b: lj, dist: dist });
        }
      }
    }

    constellationReady = true;
    constellationStartTime = performance.now();
  }

  // Build constellation after fonts load and 100ms settle
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(function () {
      setTimeout(buildNameConstellation, 100);
    });
  } else {
    setTimeout(buildNameConstellation, 500);
  }

  function drawConstellationName(now) {
    if (!constellationReady || nameStars.length === 0) return;

    var elapsed = now - constellationStartTime;

    if (constellationPhase === 'waiting') {
      if (elapsed >= CONSTELLATION_DELAY) {
        constellationPhase = 'animating';
      } else {
        // Draw stars at scattered positions (subtle)
        for (var wi = 0; wi < nameStars.length; wi++) {
          var ws = nameStars[wi];
          ws.pulse += ws.pulseSpeed;
          var wa = 0.15 + 0.1 * Math.sin(ws.pulse);
          ctx.beginPath();
          ctx.arc(ws.x, ws.y, ws.r * 0.7, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(167, 139, 250, ' + wa + ')';
          ctx.fill();
        }
        return;
      }
    }

    var animElapsed = elapsed - CONSTELLATION_DELAY;
    var t = Math.min(animElapsed / CONSTELLATION_ANIM_DURATION, 1);
    // Ease out cubic
    var eased = 1 - Math.pow(1 - t, 3);

    // Fade in scroll-adjusted alpha (fade out when scrolled)
    var scrollFade = Math.max(0, 1 - scrollY / 400);
    constellationAlpha = eased * scrollFade;

    // Handle formed -> fading -> text transitions before drawing
    if (t >= 1 && constellationPhase === 'animating') {
      constellationPhase = 'formed';
      constellationFormedTime = performance.now();
    }
    if (constellationPhase === 'formed') {
      var holdElapsed = now - constellationFormedTime;
      if (holdElapsed >= CONSTELLATION_HOLD) {
        constellationPhase = 'fading';
        constellationFadeStart = performance.now();
      }
    }
    if (constellationPhase === 'fading') {
      var fadeElapsed = now - constellationFadeStart;
      var fadeT = Math.min(fadeElapsed / CONSTELLATION_FADE, 1);
      constellationAlpha = (1 - fadeT) * scrollFade;
      var heroTitleEl = document.getElementById('heroTitle');
      if (heroTitleEl) {
        heroTitleEl.style.opacity = fadeT;
        heroTitleEl.style.visibility = 'visible';
      }
      if (fadeT >= 1) {
        constellationPhase = 'text';
      }
    }
    if (constellationPhase === 'text') return;

    if (constellationAlpha <= 0.01) return;

    // Update and draw stars
    for (var ai = 0; ai < nameStars.length; ai++) {
      var s = nameStars[ai];
      s.pulse += s.pulseSpeed;

      // Interpolate position
      var cx = s.x + (s.targetX - s.x) * eased;
      var cy = s.y + (s.targetY - s.y) * eased;

      // After formed, add subtle shimmer movement
      var shimmerX = 0;
      var shimmerY = 0;
      if (t >= 1) {
        shimmerX = Math.sin(s.pulse * 1.5) * 0.8;
        shimmerY = Math.cos(s.pulse * 1.2) * 0.5;
      }

      var drawX = cx + shimmerX;
      var drawY = cy + shimmerY;

      s._drawX = drawX;
      s._drawY = drawY;

      var starAlpha = constellationAlpha * (0.7 + 0.3 * Math.sin(s.pulse));

      // Outer glow
      ctx.beginPath();
      ctx.arc(drawX, drawY, s.r * 4, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(167, 139, 250, ' + (starAlpha * 0.08) + ')';
      ctx.fill();

      // Core star
      ctx.beginPath();
      ctx.arc(drawX, drawY, s.r + 0.5, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(248, 250, 252, ' + starAlpha + ')';
      ctx.fill();

      // Gold tint
      ctx.beginPath();
      ctx.arc(drawX, drawY, s.r * 2.5, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(251, 191, 36, ' + (starAlpha * 0.12) + ')';
      ctx.fill();
    }

    // Draw connecting lines (fade in as animation progresses)
    var lineAlphaBase = Math.max(0, (eased - 0.3) / 0.7) * constellationAlpha;
    if (lineAlphaBase > 0.01) {
      for (var li = 0; li < nameLines.length; li++) {
        var line = nameLines[li];
        var sa = nameStars[line.a];
        var sb = nameStars[line.b];
        var la = lineAlphaBase * (1 - line.dist / 28) * 0.35;

        // Line draw-in effect: stagger based on line index
        var lineDelay = (li / nameLines.length) * 0.4;
        var lineProgress = Math.max(0, Math.min(1, (eased - 0.3 - lineDelay) / 0.3));
        la *= lineProgress;

        if (la > 0.005) {
          ctx.beginPath();
          ctx.moveTo(sa._drawX, sa._drawY);
          ctx.lineTo(sb._drawX, sb._drawY);
          ctx.strokeStyle = 'rgba(167, 139, 250, ' + la + ')';
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }

  }

  /* ─── End Constellation Name System ─── */

  function drawParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    var offset = scrollY * 0.3;

    for (const p of particles) {
      p.pulse += p.pulseSpeed;
      const a = p.alpha * (0.7 + 0.3 * Math.sin(p.pulse));
      const drawY = ((p.y - offset) % (canvas.height * 3) + canvas.height * 3) % (canvas.height * 3);

      if (drawY > canvas.height + 10) continue;

      ctx.beginPath();
      ctx.arc(p.x + Math.sin(p.pulse * 0.5) * p.drift * 20, drawY, p.r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(167, 139, 250, ' + a + ')';
      ctx.fill();

      if (p.r > 1.2) {
        ctx.beginPath();
        ctx.arc(p.x, drawY, p.r * 3, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(139, 92, 246, ' + (a * 0.15) + ')';
        ctx.fill();
      }
    }

    /* ─── Draw Constellation Name ─── */
    drawConstellationName(performance.now());

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
      // On resize, if constellation already transitioned to text, stay there
      if (constellationPhase === 'text' || constellationPhase === 'fading') {
        constellationPhase = 'text';
        constellationReady = false;
        var ht = document.getElementById('heroTitle');
        if (ht) { ht.style.opacity = '1'; ht.style.visibility = 'visible'; }
      } else {
        // Rebuild constellation for new viewport size
        constellationReady = false;
        buildNameConstellation();
        // Skip animation on resize — snap to formed
        constellationPhase = 'formed';
        constellationFormedTime = performance.now();
        constellationStartTime = performance.now() - CONSTELLATION_DELAY - CONSTELLATION_ANIM_DURATION - 100;
        for (var ri2 = 0; ri2 < nameStars.length; ri2++) {
          nameStars[ri2].x = nameStars[ri2].targetX;
          nameStars[ri2].y = nameStars[ri2].targetY;
        }
      }
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
      layer.style.transform = 'translateY(' + offset + 'px)';
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

  /* ─── Typewriter Animation for CelestiML ─── */
  var featuredTitle = document.getElementById('featuredTitle');
  var typewriterStarted = false;

  if (featuredTitle) {
    var targetText = featuredTitle.getAttribute('data-text') || 'CelestiML';
    featuredTitle.textContent = '';

    var typewriterObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting && !typewriterStarted) {
            typewriterStarted = true;
            typewriterObserver.unobserve(entry.target);
            startTypewriter(featuredTitle, targetText);
          }
        });
      },
      { threshold: 0.3 }
    );

    typewriterObserver.observe(featuredTitle);
  }

  function startTypewriter(element, text) {
    var cursor = document.createElement('span');
    cursor.className = 'typewriter-cursor';
    cursor.textContent = '';
    element.appendChild(cursor);

    var charIndex = 0;
    var textNode = document.createTextNode('');
    element.insertBefore(textNode, cursor);

    function typeNextChar() {
      if (charIndex < text.length) {
        textNode.textContent += text[charIndex];
        charIndex++;
        // Slightly varied timing for natural feel
        var delay = 80 + Math.random() * 80;
        // Pause slightly longer after spaces
        if (text[charIndex - 1] === ' ') delay += 60;
        setTimeout(typeNextChar, delay);
      } else {
        // Typing done — fade cursor
        setTimeout(function () {
          cursor.classList.add('fade-out');
          setTimeout(function () {
            cursor.remove();
          }, 600);
        }, 1200);
      }
    }

    // Start after a short delay
    setTimeout(typeNextChar, 300);
  }

})();
