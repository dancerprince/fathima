// ========================================
// MAIN APPLICATION CONTROLLER
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    // Initialize systems
    Confetti.init();
    initLoadingScreen();
});

// ========================================
// LOADING SCREEN
// ========================================
function initLoadingScreen() {
    const loadingBar = document.getElementById('loading-bar');
    const loadingQuote = document.getElementById('loading-quote');
    const loadingScreen = document.getElementById('loading-screen');

    // Show loading quotes
    let quoteIdx = 0;
    if (loadingQuote && typeof loadingQuotes !== 'undefined') {
        loadingQuote.textContent = loadingQuotes[0];
        const quoteInterval = setInterval(() => {
            quoteIdx = (quoteIdx + 1) % loadingQuotes.length;
            loadingQuote.style.opacity = '0';
            setTimeout(() => {
                loadingQuote.textContent = loadingQuotes[quoteIdx];
                loadingQuote.style.opacity = '1';
            }, 400);
        }, 2000);

        // Clear quote interval after loading
        setTimeout(() => clearInterval(quoteInterval), 6000);
    }

    // Create floating petals
    createLoadingPetals();

    // Animate loading bar
    let progress = 0;
    const loadInterval = setInterval(() => {
        progress += Math.random() * 15 + 5;
        if (progress >= 100) {
            progress = 100;
            clearInterval(loadInterval);
            if (loadingBar) loadingBar.style.width = '100%';

            // Transition to countdown
            setTimeout(() => {
                if (loadingScreen) loadingScreen.style.opacity = '0';
                loadingScreen.style.transition = 'opacity 0.6s ease';
                setTimeout(() => {
                    loadingScreen.classList.add('hidden');
                    startCountdown();
                }, 600);
            }, 500);
        } else {
            if (loadingBar) loadingBar.style.width = progress + '%';
        }
    }, 300);
}

function createLoadingPetals() {
    const container = document.getElementById('loading-petals');
    if (!container) return;

    const petals = ['🌸', '🩷', '💮', '🌺', '✿', '❀'];
    for (let i = 0; i < 15; i++) {
        const petal = document.createElement('div');
        petal.className = 'petal';
        petal.textContent = petals[Math.floor(Math.random() * petals.length)];
        petal.style.left = Math.random() * 100 + '%';
        petal.style.animationDuration = (Math.random() * 5 + 5) + 's';
        petal.style.animationDelay = (Math.random() * 5) + 's';
        petal.style.fontSize = (Math.random() * 0.8 + 0.8) + 'rem';
        container.appendChild(petal);
    }
}

// ========================================
// COUNTDOWN SCREEN
// ========================================
function startCountdown() {
    const countdownScreen = document.getElementById('countdown-screen');
    const countdownNumbers = document.getElementById('countdown-numbers');
    if (!countdownScreen || !countdownNumbers) {
        showMainScreen();
        return;
    }

    countdownScreen.classList.remove('hidden');
    let count = 5;
    countdownNumbers.innerHTML = `<span class="countdown-num">${count}</span>`;

    const countInterval = setInterval(() => {
        count--;
        if (count > 0) {
            countdownNumbers.innerHTML = `<span class="countdown-num">${count}</span>`;
        } else {
            clearInterval(countInterval);
            countdownScreen.style.opacity = '0';
            countdownScreen.style.transition = 'opacity 0.6s ease';
            setTimeout(() => {
                countdownScreen.classList.add('hidden');
                showMainScreen();
            }, 600);
        }
    }, 1000);
}

// ========================================
// MAIN SCREEN INITIALIZATION
// ========================================
function showMainScreen() {
    const mainScreen = document.getElementById('main-screen');
    if (mainScreen) {
        mainScreen.classList.remove('hidden');
        mainScreen.style.opacity = '0';
        mainScreen.style.transition = 'opacity 0.8s ease';
        requestAnimationFrame(() => {
            mainScreen.style.opacity = '1';
        });
    }

    // Launch confetti celebration!
    setTimeout(() => Confetti.launch(5000), 300);

    // Init all main features
    initNavigation();
    initQuoteCarousel();
    initFloatingBackground();
    initHeroParticles();
    initScrollReveal();
}

// ========================================
// NAVIGATION
// ========================================
function initNavigation() {
    const nav = document.getElementById('main-nav');
    const toggle = document.getElementById('nav-toggle');
    const links = document.querySelector('.nav-links');

    // Scroll effect
    window.addEventListener('scroll', () => {
        if (nav) {
            nav.classList.toggle('scrolled', window.scrollY > 50);
        }
        updateActiveNavLink();
    });

    // Mobile toggle
    if (toggle && links) {
        toggle.addEventListener('click', () => {
            links.classList.toggle('open');
        });

        // Close on link click
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => links.classList.remove('open'));
        });
    }
}

function updateActiveNavLink() {
    const sections = ['hero', 'quotes', 'timeline', 'games', 'letter'];
    const scrollPos = window.scrollY + 150;

    sections.forEach(id => {
        const section = document.getElementById(id);
        const link = document.querySelector(`.nav-link[href="#${id}"]`);
        if (section && link) {
            if (scrollPos >= section.offsetTop && scrollPos < section.offsetTop + section.offsetHeight) {
                document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            }
        }
    });
}

// ========================================
// SMOOTH SCROLL
// ========================================
function smoothScroll(target) {
    const el = document.querySelector(target);
    if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// ========================================
// QUOTE CAROUSEL
// ========================================
let currentQuote = 0;
let favoriteQuotes = new Set();

function initQuoteCarousel() {
    if (typeof loveQuotes === 'undefined') return;
    showQuote(0);
    createQuoteDots();

    document.getElementById('quote-prev')?.addEventListener('click', () => {
        currentQuote = (currentQuote - 1 + loveQuotes.length) % loveQuotes.length;
        showQuote(currentQuote);
    });

    document.getElementById('quote-next')?.addEventListener('click', () => {
        currentQuote = (currentQuote + 1) % loveQuotes.length;
        showQuote(currentQuote);
    });

    document.getElementById('quote-shuffle')?.addEventListener('click', () => {
        currentQuote = Math.floor(Math.random() * loveQuotes.length);
        showQuote(currentQuote);
    });

    document.getElementById('quote-heart-btn')?.addEventListener('click', toggleQuoteFavorite);

    document.getElementById('quote-fav')?.addEventListener('click', showFavoriteQuote);

    // Touch swipe support
    let touchStartX = 0;
    const carousel = document.getElementById('quote-carousel');
    if (carousel) {
        carousel.addEventListener('touchstart', e => touchStartX = e.touches[0].clientX);
        carousel.addEventListener('touchend', e => {
            const diff = touchStartX - e.changedTouches[0].clientX;
            if (Math.abs(diff) > 50) {
                if (diff > 0) {
                    currentQuote = (currentQuote + 1) % loveQuotes.length;
                } else {
                    currentQuote = (currentQuote - 1 + loveQuotes.length) % loveQuotes.length;
                }
                showQuote(currentQuote);
            }
        });
    }
}

function showQuote(index) {
    if (typeof loveQuotes === 'undefined') return;
    const textEl = document.getElementById('quote-text');
    const numEl = document.getElementById('quote-number');
    const counterEl = document.getElementById('quote-counter');
    const heartBtn = document.getElementById('quote-heart-btn');

    if (textEl) textEl.textContent = loveQuotes[index];
    if (numEl) numEl.textContent = `#${index + 1}`;
    if (counterEl) counterEl.textContent = `${index + 1} / ${loveQuotes.length}`;
    if (heartBtn) heartBtn.textContent = favoriteQuotes.has(index) ? '💖' : '🤍';

    updateQuoteDots();
}

function createQuoteDots() {
    const container = document.getElementById('quote-dots');
    if (!container || typeof loveQuotes === 'undefined') return;
    container.innerHTML = '';
    // Show limited dots for 100 quotes
    const maxDots = Math.min(loveQuotes.length, 20);
    for (let i = 0; i < maxDots; i++) {
        const dot = document.createElement('div');
        dot.className = 'quote-dot';
        if (i === 0) dot.classList.add('active');
        const quoteIndex = Math.floor(i * loveQuotes.length / maxDots);
        dot.addEventListener('click', () => {
            currentQuote = quoteIndex;
            showQuote(currentQuote);
        });
        container.appendChild(dot);
    }
}

function updateQuoteDots() {
    const dots = document.querySelectorAll('.quote-dot');
    if (!dots.length || typeof loveQuotes === 'undefined') return;
    const maxDots = dots.length;
    const activeDot = Math.floor(currentQuote * maxDots / loveQuotes.length);
    dots.forEach((dot, i) => dot.classList.toggle('active', i === activeDot));
}

function toggleQuoteFavorite() {
    if (favoriteQuotes.has(currentQuote)) {
        favoriteQuotes.delete(currentQuote);
    } else {
        favoriteQuotes.add(currentQuote);
    }
    const heartBtn = document.getElementById('quote-heart-btn');
    if (heartBtn) {
        heartBtn.textContent = favoriteQuotes.has(currentQuote) ? '💖' : '🤍';
        heartBtn.classList.add('liked');
        setTimeout(() => heartBtn.classList.remove('liked'), 500);
    }
}

function showFavoriteQuote() {
    if (favoriteQuotes.size === 0) {
        alert('💕 No favorites yet! Tap the heart on quotes you love!');
        return;
    }
    const favArray = Array.from(favoriteQuotes);
    currentQuote = favArray[Math.floor(Math.random() * favArray.length)];
    showQuote(currentQuote);
}

// ========================================
// FLOATING BACKGROUND ELEMENTS
// ========================================
function initFloatingBackground() {
    const container = document.getElementById('bg-elements');
    if (!container) return;

    const emojis = ['💖', '💕', '🌸', '✨', '💗', '🦋', '🌹', '💫', '🩷', '🌺'];
    for (let i = 0; i < 20; i++) {
        const el = document.createElement('div');
        el.className = 'bg-float';
        el.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        el.style.left = Math.random() * 100 + '%';
        el.style.animationDuration = (Math.random() * 15 + 10) + 's';
        el.style.animationDelay = (Math.random() * 10) + 's';
        el.style.fontSize = (Math.random() * 1 + 1) + 'rem';
        container.appendChild(el);
    }
}

// ========================================
// HERO PARTICLES
// ========================================
function initHeroParticles() {
    const container = document.getElementById('hero-particles');
    if (!container) return;

    const particles = ['✨', '⭐', '💫', '🌟'];
    for (let i = 0; i < 25; i++) {
        const p = document.createElement('div');
        p.style.position = 'absolute';
        p.style.left = Math.random() * 100 + '%';
        p.style.top = Math.random() * 100 + '%';
        p.style.fontSize = (Math.random() * 0.8 + 0.5) + 'rem';
        p.style.opacity = Math.random() * 0.4 + 0.1;
        p.style.animation = `twinkle ${Math.random() * 3 + 2}s ease-in-out infinite`;
        p.style.animationDelay = Math.random() * 3 + 's';
        p.textContent = particles[Math.floor(Math.random() * particles.length)];
        p.style.pointerEvents = 'none';
        container.appendChild(p);
    }
}

// ========================================
// SCROLL REVEAL ANIMATIONS
// ========================================
function initScrollReveal() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.15 });

    document.querySelectorAll('.celeb-card, .game-card, .reveal').forEach(el => {
        observer.observe(el);
    });
}

// ========================================
// ENVELOPE / LOVE LETTER
// ========================================
function openEnvelope() {
    const envelope = document.getElementById('envelope');
    const letterContent = document.getElementById('letter-content');

    if (envelope) envelope.classList.add('hidden');
    if (letterContent) letterContent.classList.remove('hidden');

    // Confetti when opening letter
    setTimeout(() => Confetti.launch(4000), 200);
}

// ========================================
// MUSIC TOGGLE (Placeholder)
// ========================================
let musicPlaying = false;

function toggleMusic() {
    musicPlaying = !musicPlaying;
    const btn = document.getElementById('music-toggle');
    if (btn) btn.textContent = musicPlaying ? '🔊' : '🔇';
    // Audio would be loaded here if available
}

// ========================================
// CAKE CLICK EFFECT
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    const cake = document.getElementById('cake-container');
    if (cake) {
        cake.addEventListener('click', () => {
            Confetti.launch(3000);
        });
    }
});
