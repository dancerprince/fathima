// ========================================
// SVG IMAGE GENERATOR — Rich Animated Versions
// All vectors include subtle animations
// ========================================

const SVG = {
    heart(size, color, color2) {
        const id = 'hg' + size + Math.random().toString(36).substr(2,4);
        return `<svg viewBox="0 0 100 100" width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="${id}" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:${color}"/><stop offset="100%" style="stop-color:${color2 || color}"/></linearGradient><filter id="${id}f"><feGaussianBlur stdDeviation="1.5" result="blur"/><feComposite in="SourceGraphic" in2="blur" operator="over"/></filter></defs><path d="M50 88C25 70 5 55 5 35 5 20 17 8 32 8c8 0 14 4 18 10 4-6 10-10 18-10 15 0 27 12 27 27 0 20-20 35-45 53z" fill="url(#${id})" filter="url(#${id}f)"><animate attributeName="d" values="M50 88C25 70 5 55 5 35 5 20 17 8 32 8c8 0 14 4 18 10 4-6 10-10 18-10 15 0 27 12 27 27 0 20-20 35-45 53z;M50 85C25 68 8 55 8 37 8 22 19 10 33 10c7 0 13 3 17 9 4-6 10-9 17-9 14 0 25 12 25 27 0 18-18 31-42 48z;M50 88C25 70 5 55 5 35 5 20 17 8 32 8c8 0 14 4 18 10 4-6 10-10 18-10 15 0 27 12 27 27 0 20-20 35-45 53z" dur="2s" repeatCount="indefinite"/></path></svg>`;
    },

    rose(size, color, color2) {
        const c2 = color2 || color;
        const id = 'rg' + Math.random().toString(36).substr(2,4);
        return `<svg viewBox="0 0 100 100" width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="${id}" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:${color}"/><stop offset="100%" style="stop-color:${c2}"/></linearGradient></defs><ellipse cx="50" cy="45" rx="22" ry="20" fill="url(#${id})" opacity="0.9"><animate attributeName="ry" values="20;22;20" dur="3s" repeatCount="indefinite"/></ellipse><ellipse cx="50" cy="42" rx="14" ry="13" fill="${c2}" opacity="0.7"><animate attributeName="rx" values="14;16;14" dur="4s" repeatCount="indefinite"/></ellipse><ellipse cx="50" cy="40" rx="8" ry="7" fill="${color}" opacity="0.85"/><path d="M50 65 Q48 80 45 95" stroke="#6A994E" stroke-width="3" fill="none"><animate attributeName="d" values="M50 65 Q48 80 45 95;M50 65 Q52 80 48 95;M50 65 Q48 80 45 95" dur="5s" repeatCount="indefinite"/></path><path d="M45 75 Q38 70 35 72" stroke="#6A994E" stroke-width="2" fill="none"/><ellipse cx="37" cy="73" rx="8" ry="4" fill="#A7C957" opacity="0.6" transform="rotate(-20,37,73)"/></svg>`;
    },

    petal(size, color) {
        return `<svg viewBox="0 0 60 80" width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg"><ellipse cx="30" cy="35" rx="18" ry="28" fill="${color}" opacity="0.8" transform="rotate(15,30,35)"><animate attributeName="rx" values="18;20;18" dur="3s" repeatCount="indefinite"/></ellipse><ellipse cx="30" cy="35" rx="10" ry="20" fill="${color}" opacity="0.5" transform="rotate(-10,30,35)"/></svg>`;
    },

    sakura(size, color, color2) {
        const c2 = color2 || color;
        return `<svg viewBox="0 0 100 100" width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">${[0,72,144,216,288].map((a,i) => `<ellipse cx="50" cy="22" rx="12" ry="22" fill="${i%2===0?color:c2}" opacity="0.8" transform="rotate(${a},50,50)"><animateTransform attributeName="transform" type="rotate" values="${a},50,50;${a+5},50,50;${a},50,50" dur="${3+i*0.5}s" repeatCount="indefinite"/></ellipse>`).join('')}<circle cx="50" cy="50" r="8" fill="${c2}" opacity="0.9"><animate attributeName="r" values="8;10;8" dur="2s" repeatCount="indefinite"/></circle></svg>`;
    },

    butterfly(size, color, color2) {
        const c2 = color2 || color;
        return `<svg viewBox="0 0 100 100" width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg"><g><animateTransform attributeName="transform" type="translate" values="0,0;0,-3;0,0" dur="2s" repeatCount="indefinite"/><ellipse cx="35" cy="35" rx="20" ry="25" fill="${color}" opacity="0.8" transform="rotate(-15,35,35)"><animate attributeName="rx" values="20;18;20" dur="0.8s" repeatCount="indefinite"/></ellipse><ellipse cx="65" cy="35" rx="20" ry="25" fill="${c2}" opacity="0.8" transform="rotate(15,65,35)"><animate attributeName="rx" values="20;18;20" dur="0.8s" repeatCount="indefinite"/></ellipse><ellipse cx="38" cy="60" rx="14" ry="18" fill="${c2}" opacity="0.7" transform="rotate(-10,38,60)"><animate attributeName="rx" values="14;12;14" dur="0.8s" repeatCount="indefinite"/></ellipse><ellipse cx="62" cy="60" rx="14" ry="18" fill="${color}" opacity="0.7" transform="rotate(10,62,60)"><animate attributeName="rx" values="14;12;14" dur="0.8s" repeatCount="indefinite"/></ellipse><rect x="48" y="25" width="4" height="50" rx="2" fill="${color}" opacity="0.6"/><line x1="48" y1="25" x2="38" y2="10" stroke="${color}" stroke-width="2" stroke-linecap="round"/><line x1="52" y1="25" x2="62" y2="10" stroke="${c2}" stroke-width="2" stroke-linecap="round"/><circle cx="38" cy="10" r="3" fill="${color}"/><circle cx="62" cy="10" r="3" fill="${c2}"/></g></svg>`;
    },

    moon(size, color) {
        return `<svg viewBox="0 0 100 100" width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg"><circle cx="45" cy="50" r="35" fill="${color}" opacity="0.9"/><circle cx="60" cy="40" r="28" fill="#FFFFFF" opacity="0.3"/><circle cx="30" cy="35" r="2" fill="#FFF" opacity="0.5"><animate attributeName="opacity" values="0.5;1;0.5" dur="3s" repeatCount="indefinite"/></circle><circle cx="55" cy="60" r="1.5" fill="#FFF" opacity="0.4"><animate attributeName="opacity" values="0.4;0.9;0.4" dur="2s" repeatCount="indefinite"/></circle></svg>`;
    },

    sparkle(size, color) {
        return `<svg viewBox="0 0 100 100" width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg"><path d="M50 5 L56 40 L95 50 L56 60 L50 95 L44 60 L5 50 L44 40z" fill="${color}" opacity="0.85"><animateTransform attributeName="transform" type="rotate" values="0 50 50;360 50 50" dur="8s" repeatCount="indefinite"/><animate attributeName="opacity" values="0.85;1;0.85" dur="2s" repeatCount="indefinite"/></path></svg>`;
    },

    'star-4'(size, color) {
        return `<svg viewBox="0 0 100 100" width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg"><path d="M50 5 L58 38 L95 50 L58 62 L50 95 L42 62 L5 50 L42 38z" fill="${color}" opacity="0.8"><animate attributeName="opacity" values="0.8;1;0.8" dur="2.5s" repeatCount="indefinite"/></path></svg>`;
    },

    'star-5'(size, color) {
        const pts = Array.from({length:10},(_, i) => {
            const a = (i*36-90)*Math.PI/180;
            const r = i%2===0?45:20;
            return `${50+r*Math.cos(a)},${50+r*Math.sin(a)}`;
        }).join(' ');
        return `<svg viewBox="0 0 100 100" width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg"><polygon points="${pts}" fill="${color}" opacity="0.85"><animateTransform attributeName="transform" type="rotate" values="0 50 50;360 50 50" dur="12s" repeatCount="indefinite"/></polygon></svg>`;
    },

    'star-6'(size, color) {
        return `<svg viewBox="0 0 100 100" width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg"><polygon points="50,5 61,35 95,35 68,55 78,88 50,68 22,88 32,55 5,35 39,35" fill="${color}" opacity="0.8"><animateTransform attributeName="transform" type="rotate" values="0 50 50;360 50 50" dur="15s" repeatCount="indefinite"/></polygon></svg>`;
    },

    crown(size, color, color2) {
        const c2 = color2 || color;
        return `<svg viewBox="0 0 100 80" width="${size}" height="${Math.round(size*0.8)}" xmlns="http://www.w3.org/2000/svg"><path d="M10 65 L10 30 L30 45 L50 15 L70 45 L90 30 L90 65z" fill="${color}" opacity="0.9"/><rect x="10" y="62" width="80" height="10" rx="3" fill="${c2}" opacity="0.7"/><circle cx="30" cy="68" r="3" fill="#FFF" opacity="0.5"><animate attributeName="opacity" values="0.5;0.9;0.5" dur="2s" repeatCount="indefinite"/></circle><circle cx="50" cy="68" r="3" fill="#FFF" opacity="0.5"><animate attributeName="opacity" values="0.5;0.9;0.5" dur="2.5s" repeatCount="indefinite"/></circle><circle cx="70" cy="68" r="3" fill="#FFF" opacity="0.5"><animate attributeName="opacity" values="0.5;0.9;0.5" dur="3s" repeatCount="indefinite"/></circle></svg>`;
    },

    gem(size, color, color2) {
        const c2 = color2 || color;
        return `<svg viewBox="0 0 100 100" width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg"><polygon points="50,8 85,35 70,92 30,92 15,35" fill="${color}" opacity="0.85"/><polygon points="50,8 65,35 50,92 35,35" fill="${c2}" opacity="0.5"><animate attributeName="opacity" values="0.5;0.7;0.5" dur="3s" repeatCount="indefinite"/></polygon><line x1="15" y1="35" x2="85" y2="35" stroke="${c2}" stroke-width="2" opacity="0.4"/><polygon points="50,8 55,20 50,35 45,20" fill="white" opacity="0.15"><animate attributeName="opacity" values="0.15;0.3;0.15" dur="2s" repeatCount="indefinite"/></polygon></svg>`;
    },

    diamond(size, color) {
        return `<svg viewBox="0 0 100 100" width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg"><polygon points="50,5 90,50 50,95 10,50" fill="${color}" opacity="0.8"/><polygon points="50,5 70,50 50,95" fill="#FFFFFF" opacity="0.15"><animate attributeName="opacity" values="0.15;0.25;0.15" dur="3s" repeatCount="indefinite"/></polygon></svg>`;
    },

    shell(size, color, color2) {
        const c2 = color2 || color;
        return `<svg viewBox="0 0 100 100" width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg"><path d="M50 10 Q80 30 85 70 Q75 90 50 92 Q25 90 15 70 Q20 30 50 10z" fill="${color}" opacity="0.85"/>${[0,1,2,3,4].map(i => `<path d="M50 ${15+i*8} Q${60+i*4} ${40+i*6} ${55+i*5} ${60+i*6}" stroke="${c2}" stroke-width="2" fill="none" opacity="0.5"/>`).join('')}</svg>`;
    },

    sun(size, color, color2) {
        const c2 = color2 || color;
        return `<svg viewBox="0 0 100 100" width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="22" fill="${color}" opacity="0.9"><animate attributeName="r" values="22;24;22" dur="3s" repeatCount="indefinite"/></circle>${Array.from({length:12},(_, i) => {const a=i*30*Math.PI/180;return `<line x1="${50+28*Math.cos(a)}" y1="${50+28*Math.sin(a)}" x2="${50+40*Math.cos(a)}" y2="${50+40*Math.sin(a)}" stroke="${c2}" stroke-width="3" stroke-linecap="round" opacity="0.7"/>`;}).join('')}</svg>`;
    },

    sunburst(size, color) {
        return `<svg viewBox="0 0 100 100" width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="18" fill="${color}" opacity="0.9"/>${Array.from({length:16},(_, i) => {const a=i*22.5*Math.PI/180;const r1=22,r2=i%2===0?42:32;return `<line x1="${50+r1*Math.cos(a)}" y1="${50+r1*Math.sin(a)}" x2="${50+r2*Math.cos(a)}" y2="${50+r2*Math.sin(a)}" stroke="${color}" stroke-width="2.5" stroke-linecap="round" opacity="0.6"/>`;}).join('')}<animateTransform attributeName="transform" type="rotate" values="0 50 50;360 50 50" dur="20s" repeatCount="indefinite"/></svg>`;
    },

    leaf(size, color) {
        return `<svg viewBox="0 0 80 100" width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg"><path d="M40 5 Q70 25 65 60 Q55 90 40 95 Q25 90 15 60 Q10 25 40 5z" fill="${color}" opacity="0.8"><animate attributeName="d" values="M40 5 Q70 25 65 60 Q55 90 40 95 Q25 90 15 60 Q10 25 40 5z;M40 8 Q68 28 63 62 Q53 88 40 93 Q27 88 17 62 Q12 28 40 8z;M40 5 Q70 25 65 60 Q55 90 40 95 Q25 90 15 60 Q10 25 40 5z" dur="4s" repeatCount="indefinite"/></path><path d="M40 15 L40 85" stroke="#FFFFFF" stroke-width="2" opacity="0.3"/></svg>`;
    },

    daisy(size, color, color2) {
        const c2 = color2 || '#FFE082';
        return `<svg viewBox="0 0 100 100" width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">${Array.from({length:8},(_, i) => `<ellipse cx="50" cy="25" rx="10" ry="20" fill="${color}" opacity="0.75" transform="rotate(${i*45},50,50)"/>`).join('')}<circle cx="50" cy="50" r="12" fill="${c2}" opacity="0.9"><animate attributeName="r" values="12;14;12" dur="3s" repeatCount="indefinite"/></circle></svg>`;
    },

    cherry(size, color, color2) {
        const c2 = color2 || color;
        return `<svg viewBox="0 0 100 100" width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg"><circle cx="32" cy="68" r="18" fill="${color}" opacity="0.85"><animate attributeName="r" values="18;19;18" dur="2s" repeatCount="indefinite"/></circle><circle cx="68" cy="68" r="18" fill="${c2}" opacity="0.85"/><path d="M32 52 Q35 25 50 10" stroke="#6A994E" stroke-width="3" fill="none"/><path d="M68 52 Q65 25 50 10" stroke="#6A994E" stroke-width="3" fill="none"/><ellipse cx="50" cy="12" rx="12" ry="6" fill="#6A994E" opacity="0.6"/></svg>`;
    },

    blossom(size, color, color2) {
        const c2 = color2 || '#FFE082';
        return `<svg viewBox="0 0 100 100" width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg"><g><animateTransform attributeName="transform" type="rotate" values="0 50 50;10 50 50;0 50 50" dur="4s" repeatCount="indefinite"/>${Array.from({length:6},(_, i) => `<ellipse cx="50" cy="28" rx="12" ry="18" fill="${color}" opacity="0.75" transform="rotate(${i*60},50,50)"/>`).join('')}</g><circle cx="50" cy="50" r="10" fill="${c2}" opacity="0.9"/></svg>`;
    },

    candy(size, color, color2) {
        const c2 = color2 || '#FFFFFF';
        return `<svg viewBox="0 0 100 100" width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="30" fill="${color}" opacity="0.85"/><path d="M50 20 A30 30 0 0 1 80 50" stroke="${c2}" stroke-width="8" fill="none" opacity="0.3"/><path d="M50 80 A30 30 0 0 1 20 50" stroke="${c2}" stroke-width="8" fill="none" opacity="0.3"/><rect x="78" y="46" width="18" height="8" rx="4" fill="${color}" opacity="0.7"/><rect x="4" y="46" width="18" height="8" rx="4" fill="${color}" opacity="0.7"/></svg>`;
    },

    bubble(size, color) {
        return `<svg viewBox="0 0 100 100" width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="38" fill="none" stroke="${color}" stroke-width="2" opacity="0.5"><animate attributeName="r" values="38;40;38" dur="3s" repeatCount="indefinite"/></circle><circle cx="50" cy="50" r="38" fill="${color}" opacity="0.08"/><ellipse cx="38" cy="38" rx="12" ry="8" fill="#FFFFFF" opacity="0.3" transform="rotate(-30,38,38)"/></svg>`;
    },

    cloud(size, color) {
        return `<svg viewBox="0 0 120 80" width="${size}" height="${Math.round(size*0.67)}" xmlns="http://www.w3.org/2000/svg"><circle cx="40" cy="45" r="25" fill="${color}" opacity="0.7"/><circle cx="65" cy="35" r="30" fill="${color}" opacity="0.8"/><circle cx="90" cy="45" r="22" fill="${color}" opacity="0.7"/><rect x="25" y="45" width="80" height="20" rx="10" fill="${color}" opacity="0.75"/></svg>`;
    },

    // Utility shapes
    envelope(size, color, color2) {
        const c2 = color2 || color;
        return `<svg viewBox="0 0 100 80" width="${size}" height="${Math.round(size*0.8)}" xmlns="http://www.w3.org/2000/svg"><rect x="5" y="10" width="90" height="60" rx="8" fill="${color}" opacity="0.8"/><path d="M5 15 L50 45 L95 15" stroke="${c2}" stroke-width="3" fill="none" opacity="0.6"/></svg>`;
    },

    gamepad(size, color) {
        return `<svg viewBox="0 0 100 70" width="${size}" height="${Math.round(size*0.7)}" xmlns="http://www.w3.org/2000/svg"><rect x="15" y="15" width="70" height="40" rx="20" fill="${color}" opacity="0.8"/><circle cx="35" cy="35" r="8" fill="#FFF" opacity="0.3"/><circle cx="65" cy="30" r="4" fill="#FFF" opacity="0.4"/><circle cx="72" cy="37" r="4" fill="#FFF" opacity="0.4"/></svg>`;
    },

    music(size, color) {
        return `<svg viewBox="0 0 60 80" width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg"><ellipse cx="20" cy="60" rx="12" ry="10" fill="${color}" opacity="0.8"><animate attributeName="ry" values="10;11;10" dur="2s" repeatCount="indefinite"/></ellipse><rect x="30" y="15" width="4" height="48" fill="${color}" opacity="0.7"/><path d="M34 15 Q50 10 50 25 Q50 35 34 30" fill="${color}" opacity="0.6"/></svg>`;
    },

    cake(size, color, color2, color3) {
        const c2 = color2 || color; const c3 = color3 || color;
        return `<svg viewBox="0 0 100 100" width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg"><rect x="20" y="55" width="60" height="20" rx="5" fill="${color}" opacity="0.85"/><rect x="15" y="72" width="70" height="22" rx="5" fill="${c2}" opacity="0.85"/><rect x="25" y="40" width="50" height="18" rx="5" fill="${c3}" opacity="0.85"/><rect x="48" y="15" width="4" height="25" rx="2" fill="${color}" opacity="0.6"/><ellipse cx="50" cy="12" rx="6" ry="8" fill="#FFE082" opacity="0.8"><animate attributeName="ry" values="8;10;8" dur="0.5s" repeatCount="indefinite"/></ellipse></svg>`;
    },

    gift(size, color, color2) {
        const c2 = color2 || color;
        return `<svg viewBox="0 0 100 100" width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg"><rect x="15" y="35" width="70" height="55" rx="5" fill="${color}" opacity="0.85"/><rect x="10" y="25" width="80" height="15" rx="5" fill="${c2}" opacity="0.8"/><rect x="45" y="25" width="10" height="65" fill="${c2}" opacity="0.5"/><path d="M50 25 Q35 10 25 15" stroke="${c2}" stroke-width="4" fill="none" stroke-linecap="round"/><path d="M50 25 Q65 10 75 15" stroke="${c2}" stroke-width="4" fill="none" stroke-linecap="round"/></svg>`;
    },

    ring(size, color) {
        return `<svg viewBox="0 0 80 100" width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg"><ellipse cx="40" cy="60" rx="25" ry="28" fill="none" stroke="${color}" stroke-width="6" opacity="0.8"/><path d="M30 38 L40 20 L50 38" fill="${color}" opacity="0.7"/><circle cx="40" cy="22" r="5" fill="#FFF" opacity="0.5"><animate attributeName="opacity" values="0.5;0.9;0.5" dur="2s" repeatCount="indefinite"/></circle></svg>`;
    },

    bow(size, color, color2) {
        const c2 = color2 || color;
        return `<svg viewBox="0 0 100 80" width="${size}" height="${Math.round(size*0.8)}" xmlns="http://www.w3.org/2000/svg"><ellipse cx="30" cy="35" rx="22" ry="16" fill="${color}" opacity="0.8" transform="rotate(-15,30,35)"/><ellipse cx="70" cy="35" rx="22" ry="16" fill="${c2}" opacity="0.8" transform="rotate(15,70,35)"/><circle cx="50" cy="38" r="8" fill="${color}" opacity="0.9"/></svg>`;
    },

    ribbon(size, color) {
        return `<svg viewBox="0 0 100 40" width="${size}" height="${Math.round(size*0.4)}" xmlns="http://www.w3.org/2000/svg"><path d="M5 20 Q25 5 50 20 Q75 35 95 20" stroke="${color}" stroke-width="6" fill="none" stroke-linecap="round" opacity="0.7"><animate attributeName="d" values="M5 20 Q25 5 50 20 Q75 35 95 20;M5 20 Q25 35 50 20 Q75 5 95 20;M5 20 Q25 5 50 20 Q75 35 95 20" dur="4s" repeatCount="indefinite"/></path></svg>`;
    },

    getShape(name, size, theme) {
        const color = theme ? theme.primary : '#FFB6C1';
        const color2 = theme ? theme.secondary : '#DDA0DD';
        if (typeof this[name] === 'function') return this[name](size, color, color2);
        return this.heart(size, color, color2);
    },

    toImg(svgString, alt, className) {
        const encoded = 'data:image/svg+xml,' + encodeURIComponent(svgString);
        return `<img src="${encoded}" alt="${alt || ''}" class="${className || ''}" draggable="false" style="display:inline-block;vertical-align:middle;">`;
    },

    toDiv(svgString, className) {
        return `<span class="${className || ''}" style="display:inline-flex;align-items:center;justify-content:center;line-height:1;">${svgString}</span>`;
    }
};
