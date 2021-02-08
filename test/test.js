// question
const question = [
    {
        text: "", 
        answer: 4
    }, 
    {
        text: "", 
        answer: 1
    }, 
    {
        text: "", 
        answer: 1
    }
];

let point = 0, i = 0;
let answer = [];

const $ = q => document.getElementById(q);

function initTest() {
    drawQuestion(question, i++);
}

function removeQuestion() {
    $("qText").innerHTML = "";
}

function drawQuestion(question, i) {
    $("qText").innerHTML = question[i].text;
}

function onClick(n) {
    if (answer.length + 1 < question.length) {
        answer.push(n);
        removeQuestion();
        drawQuestion(question, i);
        i++;
    } else {
        answer.push(n);
        removeQuestion()
        showResult();
    }
    
    console.log("onClick");
}

function noneDisplay() {
    $("one").style.display = "none";
    $("two").style.display = "none";
    $("three").style.display = "none";
    $("four").style.display = "none";
}

function showResult() {
    for (let i = 0; i < question.length; i++) {
        if (question[i].answer === answer[i]) {
            point += 5;
        } else {
            $("result").innerHTML += question[i].text + "<br>사용자가 입력한 답: " + answer[i] + "/정답: " + question[i].answer + "<br><br>";
        }
    }
    $("point").innerHTML = "점수: " + point;
    noneDisplay();
}

$("one").addEventListener("click", function(){onClick(1)}, false);
$("two").addEventListener("click", function(){onClick(2)}, false);
$("three").addEventListener("click", function(){onClick(3)}, false);
$("four").addEventListener("click", function(){onClick(4)}, false);

window.onload = function() {
    initTest();
}