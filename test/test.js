// question
const question = [{text: "1. 여름철 고온에서는 특히 무엇을 유념해야 하는가?<br>가) 더운 날씨는 하루 종일 산책하기에 좋다.<br>나) 털이 짧은 개는 아무것도 유의할 필요가 없지만, 털이 긴 개는 한여름에 하루 최대 3시간만 산책 시킨다.<br>다) 털이 짧은 개는 화상을 피하기 위해 자외선 차단제를 발라줘야 한다.<br>라) 한여름에 주차된 차에 개를 혼자 남겨 두면 안 된다.", answer: 4}, 
{text: "2. 개 먹이와 관련해서 무엇을 유념해야 하는가?<br>가) 연령에 적합한 사료의 제공이 권장된다.<br>나) 개는 항상 자신의 그릇에 사료를 먹어야 한다.<br>다) 특히 몸집이 큰 품종의 강아지는 항상 배부르게 먹을 수 있어야 한다.<br>라) 개는 신선한 생고기를 주로 먹어야 한다.", answer: 1}, 
{text: "3. 사육에 적합한 환경에서 개는 무엇이 매일 충족되어야 하는가?<br>가) 개는 매일 몇 시간 동안 정신적, 육체적인 활동이 필요하다.<br>나) 개는 매일 두 세 시간씩 최소 두 번 걸어야 한다. <br>다) 개는 매일 적어도 두 끼의 식사를 제공받아야 한다.<br>라) 개는 주로 견고한 바닥을 가진 견사 안에서 길러져야 한다.", answer: 1}];
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
    if (n < question.length) {
        answer.push(n);
        removeQuestion();
        drawQuestion(question, i++);
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