const transition = document.querySelector('.transition');
const nav = document.querySelector('.nav');

function ready() {

  for(let i = 0; i < 37; i++) {

    const span = document.createElement('span');

    span.style.setProperty('--index', i);

    transition.appendChild(span);

  }

  document.querySelectorAll('.anchor').forEach(anchor => {

    anchor.addEventListener('click', (e) => {

      const target = document.querySelector(anchor.getAttribute('href'));

      if(!target || target.getBoundingClientRect().top <= transition.getBoundingClientRect().top) return;

      e.preventDefault();

      scrollTo({

        behavior: 'smooth',
        top: Math.max(0, scrollY + target.getBoundingClientRect().top - parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) - (transition.offsetHeight - 1))

      });

    });

  });

  scroll();

}

function scroll() {

  const transitionProgress = 1 - (transition.getBoundingClientRect().top - nav.offsetHeight) / (window.innerHeight - nav.offsetHeight);

  transition.style.setProperty('--transition-progress', Math.min(1, Math.max(0, transitionProgress)));

}

export { ready, scroll };
