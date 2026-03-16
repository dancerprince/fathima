// ========================================
// SINGLE LUXURY THEME — No transitions
// Deep Rose Gold & Midnight Elegance
// ========================================

var currentTheme = {
    name: 'Royal Elegance',
    primary: '#E91E63',
    primaryLight: '#F8BBD0',
    secondary: '#9C27B0',
    secondaryLight: '#E1BEE7',
    accent: '#FF4081',
    accentDeep: '#880E4F',
    gold: '#FFD700',
    bgPrimary: '#05000d',
    bgSecondary: '#10001a',
    text: '#F3E5F5',
    textMedium: '#CE93D8',
    textLight: '#AB47BC',
    glowColor: 'rgba(233, 30, 99, 0.4)',
    neonPink: '#FF1493',
    neonPurple: '#8B5CF6',
    neonGold: '#FFD700',
    cursorShape: 'heart',
    sectionBadgeShape: 'sparkle',
    shapes: ['heart', 'rose', 'butterfly', 'sakura', 'gem', 'crown'],
    floatingShapes: ['heart', 'sparkle', 'star-5', 'rose', 'butterfly', 'diamond'],
    particleColors: ['#FF4081', '#E91E63', '#9C27B0', '#FFD700', '#FF1493', '#AB47BC', '#F48FB1', '#CE93D8']
};

function initTheme() { applyThemeCSS(); }

function applyThemeCSS() {
    var t = currentTheme;
    var root = document.documentElement;
    root.style.setProperty('--pastel-pink', t.primary);
    root.style.setProperty('--pastel-rose', t.primaryLight);
    root.style.setProperty('--pastel-lavender', t.secondaryLight);
    root.style.setProperty('--pastel-lilac', t.secondary);
    root.style.setProperty('--deep-rose', t.accentDeep);
    root.style.setProperty('--deep-pink', t.accent);
    root.style.setProperty('--gold', t.gold);
    root.style.setProperty('--soft-white', t.bgPrimary);
    root.style.setProperty('--text-dark', t.text);
    root.style.setProperty('--text-medium', t.textMedium);
    root.style.setProperty('--text-light', t.textLight);
}

function startThemeRotation() { /* Single theme — no rotation */ }
