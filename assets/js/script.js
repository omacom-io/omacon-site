import * as nav from './modules/nav.js';
import * as transition from './modules/transition.js';

document.addEventListener('DOMContentLoaded', () => {

  nav.ready();

  transition.ready();

});

addEventListener('scroll', () => {

  transition.scroll();

}, {

  passive: true

});

addEventListener('load', () => {

  document.documentElement.style.scrollBehavior = 'smooth';

  setTimeout(() => {

    document.body.classList.remove('preload');

  }, 100);

});
