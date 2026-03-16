/* ============================================
   ANIME COUPLE DANCE — Fullscreen Background
   Salsa dance video plays fullscreen at 45%
   opacity behind all page content.
   Scrubs on scroll for interactivity.
   ============================================ */
var CoupleDoll = {
    container: null,
    video: null,
    labelEl: null,
    progressFill: null,
    initialized: false,
    animFrameId: null,

    scrollY: 0,
    isScrolling: false,
    scrollTimer: null,
    phase: 'idle',
    videoDuration: 5.08,
    videoReady: false,
    lastStepScroll: 0,
    currentStep: -1,
    stepLabelTimer: null,

    /* Video path — new salsa video */
    VIDEO_SRC: 'assets/couple-dance.mp4',

    /* Dance step labels shown as user scrolls */
    danceSteps: [
        '\uD83D\uDC83 Romantic Sway',
        '\uD83D\uDD25 Salsa Basic Step',
        '\uD83C\uDF00 Cross Body Lead',
        '\u2728 Inside Turn',
        '\uD83D\uDC96 Romantic Dip',
        '\uD83C\uDF1F Waist Lift',
        '\uD83D\uDCAB Overhead Lift',
        '\uD83D\uDD25 Star Lift',
        '\u2764\uFE0F Lean Back Lift',
        '\uD83C\uDF00 Spinning Lift',
        '\uD83D\uDC83 Copa Move',
        '\uD83D\uDC96 Enchufla Turn',
        '\u2728 Setenta Combo',
        '\uD83D\uDD25 Flamenco Lift',
        '\uD83C\uDF1F Butterfly Lift'
    ],

    init: function() {
        if (this.initialized) return;
        this.createDOM();
        this.bindScroll();
        this.startLoop();
        this.initialized = true;
    },

    createDOM: function() {
        var self = this;

        this.container = document.createElement('div');
        this.container.id = 'couple-doll-layer';

        var html =
            /* Fullscreen video */
            '<div class="couple-video-container">' +
                '<video class="couple-dance-video" id="couple-dance-video" ' +
                    'muted playsinline preload="auto" ' +
                    'src="' + this.VIDEO_SRC + '"></video>' +
            '</div>' +

            /* Dark overlay for text readability */
            '<div class="video-dark-overlay"></div>' +

            /* Floating hearts */
            '<div class="dance-hearts" id="dance-hearts">' +
                '<span class="dance-heart">\uD83D\uDC96</span>' +
                '<span class="dance-heart">\uD83D\uDC95</span>' +
                '<span class="dance-heart">\uD83D\uDC97</span>' +
                '<span class="dance-heart">\u2764\uFE0F</span>' +
                '<span class="dance-heart">\uD83D\uDC9E</span>' +
            '</div>' +

            /* Step label */
            '<div class="dance-step-label" id="dance-step-label"></div>' +

            /* Progress bar */
            '<div class="dance-progress">' +
                '<div class="dance-progress-fill" id="dance-progress-fill"></div>' +
            '</div>';

        this.container.innerHTML = html;

        /* Insert as FIRST child of main-screen so it's behind everything */
        var mainScreen = document.getElementById('main-screen');
        if (mainScreen) {
            mainScreen.insertBefore(this.container, mainScreen.firstChild);
        } else {
            document.body.appendChild(this.container);
        }

        this.video = document.getElementById('couple-dance-video');
        this.labelEl = document.getElementById('dance-step-label');
        this.progressFill = document.getElementById('dance-progress-fill');

        /* Setup video */
        if (this.video) {
            this.video.pause();
            this.video.currentTime = 0;

            this.video.addEventListener('loadedmetadata', function() {
                self.videoDuration = self.video.duration || 5.08;
                self.videoReady = true;
            });
        }

        /* Show layer with fade-in */
        setTimeout(function() {
            var el = document.getElementById('couple-doll-layer');
            if (el) el.classList.add('visible');
        }, 800);
    },

    bindScroll: function() {
        var self = this;
        window.addEventListener('scroll', function() {
            self.scrollY = window.scrollY || window.pageYOffset;
            self.isScrolling = true;

            clearTimeout(self.scrollTimer);
            self.scrollTimer = setTimeout(function() {
                self.isScrolling = false;
            }, 250);
        }, { passive: true });
    },

    updatePositions: function() {
        if (!this.container || !this.video) return;

        var maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        if (maxScroll <= 0) return;

        var scrollFraction = Math.min(1, this.scrollY / maxScroll);

        /* Activate dancing state after small scroll */
        if (scrollFraction > 0.02) {
            if (this.phase !== 'dancing') {
                this.phase = 'dancing';
                this.container.classList.add('dancing');
                this.lastStepScroll = this.scrollY;
            }
        } else {
            if (this.phase !== 'idle') {
                this.phase = 'idle';
                this.container.classList.remove('dancing');
            }
        }

        /* Scrub video to match scroll position */
        if (this.videoReady && this.video.readyState >= 2) {
            /* Loop the video multiple times across the full scroll */
            var loops = 4;
            var loopedFraction = (scrollFraction * loops) % 1;
            var targetTime = loopedFraction * this.videoDuration;

            if (Math.abs(this.video.currentTime - targetTime) > 0.03) {
                this.video.currentTime = targetTime;
            }
        }

        /* Update progress bar */
        if (this.progressFill) {
            this.progressFill.style.width = (scrollFraction * 100) + '%';
        }

        /* Show step labels every ~150px of scroll */
        if (this.phase === 'dancing' && Math.abs(this.scrollY - this.lastStepScroll) > 150) {
            this.lastStepScroll = this.scrollY;
            this.showNextStep();
        }
    },

    showNextStep: function() {
        this.currentStep = (this.currentStep + 1) % this.danceSteps.length;
        var stepName = this.danceSteps[this.currentStep];

        if (this.labelEl) {
            this.labelEl.textContent = stepName;
            this.labelEl.classList.add('visible');

            var self = this;
            clearTimeout(this.stepLabelTimer);
            this.stepLabelTimer = setTimeout(function() {
                if (self.labelEl) self.labelEl.classList.remove('visible');
            }, 2500);
        }

        /* Spawn sparkles */
        var sparkleCount = stepName.indexOf('Lift') !== -1 ? 10 : 5;
        for (var i = 0; i < sparkleCount; i++) {
            var self = this;
            (function(delay) {
                setTimeout(function() { self.spawnSparkle(); }, delay);
            })(i * 80);
        }
    },

    spawnSparkle: function() {
        if (!this.container) return;

        var sp = document.createElement('div');
        sp.className = 'dance-sparkle';

        var colors = ['#FF4081', '#FFD700', '#FF1493', '#E91E63', '#FF69B4', '#9C27B0', '#AB47BC'];
        var color = colors[Math.floor(Math.random() * colors.length)];
        var size = Math.random() * 16 + 8;

        sp.innerHTML = '<svg viewBox="0 0 20 20" width="' + size + '" height="' + size + '">' +
            '<path d="M10 0L12 8L20 10L12 12L10 20L8 12L0 10L8 8z" fill="' + color + '"/></svg>';

        sp.style.left = (10 + Math.random() * 80) + '%';
        sp.style.top = (10 + Math.random() * 80) + '%';
        sp.style.setProperty('--tx', (Math.random() - 0.5) * 100 + 'px');
        sp.style.setProperty('--ty', -(Math.random() * 80 + 40) + 'px');

        document.body.appendChild(sp);
        setTimeout(function() { if (sp.parentNode) sp.parentNode.removeChild(sp); }, 1800);
    },

    startLoop: function() {
        var self = this;
        function loop() {
            self.updatePositions();
            self.animFrameId = requestAnimationFrame(loop);
        }
        self.animFrameId = requestAnimationFrame(loop);
    },

    updateTheme: function() {
        /* Video looks great on any theme — no changes needed */
    },

    destroy: function() {
        if (this.animFrameId) cancelAnimationFrame(this.animFrameId);
        if (this.container && this.container.parentNode) {
            this.container.parentNode.removeChild(this.container);
        }
        this.initialized = false;
    }
};
