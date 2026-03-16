const CoupleDoll = {
    container: null, boyEl: null, girlEl: null, heartsEl: null, floorEl: null, labelEl: null,
    scrollY: 0, lastScrollY: 0, scrollDelta: 0, isScrolling: false, scrollTimer: null,
    danceAngle: 0, danceSpeed: 0, animFrameId: null, initialized: false,
    closeness: 0, boyX: 2, girlX: 78, targetBoyX: 2, targetGirlX: 78,
    phase: 'approach', // approach | dancing
    currentStep: 0, stepTimer: 0, scrollCount: 0, lastStepScroll: 0,

    salsaSteps: [
        { name: '💃 Basic Step', duration: 80, armLMul: 1, armRMul: 1, legMul: 1, hipMul: 1, spinGirl: 0 },
        { name: '🔥 Cross Body Lead', duration: 90, armLMul: 1.5, armRMul: 0.5, legMul: 1.2, hipMul: 1.5, spinGirl: 0 },
        { name: '🌀 Inside Turn', duration: 70, armLMul: 2, armRMul: 0.3, legMul: 0.8, hipMul: 1, spinGirl: 1 },
        { name: '✨ Copa', duration: 85, armLMul: 1.8, armRMul: 1.8, legMul: 1.5, hipMul: 2, spinGirl: 0 },
        { name: '💫 Outside Turn', duration: 70, armLMul: 0.3, armRMul: 2, legMul: 0.8, hipMul: 1, spinGirl: -1 },
        { name: '🌟 Enchufla', duration: 75, armLMul: 1.3, armRMul: 1.3, legMul: 1.8, hipMul: 1.5, spinGirl: 0.5 },
        { name: '❤️ Dile Que No', duration: 80, armLMul: 1, armRMul: 1.5, legMul: 1.3, hipMul: 1.8, spinGirl: 0 },
        { name: '🔥 Setenta', duration: 95, armLMul: 2, armRMul: 2, legMul: 1, hipMul: 1.2, spinGirl: 1.5 },
        { name: '💃 Cubanito', duration: 85, armLMul: 1.2, armRMul: 1.2, legMul: 2, hipMul: 2, spinGirl: 0 },
        { name: '🌀 Double Spin', duration: 65, armLMul: 1.5, armRMul: 1.5, legMul: 0.5, hipMul: 0.8, spinGirl: 2 },
    ],

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
        this.container.innerHTML = '<div class="couple-doll-wrapper">' +
            '<div class="couple-boy"></div>' +
            '<div class="couple-hearts-container"></div>' +
            '<div class="couple-girl"></div>' +
            '</div>' +
            '<div class="salsa-floor"></div>' +
            '<div class="dance-step-label"></div>' +
            '<div class="stage-spotlight stage-spotlight-left"></div>' +
            '<div class="stage-spotlight stage-spotlight-center"></div>' +
            '<div class="stage-spotlight stage-spotlight-right"></div>';

        var mainScreen = document.getElementById('main-screen');
        if (mainScreen) mainScreen.insertBefore(this.container, mainScreen.firstChild);
        else document.body.appendChild(this.container);

        this.boyEl = this.container.querySelector('.couple-boy');
        this.girlEl = this.container.querySelector('.couple-girl');
        this.heartsEl = this.container.querySelector('.couple-hearts-container');
        this.floorEl = this.container.querySelector('.salsa-floor');
        this.labelEl = this.container.querySelector('.dance-step-label');
    },

    c() {
        var t = (typeof currentTheme !== 'undefined' && currentTheme) ? currentTheme : null;
        return {
            bs: t ? t.primary : '#E91E63', bp: t ? t.accentDeep : '#5C2434',
            bsa: t ? t.secondary : '#9C27B0', gd: t ? t.primary : '#E91E63',
            gda: t ? t.secondary : '#9C27B0', gdt: t ? t.accent : '#FF4081',
            gb: t ? t.accent : '#FF4081', bt: t ? t.accent : '#FF4081',
            hc: t ? t.accent : '#FF4081', sc: t ? t.gold : '#FFD700',
            sh: 'rgba(233,30,99,0.15)', sb: '#8D5524', sg: '#FDDCCC'
        };
    },

    boy(a, b, col, int, step) {
        var sw = Math.sin(a) * (6 + int * 12) * (step ? step.hipMul : 1);
        var aL = Math.sin(a) * (14 + int * 20) * (step ? step.armLMul : 1);
        var aR = Math.sin(a + 1) * (14 + int * 20) * (step ? step.armRMul : 1);
        var lk = Math.sin(a * 1.5) * (6 + int * 14) * (step ? step.legMul : 1);
        var ht = Math.sin(a * 0.8) * (3 + int * 6);
        var hip = Math.sin(a * 2) * int * 7 * (step ? step.hipMul : 1);
        var sd = Math.sin(a * 1.2) * int * 4;
        var by = b + sd;
        var br = Math.sin(Date.now() / 1000) * 1.5;

        return '<svg viewBox="0 0 140 260" width="180" height="340" xmlns="http://www.w3.org/2000/svg">' +
            '<defs>' +
            '<linearGradient id="bSG" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="' + col.bs + '"/><stop offset="100%" stop-color="' + col.bsa + '"/></linearGradient>' +
            '<linearGradient id="bSK" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="' + col.sb + '"/><stop offset="100%" stop-color="#6D4C41"/></linearGradient>' +
            '<radialGradient id="bGL"><stop offset="0%" stop-color="' + col.bs + '" stop-opacity="0.3"/><stop offset="100%" stop-color="transparent"/></radialGradient>' +
            '<filter id="bS"><feDropShadow dx="0" dy="4" stdDeviation="6" flood-color="' + col.bs + '" flood-opacity="0.2"/></filter>' +
            '<radialGradient id="b3d" cx="35%" cy="30%"><stop offset="0%" stop-color="white" stop-opacity="0.15"/><stop offset="100%" stop-color="transparent"/></radialGradient>' +
            '</defs>' +
            '<g transform="translate(0,' + by + ')" filter="url(#bS)">' +
            // Ground shadow
            '<ellipse cx="70" cy="252" rx="' + (28 + Math.abs(sw)) + '" ry="6" fill="' + col.sh + '" opacity="0.5"/>' +
            // Left leg
            '<g transform="rotate(' + lk + ',56,178)">' +
            '<rect x="48" y="178" width="18" height="52" rx="8" fill="' + col.bp + '"/>' +
            '<rect x="48" y="178" width="9" height="52" rx="4" fill="white" opacity="0.04"/>' +
            '<path d="M44 224Q46 236 60 238Q72 236 70 224L48 224z" fill="#1A1209">' +
            '<animate attributeName="d" values="M44 224Q46 236 60 238Q72 236 70 224L48 224z;M42 224Q44 238 60 240Q74 238 72 224L48 224z;M44 224Q46 236 60 238Q72 236 70 224L48 224z" dur="1.5s" repeatCount="indefinite"/>' +
            '</path></g>' +
            // Right leg
            '<g transform="rotate(' + (-lk) + ',84,178)">' +
            '<rect x="76" y="178" width="18" height="52" rx="8" fill="' + col.bp + '"/>' +
            '<rect x="76" y="178" width="9" height="52" rx="4" fill="white" opacity="0.04"/>' +
            '<path d="M72 224Q74 236 88 238Q100 236 98 224L76 224z" fill="#1A1209"/>' +
            '</g>' +
            // Body
            '<g transform="rotate(' + (sw * 0.4 + hip * 0.3) + ',70,130)">' +
            '<rect x="44" y="102" width="52" height="78" rx="12" fill="url(#bSG)"/>' +
            '<rect x="44" y="102" width="52" height="78" rx="12" fill="url(#b3d)"/>' +
            '<path d="M56 102L70 118L84 102" stroke="' + col.bt + '" stroke-width="3" fill="none" stroke-linecap="round"/>' +
            '<g transform="rotate(' + (sw * 0.2) + ',70,116)"><polygon points="66,116 74,116 72,144 68,144" fill="' + col.bt + '" opacity="0.9">' +
            '<animate attributeName="points" values="66,116 74,116 72,144 68,144;65,116 75,116 73,146 67,146;66,116 74,116 72,144 68,144" dur="2s" repeatCount="indefinite"/>' +
            '</polygon></g>' +
            '<circle cx="70" cy="128" r="2.5" fill="#FFF" opacity="0.4"/>' +
            '<circle cx="70" cy="140" r="2.5" fill="#FFF" opacity="0.4"/>' +
            '<circle cx="70" cy="152" r="2.5" fill="#FFF" opacity="0.4"/>' +
            '<path d="M52 108L52 118L60 115" fill="' + col.sc + '" opacity="0.5"/>' +
            '</g>' +
            // Left arm
            '<g transform="rotate(' + (aL - int * 15) + ',50,108)">' +
            '<rect x="22" y="104" width="22" height="52" rx="10" fill="url(#bSG)"/>' +
            '<rect x="22" y="104" width="11" height="52" rx="5" fill="url(#b3d)"/>' +
            '<circle cx="34" cy="162" r="10" fill="url(#bSK)"/>' +
            '<ellipse cx="30" cy="169" rx="3.5" ry="5" fill="' + col.sb + '" opacity="0.7"/>' +
            '<ellipse cx="38" cy="169" rx="3.5" ry="5" fill="' + col.sb + '" opacity="0.7"/>' +
            '</g>' +
            // Right arm
            '<g transform="rotate(' + (aR + int * 10) + ',90,108)">' +
            '<rect x="96" y="104" width="22" height="52" rx="10" fill="url(#bSG)"/>' +
            '<rect x="96" y="104" width="11" height="52" rx="5" fill="url(#b3d)"/>' +
            '<circle cx="108" cy="162" r="10" fill="url(#bSK)"/>' +
            '<ellipse cx="104" cy="169" rx="3.5" ry="5" fill="' + col.sb + '" opacity="0.7"/>' +
            '<ellipse cx="112" cy="169" rx="3.5" ry="5" fill="' + col.sb + '" opacity="0.7"/>' +
            '</g>' +
            // Head
            '<g transform="rotate(' + ht + ',70,70)">' +
            '<rect x="62" y="90" width="16" height="18" rx="7" fill="url(#bSK)"/>' +
            '<rect x="62" y="96" width="16" height="8" rx="4" fill="rgba(0,0,0,0.08)"/>' +
            // Face - 3D sphere effect
            '<circle cx="70" cy="62" r="33" fill="url(#bSK)"/>' +
            '<circle cx="70" cy="62" r="33" fill="url(#b3d)"/>' +
            '<ellipse cx="60" cy="50" rx="14" ry="10" fill="white" opacity="0.07"/>' +
            // Hair with 3D volume
            '<ellipse cx="70" cy="40" rx="36" ry="26" fill="#0D0906"/>' +
            '<ellipse cx="70" cy="38" rx="32" ry="22" fill="#1A1209"/>' +
            '<ellipse cx="70" cy="36" rx="28" ry="18" fill="#241A0F" opacity="0.5"/>' +
            '<ellipse cx="42" cy="52" rx="11" ry="17" fill="#0D0906"/>' +
            '<ellipse cx="98" cy="52" rx="11" ry="17" fill="#0D0906"/>' +
            '<ellipse cx="58" cy="32" rx="13" ry="6" fill="white" opacity="0.1" transform="rotate(-15,58,32)">' +
            '<animate attributeName="opacity" values="0.1;0.18;0.1" dur="4s" repeatCount="indefinite"/></ellipse>' +
            // Eyebrows
            '<path d="M52 52Q58 46 64 52" stroke="#0D0906" stroke-width="2.8" fill="none">' +
            '<animate attributeName="d" values="M52 52Q58 46 64 52;M52 50Q58 44 64 50;M52 52Q58 46 64 52" dur="4s" repeatCount="indefinite"/></path>' +
            '<path d="M76 52Q82 46 88 52" stroke="#0D0906" stroke-width="2.8" fill="none"/>' +
            // Eyes with 3D depth + blink
            '<ellipse cx="58" cy="60" rx="5.5" ry="6" fill="#1A1A1A">' +
            '<animate attributeName="ry" values="6;0.5;6" dur="4s" repeatCount="indefinite" keyTimes="0;0.025;1"/></ellipse>' +
            '<ellipse cx="82" cy="60" rx="5.5" ry="6" fill="#1A1A1A">' +
            '<animate attributeName="ry" values="6;0.5;6" dur="4s" repeatCount="indefinite" keyTimes="0;0.025;1"/></ellipse>' +
            '<circle cx="60" cy="58" r="2.2" fill="#FFF" opacity="0.9"/>' +
            '<circle cx="84" cy="58" r="2.2" fill="#FFF" opacity="0.9"/>' +
            '<circle cx="56" cy="62" r="1" fill="#FFF" opacity="0.4"/>' +
            '<circle cx="80" cy="62" r="1" fill="#FFF" opacity="0.4"/>' +
            // Nose - 3D
            '<ellipse cx="70" cy="68" rx="3" ry="2.5" fill="' + col.sb + '" opacity="0.3"/>' +
            '<ellipse cx="71" cy="67" rx="1.5" ry="1" fill="white" opacity="0.15"/>' +
            // Smile
            '<path d="M56 76Q70 ' + (88 + int * 7) + ' 84 76" stroke="#1A1A1A" stroke-width="2.5" fill="none" stroke-linecap="round">' +
            '<animate attributeName="d" values="M56 76Q70 ' + (86 + int * 7) + ' 84 76;M56 76Q70 ' + (90 + int * 7) + ' 84 76;M56 76Q70 ' + (86 + int * 7) + ' 84 76" dur="3s" repeatCount="indefinite"/></path>' +
            (int > 0.5 ? '<path d="M60 76Q70 84 80 76" fill="#B71C1C" opacity="0.12"/>' : '') +
            // Blush 3D
            '<ellipse cx="47" cy="72" rx="8" ry="4.5" fill="#E57373" opacity="' + (0.15 + int * 0.35) + '">' +
            '<animate attributeName="opacity" values="' + (0.15 + int * 0.35) + ';' + (0.35 + int * 0.35) + ';' + (0.15 + int * 0.35) + '" dur="3s" repeatCount="indefinite"/></ellipse>' +
            '<ellipse cx="93" cy="72" rx="8" ry="4.5" fill="#E57373" opacity="' + (0.15 + int * 0.35) + '"/>' +
            // Ear hint
            '<ellipse cx="37" cy="62" rx="5" ry="7" fill="url(#bSK)" opacity="0.6"/>' +
            '<ellipse cx="103" cy="62" rx="5" ry="7" fill="url(#bSK)" opacity="0.6"/>' +
            '</g></g></svg>';
    },

    girl(a, b, col, int, step) {
        var sw = Math.sin(a + 0.5) * (6 + int * 12) * (step ? step.hipMul : 1);
        var aL = Math.sin(a + 0.5) * (14 + int * 20) * (step ? step.armLMul : 1);
        var aR = Math.sin(a + 1.5) * (14 + int * 20) * (step ? step.armRMul : 1);
        var lk = Math.sin(a * 1.5 + 0.5) * (5 + int * 12) * (step ? step.legMul : 1);
        var ht = Math.sin(a * 0.8 + 0.3) * (3 + int * 6);
        var dw = Math.sin(a * 2) * (4 + int * 8);
        var hip = Math.sin(a * 2 + 0.5) * int * 6 * (step ? step.hipMul : 1);
        var spin = step ? Math.sin(a * 0.7) * step.spinGirl * 15 : 0;
        var by = b;

        return '<svg viewBox="0 0 150 240" width="165" height="310" xmlns="http://www.w3.org/2000/svg">' +
            '<defs>' +
            '<linearGradient id="gDG" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="' + col.gd + '"/><stop offset="100%" stop-color="' + col.gda + '"/></linearGradient>' +
            '<linearGradient id="gDS" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stop-color="white" stop-opacity="0"/><stop offset="50%" stop-color="white" stop-opacity="0.12"/><stop offset="100%" stop-color="white" stop-opacity="0"/></linearGradient>' +
            '<radialGradient id="gSK"><stop offset="0%" stop-color="#FEE8D6"/><stop offset="100%" stop-color="' + col.sg + '"/></radialGradient>' +
            '<radialGradient id="gGL"><stop offset="0%" stop-color="' + col.gd + '" stop-opacity="0.25"/><stop offset="100%" stop-color="transparent"/></radialGradient>' +
            '<radialGradient id="cG"><stop offset="0%" stop-color="#FFF8E1"/><stop offset="100%" stop-color="#F5E6CA"/></radialGradient>' +
            '<filter id="gS"><feDropShadow dx="0" dy="4" stdDeviation="6" flood-color="' + col.gd + '" flood-opacity="0.2"/></filter>' +
            '<radialGradient id="g3d" cx="35%" cy="30%"><stop offset="0%" stop-color="white" stop-opacity="0.15"/><stop offset="100%" stop-color="transparent"/></radialGradient>' +
            '</defs>' +
            '<g transform="translate(0,' + by + ')" filter="url(#gS)">' +
            '<ellipse cx="75" cy="234" rx="' + (30 + Math.abs(sw) + dw) + '" ry="6" fill="' + col.sh + '" opacity="0.5"/>' +
            // Legs
            '<g transform="rotate(' + lk + ',62,186)">' +
            '<rect x="55" y="186" width="15" height="38" rx="6" fill="url(#gSK)"/>' +
            '<path d="M50 218Q52 228 64 230Q74 228 72 218L55 218z" fill="' + col.gda + '"/>' +
            '<rect x="56" y="225" width="5" height="8" rx="2" fill="' + col.gda + '" transform="rotate(-5,58,228)"/>' +
            '</g>' +
            '<g transform="rotate(' + (-lk) + ',88,186)">' +
            '<rect x="81" y="186" width="15" height="38" rx="6" fill="url(#gSK)"/>' +
            '<path d="M76 218Q78 228 90 230Q100 228 98 218L81 218z" fill="' + col.gda + '"/>' +
            '<rect x="82" y="225" width="5" height="8" rx="2" fill="' + col.gda + '" transform="rotate(-5,84,228)"/>' +
            '</g>' +
            // Dress with flowing salsa movement
            '<g transform="rotate(' + (sw * 0.3 + hip * 0.2 + spin) + ',75,120)">' +
            '<path d="M48 106L' + (30 - dw * 2) + ' 200Q75 ' + (206 + dw * 2) + ' ' + (120 + dw * 2) + ' 200L102 106Q75 100 48 106z" fill="url(#gDG)">' +
            '<animate attributeName="d" values="M48 106L' + (30 - dw) + ' 200Q75 ' + (204 + dw) + ' ' + (120 + dw) + ' 200L102 106Q75 100 48 106z;M48 106L' + (26 - dw * 2) + ' 198Q75 ' + (210 + dw * 2) + ' ' + (124 + dw * 2) + ' 198L102 106Q75 100 48 106z;M48 106L' + (30 - dw) + ' 200Q75 ' + (204 + dw) + ' ' + (120 + dw) + ' 200L102 106Q75 100 48 106z" dur="2s" repeatCount="indefinite"/>' +
            '</path>' +
            '<path d="M48 106L' + (30 - dw) + ' 200Q75 ' + (204 + dw) + ' ' + (120 + dw) + ' 200L102 106Q75 100 48 106z" fill="url(#gDS)"/>' +
            // Shimmer dots on dress
            '<circle cx="58" cy="132" r="2.5" fill="#FFF" opacity="0.3"><animate attributeName="opacity" values="0.3;0.7;0.3" dur="2s" repeatCount="indefinite"/></circle>' +
            '<circle cx="88" cy="142" r="2" fill="#FFF" opacity="0.25"><animate attributeName="opacity" values="0.25;0.6;0.25" dur="2.5s" repeatCount="indefinite"/></circle>' +
            '<circle cx="68" cy="162" r="2.5" fill="#FFF" opacity="0.3"><animate attributeName="opacity" values="0.3;0.65;0.3" dur="1.8s" repeatCount="indefinite"/></circle>' +
            '<circle cx="92" cy="178" r="2" fill="#FFF" opacity="0.2"/>' +
            '<circle cx="50" cy="182" r="2" fill="#FFF" opacity="0.25"/>' +
            // Waist ribbon
            '<ellipse cx="75" cy="114" rx="28" ry="5" fill="' + col.gdt + '" opacity="0.7"><animate attributeName="ry" values="5;6.5;5" dur="2s" repeatCount="indefinite"/></ellipse>' +
            // Dress bottom ruffle
            '<path d="M' + (32 - dw) + ' 196Q' + (48 - dw) + ' ' + (202 + dw * 2) + ' 75 196Q' + (102 + dw) + ' ' + (202 + dw * 2) + ' ' + (118 + dw) + ' 196" stroke="' + col.gdt + '" stroke-width="3" fill="none" opacity="0.5">' +
            '<animate attributeName="d" values="M32 196Q48 202 75 196Q102 202 118 196;M28 194Q46 208 75 194Q104 208 122 194;M32 196Q48 202 75 196Q102 202 118 196" dur="1.5s" repeatCount="indefinite"/></path>' +
            '</g>' +
            // Upper body
            '<rect x="56" y="96" width="38" height="18" rx="8" fill="url(#gSK)"/>' +
            '<path d="M56 106Q75 113 94 106" stroke="' + col.gd + '" stroke-width="2" fill="' + col.gd + '" opacity="0.4"/>' +
            // Arms
            '<g transform="rotate(' + (aL - int * 22) + ',52,106)">' +
            '<rect x="26" y="102" width="20" height="48" rx="9" fill="url(#gSK)"/>' +
            '<rect x="26" y="102" width="10" height="48" rx="5" fill="url(#g3d)"/>' +
            '<ellipse cx="36" cy="144" rx="6.5" ry="3" fill="' + col.sc + '" opacity="0.5" stroke="' + col.sc + '" stroke-width="1">' +
            '<animate attributeName="opacity" values="0.5;0.8;0.5" dur="2s" repeatCount="indefinite"/></ellipse>' +
            '<circle cx="36" cy="153" r="9" fill="url(#gSK)"/>' +
            '<ellipse cx="32" cy="159" rx="3.5" ry="5" fill="' + col.sg + '" opacity="0.7"/>' +
            '<ellipse cx="40" cy="159" rx="3.5" ry="5" fill="' + col.sg + '" opacity="0.7"/>' +
            '</g>' +
            '<g transform="rotate(' + (aR + int * 18) + ',98,106)">' +
            '<rect x="104" y="102" width="20" height="48" rx="9" fill="url(#gSK)"/>' +
            '<rect x="104" y="102" width="10" height="48" rx="5" fill="url(#g3d)"/>' +
            '<ellipse cx="114" cy="144" rx="6.5" ry="3" fill="' + col.sc + '" opacity="0.5"/>' +
            '<circle cx="114" cy="153" r="9" fill="url(#gSK)"/>' +
            '</g>' +
            // Head
            '<g transform="rotate(' + (ht + spin * 0.3) + ',75,58)">' +
            '<rect x="67" y="82" width="16" height="18" rx="7" fill="url(#gSK)"/>' +
            // Face with 3D roundness
            '<circle cx="75" cy="55" r="31" fill="url(#gSK)"/>' +
            '<circle cx="75" cy="55" r="31" fill="url(#g3d)"/>' +
            '<ellipse cx="65" cy="44" rx="12" ry="9" fill="white" opacity="0.08"/>' +
            // Curly hair with 3D volume
            '<ellipse cx="75" cy="36" rx="38" ry="28" fill="url(#cG)"/>' +
            '<ellipse cx="75" cy="34" rx="34" ry="24" fill="#FFF8E1" opacity="0.5"/>' +
            // Hair curls - left
            '<circle cx="38" cy="32" r="12" fill="#FFF8E1" opacity="0.9"><animate attributeName="r" values="12;13;12" dur="3s" repeatCount="indefinite"/></circle>' +
            '<circle cx="36" cy="47" r="13" fill="#F5E6CA" opacity="0.85"><animate attributeName="r" values="13;14;13" dur="3.5s" repeatCount="indefinite"/></circle>' +
            '<circle cx="38" cy="63" r="12" fill="#FFF8E1" opacity="0.8"/>' +
            '<circle cx="40" cy="77" r="11" fill="#F5E6CA" opacity="0.75"><animate attributeName="cy" values="77;79;77" dur="2s" repeatCount="indefinite"/></circle>' +
            // Hair curls - right
            '<circle cx="112" cy="32" r="12" fill="#FFF8E1" opacity="0.9"><animate attributeName="r" values="12;13;12" dur="3.2s" repeatCount="indefinite"/></circle>' +
            '<circle cx="114" cy="47" r="13" fill="#F5E6CA" opacity="0.85"/>' +
            '<circle cx="112" cy="63" r="12" fill="#FFF8E1" opacity="0.8"/>' +
            '<circle cx="110" cy="77" r="11" fill="#F5E6CA" opacity="0.75"/>' +
            // Hair curls - top
            '<circle cx="52" cy="17" r="11" fill="#FFF8E1" opacity="0.9"/>' +
            '<circle cx="75" cy="13" r="12" fill="#F5E6CA" opacity="0.9"><animate attributeName="r" values="12;13;12" dur="4s" repeatCount="indefinite"/></circle>' +
            '<circle cx="98" cy="17" r="11" fill="#FFF8E1" opacity="0.9"/>' +
            '<circle cx="63" cy="11" r="9" fill="#FFF8E1" opacity="0.85"/>' +
            '<circle cx="87" cy="11" r="9" fill="#FFF8E1" opacity="0.85"/>' +
            // Hair shine
            '<ellipse cx="65" cy="24" rx="9" ry="4" fill="white" opacity="0.14" transform="rotate(-10,65,24)"><animate attributeName="opacity" values="0.14;0.22;0.14" dur="4s" repeatCount="indefinite"/></ellipse>' +
            // Bow with 3D
            '<g transform="translate(100,22) rotate(' + (15 + sw * 0.5) + ')">' +
            '<ellipse cx="-10" cy="0" rx="11" ry="7" fill="' + col.gb + '" opacity="0.9"><animate attributeName="rx" values="11;12;11" dur="2s" repeatCount="indefinite"/></ellipse>' +
            '<ellipse cx="10" cy="0" rx="11" ry="7" fill="' + col.gb + '" opacity="0.9"/>' +
            '<circle cx="0" cy="0" r="4.5" fill="' + col.gdt + '"/>' +
            '<circle cx="0" cy="0" r="2" fill="white" opacity="0.4"><animate attributeName="opacity" values="0.4;0.8;0.4" dur="2s" repeatCount="indefinite"/></circle>' +
            '</g>' +
            // Eyes with lashes and 3D
            '<ellipse cx="64" cy="56" rx="5.5" ry="6.5" fill="#1A1A1A"><animate attributeName="ry" values="6.5;0.5;6.5" dur="4.5s" repeatCount="indefinite" keyTimes="0;0.025;1"/></ellipse>' +
            '<ellipse cx="86" cy="56" rx="5.5" ry="6.5" fill="#1A1A1A"><animate attributeName="ry" values="6.5;0.5;6.5" dur="4.5s" repeatCount="indefinite" keyTimes="0;0.025;1"/></ellipse>' +
            '<circle cx="66" cy="54" r="2.5" fill="#FFF" opacity="0.9"/>' +
            '<circle cx="88" cy="54" r="2.5" fill="#FFF" opacity="0.9"/>' +
            '<circle cx="62" cy="58" r="1" fill="#FFF" opacity="0.4"/>' +
            '<circle cx="84" cy="58" r="1" fill="#FFF" opacity="0.4"/>' +
            // Lashes
            '<path d="M59 49L55 44" stroke="#1A1A1A" stroke-width="2" stroke-linecap="round"/>' +
            '<path d="M63 48L62 43" stroke="#1A1A1A" stroke-width="2" stroke-linecap="round"/>' +
            '<path d="M81 49L78 44" stroke="#1A1A1A" stroke-width="2" stroke-linecap="round"/>' +
            '<path d="M85 48L84 43" stroke="#1A1A1A" stroke-width="2" stroke-linecap="round"/>' +
            '<path d="M90 49L94 44" stroke="#1A1A1A" stroke-width="2" stroke-linecap="round"/>' +
            // Nose 3D
            '<ellipse cx="75" cy="64" rx="2.5" ry="2" fill="' + col.sg + '" opacity="0.4"/>' +
            '<ellipse cx="76" cy="63" rx="1.2" ry="0.8" fill="white" opacity="0.2"/>' +
            // Smile
            '<path d="M62 70Q75 ' + (82 + int * 7) + ' 88 70" stroke="#E57373" stroke-width="2.5" fill="none" stroke-linecap="round">' +
            '<animate attributeName="d" values="M62 70Q75 ' + (80 + int * 7) + ' 88 70;M62 70Q75 ' + (84 + int * 7) + ' 88 70;M62 70Q75 ' + (80 + int * 7) + ' 88 70" dur="3s" repeatCount="indefinite"/></path>' +
            (int > 0.5 ? '<path d="M66 70Q75 78 84 70" fill="#B71C1C" opacity="0.1"/>' : '') +
            // Blush
            '<ellipse cx="51" cy="68" rx="8" ry="4.5" fill="#FFAB91" opacity="' + (0.15 + int * 0.4) + '"><animate attributeName="opacity" values="' + (0.15 + int * 0.4) + ';' + (0.4 + int * 0.4) + ';' + (0.15 + int * 0.4) + '" dur="3s" repeatCount="indefinite"/></ellipse>' +
            '<ellipse cx="99" cy="68" rx="8" ry="4.5" fill="#FFAB91" opacity="' + (0.15 + int * 0.4) + '"/>' +
            // Necklace
            '<path d="M60 84Q75 93 90 84" stroke="' + col.sc + '" stroke-width="1.8" fill="none" opacity="0.5"><animate attributeName="opacity" values="0.5;0.8;0.5" dur="3s" repeatCount="indefinite"/></path>' +
            '<circle cx="75" cy="92" r="4" fill="' + col.sc + '" opacity="0.7"><animate attributeName="r" values="4;4.5;4" dur="2s" repeatCount="indefinite"/></circle>' +
            '<circle cx="75" cy="92" r="1.8" fill="white" opacity="0.5"><animate attributeName="opacity" values="0.5;1;0.5" dur="1.5s" repeatCount="indefinite"/></circle>' +
            // Earrings
            '<circle cx="37" cy="68" r="3" fill="' + col.sc + '" opacity="0.5"/>' +
            '<circle cx="113" cy="68" r="3" fill="' + col.sc + '" opacity="0.5"/>' +
            '</g></g></svg>';
    },

    hearts(a, col, int) {
        if (int < 0.3) return '';
        var f1 = Math.sin(a * 1.5) * 10;
        var f2 = Math.sin(a * 1.2 + 1) * 12;
        var f3 = Math.sin(a * 1.8 + 2) * 8;
        var s1 = 0.7 + Math.sin(a) * 0.3;
        var s2 = 0.5 + Math.sin(a + 1) * 0.25;
        var s3 = 0.4 + Math.sin(a + 2) * 0.2;
        var op = Math.min(1, (int - 0.3) / 0.7);
        return '<svg viewBox="0 0 80 140" width="80" height="140" xmlns="http://www.w3.org/2000/svg">' +
            '<defs><filter id="hG"><feGaussianBlur stdDeviation="3" result="b"/><feComposite in="SourceGraphic" in2="b" operator="over"/></filter></defs>' +
            '<g opacity="' + op + '" filter="url(#hG)">' +
            '<g transform="translate(40,' + (55 + f1) + ') scale(' + s1 + ')" opacity="0.85">' +
            '<path d="M0-10C-5-17-15-17-15-8C-15 0 0 10 0 10C0 10 15 0 15-8C15-17 5-17 0-10z" fill="' + col.hc + '"><animate attributeName="d" values="M0-10C-5-17-15-17-15-8C-15 0 0 10 0 10C0 10 15 0 15-8C15-17 5-17 0-10z;M0-12C-6-20-18-20-18-10C-18 0 0 12 0 12C0 12 18 0 18-10C18-20 6-20 0-12z;M0-10C-5-17-15-17-15-8C-15 0 0 10 0 10C0 10 15 0 15-8C15-17 5-17 0-10z" dur="1.5s" repeatCount="indefinite"/></path></g>' +
            '<g transform="translate(25,' + (30 + f2) + ') scale(' + s2 + ')" opacity="0.65">' +
            '<path d="M0-8C-4-13-11-13-11-6C-11 0 0 8 0 8C0 8 11 0 11-6C11-13 4-13 0-8z" fill="' + col.gd + '"/></g>' +
            '<g transform="translate(55,' + (80 + f3) + ') scale(' + s3 + ')" opacity="0.5">' +
            '<path d="M0-6C-3-10-9-10-9-4C-9 0 0 6 0 6C0 6 9 0 9-4C9-10 3-10 0-6z" fill="' + col.sc + '"/></g>' +
            '<g transform="translate(15,' + (20 + f3) + ')" opacity="' + (0.4 + Math.sin(a * 3) * 0.4) + '"><path d="M0-5L1.5-1.5L5 0L1.5 1.5L0 5L-1.5 1.5L-5 0L-1.5-1.5z" fill="' + col.sc + '"><animateTransform attributeName="transform" type="rotate" values="0;360" dur="4s" repeatCount="indefinite"/></path></g>' +
            '<g transform="translate(60,' + (100 + f1) + ')" opacity="' + (0.3 + Math.sin(a * 2.5) * 0.3) + '"><path d="M0-4L1-1L4 0L1 1L0 4L-1 1L-4 0L-1-1z" fill="' + col.sc + '"><animateTransform attributeName="transform" type="rotate" values="0;-360" dur="5s" repeatCount="indefinite"/></path></g>' +
            '</g></svg>';
    },

    render() {
        if (!this.boyEl || !this.girlEl) return;
        var col = this.c();
        var a = this.danceAngle;
        var b = Math.sin(a * 2) * (2 + this.closeness * 5);
        var int = this.closeness;
        var step = this.phase === 'dancing' ? this.salsaSteps[this.currentStep] : null;

        this.boyEl.innerHTML = this.boy(a, b, col, int, step);
        this.girlEl.innerHTML = this.girl(a + 0.3, b, col, int, step);
        if (this.heartsEl) this.heartsEl.innerHTML = this.hearts(a, col, int);
    },

    updatePositions() {
        if (!this.boyEl || !this.girlEl || !this.container) return;

        var maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        var scrollProgress = maxScroll > 0 ? Math.min(1, this.scrollY / (maxScroll * 0.4)) : 0;

        // Phase 1: Approach — they walk closer
        if (scrollProgress < 0.8) {
            this.phase = 'approach';
            this.targetBoyX = 2 + scrollProgress * 36;
            this.targetGirlX = 78 - scrollProgress * 32;
            this.container.classList.remove('dancing');

            // Add walking class when actively scrolling
            if (this.isScrolling && scrollProgress > 0.05) {
                this.boyEl.classList.add('walking');
                this.girlEl.classList.add('walking');
            } else {
                this.boyEl.classList.remove('walking');
                this.girlEl.classList.remove('walking');
            }
        } else {
            // Phase 2: Dancing — salsa steps on every scroll
            this.phase = 'dancing';
            this.targetBoyX = 35;
            this.targetGirlX = 48;
            this.boyEl.classList.remove('walking');
            this.girlEl.classList.remove('walking');
            this.container.classList.add('dancing');
        }

        // Smooth lerp
        this.boyX += (this.targetBoyX - this.boyX) * 0.1;
        this.girlX += (this.targetGirlX - this.girlX) * 0.1;

        var distance = this.girlX - this.boyX;
        this.closeness = Math.max(0, Math.min(1, 1 - (distance - 10) / 60));

        this.boyEl.style.position = 'absolute';
        this.boyEl.style.left = this.boyX + '%';
        this.boyEl.style.bottom = '10px';

        this.girlEl.style.position = 'absolute';
        this.girlEl.style.left = this.girlX + '%';
        this.girlEl.style.bottom = '10px';

        if (this.heartsEl) {
            this.heartsEl.style.position = 'absolute';
            this.heartsEl.style.left = ((this.boyX + this.girlX) / 2 + 5) + '%';
            this.heartsEl.style.bottom = '150px';
        }

        if (this.floorEl) {
            this.floorEl.style.left = ((this.boyX + this.girlX) / 2 + 8) + '%';
            this.floorEl.style.transform = 'translateX(-50%)';
        }

        if (this.closeness > 0.5) this.container.classList.add('close-together');
        else this.container.classList.remove('close-together');

        this.container.style.opacity = 0.4 + this.closeness * 0.5;
    },

    advanceSalsaStep() {
        if (this.phase !== 'dancing') return;
        this.currentStep = (this.currentStep + 1) % this.salsaSteps.length;
        var step = this.salsaSteps[this.currentStep];

        // Show step label
        if (this.labelEl) {
            this.labelEl.textContent = step.name;
            this.labelEl.classList.add('visible');
            var self = this;
            clearTimeout(this.stepLabelTimer);
            this.stepLabelTimer = setTimeout(function() {
                if (self.labelEl) self.labelEl.classList.remove('visible');
            }, 2000);
        }

        // Burst of sparkles on new step
        for (var i = 0; i < 5; i++) {
            var self = this;
            setTimeout(function() { self.spawnDanceSparkle(); }, i * 80);
        }
    },

    bindScroll() {
        var self = this;
        var lastStepY = 0;
        window.addEventListener('scroll', function() {
            self.scrollY = window.scrollY || window.pageYOffset;
            self.scrollDelta = Math.abs(self.scrollY - self.lastScrollY);
            self.lastScrollY = self.scrollY;
            self.isScrolling = true;
            self.danceSpeed = Math.min(self.scrollDelta * 0.07, 0.45);

            // Advance salsa step every ~120px of scroll in dancing phase
            if (self.phase === 'dancing' && Math.abs(self.scrollY - lastStepY) > 120) {
                lastStepY = self.scrollY;
                self.advanceSalsaStep();
            }

            clearTimeout(self.scrollTimer);
            self.scrollTimer = setTimeout(function() { self.isScrolling = false; }, 150);
        }, { passive: true });
    },

    startAnimationLoop() {
        var self = this;
        var lastTime = performance.now();

        function loop(now) {
            var dt = (now - lastTime) / 1000;
            lastTime = now;

            if (!self.isScrolling) {
                self.danceSpeed *= 0.92;
                if (self.danceSpeed < 0.003) self.danceSpeed = 0;
            }

            self.updatePositions();

            var minDance = self.closeness * 0.018;
            var effectiveSpeed = Math.max(self.danceSpeed, minDance);

            if (effectiveSpeed > 0.002) {
                self.danceAngle += effectiveSpeed;
                self.render();
            }

            if (self.closeness > 0.6 && self.danceSpeed > 0.05 && Math.random() < 0.12) {
                self.spawnDanceSparkle();
            }

            self.animFrameId = requestAnimationFrame(loop);
        }
        self.animFrameId = requestAnimationFrame(loop);
    },

    spawnDanceSparkle() {
        if (!this.container) return;
        var sp = document.createElement('div');
        sp.className = 'dance-sparkle';
        var col = this.c();
        var colors = [col.hc, col.sc, col.gd, '#FFD700'];
        var color = colors[Math.floor(Math.random() * colors.length)];
        var size = Math.random() * 12 + 8;
        sp.innerHTML = '<svg viewBox="0 0 20 20" width="' + size + '" height="' + size + '"><path d="M10 0L12 8L20 10L12 12L10 20L8 12L0 10L8 8z" fill="' + color + '" opacity="0.8"><animateTransform attributeName="transform" type="rotate" values="0 10 10;360 10 10" dur="1s" repeatCount="1"/></path></svg>';
        var cx = (this.boyX + this.girlX) / 2;
        sp.style.position = 'absolute';
        sp.style.left = (cx + Math.random() * 20 - 10) + '%';
        sp.style.bottom = (80 + Math.random() * 160) + 'px';
        sp.style.setProperty('--tx', (Math.random() - 0.5) * 60 + 'px');
        sp.style.setProperty('--ty', -(Math.random() * 50 + 20) + 'px');
        this.container.appendChild(sp);
        setTimeout(function() { sp.remove(); }, 1800);
    },

    updateTheme() { this.render(); },

    destroy() {
        if (this.animFrameId) cancelAnimationFrame(this.animFrameId);
        if (this.container && this.container.parentNode) this.container.parentNode.removeChild(this.container);
        this.initialized = false;
    }
};
