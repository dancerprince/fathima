/* ============================================
   ANIME COUPLE DANCE - Fullscreen Background
   Salsa dance video plays fullscreen at 45%
   opacity behind all page content.
   MOBILE: Loops video continuously (scroll-scrub
   does NOT work on iOS/Android).
   DESKTOP: Scrubs on scroll for interactivity.
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
    mobileVideoPlaying: false,
    lastStepScroll: 0,
    currentStep: -1,
    stepLabelTimer: null,

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

        /* On mobile, we need a user gesture to start video playback.
           iOS/Android block video.play() unless triggered by touch/click. */
        if (this.isMobile()) {
            this.bindMobileAutoplay();
        }
    },

    isMobile: function() {
        return window.innerWidth <= 768 || ('ontouchstart' in window);
    },

    /* =============================================
       MOBILE VIDEO FIX
       iOS Safari & Android Chrome block:
       1) autoplay without user gesture
       2) video.currentTime scrubbing without play()
       
       Solution: On first user touch/click, call
       video.play() with muted+loop. Video then
       plays continuously as background.
       ============================================= */
    bindMobileAutoplay: function() {
        var self = this;
        var started = false;

        function startMobileVideo() {
            if (started || !self.video) return;

            /* Ensure muted (mandatory for mobile autoplay) */
            self.video.muted = true;

            var playPromise = self.video.play();
            if (playPromise !== undefined) {
                playPromise.then(function() {
                    started = true;
                    self.mobileVideoPlaying = true;
                    self.videoReady = true;
                    self.videoDuration = self.video.duration || 5.08;
                    removeMobileListeners();
                }).catch(function(err) {
                    /* Still blocked - will retry on next gesture */
                    console.log('Video play deferred, waiting for gesture:', err.message);
                });
            } else {
                started = true;
                self.mobileVideoPlaying = true;
                self.videoReady = true;
                removeMobileListeners();
            }
        }

        function removeMobileListeners() {
            document.removeEventListener('touchstart', startMobileVideo, true);
            document.removeEventListener('touchend', startMobileVideo, true);
            document.removeEventListener('click', startMobileVideo, true);
            document.removeEventListener('scroll', startMobileVideo, true);
        }

        /* Try immediate autoplay (works on Chrome Android when muted) */
        setTimeout(function() { startMobileVideo(); }, 200);

        /* Fallback: listen for ANY user gesture */
        document.addEventListener('touchstart', startMobileVideo, { capture: true, passive: true });
        document.addEventListener('touchend', startMobileVideo, { capture: true, passive: true });
        document.addEventListener('click', startMobileVideo, { capture: true, passive: true });
        document.addEventListener('scroll', startMobileVideo, { capture: true, passive: true });
    },

    createDOM: function() {
        var self = this;
        var mobile = this.isMobile();

        this.container = document.createElement('div');
        this.container.id = 'couple-doll-layer';

        /* Mobile: add loop for continuous playback (no scroll-scrub).
           Both: preload="auto" so video data is buffered. */
        var loopAttr = mobile ? ' loop' : '';

        var html =
            '<div class="couple-video-container">' +
                '<video class="couple-dance-video" id="couple-dance-video" ' +
                    'muted playsinline webkit-playsinline' + loopAttr + ' preload="auto" ' +
                    'src="' + this.VIDEO_SRC + '" type="video/mp4"></video>' +
            '</div>' +
            '<div class="video-dark-overlay"></div>' +
            '<div class="dance-hearts" id="dance-hearts">' +
                '<span class="dance-heart">\uD83D\uDC96</span>' +
                '<span class="dance-heart">\uD83D\uDC95</span>' +
                '<span class="dance-heart">\uD83D\uDC97</span>' +
                (mobile ? '' : '<span class="dance-heart">\u2764\uFE0F</span><span class="dance-heart">\uD83D\uDC9E</span>') +
            '</div>' +
            '<div class="dance-step-label" id="dance-step-label"></div>' +
            '<div class="dance-progress">' +
                '<div class="dance-progress-fill" id="dance-progress-fill"></div>' +
            '</div>';

        this.container.innerHTML = html;

        var mainScreen = document.getElementById('main-screen');
        if (mainScreen) {
            mainScreen.insertBefore(this.container, mainScreen.firstChild);
        } else {
            document.body.appendChild(this.container);
        }

        /* These lines MUST run regardless of where container was inserted */
        this.video = document.getElementById('couple-dance-video');
        this.labelEl = document.getElementById('dance-step-label');
        this.progressFill = document.getElementById('dance-progress-fill');

        /* MOBILE FIX: If AudioController already unlocked a video element
           during the user's first tap, swap it into our container.
           This reuses the already-playing, gesture-unlocked video. */
        if (mobile && window.__mobileVideoUnlocked) {
            var unlockedVideo = window.__mobileVideoUnlocked;
            var oldVideo = this.video;
            if (oldVideo && oldVideo.parentNode) {
                /* Copy attributes and replace */
                unlockedVideo.id = 'couple-dance-video';
                unlockedVideo.className = 'couple-dance-video';
                unlockedVideo.style.cssText = ''; /* Clear the hidden style */
                oldVideo.parentNode.replaceChild(unlockedVideo, oldVideo);
                this.video = unlockedVideo;
                this.mobileVideoPlaying = true;
                this.videoReady = true;
                this.videoDuration = unlockedVideo.duration || 5.08;
            }
            delete window.__mobileVideoUnlocked;
        }

        if (this.video) {

            this.video.muted = true;            /* Force muted via JS property AND attribute (iOS needs both) */
            this.video.muted = true;
            this.video.setAttribute('muted', '');
            this.video.setAttribute('playsinline', '');
            this.video.setAttribute('webkit-playsinline', '');
            if (mobile) {
                this.video.setAttribute('loop', '');
            }

            this.video.addEventListener('loadedmetadata', function() {
                self.videoDuration = self.video.duration || 5.08;
                self.videoReady = true;
            });

            this.video.addEventListener('canplay', function() {
                self.videoReady = true;
                /* Desktop only: keep paused for scroll-scrub control */
                if (!mobile) {
                    self.video.pause();
                    self.video.currentTime = 0;
                }
            });

            this.video.addEventListener('error', function(e) {
                console.warn('Video error:', e);
            });

            /* Force start loading */
            this.video.load();
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

        /* Mobile: also detect touchmove as scroll fallback */
        if (this.isMobile()) {
            window.addEventListener('touchmove', function() {
                self.scrollY = window.scrollY || window.pageYOffset;
                self.isScrolling = true;
            }, { passive: true });
        }
    },

    updatePositions: function() {
        if (!this.container || !this.video) return;

        var maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        if (maxScroll <= 0) return;

        var scrollFraction = Math.min(1, this.scrollY / maxScroll);
        var mobile = this.isMobile();

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

        /* === VIDEO PLAYBACK STRATEGY ===
           MOBILE:  Video loops via loop attribute. play() called on user gesture.
                    If paused for any reason, try to resume.
           DESKTOP: Scrub video.currentTime to match scroll position. */
        if (mobile) {
            if (this.mobileVideoPlaying && this.video.paused && scrollFraction > 0.01) {
                try { this.video.play(); } catch(e) {}
            }
        } else {
            if (this.videoReady && this.video.readyState >= 2) {
                var loops = 4;
                var loopedFraction = (scrollFraction * loops) % 1;
                var targetTime = loopedFraction * this.videoDuration;
                if (Math.abs(this.video.currentTime - targetTime) > 0.03) {
                    this.video.currentTime = targetTime;
                }
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

        /* Spawn sparkles (fewer on mobile) */
        var mobile = this.isMobile();
        var sparkleCount = stepName.indexOf('Lift') !== -1 ? (mobile ? 3 : 10) : (mobile ? 1 : 5);
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
        /* Video looks great on any theme */
    },

    destroy: function() {
        if (this.animFrameId) cancelAnimationFrame(this.animFrameId);
        if (this.container && this.container.parentNode) {
            this.container.parentNode.removeChild(this.container);
        }
        this.initialized = false;
    }
};
