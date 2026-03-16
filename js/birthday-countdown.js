/* ==================== BIRTHDAY COUNTDOWN - March 18th ==================== */
(function() {
    const BIRTHDAY_MONTH = 2; // March (0-indexed)
    const BIRTHDAY_DAY = 18;

    function getNextBirthday() {
        const now = new Date();
        let year = now.getFullYear();
        let birthday = new Date(year, BIRTHDAY_MONTH, BIRTHDAY_DAY, 0, 0, 0);
        
        // If birthday has passed this year, target next year
        if (now > birthday) {
            birthday = new Date(year + 1, BIRTHDAY_MONTH, BIRTHDAY_DAY, 0, 0, 0);
        }
        return birthday;
    }

    function isBirthdayToday() {
        const now = new Date();
        return now.getMonth() === BIRTHDAY_MONTH && now.getDate() === BIRTHDAY_DAY;
    }

    function getTimeRemaining() {
        const now = new Date();
        const birthday = getNextBirthday();
        const total = birthday - now;

        const days = Math.floor(total / (1000 * 60 * 60 * 24));
        const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((total / (1000 * 60)) % 60);
        const seconds = Math.floor((total / 1000) % 60);

        return { total, days, hours, minutes, seconds };
    }

    function getDayOfYearProgress() {
        const now = new Date();
        const birthday = getNextBirthday();
        const oneYearBefore = new Date(birthday);
        oneYearBefore.setFullYear(oneYearBefore.getFullYear() - 1);
        
        const totalSpan = birthday - oneYearBefore;
        const elapsed = now - oneYearBefore;
        
        return Math.min(1, Math.max(0, elapsed / totalSpan));
    }

    // Create floating particles
    function createParticles() {
        const container = document.getElementById('countdown-particles');
        if (!container) return;
        const emojis = ['💖', '🎂', '🎁', '✨', '🌟', '🎈', '💝', '🎀', '💫', '🥳', '🎉', '💕'];
        
        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('span');
            particle.className = 'countdown-particle';
            particle.textContent = emojis[Math.floor(Math.random() * emojis.length)];
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 8 + 's';
            particle.style.animationDuration = (6 + Math.random() * 6) + 's';
            particle.style.fontSize = (0.8 + Math.random() * 1) + 'rem';
            container.appendChild(particle);
        }
    }

    // Update countdown display
    let prevValues = { days: -1, hours: -1, minutes: -1, seconds: -1 };

    function updateCountdown() {
        if (isBirthdayToday()) {
            // It's her birthday!
            const timer = document.getElementById('countdown-timer');
            const msg = document.getElementById('countdown-birthday-msg');
            if (timer) timer.style.display = 'none';
            if (msg) { msg.classList.add('active'); msg.style.display = 'block'; }
            
            const progressContainer = document.getElementById('countdown-progress');
            if (progressContainer) progressContainer.style.display = 'none';
            return;
        }

        const t = getTimeRemaining();
        
        const fields = ['days', 'hours', 'minutes', 'seconds'];
        fields.forEach(field => {
            const el = document.getElementById('cd-' + field);
            if (el && prevValues[field] !== t[field]) {
                el.textContent = String(t[field]).padStart(field === 'days' ? 1 : 2, '0');
                el.classList.remove('flip');
                void el.offsetWidth; // trigger reflow
                el.classList.add('flip');
                prevValues[field] = t[field];
            }
        });

        // Update progress rings
        const progress = getDayOfYearProgress();
        updateProgressRing('progress-months', progress);
        updateProgressRing('progress-days', t.days <= 30 ? (30 - t.days) / 30 : progress);
        updateProgressRing('progress-hours', (24 - t.hours) / 24);
    }

    function updateProgressRing(id, progress) {
        const el = document.getElementById(id);
        if (!el) return;
        const circumference = 2 * Math.PI * 25; // r=25
        const offset = circumference - (progress * circumference);
        el.style.strokeDasharray = circumference;
        el.style.strokeDashoffset = offset;
    }

    // Initialize
    function init() {
        createParticles();
        updateCountdown();
        setInterval(updateCountdown, 1000);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
