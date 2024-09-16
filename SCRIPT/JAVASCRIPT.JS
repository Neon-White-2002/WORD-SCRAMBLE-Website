const wordtext = document.querySelector(".word");
const hinttext = document.querySelector(".hint span");

const inputword = document.querySelector("input");

const timertext = document.querySelector(".time b");

const refresh_button = document.querySelector(".refresh-word");
const check_button = document.querySelector(".check-word");

let correctword, timer;

const initgametimer = maxtime =>
{
    clearInterval(timer);

    timer = setInterval(() => 
    {
        if(maxtime > 0)
        {
            maxtime--; //DECREMENT 'MAX-TIME' BY (-1);
            return timertext.innerHTML = maxtime;
        }

        clearInterval(timer);
        alert(`OOPS, TIME UP ! '${correctword.toLocaleUpperCase()}', WAS A CORRECT - WORD !`);
        initgame(); //CALLING, THE 'INITIAL - GAME FUNCTION', TO RE-START THE GAME;
    }, 1000);
}

const initgame = () =>
{
    initgametimer(30); //'INITIAL - GAME (TIMER)';

    let randomobject = words[Math.floor(Math.random() * words.length)]; //GETTING RANDOM OBJECT FROM THE 'WORD';
    let wordarray = randomobject.word.split(""); //SPLITTING EACH LETTER OF RANDOM WORD;

    for (let i = wordarray.length - 1; i > 0; i--) 
    {
        let j = Math.floor(Math.random() * (i + 1)); //GETTING RANDOM NUMBERS;
        //SHUFFLING AND SWIPPING WORD-ARRAY LETTER RANDOMLY:
        [wordarray[i], wordarray[j]] = [wordarray[j], wordarray[i]];
    }

    wordtext.innerHTML = wordarray.join(""); //PASSING SHUFFLE WORD;
    hinttext.innerHTML = randomobject.hint; //PASSING 'HINT' MESSAGE;

    correctword = randomobject.word.toLocaleLowerCase(); //PASSING 'CORRECT - WORD' TO CHECK 'INPUT - WORD';

    inputword.value = ""; //PASSING 'NULL' VALUE TO INPUT - FIELD;
    inputword.setAttribute("maxlength", correctword.length); //SETTING INPUT - WORD LENGTH VALUE TO MAX-LENGTH;

    //console.log(randomobject);
}

initgame();

refresh_button.addEventListener("click", initgame);

const checkword = () =>
{
    let userword = inputword.value.toLocaleLowerCase();

    //ALERT MESSAGE TO USER 'DON'T KEEP INPUT FEILD (EMPTY)';
    if(!userword) return alert(`PLEASE, ENTER ANY 'WORD' !`);
    
    //ALERT MESSAGE, IF USER-WORD DON'T MATCH TO CORRECT-WORD;
    if(userword != correctword) return alert(`OOPS ! ${userword.toLocaleUpperCase()} IS NOT A CORRECT - WORD.`);
    
    //ALERT, MESSAGE IF USER-WORD MATCH TO CORRECT-WORD;
    alert(`YA ! ${userword.toLocaleUpperCase()} IS, A CORRECT - WORD`);

    //CALLING 'INITAL - GAME' FUNCTION:
    initgame(); 
}

check_button.addEventListener("click", checkword);