const root = document.querySelector(".root");

const IMG_NUMBER = 3; //현재 랜덤으로 넣어질 이미지의 갯수는 3개

//이미지 파일 이름을 변수로 놓고 해당 이미지 파일을 백그라운드에 삽입하는 함수
//백그라운드 이미지에 css를 위한 클래스를 부여
function paintImage(imgNumber) {
  const image = `images/${imgNumber}.webp`;
  root.style.backgroundImage = `url(${image})`;
  root.classList.add("bgImage");
}

//이미지의 갯수를 최대수로 놓고 숫자를 랜덤하게 뽑는 함수
function genRandom() {
  const number = Math.ceil(Math.random() * IMG_NUMBER);
  return number;
}

function init() {
  const randomNumber = genRandom();
  paintImage(randomNumber); //랜덤하게 뽑은 숫자를 변수로 놓고 해당 숫자에 맞는 이미지 파일을 백그라운드에 삽입
}

init();
