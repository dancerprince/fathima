// ========================================
// CONFETTI SYSTEM
// ========================================

const Confetti = {
    canvas: null,
    ctx: null,
    particles: [],
    animationId: null,
    running: false,

    init() {
        this.canvas = document.getElementById('confetti-canvas');
        if (!this.canvas) return;
        this.ctx = this.canvas.getContext('2d');
        this.resize();
        window.addEventListener('resize', () => this.resize());
    },

    resize() {
        if (!this.canvas) return;
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    },

    launch(duration = 4000) {
        if (this.running) return;
        this.running = true;
        this.particles = [];

        const colors = ['#FFB6C1', '#DDA0DD', '#FFD700', '#FF69B4', '#E6E6FA', '#FFDAB9', '#C71585', '#FF1493'];

        for (let i = 0; i < 150; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height - this.canvas.height,
                w: Math.random() * 10 + 5,
                h: Math.random() * 6 + 3,
                color: colors[Math.floor(Math.random() * colors.length)],
                vx: (Math.random() - 0.5) * 4,
                vy: Math.random() * 3 + 2,
                rot: Math.random() * 360,
                rotSpeed: (Math.random() - 0.5) * 10,
                opacity: 1
            });
        }

        const startTime = Date.now();
        const animate = () => {
            const elapsed = Date.now() - startTime;
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

            this.particles.forEach(p => {
                p.x += p.vx;
                p.y += p.vy;
                p.rot += p.rotSpeed;
                p.vy += 0.05; // gravity

                if (elapsed > duration - 1000) {
                    p.opacity = Math.max(0, p.opacity - 0.02);
                }

                this.ctx.save();
                this.ctx.translate(p.x, p.y);
                this.ctx.rotate((p.rot * Math.PI) / 180);
                this.ctx.globalAlpha = p.opacity;
                this.ctx.fillStyle = p.color;
                this.ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
                this.ctx.restore();
            });

            if (elapsed < duration) {
                this.animationId = requestAnimationFrame(animate);
            } else {
                this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                this.running = false;
                this.particles = [];
            }
        };

        animate();
    },

    stop() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
        if (this.ctx && this.canvas) {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        }
        this.running = false;
        this.particles = [];
    }
};
