// ========================================
// CURSOR HEARTS & CLICK EFFECTS
// ========================================

(function() {
    const heartEmojis = ['💖', '💕', '💗', '💓', '💝', '💘', '🩷', '♥️'];
    let lastHeartTime = 0;

    // Cursor trail hearts
    document.addEventListener('mousemove', function(e) {
        const now = Date.now();
        if (now - lastHeartTime < 150) return; // Throttle
        lastHeartTime = now;

        const heart = document.createElement('div');
        heart.className = 'cursor-heart';
        heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
        heart.style.left = e.clientX + 'px';
        heart.style.top = e.clientY + 'px';
        heart.style.setProperty('--tx', (Math.random() - 0.5) * 80 + 'px');
        heart.style.setProperty('--ty', -(Math.random() * 60 + 30) + 'px');
        heart.style.setProperty('--rot', (Math.random() - 0.5) * 360 + 'deg');
        document.body.appendChild(heart);

        setTimeout(() => heart.remove(), 1500);
    });

    // Click burst effect
    document.addEventListener('click', function(e) {
        for (let i = 0; i < 6; i++) {
            const heart = document.createElement('div');
            heart.className = 'click-heart';
            heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
            heart.style.left = e.clientX + 'px';
            heart.style.top = e.clientY + 'px';
            const angle = (Math.PI * 2 / 6) * i;
            const dist = 40 + Math.random() * 40;
            heart.style.setProperty('--tx', Math.cos(angle) * dist + 'px');
            heart.style.setProperty('--ty', Math.sin(angle) * dist + 'px');
            document.body.appendChild(heart);
            setTimeout(() => heart.remove(), 800);
        }
    });
})();
