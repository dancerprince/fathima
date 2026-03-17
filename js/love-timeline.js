/* ==========================================
   LOVE TIMELINE INTRO ENGINE
   Cinematic memory walk before main app
   ========================================== */

const LoveTimeline = (function() {
    'use strict';

    // ===== ALL MEMORIES =====
    const memories = [
        {
            date: '24th March 2023',
            title: 'The Day We Met Each Other',
            event: 'The day two strangers looked at each other and quietly changed the rest of their lives.',
            quote: "I didn't know it then, but meeting you pressed 'start' on my favorite story.",
            emoji: '💫',
            milestone: 'Where it all began'
        },
        {
            date: '27th March 2023',
            title: 'First Picture Together',
            event: "Our first picture together, when the camera accidentally captured the beginning of an 'us'.",
            quote: 'That photo was supposed to be a memory, but it became a promise.',
            emoji: '📸',
            milestone: '3 days later'
        },
        {
            date: '02nd April 2023',
            title: "First 'Not-a-Date' Date",
            event: "Our first date that we both pretended wasn't a date, but our hearts knew better.",
            quote: "We called it 'just hanging out', but my feelings quietly called it a date.",
            emoji: '☕',
            milestone: 'The first spark'
        },
        {
            date: '05th April 2023',
            title: 'Roaming Together as Friends',
            event: "We roamed the world as 'friends', while love slowly followed a few steps behind us.",
            quote: 'Every street we walked as friends was secretly drawing the map to our future.',
            emoji: '🚶‍♂️🚶‍♀️',
            milestone: 'Walking into forever'
        },
        {
            date: '12th April 2023',
            title: 'Shopping, Drinks, Crazy Mirror Pics',
            event: "We shopped, drank, roamed, and laughed in front of crazy mirrors that still couldn't reflect how happy you made me.",
            quote: 'Those mirrors distorted everything except the way I was starting to look at you.',
            emoji: '🪞',
            milestone: 'Pure joy'
        },
        {
            date: '16th April 2023',
            title: 'First Dance Reel and Party',
            event: 'Our first dance reel went to our story, and that night our rhythm started to match in real life too.',
            quote: 'We danced for the camera, but my favorite part was how natural it felt to dance next to you.',
            emoji: '💃🕺',
            milestone: 'Dancing into love'
        },
        {
            date: '18th April 2023',
            title: 'Phoenix Video, Security Anna Scolding',
            event: 'Shooting videos in Phoenix, getting scolded by security anna, and still smiling because you were beside me.',
            quote: "Even when we're being chased away, it feels like an adventure if I'm running with you.",
            emoji: '🎬',
            milestone: 'Partners in crime'
        },
        {
            date: '25th April 2023',
            title: "First Auto Ride, 'I Hate You'",
            event: "Our first auto ride, the day I kept saying 'I hate you' just to hide how deeply I was already falling.",
            quote: "Every 'I hate you' from me was just a scared version of 'I think I'm in love with you.'",
            emoji: '🛺',
            milestone: 'Love in disguise'
        },
        {
            date: '28th April 2023',
            title: 'First Ride to Mahabs on Continental GT',
            event: 'Our first ride to Mahabs on my Continental GT, with the road in front of us and my heart quietly choosing its passenger.',
            quote: "That day I realized: it's not about the bike or the road, it's about who's holding on behind me.",
            emoji: '🏍️',
            milestone: 'Wind in our hair'
        },
        {
            date: '28th April 2023',
            title: 'First Same-Style Dress as a Couple',
            event: 'The first time we wore the same style, not just as a couple in clothes, but as a team in life.',
            quote: 'Matching outfits were cute, but matching souls felt even better.',
            emoji: '👫',
            milestone: 'Twinning & winning'
        },
        {
            date: '14th May 2023',
            title: 'Missing Your Presence in Office',
            event: 'The day I realized the office felt strangely empty whenever you weren\'t there.',
            quote: "Missing you at work was my heart's way of filing an official complaint: it wanted you all the time.",
            emoji: '💼',
            milestone: 'You were everywhere'
        },
        {
            date: '22nd May 2023',
            title: "Best Friend's Marriage as Couple",
            event: "We stood in line at our best friend's wedding, together, looking like guests but secretly feeling like a future bride and groom.",
            quote: 'Watching someone else get married only made me more certain about the hand I was holding.',
            emoji: '💒',
            milestone: 'Dreaming together'
        },
        {
            date: '8th July 2023',
            title: 'You Know What Happened',
            event: 'The day something changed between us in a way only we fully understand.',
            quote: "Some days don't need explanations; they just quietly upgrade 'you and me' into 'us'.",
            emoji: '🔥',
            milestone: 'The turning point'
        },
        {
            date: '6th August 2023',
            title: 'Decided to Proceed Our Future Together',
            event: 'The day we stopped just dreaming about tomorrow and actually decided to build it together.',
            quote: "Choosing you wasn't a big dramatic moment; it was a calm, solid 'yes' in my heart that never faded.",
            emoji: '🤝',
            milestone: 'The decision'
        },
        {
            date: '8th September 2023',
            title: 'Introduced You to My Whole Family',
            event: 'The day I opened my front door and let you into my entire world.',
            quote: "Bringing you home wasn't just an introduction, it was my way of saying: 'This is where I see you too.'",
            emoji: '🏠',
            milestone: 'Family meets love'
        },
        {
            date: '25th November 2023',
            title: 'First Birthday with You',
            event: 'My first birthday with you, when your presence became my favorite gift.',
            quote: "I've had many birthdays, but the ones with you feel like the only ones that truly count.",
            emoji: '🎂',
            milestone: 'Celebrating together'
        },
        {
            date: '02nd December 2023',
            title: 'Wedding Invitation Printed',
            event: 'The day our names were printed side by side, not just on paper, but in destiny.',
            quote: "Seeing our names on that card made everything real: we weren't just in love, we were building a life.",
            emoji: '💌',
            milestone: 'Official announcement'
        },
        {
            date: '23rd December 2023',
            title: 'Your Hometown to Invite Friends',
            event: 'We went to your hometown, inviting your friends, and slowly weaving our two worlds into one.',
            quote: 'Every person we invited was another witness to the love story we were brave enough to announce.',
            emoji: '🗺️',
            milestone: 'Two worlds becoming one'
        },
        {
            date: '1st January 2024',
            title: 'Bought Your Wedding Dress',
            event: "A new year's day spent choosing the dress you'd wear to walk into forever with me.",
            quote: 'Watching you pick your wedding dress felt like watching my future choose its favorite moment.',
            emoji: '👰',
            milestone: 'New year, new forever'
        },
        {
            date: '22nd January 2024',
            title: 'The Day We Got Married',
            event: "The day 'you' and 'I' finally became officially, beautifully 'we'.",
            quote: "I didn't just marry you that day; I married every version of us—past, present, and everything waiting ahead.",
            emoji: '💍',
            milestone: '❤️ THE BIG DAY ❤️'
        },
        {
            date: '29th January 2024',
            title: 'Moved to House and Made It a Home',
            event: 'We moved into a house and, with laughter, fights, and late-night talks, turned it into a home.',
            quote: "Four walls became home the moment your things mixed with mine and our routines tangled together.",
            emoji: '🏡',
            milestone: 'Our nest'
        },
        {
            date: '04th March 2024',
            title: 'First Trip as Husband and Wife',
            event: 'Our first trip as husband and wife, where every small moment felt like a little honeymoon.',
            quote: "It didn't matter where we went; the real destination was learning how to travel through life together.",
            emoji: '✈️',
            milestone: 'Adventure begins'
        },
        {
            date: '18th March 2024',
            title: 'Your Birthday with Friends and Family',
            event: 'We celebrated your birthday surrounded by friends and family, but my favorite part was knowing you chose to celebrate life with me.',
            quote: 'Seeing you smile that day reminded me that loving you is my favorite celebration.',
            emoji: '🎉',
            milestone: 'Your special day'
        },
        {
            date: '02nd June 2024',
            title: 'Second Trip to Pondy',
            event: 'Our second trip to Pondy, proving that some places become special because of the memories we repeat there.',
            quote: 'Pondy stayed the same, but we came back as an even stronger "us."',
            emoji: '🌊',
            milestone: 'Back to our place'
        },
        {
            date: '25th November 2024',
            title: 'Surprise with School Friends',
            event: 'You brought all my school friends and their families to surprise me, reminding me how deeply you know my heart.',
            quote: "You didn't just wish me a happy birthday; you gave me back a whole chapter of my life.",
            emoji: '🎊',
            milestone: 'The sweetest surprise'
        },
        {
            date: '19th April 2025',
            title: 'Trip to Kodaikanal',
            event: 'After a long gap, Kodaikanal gave us mountains, mist, and the reminder that we still fit perfectly into each other\'s silence.',
            quote: 'Time passed, work piled up, but one trip with you was enough to recharge my whole heart.',
            emoji: '⛰️',
            milestone: 'Mountains & mist'
        },
        {
            date: '29th June 2025',
            title: 'First Visit to a Theme Park',
            event: 'Our first theme park visit, where the roller coasters screamed, but my safest place was still your hand in mine.',
            quote: "I'll ride any crazy ride, as long as I have you to laugh with at the end of it.",
            emoji: '🎢',
            milestone: 'Thrills together'
        },
        {
            date: '19th August 2025',
            title: 'Our First Flight Together',
            event: 'Our first flight together, taking off into the clouds like a small rehearsal for all the heights we\'ll reach.',
            quote: "Flying next to you made me realize: the real adventure isn't the destination, it's the seat beside me.",
            emoji: '✈️',
            milestone: 'Touching the sky'
        },
        {
            date: '21st August 2025',
            title: "Got Lost in 'Bhool Bhoolaiyan'",
            event: "We got lost in the 'bhool bhoolaiyan' of a fort and somehow still found our way back to each other every time.",
            quote: "Even if life turns into a maze, I know I'll be okay as long as I'm lost with you.",
            emoji: '🏰',
            milestone: 'Lost & found'
        },
        {
            date: '31st August 2025',
            title: 'Pondicherry with Your Friends',
            event: 'We went to Pondicherry with your friends, blending friendship and love into one big, loud, happy memory.',
            quote: "Loving you also means loving the madness of your people, and I wouldn't have it any other way.",
            emoji: '🌅',
            milestone: 'Friends + love'
        },
        {
            date: '04th November 2025',
            title: 'Bought Our First Car Together',
            event: 'We bought our first car together, adding four wheels to the journey our hearts had already started.',
            quote: "It wasn't just a car key; it was a small metal symbol of all the roads we'll conquer side by side.",
            emoji: '🚗',
            milestone: 'Four wheels of love'
        },
        {
            date: '21st November 2025',
            title: 'Trip to Yercaud in Our Own Car',
            event: 'Our trip to Yercaud in our own car, windows down, music up, and our future humming softly along.',
            quote: "Driving our own car to our own plans made me realize how far we've come from that first auto ride.",
            emoji: '🛣️',
            milestone: 'Road trip life'
        },
        {
            date: '22nd January 2026',
            title: 'Anniversary in Ashvah24',
            event: 'We celebrated our anniversary in Ashvah24, one year of marriage and countless tiny reasons to be grateful.',
            quote: "Anniversaries don't measure how long we've been together; they remind me how impossible life feels without you now.",
            emoji: '🥂',
            milestone: '1 year together'
        },
        {
            date: '28th February 2026',
            title: 'Party with Friends After a Long Time',
            event: 'After a long gap, we partied with our friends, laughing like kids but holding each other like home.',
            quote: 'The world can change, plans can delay, but dancing with you still feels like my favorite reset button.',
            emoji: '🎶',
            milestone: 'Old friends, same love'
        },
        {
            date: '8th March 2026',
            title: 'Visited Hometown in Our Car',
            event: 'We drove to hometown in our own car, carrying our old memories in the backseat and new dreams in the front.',
            quote: 'Going back to where we came from felt different this time, because now I had you to share every lane and landmark with.',
            emoji: '🏘️',
            milestone: 'Coming full circle'
        },
        {
            date: '18th March 2026',
            title: 'Something Is About to Begin Now',
            event: 'Our story has already crossed so many milestones, but my heart still says this is just the beginning.',
            quote: "Whatever starts today, I only have one wish: that every next chapter still has your name next to mine.",
            emoji: '🌟',
            milestone: '💝 Today 💝'
        }
    ];

    let currentIndex = -1;
    let isAnimating = false;
    let introContainer = null;
    let skipCallback = null;
    let navResolve = null;       // resolve fn for current memory/calendar promise
    let navDirection = null;     // 'prev' | 'next' | null
    let memoryTimeouts = [];     // track timeouts so we can cancel them
    let isPaused = false;

    // ===== Parse date for calendar =====
    function parseMemoryDate(dateStr) {
        const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
        // Extract day, month name, year
        const match = dateStr.match(/(\d+)\w*\s+(\w+)\s+(\d{4})/);
        if (!match) return { day: '01', month: 'JAN', year: '2023', monthFull: 'January' };
        const day = match[1].padStart(2, '0');
        const monthName = match[2];
        const year = match[3];
        const monthIdx = months.findIndex(m => m.toLowerCase() === monthName.toLowerCase());
        const monthShort = monthName.substring(0, 3).toUpperCase();
        return { day, month: monthShort, year, monthFull: monthName, monthIdx };
    }

    // ===== Create the intro DOM =====
    function createIntroDOM() {
        const intro = document.createElement('div');
        intro.className = 'timeline-intro';
        intro.id = 'timeline-intro';

        intro.innerHTML = `
            <!-- Stars -->
            <div class="timeline-stars" id="tl-stars"></div>

            <!-- Floating hearts -->
            <div class="tl-floating-hearts" id="tl-float-hearts"></div>

            <!-- Welcome Screen -->
            <div class="timeline-welcome" id="tl-welcome">
                <div class="welcome-heart-burst">💕</div>
                <div class="welcome-text">Welcome, Fathima Rukshana</div>
                <div class="welcome-subtitle">A walk through our love story...</div>
            </div>

            <!-- Memory display (reused for each memory) -->
            <div class="timeline-memory" id="tl-memory">
                <div class="memory-date-wrapper">
                    <div class="memory-date" id="tl-mem-date"></div>
                    <span class="memory-milestone" id="tl-mem-milestone"></span>
                </div>
                <div class="memory-card">
                    <span class="memory-emoji" id="tl-mem-emoji"></span>
                    <h3 class="memory-title" id="tl-mem-title"></h3>
                    <p class="memory-event" id="tl-mem-event"></p>
                    <div class="memory-quote" id="tl-mem-quote"></div>
                </div>
            </div>

            <!-- Calendar transition -->
            <div class="calendar-transition" id="tl-calendar">
                <div class="calendar-flip">
                    <div class="calendar-page">
                        <div class="calendar-month" id="tl-cal-month"></div>
                        <div class="calendar-day" id="tl-cal-day"></div>
                        <div class="calendar-year" id="tl-cal-year"></div>
                    </div>
                    <div class="calendar-dots" id="tl-cal-dots"></div>
                </div>
            </div>

            <!-- Bridge screen -->
            <div class="timeline-bridge" id="tl-bridge">
                <div class="bridge-icon">✨</div>
                <div class="bridge-text">Something beautiful<br>is about to happen...</div>
                <div class="bridge-subtext">Get Ready</div>
                <div class="bridge-heartbeat">
                    <svg viewBox="0 0 200 40">
                        <path class="heartbeat-line" d="M0,20 L40,20 L50,5 L60,35 L70,10 L80,30 L90,20 L130,20 L140,5 L150,35 L160,10 L170,30 L180,20 L200,20" />
                    </svg>
                </div>
            </div>

            <!-- Progress bar -->
            <div class="timeline-progress" id="tl-progress">
                <div class="timeline-progress-bar" id="tl-progress-bar"></div>
            </div>

            <!-- Skip button -->
            <button class="timeline-skip" id="tl-skip">Skip →</button>

            <!-- Mute button in timeline -->
            <button class="tl-mute-btn" id="tl-mute-btn" title="Toggle Music">
                <svg class="tl-mute-icon-on" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                    <path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
                    <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                </svg>
                <svg class="tl-mute-icon-off" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:none;">
                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                    <line x1="23" y1="9" x2="17" y2="15"></line>
                    <line x1="17" y1="9" x2="23" y2="15"></line>
                </svg>
            </button>

            <!-- Counter -->
            <div class="memory-counter" id="tl-counter"></div>

            <!-- Navigation buttons (prev / next) -->
            <div class="tl-nav-controls" id="tl-nav-controls">
                <button class="tl-nav-btn tl-nav-prev" id="tl-nav-prev" title="Previous Memory">
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="15,4 7,12 15,20"/>
                    </svg>
                    <span class="tl-nav-label">Prev</span>
                </button>
                <button class="tl-nav-btn tl-nav-next" id="tl-nav-next" title="Next Memory">
                    <span class="tl-nav-label">Next</span>
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="9,4 17,12 9,20"/>
                    </svg>
                </button>
            </div>
        `;

        document.body.insertBefore(intro, document.body.firstChild);
        introContainer = intro;
        return intro;
    }

    // ===== Create stars =====
    function createStars() {
        const container = document.getElementById('tl-stars');
        if (!container) return;
        for (let i = 0; i < 80; i++) {
            const star = document.createElement('div');
            star.className = 'timeline-star';
            star.style.left = Math.random() * 100 + '%';
            star.style.top = Math.random() * 100 + '%';
            star.style.setProperty('--dur', (2 + Math.random() * 4) + 's');
            star.style.setProperty('--brightness', (0.3 + Math.random() * 0.7));
            star.style.animationDelay = Math.random() * 5 + 's';
            container.appendChild(star);
        }
    }

    // ===== Create floating hearts =====
    function createFloatingHearts() {
        const container = document.getElementById('tl-float-hearts');
        if (!container) return;
        const hearts = ['💖', '💕', '💗', '💝', '✨', '🌸', '💫'];
        for (let i = 0; i < 15; i++) {
            const heart = document.createElement('div');
            heart.className = 'tl-float-heart';
            heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
            heart.style.left = Math.random() * 100 + '%';
            heart.style.setProperty('--dur', (8 + Math.random() * 8) + 's');
            heart.style.setProperty('--delay', (Math.random() * 10) + 's');
            heart.style.fontSize = (0.8 + Math.random() * 0.8) + 'rem';
            container.appendChild(heart);
        }
    }

    // ===== Update progress bar =====
    function updateProgress() {
        const bar = document.getElementById('tl-progress-bar');
        const counter = document.getElementById('tl-counter');
        if (!bar) return;
        const total = memories.length;
        const progress = ((currentIndex + 1) / total) * 100;
        bar.style.width = progress + '%';
        if (counter) {
            counter.textContent = (currentIndex + 1) + ' / ' + total;
        }
    }

    // ===== Show Welcome =====
    function showWelcome() {
        return new Promise(resolve => {
            const welcome = document.getElementById('tl-welcome');
            if (!welcome) { resolve(); return; }
            welcome.classList.add('active');
            setTimeout(() => {
                welcome.classList.add('exit');
                setTimeout(() => {
                    welcome.classList.remove('active', 'exit');
                    welcome.style.display = 'none';
                    resolve();
                }, 1000);
            }, 3500);
        });
    }

    // ===== Clear pending timeouts =====
    function clearMemoryTimeouts() {
        memoryTimeouts.forEach(t => clearTimeout(t));
        memoryTimeouts = [];
    }

    // ===== Update nav button states =====
    function updateNavButtons() {
        const prevBtn = document.getElementById('tl-nav-prev');
        const nextBtn = document.getElementById('tl-nav-next');
        if (prevBtn) {
            prevBtn.classList.toggle('disabled', currentIndex <= 0);
            prevBtn.disabled = (currentIndex <= 0);
        }
        if (nextBtn) {
            nextBtn.classList.toggle('disabled', currentIndex >= memories.length - 1);
            nextBtn.disabled = (currentIndex >= memories.length - 1);
        }
    }

    // ===== Show Calendar Transition =====
    function showCalendarTransition(memoryIndex) {
        return new Promise(resolve => {
            navResolve = resolve;
            navDirection = null;
            const cal = document.getElementById('tl-calendar');
            if (!cal) { resolve(); return; }

            const memory = memories[memoryIndex];
            const parsed = parseMemoryDate(memory.date);

            document.getElementById('tl-cal-month').textContent = parsed.month;
            document.getElementById('tl-cal-day').textContent = parsed.day;
            document.getElementById('tl-cal-year').textContent = parsed.year;

            // Create dots
            const dotsContainer = document.getElementById('tl-cal-dots');
            dotsContainer.innerHTML = '';
            const totalDots = Math.min(memories.length, 36);
            for (let i = 0; i < totalDots; i++) {
                const dot = document.createElement('div');
                dot.className = 'calendar-dot';
                if (i === Math.floor(memoryIndex * totalDots / memories.length)) dot.classList.add('active');
                dotsContainer.appendChild(dot);
            }

            // Re-trigger flip animation
            const page = cal.querySelector('.calendar-page');
            if (page) {
                page.style.animation = 'none';
                page.offsetHeight; // reflow
                page.style.animation = 'calPageFlip 1.2s ease';
            }

            cal.classList.add('active');
            cal.classList.remove('exit');

            clearMemoryTimeouts();
            const t1 = setTimeout(() => {
                cal.classList.add('exit');
                const t2 = setTimeout(() => {
                    cal.classList.remove('active', 'exit');
                    navResolve = null;
                    resolve();
                }, 600);
                memoryTimeouts.push(t2);
            }, 1400);
            memoryTimeouts.push(t1);
        });
    }

    // ===== Show Memory =====
    function showMemory(index) {
        return new Promise(resolve => {
            navResolve = resolve;
            navDirection = null;
            const memEl = document.getElementById('tl-memory');
            if (!memEl) { resolve(); return; }

            const memory = memories[index];
            currentIndex = index;
            updateProgress();
            updateNavButtons();

            // Populate
            document.getElementById('tl-mem-date').textContent = memory.date;
            document.getElementById('tl-mem-milestone').textContent = memory.milestone;
            document.getElementById('tl-mem-emoji').textContent = memory.emoji;
            document.getElementById('tl-mem-title').textContent = memory.title;
            document.getElementById('tl-mem-event').textContent = memory.event;
            document.getElementById('tl-mem-quote').textContent = '"' + memory.quote + '"';

            memEl.classList.remove('exit');
            memEl.classList.add('active');

            // Time to read — varies by content length
            const readTime = Math.max(3500, Math.min(5500, memory.event.length * 25 + memory.quote.length * 20));

            clearMemoryTimeouts();
            const t1 = setTimeout(() => {
                memEl.classList.add('exit');
                memEl.classList.remove('active');
                const t2 = setTimeout(() => {
                    memEl.classList.remove('exit');
                    navResolve = null;
                    resolve();
                }, 900);
                memoryTimeouts.push(t2);
            }, readTime);
            memoryTimeouts.push(t1);
        });
    }

    // ===== Show Bridge (Something is about to happen) =====
    function showBridge() {
        return new Promise(resolve => {
            const bridge = document.getElementById('tl-bridge');
            if (!bridge) { resolve(); return; }
            bridge.classList.add('active');

            setTimeout(() => {
                bridge.classList.add('exit');
                setTimeout(() => {
                    bridge.classList.remove('active', 'exit');
                    resolve();
                }, 1000);
            }, 4000);
        });
    }

    // ===== Instantly clear all visible timeline screens =====
    function clearAllScreens() {
        clearMemoryTimeouts();
        const memEl = document.getElementById('tl-memory');
        const cal = document.getElementById('tl-calendar');
        if (memEl) { memEl.classList.remove('active', 'exit'); }
        if (cal) { cal.classList.remove('active', 'exit'); }
    }

    // ===== Navigate to a specific memory index =====
    function navigateTo(direction) {
        if (!isAnimating) return;

        let targetIndex;
        if (direction === 'prev') {
            targetIndex = Math.max(0, currentIndex - 1);
            if (targetIndex === currentIndex) return; // already at first
        } else {
            targetIndex = Math.min(memories.length - 1, currentIndex + 1);
            if (targetIndex === currentIndex) return; // already at last
        }

        // Set nav direction so the loop knows what to do
        navDirection = direction;

        // Cancel any pending animations
        clearAllScreens();

        // Resolve the current promise if it exists
        if (navResolve) {
            const fn = navResolve;
            navResolve = null;
            fn();
        }
    }

    // ===== Run the full timeline sequence =====
    async function runTimeline(onComplete) {
        skipCallback = onComplete;
        isAnimating = true;

        // Show welcome first
        await showWelcome();

        // Show nav controls after welcome
        const navControls = document.getElementById('tl-nav-controls');
        if (navControls) navControls.classList.add('active');

        // Loop through all memories with navigation support
        let i = 0;
        while (i < memories.length) {
            if (!isAnimating) return; // Skipped

            navDirection = null;

            // Show calendar transition
            await showCalendarTransition(i);
            if (!isAnimating) return;

            // Check if user navigated during calendar
            if (navDirection === 'prev') {
                i = Math.max(0, currentIndex - 1);
                currentIndex = i;
                updateProgress();
                updateNavButtons();
                continue;
            }
            if (navDirection === 'next') {
                i = Math.min(memories.length - 1, currentIndex + 1);
                currentIndex = i;
                updateProgress();
                updateNavButtons();
                continue;
            }

            // Show the memory
            await showMemory(i);
            if (!isAnimating) return;

            // Check if user navigated during memory display
            if (navDirection === 'prev') {
                i = Math.max(0, currentIndex - 1);
                currentIndex = i;
                updateProgress();
                updateNavButtons();
                continue;
            }
            if (navDirection === 'next') {
                i = Math.min(memories.length - 1, currentIndex + 1);
                currentIndex = i;
                updateProgress();
                updateNavButtons();
                continue;
            }

            // Normal flow: advance to next
            i++;
        }

        // Hide nav controls before bridge
        if (navControls) navControls.classList.remove('active');

        // Show bridge
        if (isAnimating) {
            await showBridge();
        }

        // Done - transition to main app
        if (isAnimating) {
            finishTimeline(onComplete);
        }
    }

    // ===== Finish & cleanup =====
    function finishTimeline(onComplete) {
        isAnimating = false;
        const intro = document.getElementById('timeline-intro');
        const progress = document.getElementById('tl-progress');
        const skip = document.getElementById('tl-skip');
        const counter = document.getElementById('tl-counter');

        if (skip) skip.style.display = 'none';
        if (counter) counter.style.display = 'none';
        if (progress) progress.style.display = 'none';

        if (intro) {
            intro.classList.add('fade-out');
            setTimeout(() => {
                intro.remove();
                if (onComplete) onComplete();
            }, 1500);
        } else {
            if (onComplete) onComplete();
        }
    }

    // ===== Skip handler =====
    function skip() {
        isAnimating = false;
        finishTimeline(skipCallback);
    }

    // ===== Initialize =====
    function init(onComplete) {
        createIntroDOM();
        createStars();
        createFloatingHearts();

        // Skip button
        const skipBtn = document.getElementById('tl-skip');
        if (skipBtn) {
            skipBtn.addEventListener('click', skip);
        }

        // Mute button in timeline
        const muteBtn = document.getElementById('tl-mute-btn');
        if (muteBtn) {
            let tlMuted = false;
            muteBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                if (typeof AudioController !== 'undefined') {
                    AudioController.toggleMute();
                    tlMuted = !tlMuted;
                    muteBtn.querySelector('.tl-mute-icon-on').style.display = tlMuted ? 'none' : 'block';
                    muteBtn.querySelector('.tl-mute-icon-off').style.display = tlMuted ? 'block' : 'none';
                    muteBtn.classList.toggle('muted', tlMuted);
                }
            });
        }

        // Navigation buttons
        const prevBtn = document.getElementById('tl-nav-prev');
        const nextBtn = document.getElementById('tl-nav-next');
        if (prevBtn) {
            prevBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                navigateTo('prev');
            });
        }
        if (nextBtn) {
            nextBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                navigateTo('next');
            });
        }

        // Keyboard shortcuts for navigation
        document.addEventListener('keydown', function(e) {
            if (!isAnimating || !introContainer) return;
            if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
                e.preventDefault();
                navigateTo('prev');
            } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
                e.preventDefault();
                navigateTo('next');
            }
        });

        // Start the timeline
        setTimeout(() => {
            runTimeline(onComplete);
        }, 500);
    }

    // ===== Expose data for roadmap =====
    function getMemories() {
        return memories;
    }

    return { init, getMemories, skip };
})();


/* ==========================================
   LOVE ROADMAP — In-page timeline section
   ========================================== */

const LoveRoadmap = (function() {
    'use strict';

    function createRoadmapSection() {
        const memories = LoveTimeline.getMemories();
        const section = document.createElement('section');
        section.id = 'love-roadmap';
        section.className = 'love-roadmap-section';

        let html = `
            <div class="section-header">
                <span class="section-badge">📖</span>
                <h2 class="section-title">Our Love Roadmap</h2>
                <p class="section-subtitle">Every milestone of our beautiful journey together</p>
            </div>
            <div class="roadmap-container">
        `;

        memories.forEach((memory, index) => {
            html += `
                <div class="roadmap-item" data-index="${index}">
                    <div class="roadmap-dot"></div>
                    <div class="roadmap-connector"></div>
                    <div class="roadmap-content">
                        <div class="roadmap-date">${memory.emoji} ${memory.date}</div>
                        <div class="roadmap-title">${memory.title}</div>
                        <p class="roadmap-event-text">${memory.event}</p>
                        <p class="roadmap-quote-text">"${memory.quote}"</p>
                    </div>
                </div>
            `;
        });

        html += '</div>';
        section.innerHTML = html;
        return section;
    }

    function insertIntoPage() {
        const section = createRoadmapSection();

        // Insert before the footer
        const footer = document.querySelector('.main-footer');
        if (footer) {
            footer.parentNode.insertBefore(section, footer);
        } else {
            const mainScreen = document.getElementById('main-screen');
            if (mainScreen) mainScreen.appendChild(section);
        }

        // Observe for scroll animation
        initRoadmapObserver();

        // Update nav — add "Our Journey" link
        addNavLink();
    }

    function initRoadmapObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const index = parseInt(entry.target.dataset.index) || 0;
                    setTimeout(() => {
                        entry.target.classList.add('visible');
                        // Launch fireworks on left and right sides for milestone items
                        launchRoadmapFireworks(entry.target, index);
                    }, (index % 5) * 100);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

        document.querySelectorAll('.roadmap-item').forEach(item => {
            observer.observe(item);
        });
    }

    // ===== FIREWORKS on roadmap timeline items =====
    function launchRoadmapFireworks(element, index) {
        // Only fire on every 3rd item or special milestones to avoid overload
        if (index % 3 !== 0 && index !== memories.length - 1) return;
        const rect = element.getBoundingClientRect();
        const section = document.getElementById('love-roadmap');
        if (!section) return;

        const colors = ['#FF4081', '#FFD700', '#FF1493', '#9C27B0', '#AB47BC', '#E91E63', '#FF69B4', '#CE93D8'];

        // Left side firework
        createFireworkBurst(section, 40, rect.top - section.getBoundingClientRect().top + rect.height/2, colors);
        // Right side firework
        createFireworkBurst(section, section.offsetWidth - 40, rect.top - section.getBoundingClientRect().top + rect.height/2, colors);
    }

    function createFireworkBurst(container, x, y, colors) {
        const particleCount = window.innerWidth < 768 ? 8 : 14;
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'roadmap-firework-particle';
            const angle = (Math.PI * 2 * i) / particleCount;
            const distance = 30 + Math.random() * 50;
            const dx = Math.cos(angle) * distance;
            const dy = Math.sin(angle) * distance;
            const color = colors[Math.floor(Math.random() * colors.length)];
            const size = 3 + Math.random() * 4;
            particle.style.cssText = 'position:absolute;left:'+x+'px;top:'+y+'px;width:'+size+'px;height:'+size+'px;border-radius:50%;background:'+color+';pointer-events:none;z-index:10;box-shadow:0 0 6px '+color+',0 0 12px '+color+';';
            particle.style.setProperty('--fw-dx', dx+'px');
            particle.style.setProperty('--fw-dy', dy+'px');
            container.appendChild(particle);
            // Trigger animation
            requestAnimationFrame(function() {
                particle.style.transition = 'all 0.8s cubic-bezier(0.25,0.46,0.45,0.94)';
                particle.style.transform = 'translate('+dx+'px,'+dy+'px) scale(0)';
                particle.style.opacity = '0';
            });
            setTimeout(function(){ if(particle.parentNode) particle.parentNode.removeChild(particle); }, 1000);
        }
        // Center flash
        const flash = document.createElement('div');
        flash.style.cssText = 'position:absolute;left:'+(x-10)+'px;top:'+(y-10)+'px;width:20px;height:20px;border-radius:50%;background:radial-gradient(circle,rgba(255,255,255,0.8),rgba(255,64,129,0.3),transparent);pointer-events:none;z-index:10;';
        container.appendChild(flash);
        requestAnimationFrame(function() {
            flash.style.transition = 'all 0.5s ease-out';
            flash.style.transform = 'scale(3)';
            flash.style.opacity = '0';
        });
        setTimeout(function(){ if(flash.parentNode) flash.parentNode.removeChild(flash); }, 600);
    }

    function addNavLink() {
        const navLinks = document.querySelector('.nav-links');
        if (!navLinks) return;

        // Check if already added
        if (navLinks.querySelector('a[href="#love-roadmap"]')) return;

        const link = document.createElement('a');
        link.href = '#love-roadmap';
        link.className = 'nav-link';
        link.textContent = 'Our Journey';

        // Insert before the last link (My Letter)
        const letterLink = navLinks.querySelector('a[href="#letter"]');
        if (letterLink) {
            navLinks.insertBefore(link, letterLink);
        } else {
            navLinks.appendChild(link);
        }
    }

    return { insertIntoPage };
})();
