function scroll() {

  document.querySelectorAll('.anchor').forEach(anchor => {

    anchor.classList.toggle('anchor--stuck', anchor.getBoundingClientRect().top <= document.querySelector('.nav').offsetHeight);

  });

}

export { scroll };
