const toDoForm = document.querySelector(".js-toDoForm"),
  toDoInput = toDoForm.querySelector(".js-form__todo"),
  toDoList = document.querySelector(".js-toDoList"),
  doneList = document.querySelector(".js-doneList"),
  toDoContainer = document.querySelector(".containier-toDoList");

const TODO_LS = "toDos";
const DONE_LS = "dones";
const SHOWING_FLEX = "showing-flex";

let toDos = [];
let dones = []; //todo 리스트와 done리스트에는 복수의 아이템이 담길 수 있기 때문에 각각 비어 있는 어레이를 할당

//done 리스트에 있었던 done 아이템을 todo 리스트로 이동시키면서 todo 아이템으로 바꾸는 함수. deleteToDos함수와 같은 원리로 동작
function returnToDos(event) {
  const returnBtn = event.target;
  const div = returnBtn.parentNode;
  doneList.removeChild(div);
  let newId = div.id;
  const moveDones = dones.filter(function (done) {
    return done.id !== newId;
  }); //
  dones = moveDones;
  saveDones(dones);
  paintToDo(div.innerText);
  handleFocus();
}

//todo 리스트에서 todo 아이템의 체크버튼을 클릭했을 때 해당 아이템을 done 리스트로 옮기는 함수. deleteToDos와 같은 원리로 동작
function doneToDo(event) {
  const checkBtn = event.target;
  const div = checkBtn.parentNode;
  let newId = div.id;
  toDoList.removeChild(div);
  const moveToDos = toDos.filter(function (toDo) {
    return toDo.id !== newId;
  });
  toDos = moveToDos;
  saveToDos(toDos);
  paintDone(div.innerText);
  handleFocus();
}

//done 아이템을 done 리스트에서 지우는 함수. deleteToDos와 같은 원리로 동작
function deleteDone(event) {
  const delBtn = event.target;
  const div = delBtn.parentNode;
  doneList.removeChild(div);
  const cleanDone = dones.filter(function (done) {
    return done.id !== div.id;
  });
  dones = cleanDone;
  saveDones(dones);
  handleFocus();
  clear();
}

//todo 아이템을 todo 리스트에서 지우는 함수
function deleteToDo(event) {
  const delBtn = event.target; //여러 div 중 제거버튼을 클릭한 해당 div를 지우기 위해 event.target을 이용
  const div = delBtn.parentNode; //제거버튼의 부모 노드가 리스트인 div에 해당
  toDoList.removeChild(div); //html의 리스트에서 아이템을 제거. 여기까지는 로컬스토리지에 아이템이 남아있음
  const cleanToDos = toDos.filter(function (toDo) {
    //어레이 객체의 filter 메소드를 이용해 각각의 item에 함수를 실행시키고 이를 통과한 요소를 모아서 새로운 배열로 리턴
    return toDo.id !== div.id; //이미 없어진 html상의 아이템의 id값을 로컬스토리지 아이템의 id값과 대조해 일치하지 않는 경우를 제외하고 통과한 요소만 모아서 리턴
  });
  toDos = cleanToDos; //filter 메소드를 거친 어레이를 toDos로 재할당
  saveToDos(toDos); //새롭게 할당된 어레이를 saveTodos 함수의 인자로 전달
  handleFocus();
  clear();
}

//todo와 done 아이템을 각각 로컬스토리지의 TODO_LS와 DONE_LS를 key로 전달된 어레이를 저장
function saveToDos(todo) {
  localStorage.setItem(TODO_LS, JSON.stringify(todo));
}
function saveDones(done) {
  localStorage.setItem(DONE_LS, JSON.stringify(done));
} //로컬스토리지는 스트링 데이터만 저장 가능하기 때문에 오브젝트 데이터를 스트링으로 바꿔주는 JSON.stringify 메소드를 사용

//paintToDo와 구조적으로 같은 함수
function paintDone(text) {
  const genericDiv = buildGenericDiv(text);
  const returnBtn = document.createElement("button");
  const delBtn = document.createElement("button");
  const newId = dones.length + 1;
  toDoContainer.classList.add(SHOWING_FLEX);
  returnBtn.addEventListener("click", returnToDos);
  returnBtn.classList.add("fas", "fa-undo-alt");
  delBtn.classList.add("fas", "fa-times");
  delBtn.addEventListener("click", deleteDone);
  genericDiv.appendChild(returnBtn);
  genericDiv.appendChild(delBtn);
  doneList.appendChild(genericDiv);
  genericDiv.id = `id_${newId}`;
  const doneObj = {
    text,
    id: `id_${newId}`,
  };
  dones.push(doneObj);
  saveDones(dones);
}

//각 리스트 아이템의 텍스트를 보이게할 div를 만들고 클래스를 부여해 리턴하는 함수
function buildGenericDiv(text) {
  const listDiv = document.createElement("div");
  const div = document.createElement("div");
  div.classList.add("todo-item");
  div.innerText = text;
  listDiv.classList.add("todo-list");
  listDiv.appendChild(div);
  return listDiv;
}

//인풋으로 전달된 todo의 텍스트값을 리스트에 보여주는 함수
function paintToDo(text) {
  const genericDiv = buildGenericDiv(text); //전달된 텍스트값을 buildGenericDiv 함수의 인자로 전달해서 리턴 받은 값을 변수에 담음
  const checkBtn = document.createElement("button");
  const delBtn = document.createElement("button"); //체크버튼과 삭제버튼을 생성
  const newId = toDos.length + 1; //로컬스토리지와 리스트에서 삭제하거나 done리스트로 옮길 아이템을 구별하기 위해 아이디 생성
  toDoContainer.classList.add(SHOWING_FLEX);
  checkBtn.classList.add("fas", "fa-check");
  checkBtn.addEventListener("click", doneToDo); //체크버튼을 눌렀을 때 doneToDo함수 호출
  delBtn.classList.add("fas", "fa-times");
  delBtn.addEventListener("click", deleteToDo); //삭제버튼을 눌렀을 때 deleteToDo 함수 호출
  genericDiv.appendChild(checkBtn);
  genericDiv.appendChild(delBtn);
  toDoList.appendChild(genericDiv); //각각의 아이템을 텍스트-체크버튼-삭제버튼 순서로 배치하고 이 아이템을 리스트에 넣어줌
  genericDiv.id = `id_${newId}`;
  const toDoObj = {
    text,
    id: `id_${newId}`,
  }; //로컬스토리이지에 저장할 아이템을 오브젝트 형태로 생성
  toDos.push(toDoObj); //어레이에 해당 오브젝트를 넣어줌
  saveToDos(toDos); //어레이를 saveToDos함수의 인자로 전달
}

//submit 이벤트 발생시 호출되는 함수
function handleSubmit(event) {
  event.preventDefault(); //submit 이벤트의 디폴트 성질을 막음
  if (toDoInput.value === "" || toDoInput.value === " ") return false; //인풋값이 공백일 경우 방지
  const currentValue = toDoInput.value;
  paintToDo(currentValue); //인풋에 입력한 텍스트값을 paintToDo 함수의 인자로 전달
  toDoInput.value = ""; //submit 함과 동시에 인풋에 입력했던 텍스트값은 공백으로 만들어줌
}

//로컬스토리지에 저장된 todo와 done 아이템을 불러오는 함수
function loadToDos() {
  const loadedToDos = localStorage.getItem(TODO_LS); //로컬스토리지에 저장된 todo 리스트를 불러와 변수에 할당
  const loadedDones = localStorage.getItem(DONE_LS); //로컬스토리지에 저장된 done 리스트를 불러와 변수에 할당
  if (loadedToDos !== null) {
    //로컬스토리지에 todo 리스트가 들어있는 경우
    const parsedToDos = JSON.parse(loadedToDos); //로컬스토리지에 저장된 아이템은 스트링 형태이기 때문에 자바스크립트가 다룰 수 있는 오브젝트 형태로 바꿔줌
    parsedToDos.forEach(function (toDo) {
      paintToDo(toDo.text); //저장된 아이템이 복수인 경우가 있기 때문에 forEach 반복문을 돌려서 각각의 toDo 아이템의 text값을 PaintToDo 함수의 인자로 전달
    });
  }
  if (loadedDones !== null) {
    //로컬스토리지에 done 리스트가 들어있는 경우도 마찬가지로 작동
    const parsedDones = JSON.parse(loadedDones);
    parsedDones.forEach(function (done) {
      paintDone(done.text);
    });
  }
}

//화면이 로드되었을 때 자동으로 cursor가 focus 되어 있게 만들어주는 함수
function handleFocus() {
  focusInput.focus();
  focusInput.select();
}

//todo리스트의 차일드 노드와 done리스트의 차일드 노드의 길이가 모두 0일 때, 즉 리스트에 어떤 todo와 done 아이템도 없을 때 2개의 리스트를 숨기는 함수
function clear() {
  if (toDoList.childNodes.length === 0 && doneList.childNodes.length === 0) {
    toDoContainer.classList.remove(SHOWING_FLEX);
  }
}

function init() {
  loadToDos(); //로컬스토리지에 저장된 todo를 불러오는 함수 호출
  toDoForm.addEventListener("submit", handleSubmit); //todo 리스트를 작성하는 폼에 submit 이벤트가 발생했을 때 handleSubmit 함수를 호출
}

init();
