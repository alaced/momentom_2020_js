const root = document.querySelector(".root");

const IMG_NUMBER = 3;

function handleImgLoad() {}

function paintImage(imgNumber) {
  const image = `images/${imgNumber}.jpg`;
  root.style.backgroundImage = `url(${image})`;
  root.classList.add("bgImage");
}

function genRandom() {
  const number = Math.ceil(Math.random() * IMG_NUMBER);
  return number;
}

function init() {
  const randomNumber = genRandom();
  paintImage(randomNumber);
}

init();
