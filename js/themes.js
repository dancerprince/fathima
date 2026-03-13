// ========================================
// 40 UNIQUE PASTEL COLOR THEMES
// Auto-rotates every 20 seconds with smooth transitions
// Floating shapes change every 10 seconds
// ========================================

const THEMES = [
    // === ORIGINAL 10 THEMES ===
    {
        name: 'rose-garden', label: 'Rose Garden 🌹',
        primary: '#E8909C', primaryLight: '#FFD1DC', secondary: '#F4A7B9',
        accent: '#D4607A', accentDeep: '#B83B5E', soft: '#FFF0F3',
        lavender: '#F8D1E0', mint: '#FCE4EC', cream: '#FFF5F7', gold: '#E8A87C',
        text: '#5C2434', textMed: '#7A3B52', textLight: '#A0596F',
        gradientHero: 'linear-gradient(135deg, #FFF0F3 0%, #FFE0E6 25%, #FFF0F3 50%, #FFD1DC 75%, #FFF0F3 100%)',
        gradientPrimary: 'linear-gradient(135deg, #FFB6C1 0%, #F4A7B9 50%, #FFD1DC 100%)',
        gradientSecondary: 'linear-gradient(135deg, #FFDAB9 0%, #FFB6C1 50%, #F4A7B9 100%)',
        particleColors: ['#FFB6C1', '#F4A7B9', '#FFD1DC', '#E8909C', '#FFDAB9'],
        shapes: ['rose', 'petal', 'leaf', 'bud'],
        floatingShapes: ['rose', 'petal', 'sparkle', 'leaf', 'star-4'],
        cursorShape: 'rose', sectionBadgeShape: 'rose'
    },
    {
        name: 'lavender-dreams', label: 'Lavender Dreams 💜',
        primary: '#B39DDB', primaryLight: '#E1D5F0', secondary: '#CE93D8',
        accent: '#7E57C2', accentDeep: '#5E35B1', soft: '#F5F0FF',
        lavender: '#E8DEF8', mint: '#EDE7F6', cream: '#F8F4FF', gold: '#FFAB91',
        text: '#311B66', textMed: '#4A2D8A', textLight: '#7C66A6',
        gradientHero: 'linear-gradient(135deg, #F5F0FF 0%, #EDE7F6 25%, #F5F0FF 50%, #E8DEF8 75%, #F5F0FF 100%)',
        gradientPrimary: 'linear-gradient(135deg, #B39DDB 0%, #CE93D8 50%, #E1D5F0 100%)',
        gradientSecondary: 'linear-gradient(135deg, #FFAB91 0%, #B39DDB 50%, #CE93D8 100%)',
        particleColors: ['#B39DDB', '#CE93D8', '#E1D5F0', '#9575CD', '#D1C4E9'],
        shapes: ['butterfly', 'moon', 'cloud', 'diamond'],
        floatingShapes: ['butterfly', 'moon', 'sparkle', 'cloud', 'star-6'],
        cursorShape: 'butterfly', sectionBadgeShape: 'butterfly'
    },
    {
        name: 'ocean-breeze', label: 'Ocean Breeze 🌊',
        primary: '#80DEEA', primaryLight: '#B2EBF2', secondary: '#80CBC4',
        accent: '#00ACC1', accentDeep: '#00838F', soft: '#F0FEFF',
        lavender: '#E0F7FA', mint: '#E0F2F1', cream: '#F5FDFF', gold: '#FFE082',
        text: '#004D5A', textMed: '#006978', textLight: '#4DA6B0',
        gradientHero: 'linear-gradient(135deg, #F0FEFF 0%, #E0F7FA 25%, #F0FEFF 50%, #B2EBF2 75%, #F0FEFF 100%)',
        gradientPrimary: 'linear-gradient(135deg, #80DEEA 0%, #80CBC4 50%, #B2EBF2 100%)',
        gradientSecondary: 'linear-gradient(135deg, #FFE082 0%, #80DEEA 50%, #80CBC4 100%)',
        particleColors: ['#80DEEA', '#80CBC4', '#B2EBF2', '#4DD0E1', '#A7FFEB'],
        shapes: ['wave', 'shell', 'fish', 'bubble'],
        floatingShapes: ['wave', 'shell', 'sparkle', 'bubble', 'star-4'],
        cursorShape: 'shell', sectionBadgeShape: 'shell'
    },
    {
        name: 'sunset-glow', label: 'Sunset Glow 🌅',
        primary: '#FFAB91', primaryLight: '#FFCCBC', secondary: '#FF8A65',
        accent: '#F4511E', accentDeep: '#D84315', soft: '#FFF8F0',
        lavender: '#FBE9E7', mint: '#FFF3E0', cream: '#FFFAF5', gold: '#FFD54F',
        text: '#5D2906', textMed: '#7A3D14', textLight: '#A06840',
        gradientHero: 'linear-gradient(135deg, #FFF8F0 0%, #FBE9E7 25%, #FFF8F0 50%, #FFCCBC 75%, #FFF8F0 100%)',
        gradientPrimary: 'linear-gradient(135deg, #FFAB91 0%, #FF8A65 50%, #FFCCBC 100%)',
        gradientSecondary: 'linear-gradient(135deg, #FFD54F 0%, #FFAB91 50%, #FF8A65 100%)',
        particleColors: ['#FFAB91', '#FF8A65', '#FFCCBC', '#FF7043', '#FFE0B2'],
        shapes: ['sun', 'cloud', 'bird', 'rays'],
        floatingShapes: ['sun', 'bird', 'sparkle', 'cloud', 'star-5'],
        cursorShape: 'sun', sectionBadgeShape: 'sun'
    },
    {
        name: 'cherry-blossom', label: 'Cherry Blossom 🌸',
        primary: '#F48FB1', primaryLight: '#F8BBD0', secondary: '#F06292',
        accent: '#E91E63', accentDeep: '#C2185B', soft: '#FFF5F8',
        lavender: '#FCE4EC', mint: '#FFF0F5', cream: '#FFF8FA', gold: '#FFD180',
        text: '#5C0E2A', textMed: '#880E4F', textLight: '#AD3B6E',
        gradientHero: 'linear-gradient(135deg, #FFF5F8 0%, #FCE4EC 25%, #FFF5F8 50%, #F8BBD0 75%, #FFF5F8 100%)',
        gradientPrimary: 'linear-gradient(135deg, #F48FB1 0%, #F06292 50%, #F8BBD0 100%)',
        gradientSecondary: 'linear-gradient(135deg, #FFD180 0%, #F48FB1 50%, #F06292 100%)',
        particleColors: ['#F48FB1', '#F06292', '#F8BBD0', '#EC407A', '#FCE4EC'],
        shapes: ['sakura', 'petal', 'branch', 'bud'],
        floatingShapes: ['sakura', 'petal', 'sparkle', 'bud', 'star-5'],
        cursorShape: 'sakura', sectionBadgeShape: 'sakura'
    },
    {
        name: 'mint-meadow', label: 'Mint Meadow 🌿',
        primary: '#A5D6A7', primaryLight: '#C8E6C9', secondary: '#81C784',
        accent: '#43A047', accentDeep: '#2E7D32', soft: '#F5FFF5',
        lavender: '#E8F5E9', mint: '#F1F8E9', cream: '#F9FFF9', gold: '#FFE082',
        text: '#1B4D1E', textMed: '#2E6B30', textLight: '#5D9460',
        gradientHero: 'linear-gradient(135deg, #F5FFF5 0%, #E8F5E9 25%, #F5FFF5 50%, #C8E6C9 75%, #F5FFF5 100%)',
        gradientPrimary: 'linear-gradient(135deg, #A5D6A7 0%, #81C784 50%, #C8E6C9 100%)',
        gradientSecondary: 'linear-gradient(135deg, #FFE082 0%, #A5D6A7 50%, #81C784 100%)',
        particleColors: ['#A5D6A7', '#81C784', '#C8E6C9', '#66BB6A', '#DCEDC8'],
        shapes: ['leaf', 'clover', 'daisy', 'dewdrop'],
        floatingShapes: ['leaf', 'clover', 'sparkle', 'daisy', 'star-4'],
        cursorShape: 'leaf', sectionBadgeShape: 'clover'
    },
    {
        name: 'golden-hour', label: 'Golden Hour ✨',
        primary: '#FFD54F', primaryLight: '#FFECB3', secondary: '#FFC107',
        accent: '#FF8F00', accentDeep: '#E65100', soft: '#FFFDF0',
        lavender: '#FFF8E1', mint: '#FFF3E0', cream: '#FFFEF5', gold: '#FFB74D',
        text: '#5D3A00', textMed: '#7A5100', textLight: '#A67D30',
        gradientHero: 'linear-gradient(135deg, #FFFDF0 0%, #FFF8E1 25%, #FFFDF0 50%, #FFECB3 75%, #FFFDF0 100%)',
        gradientPrimary: 'linear-gradient(135deg, #FFD54F 0%, #FFC107 50%, #FFECB3 100%)',
        gradientSecondary: 'linear-gradient(135deg, #FFB74D 0%, #FFD54F 50%, #FFC107 100%)',
        particleColors: ['#FFD54F', '#FFC107', '#FFECB3', '#FFCA28', '#FFE082'],
        shapes: ['sunburst', 'crown', 'gem', 'sparkle-big'],
        floatingShapes: ['sunburst', 'crown', 'sparkle', 'gem', 'star-6'],
        cursorShape: 'crown', sectionBadgeShape: 'crown'
    },
    {
        name: 'twilight-violet', label: 'Twilight Violet 🔮',
        primary: '#9FA8DA', primaryLight: '#C5CAE9', secondary: '#7986CB',
        accent: '#3F51B5', accentDeep: '#283593', soft: '#F5F5FF',
        lavender: '#E8EAF6', mint: '#EDEDFF', cream: '#F8F8FF', gold: '#FFE57F',
        text: '#1A237E', textMed: '#303F9F', textLight: '#5C6BC0',
        gradientHero: 'linear-gradient(135deg, #F5F5FF 0%, #E8EAF6 25%, #F5F5FF 50%, #C5CAE9 75%, #F5F5FF 100%)',
        gradientPrimary: 'linear-gradient(135deg, #9FA8DA 0%, #7986CB 50%, #C5CAE9 100%)',
        gradientSecondary: 'linear-gradient(135deg, #FFE57F 0%, #9FA8DA 50%, #7986CB 100%)',
        particleColors: ['#9FA8DA', '#7986CB', '#C5CAE9', '#5C6BC0', '#D1C4E9'],
        shapes: ['moon', 'star-6', 'comet', 'constellation'],
        floatingShapes: ['moon', 'star-6', 'sparkle', 'comet', 'star-4'],
        cursorShape: 'star-6', sectionBadgeShape: 'moon'
    },
    {
        name: 'peach-paradise', label: 'Peach Paradise 🍑',
        primary: '#FFAB91', primaryLight: '#FFCCBC', secondary: '#FF8A80',
        accent: '#FF5252', accentDeep: '#D32F2F', soft: '#FFF8F5',
        lavender: '#FFEBEE', mint: '#FBE9E7', cream: '#FFFAF8', gold: '#FFE0B2',
        text: '#5D1616', textMed: '#8A2A2A', textLight: '#B05050',
        gradientHero: 'linear-gradient(135deg, #FFF8F5 0%, #FFEBEE 25%, #FFF8F5 50%, #FFCCBC 75%, #FFF8F5 100%)',
        gradientPrimary: 'linear-gradient(135deg, #FFAB91 0%, #FF8A80 50%, #FFCCBC 100%)',
        gradientSecondary: 'linear-gradient(135deg, #FFE0B2 0%, #FFAB91 50%, #FF8A80 100%)',
        particleColors: ['#FFAB91', '#FF8A80', '#FFCCBC', '#FF7043', '#FFCDD2'],
        shapes: ['peach', 'cherry', 'strawberry', 'blossom'],
        floatingShapes: ['peach', 'cherry', 'sparkle', 'blossom', 'star-5'],
        cursorShape: 'cherry', sectionBadgeShape: 'peach'
    },
    {
        name: 'cotton-candy', label: 'Cotton Candy 🍬',
        primary: '#E1BEE7', primaryLight: '#F3E5F5', secondary: '#F48FB1',
        accent: '#AB47BC', accentDeep: '#8E24AA', soft: '#FFF5FF',
        lavender: '#F3E5F5', mint: '#FCE4EC', cream: '#FFF8FF', gold: '#FFE082',
        text: '#4A0E5C', textMed: '#6A1B7A', textLight: '#9C4DAC',
        gradientHero: 'linear-gradient(135deg, #FFF5FF 0%, #F3E5F5 25%, #FFF5FF 50%, #FCE4EC 75%, #FFF5FF 100%)',
        gradientPrimary: 'linear-gradient(135deg, #E1BEE7 0%, #F48FB1 50%, #F3E5F5 100%)',
        gradientSecondary: 'linear-gradient(135deg, #FFE082 0%, #E1BEE7 50%, #F48FB1 100%)',
        particleColors: ['#E1BEE7', '#F48FB1', '#F3E5F5', '#CE93D8', '#F8BBD0'],
        shapes: ['candy', 'lollipop', 'swirl', 'bow'],
        floatingShapes: ['candy', 'lollipop', 'sparkle', 'bow', 'star-4'],
        cursorShape: 'candy', sectionBadgeShape: 'candy'
    },

    // === 30 NEW THEMES ===
    {
        name: 'moonlit-pearl', label: 'Moonlit Pearl 🌙',
        primary: '#CFD8DC', primaryLight: '#ECEFF1', secondary: '#B0BEC5',
        accent: '#78909C', accentDeep: '#546E7A', soft: '#F8FAFB',
        lavender: '#ECEFF1', mint: '#F5F5F5', cream: '#FAFAFA', gold: '#FFE0B2',
        text: '#263238', textMed: '#455A64', textLight: '#78909C',
        gradientHero: 'linear-gradient(135deg, #F8FAFB 0%, #ECEFF1 25%, #F8FAFB 50%, #CFD8DC 75%, #F8FAFB 100%)',
        gradientPrimary: 'linear-gradient(135deg, #CFD8DC 0%, #B0BEC5 50%, #ECEFF1 100%)',
        gradientSecondary: 'linear-gradient(135deg, #FFE0B2 0%, #CFD8DC 50%, #B0BEC5 100%)',
        particleColors: ['#CFD8DC', '#B0BEC5', '#ECEFF1', '#90A4AE', '#E0E0E0'],
        shapes: ['moon', 'star-6', 'sparkle', 'diamond'],
        floatingShapes: ['moon', 'star-6', 'sparkle', 'diamond', 'star-4'],
        cursorShape: 'moon', sectionBadgeShape: 'diamond'
    },
    {
        name: 'strawberry-milk', label: 'Strawberry Milk 🍓',
        primary: '#F8BBD0', primaryLight: '#FCE4EC', secondary: '#F48FB1',
        accent: '#EC407A', accentDeep: '#C2185B', soft: '#FFF8FA',
        lavender: '#FCE4EC', mint: '#FFF0F5', cream: '#FFFAFB', gold: '#FFE082',
        text: '#6A1039', textMed: '#8E244C', textLight: '#C25D80',
        gradientHero: 'linear-gradient(135deg, #FFF8FA 0%, #FCE4EC 25%, #FFF8FA 50%, #F8BBD0 75%, #FFF8FA 100%)',
        gradientPrimary: 'linear-gradient(135deg, #F8BBD0 0%, #F48FB1 50%, #FCE4EC 100%)',
        gradientSecondary: 'linear-gradient(135deg, #FFE082 0%, #F8BBD0 50%, #F48FB1 100%)',
        particleColors: ['#F8BBD0', '#F48FB1', '#FCE4EC', '#F06292', '#FFCDD2'],
        shapes: ['strawberry', 'cherry', 'blossom', 'heart'],
        floatingShapes: ['strawberry', 'cherry', 'sparkle', 'heart', 'star-5'],
        cursorShape: 'heart', sectionBadgeShape: 'strawberry'
    },
    {
        name: 'aurora-borealis', label: 'Aurora Borealis 🌌',
        primary: '#80CBC4', primaryLight: '#B2DFDB', secondary: '#A5D6A7',
        accent: '#00897B', accentDeep: '#00695C', soft: '#F0FFF8',
        lavender: '#E0F2F1', mint: '#E8F5E9', cream: '#F5FFFA', gold: '#FFF176',
        text: '#004D40', textMed: '#00695C', textLight: '#4DB6AC',
        gradientHero: 'linear-gradient(135deg, #F0FFF8 0%, #E0F2F1 25%, #E8F5E9 50%, #B2DFDB 75%, #F0FFF8 100%)',
        gradientPrimary: 'linear-gradient(135deg, #80CBC4 0%, #A5D6A7 50%, #B2DFDB 100%)',
        gradientSecondary: 'linear-gradient(135deg, #FFF176 0%, #80CBC4 50%, #A5D6A7 100%)',
        particleColors: ['#80CBC4', '#A5D6A7', '#B2DFDB', '#4DB6AC', '#C8E6C9'],
        shapes: ['wave', 'leaf', 'dewdrop', 'bubble'],
        floatingShapes: ['wave', 'sparkle', 'leaf', 'star-6', 'bubble'],
        cursorShape: 'leaf', sectionBadgeShape: 'wave'
    },
    {
        name: 'coral-reef', label: 'Coral Reef 🪸',
        primary: '#FF8A80', primaryLight: '#FFCDD2', secondary: '#FF80AB',
        accent: '#FF1744', accentDeep: '#C62828', soft: '#FFF5F5',
        lavender: '#FFEBEE', mint: '#FCE4EC', cream: '#FFFAFA', gold: '#FFD180',
        text: '#6B1010', textMed: '#A01A1A', textLight: '#C95050',
        gradientHero: 'linear-gradient(135deg, #FFF5F5 0%, #FFEBEE 25%, #FFF5F5 50%, #FFCDD2 75%, #FFF5F5 100%)',
        gradientPrimary: 'linear-gradient(135deg, #FF8A80 0%, #FF80AB 50%, #FFCDD2 100%)',
        gradientSecondary: 'linear-gradient(135deg, #FFD180 0%, #FF8A80 50%, #FF80AB 100%)',
        particleColors: ['#FF8A80', '#FF80AB', '#FFCDD2', '#EF5350', '#F8BBD0'],
        shapes: ['shell', 'fish', 'wave', 'bubble'],
        floatingShapes: ['shell', 'fish', 'sparkle', 'wave', 'bubble'],
        cursorShape: 'shell', sectionBadgeShape: 'fish'
    },
    {
        name: 'honey-nectar', label: 'Honey Nectar 🍯',
        primary: '#FFD54F', primaryLight: '#FFF9C4', secondary: '#FFCA28',
        accent: '#FFB300', accentDeep: '#FF8F00', soft: '#FFFEF0',
        lavender: '#FFF8E1', mint: '#FFFDE7', cream: '#FFFFF0', gold: '#FFA726',
        text: '#5D4200', textMed: '#7A5800', textLight: '#B08A30',
        gradientHero: 'linear-gradient(135deg, #FFFEF0 0%, #FFF8E1 25%, #FFFEF0 50%, #FFF9C4 75%, #FFFEF0 100%)',
        gradientPrimary: 'linear-gradient(135deg, #FFD54F 0%, #FFCA28 50%, #FFF9C4 100%)',
        gradientSecondary: 'linear-gradient(135deg, #FFA726 0%, #FFD54F 50%, #FFCA28 100%)',
        particleColors: ['#FFD54F', '#FFCA28', '#FFF9C4', '#FFB300', '#FFE082'],
        shapes: ['sunburst', 'daisy', 'blossom', 'dewdrop'],
        floatingShapes: ['sunburst', 'daisy', 'sparkle', 'blossom', 'star-5'],
        cursorShape: 'daisy', sectionBadgeShape: 'sunburst'
    },
    {
        name: 'blueberry-frost', label: 'Blueberry Frost 🫐',
        primary: '#90CAF9', primaryLight: '#BBDEFB', secondary: '#64B5F6',
        accent: '#1E88E5', accentDeep: '#1565C0', soft: '#F5F9FF',
        lavender: '#E3F2FD', mint: '#E1F5FE', cream: '#F8FBFF', gold: '#FFE082',
        text: '#0D3B66', textMed: '#1565C0', textLight: '#5090C0',
        gradientHero: 'linear-gradient(135deg, #F5F9FF 0%, #E3F2FD 25%, #F5F9FF 50%, #BBDEFB 75%, #F5F9FF 100%)',
        gradientPrimary: 'linear-gradient(135deg, #90CAF9 0%, #64B5F6 50%, #BBDEFB 100%)',
        gradientSecondary: 'linear-gradient(135deg, #FFE082 0%, #90CAF9 50%, #64B5F6 100%)',
        particleColors: ['#90CAF9', '#64B5F6', '#BBDEFB', '#42A5F5', '#E3F2FD'],
        shapes: ['cloud', 'bubble', 'dewdrop', 'diamond'],
        floatingShapes: ['cloud', 'bubble', 'sparkle', 'diamond', 'star-6'],
        cursorShape: 'diamond', sectionBadgeShape: 'cloud'
    },
    {
        name: 'fairy-dust', label: 'Fairy Dust 🧚',
        primary: '#CE93D8', primaryLight: '#E1BEE7', secondary: '#BA68C8',
        accent: '#9C27B0', accentDeep: '#7B1FA2', soft: '#FBF0FF',
        lavender: '#F3E5F5', mint: '#EDE7F6', cream: '#FDF5FF', gold: '#FFE082',
        text: '#4A0072', textMed: '#6A1B9A', textLight: '#9C5CB5',
        gradientHero: 'linear-gradient(135deg, #FBF0FF 0%, #F3E5F5 25%, #FBF0FF 50%, #E1BEE7 75%, #FBF0FF 100%)',
        gradientPrimary: 'linear-gradient(135deg, #CE93D8 0%, #BA68C8 50%, #E1BEE7 100%)',
        gradientSecondary: 'linear-gradient(135deg, #FFE082 0%, #CE93D8 50%, #BA68C8 100%)',
        particleColors: ['#CE93D8', '#BA68C8', '#E1BEE7', '#AB47BC', '#F3E5F5'],
        shapes: ['butterfly', 'sparkle-big', 'star-5', 'bow'],
        floatingShapes: ['butterfly', 'sparkle-big', 'sparkle', 'bow', 'star-5'],
        cursorShape: 'butterfly', sectionBadgeShape: 'sparkle-big'
    },
    {
        name: 'sakura-rain', label: 'Sakura Rain 🎀',
        primary: '#EF9A9A', primaryLight: '#FFCDD2', secondary: '#E57373',
        accent: '#EF5350', accentDeep: '#E53935', soft: '#FFF5F5',
        lavender: '#FFEBEE', mint: '#FFCDD2', cream: '#FFF8F8', gold: '#FFE0B2',
        text: '#6B1A1A', textMed: '#B71C1C', textLight: '#D35050',
        gradientHero: 'linear-gradient(135deg, #FFF5F5 0%, #FFEBEE 25%, #FFF5F5 50%, #FFCDD2 75%, #FFF5F5 100%)',
        gradientPrimary: 'linear-gradient(135deg, #EF9A9A 0%, #E57373 50%, #FFCDD2 100%)',
        gradientSecondary: 'linear-gradient(135deg, #FFE0B2 0%, #EF9A9A 50%, #E57373 100%)',
        particleColors: ['#EF9A9A', '#E57373', '#FFCDD2', '#EF5350', '#FFCDD2'],
        shapes: ['sakura', 'petal', 'bud', 'branch'],
        floatingShapes: ['sakura', 'petal', 'sparkle', 'bud', 'star-4'],
        cursorShape: 'sakura', sectionBadgeShape: 'sakura'
    },
    {
        name: 'tropical-paradise', label: 'Tropical Paradise 🌴',
        primary: '#AED581', primaryLight: '#DCEDC8', secondary: '#81C784',
        accent: '#689F38', accentDeep: '#558B2F', soft: '#F8FFF0',
        lavender: '#F1F8E9', mint: '#E8F5E9', cream: '#FCFFF5', gold: '#FFD54F',
        text: '#1B4A1B', textMed: '#33691E', textLight: '#689F38',
        gradientHero: 'linear-gradient(135deg, #F8FFF0 0%, #F1F8E9 25%, #F8FFF0 50%, #DCEDC8 75%, #F8FFF0 100%)',
        gradientPrimary: 'linear-gradient(135deg, #AED581 0%, #81C784 50%, #DCEDC8 100%)',
        gradientSecondary: 'linear-gradient(135deg, #FFD54F 0%, #AED581 50%, #81C784 100%)',
        particleColors: ['#AED581', '#81C784', '#DCEDC8', '#9CCC65', '#C8E6C9'],
        shapes: ['leaf', 'sun', 'bird', 'blossom'],
        floatingShapes: ['leaf', 'sun', 'sparkle', 'bird', 'blossom'],
        cursorShape: 'leaf', sectionBadgeShape: 'sun'
    },
    {
        name: 'velvet-plum', label: 'Velvet Plum 🍇',
        primary: '#B39DDB', primaryLight: '#D1C4E9', secondary: '#9575CD',
        accent: '#673AB7', accentDeep: '#512DA8', soft: '#F5F0FF',
        lavender: '#EDE7F6', mint: '#E8EAF6', cream: '#F8F5FF', gold: '#FFD180',
        text: '#311B66', textMed: '#512DA8', textLight: '#7E57C2',
        gradientHero: 'linear-gradient(135deg, #F5F0FF 0%, #EDE7F6 25%, #F5F0FF 50%, #D1C4E9 75%, #F5F0FF 100%)',
        gradientPrimary: 'linear-gradient(135deg, #B39DDB 0%, #9575CD 50%, #D1C4E9 100%)',
        gradientSecondary: 'linear-gradient(135deg, #FFD180 0%, #B39DDB 50%, #9575CD 100%)',
        particleColors: ['#B39DDB', '#9575CD', '#D1C4E9', '#7E57C2', '#EDE7F6'],
        shapes: ['gem', 'crown', 'diamond', 'sparkle-big'],
        floatingShapes: ['gem', 'crown', 'sparkle', 'diamond', 'star-6'],
        cursorShape: 'gem', sectionBadgeShape: 'crown'
    },
    {
        name: 'mango-lassi', label: 'Mango Lassi 🥭',
        primary: '#FFE082', primaryLight: '#FFF8E1', secondary: '#FFD54F',
        accent: '#FFA000', accentDeep: '#FF8F00', soft: '#FFFEF5',
        lavender: '#FFF8E1', mint: '#FFFDE7', cream: '#FFFFF8', gold: '#FFB74D',
        text: '#5D3E00', textMed: '#7A5600', textLight: '#B08C30',
        gradientHero: 'linear-gradient(135deg, #FFFEF5 0%, #FFF8E1 25%, #FFFEF5 50%, #FFE082 75%, #FFFEF5 100%)',
        gradientPrimary: 'linear-gradient(135deg, #FFE082 0%, #FFD54F 50%, #FFF8E1 100%)',
        gradientSecondary: 'linear-gradient(135deg, #FFB74D 0%, #FFE082 50%, #FFD54F 100%)',
        particleColors: ['#FFE082', '#FFD54F', '#FFF8E1', '#FFC107', '#FFECB3'],
        shapes: ['sun', 'sunburst', 'daisy', 'sparkle-big'],
        floatingShapes: ['sun', 'sunburst', 'sparkle', 'daisy', 'star-5'],
        cursorShape: 'sun', sectionBadgeShape: 'sunburst'
    },
    {
        name: 'pistachio-dream', label: 'Pistachio Dream 🌱',
        primary: '#C5E1A5', primaryLight: '#DCEDC8', secondary: '#AED581',
        accent: '#7CB342', accentDeep: '#558B2F', soft: '#F8FFF5',
        lavender: '#F1F8E9', mint: '#DCEDC8', cream: '#FBFFF5', gold: '#FFE082',
        text: '#2E4A1B', textMed: '#4A6B2E', textLight: '#7A9D55',
        gradientHero: 'linear-gradient(135deg, #F8FFF5 0%, #F1F8E9 25%, #F8FFF5 50%, #DCEDC8 75%, #F8FFF5 100%)',
        gradientPrimary: 'linear-gradient(135deg, #C5E1A5 0%, #AED581 50%, #DCEDC8 100%)',
        gradientSecondary: 'linear-gradient(135deg, #FFE082 0%, #C5E1A5 50%, #AED581 100%)',
        particleColors: ['#C5E1A5', '#AED581', '#DCEDC8', '#9CCC65', '#F1F8E9'],
        shapes: ['clover', 'leaf', 'dewdrop', 'daisy'],
        floatingShapes: ['clover', 'leaf', 'sparkle', 'dewdrop', 'star-4'],
        cursorShape: 'clover', sectionBadgeShape: 'leaf'
    },
    {
        name: 'lemon-sorbet', label: 'Lemon Sorbet 🍋',
        primary: '#FFF176', primaryLight: '#FFF9C4', secondary: '#FFEE58',
        accent: '#FDD835', accentDeep: '#F9A825', soft: '#FFFFF5',
        lavender: '#FFFDE7', mint: '#FFF9C4', cream: '#FFFFF8', gold: '#FFB74D',
        text: '#5D5200', textMed: '#827200', textLight: '#B0A040',
        gradientHero: 'linear-gradient(135deg, #FFFFF5 0%, #FFFDE7 25%, #FFFFF5 50%, #FFF9C4 75%, #FFFFF5 100%)',
        gradientPrimary: 'linear-gradient(135deg, #FFF176 0%, #FFEE58 50%, #FFF9C4 100%)',
        gradientSecondary: 'linear-gradient(135deg, #FFB74D 0%, #FFF176 50%, #FFEE58 100%)',
        particleColors: ['#FFF176', '#FFEE58', '#FFF9C4', '#FFEB3B', '#FFF8E1'],
        shapes: ['sun', 'sparkle-big', 'sunburst', 'star-5'],
        floatingShapes: ['sun', 'sparkle-big', 'sparkle', 'star-5', 'star-4'],
        cursorShape: 'sunburst', sectionBadgeShape: 'sun'
    },
    {
        name: 'rosewater-silk', label: 'Rosewater Silk 🌺',
        primary: '#F8BBD0', primaryLight: '#FDE4EC', secondary: '#F48FB1',
        accent: '#E91E63', accentDeep: '#AD1457', soft: '#FFF8FA',
        lavender: '#FCE4EC', mint: '#FFF0F5', cream: '#FFFAFB', gold: '#FFE082',
        text: '#5A0E30', textMed: '#880E4F', textLight: '#C2558A',
        gradientHero: 'linear-gradient(135deg, #FFF8FA 0%, #FCE4EC 25%, #FFF8FA 50%, #FDE4EC 75%, #FFF8FA 100%)',
        gradientPrimary: 'linear-gradient(135deg, #F8BBD0 0%, #F48FB1 50%, #FDE4EC 100%)',
        gradientSecondary: 'linear-gradient(135deg, #FFE082 0%, #F8BBD0 50%, #F48FB1 100%)',
        particleColors: ['#F8BBD0', '#F48FB1', '#FDE4EC', '#F06292', '#FCE4EC'],
        shapes: ['rose', 'petal', 'bud', 'ribbon'],
        floatingShapes: ['rose', 'petal', 'sparkle', 'bud', 'heart'],
        cursorShape: 'rose', sectionBadgeShape: 'rose'
    },
    {
        name: 'arctic-ice', label: 'Arctic Ice ❄️',
        primary: '#B3E5FC', primaryLight: '#E1F5FE', secondary: '#81D4FA',
        accent: '#0288D1', accentDeep: '#01579B', soft: '#F5FCFF',
        lavender: '#E1F5FE', mint: '#E0F7FA', cream: '#F8FDFF', gold: '#FFE082',
        text: '#01466B', textMed: '#0277BD', textLight: '#4BA3D0',
        gradientHero: 'linear-gradient(135deg, #F5FCFF 0%, #E1F5FE 25%, #F5FCFF 50%, #B3E5FC 75%, #F5FCFF 100%)',
        gradientPrimary: 'linear-gradient(135deg, #B3E5FC 0%, #81D4FA 50%, #E1F5FE 100%)',
        gradientSecondary: 'linear-gradient(135deg, #FFE082 0%, #B3E5FC 50%, #81D4FA 100%)',
        particleColors: ['#B3E5FC', '#81D4FA', '#E1F5FE', '#4FC3F7', '#E0F7FA'],
        shapes: ['diamond', 'sparkle', 'star-6', 'cloud'],
        floatingShapes: ['diamond', 'sparkle', 'star-6', 'cloud', 'star-4'],
        cursorShape: 'diamond', sectionBadgeShape: 'star-6'
    },
    {
        name: 'candy-floss', label: 'Candy Floss 🎀',
        primary: '#F48FB1', primaryLight: '#F8BBD0', secondary: '#CE93D8',
        accent: '#E040FB', accentDeep: '#AA00FF', soft: '#FFF5FD',
        lavender: '#F3E5F5', mint: '#FCE4EC', cream: '#FFF8FD', gold: '#FFE082',
        text: '#5A0040', textMed: '#8E0060', textLight: '#C060A0',
        gradientHero: 'linear-gradient(135deg, #FFF5FD 0%, #F3E5F5 25%, #FCE4EC 50%, #F8BBD0 75%, #FFF5FD 100%)',
        gradientPrimary: 'linear-gradient(135deg, #F48FB1 0%, #CE93D8 50%, #F8BBD0 100%)',
        gradientSecondary: 'linear-gradient(135deg, #FFE082 0%, #F48FB1 50%, #CE93D8 100%)',
        particleColors: ['#F48FB1', '#CE93D8', '#F8BBD0', '#E1BEE7', '#FCE4EC'],
        shapes: ['candy', 'lollipop', 'bow', 'heart'],
        floatingShapes: ['candy', 'lollipop', 'sparkle', 'bow', 'heart'],
        cursorShape: 'candy', sectionBadgeShape: 'lollipop'
    },
    {
        name: 'emerald-forest', label: 'Emerald Forest 🌲',
        primary: '#A5D6A7', primaryLight: '#C8E6C9', secondary: '#66BB6A',
        accent: '#388E3C', accentDeep: '#1B5E20', soft: '#F0FFF0',
        lavender: '#E8F5E9', mint: '#C8E6C9', cream: '#F5FFF5', gold: '#FFD54F',
        text: '#1B3A1B', textMed: '#2E7D32', textLight: '#4CAF50',
        gradientHero: 'linear-gradient(135deg, #F0FFF0 0%, #E8F5E9 25%, #F0FFF0 50%, #C8E6C9 75%, #F0FFF0 100%)',
        gradientPrimary: 'linear-gradient(135deg, #A5D6A7 0%, #66BB6A 50%, #C8E6C9 100%)',
        gradientSecondary: 'linear-gradient(135deg, #FFD54F 0%, #A5D6A7 50%, #66BB6A 100%)',
        particleColors: ['#A5D6A7', '#66BB6A', '#C8E6C9', '#81C784', '#E8F5E9'],
        shapes: ['leaf', 'clover', 'dewdrop', 'branch'],
        floatingShapes: ['leaf', 'clover', 'sparkle', 'dewdrop', 'star-4'],
        cursorShape: 'leaf', sectionBadgeShape: 'clover'
    },
    {
        name: 'caramel-latte', label: 'Caramel Latte ☕',
        primary: '#FFCC80', primaryLight: '#FFE0B2', secondary: '#FFB74D',
        accent: '#F57C00', accentDeep: '#E65100', soft: '#FFF8F0',
        lavender: '#FFF3E0', mint: '#FFE0B2', cream: '#FFFAF0', gold: '#FFA726',
        text: '#5D3000', textMed: '#7A4500', textLight: '#A87530',
        gradientHero: 'linear-gradient(135deg, #FFF8F0 0%, #FFF3E0 25%, #FFF8F0 50%, #FFE0B2 75%, #FFF8F0 100%)',
        gradientPrimary: 'linear-gradient(135deg, #FFCC80 0%, #FFB74D 50%, #FFE0B2 100%)',
        gradientSecondary: 'linear-gradient(135deg, #FFA726 0%, #FFCC80 50%, #FFB74D 100%)',
        particleColors: ['#FFCC80', '#FFB74D', '#FFE0B2', '#FFA726', '#FFF3E0'],
        shapes: ['crown', 'sunburst', 'gem', 'sparkle-big'],
        floatingShapes: ['crown', 'sunburst', 'sparkle', 'gem', 'star-5'],
        cursorShape: 'crown', sectionBadgeShape: 'gem'
    },
    {
        name: 'cloud-nine', label: 'Cloud Nine ☁️',
        primary: '#B0BEC5', primaryLight: '#CFD8DC', secondary: '#90A4AE',
        accent: '#607D8B', accentDeep: '#455A64', soft: '#F5F8FA',
        lavender: '#ECEFF1', mint: '#F5F5F5', cream: '#FAFAFA', gold: '#FFE082',
        text: '#263238', textMed: '#37474F', textLight: '#607D8B',
        gradientHero: 'linear-gradient(135deg, #F5F8FA 0%, #ECEFF1 25%, #F5F8FA 50%, #CFD8DC 75%, #F5F8FA 100%)',
        gradientPrimary: 'linear-gradient(135deg, #B0BEC5 0%, #90A4AE 50%, #CFD8DC 100%)',
        gradientSecondary: 'linear-gradient(135deg, #FFE082 0%, #B0BEC5 50%, #90A4AE 100%)',
        particleColors: ['#B0BEC5', '#90A4AE', '#CFD8DC', '#78909C', '#ECEFF1'],
        shapes: ['cloud', 'bird', 'moon', 'star-4'],
        floatingShapes: ['cloud', 'bird', 'sparkle', 'moon', 'star-4'],
        cursorShape: 'cloud', sectionBadgeShape: 'bird'
    },
    {
        name: 'wisteria-garden', label: 'Wisteria Garden 💐',
        primary: '#D1C4E9', primaryLight: '#EDE7F6', secondary: '#B39DDB',
        accent: '#7C4DFF', accentDeep: '#651FFF', soft: '#F8F5FF',
        lavender: '#EDE7F6', mint: '#E8EAF6', cream: '#FAF8FF', gold: '#FFD180',
        text: '#2A1060', textMed: '#4527A0', textLight: '#7E57C2',
        gradientHero: 'linear-gradient(135deg, #F8F5FF 0%, #EDE7F6 25%, #F8F5FF 50%, #D1C4E9 75%, #F8F5FF 100%)',
        gradientPrimary: 'linear-gradient(135deg, #D1C4E9 0%, #B39DDB 50%, #EDE7F6 100%)',
        gradientSecondary: 'linear-gradient(135deg, #FFD180 0%, #D1C4E9 50%, #B39DDB 100%)',
        particleColors: ['#D1C4E9', '#B39DDB', '#EDE7F6', '#9575CD', '#E8EAF6'],
        shapes: ['blossom', 'butterfly', 'petal', 'bow'],
        floatingShapes: ['blossom', 'butterfly', 'sparkle', 'petal', 'star-6'],
        cursorShape: 'butterfly', sectionBadgeShape: 'blossom'
    },
    {
        name: 'bubblegum-pop', label: 'Bubblegum Pop 🫧',
        primary: '#F06292', primaryLight: '#F8BBD0', secondary: '#EC407A',
        accent: '#D81B60', accentDeep: '#AD1457', soft: '#FFF5F9',
        lavender: '#FCE4EC', mint: '#F8BBD0', cream: '#FFF8FA', gold: '#FFAB91',
        text: '#5C0030', textMed: '#880E4F', textLight: '#C25580',
        gradientHero: 'linear-gradient(135deg, #FFF5F9 0%, #FCE4EC 25%, #FFF5F9 50%, #F8BBD0 75%, #FFF5F9 100%)',
        gradientPrimary: 'linear-gradient(135deg, #F06292 0%, #EC407A 50%, #F8BBD0 100%)',
        gradientSecondary: 'linear-gradient(135deg, #FFAB91 0%, #F06292 50%, #EC407A 100%)',
        particleColors: ['#F06292', '#EC407A', '#F8BBD0', '#F48FB1', '#FCE4EC'],
        shapes: ['bubble', 'candy', 'heart', 'bow'],
        floatingShapes: ['bubble', 'candy', 'sparkle', 'heart', 'star-5'],
        cursorShape: 'heart', sectionBadgeShape: 'candy'
    },
    {
        name: 'teal-serenity', label: 'Teal Serenity 🦋',
        primary: '#80CBC4', primaryLight: '#B2DFDB', secondary: '#4DB6AC',
        accent: '#00897B', accentDeep: '#00695C', soft: '#F0FAF8',
        lavender: '#E0F2F1', mint: '#B2DFDB', cream: '#F5FFFD', gold: '#FFE082',
        text: '#003B34', textMed: '#00695C', textLight: '#26A69A',
        gradientHero: 'linear-gradient(135deg, #F0FAF8 0%, #E0F2F1 25%, #F0FAF8 50%, #B2DFDB 75%, #F0FAF8 100%)',
        gradientPrimary: 'linear-gradient(135deg, #80CBC4 0%, #4DB6AC 50%, #B2DFDB 100%)',
        gradientSecondary: 'linear-gradient(135deg, #FFE082 0%, #80CBC4 50%, #4DB6AC 100%)',
        particleColors: ['#80CBC4', '#4DB6AC', '#B2DFDB', '#26A69A', '#E0F2F1'],
        shapes: ['wave', 'butterfly', 'leaf', 'dewdrop'],
        floatingShapes: ['wave', 'butterfly', 'sparkle', 'leaf', 'bubble'],
        cursorShape: 'butterfly', sectionBadgeShape: 'wave'
    },
    {
        name: 'flamingo-pink', label: 'Flamingo Pink 🦩',
        primary: '#FF80AB', primaryLight: '#FF80AB40', secondary: '#FF4081',
        accent: '#F50057', accentDeep: '#C51162', soft: '#FFF5F9',
        lavender: '#FCE4EC', mint: '#FFEBEE', cream: '#FFF8FA', gold: '#FFD180',
        text: '#6A0030', textMed: '#AD1457', textLight: '#D0508A',
        gradientHero: 'linear-gradient(135deg, #FFF5F9 0%, #FCE4EC 25%, #FFF5F9 50%, #FFCDD2 75%, #FFF5F9 100%)',
        gradientPrimary: 'linear-gradient(135deg, #FF80AB 0%, #FF4081 50%, #FFCDD2 100%)',
        gradientSecondary: 'linear-gradient(135deg, #FFD180 0%, #FF80AB 50%, #FF4081 100%)',
        particleColors: ['#FF80AB', '#FF4081', '#FFCDD2', '#F48FB1', '#FCE4EC'],
        shapes: ['bird', 'heart', 'blossom', 'petal'],
        floatingShapes: ['bird', 'heart', 'sparkle', 'blossom', 'star-5'],
        cursorShape: 'heart', sectionBadgeShape: 'bird'
    },
    {
        name: 'jasmine-white', label: 'Jasmine White 🤍',
        primary: '#E0E0E0', primaryLight: '#F5F5F5', secondary: '#BDBDBD',
        accent: '#9E9E9E', accentDeep: '#757575', soft: '#FAFAFA',
        lavender: '#F5F5F5', mint: '#EEEEEE', cream: '#FCFCFC', gold: '#FFE082',
        text: '#424242', textMed: '#616161', textLight: '#9E9E9E',
        gradientHero: 'linear-gradient(135deg, #FAFAFA 0%, #F5F5F5 25%, #FAFAFA 50%, #EEEEEE 75%, #FAFAFA 100%)',
        gradientPrimary: 'linear-gradient(135deg, #E0E0E0 0%, #BDBDBD 50%, #F5F5F5 100%)',
        gradientSecondary: 'linear-gradient(135deg, #FFE082 0%, #E0E0E0 50%, #BDBDBD 100%)',
        particleColors: ['#E0E0E0', '#BDBDBD', '#F5F5F5', '#9E9E9E', '#EEEEEE'],
        shapes: ['daisy', 'sparkle', 'diamond', 'dewdrop'],
        floatingShapes: ['daisy', 'sparkle', 'diamond', 'dewdrop', 'star-4'],
        cursorShape: 'daisy', sectionBadgeShape: 'diamond'
    },
    {
        name: 'grape-fizz', label: 'Grape Fizz 🍇',
        primary: '#9575CD', primaryLight: '#D1C4E9', secondary: '#7E57C2',
        accent: '#5E35B1', accentDeep: '#4527A0', soft: '#F5F0FF',
        lavender: '#EDE7F6', mint: '#D1C4E9', cream: '#F8F5FF', gold: '#FFE082',
        text: '#1A0052', textMed: '#311B92', textLight: '#7C4DFF',
        gradientHero: 'linear-gradient(135deg, #F5F0FF 0%, #EDE7F6 25%, #F5F0FF 50%, #D1C4E9 75%, #F5F0FF 100%)',
        gradientPrimary: 'linear-gradient(135deg, #9575CD 0%, #7E57C2 50%, #D1C4E9 100%)',
        gradientSecondary: 'linear-gradient(135deg, #FFE082 0%, #9575CD 50%, #7E57C2 100%)',
        particleColors: ['#9575CD', '#7E57C2', '#D1C4E9', '#673AB7', '#EDE7F6'],
        shapes: ['gem', 'moon', 'comet', 'constellation'],
        floatingShapes: ['gem', 'moon', 'sparkle', 'comet', 'star-6'],
        cursorShape: 'gem', sectionBadgeShape: 'moon'
    },
    {
        name: 'apricot-sunrise', label: 'Apricot Sunrise 🌤',
        primary: '#FFCC80', primaryLight: '#FFE0B2', secondary: '#FFB74D',
        accent: '#FF9800', accentDeep: '#EF6C00', soft: '#FFFAF0',
        lavender: '#FFF3E0', mint: '#FFE0B2', cream: '#FFFCF5', gold: '#FFA726',
        text: '#5D3500', textMed: '#784A10', textLight: '#A07530',
        gradientHero: 'linear-gradient(135deg, #FFFAF0 0%, #FFF3E0 25%, #FFFAF0 50%, #FFE0B2 75%, #FFFAF0 100%)',
        gradientPrimary: 'linear-gradient(135deg, #FFCC80 0%, #FFB74D 50%, #FFE0B2 100%)',
        gradientSecondary: 'linear-gradient(135deg, #FFA726 0%, #FFCC80 50%, #FFB74D 100%)',
        particleColors: ['#FFCC80', '#FFB74D', '#FFE0B2', '#FFA726', '#FFF3E0'],
        shapes: ['sun', 'bird', 'cloud', 'rays'],
        floatingShapes: ['sun', 'bird', 'sparkle', 'cloud', 'star-5'],
        cursorShape: 'sun', sectionBadgeShape: 'bird'
    },
    {
        name: 'sapphire-night', label: 'Sapphire Night 💎',
        primary: '#7986CB', primaryLight: '#C5CAE9', secondary: '#5C6BC0',
        accent: '#3949AB', accentDeep: '#283593', soft: '#F5F5FF',
        lavender: '#E8EAF6', mint: '#C5CAE9', cream: '#F8F8FF', gold: '#FFE57F',
        text: '#1A237E', textMed: '#283593', textLight: '#5C6BC0',
        gradientHero: 'linear-gradient(135deg, #F5F5FF 0%, #E8EAF6 25%, #F5F5FF 50%, #C5CAE9 75%, #F5F5FF 100%)',
        gradientPrimary: 'linear-gradient(135deg, #7986CB 0%, #5C6BC0 50%, #C5CAE9 100%)',
        gradientSecondary: 'linear-gradient(135deg, #FFE57F 0%, #7986CB 50%, #5C6BC0 100%)',
        particleColors: ['#7986CB', '#5C6BC0', '#C5CAE9', '#3F51B5', '#E8EAF6'],
        shapes: ['constellation', 'comet', 'star-6', 'moon'],
        floatingShapes: ['constellation', 'comet', 'sparkle', 'star-6', 'moon'],
        cursorShape: 'star-6', sectionBadgeShape: 'constellation'
    },
    {
        name: 'watermelon-crush', label: 'Watermelon Crush 🍉',
        primary: '#EF9A9A', primaryLight: '#FFCDD2', secondary: '#A5D6A7',
        accent: '#E53935', accentDeep: '#C62828', soft: '#FFF5F5',
        lavender: '#FFEBEE', mint: '#E8F5E9', cream: '#FFF8F5', gold: '#FFE082',
        text: '#6A1515', textMed: '#B71C1C', textLight: '#D05050',
        gradientHero: 'linear-gradient(135deg, #FFF5F5 0%, #FFEBEE 25%, #E8F5E9 50%, #FFCDD2 75%, #FFF5F5 100%)',
        gradientPrimary: 'linear-gradient(135deg, #EF9A9A 0%, #A5D6A7 50%, #FFCDD2 100%)',
        gradientSecondary: 'linear-gradient(135deg, #FFE082 0%, #EF9A9A 50%, #A5D6A7 100%)',
        particleColors: ['#EF9A9A', '#A5D6A7', '#FFCDD2', '#E57373', '#C8E6C9'],
        shapes: ['heart', 'leaf', 'dewdrop', 'cherry'],
        floatingShapes: ['heart', 'leaf', 'sparkle', 'cherry', 'star-4'],
        cursorShape: 'heart', sectionBadgeShape: 'leaf'
    },
    {
        name: 'sea-glass', label: 'Sea Glass 🌊',
        primary: '#4DD0E1', primaryLight: '#B2EBF2', secondary: '#26C6DA',
        accent: '#00ACC1', accentDeep: '#00838F', soft: '#F0FEFF',
        lavender: '#E0F7FA', mint: '#B2EBF2', cream: '#F5FEFF', gold: '#FFE082',
        text: '#003844', textMed: '#006064', textLight: '#0097A7',
        gradientHero: 'linear-gradient(135deg, #F0FEFF 0%, #E0F7FA 25%, #F0FEFF 50%, #B2EBF2 75%, #F0FEFF 100%)',
        gradientPrimary: 'linear-gradient(135deg, #4DD0E1 0%, #26C6DA 50%, #B2EBF2 100%)',
        gradientSecondary: 'linear-gradient(135deg, #FFE082 0%, #4DD0E1 50%, #26C6DA 100%)',
        particleColors: ['#4DD0E1', '#26C6DA', '#B2EBF2', '#00BCD4', '#E0F7FA'],
        shapes: ['shell', 'wave', 'fish', 'bubble'],
        floatingShapes: ['shell', 'wave', 'sparkle', 'fish', 'bubble'],
        cursorShape: 'shell', sectionBadgeShape: 'wave'
    }
    ,{
        name: 'lotus-pond', label: 'Lotus Pond 🪷',
        primary: '#F8BBD0', primaryLight: '#FCE4EC', secondary: '#CE93D8',
        accent: '#AB47BC', accentDeep: '#7B1FA2', soft: '#FFF8FC',
        lavender: '#F3E5F5', mint: '#FCE4EC', cream: '#FFF8FD', gold: '#FFE082',
        text: '#4A0E52', textMed: '#6A1B7A', textLight: '#AB47BC',
        gradientHero: 'linear-gradient(135deg, #FFF8FC 0%, #F3E5F5 25%, #FCE4EC 50%, #F8BBD0 75%, #FFF8FC 100%)',
        gradientPrimary: 'linear-gradient(135deg, #F8BBD0 0%, #CE93D8 50%, #FCE4EC 100%)',
        gradientSecondary: 'linear-gradient(135deg, #FFE082 0%, #F8BBD0 50%, #CE93D8 100%)',
        particleColors: ['#F8BBD0', '#CE93D8', '#FCE4EC', '#E1BEE7', '#F3E5F5'],
        shapes: ['blossom', 'petal', 'leaf', 'dewdrop'],
        floatingShapes: ['blossom', 'petal', 'sparkle', 'leaf', 'dewdrop'],
        cursorShape: 'blossom', sectionBadgeShape: 'blossom'
    }
];

// ========================================
// THEME ROTATION ENGINE
// ========================================
let currentTheme = null;
let currentThemeIndex = 0;
let themeRotationInterval = null;
let shapeRotationInterval = null;
let themesShuffled = [];

function shuffleArray(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

function initTheme() {
    // Shuffle themes for this session
    themesShuffled = shuffleArray(THEMES);
    currentThemeIndex = 0;
    currentTheme = themesShuffled[0];
    applyTheme(currentTheme);
    console.log('🎨 Theme: ' + currentTheme.label + ' (1/' + themesShuffled.length + ')');
}

function startThemeRotation() {
    // Auto-rotate themes every 20 seconds
    if (themeRotationInterval) clearInterval(themeRotationInterval);
    themeRotationInterval = setInterval(function() {
        rotateToNextTheme();
    }, 20000);

    // Change floating shapes every 10 seconds
    if (shapeRotationInterval) clearInterval(shapeRotationInterval);
    shapeRotationInterval = setInterval(function() {
        rotateFloatingShapes();
    }, 10000);
}

function rotateToNextTheme() {
    currentThemeIndex = (currentThemeIndex + 1) % themesShuffled.length;
    var nextTheme = themesShuffled[currentThemeIndex];

    // 1. Add transition class to <html> for smooth CSS transitions
    document.documentElement.classList.add('theme-transitioning');

    // 2. Flash overlay effect
    var overlay = document.getElementById('theme-flash-overlay');
    if (overlay) {
        overlay.style.background = 'radial-gradient(circle at center, ' + nextTheme.primary + '30, transparent)';
        overlay.classList.add('active');
        setTimeout(function() { overlay.classList.remove('active'); }, 1500);
    }

    // 3. Apply the new theme colors
    currentTheme = nextTheme;
    applyTheme(currentTheme);

    // 4. Re-apply themed SVG images
    if (typeof applyThemedImages === 'function') applyThemedImages();

    // 5. Show theme label toast
    var toast = document.getElementById('theme-label-toast');
    if (toast) {
        toast.textContent = '🎨 ' + currentTheme.label;
        toast.classList.add('show');
        setTimeout(function() { toast.classList.remove('show'); }, 3000);
    }

    // 6. Remove transition class after animation completes
    setTimeout(function() {
        document.documentElement.classList.remove('theme-transitioning');
    }, 1500);

    // 7. Refresh floating background shapes for new theme
    refreshFloatingBackground();

    console.log('🎨 Theme → ' + currentTheme.label + ' (' + (currentThemeIndex + 1) + '/' + themesShuffled.length + ')');
}

function rotateFloatingShapes() {
    if (!currentTheme) return;

    // Refresh background floating elements with new random shapes
    refreshFloatingBackground();

    // Also refresh hero particles
    refreshHeroParticles();
}

function refreshFloatingBackground() {
    var container = document.getElementById('bg-elements');
    if (!container || !currentTheme) return;

    // Fade out old elements
    var oldElements = container.querySelectorAll('.bg-float');
    oldElements.forEach(function(el) {
        el.style.transition = 'opacity 1s ease';
        el.style.opacity = '0';
    });

    // After fade, remove old and create new
    setTimeout(function() {
        container.innerHTML = '';
        var shapes = currentTheme.floatingShapes;
        for (var i = 0; i < 20; i++) {
            var el = document.createElement('div');
            el.className = 'bg-float';
            var shapeName = shapes[Math.floor(Math.random() * shapes.length)];
            var color = currentTheme.particleColors[Math.floor(Math.random() * currentTheme.particleColors.length)];
            el.innerHTML = SVG[shapeName] ? SVG[shapeName](24, color, currentTheme.secondary) : SVG.heart(24, color);
            el.style.left = Math.random() * 100 + '%';
            el.style.animationDuration = (Math.random() * 15 + 10) + 's';
            el.style.animationDelay = (Math.random() * 5) + 's';
            el.style.opacity = '0';
            container.appendChild(el);
            // Fade in new elements
            (function(elem) {
                setTimeout(function() {
                    elem.style.transition = 'opacity 1s ease';
                    elem.style.opacity = '0.15';
                }, 50);
            })(el);
        }
    }, 800);
}

function refreshHeroParticles() {
    var container = document.getElementById('hero-particles');
    if (!container || !currentTheme) return;

    // Fade out old
    var oldParticles = container.querySelectorAll('div');
    oldParticles.forEach(function(el) {
        el.style.transition = 'opacity 0.8s ease';
        el.style.opacity = '0';
    });

    setTimeout(function() {
        container.innerHTML = '';
        var shapes = ['sparkle', 'star-4', 'star-5', 'star-6'];
        for (var i = 0; i < 25; i++) {
            var p = document.createElement('div');
            p.style.position = 'absolute';
            p.style.left = Math.random() * 100 + '%';
            p.style.top = Math.random() * 100 + '%';
            var finalOpacity = Math.random() * 0.4 + 0.1;
            p.style.opacity = '0';
            p.style.animation = 'twinkle ' + (Math.random() * 3 + 2) + 's ease-in-out infinite';
            p.style.animationDelay = Math.random() * 3 + 's';
            var shapeName = shapes[Math.floor(Math.random() * shapes.length)];
            var size = Math.random() * 14 + 8;
            var color = currentTheme.particleColors[Math.floor(Math.random() * currentTheme.particleColors.length)];
            p.innerHTML = SVG[shapeName](size, color);
            p.style.pointerEvents = 'none';
            container.appendChild(p);
            (function(elem, op) {
                setTimeout(function() {
                    elem.style.transition = 'opacity 0.8s ease';
                    elem.style.opacity = op;
                }, 50);
            })(p, finalOpacity);
        }
    }, 600);
}

function applyTheme(theme) {
    var root = document.documentElement;
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
    root.style.setProperty('--shadow-soft', '0 4px 20px ' + theme.primary + '4D');
    root.style.setProperty('--shadow-medium', '0 8px 32px ' + theme.primary + '66');
    root.style.setProperty('--shadow-strong', '0 12px 48px ' + theme.secondary + '4D');

    // Update dynamic styles
    var styleEl = document.getElementById('theme-dynamic-styles') || document.createElement('style');
    styleEl.id = 'theme-dynamic-styles';
    styleEl.textContent = '\
        ::-webkit-scrollbar-track { background: ' + theme.primaryLight + '; }\
        ::-webkit-scrollbar-thumb { background: ' + theme.primary + '; }\
        ::-webkit-scrollbar-thumb:hover { background: ' + theme.accent + '; }\
        .loading-screen { background: linear-gradient(135deg, ' + theme.soft + ', ' + theme.mint + ', ' + theme.lavender + '); background-size: 400% 400%; animation: gradientShift 8s ease infinite; }\
        .countdown-screen { background: linear-gradient(135deg, ' + theme.soft + ', ' + theme.lavender + ', ' + theme.mint + '); background-size: 400% 400%; animation: gradientShift 8s ease infinite; }\
        .countdown-num { color: ' + theme.accentDeep + '; text-shadow: 0 0 40px ' + theme.accentDeep + '4D; }\
        .loading-bar { background: linear-gradient(90deg, ' + theme.primary + ', ' + theme.secondary + ', ' + theme.accentDeep + '); }\
        .timeline-section { background: linear-gradient(180deg, ' + theme.soft + ', ' + theme.mint + '); }\
        .quotes-section { background: linear-gradient(180deg, ' + theme.mint + ' 0%, ' + theme.soft + ' 100%); }\
        .games-section { background: linear-gradient(180deg, ' + theme.soft + ' 0%, ' + theme.lavender + ' 100%); }\
        .main-footer { background: linear-gradient(135deg, ' + theme.mint + ', ' + theme.lavender + '); }\
        .letter-section { background: ' + theme.gradientHero + '; background-size: 400% 400%; animation: gradientShift 15s ease infinite; }\
        .catch-area { background: linear-gradient(180deg, ' + theme.mint + ', ' + theme.lavender + '); border-color: ' + theme.primary + '; }\
        .confetti-colors { --c1: ' + theme.particleColors[0] + '; --c2: ' + theme.particleColors[1] + '; --c3: ' + theme.particleColors[2] + '; --c4: ' + theme.particleColors[3] + '; --c5: ' + theme.particleColors[4] + '; }\
    ';
    if (!document.getElementById('theme-dynamic-styles')) {
        document.head.appendChild(styleEl);
    }
}
