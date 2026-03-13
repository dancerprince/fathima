// ========================================
// MINI GAMES
// ========================================

// --- Utility ---
function closeModal(id) {
    const modal = document.getElementById(id);
    if (modal) modal.classList.add('hidden');
}

// ========================================
// 1. MEMORY MATCH GAME
// ========================================
let memoryCards = [];
let memoryFlipped = [];
let memoryMatched = 0;
let memoryMoves = 0;
let memoryTimer = null;
let memorySeconds = 0;
let memoryLocked = false;

const memoryEmojis = ['💖', '💕', '🌹', '💝', '🦋', '🌸', '💗', '✨'];

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
    memoryTimer = setInterval(() => {
        memorySeconds++;
        const mins = Math.floor(memorySeconds / 60);
        const secs = memorySeconds % 60;
        document.getElementById('memory-time').textContent = `${mins}:${secs.toString().padStart(2, '0')}`;
    }, 1000);

    const pairs = [...memoryEmojis, ...memoryEmojis];
    memoryCards = pairs.sort(() => Math.random() - 0.5);

    const board = document.getElementById('memory-board');
    board.innerHTML = '';

    memoryCards.forEach((emoji, index) => {
        const card = document.createElement('div');
        card.className = 'memory-card';
        card.dataset.index = index;
        card.innerHTML = `
            <div class="card-face card-front">💖</div>
            <div class="card-face card-back">${emoji}</div>
        `;
        card.addEventListener('click', () => flipMemoryCard(card, index));
        board.appendChild(card);
    });
}

function flipMemoryCard(card, index) {
    if (memoryLocked) return;
    if (card.classList.contains('flipped') || card.classList.contains('matched')) return;
    if (memoryFlipped.length >= 2) return;

    card.classList.add('flipped');
    memoryFlipped.push({ card, index });

    if (memoryFlipped.length === 2) {
        memoryMoves++;
        document.getElementById('memory-moves').textContent = memoryMoves;
        memoryLocked = true;

        const [first, second] = memoryFlipped;
        if (memoryCards[first.index] === memoryCards[second.index]) {
            first.card.classList.add('matched');
            second.card.classList.add('matched');
            memoryMatched++;
            document.getElementById('memory-pairs').textContent = memoryMatched;
            memoryFlipped = [];
            memoryLocked = false;

            if (memoryMatched === 8) {
                clearInterval(memoryTimer);
                setTimeout(() => {
                    alert(`🎉 You matched all pairs in ${memoryMoves} moves and ${memorySeconds}s! You're amazing, Fathima! 💖`);
                }, 500);
            }
        } else {
            setTimeout(() => {
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
const quizQuestions = [
    {
        q: "What is the most beautiful thing about love?",
        options: ["Material gifts", "Understanding each other's heart", "Never arguing", "Always agreeing"],
        correct: 1,
        response: "💕 True love is about understanding each other's heart completely!"
    },
    {
        q: "What makes a birthday truly special?",
        options: ["Expensive gifts", "Being with loved ones", "A big party", "Having a day off"],
        correct: 1,
        response: "💖 The presence of loved ones makes any day magical!"
    },
    {
        q: "What's the secret to a happy relationship?",
        options: ["Never fighting", "Trust, respect & communication", "Buying expensive things", "Always being perfect"],
        correct: 1,
        response: "✨ Trust, respect, and open communication are the foundation of love!"
    },
    {
        q: "How do you know someone truly loves you?",
        options: ["They say it all the time", "They show it through their actions", "They buy you gifts daily", "They never get upset"],
        correct: 1,
        response: "💗 Actions speak louder than words in true love!"
    },
    {
        q: "What's the most romantic thing in the world?",
        options: ["A candlelit dinner", "Growing old together", "Fancy vacations", "Expensive jewelry"],
        correct: 1,
        response: "🌹 Growing old together, hand in hand — that's the ultimate romance!"
    }
];

let quizIndex = 0;
let quizScore = 0;

function startLoveQuiz() {
    document.getElementById('quiz-modal').classList.remove('hidden');
    quizIndex = 0;
    quizScore = 0;
    showQuizQuestion();
}

function showQuizQuestion() {
    const container = document.getElementById('quiz-container');
    if (quizIndex >= quizQuestions.length) {
        container.innerHTML = `
            <div class="quiz-score-display">${quizScore}/${quizQuestions.length}</div>
            <p class="quiz-result">${quizScore === quizQuestions.length ? "Perfect score! You truly understand love! 💖" : "Beautiful effort! Love is all about learning together! 💕"}</p>
            <button class="btn btn-game" onclick="startLoveQuiz()" style="margin-top:20px;">🔄 Play Again</button>
        `;
        return;
    }

    const q = quizQuestions[quizIndex];
    container.innerHTML = `
        <p class="quiz-progress">Question ${quizIndex + 1} of ${quizQuestions.length}</p>
        <p class="quiz-question">${q.q}</p>
        <div class="quiz-options">
            ${q.options.map((opt, i) => `<button class="quiz-option" onclick="answerQuiz(${i})">${opt}</button>`).join('')}
        </div>
    `;
}

function answerQuiz(selected) {
    const q = quizQuestions[quizIndex];
    const options = document.querySelectorAll('.quiz-option');
    options.forEach((opt, i) => {
        opt.disabled = true;
        opt.style.pointerEvents = 'none';
        if (i === q.correct) opt.classList.add('correct');
        if (i === selected && selected !== q.correct) opt.classList.add('wrong');
    });

    if (selected === q.correct) quizScore++;

    setTimeout(() => {
        quizIndex++;
        showQuizQuestion();
    }, 1200);
}

// ========================================
// 3. CATCH THE HEARTS
// ========================================
let catchScore = 0;
let catchLives = 3;
let catchTimeLeft = 30;
let catchInterval = null;
let catchTimerInterval = null;
let catchRunning = false;

function startCatchHearts() {
    document.getElementById('catch-modal').classList.remove('hidden');
    catchScore = 0;
    catchLives = 3;
    catchTimeLeft = 30;
    catchRunning = true;

    document.getElementById('catch-score').textContent = '0';
    document.getElementById('catch-time').textContent = '30';
    document.getElementById('catch-lives').textContent = '❤️❤️❤️';
    document.getElementById('catch-area').innerHTML = '';

    if (catchInterval) clearInterval(catchInterval);
    if (catchTimerInterval) clearInterval(catchTimerInterval);

    catchTimerInterval = setInterval(() => {
        catchTimeLeft--;
        document.getElementById('catch-time').textContent = catchTimeLeft;
        if (catchTimeLeft <= 0) {
            stopCatchGame();
            alert(`⏰ Time's up! You caught ${catchScore} hearts! 💖`);
        }
    }, 1000);

    catchInterval = setInterval(() => {
        if (!catchRunning) return;
        spawnFallingHeart();
    }, 600);
}

function spawnFallingHeart() {
    const area = document.getElementById('catch-area');
    if (!area) return;
    const areaRect = area.getBoundingClientRect();

    const heart = document.createElement('div');
    heart.className = 'falling-heart';
    const hearts = ['💖', '💕', '💗', '💝', '💓', '🩷'];
    heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
    heart.style.left = Math.random() * (areaRect.width - 40) + 'px';
    heart.style.top = '-30px';
    area.appendChild(heart);

    let posY = -30;
    const speed = 2 + Math.random() * 2;

    const fallInterval = setInterval(() => {
        if (!catchRunning) {
            clearInterval(fallInterval);
            heart.remove();
            return;
        }
        posY += speed;
        heart.style.top = posY + 'px';

        if (posY > areaRect.height) {
            clearInterval(fallInterval);
            heart.remove();
            catchLives--;
            updateCatchLives();
            if (catchLives <= 0) {
                stopCatchGame();
                alert(`💔 Game Over! You caught ${catchScore} hearts! Amazing! 💖`);
            }
        }
    }, 30);

    heart.addEventListener('click', (e) => {
        e.stopPropagation();
        clearInterval(fallInterval);
        catchScore++;
        document.getElementById('catch-score').textContent = catchScore;

        // Pop effect
        const pop = document.createElement('div');
        pop.className = 'catch-pop';
        pop.textContent = '+1 💖';
        pop.style.left = heart.style.left;
        pop.style.top = heart.style.top;
        area.appendChild(pop);
        setTimeout(() => pop.remove(), 600);

        heart.remove();
    });
}

function updateCatchLives() {
    const livesStr = '❤️'.repeat(Math.max(0, catchLives));
    document.getElementById('catch-lives').textContent = livesStr || '💔';
}

function stopCatchGame() {
    catchRunning = false;
    if (catchInterval) clearInterval(catchInterval);
    if (catchTimerInterval) clearInterval(catchTimerInterval);
}

// ========================================
// 4. LOVE JIGSAW (Word Puzzle)
// ========================================
const jigsawMessages = [
    "You are the love of my life",
    "Happy Birthday my beautiful Fathima",
    "Every moment with you is magical",
    "You make my world complete",
    "My heart beats only for you",
    "Forever and always my love",
    "You are my greatest blessing"
];

let currentJigsawWords = [];
let placedWords = [];

function startJigsaw() {
    document.getElementById('jigsaw-modal').classList.remove('hidden');
    resetJigsaw();
}

function resetJigsaw() {
    const msg = jigsawMessages[Math.floor(Math.random() * jigsawMessages.length)];
    currentJigsawWords = msg.split(' ');
    placedWords = [];

    const shuffled = [...currentJigsawWords].sort(() => Math.random() - 0.5);

    document.getElementById('jigsaw-target').innerHTML = '';
    document.getElementById('jigsaw-result').textContent = '';
    document.getElementById('jigsaw-result').className = 'jigsaw-result';

    const piecesContainer = document.getElementById('jigsaw-pieces');
    piecesContainer.innerHTML = '';

    shuffled.forEach(word => {
        const el = document.createElement('span');
        el.className = 'jigsaw-word';
        el.textContent = word;
        el.addEventListener('click', () => placeJigsawWord(el, word));
        piecesContainer.appendChild(el);
    });
}

function placeJigsawWord(el, word) {
    if (el.classList.contains('placed')) return;
    el.classList.add('placed');
    placedWords.push(word);

    const target = document.getElementById('jigsaw-target');
    const placed = document.createElement('span');
    placed.className = 'jigsaw-word';
    placed.textContent = word;
    placed.style.background = '#FFD1DC';
    placed.addEventListener('click', () => {
        placedWords = placedWords.filter(w => w !== word || placedWords.indexOf(w) !== placedWords.lastIndexOf(w) ? true : w !== word);
        // Simple: remove last occurrence
        const idx = placedWords.lastIndexOf(word);
        if (idx > -1) placedWords.splice(idx, 1);
        placed.remove();
        el.classList.remove('placed');
    });
    target.appendChild(placed);
}

function checkJigsaw() {
    const resultEl = document.getElementById('jigsaw-result');
    const userAnswer = placedWords.join(' ');
    const correctAnswer = currentJigsawWords.join(' ');

    if (userAnswer === correctAnswer) {
        resultEl.textContent = '🎉 Perfect! You got it right! 💖';
        resultEl.className = 'jigsaw-result success';
        if (typeof Confetti !== 'undefined') Confetti.launch(3000);
    } else {
        resultEl.textContent = '💕 Almost! Try again, you can do it!';
        resultEl.className = 'jigsaw-result fail';
    }
}

// ========================================
// 5. WISH JAR
// ========================================
const wishes = [
    "May all your dreams come true this year! ✨",
    "Wishing you endless laughter and joy! 😊",
    "May every day bring you a new reason to smile! 🌸",
    "You deserve all the happiness in the world! 💕",
    "May love surround you every moment of every day! 💖",
    "Wishing you a year full of beautiful surprises! 🎁",
    "May your heart always be as beautiful as it is today! 🌹",
    "You are loved more than you'll ever know! 💗",
    "May this year be your most magical year yet! ✨",
    "Wishing you health, happiness, and endless blessings! 🤲",
    "May you always find reasons to celebrate! 🎉",
    "You are a blessing to everyone around you! 🌟",
    "May your smile never fade and your heart never ache! 💖",
    "Wishing you a lifetime of love and laughter! 😄",
    "May every wish in this jar come true for you! 🫙"
];

let wishIndex = 0;

function startWishJar() {
    document.getElementById('jar-modal').classList.remove('hidden');
    document.getElementById('wish-display').classList.add('hidden');
    document.getElementById('jar-container').classList.remove('hidden');

    // Fill jar with colorful papers
    const jarPapers = document.getElementById('jar-papers');
    jarPapers.innerHTML = '';
    const colors = ['#FFB6C1', '#DDA0DD', '#FFDAB9', '#E6E6FA', '#B0E0E6', '#FFD700', '#F08080'];
    for (let i = 0; i < 20; i++) {
        const paper = document.createElement('div');
        paper.className = 'jar-paper-mini';
        paper.style.background = colors[Math.floor(Math.random() * colors.length)];
        paper.style.setProperty('--rot', (Math.random() * 40 - 20) + 'deg');
        jarPapers.appendChild(paper);
    }
}

function pickWish() {
    document.getElementById('jar-container').classList.add('hidden');
    document.getElementById('wish-display').classList.remove('hidden');

    const shuffled = [...wishes].sort(() => Math.random() - 0.5);
    document.getElementById('wish-text').textContent = shuffled[0];
}

// ========================================
// 6. LOVE WHEEL
// ========================================
const wheelItems = [
    { text: "A Sweet Compliment 💕", color: "#FFB6C1" },
    { text: "A Virtual Hug 🤗", color: "#DDA0DD" },
    { text: "A Love Promise 💍", color: "#FFDAB9" },
    { text: "A Special Wish ✨", color: "#E6E6FA" },
    { text: "A Cute Message 💌", color: "#B0E0E6" },
    { text: "A Heart Song 🎵", color: "#FFD700" },
    { text: "Infinite Love 💖", color: "#F08080" },
    { text: "A Sweet Surprise 🎁", color: "#C1F0C1" }
];

const wheelResponses = {
    "A Sweet Compliment 💕": "You are the most beautiful person inside and out. Your smile could light up the entire universe! 💖",
    "A Virtual Hug 🤗": "Sending you the biggest, warmest, tightest virtual hug! 🤗💕 Feel my arms around you right now!",
    "A Love Promise 💍": "I promise to love you more every single day, to always be your safe place, and to never let you go. 💍💖",
    "A Special Wish ✨": "I wish for you to always be happy, healthy, and surrounded by love. You deserve the entire world! ✨",
    "A Cute Message 💌": "Hey beautiful! Just wanted to remind you that you're absolutely amazing and I'm so lucky to have you! 💌",
    "A Heart Song 🎵": "If my love for you were a song, it would be the longest, most beautiful symphony ever composed! 🎵💕",
    "Infinite Love 💖": "My love for you has no beginning and no end. It's infinite, eternal, and grows stronger every moment! 💖♾️",
    "A Sweet Surprise 🎁": "The biggest surprise of my life was finding you. You are God's most beautiful gift to me! 🎁💝"
};

let wheelAngle = 0;
let wheelSpinning = false;

function startLoveWheel() {
    document.getElementById('wheel-modal').classList.remove('hidden');
    document.getElementById('wheel-result').classList.add('hidden');
    drawWheel();
}

function drawWheel() {
    const canvas = document.getElementById('wheel-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const cx = canvas.width / 2;
    const cy = canvas.height / 2;
    const r = cx - 10;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const sliceAngle = (2 * Math.PI) / wheelItems.length;

    wheelItems.forEach((item, i) => {
        const start = wheelAngle + sliceAngle * i;
        const end = start + sliceAngle;

        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.arc(cx, cy, r, start, end);
        ctx.closePath();
        ctx.fillStyle = item.color;
        ctx.fill();
        ctx.strokeStyle = 'rgba(255,255,255,0.8)';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Text
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(start + sliceAngle / 2);
        ctx.textAlign = 'right';
        ctx.fillStyle = '#4A3040';
        ctx.font = '11px Poppins, sans-serif';
        ctx.fillText(item.text, r - 15, 4);
        ctx.restore();
    });

    // Center circle
    ctx.beginPath();
    ctx.arc(cx, cy, 25, 0, 2 * Math.PI);
    ctx.fillStyle = '#FFF';
    ctx.fill();
    ctx.strokeStyle = '#FFB6C1';
    ctx.lineWidth = 3;
    ctx.stroke();

    ctx.fillStyle = '#C71585';
    ctx.font = '16px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('💖', cx, cy + 6);
}

function spinWheel() {
    if (wheelSpinning) return;
    wheelSpinning = true;
    document.getElementById('spin-btn').disabled = true;
    document.getElementById('wheel-result').classList.add('hidden');

    const totalSpin = Math.PI * 2 * (5 + Math.random() * 5); // 5-10 full rotations
    const duration = 4000;
    const startAngle = wheelAngle;
    const startTime = Date.now();

    function animateSpin() {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // Ease out cubic
        const eased = 1 - Math.pow(1 - progress, 3);
        wheelAngle = startAngle + totalSpin * eased;

        drawWheel();

        if (progress < 1) {
            requestAnimationFrame(animateSpin);
        } else {
            wheelSpinning = false;
            document.getElementById('spin-btn').disabled = false;

            // Determine winner
            const sliceAngle = (2 * Math.PI) / wheelItems.length;
            const normalizedAngle = ((2 * Math.PI) - (wheelAngle % (2 * Math.PI))) % (2 * Math.PI);
            const winIndex = Math.floor(normalizedAngle / sliceAngle) % wheelItems.length;
            const winner = wheelItems[winIndex];

            const resultDiv = document.getElementById('wheel-result');
            resultDiv.classList.remove('hidden');
            resultDiv.innerHTML = `<p><strong>${winner.text}</strong></p><p style="margin-top:10px;">${wheelResponses[winner.text]}</p>`;
        }
    }

    animateSpin();
}
