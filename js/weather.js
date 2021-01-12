const API_KEY = "ad5e4f7d55f68ac53b77b22e995223ea";
const COORDS = "coords";
const weather = document.querySelector(".js-weather");
const loc = document.querySelector(".js-location");

//인자로 전달된 위도와 경도 값을 API에 넣어 해당 지역의 날씨를 얻는 함수
function getWeather(lat, lon) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=${API_KEY}&units=metric`
  ) //fetch로 API 키를 통해 다른 서버에서 데이터만 넘겨 받음
    .then(function (response) {
      //then으로 fetch가 완료되고서 데이터가 완전히 넘어온 다음 함수를 호출할 수 있게끔
      return response.json(); //데이터에서 body부분을 가져오기 위해 json 메소드 사용해서 객체를 리턴
    })
    .then(function (json) {
      //마찬가지로 가져온 데이터를 리턴값으로 받은 후에 처리할 수 있도록 then을 이용
      const temperature = json.main.temp;
      const location = json.name; //json으로 받은 객체에서 온도와 위치를 가져와서 변수에 담음
      weather.innerHTML = `${temperature}°C`;
      loc.innerHTML = `${location}`; //html에 가져온 변수를 각각 텍스트로 넣어줌
    });
}

//객체에 담아 전달된 위도와 경도를 로컬스토리지에 스트링 형태로 저장하는 함수
function saveCoords(coordsObj) {
  localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoError() {}

//handleGeoSucess 메소드는 position을 인자로 전달
function handleGeoSuccess(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude; //position 객체가 있고 coords를 조회하면 latitude와 longtitude를 얻을 수 있음
  const coordsObj = {
    latitude,
    longitude,
  };
  saveCoords(coordsObj); //객체에 담은 위도와 경도를 saveCoords 함수의 인자로 전달
  getWeather(latitude, longitude); //각 위도와 경도를 날씨를 얻는 getWeather 함수의 인자로 전달
}

//navigator 내장 API로 좌표를 가져오는 함수
function askForCoords() {
  navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
} //geolocation 오브젝트의 getCurrentPosition 메소드를 이용. handleGeoSuccess는 좌표를 가져오는데 성공했을 때를 처리하는 함수, handleGeoError는 실패했을 때 에러를 처리하는 함수

//로컬스토리지에 저장된 위도와 경도를 불러오는 함수
function loadCoords() {
  const loadedCoords = localStorage.getItem(COORDS);
  if (loadedCoords === null) {
    askForCoords(); //저장된 위도와 경도가 없을 경우 askForCoords 함수를 호출
  } else {
    const parsedCoords = JSON.parse(loadedCoords);
    getWeather(parsedCoords.latitude, parsedCoords.longitude);
  } //저장된 위도와 경도가 있을 경우 로컬스토리지에 스트링으로 저장된 데이터를 오브젝트로 바꾸고 이를 getWeather함수의 인자로 전달
}

function init() {
  loadCoords();
}

init();
