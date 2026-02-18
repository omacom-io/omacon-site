document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.header');
  const nav = document.querySelector('.nav');
  const transition = document.querySelector('.transition');
  
  // Sticky navigation
  if (header && nav) {
    new IntersectionObserver(([entry]) => {
      nav.classList.toggle('nav--sticky', !entry.isIntersecting);
    }, { threshold: 0 }).observe(header);
  }
  
  // Transition effect bars
  if (transition) {
    for (let i = 0; i < 37; i++) {
      const span = document.createElement('span');
      span.style.setProperty('--index', i);
      transition.appendChild(span);
    }
    
    window.addEventListener('scroll', () => {
      const progress = 1 - (transition.getBoundingClientRect().top - nav.offsetHeight) / (window.innerHeight - nav.offsetHeight);
      transition.style.setProperty('--transition-progress', Math.min(1, Math.max(0, progress)));
    }, { passive: true });
  }
  
  // Smooth scroll for anchor links
  document.querySelectorAll('.anchor').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    });
  });
  
  // Header SVG Animation
  const circle = document.getElementById('svgCircle');
  const rect = document.getElementById('svgRect');
  const diamond = document.getElementById('svgDiamond');
  const defs = document.getElementById('svgDefs');
  
  if (circle && rect && diamond && defs) {
    const start = { circle: { cx: -100, cy: 226.5, r: 320 }, rect: { x: 300, y: -93.5, w: 556, h: 640 }, diamond: { cx: 1256, cy: 226.5, s: 453 } };
    const end = { circle: { cx: 350.5, cy: 226.5, r: 140 }, rect: { x: 430, y: 86.5, w: 243, h: 280 }, diamond: { cx: 752.5, cy: 226.5, s: 198 } };
    
    const ease = t => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    
    const setAttrs = (el, obj) => Object.entries(obj).forEach(([k, v]) => el.setAttribute(k, v));
    
    const lerp = (a, b, t) => a + (b - a) * t;
    
    const draw = (s) => {
      const { circle: c, rect: r, diamond: d } = s;
      const dh = d.s / Math.SQRT2;
      const co = c.cx + c.r > r.x;
      const dOv = d.cx - dh < r.x + r.w;
      const dp = `${d.cx},${d.cy - dh} ${d.cx + dh},${d.cy} ${d.cx},${d.cy + dh} ${d.cx - dh},${d.cy}`;
      
      defs.innerHTML = `<mask id="cm"><rect x="-500" y="-500" width="2500" height="1500" fill="white"/>${co ? `<rect x="${r.x}" y="${r.y}" width="${r.w}" height="${r.h}" fill="black"/>` : ''}</mask><mask id="rm"><rect x="-500" y="-500" width="2500" height="1500" fill="white"/>${co ? `<circle cx="${c.cx}" cy="${c.cy}" r="${c.r}" fill="black"/>` : ''}${dOv ? `<polygon points="${dp}" fill="black"/>` : ''}</mask><mask id="dm"><rect x="-500" y="-500" width="2500" height="1500" fill="white"/>${dOv ? `<rect x="${r.x}" y="${r.y}" width="${r.w}" height="${r.h}" fill="black"/>` : ''}</mask>`;
      
      setAttrs(circle, { cx: c.cx, cy: c.cy, r: c.r, mask: co ? 'url(#cm)' : '' });
      setAttrs(rect, { x: r.x, y: r.y, width: r.w, height: r.h, mask: (co || dOv) ? 'url(#rm)' : '' });
      setAttrs(diamond, { points: dp, mask: dOv ? 'url(#dm)' : '' });
    };
    
    draw(start);
    
    setTimeout(() => {
      const t0 = performance.now();
      const step = (now) => {
        const p = Math.min((now - t0) / 1500, 1);
        draw({
          circle: { cx: lerp(start.circle.cx, end.circle.cx, ease(p)), cy: start.circle.cy, r: lerp(start.circle.r, end.circle.r, ease(p)) },
          rect: { x: lerp(start.rect.x, end.rect.x, ease(p)), y: lerp(start.rect.y, end.rect.y, ease(p)), w: lerp(start.rect.w, end.rect.w, ease(p)), h: lerp(start.rect.h, end.rect.h, ease(p)) },
          diamond: { cx: lerp(start.diamond.cx, end.diamond.cx, ease(p)), cy: start.diamond.cy, s: lerp(start.diamond.s, end.diamond.s, ease(p)) }
        });
        if (p < 1) requestAnimationFrame(step);
        else document.querySelector('.header')?.classList.add('header--done');
      };
      requestAnimationFrame(step);
    }, 400);
  }
});

addEventListener('load', () => {
  document.documentElement.style.scrollBehavior = 'smooth';
  setTimeout(() => document.body.classList.remove('preload'), 100);
});
