import * as anchor from './modules/anchor.js';
import * as header from './modules/header.js';
import * as nav from './modules/nav.js';
import * as transition from './modules/transition.js';

document.addEventListener('DOMContentLoaded', () => {

  header.ready();

  nav.ready();

  transition.ready();

});

addEventListener('scroll', () => {

  anchor.scroll();

  transition.scroll();

}, {

  passive: true

});

addEventListener('resize', () => {

  anchor.scroll();

});

addEventListener('load', () => {

  document.documentElement.style.scrollBehavior = 'smooth';

  setTimeout(() => {

    document.body.classList.remove('preload');

  }, 100);

  anchor.scroll();

});
