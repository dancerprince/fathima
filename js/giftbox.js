// ========================================
// GIFT BOX - RANDOM QUOTE ON CLICK (Themed SVG)
// ========================================

var lastGiftQuoteIndex = -1;

function openGiftBox() {
    if (typeof loveQuotes === 'undefined' || loveQuotes.length === 0) return;
    var lid = document.getElementById('gift-lid');
    if (lid) lid.classList.add('open');
    createGiftSparkles();
    var randomIndex;
    do {
        randomIndex = Math.floor(Math.random() * loveQuotes.length);
    } while (randomIndex === lastGiftQuoteIndex && loveQuotes.length > 1);
    lastGiftQuoteIndex = randomIndex;
    var quote = loveQuotes[randomIndex];
    setTimeout(function() {
        var popup = document.getElementById('gift-quote-popup');
        var quoteText = document.getElementById('gift-quote-text');
        if (quoteText) quoteText.textContent = quote;
        if (popup) popup.classList.remove('hidden');
        if (lid) lid.classList.remove('open');
        if (typeof Confetti !== 'undefined') Confetti.launch(2000);
    }, 500);
}

function closeGiftQuote(event) {
    if (event) event.stopPropagation();
    var popup = document.getElementById('gift-quote-popup');
    if (popup) popup.classList.add('hidden');
}

function createGiftSparkles() {
    var giftBox = document.getElementById('gift-box');
    if (!giftBox) return;
    for (var i = 0; i < 10; i++) {
        var sparkle = document.createElement('div');
        sparkle.className = 'gift-sparkle';
        if (typeof SVG !== 'undefined' && typeof currentTheme !== 'undefined' && currentTheme) {
            var shapes = currentTheme.floatingShapes || ['sparkle'];
            var shapeName = shapes[Math.floor(Math.random() * shapes.length)];
            var colors = currentTheme.particleColors || ['#FFB6C1'];
            var color = colors[Math.floor(Math.random() * colors.length)];
            sparkle.innerHTML = SVG[shapeName] ? SVG[shapeName](18, color, currentTheme.secondary) : SVG.sparkle(18, color);
        }
        var angle = (Math.PI * 2 * i) / 10;
        var distance = 60 + Math.random() * 40;
        sparkle.style.setProperty('--tx', Math.cos(angle) * distance + 'px');
        sparkle.style.setProperty('--ty', (Math.sin(angle) * distance - 30) + 'px');
        sparkle.style.left = '50%';
        sparkle.style.top = '30%';
        giftBox.appendChild(sparkle);
        (function(el) { setTimeout(function() { el.remove(); }, 800); })(sparkle);
    }
}

document.addEventListener('click', function(e) {
    var popup = document.getElementById('gift-quote-popup');
    if (popup && !popup.classList.contains('hidden')) {
        var card = popup.querySelector('.gift-quote-card');
        if (card && !card.contains(e.target)) { closeGiftQuote(); }
    }
});
