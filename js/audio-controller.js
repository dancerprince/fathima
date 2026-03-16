/* ==========================================
   AUDIO CONTROLLER — Love Song Manager
   Handles music playback throughout the experience
   
   Flow:
   1. User taps anywhere → music starts (autoplay policy)
   2. Music loops throughout entire timeline intro
   3. Music continues into main app
   4. After one full playthrough in main app → show mute button
   5. Mute button allows toggle on/off
   ========================================== */

const AudioController = (function() {
    'use strict';

    let audio = null;
    let isPlaying = false;
    let isMuted = false;
    let hasStarted = false;
    let hasCompletedOnce = false;  // Tracks if song played fully at least once
    let mainAppReached = false;    // True when main app loads
    let muteButtonShown = false;
    let tapOverlay = null;
    let fadeInterval = null;
    let onFirstPlayCallback = null;

    const AUDIO_SRC = 'assets/love-song.mp3';
    const FADE_DURATION = 2000;  // ms

    // ===== Create the Audio element =====
    function createAudio() {
        audio = new Audio(AUDIO_SRC);
        audio.loop = true;
        audio.volume = 0;
        audio.preload = 'auto';

        // Track when song ends one full loop
        audio.addEventListener('ended', function() {
            // Even though loop=true will restart it, this event fires before restart
            // Actually, with loop=true, 'ended' does NOT fire. So we track via timeupdate
        });

        // Track progress for "completed once" detection
        audio.addEventListener('timeupdate', function() {
            if (!hasCompletedOnce && audio.duration > 0) {
                // If we've played through at least 95% of the song
                if (audio.currentTime >= audio.duration * 0.95) {
                    hasCompletedOnce = true;
                    if (mainAppReached && !muteButtonShown) {
                        showMuteButton();
                    }
                }
            }
        });

        return audio;
    }

    // ===== Create "Tap to Begin" overlay =====
    function createTapOverlay() {
        tapOverlay = document.createElement('div');
        tapOverlay.className = 'audio-tap-overlay';
        tapOverlay.id = 'audio-tap-overlay';

        tapOverlay.innerHTML = `
            <div class="tap-content">
                <div class="tap-rings">
                    <div class="tap-ring tap-ring-1"></div>
                    <div class="tap-ring tap-ring-2"></div>
                    <div class="tap-ring tap-ring-3"></div>
                </div>
                <div class="tap-icon">💕</div>
                <div class="tap-text">Tap Anywhere to Begin</div>
                <div class="tap-subtext">🎵 with music & love 🎵</div>
            </div>
        `;

        document.body.insertBefore(tapOverlay, document.body.firstChild);

        // Listen for any user interaction
        const startAudio = function(e) {
            e.preventDefault();
            tapOverlay.removeEventListener('click', startAudio);
            tapOverlay.removeEventListener('touchstart', startAudio);
            document.removeEventListener('keydown', startAudio);

            // Dismiss overlay with animation
            tapOverlay.classList.add('dismissing');
            setTimeout(function() {
                tapOverlay.remove();
                tapOverlay = null;
            }, 800);

            // Start the music!
            startPlaying();

            // Trigger the callback (starts the timeline)
            if (onFirstPlayCallback) {
                onFirstPlayCallback();
            }
        };

        tapOverlay.addEventListener('click', startAudio);
        tapOverlay.addEventListener('touchstart', startAudio, { passive: false });
        document.addEventListener('keydown', startAudio);
    }

    // ===== Start playing with fade-in =====
    function startPlaying() {
        if (hasStarted) return;
        hasStarted = true;

        if (!audio) createAudio();

        audio.volume = 0;
        var playPromise = audio.play();

        if (playPromise !== undefined) {
            playPromise.then(function() {
                isPlaying = true;
                fadeIn();
            }).catch(function(err) {
                console.warn('Audio play failed:', err);
                // Try again on next interaction
                document.addEventListener('click', function retry() {
                    audio.play().then(function() {
                        isPlaying = true;
                        fadeIn();
                    }).catch(function() {});
                    document.removeEventListener('click', retry);
                }, { once: true });
            });
        }
    }

    // ===== Fade in volume =====
    function fadeIn(targetVol, duration) {
        targetVol = targetVol || 0.7;
        duration = duration || FADE_DURATION;

        if (fadeInterval) clearInterval(fadeInterval);

        var startVol = audio.volume;
        var steps = 40;
        var stepTime = duration / steps;
        var volStep = (targetVol - startVol) / steps;
        var currentStep = 0;

        fadeInterval = setInterval(function() {
            currentStep++;
            var newVol = startVol + (volStep * currentStep);
            audio.volume = Math.max(0, Math.min(1, newVol));

            if (currentStep >= steps) {
                clearInterval(fadeInterval);
                fadeInterval = null;
                audio.volume = targetVol;
            }
        }, stepTime);
    }

    // ===== Fade out volume =====
    function fadeOut(targetVol, duration, callback) {
        targetVol = targetVol || 0;
        duration = duration || FADE_DURATION;

        if (fadeInterval) clearInterval(fadeInterval);

        var startVol = audio.volume;
        var steps = 40;
        var stepTime = duration / steps;
        var volStep = (targetVol - startVol) / steps;
        var currentStep = 0;

        fadeInterval = setInterval(function() {
            currentStep++;
            var newVol = startVol + (volStep * currentStep);
            audio.volume = Math.max(0, Math.min(1, newVol));

            if (currentStep >= steps) {
                clearInterval(fadeInterval);
                fadeInterval = null;
                audio.volume = targetVol;
                if (callback) callback();
            }
        }, stepTime);
    }

    // ===== Show the mute/unmute button =====
    function showMuteButton() {
        if (muteButtonShown) return;
        muteButtonShown = true;

        var btn = document.getElementById('music-toggle');
        if (!btn) return;

        // Update button appearance
        updateMuteButtonIcon(btn);

        // Show with animation
        btn.classList.add('audio-active');
        btn.style.display = 'flex';
        btn.style.alignItems = 'center';
        btn.style.justifyContent = 'center';

        // Remove old onclick and add new one
        btn.removeAttribute('onclick');
        btn.addEventListener('click', toggleMute);
    }

    // ===== Force show mute button (for main app entry) =====
    function showMuteButtonNow() {
        mainAppReached = true;
        // If song already completed once, show now
        if (hasCompletedOnce && !muteButtonShown) {
            showMuteButton();
        }
        // Also set a timeout — if after 30s of main app the song hasn't completed, show anyway
        setTimeout(function() {
            if (!muteButtonShown) {
                showMuteButton();
            }
        }, 30000);
    }

    // ===== Update the mute button icon =====
    function updateMuteButtonIcon(btn) {
        if (!btn) btn = document.getElementById('music-toggle');
        if (!btn) return;

        if (isMuted) {
            btn.innerHTML = `
                <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                    <line x1="23" y1="9" x2="17" y2="15"></line>
                    <line x1="17" y1="9" x2="23" y2="15"></line>
                </svg>`;
            btn.classList.add('muted');
            btn.classList.remove('playing');
            btn.title = 'Unmute Music';
        } else {
            btn.innerHTML = `
                <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                    <path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
                    <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                </svg>`;
            btn.classList.remove('muted');
            btn.classList.add('playing');
            btn.title = 'Mute Music';
        }
    }

    // ===== Toggle mute/unmute =====
    function toggleMute() {
        if (!audio) return;

        isMuted = !isMuted;

        if (isMuted) {
            fadeOut(0, 500);
        } else {
            if (audio.paused) {
                audio.play().catch(function() {});
            }
            fadeIn(0.7, 500);
        }

        updateMuteButtonIcon();
    }

    // ===== Temporarily lower volume (for bridge/countdown) =====
    function duckVolume() {
        if (!audio || isMuted) return;
        fadeOut(0.25, 1000);
    }

    // ===== Restore volume after duck =====
    function restoreVolume() {
        if (!audio || isMuted) return;
        fadeIn(0.7, 1000);
    }

    // ===== Pause audio completely =====
    function pause() {
        if (audio && !audio.paused) {
            audio.pause();
            isPlaying = false;
        }
    }

    // ===== Resume audio =====
    function resume() {
        if (audio && audio.paused && !isMuted) {
            audio.play().catch(function() {});
            isPlaying = true;
        }
    }

    // ===== Get current state =====
    function getState() {
        return {
            isPlaying: isPlaying,
            isMuted: isMuted,
            hasStarted: hasStarted,
            hasCompletedOnce: hasCompletedOnce,
            muteButtonShown: muteButtonShown
        };
    }

    // ===== Initialize — show tap overlay =====
    function init(onReady) {
        onFirstPlayCallback = onReady;
        createAudio();
        createTapOverlay();
    }

    return {
        init: init,
        startPlaying: startPlaying,
        toggleMute: toggleMute,
        duckVolume: duckVolume,
        restoreVolume: restoreVolume,
        showMuteButtonNow: showMuteButtonNow,
        pause: pause,
        resume: resume,
        fadeIn: fadeIn,
        fadeOut: fadeOut,
        getState: getState
    };

})();
