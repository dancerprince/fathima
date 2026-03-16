// ========================================
// COUPLE DOLL — Rich Animated Salsa Dance
// Boy LEFT (big), Girl RIGHT (shorter)
// Scroll → they move to center and salsa dance
// ========================================

const CoupleDoll = {
    container: null,
    boyEl: null,
    girlEl: null,
    heartsEl: null,
    floorEl: null,
    scrollY: 0,
    lastScrollY: 0,
    scrollDelta: 0,
    isScrolling: false,
    scrollTimer: null,
    danceAngle: 0,
    danceSpeed: 0,
    animFrameId: null,
    initialized: false,
    closeness: 0, // 0=far apart, 1=together in center

    // Boy position: starts far left, Girl starts far right
    boyX: 5,    // percentage from left
    girlX: 75,  // percentage from left
    targetBoyX: 5,
    targetGirlX: 75,

    init() {
        if (this.initialized) return;
        this.createContainer();
        this.render();
        this.bindScroll();
        this.startAnimationLoop();
        this.initialized = true;
    },

    createContainer() {
        this.container = document.createElement('div');
        this.container.id = 'couple-doll-layer';
        this.container.setAttribute('aria-hidden', 'true');

        this.container.innerHTML = `
            <div class="couple-doll-wrapper">
                <div class="couple-boy"></div>
                <div class="couple-hearts-container"></div>
                <div class="couple-girl"></div>
            </div>
            <div class="salsa-floor"></div>
        `;

        const mainScreen = document.getElementById('main-screen');
        if (mainScreen) {
            mainScreen.insertBefore(this.container, mainScreen.firstChild);
        } else {
            document.body.appendChild(this.container);
        }

        this.boyEl = this.container.querySelector('.couple-boy');
        this.girlEl = this.container.querySelector('.couple-girl');
        this.heartsEl = this.container.querySelector('.couple-hearts-container');
        this.floorEl = this.container.querySelector('.salsa-floor');
    },

    getThemeColors() {
        const t = (typeof currentTheme !== 'undefined' && currentTheme) ? currentTheme : null;
        return {
            boyShirt: t ? t.primary : '#E91E63',
            boyPants: t ? t.accentDeep : '#5C2434',
            boyShirtAccent: t ? t.secondary : '#9C27B0',
            girlDress: t ? t.primary : '#E91E63',
            girlDressAccent: t ? t.secondary : '#9C27B0',
            girlDressTrim: t ? t.accent : '#FF4081',
            girlBow: t ? t.accent : '#FF4081',
            boyTie: t ? t.accent : '#FF4081',
            heartColor: t ? t.accent : '#FF4081',
            sparkleColor: t ? t.gold : '#FFD700',
            shadowColor: 'rgba(233,30,99,0.15)',
            skinBoy: '#6D4C41',
            skinGirl: '#FDDCCC'
        };
    },

    generateBoySVG(angle, bounce, colors, intensity) {
        // Salsa dance movements — more intense when closer together
        const sway = Math.sin(angle) * (6 + intensity * 10);
        const armL = Math.sin(angle) * (12 + intensity * 18);
        const armR = Math.sin(angle + 1) * (12 + intensity * 18);
        const legKick = Math.sin(angle * 1.5) * (6 + intensity * 12);
        const headTilt = Math.sin(angle * 0.8) * (3 + intensity * 5);
        const hipSwing = Math.sin(angle * 2) * intensity * 6;
        const shoulderDip = Math.sin(angle * 1.2) * intensity * 4;
        const by = bounce + shoulderDip;

        // Breathing animation for idle
        const breathe = Math.sin(Date.now() / 1000) * 1.5;

        return `<svg viewBox="0 0 140 260" width="180" height="340" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="boyShirtGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:${colors.boyShirt}"/>
                    <stop offset="100%" style="stop-color:${colors.boyShirtAccent}"/>
                </linearGradient>
                <linearGradient id="boySkinGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:${colors.skinBoy}"/>
                    <stop offset="100%" style="stop-color:#5D4037"/>
                </linearGradient>
                <radialGradient id="boyGlow">
                    <stop offset="0%" style="stop-color:${colors.boyShirt};stop-opacity:0.3"/>
                    <stop offset="100%" style="stop-color:transparent"/>
                </radialGradient>
                <filter id="boyShadow">
                    <feDropShadow dx="0" dy="4" stdDeviation="6" flood-color="${colors.boyShirt}" flood-opacity="0.2"/>
                </filter>
            </defs>
            <g transform="translate(0, ${by})" filter="url(#boyShadow)">
                <!-- Body glow -->
                <ellipse cx="70" cy="130" rx="50" ry="60" fill="url(#boyGlow)" opacity="${0.3 + intensity * 0.4}"/>

                <!-- Shadow on ground -->
                <ellipse cx="70" cy="252" rx="${28 + Math.abs(sway)}" ry="6" fill="${colors.shadowColor}" opacity="0.5">
                    <animate attributeName="rx" values="${28};${32};${28}" dur="2s" repeatCount="indefinite"/>
                </ellipse>

                <!-- Left Leg with salsa step -->
                <g transform="rotate(${legKick}, 56, 178)">
                    <rect x="48" y="178" width="18" height="52" rx="8" fill="${colors.boyPants}" opacity="0.9"/>
                    <!-- Shoe -->
                    <path d="M44 224 Q46 234 60 236 Q70 236 70 228 L70 224 L48 224z" fill="#2C1810">
                        <animate attributeName="d" values="M44 224 Q46 234 60 236 Q70 236 70 228 L70 224 L48 224z;M42 224 Q44 236 60 238 Q72 238 72 228 L72 224 L48 224z;M44 224 Q46 234 60 236 Q70 236 70 228 L70 224 L48 224z" dur="1.5s" repeatCount="indefinite"/>
                    </path>
                </g>

                <!-- Right Leg -->
                <g transform="rotate(${-legKick}, 84, 178)">
                    <rect x="76" y="178" width="18" height="52" rx="8" fill="${colors.boyPants}" opacity="0.9"/>
                    <path d="M72 224 Q74 234 88 236 Q98 236 98 228 L98 224 L76 224z" fill="#2C1810">
                        <animate attributeName="d" values="M72 224 Q74 234 88 236 Q98 236 98 228 L98 224 L76 224z;M70 224 Q72 236 88 238 Q100 238 100 228 L100 224 L76 224z;M72 224 Q74 234 88 236 Q98 236 98 228 L98 224 L76 224z" dur="1.5s" repeatCount="indefinite"/>
                    </path>
                </g>

                <!-- Body / Shirt with breathing -->
                <g transform="rotate(${sway * 0.4 + hipSwing * 0.3}, 70, 130)">
                    <rect x="44" y="102" width="52" height="78" rx="12" fill="url(#boyShirtGrad)"/>
                    <!-- Shirt shine -->
                    <rect x="44" y="102" width="26" height="78" rx="12" fill="white" opacity="0.06"/>
                    <!-- Collar V -->
                    <path d="M56 102 L70 116 L84 102" stroke="${colors.boyTie}" stroke-width="3" fill="none" stroke-linecap="round">
                        <animate attributeName="d" values="M56 102 L70 116 L84 102;M58 102 L70 118 L82 102;M56 102 L70 116 L84 102" dur="3s" repeatCount="indefinite"/>
                    </path>
                    <!-- Tie with swing -->
                    <g transform="rotate(${sway * 0.2}, 70, 116)">
                        <polygon points="66,116 74,116 72,142 68,142" fill="${colors.boyTie}" opacity="0.9">
                            <animate attributeName="points" values="66,116 74,116 72,142 68,142;65,116 75,116 73,144 67,144;66,116 74,116 72,142 68,142" dur="2s" repeatCount="indefinite"/>
                        </polygon>
                    </g>
                    <!-- Buttons -->
                    <circle cx="70" cy="126" r="2.5" fill="#FFF" opacity="0.4">
                        <animate attributeName="opacity" values="0.4;0.7;0.4" dur="3s" repeatCount="indefinite"/>
                    </circle>
                    <circle cx="70" cy="140" r="2.5" fill="#FFF" opacity="0.4"/>
                    <circle cx="70" cy="154" r="2.5" fill="#FFF" opacity="0.4"/>
                    <!-- Pocket square -->
                    <path d="M52 108 L52 118 L60 115" fill="${colors.sparkleColor}" opacity="0.5"/>
                </g>

                <!-- Left Arm — salsa extended -->
                <g transform="rotate(${armL - intensity * 15}, 50, 108)">
                    <rect x="24" y="104" width="20" height="52" rx="9" fill="url(#boyShirtGrad)"/>
                    <!-- Sleeve cuff -->
                    <rect x="26" y="148" width="16" height="6" rx="3" fill="${colors.boyShirtAccent}" opacity="0.5"/>
                    <!-- Hand -->
                    <circle cx="34" cy="162" r="9" fill="url(#boySkinGrad)">
                        <animate attributeName="r" values="9;9.5;9" dur="2s" repeatCount="indefinite"/>
                    </circle>
                    <!-- Fingers detail -->
                    <ellipse cx="30" cy="168" rx="3" ry="4" fill="${colors.skinBoy}" opacity="0.7"/>
                    <ellipse cx="38" cy="168" rx="3" ry="4" fill="${colors.skinBoy}" opacity="0.7"/>
                </g>

                <!-- Right Arm -->
                <g transform="rotate(${armR + intensity * 10}, 90, 108)">
                    <rect x="96" y="104" width="20" height="52" rx="9" fill="url(#boyShirtGrad)"/>
                    <rect x="98" y="148" width="16" height="6" rx="3" fill="${colors.boyShirtAccent}" opacity="0.5"/>
                    <circle cx="106" cy="162" r="9" fill="url(#boySkinGrad)"/>
                    <ellipse cx="102" cy="168" rx="3" ry="4" fill="${colors.skinBoy}" opacity="0.7"/>
                    <ellipse cx="110" cy="168" rx="3" ry="4" fill="${colors.skinBoy}" opacity="0.7"/>
                </g>

                <!-- Head -->
                <g transform="rotate(${headTilt}, 70, 70)">
                    <!-- Neck -->
                    <rect x="62" y="90" width="16" height="18" rx="7" fill="url(#boySkinGrad)"/>
                    <!-- Neck shadow -->
                    <rect x="62" y="96" width="16" height="8" rx="4" fill="rgba(0,0,0,0.1)"/>

                    <!-- Face -->
                    <circle cx="70" cy="62" r="32" fill="url(#boySkinGrad)"/>
                    <!-- Face highlight -->
                    <ellipse cx="60" cy="52" rx="12" ry="10" fill="white" opacity="0.05"/>

                    <!-- Hair (styled, dark with shine) -->
                    <ellipse cx="70" cy="40" rx="34" ry="24" fill="#1A1209"/>
                    <!-- Hair texture -->
                    <ellipse cx="70" cy="38" rx="30" ry="20" fill="#2C1810"/>
                    <ellipse cx="42" cy="52" rx="10" ry="16" fill="#1A1209"/>
                    <ellipse cx="98" cy="52" rx="10" ry="16" fill="#1A1209"/>
                    <!-- Hair shine -->
                    <ellipse cx="58" cy="32" rx="12" ry="6" fill="white" opacity="0.08" transform="rotate(-15,58,32)">
                        <animate attributeName="opacity" values="0.08;0.15;0.08" dur="4s" repeatCount="indefinite"/>
                    </ellipse>

                    <!-- Eyebrows animated -->
                    <path d="M52 52 Q58 47 64 52" stroke="#1A1209" stroke-width="2.5" fill="none">
                        <animate attributeName="d" values="M52 52 Q58 47 64 52;M52 50 Q58 45 64 50;M52 52 Q58 47 64 52" dur="4s" repeatCount="indefinite"/>
                    </path>
                    <path d="M76 52 Q82 47 88 52" stroke="#1A1209" stroke-width="2.5" fill="none">
                        <animate attributeName="d" values="M76 52 Q82 47 88 52;M76 50 Q82 45 88 50;M76 52 Q82 47 88 52" dur="4s" repeatCount="indefinite"/>
                    </path>

                    <!-- Eyes with blink animation -->
                    <g>
                        <ellipse cx="58" cy="60" rx="5" ry="5.5" fill="#1A1A1A">
                            <animate attributeName="ry" values="5.5;0.5;5.5" dur="4s" repeatCount="indefinite" keyTimes="0;0.02;1"/>
                        </ellipse>
                        <ellipse cx="82" cy="60" rx="5" ry="5.5" fill="#1A1A1A">
                            <animate attributeName="ry" values="5.5;0.5;5.5" dur="4s" repeatCount="indefinite" keyTimes="0;0.02;1"/>
                        </ellipse>
                        <!-- Eye shine -->
                        <circle cx="60" cy="58" r="2" fill="#FFF" opacity="0.8"/>
                        <circle cx="84" cy="58" r="2" fill="#FFF" opacity="0.8"/>
                        <circle cx="56" cy="62" r="1" fill="#FFF" opacity="0.4"/>
                        <circle cx="80" cy="62" r="1" fill="#FFF" opacity="0.4"/>
                    </g>

                    <!-- Smile — bigger when dancing close -->
                    <path d="M56 76 Q70 ${88 + intensity * 6} 84 76" stroke="#1A1A1A" stroke-width="2.5" fill="none" stroke-linecap="round">
                        <animate attributeName="d" values="M56 76 Q70 ${86 + intensity * 6} 84 76;M56 76 Q70 ${90 + intensity * 6} 84 76;M56 76 Q70 ${86 + intensity * 6} 84 76" dur="3s" repeatCount="indefinite"/>
                    </path>
                    ${intensity > 0.5 ? '<path d="M60 76 Q70 84 80 76" fill="#FF1744" opacity="0.15"/>' : ''}

                    <!-- Blush — intensifies when close -->
                    <ellipse cx="48" cy="72" rx="7" ry="4" fill="#E57373" opacity="${0.2 + intensity * 0.3}">
                        <animate attributeName="opacity" values="${0.2 + intensity * 0.3};${0.35 + intensity * 0.3};${0.2 + intensity * 0.3}" dur="3s" repeatCount="indefinite"/>
                    </ellipse>
                    <ellipse cx="92" cy="72" rx="7" ry="4" fill="#E57373" opacity="${0.2 + intensity * 0.3}">
                        <animate attributeName="opacity" values="${0.2 + intensity * 0.3};${0.35 + intensity * 0.3};${0.2 + intensity * 0.3}" dur="3s" repeatCount="indefinite"/>
                    </ellipse>
                </g>
            </g>
        </svg>`;
    },

    generateGirlSVG(angle, bounce, colors, intensity) {
        const sway = Math.sin(angle + 0.5) * (6 + intensity * 10);
        const armL = Math.sin(angle + 0.5) * (12 + intensity * 18);
        const armR = Math.sin(angle + 1.5) * (12 + intensity * 18);
        const legKick = Math.sin(angle * 1.5 + 0.5) * (5 + intensity * 10);
        const headTilt = Math.sin(angle * 0.8 + 0.3) * (3 + intensity * 5);
        const dressWave = Math.sin(angle * 2) * (3 + intensity * 6);
        const hipSwing = Math.sin(angle * 2 + 0.5) * intensity * 5;
        const twirl = Math.sin(angle * 0.5) * intensity * 3;
        const by = bounce;

        return `<svg viewBox="0 0 150 240" width="165" height="310" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="girlDressGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:${colors.girlDress}"/>
                    <stop offset="100%" style="stop-color:${colors.girlDressAccent}"/>
                </linearGradient>
                <linearGradient id="girlDressShine" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" style="stop-color:white;stop-opacity:0"/>
                    <stop offset="50%" style="stop-color:white;stop-opacity:0.1"/>
                    <stop offset="100%" style="stop-color:white;stop-opacity:0"/>
                </linearGradient>
                <radialGradient id="girlSkinGrad">
                    <stop offset="0%" style="stop-color:#FEE8D6"/>
                    <stop offset="100%" style="stop-color:${colors.skinGirl}"/>
                </radialGradient>
                <radialGradient id="girlGlow">
                    <stop offset="0%" style="stop-color:${colors.girlDress};stop-opacity:0.25"/>
                    <stop offset="100%" style="stop-color:transparent"/>
                </radialGradient>
                <radialGradient id="curlGrad">
                    <stop offset="0%" style="stop-color:#FFF8E1"/>
                    <stop offset="100%" style="stop-color:#F5E6CA"/>
                </radialGradient>
                <filter id="girlShadow">
                    <feDropShadow dx="0" dy="4" stdDeviation="6" flood-color="${colors.girlDress}" flood-opacity="0.2"/>
                </filter>
            </defs>
            <g transform="translate(0, ${by})" filter="url(#girlShadow)">
                <!-- Body glow -->
                <ellipse cx="75" cy="120" rx="50" ry="60" fill="url(#girlGlow)" opacity="${0.3 + intensity * 0.4}"/>

                <!-- Ground shadow -->
                <ellipse cx="75" cy="234" rx="${30 + Math.abs(sway) + dressWave}" ry="6" fill="${colors.shadowColor}" opacity="0.5">
                    <animate attributeName="rx" values="${30};${36};${30}" dur="2s" repeatCount="indefinite"/>
                </ellipse>

                <!-- Left Leg -->
                <g transform="rotate(${legKick}, 62, 186)">
                    <rect x="55" y="186" width="14" height="38" rx="6" fill="url(#girlSkinGrad)"/>
                    <!-- High heel shoe -->
                    <path d="M50 218 Q52 226 64 228 Q74 226 72 218 L55 218z" fill="${colors.girlDressAccent}">
                        <animate attributeName="d" values="M50 218 Q52 226 64 228 Q74 226 72 218 L55 218z;M48 218 Q50 228 64 230 Q76 228 74 218 L55 218z;M50 218 Q52 226 64 228 Q74 226 72 218 L55 218z" dur="2s" repeatCount="indefinite"/>
                    </path>
                    <!-- Heel -->
                    <rect x="56" y="224" width="5" height="8" rx="2" fill="${colors.girlDressAccent}" transform="rotate(-5,58,228)"/>
                </g>

                <!-- Right Leg -->
                <g transform="rotate(${-legKick}, 88, 186)">
                    <rect x="81" y="186" width="14" height="38" rx="6" fill="url(#girlSkinGrad)"/>
                    <path d="M76 218 Q78 226 90 228 Q100 226 98 218 L81 218z" fill="${colors.girlDressAccent}"/>
                    <rect x="82" y="224" width="5" height="8" rx="2" fill="${colors.girlDressAccent}" transform="rotate(-5,84,228)"/>
                </g>

                <!-- Flowing Dress with salsa swirl -->
                <g transform="rotate(${sway * 0.3 + hipSwing * 0.2 + twirl}, 75, 120)">
                    <!-- Main dress -->
                    <path d="M48 106 L${32 - dressWave * 2} 198 Q75 ${204 + dressWave * 2} ${118 + dressWave * 2} 198 L102 106 Q75 100 48 106z" fill="url(#girlDressGrad)">
                        <animate attributeName="d" values="M48 106 L${32 - dressWave} 198 Q75 ${202 + dressWave} ${118 + dressWave} 198 L102 106 Q75 100 48 106z;M48 106 L${28 - dressWave * 2} 196 Q75 ${208 + dressWave * 2} ${122 + dressWave * 2} 196 L102 106 Q75 100 48 106z;M48 106 L${32 - dressWave} 198 Q75 ${202 + dressWave} ${118 + dressWave} 198 L102 106 Q75 100 48 106z" dur="2s" repeatCount="indefinite"/>
                    </path>
                    <!-- Dress shine overlay -->
                    <path d="M48 106 L${32 - dressWave} 198 Q75 ${202 + dressWave} ${118 + dressWave} 198 L102 106 Q75 100 48 106z" fill="url(#girlDressShine)"/>
                    <!-- Dress shimmer dots -->
                    <circle cx="58" cy="130" r="2.5" fill="#FFF" opacity="0.3">
                        <animate attributeName="opacity" values="0.3;0.7;0.3" dur="2s" repeatCount="indefinite"/>
                    </circle>
                    <circle cx="85" cy="140" r="2" fill="#FFF" opacity="0.25">
                        <animate attributeName="opacity" values="0.25;0.6;0.25" dur="2.5s" repeatCount="indefinite"/>
                    </circle>
                    <circle cx="68" cy="160" r="2.5" fill="#FFF" opacity="0.3">
                        <animate attributeName="opacity" values="0.3;0.65;0.3" dur="1.8s" repeatCount="indefinite"/>
                    </circle>
                    <circle cx="90" cy="175" r="1.8" fill="#FFF" opacity="0.2">
                        <animate attributeName="opacity" values="0.2;0.5;0.2" dur="3s" repeatCount="indefinite"/>
                    </circle>
                    <circle cx="52" cy="180" r="2" fill="#FFF" opacity="0.25">
                        <animate attributeName="opacity" values="0.25;0.55;0.25" dur="2.2s" repeatCount="indefinite"/>
                    </circle>
                    <!-- Waist ribbon -->
                    <ellipse cx="75" cy="114" rx="28" ry="5" fill="${colors.girlDressTrim}" opacity="0.7">
                        <animate attributeName="ry" values="5;6;5" dur="2s" repeatCount="indefinite"/>
                    </ellipse>
                    <!-- Dress bottom trim wave -->
                    <path d="M${34 - dressWave} 194 Q${50 - dressWave} ${198 + dressWave * 2} 75 194 Q${100 + dressWave} ${198 + dressWave * 2} ${116 + dressWave} 194" stroke="${colors.girlDressTrim}" stroke-width="3" fill="none" opacity="0.5">
                        <animate attributeName="d" values="M34 194 Q50 200 75 194 Q100 200 116 194;M30 192 Q48 204 75 192 Q102 204 120 192;M34 194 Q50 200 75 194 Q100 200 116 194" dur="1.5s" repeatCount="indefinite"/>
                    </path>
                </g>

                <!-- Upper body / neckline -->
                <rect x="56" y="96" width="38" height="18" rx="8" fill="url(#girlSkinGrad)"/>
                <!-- Neckline of dress -->
                <path d="M56 106 Q75 112 94 106" stroke="${colors.girlDress}" stroke-width="2" fill="${colors.girlDress}" opacity="0.4"/>

                <!-- Left Arm — salsa pose -->
                <g transform="rotate(${armL - intensity * 20}, 52, 106)">
                    <rect x="28" y="102" width="18" height="46" rx="8" fill="url(#girlSkinGrad)"/>
                    <!-- Bracelet -->
                    <ellipse cx="37" cy="142" rx="6" ry="3" fill="${colors.sparkleColor}" opacity="0.5" stroke="${colors.sparkleColor}" stroke-width="1">
                        <animate attributeName="opacity" values="0.5;0.8;0.5" dur="2s" repeatCount="indefinite"/>
                    </ellipse>
                    <circle cx="37" cy="150" r="8" fill="url(#girlSkinGrad)"/>
                    <!-- Fingers -->
                    <ellipse cx="33" cy="156" rx="3" ry="5" fill="${colors.skinGirl}" opacity="0.7"/>
                    <ellipse cx="41" cy="156" rx="3" ry="5" fill="${colors.skinGirl}" opacity="0.7"/>
                </g>

                <!-- Right Arm -->
                <g transform="rotate(${armR + intensity * 15}, 98, 106)">
                    <rect x="104" y="102" width="18" height="46" rx="8" fill="url(#girlSkinGrad)"/>
                    <ellipse cx="113" cy="142" rx="6" ry="3" fill="${colors.sparkleColor}" opacity="0.5" stroke="${colors.sparkleColor}" stroke-width="1"/>
                    <circle cx="113" cy="150" r="8" fill="url(#girlSkinGrad)"/>
                    <ellipse cx="109" cy="156" rx="3" ry="5" fill="${colors.skinGirl}" opacity="0.7"/>
                    <ellipse cx="117" cy="156" rx="3" ry="5" fill="${colors.skinGirl}" opacity="0.7"/>
                </g>

                <!-- Head -->
                <g transform="rotate(${headTilt}, 75, 58)">
                    <!-- Neck -->
                    <rect x="67" y="82" width="16" height="18" rx="7" fill="url(#girlSkinGrad)"/>

                    <!-- Face -->
                    <circle cx="75" cy="55" r="30" fill="url(#girlSkinGrad)"/>
                    <!-- Face highlight -->
                    <ellipse cx="65" cy="45" rx="10" ry="8" fill="white" opacity="0.06"/>

                    <!-- Curly Hair with animated bounce -->
                    <ellipse cx="75" cy="36" rx="36" ry="26" fill="url(#curlGrad)"/>
                    <!-- Hair curls — left -->
                    <circle cx="40" cy="32" r="11" fill="#FFF8E1" opacity="0.9">
                        <animate attributeName="r" values="11;12;11" dur="3s" repeatCount="indefinite"/>
                    </circle>
                    <circle cx="38" cy="46" r="12" fill="#F5E6CA" opacity="0.85">
                        <animate attributeName="r" values="12;13;12" dur="3.5s" repeatCount="indefinite"/>
                    </circle>
                    <circle cx="40" cy="62" r="11" fill="#FFF8E1" opacity="0.8"/>
                    <circle cx="42" cy="76" r="10" fill="#F5E6CA" opacity="0.75">
                        <animate attributeName="cy" values="76;78;76" dur="2s" repeatCount="indefinite"/>
                    </circle>
                    <!-- Hair curls — right -->
                    <circle cx="110" cy="32" r="11" fill="#FFF8E1" opacity="0.9">
                        <animate attributeName="r" values="11;12;11" dur="3s" repeatCount="indefinite"/>
                    </circle>
                    <circle cx="112" cy="46" r="12" fill="#F5E6CA" opacity="0.85"/>
                    <circle cx="110" cy="62" r="11" fill="#FFF8E1" opacity="0.8"/>
                    <circle cx="108" cy="76" r="10" fill="#F5E6CA" opacity="0.75">
                        <animate attributeName="cy" values="76;78;76" dur="2s" repeatCount="indefinite"/>
                    </circle>
                    <!-- Hair curls — top -->
                    <circle cx="52" cy="18" r="10" fill="#FFF8E1" opacity="0.9"/>
                    <circle cx="75" cy="14" r="11" fill="#F5E6CA" opacity="0.9">
                        <animate attributeName="r" values="11;12;11" dur="4s" repeatCount="indefinite"/>
                    </circle>
                    <circle cx="98" cy="18" r="10" fill="#FFF8E1" opacity="0.9"/>
                    <circle cx="63" cy="12" r="8" fill="#FFF8E1" opacity="0.85"/>
                    <circle cx="87" cy="12" r="8" fill="#FFF8E1" opacity="0.85"/>

                    <!-- Hair shine -->
                    <ellipse cx="65" cy="24" rx="8" ry="4" fill="white" opacity="0.12" transform="rotate(-10,65,24)">
                        <animate attributeName="opacity" values="0.12;0.2;0.12" dur="4s" repeatCount="indefinite"/>
                    </ellipse>

                    <!-- Bow with animation -->
                    <g transform="translate(98, 22) rotate(${15 + sway * 0.5})">
                        <ellipse cx="-10" cy="0" rx="10" ry="6" fill="${colors.girlBow}" opacity="0.9">
                            <animate attributeName="rx" values="10;11;10" dur="2s" repeatCount="indefinite"/>
                        </ellipse>
                        <ellipse cx="10" cy="0" rx="10" ry="6" fill="${colors.girlBow}" opacity="0.9">
                            <animate attributeName="rx" values="10;11;10" dur="2s" repeatCount="indefinite"/>
                        </ellipse>
                        <circle cx="0" cy="0" r="4" fill="${colors.girlDressTrim}"/>
                        <!-- Bow sparkle -->
                        <circle cx="0" cy="0" r="2" fill="white" opacity="0.4">
                            <animate attributeName="opacity" values="0.4;0.8;0.4" dur="2s" repeatCount="indefinite"/>
                        </circle>
                    </g>

                    <!-- Eyes with lashes and blink -->
                    <g>
                        <ellipse cx="64" cy="56" rx="5" ry="6" fill="#1A1A1A">
                            <animate attributeName="ry" values="6;0.5;6" dur="4.5s" repeatCount="indefinite" keyTimes="0;0.02;1"/>
                        </ellipse>
                        <ellipse cx="86" cy="56" rx="5" ry="6" fill="#1A1A1A">
                            <animate attributeName="ry" values="6;0.5;6" dur="4.5s" repeatCount="indefinite" keyTimes="0;0.02;1"/>
                        </ellipse>
                        <!-- Eye shine -->
                        <circle cx="66" cy="54" r="2.5" fill="#FFF" opacity="0.85"/>
                        <circle cx="88" cy="54" r="2.5" fill="#FFF" opacity="0.85"/>
                        <circle cx="62" cy="58" r="1" fill="#FFF" opacity="0.4"/>
                        <circle cx="84" cy="58" r="1" fill="#FFF" opacity="0.4"/>
                    </g>

                    <!-- Eyelashes animated -->
                    <path d="M59 49 L56 45" stroke="#1A1A1A" stroke-width="1.8" stroke-linecap="round"/>
                    <path d="M63 48 L62 44" stroke="#1A1A1A" stroke-width="1.8" stroke-linecap="round"/>
                    <path d="M81 49 L78 45" stroke="#1A1A1A" stroke-width="1.8" stroke-linecap="round"/>
                    <path d="M85 48 L84 44" stroke="#1A1A1A" stroke-width="1.8" stroke-linecap="round"/>
                    <path d="M90 49 L93 45" stroke="#1A1A1A" stroke-width="1.8" stroke-linecap="round"/>

                    <!-- Smile -->
                    <path d="M62 68 Q75 ${80 + intensity * 6} 88 68" stroke="#E57373" stroke-width="2.5" fill="none" stroke-linecap="round">
                        <animate attributeName="d" values="M62 68 Q75 ${78 + intensity * 6} 88 68;M62 68 Q75 ${82 + intensity * 6} 88 68;M62 68 Q75 ${78 + intensity * 6} 88 68" dur="3s" repeatCount="indefinite"/>
                    </path>
                    ${intensity > 0.5 ? '<path d="M66 68 Q75 76 84 68" fill="#FF1744" opacity="0.1"/>' : ''}

                    <!-- Blush -->
                    <ellipse cx="52" cy="66" rx="7" ry="4" fill="#FFAB91" opacity="${0.2 + intensity * 0.35}">
                        <animate attributeName="opacity" values="${0.2 + intensity * 0.35};${0.4 + intensity * 0.35};${0.2 + intensity * 0.35}" dur="3s" repeatCount="indefinite"/>
                    </ellipse>
                    <ellipse cx="98" cy="66" rx="7" ry="4" fill="#FFAB91" opacity="${0.2 + intensity * 0.35}"/>

                    <!-- Necklace with animated shimmer -->
                    <path d="M60 84 Q75 92 90 84" stroke="${colors.sparkleColor}" stroke-width="1.8" fill="none" opacity="0.5">
                        <animate attributeName="opacity" values="0.5;0.8;0.5" dur="3s" repeatCount="indefinite"/>
                    </path>
                    <circle cx="75" cy="91" r="3.5" fill="${colors.sparkleColor}" opacity="0.7">
                        <animate attributeName="r" values="3.5;4;3.5" dur="2s" repeatCount="indefinite"/>
                    </circle>
                    <!-- Gem sparkle -->
                    <circle cx="75" cy="91" r="1.5" fill="white" opacity="0.5">
                        <animate attributeName="opacity" values="0.5;1;0.5" dur="1.5s" repeatCount="indefinite"/>
                    </circle>
                </g>
            </g>
        </svg>`;
    },

    generateHeartsSVG(angle, colors, intensity) {
        if (intensity < 0.3) return '';
        const float1 = Math.sin(angle * 1.5) * 10;
        const float2 = Math.sin(angle * 1.2 + 1) * 12;
        const float3 = Math.sin(angle * 1.8 + 2) * 8;
        const scale1 = 0.7 + Math.sin(angle) * 0.3;
        const scale2 = 0.5 + Math.sin(angle + 1) * 0.25;
        const scale3 = 0.4 + Math.sin(angle + 2) * 0.2;
        const op = Math.min(1, (intensity - 0.3) / 0.7);

        return `<svg viewBox="0 0 80 140" width="80" height="140" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <filter id="heartGlow">
                    <feGaussianBlur stdDeviation="3" result="blur"/>
                    <feComposite in="SourceGraphic" in2="blur" operator="over"/>
                </filter>
            </defs>
            <g opacity="${op}" filter="url(#heartGlow)">
                <g transform="translate(40, ${55 + float1}) scale(${scale1})" opacity="0.85">
                    <path d="M0 -10 C-5 -17 -15 -17 -15 -8 C-15 0 0 10 0 10 C0 10 15 0 15 -8 C15 -17 5 -17 0 -10z" fill="${colors.heartColor}">
                        <animate attributeName="d" values="M0 -10 C-5 -17 -15 -17 -15 -8 C-15 0 0 10 0 10 C0 10 15 0 15 -8 C15 -17 5 -17 0 -10z;M0 -12 C-6 -20 -18 -20 -18 -10 C-18 0 0 12 0 12 C0 12 18 0 18 -10 C18 -20 6 -20 0 -12z;M0 -10 C-5 -17 -15 -17 -15 -8 C-15 0 0 10 0 10 C0 10 15 0 15 -8 C15 -17 5 -17 0 -10z" dur="1.5s" repeatCount="indefinite"/>
                    </path>
                </g>
                <g transform="translate(25, ${30 + float2}) scale(${scale2})" opacity="0.65">
                    <path d="M0 -8 C-4 -13 -11 -13 -11 -6 C-11 0 0 8 0 8 C0 8 11 0 11 -6 C11 -13 4 -13 0 -8z" fill="${colors.girlDress}"/>
                </g>
                <g transform="translate(55, ${80 + float3}) scale(${scale3})" opacity="0.5">
                    <path d="M0 -6 C-3 -10 -9 -10 -9 -4 C-9 0 0 6 0 6 C0 6 9 0 9 -4 C9 -10 3 -10 0 -6z" fill="${colors.sparkleColor}"/>
                </g>
                <!-- Animated sparkle stars -->
                <g transform="translate(15, ${20 + float3})" opacity="${0.4 + Math.sin(angle * 3) * 0.4}">
                    <path d="M0 -5 L1.5 -1.5 L5 0 L1.5 1.5 L0 5 L-1.5 1.5 L-5 0 L-1.5 -1.5z" fill="${colors.sparkleColor}">
                        <animateTransform attributeName="transform" type="rotate" values="0;360" dur="4s" repeatCount="indefinite"/>
                    </path>
                </g>
                <g transform="translate(60, ${100 + float1})" opacity="${0.3 + Math.sin(angle * 2.5) * 0.3}">
                    <path d="M0 -4 L1 -1 L4 0 L1 1 L0 4 L-1 1 L-4 0 L-1 -1z" fill="${colors.sparkleColor}">
                        <animateTransform attributeName="transform" type="rotate" values="0;-360" dur="5s" repeatCount="indefinite"/>
                    </path>
                </g>
                <g transform="translate(40, ${10 + float2})" opacity="${0.35 + Math.sin(angle * 2) * 0.35}">
                    <path d="M0 -3 L1 -1 L3 0 L1 1 L0 3 L-1 1 L-3 0 L-1 -1z" fill="${colors.heartColor}">
                        <animateTransform attributeName="transform" type="rotate" values="0;360" dur="3s" repeatCount="indefinite"/>
                    </path>
                </g>
            </g>
        </svg>`;
    },

    render() {
        if (!this.boyEl || !this.girlEl) return;
        const colors = this.getThemeColors();
        const angle = this.danceAngle;
        const bounce = Math.sin(angle * 2) * (2 + this.closeness * 4);
        const intensity = this.closeness;

        this.boyEl.innerHTML = this.generateBoySVG(angle, bounce, colors, intensity);
        this.girlEl.innerHTML = this.generateGirlSVG(angle + 0.3, bounce, colors, intensity);

        if (this.heartsEl) {
            this.heartsEl.innerHTML = this.generateHeartsSVG(angle, colors, intensity);
        }
    },

    updatePositions() {
        if (!this.boyEl || !this.girlEl || !this.container) return;

        const wrapper = this.container.querySelector('.couple-doll-wrapper');
        if (!wrapper) return;

        // Calculate scroll progress (0 to 1)
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        const scrollProgress = maxScroll > 0 ? Math.min(1, this.scrollY / (maxScroll * 0.5)) : 0;

        // Positions: start far apart, come to center
        // Boy starts at ~5% from left, ends at ~35%
        // Girl starts at ~75% from left, ends at ~50%
        this.targetBoyX = 5 + scrollProgress * 30;   // 5% → 35%
        this.targetGirlX = 75 - scrollProgress * 25;  // 75% → 50%

        // Smooth lerp
        this.boyX += (this.targetBoyX - this.boyX) * 0.08;
        this.girlX += (this.targetGirlX - this.girlX) * 0.08;

        // Calculate closeness (0 = apart, 1 = together)
        const distance = this.girlX - this.boyX;
        this.closeness = Math.max(0, Math.min(1, 1 - (distance - 15) / 55));

        // Apply positions
        this.boyEl.style.position = 'absolute';
        this.boyEl.style.left = this.boyX + '%';
        this.boyEl.style.bottom = '10px';

        this.girlEl.style.position = 'absolute';
        this.girlEl.style.left = this.girlX + '%';
        this.girlEl.style.bottom = '10px';

        // Hearts between them
        if (this.heartsEl) {
            this.heartsEl.style.position = 'absolute';
            this.heartsEl.style.left = ((this.boyX + this.girlX) / 2 + 5) + '%';
            this.heartsEl.style.bottom = '150px';
        }

        // Floor glow
        if (this.floorEl) {
            this.floorEl.style.left = ((this.boyX + this.girlX) / 2 + 8) + '%';
            this.floorEl.style.transform = 'translateX(-50%)';
        }

        // Toggle close-together class for CSS effects
        if (this.closeness > 0.5) {
            this.container.classList.add('close-together');
        } else {
            this.container.classList.remove('close-together');
        }

        // Opacity: higher when dancing
        const baseOpacity = 0.4 + this.closeness * 0.4;
        this.container.style.opacity = baseOpacity;
    },

    bindScroll() {
        const self = this;
        window.addEventListener('scroll', function() {
            self.scrollY = window.scrollY || window.pageYOffset;
            self.scrollDelta = Math.abs(self.scrollY - self.lastScrollY);
            self.lastScrollY = self.scrollY;
            self.isScrolling = true;
            self.danceSpeed = Math.min(self.scrollDelta * 0.06, 0.4);
            clearTimeout(self.scrollTimer);
            self.scrollTimer = setTimeout(function() {
                self.isScrolling = false;
            }, 150);
        }, { passive: true });
    },

    startAnimationLoop() {
        const self = this;
        let lastTime = performance.now();

        function loop(now) {
            const dt = (now - lastTime) / 1000;
            lastTime = now;

            if (!self.isScrolling) {
                self.danceSpeed *= 0.93;
                if (self.danceSpeed < 0.003) self.danceSpeed = 0;
            }

            // Always update positions for scroll-based movement
            self.updatePositions();

            // Minimum dance speed when close (idle sway)
            const minDance = self.closeness * 0.015;
            const effectiveSpeed = Math.max(self.danceSpeed, minDance);

            if (effectiveSpeed > 0.002) {
                self.danceAngle += effectiveSpeed;
                self.render();
            }

            // Spawn sparkles when dancing close and scrolling
            if (self.closeness > 0.6 && self.danceSpeed > 0.05 && Math.random() < 0.15) {
                self.spawnDanceSparkle();
            }

            self.animFrameId = requestAnimationFrame(loop);
        }

        self.animFrameId = requestAnimationFrame(loop);
    },

    spawnDanceSparkle() {
        if (!this.container) return;
        const sparkle = document.createElement('div');
        sparkle.className = 'dance-sparkle';
        const colors = this.getThemeColors();
        const colorList = [colors.heartColor, colors.sparkleColor, colors.girlDress, '#FFD700'];
        const color = colorList[Math.floor(Math.random() * colorList.length)];
        const size = Math.random() * 10 + 8;

        sparkle.innerHTML = `<svg viewBox="0 0 20 20" width="${size}" height="${size}"><path d="M10 0 L12 8 L20 10 L12 12 L10 20 L8 12 L0 10 L8 8z" fill="${color}" opacity="0.8"><animateTransform attributeName="transform" type="rotate" values="0 10 10;360 10 10" dur="1s" repeatCount="1"/></path></svg>`;

        const centerX = (this.boyX + this.girlX) / 2;
        sparkle.style.position = 'absolute';
        sparkle.style.left = (centerX + Math.random() * 20 - 10) + '%';
        sparkle.style.bottom = (80 + Math.random() * 150) + 'px';
        sparkle.style.setProperty('--tx', (Math.random() - 0.5) * 60 + 'px');
        sparkle.style.setProperty('--ty', -(Math.random() * 50 + 20) + 'px');

        this.container.appendChild(sparkle);
        setTimeout(() => sparkle.remove(), 1500);
    },

    updateTheme() { this.render(); },

    destroy() {
        if (this.animFrameId) cancelAnimationFrame(this.animFrameId);
        if (this.container && this.container.parentNode) {
            this.container.parentNode.removeChild(this.container);
        }
        this.initialized = false;
    }
};
