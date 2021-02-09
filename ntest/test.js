/********************
    Alt JQuery
*********************/
function $(q) {
    return document.getElementById(q);
}

/********************
    Questions JSON
*********************/
const questions = [
    {
        question: "제주도에 가서 둘 중 하나를 해야 한다면?",
        answers: [
            {
                type: 'E',
                answer: "저는 등산을 하겠습니다."
            }, 
            {
                type: 'I',
                answer: "저는 바다 수영을 하겠습니다."
            }
        ]
    }, 
    {
        question: "돼지고기와 소고기 둘 중 하나만 평생 먹어야 한다면?",
        answers: [
            {
                type: 'E',
                answer: "돼지고기"
            }, 
            {
                type: 'I',
                answer: "소고기"
            }
        ]
    }, 
    {
        question: "평생 하나로만 돈 관리할 수 있다면?",
        answers: [
            {
                type: 'E',
                answer: "삼성전자 주식으로"
            }, 
            {
                type: 'I',
                answer: "비트코인으로"
            }
        ]
    }, 
    {
        question: "4",
        answers: [
            {
                type: 'S',
                answer: "S"
            }, 
            {
                type: 'N',
                answer: "N"
            }
        ]
    }, 
    {
        question: "5",
        answers: [
            {
                type: 'S',
                answer: "S"
            }, 
            {
                type: 'N',
                answer: "N"
            }
        ]
    }, 
    {
        question: "6",
        answers: [
            {
                type: 'S',
                answer: "S"
            }, 
            {
                type: 'N',
                answer: "N"
            }
        ]
    }, 
    {
        question: "7",
        answers: [
            {
                type: 'T',
                answer: "T"
            }, 
            {
                type: 'F',
                answer: "F"
            }
        ]
    }, 
    {
        question: "8",
        answers: [
            {
                type: 'T',
                answer: "T"
            }, 
            {
                type: 'F',
                answer: "F"
            }
        ]
    }, 
    {
        question: "9",
        answers: [
            {
                type: 'T',
                answer: "T"
            }, 
            {
                type: 'F',
                answer: "F"
            }
        ]
    }, 
    {
        question: "10",
        answers: [
            {
                type: 'J',
                answer: "J"
            }, 
            {
                type: 'P',
                answer: "P"
            }
        ]
    }, 
    {
        question: "11",
        answers: [
            {
                type: 'J',
                answer: "J"
            }, 
            {
                type: 'P',
                answer: "P"
            }
        ]
    }, 
    {
        question: "12",
        answers: [
            {
                type: 'J',
                answer: "J"
            }, 
            {
                type: 'P',
                answer: "P"
            }
        ]
    }
];

/********************
    Score Dictionary
*********************/
let scores = {
    E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0
}
let index = 0;

/****************
 *  Main Logic
 ****************/
function drawTest(q, i) {
    $("q").innerHTML = q[i].question;
    $("a1").innerHTML = q[i].answers[0].answer;
    $("a2").innerHTML = q[i].answers[1].answer;
    $("cnt").innerHTML = "<small>" + (i + 1) + "/" + q.length + "</small>";
    $("per").style.width = ((i + 1) * 100 / q.length) + "%";
    $("per").setAttribute('aria-valuenow', `${i}`);
}

function onClick(n) {
    if (index < questions.length) {
        scores[questions[index].answers[n].type]++;
        if (index === questions.length - 1) { // 마지막 문항일 때
            alert(getResult());
            location.reload();
        } else { // 마지막 문항이 아닐 때
            index++;
            drawTest(questions, index);
        }
    } else {
        alert("마지막 문항입니다.");
    }
}

function getResult() {
    let result = "";
    result += (scores['E'] > scores['I']) ? "E" : "I"; // EI
    result += (scores['S'] > scores['N']) ? "S" : "N"; // SN
    result += (scores['T'] > scores['F']) ? "T" : "F"; // TF
    result += (scores['P'] > scores['J']) ? "P" : "J"; // PJ
    return result;
}

$("a1").addEventListener("click", function(){onClick(0)}, false);
$("a2").addEventListener("click", function(){onClick(1)}, false);

window.onload = function() {
    drawTest(questions, index);
}
