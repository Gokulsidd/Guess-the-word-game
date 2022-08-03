const inputs = document.querySelector('.inputs'),
resetBtn = document.querySelector('.reset-btn'),
hint = document.querySelector('.hint span'),
wrongLetters = document.querySelector('.wrong-letters span'),
typingInputs= document.querySelector('.typing-inputs '),
guessLeft = document.querySelector('.guess-left span');

let word , incorrects=[] , corrects =[] , maxGuesses ;

function randomwords(){
  //getting random words from word list 
  let ranObj = wordList[Math.floor(Math.random()* wordList.length)];
  word = ranObj.word;
  maxGuesses = 8 , incorrects=[] , corrects =[];
  hint.innerText = ranObj.hint;

  let html = '';
  for(let i = 0 ; i < word.length; i++){
    html += `<input type= "text" disabled>` 
  }
  wrongLetters.innerText = incorrects;
  guessLeft.innerText = maxGuesses;
  inputs.innerHTML = html ;
  console.log(word)
}

randomwords();

function initGame(e){
  let key = e.target.value ;
  if(key.match(/^[A-Za-z]+$/) && !incorrects.includes( `${key}`) &&  !corrects.includes(key) ){
    console.log(key) ;
    if(word.includes(key)){
      for (let i = 0; i < word.length; i++) {
        if(word[i] === key){
          corrects.push(key);
         inputs.querySelectorAll("input")[i].value = key;
        }
      }
    }else{
      incorrects.push( `${key}`)
      maxGuesses--;
    }
  }
  guessLeft.innerText = maxGuesses;   
  wrongLetters.innerText = incorrects;
  typingInputs.value='';

  setTimeout(()=> {
    if(corrects.length === word.length){
      alert(`Congrats! you found the word ${word.toUpperCase()}`)
      randomwords();
    }
  
    if(maxGuesses < 1){
      alert("Game over! You don't have remaning guesses");
      for (let i = 0; i < word.length; i++) {
        inputs.querySelectorAll("input")[i].value = word[i];
      }
    }
  })

}

resetBtn.addEventListener("click" , randomwords);
typingInputs.addEventListener("input", initGame);
document.addEventListener("keydown", () => typingInputs.focus());