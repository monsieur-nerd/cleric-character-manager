import { useEffect, useRef } from 'react';
import p5 from 'p5';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: { r: number; g: number; b: number };
  alpha: number;
  life: number;
  maxLife: number;
  rotation: number;
  rotationSpeed: number;
  type: 'star' | 'circle' | 'sparkle';
}

interface SpellCastAnimationProps {
  x: number;
  y: number;
  onComplete?: () => void;
}

export function SpellCastAnimation({ x, y, onComplete }: SpellCastAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const p5Ref = useRef<p5 | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const sketch = (p: p5) => {
      const particles: Particle[] = [];
      const colors = [
        { r: 212, g: 175, b: 55 },   // Or divin
        { r: 102, g: 51, b: 153 },   // Violet royal
        { r: 34, g: 139, b: 34 },    // Vert forêt
        { r: 205, g: 127, b: 50 },   // Bronze
        { r: 30, g: 58, b: 95 },     // Bleu acier
        { r: 255, g: 215, b: 0 },    // Or brillant
        { r: 138, g: 43, b: 226 },   // Bleu violet
        { r: 255, g: 140, b: 0 },    // Orange foncé
      ];

      p.setup = () => {
        const canvas = p.createCanvas(200, 200);
        canvas.position(x - 100, y - 100);
        canvas.style('position', 'fixed');
        canvas.style('z-index', '9999');
        canvas.style('pointer-events', 'none');
        p.noLoop();
        
        // Créer les particules initiales
        createParticles();
        p.loop();
      };

      const createParticles = () => {
        // Créer 30-40 particules
        const particleCount = p.random(30, 40);
        
        for (let i = 0; i < particleCount; i++) {
          const angle = p.random(p.TWO_PI);
          const speed = p.random(2, 6);
          const color = colors[Math.floor(p.random(colors.length))];
          
          particles.push({
            x: 100, // Centre du canvas
            y: 100,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            size: p.random(3, 8),
            color,
            alpha: 255,
            life: 0,
            maxLife: p.random(40, 70),
            rotation: p.random(p.TWO_PI),
            rotationSpeed: p.random(-0.1, 0.1),
            type: p.random(['star', 'circle', 'sparkle']) as 'star' | 'circle' | 'sparkle',
          });
        }
      };

      p.draw = () => {
        p.clear();
        
        let activeParticles = 0;
        
        for (let i = particles.length - 1; i >= 0; i--) {
          const particle = particles[i];
          
          // Mettre à jour la vie
          particle.life++;
          
          if (particle.life >= particle.maxLife) {
            particles.splice(i, 1);
            continue;
          }
          
          activeParticles++;
          
          // Calculer l'alpha (fade out)
          const lifeRatio = particle.life / particle.maxLife;
          particle.alpha = 255 * (1 - lifeRatio);
          
          // Mettre à jour la position
          particle.x += particle.vx;
          particle.y += particle.vy;
          
          // Ajouter une légère gravité vers le haut
          particle.vy -= 0.05;
          
          // Ralentissement
          particle.vx *= 0.98;
          particle.vy *= 0.98;
          
          // Rotation
          particle.rotation += particle.rotationSpeed;
          
          // Dessiner la particule
          p.push();
          p.translate(particle.x, particle.y);
          p.rotate(particle.rotation);
          
          const c = particle.color;
          p.fill(c.r, c.g, c.b, particle.alpha);
          p.noStroke();
          
          if (particle.type === 'star') {
            drawStar(0, 0, particle.size / 2, particle.size, 5);
          } else if (particle.type === 'circle') {
            p.ellipse(0, 0, particle.size, particle.size);
          } else {
            // Sparkle - croix brillante
            p.stroke(c.r, c.g, c.b, particle.alpha);
            p.strokeWeight(particle.size / 3);
            p.line(-particle.size, 0, particle.size, 0);
            p.line(0, -particle.size, 0, particle.size);
            
            // Centre brillant
            p.noStroke();
            p.fill(255, 255, 255, particle.alpha);
            p.ellipse(0, 0, particle.size / 2, particle.size / 2);
          }
          
          p.pop();
        }
        
        // Arrêter quand toutes les particules sont mortes
        if (activeParticles === 0) {
          p.noLoop();
          onComplete?.();
        }
      };

      const drawStar = (x: number, y: number, innerRadius: number, outerRadius: number, points: number) => {
        p.beginShape();
        for (let i = 0; i < points * 2; i++) {
          const angle = (p.PI / points) * i - p.HALF_PI;
          const radius = i % 2 === 0 ? outerRadius : innerRadius;
          const px = x + Math.cos(angle) * radius;
          const py = y + Math.sin(angle) * radius;
          p.vertex(px, py);
        }
        p.endShape(p.CLOSE);
      };
    };

    p5Ref.current = new p5(sketch, containerRef.current);

    return () => {
      p5Ref.current?.remove();
    };
  }, [x, y, onComplete]);

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 pointer-events-none z-50"
      style={{ width: 0, height: 0 }}
    />
  );
}
