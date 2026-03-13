// ========================================
// CURSOR HEARTS & CLICK EFFECTS
// Uses themed SVG images instead of emoji
// ========================================

(function() {
    var lastHeartTime = 0;

    function getThemedCursorShape(size) {
        if (typeof currentTheme !== 'undefined' && currentTheme && typeof SVG !== 'undefined') {
            var shapes = currentTheme.floatingShapes || ['heart'];
            var shapeName = shapes[Math.floor(Math.random() * shapes.length)];
            var colors = currentTheme.particleColors || ['#FFB6C1'];
            var color = colors[Math.floor(Math.random() * colors.length)];
            var color2 = currentTheme.secondary || color;
            if (SVG[shapeName]) {
                return SVG[shapeName](size, color, color2);
            }
            return SVG.heart(size, color, color2);
        }
        return '<svg viewBox="0 0 100 100" width="' + size + '" height="' + size + '" xmlns="http://www.w3.org/2000/svg"><path d="M50 88C25 70 5 55 5 35 5 20 17 8 32 8c8 0 14 4 18 10 4-6 10-10 18-10 15 0 27 12 27 27 0 20-20 35-45 53z" fill="#FFB6C1"/></svg>';
    }

    // Cursor trail shapes
    document.addEventListener('mousemove', function(e) {
        var now = Date.now();
        if (now - lastHeartTime < 150) return;
        lastHeartTime = now;

        var heart = document.createElement('div');
        heart.className = 'cursor-heart';
        heart.innerHTML = getThemedCursorShape(22);
        heart.style.left = e.clientX + 'px';
        heart.style.top = e.clientY + 'px';
        heart.style.setProperty('--tx', (Math.random() - 0.5) * 80 + 'px');
        heart.style.setProperty('--ty', -(Math.random() * 60 + 30) + 'px');
        heart.style.setProperty('--rot', (Math.random() - 0.5) * 360 + 'deg');
        document.body.appendChild(heart);

        setTimeout(function() { heart.remove(); }, 1500);
    });

    // Click burst effect
    document.addEventListener('click', function(e) {
        for (var i = 0; i < 6; i++) {
            (function(idx) {
                var heart = document.createElement('div');
                heart.className = 'click-heart';
                heart.innerHTML = getThemedCursorShape(26);
                heart.style.left = e.clientX + 'px';
                heart.style.top = e.clientY + 'px';
                var angle = (Math.PI * 2 / 6) * idx;
                var dist = 40 + Math.random() * 40;
                heart.style.setProperty('--tx', Math.cos(angle) * dist + 'px');
                heart.style.setProperty('--ty', Math.sin(angle) * dist + 'px');
                document.body.appendChild(heart);
                setTimeout(function() { heart.remove(); }, 800);
            })(i);
        }
    });
})();
