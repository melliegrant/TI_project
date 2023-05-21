// TODO: hamburger menu for screens with max-width: 639px

const hamburgerButton = document.getElementById("hamburger");
const nav = document.querySelector(".nav");
const navLinks = document.querySelectorAll(".nav__link");
const hamburgerLines = document.querySelectorAll(".hamburger-btn__line");
let menuState = true;

const switchMenuState = () => {
  if (menuState) {
    showMenu();
  } else {
    hideMenu();
  }
};

const showMenu = () => {
  nav.classList.add("nav--active");
  hamburgerLines[0].classList.remove("line--base");
  hamburgerLines[1].classList.remove("line--base");
  hamburgerLines[2].classList.remove("line--base");
  hamburgerLines[0].classList.add("line--top");
  hamburgerLines[1].classList.add("line--hidden");
  hamburgerLines[2].classList.add("line--bottom");
  menuState = !menuState;
};

const hideMenu = () => {
  nav.classList.remove("nav--active");
  hamburgerLines[0].classList.remove("line--top");
  hamburgerLines[1].classList.remove("line--hidden");
  hamburgerLines[2].classList.remove("line--bottom");
  hamburgerLines[0].classList.add("line--base");
  hamburgerLines[1].classList.add("line--base");
  hamburgerLines[2].classList.add("line--base");
  menuState = !menuState;
};

hamburgerButton.addEventListener("click", switchMenuState);
navLinks.forEach((btn) => btn.addEventListener("click", hideMenu));
