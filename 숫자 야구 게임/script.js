const button = document.querySelectorAll(".button-container button");
const selected = document.querySelectorAll(".selected");

const strikeBoard = document.querySelectorAll("#strike .circle");
const ballBoard = document.querySelectorAll("#ball .circle");
const outBoard = document.querySelectorAll("#out .circle");

let numberAnswer = [];
let numberSelected = [];
let TryList = [];

function answerMake() {
  while (numberAnswer.length < 3) {
    let randomNumber = Math.floor(Math.random() * 10);
    if (!numberAnswer.includes(randomNumber)) numberAnswer.push(randomNumber);
  }
  console.log(numberAnswer);
}
function numberSelect(number) {
  if (numberSelected.length >= 3) return;
  if (numberSelected.includes(number)) return;
  numberSelected.push(number);
  selected.forEach((value, index) => {
    value.innerText =
      index < numberSelected.length ? numberSelected[index] : "";
  });
}
function numberErase() {
  if (numberSelected.length <= 0) return;
  numberSelected.pop();
  selected.forEach((value, index) => {
    value.innerText =
      index < numberSelected.length ? numberSelected[index] : "";
  });
}
function answerCheck() {
  let strikeCnt = 0;
  let ballCnt = 0;
  let outCnt = 0;

  numberSelected.forEach((value, index) => {
    if (!numberAnswer.includes(value)) outCnt++;
    else if (numberAnswer[index] === value) strikeCnt++;
    else ballCnt++;
  });

  return [strikeCnt, ballCnt, outCnt];
}
function dashboardDraw(htmlList, Cnt) {
  htmlList.forEach((value, index) => {
    value.classList = index < Cnt ? "circle hit" : "circle";
  });
}

function gameReset() {
  console.log(`You find answer: ${TryList.length} tries`);
  numberSelected = [];
  numberAnswer = [];
  TryList = [];

  answerMake();
  dashboardDraw(strikeBoard, 0);
}

function keyDown(e) {
  if (e.key === "Backspace") {
    numberErase();
  } else if (e.key === "Enter") {
    e.preventDefault();
    if (numberSelected.length < 3) return;
    TryList.push([...numberSelected]);
    const [strike, ball, out] = answerCheck();
    dashboardDraw(strikeBoard, strike);
    dashboardDraw(ballBoard, ball);
    dashboardDraw(outBoard, out);

    numberSelected = [];
    selected.forEach((value, index) => {
      value.innerText =
        index < numberSelected.length ? numberSelected[index] : "";
    });

    if (strike === 3) setTimeout(gameReset, 1000);
  } else if (!isNaN(parseInt(e.key))) {
    numberSelect(parseInt(e.key));
  }
}
answerMake();
button.forEach((node) =>
  node.addEventListener("click", (e) =>
    numberSelect(parseInt(e.target.innerText))
  )
);
window.addEventListener("keydown", (e) => keyDown(e));
