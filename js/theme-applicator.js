// ========================================
// THEME APPLICATOR — Replaces emojis with themed SVG
// ========================================

function applyThemedImages() {
    if (!currentTheme) return;
    const t = currentTheme;

    const loadingHeart = document.querySelector('.loading-heart');
    if (loadingHeart) loadingHeart.innerHTML = SVG.getShape(t.cursorShape, 60, t);

    const countdownHearts = document.querySelector('.countdown-hearts');
    if (countdownHearts) {
        const shapes = t.floatingShapes;
        countdownHearts.innerHTML = shapes.map((s) => `<span>${SVG.getShape(s, 36, t)}</span>`).join('');
        countdownHearts.querySelectorAll('span').forEach((span, i) => { span.style.animationDelay = (i * 0.2) + 's'; });
    }

    const navBrand = document.querySelector('.nav-brand');
    if (navBrand) navBrand.innerHTML = `${SVG.getShape(t.cursorShape, 22, t)} For Fathima Rukshana ${SVG.getShape(t.cursorShape, 22, t)}`;

    const heroBadge = document.querySelector('.hero-badge');
    if (heroBadge) heroBadge.innerHTML = `${SVG.sparkle(16, t.gold)} Today is Special ${SVG.sparkle(16, t.gold)}`;

    const heroEmoji = document.querySelector('.hero-emoji');
    if (heroEmoji) heroEmoji.innerHTML = SVG.cake(64, t.primary, t.secondary, t.primaryLight);

    const heroButtons = document.querySelectorAll('.hero-buttons .btn');
    if (heroButtons.length >= 2) {
        heroButtons[0].innerHTML = `${SVG.envelope(18, t.primary, t.accent)} Read Love Notes`;
        heroButtons[1].innerHTML = `${SVG.gamepad(20, t.primary)} Play Games`;
    }

    const giftLabel = document.querySelector('.gift-box-label');
    if (giftLabel) giftLabel.innerHTML = `${SVG.bow(20, t.accent, t.primary)} Tap the gift for a love surprise! ${SVG.bow(20, t.accent, t.primary)}`;

    const giftQuoteEmoji = document.querySelector('.gift-quote-emoji');
    if (giftQuoteEmoji) giftQuoteEmoji.innerHTML = SVG.getShape(t.cursorShape, 48, t);

    const giftAnotherBtn = document.querySelector('.gift-another-btn');
    if (giftAnotherBtn) giftAnotherBtn.innerHTML = `${SVG.gift(18, t.primary, t.accent)} Open Another Gift`;

    const sectionBadges = document.querySelectorAll('.section-badge');
    const badgeShapes = [t.sectionBadgeShape, 'heart', t.cursorShape, t.sectionBadgeShape];
    sectionBadges.forEach((badge, i) => {
        badge.innerHTML = SVG.getShape(badgeShapes[i % badgeShapes.length] || t.sectionBadgeShape, 40, t);
    });

    const celebIcons = document.querySelectorAll('.celeb-icon');
    const celebShapes = t.shapes.concat(t.floatingShapes).slice(0, 6);
    celebIcons.forEach((icon, i) => {
        icon.innerHTML = SVG.getShape(celebShapes[i % celebShapes.length], 48, t);
    });

    const gameIcons = document.querySelectorAll('.game-icon');
    const gameShapes = ['sparkle', t.cursorShape, 'heart', t.sectionBadgeShape, 'gem', 'sunburst'];
    gameIcons.forEach((icon, i) => {
        icon.innerHTML = SVG.getShape(gameShapes[i % gameShapes.length], 56, t);
    });

    document.querySelectorAll('.btn-game').forEach(btn => {
        const text = btn.textContent.trim();
        if (text.includes('Play Now')) btn.innerHTML = `${SVG.sparkle(14, t.accent)} Play Now`;
        else if (text.includes('Reset')) btn.innerHTML = `${SVG.getShape('star-4', 14, t)} Reset`;
        else if (text.includes('Spin')) btn.innerHTML = `${SVG.sunburst(16, t.gold)} Spin!`;
    });

    const envelopeText = document.querySelector('.envelope-text');
    if (envelopeText) envelopeText.innerHTML = `${SVG.envelope(20, t.primary, t.accent)} Click to Open`;

    const footerHearts = document.querySelector('.footer-hearts');
    if (footerHearts) {
        const fShapes = t.floatingShapes;
        footerHearts.innerHTML = fShapes.concat(fShapes.slice(0, 2)).map(s => SVG.getShape(s, 24, t)).join(' ');
    }

    const footerYear = document.querySelector('.footer-year');
    if (footerYear) footerYear.innerHTML = `${SVG.ring(16, t.accent)} Forever & Always ${SVG.ring(16, t.accent)}`;

    // Music toggle is now handled by AudioController - don't override its icon
    // const musicToggle = document.getElementById('music-toggle');
    // if (musicToggle) { musicToggle.innerHTML = SVG.music(20, t.textLight); }

    const quoteShuffle = document.getElementById('quote-shuffle');
    if (quoteShuffle) quoteShuffle.innerHTML = `${SVG.getShape('star-4', 14, t)} Shuffle`;
    const quoteFav = document.getElementById('quote-fav');
    if (quoteFav) quoteFav.innerHTML = `${SVG.heart(14, t.accent, t.primary)} Favorites`;

    replaceModalTitles(t);
    updateFavicon(t);
    document.title = 'Happy Birthday Fathima Rukshana';
}

function replaceModalTitles(t) {
    const modalTitles = {
        'memory-modal': { shape: 'sparkle', text: 'Memory Match' },
        'quiz-modal': { shape: 'heart', text: 'Love Quiz' },
        'catch-modal': { shape: t.cursorShape, text: 'Catch the Hearts!' },
        'jigsaw-modal': { shape: 'gem', text: 'Love Jigsaw' },
        'jar-modal': { shape: 'bubble', text: 'Wish Jar' },
        'wheel-modal': { shape: 'sunburst', text: 'Love Wheel' }
    };
    Object.entries(modalTitles).forEach(([id, {shape, text}]) => {
        const modal = document.getElementById(id);
        if (modal) { const h2 = modal.querySelector('h2'); if (h2) h2.innerHTML = `${SVG.getShape(shape, 28, t)} ${text}`; }
    });
}

function updateFavicon(t) {
    const encoded = 'data:image/svg+xml,' + encodeURIComponent(
        `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><linearGradient id="fg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:${t.accent}"/><stop offset="100%" style="stop-color:${t.primary}"/></linearGradient></defs><path d="M50 88C25 70 5 55 5 35 5 20 17 8 32 8c8 0 14 4 18 10 4-6 10-10 18-10 15 0 27 12 27 27 0 20-20 35-45 53z" fill="url(#fg)"/></svg>`
    );
    let link = document.querySelector("link[rel*='icon']") || document.createElement('link');
    link.type = 'image/svg+xml'; link.rel = 'icon'; link.href = encoded;
    document.head.appendChild(link);
}

function patchDynamicContent() {
    if (!currentTheme) return;
    const t = currentTheme;
    window.initFloatingBackground = function() {
        const container = document.getElementById('bg-elements');
        if (!container) return;
        const shapes = t.floatingShapes;
        for (let i = 0; i < 20; i++) {
            const el = document.createElement('div');
            el.className = 'bg-float';
            const shapeName = shapes[Math.floor(Math.random() * shapes.length)];
            const color = t.particleColors[Math.floor(Math.random() * t.particleColors.length)];
            el.innerHTML = SVG[shapeName] ? SVG[shapeName](24, color, t.secondary) : SVG.heart(24, color, t.secondary);
            el.style.left = Math.random() * 100 + '%';
            el.style.animationDuration = (Math.random() * 15 + 10) + 's';
            el.style.animationDelay = (Math.random() * 10) + 's';
            container.appendChild(el);
        }
    };
    window.initHeroParticles = function() {
        const container = document.getElementById('hero-particles');
        if (!container) return;
        const shapes = ['sparkle', 'star-4', 'star-5', 'star-6'];
        for (let i = 0; i < 25; i++) {
            const p = document.createElement('div');
            p.style.position = 'absolute';
            p.style.left = Math.random() * 100 + '%';
            p.style.top = Math.random() * 100 + '%';
            p.style.opacity = Math.random() * 0.3 + 0.1;
            p.style.animation = `twinkle ${Math.random() * 3 + 2}s ease-in-out infinite`;
            p.style.animationDelay = Math.random() * 3 + 's';
            const shapeName = shapes[Math.floor(Math.random() * shapes.length)];
            const size = Math.random() * 14 + 8;
            const color = t.particleColors[Math.floor(Math.random() * t.particleColors.length)];
            p.innerHTML = SVG[shapeName](size, color);
            p.style.pointerEvents = 'none';
            container.appendChild(p);
        }
    };
    window.createLoadingPetals = function() {
        const container = document.getElementById('loading-petals');
        if (!container) return;
        const shapes = t.floatingShapes;
        for (let i = 0; i < 15; i++) {
            const petal = document.createElement('div');
            petal.className = 'petal';
            const shapeName = shapes[Math.floor(Math.random() * shapes.length)];
            const color = t.particleColors[Math.floor(Math.random() * t.particleColors.length)];
            const size = Math.random() * 14 + 14;
            petal.innerHTML = SVG[shapeName] ? SVG[shapeName](size, color, t.secondary) : SVG.heart(size, color, t.secondary);
            petal.style.left = Math.random() * 100 + '%';
            petal.style.animationDuration = (Math.random() * 5 + 5) + 's';
            petal.style.animationDelay = (Math.random() * 5) + 's';
            container.appendChild(petal);
        }
    };
}

function patchConfetti() {
    if (!currentTheme || typeof Confetti === 'undefined') return;
    Confetti.launch = function(duration) {
        duration = duration || 4000;
        if (this.running) return;
        this.running = true; this.particles = [];
        const colors = currentTheme.particleColors.concat([currentTheme.accent, currentTheme.gold, currentTheme.accentDeep]);
        for (let i = 0; i < 150; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height - this.canvas.height,
                w: Math.random() * 10 + 5, h: Math.random() * 6 + 3,
                color: colors[Math.floor(Math.random() * colors.length)],
                vx: (Math.random() - 0.5) * 4, vy: Math.random() * 3 + 2,
                rot: Math.random() * 360, rotSpeed: (Math.random() - 0.5) * 10,
                opacity: 1, shape: Math.random() > 0.5 ? 'rect' : 'circle'
            });
        }
        const startTime = Date.now(); const self = this;
        const animate = () => {
            const elapsed = Date.now() - startTime;
            self.ctx.clearRect(0, 0, self.canvas.width, self.canvas.height);
            self.particles.forEach(p => {
                p.x += p.vx; p.y += p.vy; p.rot += p.rotSpeed; p.vy += 0.05;
                if (elapsed > duration - 1000) p.opacity = Math.max(0, p.opacity - 0.02);
                self.ctx.save(); self.ctx.translate(p.x, p.y);
                self.ctx.rotate((p.rot * Math.PI) / 180);
                self.ctx.globalAlpha = p.opacity; self.ctx.fillStyle = p.color;
                if (p.shape === 'circle') {
                    self.ctx.beginPath(); self.ctx.arc(0, 0, p.w / 2, 0, Math.PI * 2); self.ctx.fill();
                } else { self.ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h); }
                self.ctx.restore();
            });
            if (elapsed < duration) { self.animationId = requestAnimationFrame(animate); }
            else { self.ctx.clearRect(0, 0, self.canvas.width, self.canvas.height); self.running = false; self.particles = []; }
        };
        animate();
    };
}
