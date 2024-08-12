async function editMemo(event) {
  const id = event.target.dataset.id;
  const editInput = prompt("수정할 값을 입력하세요");
  // console.log(editInput); 콘솔 찍는 버릇 들이자
  const res = await fetch(`/memo/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: id,
      content: editInput,
    }),
  });
  readMemo();
}

async function deleteMemo(event) {
  const id = event.target.dataset.id;
  const res = await fetch(`/memos/${id}`, {
    method: "DELETE",
  });
  readMemo();
}

function displayMemo(memo) {
  const ul = document.querySelector("#memo-ul");

  const li = document.createElement("li");
  li.innerText = `[id:${memo.id}] ${memo.content}`;

  const editBtn = document.createElement("button");
  editBtn.innerText = "수정하기";
  editBtn.addEventListener("click", editMemo); //editMemo호출
  editBtn.dataset.id = memo.id;

  const delBtn = document.createElement("button");
  delBtn.innerText = "삭제하기";
  delBtn.addEventListener("click", deleteMemo);
  delBtn.dataset.id = memo.id;

  ul.appendChild(li);
  li.appendChild(editBtn);
  li.appendChild(delBtn);
}

async function readMemo() {
  //get
  const res = await fetch("/memos");
  const jsonRes = await res.json();
  //jsonRes = [{id:123,content:"블라블라"}]
  const ul = document.querySelector("#memo-ul");
  ul.innerHTML = "";
  jsonRes.forEach(displayMemo);
}

// readMemo(); // 기억하자 항상 어딘가에서 호출해야지 된다

async function createMemo(value) {
  //post
  const res = await fetch("/memos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: new Date().getTime().toString(),
      content: value,
    }),
  });
  readMemo();
}

function handleSubmit(event) {
  //input에 있는 값을 가져오고 서버로 보내기
  event.preventDefault();
  const input = document.querySelector("#memo-input");
  //   console.log(input.value); // input값 가져오기 확인
  createMemo(input.value); // 호출
  input.value = "";
}

const form = document.querySelector("#memo-form");
form.addEventListener("submit", handleSubmit);

readMemo();
