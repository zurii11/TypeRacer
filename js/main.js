let textInput = document.getElementById('textInput');
let word1 = document.getElementById('word1');
let word2 = document.getElementById('word2');
let word3 = document.getElementById('word3');
let wordsCounted = document.getElementById('wordsCounted')
let T = document.getElementById('timer');
let started = false; // determines did the game start or not
let wordCounter = 0;
let timer = 60;
let wordArr = []; // contains all words from txt
let wtt = []; // contains 3 words for each round
let cw = 0; // current word
let cwa = [word1, word2, word3];
let interval;

textInput.disabled = true;
wordsCounted.innerText = wordCounter;

// gets txt and extracts data, splits it by words and gives to array
fetch('bumbeishvili.txt').then(function(response){
    return response.text();
})
.then(function(data){
    wordArr = data.split('\n'); // '\n' works on github and '\r\n' works locally for some wicked reasons I don't understand
});

T.innerText = timer;

textInput.addEventListener('keyup', subWord);

// checks when space is pressed in input, if words is right increments wordCounter, if game has not started clears input field(better solution would be with keydown but im laze)
function subWord(e) {
    if (started == true) {
        if (e.keyCode == 32) {
            checkWord = textInput.value.slice(0, textInput.value.length-1); // because keyup is used word and a space is returned, this clears the space
            
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

    clearInterval(interval); // clear first so if function is called before interval is ended 2 or more intervals are not set at the same time, for this interval variable is declared globally
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


// takes 3 random words from wordArr and gives it to wtt, this is called everytime displayed words need to be changed
function pickWords() {
    wtt = [];

    for (let i = 0; i < 3; i++) {
        wtt.push(wordArr[Math.floor(Math.random() * (wordArr.length - 0))]);
    }

    word1.innerText = wtt[0];
    word2.innerText = wtt[1];
    word3.innerText = wtt[2];
}


// changes the color and size of current word, this is called everytime current word needs to be determined/changed
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
