const toDoForm = document.querySelector(".js-toDoForm"),
  toDoInput = toDoForm.querySelector(".js-form__todo"),
  toDoList = document.querySelector(".js-toDoList"),
  doneList = document.querySelector(".js-doneList");

const TODO_LS = "toDos";
const DONE_LS = "dones";

let toDos = [];
let dones = [];

function returnToDos(event) {
  const btn = event.target;
  const div = btn.parentNode;
  toDoList.appendChild(div);
  btn.removeEventListener("click", returnToDos);
  btn.addEventListener("click", doneToDo);
  btn.innerText = "✓";
  const text = div.querySelector("div").innerHTML;
  let newId = parseInt(div.id);
  let toDoObj = {
    text: text,
    id: newId,
  };
  toDos.push(toDoObj);

  const moveDones = dones.filter(function (done) {
    return done.id !== parseInt(div.id);
  });
  dones = moveDones;
  saveToDos();
}

function doneToDo(event) {
  const btn = event.target;
  const div = btn.parentNode;
  const delBtn = div.appendChild;
  let newId = parseInt(div.id);
  doneList.appendChild(div);
  btn.innerText = "↺";
  btn.addEventListener("click", returnToDos);
  let text = div.querySelector("div").innerText;
  const doneObj = {
    text: text,
    id: newId,
  };
  dones.push(doneObj);
  const moveToDos = toDos.filter(function (toDo) {
    return toDo.id !== parseInt(div.id);
  });
  toDos = moveToDos;
  saveToDos();
}

function deleteDone(event) {
  const btn = event.target;
  const div = btn.parentNode;
  doneList.removeChild(div);
  const cleanDone = dones.filter(function (done) {
    return done.id !== parseInt(div.id);
  });
  dones = cleanDone;
  saveToDos();
}

function deleteToDo(event) {
  const btn = event.target;
  const div = btn.parentNode;
  toDoList.removeChild(div);
  const cleanToDos = toDos.filter(function (toDo) {
    return toDo.id !== parseInt(div.id);
  });
  toDos = cleanToDos;
  saveToDos();
}

function saveToDos() {
  localStorage.setItem(TODO_LS, JSON.stringify(toDos));
  localStorage.setItem(DONE_LS, JSON.stringify(dones));
}

function paintDone(text) {
  const listDiv = document.createElement("div");
  const returnBtn = document.createElement("button");
  const delBtn = document.createElement("button");
  const div = document.createElement("div");
  const newId = dones.length + 1;

  delBtn.innerText = "✖️";
  delBtn.addEventListener("click", deleteDone);
  listDiv.appendChild(returnBtn);
  listDiv.appendChild(div);
  listDiv.appendChild(delBtn);
  div.innerHTML = text;
  div.id = newId;
  returnBtn.innerText = "↺";
  const doneObj = {
    text: text,
    id: newId,
  };
  dones.push(doneObj);
  saveToDos();
}

function paintToDo(text) {
  const listDiv = document.createElement("div");
  const delBtn = document.createElement("button");
  const div = document.createElement("div");
  const newId = toDos.length + 1;
  const checkBtn = document.createElement("button");
  checkBtn.innerText = "✓";
  checkBtn.addEventListener("click", doneToDo);
  delBtn.innerText = `✖️`;
  delBtn.addEventListener("click", deleteToDo);
  delBtn.setAttribute("class", "delBtn");
  div.setAttribute("class", "todo_item");
  div.innerText = text;
  listDiv.appendChild(checkBtn);
  listDiv.appendChild(div);
  listDiv.appendChild(delBtn);
  listDiv.setAttribute("class", "todo_list");
  listDiv.id = newId;
  toDoList.appendChild(listDiv);
  const toDoObj = {
    text: text,
    id: newId,
  };
  toDos.push(toDoObj);
  saveToDos();
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = toDoInput.value;
  paintToDo(currentValue);
  toDoInput.value = "";
}

function loadToDos() {
  const loadedToDos = localStorage.getItem(TODO_LS);
  const loadedDones = localStorage.getItem(DONE_LS);
  if (loadedToDos !== null) {
    const parsedToDos = JSON.parse(loadedToDos);
    parsedToDos.forEach(function (toDo) {
      paintToDo(toDo.text);
    });
  }
  if (loadedDones !== null) {
    const parsedDones = JSON.parse(loadedDones);
    parsedDones.forEach(function (done) {
      paintDone(done.text);
    });
  }
}

function init() {
  loadToDos();
  toDoForm.addEventListener("submit", handleSubmit);
}

init();
