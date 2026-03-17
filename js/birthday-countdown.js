/* ==================== BIRTHDAY COUNTDOWN - March 18th ==================== */
(function() {
    var BIRTHDAY_MONTH = 2; // March (0-indexed)
    var BIRTHDAY_DAY = 18;
    var countdownInterval = null;

    function getNextBirthday() {
        var now = new Date();
        var year = now.getFullYear();
        var birthday = new Date(year, BIRTHDAY_MONTH, BIRTHDAY_DAY, 0, 0, 0);
        if (now > birthday) {
            birthday = new Date(year + 1, BIRTHDAY_MONTH, BIRTHDAY_DAY, 0, 0, 0);
        }
        return birthday;
    }

    function isBirthdayToday() {
        var now = new Date();
        return now.getMonth() === BIRTHDAY_MONTH && now.getDate() === BIRTHDAY_DAY;
    }

    function getTimeRemaining() {
        var now = new Date();
        var birthday = getNextBirthday();
        var total = birthday - now;
        var days = Math.floor(total / (1000 * 60 * 60 * 24));
        var hours = Math.floor((total / (1000 * 60 * 60)) % 24);
        var minutes = Math.floor((total / (1000 * 60)) % 60);
        var seconds = Math.floor((total / 1000) % 60);
        return { total: total, days: days, hours: hours, minutes: minutes, seconds: seconds };
    }

    function getDayOfYearProgress() {
        var now = new Date();
        var birthday = getNextBirthday();
        var oneYearBefore = new Date(birthday);
        oneYearBefore.setFullYear(oneYearBefore.getFullYear() - 1);
        var totalSpan = birthday - oneYearBefore;
        var elapsed = now - oneYearBefore;
        return Math.min(1, Math.max(0, elapsed / totalSpan));
    }

    function createParticles() {
        var container = document.getElementById('countdown-particles');
        if (!container) return;
        var emojis = ['💖', '🎂', '🎁', '✨', '🌟', '🎈', '💝', '🎀', '💫', '🥳', '🎉', '💕'];
        for (var i = 0; i < 20; i++) {
            var particle = document.createElement('span');
            particle.className = 'countdown-particle';
            particle.textContent = emojis[Math.floor(Math.random() * emojis.length)];
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 8 + 's';
            particle.style.animationDuration = (6 + Math.random() * 6) + 's';
            particle.style.fontSize = (0.8 + Math.random() * 1) + 'rem';
            container.appendChild(particle);
        }
    }

    var prevValues = { days: -1, hours: -1, minutes: -1, seconds: -1 };

    function destroyCountdownSection() {
        var section = document.getElementById('birthday-countdown');
        if (!section) return;

        // Stop the interval
        if (countdownInterval) {
            clearInterval(countdownInterval);
            countdownInterval = null;
        }

        // Animate out, then remove from DOM
        section.classList.add('destroying');
        setTimeout(function() {
            section.remove();
        }, 900); // matches the 0.8s CSS animation + buffer
    }

    function updateCountdown() {
        if (isBirthdayToday()) {
            // It's her birthday — destroy the countdown section entirely
            // Show "Today is Special" badge on hero
            var heroBadge = document.getElementById('hero-badge');
            if (heroBadge) { heroBadge.style.display = 'inline-block'; }

            // Destroy the section after a brief moment
            setTimeout(function() {
                destroyCountdownSection();
            }, 500);
            return;
        }

        // Not birthday — keep "Today is Special" hidden
        var heroBadge = document.getElementById('hero-badge');
        if (heroBadge) { heroBadge.style.display = 'none'; }

        var t = getTimeRemaining();
        var fields = ['days', 'hours', 'minutes', 'seconds'];
        fields.forEach(function(field) {
            var el = document.getElementById('cd-' + field);
            if (el && prevValues[field] !== t[field]) {
                el.textContent = String(t[field]).padStart(field === 'days' ? 1 : 2, '0');
                el.classList.remove('flip');
                void el.offsetWidth;
                el.classList.add('flip');
                prevValues[field] = t[field];
            }
        });

        // Update progress rings
        var progress = getDayOfYearProgress();
        updateProgressRing('progress-months', progress);
        updateProgressRing('progress-days', t.days <= 30 ? (30 - t.days) / 30 : progress);
        updateProgressRing('progress-hours', (24 - t.hours) / 24);
    }

    function updateProgressRing(id, progress) {
        var el = document.getElementById(id);
        if (!el) return;
        var circumference = 2 * Math.PI * 25; // r=25
        var offset = circumference - (progress * circumference);
        el.style.strokeDasharray = circumference;
        el.style.strokeDashoffset = offset;
    }

    function init() {
        // If it's already birthday, destroy immediately (don't even show)
        if (isBirthdayToday()) {
            var section = document.getElementById('birthday-countdown');
            if (section) section.remove();
            var heroBadge = document.getElementById('hero-badge');
            if (heroBadge) { heroBadge.style.display = 'inline-block'; }
            return;
        }

        createParticles();
        updateCountdown();
        countdownInterval = setInterval(updateCountdown, 1000);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
