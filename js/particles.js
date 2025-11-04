// ===================================
// PARTICLE BACKGROUND ANIMATION
// ===================================

document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('particles');
    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    function setCanvasSize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    // Particle class
    class Particle {
        constructor() {
            this.reset();
            this.y = Math.random() * canvas.height;
            this.fadeDelay = Math.random() * 600;
            this.fadeStart = Date.now() + this.fadeDelay;
            this.fadingOut = false;
        }

        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = (Math.random() - 0.5) * 0.5;
            this.radius = Math.random() * 2;
            this.opacity = 0;
            this.fadeDelay = Math.random() * 600;
            this.fadeStart = Date.now() + this.fadeDelay;
            this.fadingOut = false;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            // Wrap around screen
            if (this.x < 0) this.x = canvas.width;
            if (this.x > canvas.width) this.x = 0;
            if (this.y < 0) this.y = canvas.height;
            if (this.y > canvas.height) this.y = 0;

            // Fade in
            if (Date.now() > this.fadeStart && this.opacity < 1 && !this.fadingOut) {
                this.opacity += 0.01;
            }
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(0, 255, 136, ${this.opacity * 0.5})`;
            ctx.fill();
        }
    }

    // Connection line class
    class Connection {
        constructor(p1, p2) {
            this.p1 = p1;
            this.p2 = p2;
        }

        draw() {
            const distance = Math.sqrt(
                Math.pow(this.p2.x - this.p1.x, 2) +
                Math.pow(this.p2.y - this.p1.y, 2)
            );

            if (distance < 150) {
                ctx.beginPath();
                ctx.moveTo(this.p1.x, this.p1.y);
                ctx.lineTo(this.p2.x, this.p2.y);
                ctx.strokeStyle = `rgba(0, 255, 136, ${0.2 * (1 - distance / 150)})`;
                ctx.lineWidth = 0.5;
                ctx.stroke();
            }
        }
    }

    // Create particles
    const particleCount = window.innerWidth < 768 ? 40 : 80;
    const particles = [];

    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }

    // Mouse interaction
    let mouse = {
        x: null,
        y: null,
        radius: 150
    };

    canvas.addEventListener('mousemove', (e) => {
        mouse.x = e.x;
        mouse.y = e.y;
    });

    canvas.addEventListener('mouseleave', () => {
        mouse.x = null;
        mouse.y = null;
    });

    // Animation loop
    function animate() {
        ctx.fillStyle = 'rgba(5, 8, 22, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Update and draw particles
        particles.forEach(particle => {
            particle.update();
            particle.draw();

            // Mouse interaction
            if (mouse.x != null && mouse.y != null) {
                const dx = mouse.x - particle.x;
                const dy = mouse.y - particle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < mouse.radius) {
                    const force = (mouse.radius - distance) / mouse.radius;
                    const directionX = dx / distance;
                    const directionY = dy / distance;

                    particle.x -= directionX * force * 2;
                    particle.y -= directionY * force * 2;
                }
            }
        });

        // Draw connections
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const connection = new Connection(particles[i], particles[j]);
                connection.draw();
            }
        }

        requestAnimationFrame(animate);
    }

    animate();

    // Adjust particle count on resize
    window.addEventListener('resize', () => {
        const newCount = window.innerWidth < 768 ? 40 : 80;
        
        if (newCount > particles.length) {
            for (let i = particles.length; i < newCount; i++) {
                particles.push(new Particle());
            }
        } else if (newCount < particles.length) {
            particles.splice(newCount);
        }
    });
});