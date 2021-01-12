const clockContainer = document.querySelector(".js-clock"),
  clockTitle = clockContainer.querySelector(".js-title");

function getTime() {
  const date = new Date(); //생성자와 Date 내장 함수를 이용해 객체를 만들고 변수에 할당
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds(); //현재 시, 분, 초를 각각 얻어냄
  clockTitle.innerText = `${hours < 10 ? `0${hours}` : hours}:${
    minutes < 10 ? `0${minutes}` : minutes
  }:${seconds < 10 ? `0${seconds}` : seconds}`; //mini 조건문으로 숫자가 10 미만일 경우 숫자 앞에 0을 붙여서 두자리 숫자를 유지
}

function init() {
  getTime(); //시간을 시, 분, 초 단위로 얻어내는 함수 호출
  setInterval(getTime, 1000); //함수를 1초마다 호출해 초단위로 시간이 바뀌는 것처럼 설정
}

init();
