const toDoForm = document.querySelector(".js-toDoForm"),
  toDoInput = toDoForm.querySelector(".js-form__todo"),
  toDoList = document.querySelector(".js-toDoList"),
  doneList = document.querySelector(".js-doneList"),
  toDoContainer = document.querySelector(".containier-toDoList");

const TODO_LS = "toDos";
const DONE_LS = "dones";
const SHOWING_FLEX = "showing-flex";

let toDos = [];
let dones = [];

function returnToDos(event) {
  const btn = event.target;
  const div = btn.parentNode;
  const delBtn = div.lastChild;
  toDoList.appendChild(div);

  btn.innerText = "✓";
  btn.removeEventListener("click", returnToDos);
  btn.addEventListener("click", doneToDo);

  delBtn.innerText = "✖️";
  delBtn.removeEventListener("click", deleteDone);
  delBtn.addEventListener("click", deleteToDo);

  let text = div.querySelector("div").innerHTML;
  let id = parseInt(div.id);
  const toDoObj = {
    text: text,
    id: id,
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
  const delBtn = div.lastChild;
  let newId = parseInt(div.id);
  doneList.appendChild(div);
  btn.innerText = "↺";
  btn.addEventListener("click", returnToDos);
  delBtn.removeEventListener("click", deleteToDo);
  delBtn.addEventListener("click", deleteDone);
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
  toDoContainer.classList.add(SHOWING_FLEX);
  delBtn.innerText = "✖️";
  delBtn.addEventListener("click", deleteDone);
  delBtn.setAttribute("class", "del-btn");
  returnBtn.addEventListener("click", returnToDos);
  listDiv.appendChild(returnBtn);
  listDiv.appendChild(div);
  listDiv.appendChild(delBtn);
  listDiv.setAttribute("class", "todo_list");
  div.setAttribute("class", "todo_item");
  div.innerHTML = text;
  listDiv.id = newId;
  returnBtn.innerText = "↺";
  returnBtn.setAttribute("class", "return-btn");
  doneList.appendChild(listDiv);
  const doneObj = {
    text: text,
    id: newId,
  };
  dones.push(doneObj);
  saveToDos();
  empty();
}

function paintToDo(text) {
  const listDiv = document.createElement("div");
  const delBtn = document.createElement("button");
  const div = document.createElement("div");
  const newId = toDos.length + 1;
  const checkBtn = document.createElement("button");
  toDoContainer.classList.add(SHOWING_FLEX);
  checkBtn.innerText = "✓";
  checkBtn.addEventListener("click", doneToDo);
  checkBtn.setAttribute("class", "check-btn");
  delBtn.innerText = `✖️`;
  delBtn.addEventListener("click", deleteToDo);
  delBtn.setAttribute("class", "del-btn");
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
  empty();
}

function handleSubmit(event) {
  event.preventDefault();
  if (toDoInput.value === "" || toDoInput.value === " ") return false;
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

function empty() {
  if (localStorage.getItem(TODO_LS) && localStorage.getItem(DONE_LS) === null) {
    toDoContainer.classList.remove(SHOWING_FLEX);
  }
}

function init() {
  loadToDos();
  toDoForm.addEventListener("submit", handleSubmit);
  empty();
}

init();