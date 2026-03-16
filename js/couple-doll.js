/* ============================================
   REALISTIC SALSA COUPLE — Scroll-Driven Dance
   Realistic human figures with salsa lifts
   ============================================ */
var CoupleDoll = {
    container: null,
    coupleEl: null,
    boyEl: null,
    girlEl: null,
    heartsEl: null,
    labelEl: null,
    floorEl: null,
    initialized: false,
    animFrameId: null,

    scrollY: 0,
    lastScrollY: 0,
    isScrolling: false,
    scrollTimer: null,

    boyX: -140,
    girlX: 140,
    targetBoyX: -140,
    targetGirlX: 140,
    closeness: 0,
    phase: 'approach',

    currentPose: -1,
    lastStepScroll: 0,
    poseTimer: null,
    stepLabelTimer: null,

    salsaMoves: [
        { name: '\ud83d\udc83 Basic Salsa Step', pose: 'basic', duration: 2000 },
        { name: '\ud83d\udd25 Cross Body Lead', pose: 'cross-body', duration: 2200 },
        { name: '\ud83c\udf00 Inside Turn', pose: 'inside-turn', duration: 1800 },
        { name: '\u2728 Romantic Dip', pose: 'dip', duration: 2500 },
        { name: '\ud83c\udf1f Waist Lift', pose: 'lift-waist', duration: 2800, isLift: true },
        { name: '\ud83d\udcab Overhead Lift', pose: 'lift-overhead', duration: 3200, isLift: true },
        { name: '\ud83d\udd25 Star Lift', pose: 'lift-star', duration: 3500, isLift: true },
        { name: '\u2764\ufe0f Lean Back Lift', pose: 'lift-lean', duration: 2800, isLift: true },
        { name: '\ud83c\udf00 Spinning Lift', pose: 'lift-spin', duration: 3000, isLift: true },
        { name: '\ud83d\udc83 Basic Salsa Step', pose: 'basic', duration: 2000 },
        { name: '\u2728 Copa Move', pose: 'cross-body', duration: 2200 },
        { name: '\ud83d\udc96 Enchufla', pose: 'inside-turn', duration: 1800 }
    ],

    c: function() {
        var t = (typeof currentTheme !== 'undefined' && currentTheme) ? currentTheme : null;
        return {
            primary: t ? t.primary : '#E91E63',
            secondary: t ? t.secondary : '#9C27B0',
            accent: t ? t.accent : '#FF4081',
            gold: t ? t.gold : '#FFD700',
            skin: '#C68642',
            skinLight: '#FDDCCC',
            hair: '#1A1209',
            hairGirl: '#2C1A0E',
            suit: t ? t.primary : '#E91E63',
            suitDark: t ? (t.accentDeep || '#5C2434') : '#5C2434',
            dress: t ? t.primary : '#E91E63',
            dressAccent: t ? t.accent : '#FF4081',
            dressGlow: t ? t.secondary : '#9C27B0'
        };
    },

    init: function() {
        if (this.initialized) return;
        this.createDOM();
        this.bindScroll();
        this.startLoop();
        this.initialized = true;
    },

    createDOM: function() {
        this.container = document.createElement('div');
        this.container.id = 'couple-doll-layer';
        this.container.classList.add('phase-approach');

        this.container.innerHTML =
            '<div class="dance-stage">' +
                '<div class="spotlight spotlight-left"></div>' +
                '<div class="spotlight spotlight-center"></div>' +
                '<div class="spotlight spotlight-right"></div>' +
                '<div class="stage-floor"></div>' +
                '<div class="couple-container" id="couple-container">' +
                    '<div class="dancer dancer-boy" id="dancer-boy"></div>' +
                    '<div class="dance-hearts" id="dance-hearts">' +
                        '<span class="dance-heart">\ud83d\udc96</span>' +
                        '<span class="dance-heart">\ud83d\udc95</span>' +
                        '<span class="dance-heart">\ud83d\udc97</span>' +
                    '</div>' +
                    '<div class="dancer dancer-girl" id="dancer-girl"></div>' +
                '</div>' +
                '<div class="dance-step-label" id="dance-step-label"></div>' +
            '</div>';

        var mainScreen = document.getElementById('main-screen');
        if (mainScreen) mainScreen.insertBefore(this.container, mainScreen.firstChild);
        else document.body.appendChild(this.container);

        this.coupleEl = document.getElementById('couple-container');
        this.boyEl = document.getElementById('dancer-boy');
        this.girlEl = document.getElementById('dancer-girl');
        this.heartsEl = document.getElementById('dance-hearts');
        this.labelEl = document.getElementById('dance-step-label');
        this.floorEl = this.container.querySelector('.stage-floor');

        this.renderBoy();
        this.renderGirl();

        var self = this;
        setTimeout(function() {
            var el = document.getElementById('couple-doll-layer');
            if (el) el.classList.add('visible');
        }, 600);
    },

    renderBoy: function() {
        if (!this.boyEl) return;
        var col = this.c();
        this.boyEl.innerHTML =
        '<svg viewBox="0 0 120 300" width="120" height="300" xmlns="http://www.w3.org/2000/svg">' +
        '<defs>' +
            '<linearGradient id="boySuit" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="' + col.suit + '"/><stop offset="100%" stop-color="' + col.suitDark + '"/></linearGradient>' +
            '<linearGradient id="boySkin" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="' + col.skin + '"/><stop offset="100%" stop-color="#A0522D"/></linearGradient>' +
            '<radialGradient id="boyFace" cx="45%" cy="35%"><stop offset="0%" stop-color="#D4A574"/><stop offset="100%" stop-color="' + col.skin + '"/></radialGradient>' +
            '<filter id="bSh"><feDropShadow dx="0" dy="3" stdDeviation="4" flood-color="rgba(0,0,0,0.25)"/></filter>' +
        '</defs>' +
        '<g filter="url(#bSh)">' +
        '<ellipse cx="60" cy="295" rx="30" ry="5" fill="rgba(0,0,0,0.15)"/>' +
        '<g><path d="M42 185 L38 240 Q38 245 42 245 L54 245 Q58 245 58 240 L55 185Z" fill="' + col.suitDark + '"/>' +
        '<path d="M36 242 Q34 250 34 255 Q34 262 42 262 L56 262 Q62 262 62 256 L60 242Z" fill="#1A1209"/></g>' +
        '<g><path d="M64 185 L62 240 Q62 245 66 245 L78 245 Q82 245 82 240 L80 185Z" fill="' + col.suitDark + '"/>' +
        '<path d="M60 242 Q58 250 58 255 Q58 262 66 262 L80 262 Q86 262 86 256 L84 242Z" fill="#1A1209"/></g>' +
        '<path d="M38 100 Q35 103 35 110 L35 188 Q35 192 40 192 L80 192 Q85 192 85 188 L85 110 Q85 103 82 100Z" fill="url(#boySuit)"/>' +
        '<path d="M48 100 L60 125 L72 100" stroke="' + col.gold + '" stroke-width="1.5" fill="none" opacity="0.6"/>' +
        '<path d="M52 100 L60 118 L68 100" fill="rgba(255,255,255,0.15)"/>' +
        '<circle cx="60" cy="132" r="2" fill="' + col.gold + '" opacity="0.5"/><circle cx="60" cy="148" r="2" fill="' + col.gold + '" opacity="0.5"/><circle cx="60" cy="164" r="2" fill="' + col.gold + '" opacity="0.5"/>' +
        '<rect x="37" y="183" width="46" height="6" rx="2" fill="#1A1209"/><rect x="56" y="182" width="8" height="8" rx="1.5" fill="' + col.gold + '" opacity="0.6"/>' +
        '<g><path d="M35 103 L22 107 Q16 109 18 125 L22 158 Q24 163 28 161 L34 153 Q36 148 35 138Z" fill="url(#boySuit)"/>' +
        '<ellipse cx="24" cy="165" rx="8" ry="10" fill="url(#boySkin)"/></g>' +
        '<g><path d="M85 103 L98 107 Q104 109 102 125 L98 158 Q96 163 92 161 L86 153 Q84 148 85 138Z" fill="url(#boySuit)"/>' +
        '<ellipse cx="96" cy="165" rx="8" ry="10" fill="url(#boySkin)"/></g>' +
        '<rect x="52" y="84" width="16" height="18" rx="7" fill="url(#boySkin)"/>' +
        '<path d="M48 100 L52 90 L60 95 L68 90 L72 100" fill="rgba(255,255,255,0.2)"/>' +
        '<g><ellipse cx="60" cy="60" rx="25" ry="28" fill="url(#boyFace)"/>' +
        '<path d="M35 50 Q35 23 60 20 Q85 23 85 50 L85 43 Q85 17 60 13 Q35 17 35 43Z" fill="' + col.hair + '"/>' +
        '<ellipse cx="35" cy="50" rx="5" ry="12" fill="' + col.hair + '"/><ellipse cx="85" cy="50" rx="5" ry="12" fill="' + col.hair + '"/>' +
        '<ellipse cx="55" cy="25" rx="10" ry="4" fill="rgba(255,255,255,0.08)" transform="rotate(-8,55,25)"/>' +
        '<path d="M44 47 Q50 43 56 47" stroke="' + col.hair + '" stroke-width="2.2" fill="none"/><path d="M64 47 Q70 43 76 47" stroke="' + col.hair + '" stroke-width="2.2" fill="none"/>' +
        '<g><ellipse cx="50" cy="55" rx="5" ry="4.5" fill="white"/><circle cx="51" cy="55" r="3" fill="#2C1810"/><circle cx="52" cy="54" r="1.2" fill="white" opacity="0.9"/>' +
        '<animate attributeName="opacity" values="1;1;0;1;1" dur="4s" repeatCount="indefinite" keyTimes="0;0.48;0.5;0.52;1"/></g>' +
        '<g><ellipse cx="70" cy="55" rx="5" ry="4.5" fill="white"/><circle cx="71" cy="55" r="3" fill="#2C1810"/><circle cx="72" cy="54" r="1.2" fill="white" opacity="0.9"/></g>' +
        '<path d="M58 58 Q60 65 62 58" stroke="' + col.skin + '" stroke-width="1.5" fill="none" opacity="0.4"/>' +
        '<path d="M48 71 Q60 81 72 71" stroke="#5C3A28" stroke-width="2" fill="none" stroke-linecap="round"/>' +
        '<ellipse cx="43" cy="66" rx="6" ry="3.5" fill="#E57373" opacity="0.15"/><ellipse cx="77" cy="66" rx="6" ry="3.5" fill="#E57373" opacity="0.15"/>' +
        '<ellipse cx="35" cy="58" rx="4" ry="6" fill="url(#boySkin)" opacity="0.7"/><ellipse cx="85" cy="58" rx="4" ry="6" fill="url(#boySkin)" opacity="0.7"/>' +
        '</g></g></svg>';
    },

    renderGirl: function() {
        if (!this.girlEl) return;
        var col = this.c();
        this.girlEl.innerHTML =
        '<svg viewBox="0 0 130 300" width="130" height="300" xmlns="http://www.w3.org/2000/svg">' +
        '<defs>' +
            '<linearGradient id="gDr" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="' + col.dress + '"/><stop offset="100%" stop-color="' + col.dressGlow + '"/></linearGradient>' +
            '<linearGradient id="gDSh" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stop-color="white" stop-opacity="0"/><stop offset="50%" stop-color="white" stop-opacity="0.12"/><stop offset="100%" stop-color="white" stop-opacity="0"/></linearGradient>' +
            '<linearGradient id="gSk" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="' + col.skinLight + '"/><stop offset="100%" stop-color="#E8C4A8"/></linearGradient>' +
            '<radialGradient id="gFc" cx="45%" cy="35%"><stop offset="0%" stop-color="#FEE8D6"/><stop offset="100%" stop-color="' + col.skinLight + '"/></radialGradient>' +
            '<radialGradient id="gHr"><stop offset="0%" stop-color="#3D2414"/><stop offset="100%" stop-color="' + col.hairGirl + '"/></radialGradient>' +
            '<filter id="gSh"><feDropShadow dx="0" dy="3" stdDeviation="4" flood-color="rgba(0,0,0,0.2)"/></filter>' +
        '</defs>' +
        '<g filter="url(#gSh)">' +
        '<ellipse cx="65" cy="295" rx="35" ry="5" fill="rgba(0,0,0,0.12)"/>' +
        '<g><path d="M48 225 L46 262 Q46 268 52 268 L58 268 Q62 268 62 264 L60 225Z" fill="url(#gSk)"/>' +
        '<path d="M44 264 L42 268 Q40 275 46 276 L60 276 Q65 276 65 272 L64 264Z" fill="' + col.dress + '"/>' +
        '<rect x="44" y="276" width="4" height="8" rx="1" fill="' + col.suitDark + '" transform="rotate(-8,46,280)"/></g>' +
        '<g><path d="M68 225 L66 262 Q66 268 72 268 L78 268 Q82 268 82 264 L80 225Z" fill="url(#gSk)"/>' +
        '<path d="M64 264 L62 268 Q60 275 66 276 L80 276 Q85 276 85 272 L84 264Z" fill="' + col.dress + '"/>' +
        '<rect x="66" y="276" width="4" height="8" rx="1" fill="' + col.suitDark + '" transform="rotate(-8,68,280)"/></g>' +
        '<g><path d="M42 97 Q38 100 35 110 L25 230 Q30 245 65 250 Q100 245 105 230 L95 110 Q92 100 88 97Z" fill="url(#gDr)">' +
        '<animate attributeName="d" values="M42 97 Q38 100 35 110 L25 230 Q30 245 65 250 Q100 245 105 230 L95 110 Q92 100 88 97Z;M42 97 Q38 100 35 110 L22 228 Q28 248 65 252 Q102 248 108 228 L95 110 Q92 100 88 97Z;M42 97 Q38 100 35 110 L25 230 Q30 245 65 250 Q100 245 105 230 L95 110 Q92 100 88 97Z" dur="3s" repeatCount="indefinite"/></path>' +
        '<path d="M42 97 Q38 100 35 110 L25 230 Q30 245 65 250 Q100 245 105 230 L95 110 Q92 100 88 97Z" fill="url(#gDSh)" opacity="0.7"/>' +
        '<path d="M25 228 Q35 238 45 228 Q55 238 65 228 Q75 238 85 228 Q95 238 105 228" stroke="' + col.dressAccent + '" stroke-width="2" fill="none" opacity="0.5">' +
        '<animate attributeName="d" values="M25 228 Q35 238 45 228 Q55 238 65 228 Q75 238 85 228 Q95 238 105 228;M22 226 Q34 240 46 226 Q56 242 66 226 Q76 240 86 226 Q96 242 108 226;M25 228 Q35 238 45 228 Q55 238 65 228 Q75 238 85 228 Q95 238 105 228" dur="2.5s" repeatCount="indefinite"/></path>' +
        '<circle cx="50" cy="135" r="1.5" fill="white" opacity="0.4"><animate attributeName="opacity" values="0.4;0.9;0.4" dur="2s" repeatCount="indefinite"/></circle>' +
        '<circle cx="78" cy="150" r="1.2" fill="white" opacity="0.3"><animate attributeName="opacity" values="0.3;0.8;0.3" dur="2.5s" repeatCount="indefinite"/></circle>' +
        '<circle cx="55" cy="170" r="1.5" fill="white" opacity="0.35"/><circle cx="80" cy="185" r="1.2" fill="white" opacity="0.3"/>' +
        '<path d="M40 110 Q65 105 90 110 Q92 115 90 120 Q65 115 40 120 Q38 115 40 110Z" fill="' + col.dressAccent + '" opacity="0.7"/>' +
        '<path d="M85 115 L95 130 Q92 135 88 133 L82 120" fill="' + col.dressAccent + '" opacity="0.6"/></g>' +
        '<path d="M45 91 Q65 85 85 91 L88 103 Q65 97 42 103Z" fill="url(#gSk)"/>' +
        '<g><path d="M38 97 L24 103 Q16 107 14 125 L16 158 Q18 165 24 163 L32 151 Q35 143 36 131Z" fill="url(#gSk)"/>' +
        '<ellipse cx="20" cy="153" rx="6" ry="3" fill="' + col.gold + '" opacity="0.6"/>' +
        '<ellipse cx="22" cy="167" rx="7" ry="9" fill="url(#gSk)"/></g>' +
        '<g><path d="M92 97 L106 103 Q114 107 116 125 L114 158 Q112 165 106 163 L98 151 Q95 143 94 131Z" fill="url(#gSk)"/>' +
        '<ellipse cx="110" cy="153" rx="6" ry="3" fill="' + col.gold + '" opacity="0.6"/>' +
        '<ellipse cx="108" cy="167" rx="7" ry="9" fill="url(#gSk)"/></g>' +
        '<rect x="55" y="77" width="20" height="18" rx="8" fill="url(#gSk)"/>' +
        '<path d="M48 91 Q65 100 82 91" stroke="' + col.gold + '" stroke-width="1.5" fill="none" opacity="0.6"/>' +
        '<circle cx="65" cy="98" r="3.5" fill="' + col.gold + '" opacity="0.7"><animate attributeName="r" values="3.5;4;3.5" dur="2s" repeatCount="indefinite"/></circle>' +
        '<circle cx="65" cy="98" r="1.5" fill="white" opacity="0.5"/>' +
        '<g><ellipse cx="65" cy="51" rx="26" ry="30" fill="url(#gFc)"/>' +
        '<path d="M39 43 Q38 15 65 9 Q92 15 91 43 L91 35 Q90 7 65 1 Q40 7 39 35Z" fill="url(#gHr)"/>' +
        '<path d="M39 43 Q36 50 34 65 Q32 75 34 87 Q36 90 38 85 Q38 70 40 55Z" fill="url(#gHr)"/>' +
        '<path d="M91 43 Q94 50 96 65 Q98 75 96 87 Q94 90 92 85 Q92 70 90 55Z" fill="url(#gHr)"/>' +
        '<circle cx="34" cy="89" r="5" fill="' + col.hairGirl + '" opacity="0.8"/><circle cx="96" cy="89" r="5" fill="' + col.hairGirl + '" opacity="0.8"/>' +
        '<ellipse cx="55" cy="17" rx="10" ry="4" fill="rgba(255,255,255,0.1)" transform="rotate(-10,55,17)"><animate attributeName="opacity" values="0.1;0.18;0.1" dur="4s" repeatCount="indefinite"/></ellipse>' +
        '<path d="M46 39 Q53 34 60 39" stroke="' + col.hairGirl + '" stroke-width="1.8" fill="none"/><path d="M70 39 Q77 34 84 39" stroke="' + col.hairGirl + '" stroke-width="1.8" fill="none"/>' +
        '<g><ellipse cx="53" cy="47" rx="6" ry="5.5" fill="white"/><circle cx="54" cy="47" r="3.5" fill="#3B2218"/><circle cx="55.5" cy="46" r="1.5" fill="white" opacity="0.9"/>' +
        '<path d="M46 43 Q53 40 60 43" stroke="' + col.hairGirl + '" stroke-width="1.2" fill="none"/>' +
        '<line x1="47" y1="43" x2="44" y2="39" stroke="' + col.hairGirl + '" stroke-width="1.5" stroke-linecap="round"/>' +
        '<line x1="50" y1="42" x2="49" y2="38" stroke="' + col.hairGirl + '" stroke-width="1.2" stroke-linecap="round"/>' +
        '<line x1="56" y1="42" x2="57" y2="38" stroke="' + col.hairGirl + '" stroke-width="1.2" stroke-linecap="round"/></g>' +
        '<g><ellipse cx="77" cy="47" rx="6" ry="5.5" fill="white"/><circle cx="78" cy="47" r="3.5" fill="#3B2218"/><circle cx="79.5" cy="46" r="1.5" fill="white" opacity="0.9"/>' +
        '<path d="M70 43 Q77 40 84 43" stroke="' + col.hairGirl + '" stroke-width="1.2" fill="none"/>' +
        '<line x1="83" y1="43" x2="86" y2="39" stroke="' + col.hairGirl + '" stroke-width="1.5" stroke-linecap="round"/>' +
        '<line x1="80" y1="42" x2="81" y2="38" stroke="' + col.hairGirl + '" stroke-width="1.2" stroke-linecap="round"/></g>' +
        '<path d="M63 51 Q65 58 67 51" stroke="' + col.skinLight + '" stroke-width="1.2" fill="none" opacity="0.35"/>' +
        '<path d="M55 63 Q60 59 65 63 Q70 59 75 63" stroke="#D4515E" stroke-width="1.5" fill="#E8697A" opacity="0.7"/>' +
        '<path d="M55 63 Q65 70 75 63" stroke="#C44858" stroke-width="1" fill="#D4616E" opacity="0.6"/>' +
        '<ellipse cx="65" cy="62" rx="3" ry="1" fill="white" opacity="0.2"/>' +
        '<ellipse cx="43" cy="57" rx="7" ry="4" fill="#FFAB91" opacity="0.2"><animate attributeName="opacity" values="0.2;0.35;0.2" dur="3s" repeatCount="indefinite"/></ellipse>' +
        '<ellipse cx="87" cy="57" rx="7" ry="4" fill="#FFAB91" opacity="0.2"/>' +
        '<circle cx="38" cy="57" r="3" fill="' + col.gold + '" opacity="0.6"/><path d="M38 60 L36 67 L40 67Z" fill="' + col.gold + '" opacity="0.5"/>' +
        '<circle cx="92" cy="57" r="3" fill="' + col.gold + '" opacity="0.6"/><path d="M92 60 L90 67 L94 67Z" fill="' + col.gold + '" opacity="0.5"/>' +
        '<g transform="translate(88,23) rotate(15)"><circle cx="0" cy="0" r="6" fill="' + col.dressAccent + '" opacity="0.8"/>' +
        '<circle cx="-5" cy="-3" r="4" fill="' + col.dress + '" opacity="0.7"/><circle cx="4" cy="-4" r="4" fill="' + col.dress + '" opacity="0.7"/>' +
        '<circle cx="0" cy="0" r="2.5" fill="' + col.gold + '" opacity="0.7"/></g>' +
        '</g></g></svg>';
    },

    bindScroll: function() {
        var self = this;
        window.addEventListener('scroll', function() {
            self.scrollY = window.scrollY || window.pageYOffset;
            self.lastScrollY = self.scrollY;
            self.isScrolling = true;

            clearTimeout(self.scrollTimer);
            self.scrollTimer = setTimeout(function() { self.isScrolling = false; }, 200);

            if (self.phase === 'dancing' && Math.abs(self.scrollY - self.lastStepScroll) > 100) {
                self.lastStepScroll = self.scrollY;
                self.advancePose();
            }
        }, { passive: true });
    },

    updatePositions: function() {
        if (!this.container) return;

        var maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        var scrollProgress = maxScroll > 0 ? Math.min(1, this.scrollY / (maxScroll * 0.35)) : 0;

        if (scrollProgress < 0.75) {
            if (this.phase !== 'approach') {
                this.phase = 'approach';
                this.container.classList.add('phase-approach');
                this.container.classList.remove('dancing');
                this.clearPose();
            }
            var progress = Math.min(1, scrollProgress / 0.75);
            var eased = progress * progress * (3 - 2 * progress);
            this.targetBoyX = -140 + eased * 140;
            this.targetGirlX = 140 - eased * 140;
        } else {
            if (this.phase !== 'dancing') {
                this.phase = 'dancing';
                this.container.classList.remove('phase-approach');
                this.container.classList.add('dancing');
                this.lastStepScroll = this.scrollY;
                this.advancePose();
            }
            this.targetBoyX = 0;
            this.targetGirlX = 0;
        }

        this.boyX += (this.targetBoyX - this.boyX) * 0.08;
        this.girlX += (this.targetGirlX - this.girlX) * 0.08;

        if (this.boyEl) this.boyEl.style.transform = 'translateX(' + this.boyX + 'px)';
        if (this.girlEl) this.girlEl.style.transform = 'translateX(' + this.girlX + 'px)';

        var dist = Math.abs(this.girlX - this.boyX);
        this.closeness = Math.max(0, Math.min(1, 1 - dist / 280));

        if (this.closeness > 0.6) this.container.classList.add('close-together');
        else this.container.classList.remove('close-together');

        this.container.style.opacity = Math.max(0.3, 0.3 + this.closeness * 0.7);
    },

    advancePose: function() {
        if (this.phase !== 'dancing' || !this.coupleEl) return;

        this.currentPose = (this.currentPose + 1) % this.salsaMoves.length;
        var move = this.salsaMoves[this.currentPose];

        this.clearPose();
        void this.coupleEl.offsetWidth;
        this.coupleEl.classList.add('pose-' + move.pose);

        if (this.labelEl) {
            this.labelEl.textContent = move.name;
            this.labelEl.classList.add('visible');
            var self = this;
            clearTimeout(this.stepLabelTimer);
            this.stepLabelTimer = setTimeout(function() {
                if (self.labelEl) self.labelEl.classList.remove('visible');
            }, 2200);
        }

        var sparkleCount = move.isLift ? 8 : 3;
        for (var i = 0; i < sparkleCount; i++) {
            var self = this;
            (function(delay) {
                setTimeout(function() { self.spawnSparkle(); }, delay);
            })(i * (move.isLift ? 100 : 150));
        }

        var self = this;
        var poseName = move.pose;
        setTimeout(function() {
            if (self.coupleEl) self.coupleEl.classList.remove('pose-' + poseName);
        }, move.duration);
    },

    clearPose: function() {
        if (!this.coupleEl) return;
        var poses = ['basic', 'cross-body', 'inside-turn', 'dip', 'lift-waist', 'lift-overhead', 'lift-star', 'lift-lean', 'lift-spin'];
        for (var i = 0; i < poses.length; i++) {
            this.coupleEl.classList.remove('pose-' + poses[i]);
        }
    },

    spawnSparkle: function() {
        if (!this.container) return;
        var sp = document.createElement('div');
        sp.className = 'dance-sparkle';
        var col = this.c();
        var colors = [col.accent, col.gold, col.dress, '#FFD700', '#FF69B4'];
        var color = colors[Math.floor(Math.random() * colors.length)];
        var size = Math.random() * 14 + 8;
        sp.innerHTML = '<svg viewBox="0 0 20 20" width="' + size + '" height="' + size + '"><path d="M10 0L12 8L20 10L12 12L10 20L8 12L0 10L8 8z" fill="' + color + '"/></svg>';

        var stage = this.container.querySelector('.dance-stage');
        if (!stage) return;

        sp.style.position = 'absolute';
        sp.style.left = (40 + Math.random() * 20) + '%';
        sp.style.bottom = (100 + Math.random() * 200) + 'px';
        sp.style.setProperty('--tx', (Math.random() - 0.5) * 80 + 'px');
        sp.style.setProperty('--ty', -(Math.random() * 60 + 30) + 'px');
        stage.appendChild(sp);
        setTimeout(function() { sp.remove(); }, 1500);
    },

    startLoop: function() {
        var self = this;
        function loop() {
            self.updatePositions();
            self.animFrameId = requestAnimationFrame(loop);
        }
        self.animFrameId = requestAnimationFrame(loop);
    },

    updateTheme: function() {
        this.renderBoy();
        this.renderGirl();
    },

    destroy: function() {
        if (this.animFrameId) cancelAnimationFrame(this.animFrameId);
        if (this.container && this.container.parentNode) this.container.parentNode.removeChild(this.container);
        this.initialized = false;
    }
};
