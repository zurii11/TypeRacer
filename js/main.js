let textInput = document.getElementById('textInput');
let word1 = document.getElementById('word1');
let word2 = document.getElementById('word2');
let word3 = document.getElementById('word3');
let wordsCounted = document.getElementById('wordsCounted')
let T = document.getElementById('timer');
let started = false;
let wordCounter = 0;
let timer = 60;
let wordArr = [];
let wtt = [];
let cw = 0;
let cwa = [word1, word2, word3];
let interval;

textInput.disabled = true;
wordsCounted.innerText = wordCounter;

fetch('bumbeishvili.txt').then(function(response){
    return response.text();
})
.then(function(data){
    wordArr = data.split('\r\n');
    console.log(wordArr);
});

T.innerText = timer;

textInput.addEventListener('keyup', subWord);

function subWord(e) {
    if (started == true) {
        if (e.keyCode == 32) {
            checkWord = textInput.value.slice(0, textInput.value.length-1);
            
            if (checkWord == cwa[cw].innerText) {
                textInput.value = '';
                wordCounter++;
                wordsCounted.innerText = wordCounter;
                cw++;
                currentWord();
            }
        }
    } else {
        textInput.value = '';
    }   
}

function start() {
    started = true;
    textInput.disabled = false;
    timer = 60;
    T.innerText = timer;
    cw = 0;
    wordCounter = 0;
    wordsCounted.innerText = wordCounter;
    textInput.value = '';

    textInput.focus();

    clearInterval(interval);
    interval = setInterval(time, 1000)

    function time() {
        if (timer > 0) {
            timer = timer - 1;
            T.innerText = timer;
        } else {
            clearInterval(interval);
            started = false;
            textInput.disabled = true;
            textInput.value = `Your typing speed is ${wordCounter}WPM`;
        }
    }

    pickWords();
    currentWord();
}

function pickWords() {
    wtt = [];

    for (let i = 0; i < 3; i++) {
        wtt.push(wordArr[Math.floor(Math.random() * (wordArr.length - 0))]);
    }

    word1.innerText = wtt[0];
    word2.innerText = wtt[1];
    word3.innerText = wtt[2];
}

function currentWord() {

    if (cw > 2) {
        pickWords();
        cw = 0;
    }

    for (let i in cwa) {
        if (i == cw) {
            cwa[i].style.color = 'green';
            cwa[i].style.fontSize = '30px';
        } else {
            cwa[i].style.color = 'black';
            cwa[i].style.fontSize = '18px';
        }
    } 
}