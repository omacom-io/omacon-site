function ready() {

  const observer = new IntersectionObserver(([e]) => {

    document.querySelector('.nav').classList.toggle('nav--sticky', !e.isIntersecting);

  }, {

    threshold: 0

  });

  observer.observe(document.querySelector('.header'));

}

export { ready };
