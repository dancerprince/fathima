// ========================================
// MINI GAMES - Themed SVG version
// ========================================

function closeModal(id) {
    var modal = document.getElementById(id);
    if (modal) modal.classList.add('hidden');
}

function getThemeShape(name, size) {
    if (typeof SVG !== 'undefined' && typeof currentTheme !== 'undefined' && currentTheme) {
        return SVG.getShape(name, size, currentTheme);
    }
    return '';
}

function getRandomThemeShape(size) {
    if (typeof SVG !== 'undefined' && typeof currentTheme !== 'undefined' && currentTheme) {
        var shapes = currentTheme.floatingShapes || ['heart'];
        var shapeName = shapes[Math.floor(Math.random() * shapes.length)];
        var colors = currentTheme.particleColors || ['#FFB6C1'];
        var color = colors[Math.floor(Math.random() * colors.length)];
        return SVG[shapeName] ? SVG[shapeName](size, color, currentTheme.secondary) : SVG.heart(size, color);
    }
    return '';
}

// ========================================
// 1. MEMORY MATCH GAME
// ========================================
var memoryCards = [];
var memoryFlipped = [];
var memoryMatched = 0;
var memoryMoves = 0;
var memoryTimer = null;
var memorySeconds = 0;
var memoryLocked = false;

function getMemoryShapes() {
    if (typeof SVG !== 'undefined' && typeof currentTheme !== 'undefined' && currentTheme) {
        var t = currentTheme;
        var allShapes = ['heart','rose','butterfly','sakura','leaf','daisy','shell','crown','gem','moon','sun','star-5','cherry','candy','blossom','sparkle'];
        var themeShapes = t.shapes.concat(t.floatingShapes);
        var uniqueShapes = [];
        var seen = {};
        themeShapes.concat(allShapes).forEach(function(s) {
            if (!seen[s] && SVG[s] && uniqueShapes.length < 8) {
                seen[s] = true;
                uniqueShapes.push(s);
            }
        });
        return uniqueShapes.map(function(s, i) {
            var color = t.particleColors[i % t.particleColors.length];
            return SVG[s](36, color, t.secondary);
        });
    }
    return ['1','2','3','4','5','6','7','8'];
}

function startMemoryGame() {
    document.getElementById('memory-modal').classList.remove('hidden');
    resetMemoryGame();
}

function resetMemoryGame() {
    memoryMatched = 0;
    memoryMoves = 0;
    memorySeconds = 0;
    memoryLocked = false;
    memoryFlipped = [];
    document.getElementById('memory-moves').textContent = '0';
    document.getElementById('memory-pairs').textContent = '0';
    document.getElementById('memory-time').textContent = '0:00';
    if (memoryTimer) clearInterval(memoryTimer);
    memoryTimer = setInterval(function() {
        memorySeconds++;
        var mins = Math.floor(memorySeconds / 60);
        var secs = memorySeconds % 60;
        document.getElementById('memory-time').textContent = mins + ':' + (secs < 10 ? '0' : '') + secs;
    }, 1000);
    var memoryShapeSVGs = getMemoryShapes();
    var pairs = memoryShapeSVGs.concat(memoryShapeSVGs.slice());
    memoryCards = pairs.sort(function() { return Math.random() - 0.5; });
    var board = document.getElementById('memory-board');
    board.innerHTML = '';
    var cardBackSVG = getThemeShape(currentTheme ? currentTheme.cursorShape : 'heart', 28);
    memoryCards.forEach(function(shapeSVG, index) {
        var card = document.createElement('div');
        card.className = 'memory-card';
        card.dataset.index = index;
        card.innerHTML = '<div class="card-face card-front">' + cardBackSVG + '</div><div class="card-face card-back">' + shapeSVG + '</div>';
        card.addEventListener('click', function() { flipMemoryCard(card, index); });
        board.appendChild(card);
    });
}

function flipMemoryCard(card, index) {
    if (memoryLocked) return;
    if (card.classList.contains('flipped') || card.classList.contains('matched')) return;
    if (memoryFlipped.length >= 2) return;
    card.classList.add('flipped');
    memoryFlipped.push({ card: card, index: index });
    if (memoryFlipped.length === 2) {
        memoryMoves++;
        document.getElementById('memory-moves').textContent = memoryMoves;
        memoryLocked = true;
        var first = memoryFlipped[0], second = memoryFlipped[1];
        if (memoryCards[first.index] === memoryCards[second.index]) {
            first.card.classList.add('matched');
            second.card.classList.add('matched');
            memoryMatched++;
            document.getElementById('memory-pairs').textContent = memoryMatched;
            memoryFlipped = [];
            memoryLocked = false;
            if (memoryMatched === 8) {
                clearInterval(memoryTimer);
                setTimeout(function() {
                    alert('You matched all pairs in ' + memoryMoves + ' moves and ' + memorySeconds + 's! Amazing, Fathima!');
                }, 500);
            }
        } else {
            setTimeout(function() {
                first.card.classList.remove('flipped');
                second.card.classList.remove('flipped');
                memoryFlipped = [];
                memoryLocked = false;
            }, 800);
        }
    }
}

// ========================================
// 2. LOVE QUIZ
// ========================================
var quizQuestions = [
    { q: "What is the most beautiful thing about love?", options: ["Material gifts", "Understanding each other's heart", "Never arguing", "Always agreeing"], correct: 1, response: "True love is about understanding each other's heart completely!" },
    { q: "What makes a birthday truly special?", options: ["Expensive gifts", "Being with loved ones", "A big party", "Having a day off"], correct: 1, response: "The presence of loved ones makes any day magical!" },
    { q: "What's the secret to a happy relationship?", options: ["Never fighting", "Trust, respect & communication", "Buying expensive things", "Always being perfect"], correct: 1, response: "Trust, respect, and open communication are the foundation of love!" },
    { q: "How do you know someone truly loves you?", options: ["They say it all the time", "They show it through their actions", "They buy you gifts daily", "They never get upset"], correct: 1, response: "Actions speak louder than words in true love!" },
    { q: "What's the most romantic thing in the world?", options: ["A candlelit dinner", "Growing old together", "Fancy vacations", "Expensive jewelry"], correct: 1, response: "Growing old together, hand in hand - that is the ultimate romance!" }
];
var quizIndex = 0;
var quizScore = 0;

function startLoveQuiz() {
    document.getElementById('quiz-modal').classList.remove('hidden');
    quizIndex = 0;
    quizScore = 0;
    showQuizQuestion();
}

function showQuizQuestion() {
    var container = document.getElementById('quiz-container');
    if (quizIndex >= quizQuestions.length) {
        var resultShape = quizScore === quizQuestions.length ? getThemeShape('sparkle', 48) : getThemeShape('heart', 48);
        container.innerHTML = '<div class="quiz-score-display">' + resultShape + ' ' + quizScore + '/' + quizQuestions.length + '</div><p class="quiz-result">' + (quizScore === quizQuestions.length ? "Perfect score! You truly understand love!" : "Beautiful effort! Love is all about learning together!") + '</p><button class="btn btn-game" onclick="startLoveQuiz()" style="margin-top:20px;">' + getThemeShape('star-4', 14) + ' Play Again</button>';
        return;
    }
    var q = quizQuestions[quizIndex];
    container.innerHTML = '<p class="quiz-progress">Question ' + (quizIndex + 1) + ' of ' + quizQuestions.length + '</p><p class="quiz-question">' + q.q + '</p><div class="quiz-options">' + q.options.map(function(opt, i) { return '<button class="quiz-option" onclick="answerQuiz(' + i + ')">' + opt + '</button>'; }).join('') + '</div>';
}

function answerQuiz(selected) {
    var q = quizQuestions[quizIndex];
    var options = document.querySelectorAll('.quiz-option');
    options.forEach(function(opt, i) {
        opt.disabled = true;
        opt.style.pointerEvents = 'none';
        if (i === q.correct) opt.classList.add('correct');
        if (i === selected && selected !== q.correct) opt.classList.add('wrong');
    });
    if (selected === q.correct) quizScore++;
    setTimeout(function() { quizIndex++; showQuizQuestion(); }, 1200);
}

// ========================================
// 3. CATCH THE HEARTS
// ========================================
var catchScore = 0;
var catchLives = 3;
var catchTimeLeft = 30;
var catchInterval = null;
var catchTimerInterval = null;
var catchRunning = false;

function getCatchLivesSVG() {
    var html = '';
    var liveShape = getThemeShape('heart', 18);
    for (var i = 0; i < Math.max(0, catchLives); i++) html += liveShape;
    if (catchLives <= 0) html = '<span style="font-weight:bold;">Gone</span>';
    return html;
}

function startCatchHearts() {
    document.getElementById('catch-modal').classList.remove('hidden');
    catchScore = 0; catchLives = 3; catchTimeLeft = 30; catchRunning = true;
    document.getElementById('catch-score').textContent = '0';
    document.getElementById('catch-time').textContent = '30';
    document.getElementById('catch-lives').innerHTML = getCatchLivesSVG();
    document.getElementById('catch-area').innerHTML = '';
    if (catchInterval) clearInterval(catchInterval);
    if (catchTimerInterval) clearInterval(catchTimerInterval);
    catchTimerInterval = setInterval(function() {
        catchTimeLeft--;
        document.getElementById('catch-time').textContent = catchTimeLeft;
        if (catchTimeLeft <= 0) { stopCatchGame(); alert('Time is up! You caught ' + catchScore + ' shapes!'); }
    }, 1000);
    catchInterval = setInterval(function() { if (catchRunning) spawnFallingHeart(); }, 600);
}

function spawnFallingHeart() {
    var area = document.getElementById('catch-area');
    if (!area) return;
    var areaRect = area.getBoundingClientRect();
    var heart = document.createElement('div');
    heart.className = 'falling-heart';
    heart.innerHTML = getRandomThemeShape(32);
    heart.style.left = Math.random() * (areaRect.width - 40) + 'px';
    heart.style.top = '-30px';
    area.appendChild(heart);
    var posY = -30;
    var speed = 2 + Math.random() * 2;
    var fallInterval = setInterval(function() {
        if (!catchRunning) { clearInterval(fallInterval); heart.remove(); return; }
        posY += speed;
        heart.style.top = posY + 'px';
        if (posY > areaRect.height) {
            clearInterval(fallInterval); heart.remove();
            catchLives--;
            document.getElementById('catch-lives').innerHTML = getCatchLivesSVG();
            if (catchLives <= 0) { stopCatchGame(); alert('Game Over! You caught ' + catchScore + ' shapes! Amazing!'); }
        }
    }, 30);
    heart.addEventListener('click', function(e) {
        e.stopPropagation(); clearInterval(fallInterval);
        catchScore++;
        document.getElementById('catch-score').textContent = catchScore;
        var pop = document.createElement('div');
        pop.className = 'catch-pop';
        pop.innerHTML = '+1 ' + getThemeShape('sparkle', 14);
        pop.style.left = heart.style.left;
        pop.style.top = heart.style.top;
        area.appendChild(pop);
        setTimeout(function() { pop.remove(); }, 600);
        heart.remove();
    });
}

function stopCatchGame() {
    catchRunning = false;
    if (catchInterval) clearInterval(catchInterval);
    if (catchTimerInterval) clearInterval(catchTimerInterval);
}

// ========================================
// 4. LOVE JIGSAW
// ========================================
var jigsawMessages = [
    "You are the love of my life",
    "Happy Birthday my beautiful Fathima",
    "Every moment with you is magical",
    "You make my world complete",
    "My heart beats only for you",
    "Forever and always my love",
    "You are my greatest blessing"
];
var currentJigsawWords = [];
var placedWords = [];

function startJigsaw() { document.getElementById('jigsaw-modal').classList.remove('hidden'); resetJigsaw(); }

function resetJigsaw() {
    var msg = jigsawMessages[Math.floor(Math.random() * jigsawMessages.length)];
    currentJigsawWords = msg.split(' ');
    placedWords = [];
    var shuffled = currentJigsawWords.slice().sort(function() { return Math.random() - 0.5; });
    document.getElementById('jigsaw-target').innerHTML = '';
    document.getElementById('jigsaw-result').textContent = '';
    document.getElementById('jigsaw-result').className = 'jigsaw-result';
    var piecesContainer = document.getElementById('jigsaw-pieces');
    piecesContainer.innerHTML = '';
    shuffled.forEach(function(word) {
        var el = document.createElement('span');
        el.className = 'jigsaw-word';
        el.textContent = word;
        el.addEventListener('click', function() { placeJigsawWord(el, word); });
        piecesContainer.appendChild(el);
    });
}

function placeJigsawWord(el, word) {
    if (el.classList.contains('placed')) return;
    el.classList.add('placed');
    placedWords.push(word);
    var target = document.getElementById('jigsaw-target');
    var placed = document.createElement('span');
    placed.className = 'jigsaw-word';
    placed.textContent = word;
    placed.style.background = currentTheme ? currentTheme.primaryLight : '#FFD1DC';
    placed.addEventListener('click', function() {
        var idx = placedWords.lastIndexOf(word);
        if (idx > -1) placedWords.splice(idx, 1);
        placed.remove();
        el.classList.remove('placed');
    });
    target.appendChild(placed);
}

function checkJigsaw() {
    var resultEl = document.getElementById('jigsaw-result');
    if (placedWords.join(' ') === currentJigsawWords.join(' ')) {
        resultEl.innerHTML = getThemeShape('sparkle', 20) + ' Perfect! You got it right!';
        resultEl.className = 'jigsaw-result success';
        if (typeof Confetti !== 'undefined') Confetti.launch(3000);
    } else {
        resultEl.innerHTML = getThemeShape('heart', 18) + ' Almost! Try again, you can do it!';
        resultEl.className = 'jigsaw-result fail';
    }
}

// ========================================
// 5. WISH JAR
// ========================================
var wishes = [
    "May all your dreams come true this year!",
    "Wishing you endless laughter and joy!",
    "May every day bring you a new reason to smile!",
    "You deserve all the happiness in the world!",
    "May love surround you every moment of every day!",
    "Wishing you a year full of beautiful surprises!",
    "May your heart always be as beautiful as it is today!",
    "You are loved more than you will ever know!",
    "May this year be your most magical year yet!",
    "Wishing you health, happiness, and endless blessings!",
    "May you always find reasons to celebrate!",
    "You are a blessing to everyone around you!",
    "May your smile never fade and your heart never ache!",
    "Wishing you a lifetime of love and laughter!",
    "May every wish in this jar come true for you!"
];

function startWishJar() {
    document.getElementById('jar-modal').classList.remove('hidden');
    document.getElementById('wish-display').classList.add('hidden');
    document.getElementById('jar-container').classList.remove('hidden');
    var jarPapers = document.getElementById('jar-papers');
    jarPapers.innerHTML = '';
    var colors = currentTheme ? currentTheme.particleColors : ['#FFB6C1','#DDA0DD','#FFDAB9'];
    for (var i = 0; i < 20; i++) {
        var paper = document.createElement('div');
        paper.className = 'jar-paper-mini';
        paper.style.background = colors[Math.floor(Math.random() * colors.length)];
        paper.style.setProperty('--rot', (Math.random() * 40 - 20) + 'deg');
        jarPapers.appendChild(paper);
    }
}

function pickWish() {
    document.getElementById('jar-container').classList.add('hidden');
    document.getElementById('wish-display').classList.remove('hidden');
    var shuffled = wishes.slice().sort(function() { return Math.random() - 0.5; });
    document.getElementById('wish-text').textContent = shuffled[0];
}

// ========================================
// 6. LOVE WHEEL
// ========================================
function getWheelItems() {
    var colors = currentTheme ? currentTheme.particleColors.concat([currentTheme.secondary, currentTheme.accent, currentTheme.gold]) : ['#FFB6C1','#DDA0DD','#FFDAB9','#E6E6FA','#B0E0E6','#FFD700','#F08080','#C1F0C1'];
    return [
        { text: "A Sweet Compliment", color: colors[0] },
        { text: "A Virtual Hug", color: colors[1] },
        { text: "A Love Promise", color: colors[2] },
        { text: "A Special Wish", color: colors[3] },
        { text: "A Cute Message", color: colors[4] },
        { text: "A Heart Song", color: colors[5] },
        { text: "Infinite Love", color: colors[6] },
        { text: "A Sweet Surprise", color: colors[7] }
    ];
}

var wheelResponses = {
    "A Sweet Compliment": "You are the most beautiful person inside and out. Your smile could light up the entire universe!",
    "A Virtual Hug": "Sending you the biggest, warmest, tightest virtual hug! Feel my arms around you right now!",
    "A Love Promise": "I promise to love you more every single day, to always be your safe place, and to never let you go.",
    "A Special Wish": "I wish for you to always be happy, healthy, and surrounded by love. You deserve the entire world!",
    "A Cute Message": "Hey beautiful! Just wanted to remind you that you are absolutely amazing and I am so lucky to have you!",
    "A Heart Song": "If my love for you were a song, it would be the longest, most beautiful symphony ever composed!",
    "Infinite Love": "My love for you has no beginning and no end. It is infinite, eternal, and grows stronger every moment!",
    "A Sweet Surprise": "The biggest surprise of my life was finding you. You are God's most beautiful gift to me!"
};

var wheelAngle = 0;
var wheelSpinning = false;

function startLoveWheel() {
    document.getElementById('wheel-modal').classList.remove('hidden');
    document.getElementById('wheel-result').classList.add('hidden');
    drawWheel();
}

function drawWheel() {
    var canvas = document.getElementById('wheel-canvas');
    if (!canvas) return;
    var ctx = canvas.getContext('2d');
    var cx = canvas.width / 2, cy = canvas.height / 2, r = cx - 10;
    var items = getWheelItems();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    var sliceAngle = (2 * Math.PI) / items.length;
    items.forEach(function(item, i) {
        var start = wheelAngle + sliceAngle * i;
        var end = start + sliceAngle;
        ctx.beginPath(); ctx.moveTo(cx, cy); ctx.arc(cx, cy, r, start, end); ctx.closePath();
        ctx.fillStyle = item.color; ctx.fill();
        ctx.strokeStyle = 'rgba(255,255,255,0.8)'; ctx.lineWidth = 2; ctx.stroke();
        ctx.save(); ctx.translate(cx, cy); ctx.rotate(start + sliceAngle / 2);
        ctx.textAlign = 'right';
        ctx.fillStyle = currentTheme ? currentTheme.text : '#4A3040';
        ctx.font = '11px Poppins, sans-serif';
        ctx.fillText(item.text, r - 15, 4);
        ctx.restore();
    });
    ctx.beginPath(); ctx.arc(cx, cy, 25, 0, 2 * Math.PI);
    ctx.fillStyle = '#FFF'; ctx.fill();
    ctx.strokeStyle = currentTheme ? currentTheme.primary : '#FFB6C1';
    ctx.lineWidth = 3; ctx.stroke();
    ctx.fillStyle = currentTheme ? currentTheme.accentDeep : '#C71585';
    ctx.font = '16px sans-serif'; ctx.textAlign = 'center';
    // Draw a small heart shape on canvas center instead of text
    ctx.beginPath();
    var hx = cx, hy = cy;
    ctx.moveTo(hx, hy + 4);
    ctx.bezierCurveTo(hx, hy, hx - 8, hy - 2, hx - 8, hy + 4);
    ctx.bezierCurveTo(hx - 8, hy + 10, hx, hy + 14, hx, hy + 14);
    ctx.bezierCurveTo(hx, hy + 14, hx + 8, hy + 10, hx + 8, hy + 4);
    ctx.bezierCurveTo(hx + 8, hy - 2, hx, hy, hx, hy + 4);
    ctx.fill();
}

function spinWheel() {
    if (wheelSpinning) return;
    wheelSpinning = true;
    document.getElementById('spin-btn').disabled = true;
    document.getElementById('wheel-result').classList.add('hidden');
    var items = getWheelItems();
    var totalSpin = Math.PI * 2 * (5 + Math.random() * 5);
    var duration = 4000;
    var startAngle = wheelAngle;
    var startTime = Date.now();
    function animateSpin() {
        var elapsed = Date.now() - startTime;
        var progress = Math.min(elapsed / duration, 1);
        var eased = 1 - Math.pow(1 - progress, 3);
        wheelAngle = startAngle + totalSpin * eased;
        drawWheel();
        if (progress < 1) {
            requestAnimationFrame(animateSpin);
        } else {
            wheelSpinning = false;
            document.getElementById('spin-btn').disabled = false;
            var sliceAngle = (2 * Math.PI) / items.length;
            var normalizedAngle = ((2 * Math.PI) - (wheelAngle % (2 * Math.PI))) % (2 * Math.PI);
            var winIndex = Math.floor(normalizedAngle / sliceAngle) % items.length;
            var winner = items[winIndex];
            var resultDiv = document.getElementById('wheel-result');
            resultDiv.classList.remove('hidden');
            resultDiv.innerHTML = '<p><strong>' + winner.text + '</strong></p><p style="margin-top:10px;">' + (wheelResponses[winner.text] || '') + '</p>';
        }
    }
    animateSpin();
}
