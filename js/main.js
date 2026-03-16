// ========================================
// MAIN APPLICATION CONTROLLER
// Audio Tap -> Love Timeline Intro -> Countdown -> Main App
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    if (typeof initTheme === 'function') initTheme();
    if (typeof patchDynamicContent === 'function') patchDynamicContent();
    if (typeof patchConfetti === 'function') patchConfetti();
    if (typeof applyThemedImages === 'function') applyThemedImages();
    if (typeof Confetti !== 'undefined') Confetti.init();

    // Hide old loading screen immediately
    var loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) loadingScreen.classList.add('hidden');

    // Step 1: AudioController shows "Tap to Begin" overlay
    // On tap -> music starts playing in loop -> then timeline starts
    if (typeof AudioController !== 'undefined') {
        AudioController.init(function() {
            // This callback fires after user taps - music is now playing
            startTimelineIntro();
        });
    } else {
        // Fallback: no audio controller, start directly
        startTimelineIntro();
    }
});

function startTimelineIntro() {
    if (typeof LoveTimeline !== 'undefined') {
        LoveTimeline.init(function() {
            // Duck audio slightly during countdown for dramatic effect
            if (typeof AudioController !== 'undefined') AudioController.duckVolume();
            startCountdown();
        });
    } else {
        startCountdown();
    }
}

function startCountdown() {
    var countdownScreen = document.getElementById('countdown-screen');
    var countdownNumbers = document.getElementById('countdown-numbers');
    if (!countdownScreen || !countdownNumbers) { showMainScreen(); return; }
    countdownScreen.classList.remove('hidden');
    var count = 5;
    countdownNumbers.innerHTML = '<span class="countdown-num">' + count + '</span>';
    var countInterval = setInterval(function() {
        count--;
        if (count > 0) { countdownNumbers.innerHTML = '<span class="countdown-num">' + count + '</span>'; }
        else {
            clearInterval(countInterval);
            countdownScreen.style.opacity = '0'; countdownScreen.style.transition = 'opacity 0.6s ease';
            setTimeout(function() { countdownScreen.classList.add('hidden'); showMainScreen(); }, 600);
        }
    }, 1000);
}

function showMainScreen() {
    // Restore audio volume for main app
    if (typeof AudioController !== 'undefined') AudioController.restoreVolume();

    var mainScreen = document.getElementById('main-screen');
    if (mainScreen) {
        mainScreen.classList.remove('hidden');
        mainScreen.style.opacity = '0'; mainScreen.style.transition = 'opacity 0.8s ease';
        requestAnimationFrame(function() { mainScreen.style.opacity = '1'; });
    }
    setTimeout(function() { if (typeof Confetti !== 'undefined') Confetti.launch(5000); }, 300);
    initNavigation();
    initQuoteCarousel();
    initFloatingBackground();
    initHeroParticles();
    initScrollReveal();

    // Initialize couple doll
    if (typeof CoupleDoll !== 'undefined') {
        setTimeout(function() { CoupleDoll.init(); }, 500);
    }

    // Insert the Love Roadmap section into the main page
    if (typeof LoveRoadmap !== 'undefined') {
        setTimeout(function() { LoveRoadmap.insertIntoPage(); }, 800);
    }

    // Tell AudioController that main app is loaded
    // It will show the mute button after the song completes one full loop
    if (typeof AudioController !== 'undefined') {
        setTimeout(function() { AudioController.showMuteButtonNow(); }, 1000);
    }

    if (typeof startThemeRotation === 'function') startThemeRotation();
}

function initNavigation() {
    var nav = document.getElementById('main-nav');
    var toggle = document.getElementById('nav-toggle');
    var links = document.querySelector('.nav-links');
    window.addEventListener('scroll', function() {
        if (nav) nav.classList.toggle('scrolled', window.scrollY > 50);
        updateActiveNavLink();
    });
    if (toggle && links) {
        toggle.addEventListener('click', function() { links.classList.toggle('open'); });
        document.querySelectorAll('.nav-link').forEach(function(link) {
            link.addEventListener('click', function() { links.classList.remove('open'); });
        });
    }
}

function updateActiveNavLink() {
    var sections = ['hero', 'quotes', 'timeline', 'love-roadmap', 'games', 'letter'];
    var scrollPos = window.scrollY + 150;
    sections.forEach(function(id) {
        var section = document.getElementById(id);
        var link = document.querySelector('.nav-link[href="#' + id + '"]');
        if (section && link) {
            if (scrollPos >= section.offsetTop && scrollPos < section.offsetTop + section.offsetHeight) {
                document.querySelectorAll('.nav-link').forEach(function(l) { l.classList.remove('active'); });
                link.classList.add('active');
            }
        }
    });
}

function smoothScroll(target) {
    var el = document.querySelector(target);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

var currentQuote = 0;
var favoriteQuotes = new Set();

function initQuoteCarousel() {
    if (typeof loveQuotes === 'undefined') return;
    showQuote(0); createQuoteDots();
    var prevBtn = document.getElementById('quote-prev');
    var nextBtn = document.getElementById('quote-next');
    var shuffleBtn = document.getElementById('quote-shuffle');
    var heartBtn = document.getElementById('quote-heart-btn');
    var favBtn = document.getElementById('quote-fav');
    if (prevBtn) prevBtn.addEventListener('click', function() { currentQuote = (currentQuote - 1 + loveQuotes.length) % loveQuotes.length; showQuote(currentQuote); });
    if (nextBtn) nextBtn.addEventListener('click', function() { currentQuote = (currentQuote + 1) % loveQuotes.length; showQuote(currentQuote); });
    if (shuffleBtn) shuffleBtn.addEventListener('click', function() { currentQuote = Math.floor(Math.random() * loveQuotes.length); showQuote(currentQuote); });
    if (heartBtn) heartBtn.addEventListener('click', toggleQuoteFavorite);
    if (favBtn) favBtn.addEventListener('click', showFavoriteQuote);
    var touchStartX = 0;
    var carousel = document.getElementById('quote-carousel');
    if (carousel) {
        carousel.addEventListener('touchstart', function(e) { touchStartX = e.touches[0].clientX; });
        carousel.addEventListener('touchend', function(e) {
            var diff = touchStartX - e.changedTouches[0].clientX;
            if (Math.abs(diff) > 50) {
                currentQuote = diff > 0 ? (currentQuote + 1) % loveQuotes.length : (currentQuote - 1 + loveQuotes.length) % loveQuotes.length;
                showQuote(currentQuote);
            }
        });
    }
}

function showQuote(index) {
    if (typeof loveQuotes === 'undefined') return;
    var textEl = document.getElementById('quote-text');
    var numEl = document.getElementById('quote-number');
    var counterEl = document.getElementById('quote-counter');
    var heartBtn = document.getElementById('quote-heart-btn');
    if (textEl) textEl.textContent = loveQuotes[index];
    if (numEl) numEl.textContent = '#' + (index + 1);
    if (counterEl) counterEl.textContent = (index + 1) + ' / ' + loveQuotes.length;
    if (heartBtn && typeof SVG !== 'undefined') {
        var t = (typeof currentTheme !== 'undefined' && currentTheme) ? currentTheme : null;
        heartBtn.innerHTML = favoriteQuotes.has(index)
            ? SVG.heart(24, t ? t.accent : '#FF4081', t ? t.primary : '#E91E63')
            : SVG.heart(24, t ? t.primaryLight : '#DDD', '#EEE');
    }
    updateQuoteDots();
}

function createQuoteDots() {
    var container = document.getElementById('quote-dots');
    if (!container || typeof loveQuotes === 'undefined') return;
    container.innerHTML = '';
    var maxDots = Math.min(loveQuotes.length, 20);
    for (var i = 0; i < maxDots; i++) {
        var dot = document.createElement('div'); dot.className = 'quote-dot';
        if (i === 0) dot.classList.add('active');
        (function(idx) {
            var qi = Math.floor(idx * loveQuotes.length / maxDots);
            dot.addEventListener('click', function() { currentQuote = qi; showQuote(currentQuote); });
        })(i);
        container.appendChild(dot);
    }
}

function updateQuoteDots() {
    var dots = document.querySelectorAll('.quote-dot');
    if (!dots.length || typeof loveQuotes === 'undefined') return;
    var maxDots = dots.length;
    var activeDot = Math.floor(currentQuote * maxDots / loveQuotes.length);
    dots.forEach(function(dot, i) { dot.classList.toggle('active', i === activeDot); });
}

function toggleQuoteFavorite() {
    if (favoriteQuotes.has(currentQuote)) favoriteQuotes.delete(currentQuote);
    else favoriteQuotes.add(currentQuote);
    var heartBtn = document.getElementById('quote-heart-btn');
    if (heartBtn && typeof SVG !== 'undefined') {
        var t = (typeof currentTheme !== 'undefined' && currentTheme) ? currentTheme : null;
        heartBtn.innerHTML = favoriteQuotes.has(currentQuote)
            ? SVG.heart(24, t ? t.accent : '#FF4081', t ? t.primary : '#E91E63')
            : SVG.heart(24, t ? t.primaryLight : '#DDD', '#EEE');
        heartBtn.classList.add('liked');
        setTimeout(function() { heartBtn.classList.remove('liked'); }, 500);
    }
}

function showFavoriteQuote() {
    if (favoriteQuotes.size === 0) { alert('No favorites yet! Tap the heart on quotes you love!'); return; }
    var favArray = Array.from(favoriteQuotes);
    currentQuote = favArray[Math.floor(Math.random() * favArray.length)];
    showQuote(currentQuote);
}

function initFloatingBackground() {
    var container = document.getElementById('bg-elements');
    if (!container) return;
    if (typeof SVG !== 'undefined' && typeof currentTheme !== 'undefined' && currentTheme) {
        var shapes = currentTheme.floatingShapes;
        for (var i = 0; i < 20; i++) {
            var el = document.createElement('div'); el.className = 'bg-float';
            var shapeName = shapes[Math.floor(Math.random() * shapes.length)];
            var color = currentTheme.particleColors[Math.floor(Math.random() * currentTheme.particleColors.length)];
            el.innerHTML = SVG[shapeName] ? SVG[shapeName](24, color, currentTheme.secondary) : SVG.heart(24, color);
            el.style.left = Math.random() * 100 + '%';
            el.style.animationDuration = (Math.random() * 15 + 10) + 's';
            el.style.animationDelay = (Math.random() * 10) + 's';
            container.appendChild(el);
        }
    }
}

function initHeroParticles() {
    var container = document.getElementById('hero-particles');
    if (!container) return;
    if (typeof SVG !== 'undefined' && typeof currentTheme !== 'undefined' && currentTheme) {
        var shapes = ['sparkle', 'star-4', 'star-5', 'star-6'];
        for (var i = 0; i < 25; i++) {
            var p = document.createElement('div');
            p.style.position = 'absolute';
            p.style.left = Math.random() * 100 + '%';
            p.style.top = Math.random() * 100 + '%';
            p.style.opacity = Math.random() * 0.3 + 0.1;
            p.style.animation = 'twinkle ' + (Math.random() * 3 + 2) + 's ease-in-out infinite';
            p.style.animationDelay = Math.random() * 3 + 's';
            var shapeName = shapes[Math.floor(Math.random() * shapes.length)];
            var size = Math.random() * 14 + 8;
            var color = currentTheme.particleColors[Math.floor(Math.random() * currentTheme.particleColors.length)];
            p.innerHTML = SVG[shapeName](size, color);
            p.style.pointerEvents = 'none';
            container.appendChild(p);
        }
    }
}

function initScrollReveal() {
    var observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) { if (entry.isIntersecting) entry.target.classList.add('visible'); });
    }, { threshold: 0.15 });
    document.querySelectorAll('.celeb-card, .game-card, .reveal').forEach(function(el) { observer.observe(el); });
}

function openEnvelope() {
    var envelope = document.getElementById('envelope');
    var letterContent = document.getElementById('letter-content');
    if (envelope) envelope.classList.add('hidden');
    if (letterContent) letterContent.classList.remove('hidden');
    setTimeout(function() { if (typeof Confetti !== 'undefined') Confetti.launch(4000); }, 200);
}

// Music toggle - now handled by AudioController
function toggleMusic() {
    if (typeof AudioController !== 'undefined') {
        AudioController.toggleMute();
    }
}

document.addEventListener('DOMContentLoaded', function() {
    var cake = document.getElementById('cake-container');
    if (cake) cake.addEventListener('click', function() { if (typeof Confetti !== 'undefined') Confetti.launch(3000); });
});
