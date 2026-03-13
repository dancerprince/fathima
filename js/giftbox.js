// ========================================
// GIFT BOX - RANDOM QUOTE ON CLICK
// ========================================

let lastGiftQuoteIndex = -1;

function openGiftBox() {
    if (typeof loveQuotes === 'undefined' || loveQuotes.length === 0) return;

    // Animate lid open
    const lid = document.getElementById('gift-lid');
    if (lid) {
        lid.classList.add('open');
    }

    // Create sparkle burst effect
    createGiftSparkles();

    // Pick a random quote (avoid repeating the same one consecutively)
    let randomIndex;
    do {
        randomIndex = Math.floor(Math.random() * loveQuotes.length);
    } while (randomIndex === lastGiftQuoteIndex && loveQuotes.length > 1);
    lastGiftQuoteIndex = randomIndex;

    const quote = loveQuotes[randomIndex];

    // Show popup after a brief delay for lid animation
    setTimeout(function() {
        var popup = document.getElementById('gift-quote-popup');
        var quoteText = document.getElementById('gift-quote-text');

        if (quoteText) quoteText.textContent = quote;
        if (popup) popup.classList.remove('hidden');

        // Close lid back after showing
        if (lid) lid.classList.remove('open');

        // Mini confetti celebration
        if (typeof Confetti !== 'undefined') {
            Confetti.launch(2000);
        }
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

    var sparkles = ['✨', '💖', '⭐', '💫', '🌟', '💕', '🩷', '💗'];
    for (var i = 0; i < 10; i++) {
        var sparkle = document.createElement('div');
        sparkle.className = 'gift-sparkle';
        sparkle.textContent = sparkles[Math.floor(Math.random() * sparkles.length)];

        var angle = (Math.PI * 2 * i) / 10;
        var distance = 60 + Math.random() * 40;
        var tx = Math.cos(angle) * distance;
        var ty = Math.sin(angle) * distance - 30;

        sparkle.style.setProperty('--tx', tx + 'px');
        sparkle.style.setProperty('--ty', ty + 'px');
        sparkle.style.left = '50%';
        sparkle.style.top = '30%';

        giftBox.appendChild(sparkle);

        // Remove sparkle after animation completes
        (function(el) {
            setTimeout(function() { el.remove(); }, 800);
        })(sparkle);
    }
}

// Close gift popup when clicking outside the card
document.addEventListener('click', function(e) {
    var popup = document.getElementById('gift-quote-popup');
    if (popup && !popup.classList.contains('hidden')) {
        var card = popup.querySelector('.gift-quote-card');
        if (card && !card.contains(e.target)) {
            closeGiftQuote();
        }
    }
});
