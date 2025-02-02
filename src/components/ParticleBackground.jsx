//omg this is bad, but idc

import { useEffect, useRef } from 'react';

const ParticleBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let mouseX = 0;
    let mouseY = 0;

    // canvas size , pura window ka size
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

   
    const handleMouseMove = (event) => {
      mouseX = event.clientX;
      mouseY = event.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);

    
    class Particle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1; 
        this.speedX = Math.random() * 2 - 1;
        this.speedY = Math.random() * 2 - 1;
        this.color = `hsla(${Math.random() * 60 + 200}, 70%, 60%, 0.6)`; // More opacity, yes!
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Mouse  se interaction
        const dx = mouseX - this.x;
        const dy = mouseY - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < 100) {
          this.x -= dx * 0.02;
          this.y -= dy * 0.02;
        }

        if (this.x < 0 || this.x > canvas.width) this.reset();
        if (this.y < 0 || this.y > canvas.height) this.reset();
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();

        // chand sa glow effect
        ctx.shadowBlur = 15;
        ctx.shadowColor = this.color;
      }
    }

    
    const particles = Array.from({ length: 70 }, () => new Particle()); // More particles, bcz why not!?

    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = 'rgba(26, 26, 26, 0.2)'; 
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      
      ctx.shadowBlur = 0;
      ctx.shadowColor = 'transparent';

      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });

      
      particles.forEach((particle1, i) => {
        particles.slice(i + 1).forEach(particle2 => {
          const dx = particle1.x - particle2.x;
          const dy = particle1.y - particle2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) { 
            const gradient = ctx.createLinearGradient(
              particle1.x, particle1.y, 
              particle2.x, particle2.y
            );
            gradient.addColorStop(0, particle1.color);
            gradient.addColorStop(1, particle2.color);

            ctx.beginPath();
            ctx.strokeStyle = gradient;
            ctx.lineWidth = 0.8; 
            ctx.moveTo(particle1.x, particle1.y);
            ctx.lineTo(particle2.x, particle2.y);
            ctx.stroke();
          }
        });
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', setCanvasSize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }} 
    />
  );
};

export default ParticleBackground; 