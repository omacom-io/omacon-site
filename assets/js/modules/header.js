function ready() {

  const circle = document.getElementById('svgCircle');
  const rect = document.getElementById('svgRect');
  const diamond = document.getElementById('svgDiamond');
  const defs = document.getElementById('svgDefs');

  const start = {
    circle: { cx: -100, cy: 226.5, r: 320 },
    rect: { x: 300, y: -93.5, w: 556, h: 640 },
    diamond: { cx: 1256, cy: 226.5, s: 453 }
  };

  const end = {
    circle: { cx: 362, cy: 226.5, r: 132 },
    rect: { x: 437, y: 94.5, w: 229, h: 264 },
    diamond: { cx: 741, cy: 226.5, s: 186.7 }
  };

  function attrs(el, obj) {

    for(const k in obj) el.setAttribute(k, obj[k]);

  }

  function ease(t) {

    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

  }

  function draw(s) {

    const { circle: c, rect: r, diamond: d } = s;
    const dh = d.s / Math.SQRT2;
    const circleOverlap = c.cx + c.r > r.x;
    const diamondOverlap = d.cx - dh < r.x + r.w;

    const bg = `<rect x="-500" y="-500" width="2500" height="1500" fill="white"/>`;
    const br = `<rect x="${r.x}" y="${r.y}" width="${r.w}" height="${r.h}" fill="black"/>`;
    const dp = `${d.cx},${d.cy - dh} ${d.cx + dh},${d.cy} ${d.cx},${d.cy + dh} ${d.cx - dh},${d.cy}`;

    defs.innerHTML =
      `<mask id="cm">${bg}` +
      (circleOverlap ? br : '') +
      `</mask><mask id="rm">${bg}` +
      (circleOverlap ? `<circle cx="${c.cx}" cy="${c.cy}" r="${c.r}" fill="black"/>` : '') +
      (diamondOverlap ? `<polygon points="${dp}" fill="black"/>` : '') +
      `</mask><mask id="dm">${bg}` +
      (diamondOverlap ? br : '') +
      `</mask>`;

    attrs(circle, { cx: c.cx, cy: c.cy, r: c.r, mask: circleOverlap ? 'url(#cm)' : '' });
    attrs(rect, { x: r.x, y: r.y, width: r.w, height: r.h, mask: (circleOverlap || diamondOverlap) ? 'url(#rm)' : '' });
    attrs(diamond, { points: dp, mask: diamondOverlap ? 'url(#dm)' : '' });

  }

  function lerpState(a, b, t) {

    const state = {};

    for(const shape in a) {

      state[shape] = {};

      for(const prop in a[shape]) state[shape][prop] = a[shape][prop] + (b[shape][prop] - a[shape][prop]) * t;

    }

    return state;

  }

  draw(start);

  setTimeout(() => {

    const t0 = performance.now();

    requestAnimationFrame(function step(now) {

      const p = Math.min((now - t0) / 1500, 1);

      draw(lerpState(start, end, ease(p)));

      if(p < 1) {

        requestAnimationFrame(step);

      } else {

        document.querySelector('.header').classList.add('header--done');

      }

    });

  }, 400);

}

export { ready };
