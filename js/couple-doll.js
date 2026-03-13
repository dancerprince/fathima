// ========================================
// CUTE COUPLE DOLL — SVG Animated Characters
// Black boy + White girl with curly hair, dancing
// Dress colors match current website theme
// Only moves/dances on scroll
// ========================================

const CoupleDoll = {
    container: null,
    boy: null,
    girl: null,
    scrollY: 0,
    lastScrollY: 0,
    scrollDelta: 0,
    isScrolling: false,
    scrollTimer: null,
    danceAngle: 0,
    danceSpeed: 0,
    animFrameId: null,
    initialized: false,

    init() {
        if (this.initialized) return;
        this.createContainer();
        this.render();
        this.bindScroll();
        this.startAnimationLoop();
        this.initialized = true;
        console.log('💃🕺 Couple Doll initialized — scroll to make them dance!');
    },

    createContainer() {
        this.container = document.createElement('div');
        this.container.id = 'couple-doll-layer';
        this.container.setAttribute('aria-hidden', 'true');

        // Insert before main-screen content but inside body
        const mainScreen = document.getElementById('main-screen');
        if (mainScreen) {
            mainScreen.insertBefore(this.container, mainScreen.firstChild);
        } else {
            document.body.appendChild(this.container);
        }
    },

    getThemeColors() {
        const t = (typeof currentTheme !== 'undefined' && currentTheme) ? currentTheme : null;
        return {
            boyShirt: t ? t.primary : '#FFB6C1',
            boyPants: t ? t.accentDeep : '#5C2434',
            boyShirtAccent: t ? t.secondary : '#DDA0DD',
            girlDress: t ? t.primary : '#FFB6C1',
            girlDressAccent: t ? t.secondary : '#DDA0DD',
            girlDressTrim: t ? t.accent : '#FF69B4',
            girlBow: t ? t.accent : '#FF69B4',
            boyTie: t ? t.accent : '#FF69B4',
            heartColor: t ? t.accent : '#FF69B4',
            sparkleColor: t ? t.gold : '#FFD700',
            shadowColor: t ? t.primaryLight : '#FFD1DC'
        };
    },

    generateBoySVG(angle, bounce, colors) {
        const sway = Math.sin(angle) * 8;
        const armL = Math.sin(angle) * 15;
        const armR = Math.sin(angle + 1) * 15;
        const legKick = Math.sin(angle * 1.5) * 8;
        const headTilt = Math.sin(angle * 0.8) * 4;
        const by = bounce;

        return `<svg viewBox="0 0 120 200" width="120" height="200" xmlns="http://www.w3.org/2000/svg">
            <g transform="translate(0, ${by})">
                <!-- Shadow -->
                <ellipse cx="60" cy="195" rx="25" ry="5" fill="${colors.shadowColor}" opacity="0.4"/>

                <!-- Left Leg -->
                <g transform="rotate(${legKick}, 48, 140)">
                    <rect x="42" y="140" width="14" height="40" rx="6" fill="${colors.boyPants}" opacity="0.9"/>
                    <rect x="40" y="174" width="18" height="10" rx="4" fill="#3E2723"/>
                </g>

                <!-- Right Leg -->
                <g transform="rotate(${-legKick}, 70, 140)">
                    <rect x="64" y="140" width="14" height="40" rx="6" fill="${colors.boyPants}" opacity="0.9"/>
                    <rect x="62" y="174" width="18" height="10" rx="4" fill="#3E2723"/>
                </g>

                <!-- Body / Shirt -->
                <g transform="rotate(${sway * 0.3}, 60, 100)">
                    <rect x="38" y="82" width="44" height="60" rx="10" fill="${colors.boyShirt}"/>
                    <rect x="38" y="82" width="44" height="60" rx="10" fill="${colors.boyShirtAccent}" opacity="0.3"/>
                    <!-- Collar detail -->
                    <path d="M50 82 L60 92 L70 82" stroke="${colors.boyTie}" stroke-width="3" fill="none"/>
                    <!-- Tie -->
                    <polygon points="57,92 63,92 61,110 59,110" fill="${colors.boyTie}" opacity="0.9"/>
                    <!-- Buttons -->
                    <circle cx="60" cy="100" r="2" fill="#FFF" opacity="0.5"/>
                    <circle cx="60" cy="112" r="2" fill="#FFF" opacity="0.5"/>
                    <circle cx="60" cy="124" r="2" fill="#FFF" opacity="0.5"/>
                </g>

                <!-- Left Arm -->
                <g transform="rotate(${armL}, 42, 88)">
                    <rect x="22" y="85" width="16" height="42" rx="7" fill="${colors.boyShirt}"/>
                    <circle cx="30" cy="128" r="7" fill="#6D4C41"/>
                </g>

                <!-- Right Arm -->
                <g transform="rotate(${armR}, 78, 88)">
                    <rect x="82" y="85" width="16" height="42" rx="7" fill="${colors.boyShirt}"/>
                    <circle cx="90" cy="128" r="7" fill="#6D4C41"/>
                </g>

                <!-- Head -->
                <g transform="rotate(${headTilt}, 60, 55)">
                    <!-- Neck -->
                    <rect x="54" y="72" width="12" height="14" rx="5" fill="#6D4C41"/>
                    <!-- Face -->
                    <circle cx="60" cy="52" r="26" fill="#6D4C41"/>
                    <!-- Hair (short, dark) -->
                    <ellipse cx="60" cy="35" rx="27" ry="18" fill="#2C1810"/>
                    <ellipse cx="38" cy="45" rx="8" ry="12" fill="#2C1810"/>
                    <ellipse cx="82" cy="45" rx="8" ry="12" fill="#2C1810"/>
                    <!-- Eyes -->
                    <ellipse cx="50" cy="52" rx="4" ry="4.5" fill="#1A1A1A"/>
                    <ellipse cx="70" cy="52" rx="4" ry="4.5" fill="#1A1A1A"/>
                    <ellipse cx="51" cy="51" rx="1.5" ry="1.5" fill="#FFF"/>
                    <ellipse cx="71" cy="51" rx="1.5" ry="1.5" fill="#FFF"/>
                    <!-- Smile -->
                    <path d="M50 62 Q60 72 70 62" stroke="#1A1A1A" stroke-width="2.5" fill="none" stroke-linecap="round"/>
                    <!-- Blush -->
                    <ellipse cx="43" cy="60" rx="5" ry="3" fill="#E57373" opacity="0.35"/>
                    <ellipse cx="77" cy="60" rx="5" ry="3" fill="#E57373" opacity="0.35"/>
                    <!-- Eyebrows -->
                    <path d="M45 44 Q50 40 55 44" stroke="#1A1A1A" stroke-width="2" fill="none"/>
                    <path d="M65 44 Q70 40 75 44" stroke="#1A1A1A" stroke-width="2" fill="none"/>
                </g>
            </g>
        </svg>`;
    },

    generateGirlSVG(angle, bounce, colors) {
        const sway = Math.sin(angle + 0.5) * 8;
        const armL = Math.sin(angle + 0.5) * 15;
        const armR = Math.sin(angle + 1.5) * 15;
        const legKick = Math.sin(angle * 1.5 + 0.5) * 6;
        const headTilt = Math.sin(angle * 0.8 + 0.3) * 4;
        const dressWave = Math.sin(angle * 2) * 3;
        const by = bounce;

        return `<svg viewBox="0 0 130 210" width="130" height="210" xmlns="http://www.w3.org/2000/svg">
            <g transform="translate(0, ${by})">
                <!-- Shadow -->
                <ellipse cx="65" cy="205" rx="30" ry="5" fill="${colors.shadowColor}" opacity="0.4"/>

                <!-- Left Leg -->
                <g transform="rotate(${legKick}, 52, 155)">
                    <rect x="46" y="155" width="12" height="35" rx="5" fill="#FDDCCC"/>
                    <rect x="43" y="184" width="18" height="10" rx="5" fill="${colors.girlDressAccent}"/>
                </g>

                <!-- Right Leg -->
                <g transform="rotate(${-legKick}, 78, 155)">
                    <rect x="72" y="155" width="12" height="35" rx="5" fill="#FDDCCC"/>
                    <rect x="69" y="184" width="18" height="10" rx="5" fill="${colors.girlDressAccent}"/>
                </g>

                <!-- Dress -->
                <g transform="rotate(${sway * 0.3}, 65, 100)">
                    <!-- Main dress body -->
                    <path d="M42 90 L35 165 Q65 ${170 + dressWave} 95 165 L88 90 Q65 85 42 90z" fill="${colors.girlDress}"/>
                    <!-- Dress overlay shimmer -->
                    <path d="M42 90 L35 165 Q65 ${170 + dressWave} 95 165 L88 90 Q65 85 42 90z" fill="${colors.girlDressAccent}" opacity="0.25"/>
                    <!-- Dress waist ribbon -->
                    <ellipse cx="65" cy="98" rx="24" ry="4" fill="${colors.girlDressTrim}" opacity="0.8"/>
                    <!-- Dress bottom trim -->
                    <path d="M35 160 Q50 ${165 + dressWave} 65 160 Q80 ${165 + dressWave} 95 160" stroke="${colors.girlDressTrim}" stroke-width="3" fill="none" opacity="0.6"/>
                    <!-- Dress sparkle dots -->
                    <circle cx="50" cy="115" r="2" fill="#FFF" opacity="0.5"/>
                    <circle cx="72" cy="120" r="1.8" fill="#FFF" opacity="0.4"/>
                    <circle cx="58" cy="135" r="2" fill="#FFF" opacity="0.5"/>
                    <circle cx="78" cy="145" r="1.5" fill="#FFF" opacity="0.4"/>
                    <circle cx="45" cy="148" r="1.8" fill="#FFF" opacity="0.3"/>
                </g>

                <!-- Upper body / neckline -->
                <rect x="48" y="80" width="34" height="18" rx="8" fill="#FDDCCC"/>
                <path d="M50 90 Q65 95 80 90" stroke="${colors.girlDress}" stroke-width="2" fill="${colors.girlDress}" opacity="0.5"/>

                <!-- Left Arm -->
                <g transform="rotate(${armL}, 45, 88)">
                    <rect x="26" y="85" width="14" height="38" rx="6" fill="#FDDCCC"/>
                    <circle cx="33" cy="124" r="6" fill="#FDDCCC"/>
                </g>

                <!-- Right Arm -->
                <g transform="rotate(${armR}, 85, 88)">
                    <rect x="90" y="85" width="14" height="38" rx="6" fill="#FDDCCC"/>
                    <circle cx="97" cy="124" r="6" fill="#FDDCCC"/>
                </g>

                <!-- Head -->
                <g transform="rotate(${headTilt}, 65, 55)">
                    <!-- Neck -->
                    <rect x="58" y="70" width="14" height="14" rx="6" fill="#FDDCCC"/>
                    <!-- Face -->
                    <circle cx="65" cy="48" r="26" fill="#FDDCCC"/>
                    <!-- Curly Hair (white/blonde curly) -->
                    <defs>
                        <radialGradient id="curlGrad">
                            <stop offset="0%" style="stop-color:#FFF8E1"/>
                            <stop offset="100%" style="stop-color:#F5E6CA"/>
                        </radialGradient>
                    </defs>
                    <!-- Hair base -->
                    <ellipse cx="65" cy="32" rx="30" ry="22" fill="url(#curlGrad)"/>
                    <!-- Curls - left side -->
                    <circle cx="36" cy="30" r="9" fill="#FFF8E1" opacity="0.9"/>
                    <circle cx="34" cy="42" r="10" fill="#F5E6CA" opacity="0.85"/>
                    <circle cx="36" cy="55" r="9" fill="#FFF8E1" opacity="0.8"/>
                    <circle cx="38" cy="66" r="8" fill="#F5E6CA" opacity="0.75"/>
                    <!-- Curls - right side -->
                    <circle cx="94" cy="30" r="9" fill="#FFF8E1" opacity="0.9"/>
                    <circle cx="96" cy="42" r="10" fill="#F5E6CA" opacity="0.85"/>
                    <circle cx="94" cy="55" r="9" fill="#FFF8E1" opacity="0.8"/>
                    <circle cx="92" cy="66" r="8" fill="#F5E6CA" opacity="0.75"/>
                    <!-- Curls - top -->
                    <circle cx="45" cy="18" r="8" fill="#FFF8E1" opacity="0.9"/>
                    <circle cx="65" cy="14" r="9" fill="#F5E6CA" opacity="0.9"/>
                    <circle cx="85" cy="18" r="8" fill="#FFF8E1" opacity="0.9"/>
                    <circle cx="55" cy="12" r="7" fill="#FFF8E1" opacity="0.85"/>
                    <circle cx="75" cy="12" r="7" fill="#FFF8E1" opacity="0.85"/>
                    <!-- Bow on hair -->
                    <g transform="translate(82, 20) rotate(15)">
                        <ellipse cx="-8" cy="0" rx="8" ry="5" fill="${colors.girlBow}" opacity="0.9"/>
                        <ellipse cx="8" cy="0" rx="8" ry="5" fill="${colors.girlBow}" opacity="0.9"/>
                        <circle cx="0" cy="0" r="3" fill="${colors.girlDressTrim}"/>
                    </g>
                    <!-- Eyes -->
                    <ellipse cx="55" cy="50" rx="4" ry="5" fill="#1A1A1A"/>
                    <ellipse cx="75" cy="50" rx="4" ry="5" fill="#1A1A1A"/>
                    <ellipse cx="56" cy="49" rx="1.5" ry="1.5" fill="#FFF"/>
                    <ellipse cx="76" cy="49" rx="1.5" ry="1.5" fill="#FFF"/>
                    <!-- Eyelashes -->
                    <path d="M51 45 L48 42" stroke="#1A1A1A" stroke-width="1.5" stroke-linecap="round"/>
                    <path d="M54 44 L53 41" stroke="#1A1A1A" stroke-width="1.5" stroke-linecap="round"/>
                    <path d="M71 45 L68 42" stroke="#1A1A1A" stroke-width="1.5" stroke-linecap="round"/>
                    <path d="M74 44 L73 41" stroke="#1A1A1A" stroke-width="1.5" stroke-linecap="round"/>
                    <path d="M79 45 L82 42" stroke="#1A1A1A" stroke-width="1.5" stroke-linecap="round"/>
                    <!-- Smile -->
                    <path d="M54 60 Q65 70 76 60" stroke="#E57373" stroke-width="2.5" fill="none" stroke-linecap="round"/>
                    <!-- Blush -->
                    <ellipse cx="46" cy="58" rx="5" ry="3" fill="#FFAB91" opacity="0.4"/>
                    <ellipse cx="84" cy="58" rx="5" ry="3" fill="#FFAB91" opacity="0.4"/>
                    <!-- Tiny necklace -->
                    <path d="M52 72 Q65 78 78 72" stroke="${colors.sparkleColor}" stroke-width="1.5" fill="none" opacity="0.6"/>
                    <circle cx="65" cy="77" r="2.5" fill="${colors.sparkleColor}" opacity="0.7"/>
                </g>
            </g>
        </svg>`;
    },

    generateHeartsBetween(angle, colors) {
        const float1 = Math.sin(angle * 1.5) * 8;
        const float2 = Math.sin(angle * 1.2 + 1) * 10;
        const float3 = Math.sin(angle * 1.8 + 2) * 6;
        const scale1 = 0.8 + Math.sin(angle) * 0.2;
        const scale2 = 0.6 + Math.sin(angle + 1) * 0.2;
        const scale3 = 0.5 + Math.sin(angle + 2) * 0.15;

        return `<svg viewBox="0 0 60 120" width="60" height="120" xmlns="http://www.w3.org/2000/svg">
            <!-- Floating hearts between the couple -->
            <g transform="translate(30, ${50 + float1}) scale(${scale1})" opacity="0.8">
                <path d="M0 -8 C-4 -14 -12 -14 -12 -6 C-12 0 0 8 0 8 C0 8 12 0 12 -6 C12 -14 4 -14 0 -8z" fill="${colors.heartColor}"/>
            </g>
            <g transform="translate(20, ${30 + float2}) scale(${scale2})" opacity="0.6">
                <path d="M0 -6 C-3 -10 -9 -10 -9 -5 C-9 0 0 6 0 6 C0 6 9 0 9 -5 C9 -10 3 -10 0 -6z" fill="${colors.girlDress}"/>
            </g>
            <g transform="translate(40, ${70 + float3}) scale(${scale3})" opacity="0.5">
                <path d="M0 -5 C-2 -8 -7 -8 -7 -4 C-7 0 0 5 0 5 C0 5 7 0 7 -4 C7 -8 2 -8 0 -5z" fill="${colors.sparkleColor}"/>
            </g>
            <!-- Sparkles -->
            <g transform="translate(15, ${20 + float3})" opacity="${0.4 + Math.sin(angle * 3) * 0.3}">
                <path d="M0 -4 L1 -1 L4 0 L1 1 L0 4 L-1 1 L-4 0 L-1 -1z" fill="${colors.sparkleColor}"/>
            </g>
            <g transform="translate(45, ${90 + float1})" opacity="${0.3 + Math.sin(angle * 2.5 + 1) * 0.3}">
                <path d="M0 -3 L1 -1 L3 0 L1 1 L0 3 L-1 1 L-3 0 L-1 -1z" fill="${colors.sparkleColor}"/>
            </g>
        </svg>`;
    },

    render() {
        if (!this.container) return;
        const colors = this.getThemeColors();
        const angle = this.danceAngle;
        const bounce = Math.sin(angle * 2) * 3;

        this.container.innerHTML = `
            <div class="couple-doll-wrapper">
                <div class="couple-boy">${this.generateBoySVG(angle, bounce, colors)}</div>
                <div class="couple-hearts">${this.generateHeartsBetween(angle, colors)}</div>
                <div class="couple-girl">${this.generateGirlSVG(angle + 0.3, bounce, colors)}</div>
            </div>
        `;
    },

    bindScroll() {
        const self = this;
        window.addEventListener('scroll', function() {
            self.scrollY = window.scrollY || window.pageYOffset;
            self.scrollDelta = Math.abs(self.scrollY - self.lastScrollY);
            self.lastScrollY = self.scrollY;
            self.isScrolling = true;

            // Increase dance speed based on scroll velocity
            self.danceSpeed = Math.min(self.scrollDelta * 0.08, 0.5);

            // Reset scroll timer
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

            // Decay dance speed when not scrolling
            if (!self.isScrolling) {
                self.danceSpeed *= 0.92;
                if (self.danceSpeed < 0.005) self.danceSpeed = 0;
            }

            // Only update visuals if dancing (save CPU)
            if (self.danceSpeed > 0.003) {
                self.danceAngle += self.danceSpeed;
                self.render();
            }

            // Parallax position: couple moves with scroll
            if (self.container) {
                const scrollFactor = self.scrollY * 0.15;
                self.container.style.transform = `translateY(${scrollFactor}px)`;
            }

            self.animFrameId = requestAnimationFrame(loop);
        }

        self.animFrameId = requestAnimationFrame(loop);
    },

    // Called when theme changes — re-render with new colors
    updateTheme() {
        this.render();
    },

    destroy() {
        if (this.animFrameId) cancelAnimationFrame(this.animFrameId);
        if (this.container && this.container.parentNode) {
            this.container.parentNode.removeChild(this.container);
        }
        this.initialized = false;
    }
};
