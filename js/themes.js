// ========================================
// 10 UNIQUE PASTEL COLOR THEMES
// Each visit = random theme with unique colors, shapes, images
// ========================================

const THEMES = [
    {
        name: 'rose-garden',
        label: 'Rose Garden',
        primary: '#E8909C',
        primaryLight: '#FFD1DC',
        secondary: '#F4A7B9',
        accent: '#D4607A',
        accentDeep: '#B83B5E',
        soft: '#FFF0F3',
        lavender: '#F8D1E0',
        mint: '#FCE4EC',
        cream: '#FFF5F7',
        gold: '#E8A87C',
        text: '#5C2434',
        textMed: '#7A3B52',
        textLight: '#A0596F',
        gradientHero: 'linear-gradient(135deg, #FFF0F3 0%, #FFE0E6 25%, #FFF0F3 50%, #FFD1DC 75%, #FFF0F3 100%)',
        gradientPrimary: 'linear-gradient(135deg, #FFB6C1 0%, #F4A7B9 50%, #FFD1DC 100%)',
        gradientSecondary: 'linear-gradient(135deg, #FFDAB9 0%, #FFB6C1 50%, #F4A7B9 100%)',
        particleColors: ['#FFB6C1', '#F4A7B9', '#FFD1DC', '#E8909C', '#FFDAB9'],
        shapes: ['rose', 'petal', 'leaf', 'bud'],
        floatingShapes: ['rose', 'petal', 'sparkle', 'leaf', 'star-4'],
        cursorShape: 'rose',
        sectionBadgeShape: 'rose'
    },
    {
        name: 'lavender-dreams',
        label: 'Lavender Dreams',
        primary: '#B39DDB',
        primaryLight: '#E1D5F0',
        secondary: '#CE93D8',
        accent: '#7E57C2',
        accentDeep: '#5E35B1',
        soft: '#F5F0FF',
        lavender: '#E8DEF8',
        mint: '#EDE7F6',
        cream: '#F8F4FF',
        gold: '#FFAB91',
        text: '#311B66',
        textMed: '#4A2D8A',
        textLight: '#7C66A6',
        gradientHero: 'linear-gradient(135deg, #F5F0FF 0%, #EDE7F6 25%, #F5F0FF 50%, #E8DEF8 75%, #F5F0FF 100%)',
        gradientPrimary: 'linear-gradient(135deg, #B39DDB 0%, #CE93D8 50%, #E1D5F0 100%)',
        gradientSecondary: 'linear-gradient(135deg, #FFAB91 0%, #B39DDB 50%, #CE93D8 100%)',
        particleColors: ['#B39DDB', '#CE93D8', '#E1D5F0', '#9575CD', '#D1C4E9'],
        shapes: ['butterfly', 'moon', 'cloud', 'diamond'],
        floatingShapes: ['butterfly', 'moon', 'sparkle', 'cloud', 'star-6'],
        cursorShape: 'butterfly',
        sectionBadgeShape: 'butterfly'
    },
    {
        name: 'ocean-breeze',
        label: 'Ocean Breeze',
        primary: '#80DEEA',
        primaryLight: '#B2EBF2',
        secondary: '#80CBC4',
        accent: '#00ACC1',
        accentDeep: '#00838F',
        soft: '#F0FEFF',
        lavender: '#E0F7FA',
        mint: '#E0F2F1',
        cream: '#F5FDFF',
        gold: '#FFE082',
        text: '#004D5A',
        textMed: '#006978',
        textLight: '#4DA6B0',
        gradientHero: 'linear-gradient(135deg, #F0FEFF 0%, #E0F7FA 25%, #F0FEFF 50%, #B2EBF2 75%, #F0FEFF 100%)',
        gradientPrimary: 'linear-gradient(135deg, #80DEEA 0%, #80CBC4 50%, #B2EBF2 100%)',
        gradientSecondary: 'linear-gradient(135deg, #FFE082 0%, #80DEEA 50%, #80CBC4 100%)',
        particleColors: ['#80DEEA', '#80CBC4', '#B2EBF2', '#4DD0E1', '#A7FFEB'],
        shapes: ['wave', 'shell', 'fish', 'bubble'],
        floatingShapes: ['wave', 'shell', 'sparkle', 'bubble', 'star-4'],
        cursorShape: 'shell',
        sectionBadgeShape: 'shell'
    },
    {
        name: 'sunset-glow',
        label: 'Sunset Glow',
        primary: '#FFAB91',
        primaryLight: '#FFCCBC',
        secondary: '#FF8A65',
        accent: '#F4511E',
        accentDeep: '#D84315',
        soft: '#FFF8F0',
        lavender: '#FBE9E7',
        mint: '#FFF3E0',
        cream: '#FFFAF5',
        gold: '#FFD54F',
        text: '#5D2906',
        textMed: '#7A3D14',
        textLight: '#A06840',
        gradientHero: 'linear-gradient(135deg, #FFF8F0 0%, #FBE9E7 25%, #FFF8F0 50%, #FFCCBC 75%, #FFF8F0 100%)',
        gradientPrimary: 'linear-gradient(135deg, #FFAB91 0%, #FF8A65 50%, #FFCCBC 100%)',
        gradientSecondary: 'linear-gradient(135deg, #FFD54F 0%, #FFAB91 50%, #FF8A65 100%)',
        particleColors: ['#FFAB91', '#FF8A65', '#FFCCBC', '#FF7043', '#FFE0B2'],
        shapes: ['sun', 'cloud', 'bird', 'rays'],
        floatingShapes: ['sun', 'bird', 'sparkle', 'cloud', 'star-5'],
        cursorShape: 'sun',
        sectionBadgeShape: 'sun'
    },
    {
        name: 'cherry-blossom',
        label: 'Cherry Blossom',
        primary: '#F48FB1',
        primaryLight: '#F8BBD0',
        secondary: '#F06292',
        accent: '#E91E63',
        accentDeep: '#C2185B',
        soft: '#FFF5F8',
        lavender: '#FCE4EC',
        mint: '#FFF0F5',
        cream: '#FFF8FA',
        gold: '#FFD180',
        text: '#5C0E2A',
        textMed: '#880E4F',
        textLight: '#AD3B6E',
        gradientHero: 'linear-gradient(135deg, #FFF5F8 0%, #FCE4EC 25%, #FFF5F8 50%, #F8BBD0 75%, #FFF5F8 100%)',
        gradientPrimary: 'linear-gradient(135deg, #F48FB1 0%, #F06292 50%, #F8BBD0 100%)',
        gradientSecondary: 'linear-gradient(135deg, #FFD180 0%, #F48FB1 50%, #F06292 100%)',
        particleColors: ['#F48FB1', '#F06292', '#F8BBD0', '#EC407A', '#FCE4EC'],
        shapes: ['sakura', 'petal', 'branch', 'bud'],
        floatingShapes: ['sakura', 'petal', 'sparkle', 'bud', 'star-5'],
        cursorShape: 'sakura',
        sectionBadgeShape: 'sakura'
    },
    {
        name: 'mint-meadow',
        label: 'Mint Meadow',
        primary: '#A5D6A7',
        primaryLight: '#C8E6C9',
        secondary: '#81C784',
        accent: '#43A047',
        accentDeep: '#2E7D32',
        soft: '#F5FFF5',
        lavender: '#E8F5E9',
        mint: '#F1F8E9',
        cream: '#F9FFF9',
        gold: '#FFE082',
        text: '#1B4D1E',
        textMed: '#2E6B30',
        textLight: '#5D9460',
        gradientHero: 'linear-gradient(135deg, #F5FFF5 0%, #E8F5E9 25%, #F5FFF5 50%, #C8E6C9 75%, #F5FFF5 100%)',
        gradientPrimary: 'linear-gradient(135deg, #A5D6A7 0%, #81C784 50%, #C8E6C9 100%)',
        gradientSecondary: 'linear-gradient(135deg, #FFE082 0%, #A5D6A7 50%, #81C784 100%)',
        particleColors: ['#A5D6A7', '#81C784', '#C8E6C9', '#66BB6A', '#DCEDC8'],
        shapes: ['leaf', 'clover', 'daisy', 'dewdrop'],
        floatingShapes: ['leaf', 'clover', 'sparkle', 'daisy', 'star-4'],
        cursorShape: 'leaf',
        sectionBadgeShape: 'clover'
    },
    {
        name: 'golden-hour',
        label: 'Golden Hour',
        primary: '#FFD54F',
        primaryLight: '#FFECB3',
        secondary: '#FFC107',
        accent: '#FF8F00',
        accentDeep: '#E65100',
        soft: '#FFFDF0',
        lavender: '#FFF8E1',
        mint: '#FFF3E0',
        cream: '#FFFEF5',
        gold: '#FFB74D',
        text: '#5D3A00',
        textMed: '#7A5100',
        textLight: '#A67D30',
        gradientHero: 'linear-gradient(135deg, #FFFDF0 0%, #FFF8E1 25%, #FFFDF0 50%, #FFECB3 75%, #FFFDF0 100%)',
        gradientPrimary: 'linear-gradient(135deg, #FFD54F 0%, #FFC107 50%, #FFECB3 100%)',
        gradientSecondary: 'linear-gradient(135deg, #FFB74D 0%, #FFD54F 50%, #FFC107 100%)',
        particleColors: ['#FFD54F', '#FFC107', '#FFECB3', '#FFCA28', '#FFE082'],
        shapes: ['sunburst', 'crown', 'gem', 'sparkle-big'],
        floatingShapes: ['sunburst', 'crown', 'sparkle', 'gem', 'star-6'],
        cursorShape: 'crown',
        sectionBadgeShape: 'crown'
    },
    {
        name: 'twilight-violet',
        label: 'Twilight Violet',
        primary: '#9FA8DA',
        primaryLight: '#C5CAE9',
        secondary: '#7986CB',
        accent: '#3F51B5',
        accentDeep: '#283593',
        soft: '#F5F5FF',
        lavender: '#E8EAF6',
        mint: '#EDEDFF',
        cream: '#F8F8FF',
        gold: '#FFE57F',
        text: '#1A237E',
        textMed: '#303F9F',
        textLight: '#5C6BC0',
        gradientHero: 'linear-gradient(135deg, #F5F5FF 0%, #E8EAF6 25%, #F5F5FF 50%, #C5CAE9 75%, #F5F5FF 100%)',
        gradientPrimary: 'linear-gradient(135deg, #9FA8DA 0%, #7986CB 50%, #C5CAE9 100%)',
        gradientSecondary: 'linear-gradient(135deg, #FFE57F 0%, #9FA8DA 50%, #7986CB 100%)',
        particleColors: ['#9FA8DA', '#7986CB', '#C5CAE9', '#5C6BC0', '#D1C4E9'],
        shapes: ['moon', 'star-6', 'comet', 'constellation'],
        floatingShapes: ['moon', 'star-6', 'sparkle', 'comet', 'star-4'],
        cursorShape: 'star-6',
        sectionBadgeShape: 'moon'
    },
    {
        name: 'peach-paradise',
        label: 'Peach Paradise',
        primary: '#FFAB91',
        primaryLight: '#FFCCBC',
        secondary: '#FF8A80',
        accent: '#FF5252',
        accentDeep: '#D32F2F',
        soft: '#FFF8F5',
        lavender: '#FFEBEE',
        mint: '#FBE9E7',
        cream: '#FFFAF8',
        gold: '#FFE0B2',
        text: '#5D1616',
        textMed: '#8A2A2A',
        textLight: '#B05050',
        gradientHero: 'linear-gradient(135deg, #FFF8F5 0%, #FFEBEE 25%, #FFF8F5 50%, #FFCCBC 75%, #FFF8F5 100%)',
        gradientPrimary: 'linear-gradient(135deg, #FFAB91 0%, #FF8A80 50%, #FFCCBC 100%)',
        gradientSecondary: 'linear-gradient(135deg, #FFE0B2 0%, #FFAB91 50%, #FF8A80 100%)',
        particleColors: ['#FFAB91', '#FF8A80', '#FFCCBC', '#FF7043', '#FFCDD2'],
        shapes: ['peach', 'cherry', 'strawberry', 'blossom'],
        floatingShapes: ['peach', 'cherry', 'sparkle', 'blossom', 'star-5'],
        cursorShape: 'cherry',
        sectionBadgeShape: 'peach'
    },
    {
        name: 'cotton-candy',
        label: 'Cotton Candy',
        primary: '#E1BEE7',
        primaryLight: '#F3E5F5',
        secondary: '#F48FB1',
        accent: '#AB47BC',
        accentDeep: '#8E24AA',
        soft: '#FFF5FF',
        lavender: '#F3E5F5',
        mint: '#FCE4EC',
        cream: '#FFF8FF',
        gold: '#FFE082',
        text: '#4A0E5C',
        textMed: '#6A1B7A',
        textLight: '#9C4DAC',
        gradientHero: 'linear-gradient(135deg, #FFF5FF 0%, #F3E5F5 25%, #FFF5FF 50%, #FCE4EC 75%, #FFF5FF 100%)',
        gradientPrimary: 'linear-gradient(135deg, #E1BEE7 0%, #F48FB1 50%, #F3E5F5 100%)',
        gradientSecondary: 'linear-gradient(135deg, #FFE082 0%, #E1BEE7 50%, #F48FB1 100%)',
        particleColors: ['#E1BEE7', '#F48FB1', '#F3E5F5', '#CE93D8', '#F8BBD0'],
        shapes: ['candy', 'lollipop', 'swirl', 'bow'],
        floatingShapes: ['candy', 'lollipop', 'sparkle', 'bow', 'star-4'],
        cursorShape: 'candy',
        sectionBadgeShape: 'candy'
    }
];

// Pick a random theme per session
let currentTheme = null;

function initTheme() {
    const themeIndex = Math.floor(Math.random() * THEMES.length);
    currentTheme = THEMES[themeIndex];
    applyTheme(currentTheme);
    console.log('Theme: ' + currentTheme.label);
}

function applyTheme(theme) {
    const root = document.documentElement;
    root.style.setProperty('--pastel-pink', theme.primary);
    root.style.setProperty('--pastel-rose', theme.primaryLight);
    root.style.setProperty('--pastel-peach', theme.secondary);
    root.style.setProperty('--pastel-lavender', theme.lavender);
    root.style.setProperty('--pastel-lilac', theme.secondary);
    root.style.setProperty('--pastel-mint', theme.mint);
    root.style.setProperty('--pastel-sky', theme.primaryLight);
    root.style.setProperty('--pastel-cream', theme.cream);
    root.style.setProperty('--pastel-coral', theme.accent);
    root.style.setProperty('--pastel-mauve', theme.secondary);
    root.style.setProperty('--deep-rose', theme.accentDeep);
    root.style.setProperty('--deep-pink', theme.accent);
    root.style.setProperty('--gold', theme.gold);
    root.style.setProperty('--soft-white', theme.soft);
    root.style.setProperty('--text-dark', theme.text);
    root.style.setProperty('--text-medium', theme.textMed);
    root.style.setProperty('--text-light', theme.textLight);
    root.style.setProperty('--gradient-primary', theme.gradientPrimary);
    root.style.setProperty('--gradient-secondary', theme.gradientSecondary);
    root.style.setProperty('--gradient-hero', theme.gradientHero);
    root.style.setProperty('--shadow-soft', `0 4px 20px ${theme.primary}4D`);
    root.style.setProperty('--shadow-medium', `0 8px 32px ${theme.primary}66`);
    root.style.setProperty('--shadow-strong', `0 12px 48px ${theme.secondary}4D`);

    // Update scrollbar colors
    const styleEl = document.getElementById('theme-dynamic-styles') || document.createElement('style');
    styleEl.id = 'theme-dynamic-styles';
    styleEl.textContent = `
        ::-webkit-scrollbar-track { background: ${theme.primaryLight}; }
        ::-webkit-scrollbar-thumb { background: ${theme.primary}; }
        ::-webkit-scrollbar-thumb:hover { background: ${theme.accent}; }
        .loading-screen { background: linear-gradient(135deg, ${theme.soft}, ${theme.mint}, ${theme.lavender}); background-size: 400% 400%; animation: gradientShift 8s ease infinite; }
        .countdown-screen { background: linear-gradient(135deg, ${theme.soft}, ${theme.lavender}, ${theme.mint}); background-size: 400% 400%; animation: gradientShift 8s ease infinite; }
        .countdown-num { color: ${theme.accentDeep}; text-shadow: 0 0 40px ${theme.accentDeep}4D; }
        .loading-bar { background: linear-gradient(90deg, ${theme.primary}, ${theme.secondary}, ${theme.accentDeep}); }
        .timeline-section { background: linear-gradient(180deg, ${theme.soft}, ${theme.mint}); }
        .quotes-section { background: linear-gradient(180deg, ${theme.mint} 0%, ${theme.soft} 100%); }
        .games-section { background: linear-gradient(180deg, ${theme.soft} 0%, ${theme.lavender} 100%); }
        .main-footer { background: linear-gradient(135deg, ${theme.mint}, ${theme.lavender}); }
        .letter-section { background: ${theme.gradientHero}; background-size: 400% 400%; animation: gradientShift 15s ease infinite; }
        .catch-area { background: linear-gradient(180deg, ${theme.mint}, ${theme.lavender}); border-color: ${theme.primary}; }
        .confetti-colors { --c1: ${theme.particleColors[0]}; --c2: ${theme.particleColors[1]}; --c3: ${theme.particleColors[2]}; --c4: ${theme.particleColors[3]}; --c5: ${theme.particleColors[4]}; }
    `;
    if (!document.getElementById('theme-dynamic-styles')) {
        document.head.appendChild(styleEl);
    }
}
