/* ============================================
   ANIME COUPLE DANCE — Scroll-Driven Video
   Video from: Anime Couple Dancing in Magical
   Wildflower Field. Plays on scroll.
   ============================================ */
var CoupleDoll = {
    container: null,
    video: null,
    approachWrapper: null,
    videoContainer: null,
    labelEl: null,
    progressFill: null,
    initialized: false,
    animFrameId: null,

    scrollY: 0,
    isScrolling: false,
    scrollTimer: null,
    phase: 'approach',
    videoDuration: 5.08,
    videoReady: false,
    lastStepScroll: 0,
    currentStep: -1,
    stepLabelTimer: null,
    particleInterval: null,

    /* Video path */
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
        this.container.classList.add('phase-approach');

        var html =
            '<div class="dance-stage">' +
                '<div class="spotlight spotlight-left"></div>' +
                '<div class="spotlight spotlight-center"></div>' +
                '<div class="spotlight spotlight-right"></div>' +
                '<div class="wildflower-glow"></div>' +
                '<div class="stage-floor"></div>' +
                '<div class="video-glow-ring"></div>' +

                /* Main video — shown when dancing */
                '<div class="couple-video-container" id="couple-video-container">' +
                    '<video class="couple-dance-video" id="couple-dance-video" ' +
                        'muted playsinline preload="auto" ' +
                        'src="' + this.VIDEO_SRC + '"></video>' +
                '</div>' +

                /* Approach split — shown initially */
                '<div class="couple-approach-wrapper" id="couple-approach-wrapper">' +
                    '<div class="approach-boy">' +
                        '<video class="couple-dance-video-clone" muted playsinline preload="auto" ' +
                            'src="' + this.VIDEO_SRC + '"></video>' +
                    '</div>' +
                    '<div class="approach-girl">' +
                        '<video class="couple-dance-video-clone" muted playsinline preload="auto" ' +
                            'src="' + this.VIDEO_SRC + '"></video>' +
                    '</div>' +
                '</div>' +

                /* Hearts */
                '<div class="dance-hearts" id="dance-hearts">' +
                    '<span class="dance-heart">\uD83D\uDC96</span>' +
                    '<span class="dance-heart">\uD83D\uDC95</span>' +
                    '<span class="dance-heart">\uD83D\uDC97</span>' +
                    '<span class="dance-heart">\u2764\uFE0F</span>' +
                    '<span class="dance-heart">\uD83D\uDC9E</span>' +
                '</div>' +

                '<div class="dance-step-label" id="dance-step-label"></div>' +

                '<div class="dance-progress">' +
                    '<div class="dance-progress-fill" id="dance-progress-fill"></div>' +
                '</div>' +
            '</div>';

        this.container.innerHTML = html;

        var mainScreen = document.getElementById('main-screen');
        if (mainScreen) mainScreen.insertBefore(this.container, mainScreen.firstChild);
        else document.body.appendChild(this.container);

        this.video = document.getElementById('couple-dance-video');
        this.videoContainer = document.getElementById('couple-video-container');
        this.approachWrapper = document.getElementById('couple-approach-wrapper');
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

            /* Also pause the clone videos at frame 0 */
            var clones = this.container.querySelectorAll('.couple-dance-video-clone');
            for (var i = 0; i < clones.length; i++) {
                clones[i].pause();
                clones[i].currentTime = 0;
            }
        }

        /* Show layer with fade */
        setTimeout(function() {
            var el = document.getElementById('couple-doll-layer');
            if (el) el.classList.add('visible');
        }, 800);

        /* Start magic particles when dancing */
        this.startMagicParticles();
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

        /* Use first 50% of page scroll for the approach + dance */
        var scrollFraction = Math.min(1, this.scrollY / (maxScroll * 0.5));

        /* Phase logic: 0-0.15 = approach, 0.15-1.0 = dancing */
        if (scrollFraction < 0.15) {
            /* ===== APPROACH PHASE ===== */
            if (this.phase !== 'approach') {
                this.phase = 'approach';
                this.container.classList.add('phase-approach');
                this.container.classList.remove('phase-merge', 'dancing');
            }

            /* Smoothly interpolate approach progress */
            var approachProgress = scrollFraction / 0.15;
            var eased = approachProgress * approachProgress * (3 - 2 * approachProgress);

            /* Move clone videos' currentTime slightly to show they're "alive" */
            var clones = this.container.querySelectorAll('.couple-dance-video-clone');
            for (var i = 0; i < clones.length; i++) {
                if (clones[i].readyState >= 2) {
                    clones[i].currentTime = eased * 0.3;
                }
            }

            /* Transition from split to merge based on scroll */
            if (eased > 0.7) {
                this.container.classList.remove('phase-approach');
                this.container.classList.add('phase-merge');
            } else {
                this.container.classList.remove('phase-merge');
                this.container.classList.add('phase-approach');
            }

        } else {
            /* ===== DANCING PHASE ===== */
            if (this.phase !== 'dancing') {
                this.phase = 'dancing';
                this.container.classList.remove('phase-approach', 'phase-merge');
                this.container.classList.add('dancing');
                this.lastStepScroll = this.scrollY;
            }

            /* Map scroll to video time */
            var danceFraction = (scrollFraction - 0.15) / 0.85;
            danceFraction = Math.max(0, Math.min(1, danceFraction));

            /* Scrub video to this time */
            if (this.videoReady && this.video.readyState >= 2) {
                /* Loop the video multiple times across the scroll range */
                var loops = 4;
                var loopedFraction = (danceFraction * loops) % 1;
                var targetTime = loopedFraction * this.videoDuration;
                /* Only update if difference is meaningful (avoids jitter) */
                if (Math.abs(this.video.currentTime - targetTime) > 0.03) {
                    this.video.currentTime = targetTime;
                }
            }

            /* Update progress bar */
            if (this.progressFill) {
                this.progressFill.style.width = (danceFraction * 100) + '%';
            }

            /* Show step labels every ~120px of scroll */
            if (Math.abs(this.scrollY - this.lastStepScroll) > 120) {
                this.lastStepScroll = this.scrollY;
                this.showNextStep();
            }
        }

        /* Fade opacity based on scroll position */
        var opacityBase = scrollFraction < 0.05 ? 0.3 + (scrollFraction / 0.05) * 0.7 : 1;
        this.container.style.opacity = Math.min(1, opacityBase);
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
        var stage = this.container.querySelector('.dance-stage');
        if (!stage) return;

        var sp = document.createElement('div');
        sp.className = 'dance-sparkle';

        var colors = ['#FF4081', '#FFD700', '#FF1493', '#E91E63', '#FF69B4', '#9C27B0', '#AB47BC'];
        var color = colors[Math.floor(Math.random() * colors.length)];
        var size = Math.random() * 16 + 8;

        sp.innerHTML = '<svg viewBox="0 0 20 20" width="' + size + '" height="' + size + '">' +
            '<path d="M10 0L12 8L20 10L12 12L10 20L8 12L0 10L8 8z" fill="' + color + '"/></svg>';

        sp.style.position = 'absolute';
        sp.style.left = (35 + Math.random() * 30) + '%';
        sp.style.bottom = (80 + Math.random() * 280) + 'px';
        sp.style.setProperty('--tx', (Math.random() - 0.5) * 100 + 'px');
        sp.style.setProperty('--ty', -(Math.random() * 80 + 40) + 'px');

        stage.appendChild(sp);
        setTimeout(function() { if (sp.parentNode) sp.parentNode.removeChild(sp); }, 1800);
    },

    startMagicParticles: function() {
        var self = this;
        this.particleInterval = setInterval(function() {
            if (self.phase !== 'dancing' || !self.container) return;
            var stage = self.container.querySelector('.dance-stage');
            if (!stage) return;

            var p = document.createElement('div');
            p.className = 'magic-particle';

            var colors = [
                'rgba(255,64,129,0.7)', 'rgba(255,215,0,0.6)',
                'rgba(255,150,200,0.5)', 'rgba(156,39,176,0.5)',
                'rgba(255,255,255,0.4)', 'rgba(100,200,150,0.4)'
            ];
            p.style.background = colors[Math.floor(Math.random() * colors.length)];
            p.style.width = (Math.random() * 5 + 2) + 'px';
            p.style.height = p.style.width;
            p.style.left = (30 + Math.random() * 40) + '%';
            p.style.bottom = (Math.random() * 100 + 50) + 'px';
            p.style.setProperty('--mx', (Math.random() - 0.5) * 60 + 'px');
            p.style.setProperty('--mx2', (Math.random() - 0.5) * 80 + 'px');
            p.style.setProperty('--my', -(Math.random() * 200 + 100) + 'px');
            p.style.animationDuration = (Math.random() * 3 + 2) + 's';

            stage.appendChild(p);
            setTimeout(function() { if (p.parentNode) p.parentNode.removeChild(p); }, 5000);
        }, 200);
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
        /* Theme changes don't affect video — it looks great on any theme */
    },

    destroy: function() {
        if (this.animFrameId) cancelAnimationFrame(this.animFrameId);
        if (this.particleInterval) clearInterval(this.particleInterval);
        if (this.container && this.container.parentNode) {
            this.container.parentNode.removeChild(this.container);
        }
        this.initialized = false;
    }
};
