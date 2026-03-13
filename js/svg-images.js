// ========================================
// SVG IMAGE GENERATOR - Replaces ALL emojis
// Unique shapes per theme, all inline SVG
// ========================================

const SVG = {
    // Generate themed SVG as an inline <svg> string or data URI
    // size is in px, color will use theme colors

    heart(size, color, color2) {
        return `<svg viewBox="0 0 100 100" width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="hg${size}" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:${color}"/><stop offset="100%" style="stop-color:${color2 || color}"/></linearGradient></defs><path d="M50 88C25 70 5 55 5 35 5 20 17 8 32 8c8 0 14 4 18 10 4-6 10-10 18-10 15 0 27 12 27 27 0 20-20 35-45 53z" fill="url(#hg${size})"/></svg>`;
    },

    rose(size, color, color2) {
        const c2 = color2 || color;
        return `<svg viewBox="0 0 100 100" width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="rg${size}" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:${color}"/><stop offset="100%" style="stop-color:${c2}"/></linearGradient></defs><ellipse cx="50" cy="45" rx="22" ry="20" fill="url(#rg${size})" opacity="0.9"/><ellipse cx="50" cy="42" rx="14" ry="13" fill="${c2}" opacity="0.7"/><ellipse cx="50" cy="40" rx="8" ry="7" fill="${color}" opacity="0.85"/><path d="M50 65 Q48 80 45 95" stroke="#6A994E" stroke-width="3" fill="none"/><path d="M45 75 Q38 70 35 72" stroke="#6A994E" stroke-width="2" fill="none"/><ellipse cx="37" cy="73" rx="8" ry="4" fill="#A7C957" opacity="0.6" transform="rotate(-20,37,73)"/></svg>`;
    },

    petal(size, color) {
        return `<svg viewBox="0 0 60 80" width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg"><ellipse cx="30" cy="35" rx="18" ry="28" fill="${color}" opacity="0.8" transform="rotate(15,30,35)"/><ellipse cx="30" cy="35" rx="10" ry="20" fill="${color}" opacity="0.5" transform="rotate(-10,30,35)"/></svg>`;
    },

    sakura(size, color, color2) {
        const c2 = color2 || color;
        return `<svg viewBox="0 0 100 100" width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">${[0,72,144,216,288].map((a,i) => `<ellipse cx="50" cy="22" rx="12" ry="22" fill="${i%2===0?color:c2}" opacity="0.8" transform="rotate(${a},50,50)"/>`).join('')}<circle cx="50" cy="50" r="8" fill="${c2}" opacity="0.9"/></svg>`;
    },

    butterfly(size, color, color2) {
        const c2 = color2 || color;
        return `<svg viewBox="0 0 100 100" width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg"><ellipse cx="35" cy="35" rx="20" ry="25" fill="${color}" opacity="0.8" transform="rotate(-15,35,35)"/><ellipse cx="65" cy="35" rx="20" ry="25" fill="${c2}" opacity="0.8" transform="rotate(15,65,35)"/><ellipse cx="38" cy="60" rx="14" ry="18" fill="${c2}" opacity="0.7" transform="rotate(-10,38,60)"/><ellipse cx="62" cy="60" rx="14" ry="18" fill="${color}" opacity="0.7" transform="rotate(10,62,60)"/><rect x="48" y="25" width="4" height="50" rx="2" fill="${color}" opacity="0.6"/><line x1="48" y1="25" x2="38" y2="10" stroke="${color}" stroke-width="2" stroke-linecap="round"/><line x1="52" y1="25" x2="62" y2="10" stroke="${c2}" stroke-width="2" stroke-linecap="round"/><circle cx="38" cy="10" r="3" fill="${color}"/><circle cx="62" cy="10" r="3" fill="${c2}"/></svg>`;
    },

    moon(size, color) {
        return `<svg viewBox="0 0 100 100" width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg"><circle cx="45" cy="50" r="35" fill="${color}" opacity="0.9"/><circle cx="60" cy="40" r="28" fill="#FFFFFF" opacity="0.3"/></svg>`;
    },

    shell(size, color, color2) {
        const c2 = color2 || color;
        return `<svg viewBox="0 0 100 100" width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg"><path d="M50 10 Q80 30 85 70 Q75 90 50 92 Q25 90 15 70 Q20 30 50 10z" fill="${color}" opacity="0.85"/>${[0,1,2,3,4].map(i => `<path d="M50 ${15+i*8} Q${60+i*4} ${40+i*6} ${55+i*5} ${60+i*6}" stroke="${c2}" stroke-width="2" fill="none" opacity="0.5"/>`).join('')}<path d="M50 10 Q42 30 50 92" stroke="${c2}" stroke-width="2" fill="none" opacity="0.4"/></svg>`;
    },

    wave(size, color) {
        return `<svg viewBox="0 0 100 60" width="${size}" height="${Math.round(size*0.6)}" xmlns="http://www.w3.org/2000/svg"><path d="M0 30 Q25 10 50 30 Q75 50 100 30 L100 60 L0 60z" fill="${color}" opacity="0.7"/><path d="M0 35 Q25 20 50 35 Q75 50 100 35" stroke="${color}" stroke-width="2" fill="none" opacity="0.5"/></svg>`;
    },

    sun(size, color, color2) {
        const c2 = color2 || color;
        return `<svg viewBox="0 0 100 100" width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="22" fill="${color}" opacity="0.9"/>${Array.from({length:12},(_, i) => {const a=i*30*Math.PI/180;return `<line x1="${50+28*Math.cos(a)}" y1="${50+28*Math.sin(a)}" x2="${50+40*Math.cos(a)}" y2="${50+40*Math.sin(a)}" stroke="${c2}" stroke-width="3" stroke-linecap="round" opacity="0.7"/>`;}).join('')}</svg>`;
    },

    bird(size, color) {
        return `<svg viewBox="0 0 100 60" width="${size}" height="${Math.round(size*0.6)}" xmlns="http://www.w3.org/2000/svg"><path d="M10 40 Q30 15 50 30 Q70 15 90 40" stroke="${color}" stroke-width="4" fill="none" stroke-linecap="round" opacity="0.8"/></svg>`;
    },

    leaf(size, color) {
        return `<svg viewBox="0 0 80 100" width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg"><path d="M40 5 Q70 25 65 60 Q55 90 40 95 Q25 90 15 60 Q10 25 40 5z" fill="${color}" opacity="0.8"/><path d="M40 15 L40 85" stroke="#FFFFFF" stroke-width="2" opacity="0.4"/><path d="M40 35 Q55 30 58 45" stroke="#FFFFFF" stroke-width="1.5" fill="none" opacity="0.3"/><path d="M40 50 Q25 45 22 55" stroke="#FFFFFF" stroke-width="1.5" fill="none" opacity="0.3"/><path d="M40 65 Q55 60 56 70" stroke="#FFFFFF" stroke-width="1.5" fill="none" opacity="0.3"/></svg>`;
    },

    clover(size, color, color2) {
        const c2 = color2 || color;
        return `<svg viewBox="0 0 100 100" width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg"><circle cx="38" cy="35" r="16" fill="${color}" opacity="0.8"/><circle cx="62" cy="35" r="16" fill="${c2}" opacity="0.8"/><circle cx="50" cy="22" r="16" fill="${color}" opacity="0.75"/><rect x="48" y="50" width="4" height="35" rx="2" fill="#6A994E"/></svg>`;
    },

    daisy(size, color, color2) {
        const c2 = color2 || '#FFE082';
        return `<svg viewBox="0 0 100 100" width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">${Array.from({length:8},(_, i) => `<ellipse cx="50" cy="25" rx="10" ry="20" fill="${color}" opacity="0.75" transform="rotate(${i*45},50,50)"/>`).join('')}<circle cx="50" cy="50" r="12" fill="${c2}" opacity="0.9"/></svg>`;
    },

    sparkle(size, color) {
        return `<svg viewBox="0 0 100 100" width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg"><path d="M50 5 L56 40 L95 50 L56 60 L50 95 L44 60 L5 50 L44 40z" fill="${color}" opacity="0.85"/></svg>`;
    },

    'star-4'(size, color) {
        return `<svg viewBox="0 0 100 100" width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg"><path d="M50 5 L58 38 L95 50 L58 62 L50 95 L42 62 L5 50 L42 38z" fill="${color}" opacity="0.8"/></svg>`;
    },

    'star-5'(size, color) {
        const pts = Array.from({length:10},(_, i) => {
            const a = (i*36-90)*Math.PI/180;
            const r = i%2===0?45:20;
            return `${50+r*Math.cos(a)},${50+r*Math.sin(a)}`;
        }).join(' ');
        return `<svg viewBox="0 0 100 100" width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg"><polygon points="${pts}" fill="${color}" opacity="0.85"/></svg>`;
    },

    'star-6'(size, color) {
        return `<svg viewBox="0 0 100 100" width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg"><polygon points="50,5 61,35 95,35 68,55 78,88 50,68 22,88 32,55 5,35 39,35" fill="${color}" opacity="0.8"/></svg>`;
    },

    crown(size, color, color2) {
        const c2 = color2 || color;
        return `<svg viewBox="0 0 100 80" width="${size}" height="${Math.round(size*0.8)}" xmlns="http://www.w3.org/2000/svg"><path d="M10 65 L10 30 L30 45 L50 15 L70 45 L90 30 L90 65z" fill="${color}" opacity="0.9"/><rect x="10" y="62" width="80" height="10" rx="3" fill="${c2}" opacity="0.7"/><circle cx="30" cy="68" r="3" fill="#FFF" opacity="0.6"/><circle cx="50" cy="68" r="3" fill="#FFF" opacity="0.6"/><circle cx="70" cy="68" r="3" fill="#FFF" opacity="0.6"/></svg>`;
    },

    gem(size, color, color2) {
        const c2 = color2 || color;
        return `<svg viewBox="0 0 100 100" width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg"><polygon points="50,8 85,35 70,92 30,92 15,35" fill="${color}" opacity="0.85"/><polygon points="50,8 65,35 50,92 35,35" fill="${c2}" opacity="0.5"/><line x1="15" y1="35" x2="85" y2="35" stroke="${c2}" stroke-width="2" opacity="0.4"/></svg>`;
    },

    sunburst(size, color) {
        return `<svg viewBox="0 0 100 100" width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="18" fill="${color}" opacity="0.9"/>${Array.from({length:16},(_, i) => {const a=i*22.5*Math.PI/180;const r1=22,r2=i%2===0?42:32;return `<line x1="${50+r1*Math.cos(a)}" y1="${50+r1*Math.sin(a)}" x2="${50+r2*Math.cos(a)}" y2="${50+r2*Math.sin(a)}" stroke="${color}" stroke-width="2.5" stroke-linecap="round" opacity="0.6"/>`;}).join('')}</svg>`;
    },

    cloud(size, color) {
        return `<svg viewBox="0 0 120 80" width="${size}" height="${Math.round(size*0.67)}" xmlns="http://www.w3.org/2000/svg"><circle cx="40" cy="45" r="25" fill="${color}" opacity="0.7"/><circle cx="65" cy="35" r="30" fill="${color}" opacity="0.8"/><circle cx="90" cy="45" r="22" fill="${color}" opacity="0.7"/><rect x="25" y="45" width="80" height="20" rx="10" fill="${color}" opacity="0.75"/></svg>`;
    },

    diamond(size, color) {
        return `<svg viewBox="0 0 100 100" width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg"><polygon points="50,5 90,50 50,95 10,50" fill="${color}" opacity="0.8"/><polygon points="50,5 70,50 50,95" fill="#FFFFFF" opacity="0.2"/></svg>`;
    },

    bud(size, color) {
        return `<svg viewBox="0 0 60 80" width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg"><ellipse cx="30" cy="30" rx="15" ry="22" fill="${color}" opacity="0.85"/><ellipse cx="22" cy="35" rx="10" ry="15" fill="${color}" opacity="0.6" transform="rotate(-15,22,35)"/><ellipse cx="38" cy="35" rx="10" ry="15" fill="${color}" opacity="0.6" transform="rotate(15,38,35)"/><path d="M30 52 Q30 70 28 78" stroke="#6A994E" stroke-width="2.5" fill="none"/></svg>`;
    },

    bubble(size, color) {
        return `<svg viewBox="0 0 100 100" width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="38" fill="none" stroke="${color}" stroke-width="3" opacity="0.6"/><circle cx="50" cy="50" r="38" fill="${color}" opacity="0.15"/><ellipse cx="38" cy="38" rx="12" ry="8" fill="#FFFFFF" opacity="0.4" transform="rotate(-30,38,38)"/></svg>`;
    },

    fish(size, color) {
        return `<svg viewBox="0 0 100 60" width="${size}" height="${Math.round(size*0.6)}" xmlns="http://www.w3.org/2000/svg"><ellipse cx="45" cy="30" rx="30" ry="18" fill="${color}" opacity="0.8"/><polygon points="75,30 95,15 95,45" fill="${color}" opacity="0.7"/><circle cx="32" cy="26" r="4" fill="#FFF" opacity="0.8"/><circle cx="33" cy="26" r="2" fill="#333" opacity="0.6"/></svg>`;
    },

    comet(size, color) {
        return `<svg viewBox="0 0 100 60" width="${size}" height="${Math.round(size*0.6)}" xmlns="http://www.w3.org/2000/svg"><circle cx="25" cy="30" r="10" fill="${color}" opacity="0.9"/><path d="M35 30 Q55 28 95 30" stroke="${color}" stroke-width="4" fill="none" opacity="0.5" stroke-linecap="round"/><path d="M33 25 Q50 22 85 25" stroke="${color}" stroke-width="2" fill="none" opacity="0.3" stroke-linecap="round"/><path d="M33 35 Q50 38 85 35" stroke="${color}" stroke-width="2" fill="none" opacity="0.3" stroke-linecap="round"/></svg>`;
    },

    constellation(size, color) {
        return `<svg viewBox="0 0 100 100" width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg"><circle cx="20" cy="25" r="4" fill="${color}" opacity="0.9"/><circle cx="50" cy="15" r="3" fill="${color}" opacity="0.8"/><circle cx="75" cy="30" r="4" fill="${color}" opacity="0.9"/><circle cx="60" cy="55" r="3" fill="${color}" opacity="0.8"/><circle cx="30" cy="70" r="4" fill="${color}" opacity="0.9"/><circle cx="80" cy="75" r="3" fill="${color}" opacity="0.8"/><line x1="20" y1="25" x2="50" y2="15" stroke="${color}" stroke-width="1.5" opacity="0.4"/><line x1="50" y1="15" x2="75" y2="30" stroke="${color}" stroke-width="1.5" opacity="0.4"/><line x1="75" y1="30" x2="60" y2="55" stroke="${color}" stroke-width="1.5" opacity="0.4"/><line x1="60" y1="55" x2="30" y2="70" stroke="${color}" stroke-width="1.5" opacity="0.4"/><line x1="30" y1="70" x2="80" y2="75" stroke="${color}" stroke-width="1.5" opacity="0.4"/></svg>`;
    },

    peach(size, color, color2) {
        const c2 = color2 || color;
        return `<svg viewBox="0 0 100 100" width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg"><circle cx="42" cy="55" r="28" fill="${color}" opacity="0.85"/><circle cx="58" cy="55" r="28" fill="${c2}" opacity="0.75"/><path d="M48 28 Q50 15 55 10" stroke="#6A994E" stroke-width="3" fill="none" stroke-linecap="round"/><ellipse cx="58" cy="14" rx="10" ry="5" fill="#6A994E" opacity="0.6" transform="rotate(20,58,14)"/></svg>`;
    },

    cherry(size, color, color2) {
        const c2 = color2 || color;
        return `<svg viewBox="0 0 100 100" width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg"><circle cx="32" cy="68" r="18" fill="${color}" opacity="0.85"/><circle cx="68" cy="68" r="18" fill="${c2}" opacity="0.85"/><path d="M32 52 Q35 25 50 10" stroke="#6A994E" stroke-width="3" fill="none"/><path d="M68 52 Q65 25 50 10" stroke="#6A994E" stroke-width="3" fill="none"/><ellipse cx="50" cy="12" rx="12" ry="6" fill="#6A994E" opacity="0.6"/></svg>`;
    },

    strawberry(size, color) {
        return `<svg viewBox="0 0 80 100" width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg"><path d="M40 15 Q65 20 65 55 Q65 85 40 95 Q15 85 15 55 Q15 20 40 15z" fill="${color}" opacity="0.85"/><path d="M30 10 Q40 5 50 10" stroke="#6A994E" stroke-width="3" fill="none"/><ellipse cx="40" cy="8" rx="14" ry="6" fill="#6A994E" opacity="0.7"/>${[[30,35],[50,38],[35,50],[48,55],[40,70],[30,65],[50,72]].map(([x,y]) => `<ellipse cx="${x}" cy="${y}" rx="2" ry="2.5" fill="#FFE082" opacity="0.6"/>`).join('')}</svg>`;
    },

    blossom(size, color, color2) {
        const c2 = color2 || '#FFE082';
        return `<svg viewBox="0 0 100 100" width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">${Array.from({length:6},(_, i) => `<ellipse cx="50" cy="28" rx="12" ry="18" fill="${color}" opacity="0.75" transform="rotate(${i*60},50,50)"/>`).join('')}<circle cx="50" cy="50" r="10" fill="${c2}" opacity="0.9"/></svg>`;
    },

    candy(size, color, color2) {
        const c2 = color2 || '#FFFFFF';
        return `<svg viewBox="0 0 100 100" width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="30" fill="${color}" opacity="0.85"/><path d="M50 20 A30 30 0 0 1 80 50" stroke="${c2}" stroke-width="8" fill="none" opacity="0.4"/><path d="M50 80 A30 30 0 0 1 20 50" stroke="${c2}" stroke-width="8" fill="none" opacity="0.4"/><rect x="78" y="46" width="18" height="8" rx="4" fill="${color}" opacity="0.7"/><rect x="4" y="46" width="18" height="8" rx="4" fill="${color}" opacity="0.7"/></svg>`;
    },

    lollipop(size, color, color2) {
        const c2 = color2 || '#FFFFFF';
        return `<svg viewBox="0 0 80 120" width="${size}" height="${Math.round(size*1.5)}" xmlns="http://www.w3.org/2000/svg"><circle cx="40" cy="35" r="28" fill="${color}" opacity="0.85"/><path d="M40 7 A14 14 0 0 1 54 21 A10 10 0 0 1 44 31 A6 6 0 0 1 38 25 A3 3 0 0 1 41 22" stroke="${c2}" stroke-width="5" fill="none" opacity="0.4"/><rect x="37" y="63" width="6" height="50" rx="3" fill="${c2}" opacity="0.5"/></svg>`;
    },

    swirl(size, color) {
        return `<svg viewBox="0 0 100 100" width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg"><path d="M50 50 Q50 30 65 30 Q80 30 80 50 Q80 70 60 70 Q40 70 40 50 Q40 25 60 20 Q85 15 90 50 Q90 85 50 85 Q15 85 10 50" stroke="${color}" stroke-width="4" fill="none" opacity="0.7" stroke-linecap="round"/></svg>`;
    },

    bow(size, color, color2) {
        const c2 = color2 || color;
        return `<svg viewBox="0 0 100 80" width="${size}" height="${Math.round(size*0.8)}" xmlns="http://www.w3.org/2000/svg"><ellipse cx="30" cy="35" rx="22" ry="16" fill="${color}" opacity="0.8" transform="rotate(-15,30,35)"/><ellipse cx="70" cy="35" rx="22" ry="16" fill="${c2}" opacity="0.8" transform="rotate(15,70,35)"/><circle cx="50" cy="38" r="8" fill="${color}" opacity="0.9"/><path d="M42 45 Q38 65 35 75" stroke="${color}" stroke-width="4" fill="none" opacity="0.6"/><path d="M58 45 Q62 65 65 75" stroke="${c2}" stroke-width="4" fill="none" opacity="0.6"/></svg>`;
    },

    branch(size, color) {
        return `<svg viewBox="0 0 100 100" width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg"><path d="M20 80 Q40 60 50 40 Q55 25 60 15" stroke="#8B6E5A" stroke-width="3" fill="none"/><circle cx="35" cy="55" r="6" fill="${color}" opacity="0.7"/><circle cx="48" cy="38" r="5" fill="${color}" opacity="0.8"/><circle cx="55" cy="22" r="6" fill="${color}" opacity="0.75"/><circle cx="60" cy="48" r="4" fill="${color}" opacity="0.6"/></svg>`;
    },

    dewdrop(size, color) {
        return `<svg viewBox="0 0 60 80" width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg"><path d="M30 5 Q5 40 5 55 Q5 75 30 75 Q55 75 55 55 Q55 40 30 5z" fill="${color}" opacity="0.7"/><ellipse cx="22" cy="48" rx="8" ry="10" fill="#FFFFFF" opacity="0.3" transform="rotate(-15,22,48)"/></svg>`;
    },

    rays(size, color) {
        return `<svg viewBox="0 0 100 100" width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">${Array.from({length:8},(_, i) => {const a=i*45*Math.PI/180;return `<line x1="50" y1="50" x2="${50+45*Math.cos(a)}" y2="${50+45*Math.sin(a)}" stroke="${color}" stroke-width="3" stroke-linecap="round" opacity="0.5"/>`;}).join('')}<circle cx="50" cy="50" r="5" fill="${color}" opacity="0.8"/></svg>`;
    },

    'sparkle-big'(size, color) {
        return `<svg viewBox="0 0 100 100" width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg"><path d="M50 0 L55 42 L100 50 L55 58 L50 100 L45 58 L0 50 L45 42z" fill="${color}" opacity="0.7"/><path d="M50 20 L53 45 L80 50 L53 55 L50 80 L47 55 L20 50 L47 45z" fill="${color}" opacity="0.4"/></svg>`;
    },

    // Letter icon (envelope)
    envelope(size, color, color2) {
        const c2 = color2 || color;
        return `<svg viewBox="0 0 100 80" width="${size}" height="${Math.round(size*0.8)}" xmlns="http://www.w3.org/2000/svg"><rect x="5" y="10" width="90" height="60" rx="8" fill="${color}" opacity="0.8"/><path d="M5 15 L50 45 L95 15" stroke="${c2}" stroke-width="3" fill="none" opacity="0.6"/><rect x="5" y="10" width="90" height="60" rx="8" fill="none" stroke="${c2}" stroke-width="2" opacity="0.4"/></svg>`;
    },

    // Game controller
    gamepad(size, color) {
        return `<svg viewBox="0 0 100 70" width="${size}" height="${Math.round(size*0.7)}" xmlns="http://www.w3.org/2000/svg"><rect x="15" y="15" width="70" height="40" rx="20" fill="${color}" opacity="0.8"/><circle cx="35" cy="35" r="8" fill="#FFF" opacity="0.4"/><rect x="32" y="25" width="6" height="20" rx="3" fill="#FFF" opacity="0.3"/><rect x="25" y="32" width="20" height="6" rx="3" fill="#FFF" opacity="0.3"/><circle cx="65" cy="30" r="4" fill="#FFF" opacity="0.5"/><circle cx="72" cy="37" r="4" fill="#FFF" opacity="0.5"/></svg>`;
    },

    // Music note
    music(size, color) {
        return `<svg viewBox="0 0 60 80" width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg"><ellipse cx="20" cy="60" rx="12" ry="10" fill="${color}" opacity="0.8"/><rect x="30" y="15" width="4" height="48" fill="${color}" opacity="0.7"/><path d="M34 15 Q50 10 50 25 Q50 35 34 30" fill="${color}" opacity="0.6"/></svg>`;
    },

    // Cake
    cake(size, color, color2, color3) {
        const c2 = color2 || color;
        const c3 = color3 || color;
        return `<svg viewBox="0 0 100 100" width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg"><rect x="20" y="55" width="60" height="20" rx="5" fill="${color}" opacity="0.85"/><rect x="15" y="72" width="70" height="22" rx="5" fill="${c2}" opacity="0.85"/><rect x="25" y="40" width="50" height="18" rx="5" fill="${c3}" opacity="0.85"/><rect x="48" y="15" width="4" height="25" rx="2" fill="${color}" opacity="0.6"/><ellipse cx="50" cy="12" rx="6" ry="8" fill="#FFE082" opacity="0.8"/><ellipse cx="50" cy="10" rx="4" ry="5" fill="#FF8A65" opacity="0.6"/></svg>`;
    },

    // Gift box
    gift(size, color, color2) {
        const c2 = color2 || color;
        return `<svg viewBox="0 0 100 100" width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg"><rect x="15" y="35" width="70" height="55" rx="5" fill="${color}" opacity="0.85"/><rect x="10" y="25" width="80" height="15" rx="5" fill="${c2}" opacity="0.8"/><rect x="45" y="25" width="10" height="65" fill="${c2}" opacity="0.5"/><path d="M50 25 Q35 10 25 15" stroke="${c2}" stroke-width="4" fill="none" stroke-linecap="round"/><path d="M50 25 Q65 10 75 15" stroke="${c2}" stroke-width="4" fill="none" stroke-linecap="round"/></svg>`;
    },

    // Ring
    ring(size, color) {
        return `<svg viewBox="0 0 80 100" width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg"><ellipse cx="40" cy="60" rx="25" ry="28" fill="none" stroke="${color}" stroke-width="6" opacity="0.8"/><path d="M30 38 L40 20 L50 38" fill="${color}" opacity="0.7"/><circle cx="40" cy="22" r="5" fill="#FFF" opacity="0.6"/></svg>`;
    },

    // Ribbon
    ribbon(size, color) {
        return `<svg viewBox="0 0 100 40" width="${size}" height="${Math.round(size*0.4)}" xmlns="http://www.w3.org/2000/svg"><path d="M5 20 Q25 5 50 20 Q75 35 95 20" stroke="${color}" stroke-width="6" fill="none" stroke-linecap="round" opacity="0.7"/></svg>`;
    },

    // Generate a themed shape by name
    getShape(name, size, theme) {
        const color = theme ? theme.primary : '#FFB6C1';
        const color2 = theme ? theme.secondary : '#DDA0DD';
        if (typeof this[name] === 'function') {
            return this[name](size, color, color2);
        }
        return this.heart(size, color, color2);
    },

    // Create an img element from SVG string
    toImg(svgString, alt, className) {
        const encoded = 'data:image/svg+xml,' + encodeURIComponent(svgString);
        return `<img src="${encoded}" alt="${alt || ''}" class="${className || ''}" draggable="false" style="display:inline-block;vertical-align:middle;">`;
    },

    // Create a div with innerHTML SVG
    toDiv(svgString, className) {
        return `<span class="${className || ''}" style="display:inline-flex;align-items:center;justify-content:center;line-height:1;">${svgString}</span>`;
    }
};
