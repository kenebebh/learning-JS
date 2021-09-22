//Challenge 1: Calc your age in days
function ageInDays() {
    var birthYear = prompt('What year were you born?');
    var days = (2021 - birthYear) * 365;
   var h1 = document.createElement('h1');
    var textAnswer = document.createTextNode('You are ' + days + ' days old.');
    h1.setAttribute('id', 'ageInDays');
    h1.appendChild(textAnswer);
    document.getElementById('flexbox_result').appendChild(h1);
}

function reset() {
   document.getElementById('ageInDays').remove(); 
}
//Challenge 2: Generate my beautiful and sexy picture
function generatePic() {
    var image = document.createElement('img');
    var div = document.getElementById('pic_gen');
    image.src="images/kenebae.jpg" ;
    div.appendChild(image);
}

//Challenge 3: Rock, Paper, Scissors
function rpsGame(yourChoice){
// console.log(yourChoice);
var humanChoice, botChoice;
humanChoice = yourChoice.id;
    console.log(humanChoice);
botChoice = numberToChoice(randToRpsInt());
    console.log(botChoice);
 results = decideWinner(humanChoice, botChoice);
//  console.log(results);
message = finalMessage(results);
    console.log(message);
rpsFrontEnd(yourChoice.id, botChoice, message);
    }

function randToRpsInt() {
    return Math.floor(Math.random() * 3);
}
function numberToChoice(number) {
    return ['rock', 'paper', 'scissors'][number];
}
function decideWinner(yourChoice, computerChoice) {
    var rpsDatabase = {
        'rock':{'scissors':1, 'rock':0.5, 'paper':0},
        'paper':{'rock':1, 'paper':0.5, 'scissors':0},
        'scissors':{'paper':1, 'scissors':0.5, 'rock':0}
    };
    var yourScore = rpsDatabase[yourChoice][computerChoice];
    var computerScore = rpsDatabase[computerChoice][yourChoice];
    return[yourScore, computerScore];
}
function finalMessage([yourScore,computerScore]) {
    if (yourScore === 0){
        return {'message': 'You lost!', 'color': 'red'};
    }else if (yourScore === 0.5){
        return {'message': 'You tied!', 'color': 'yellow'};
    } else {
        return {'message': 'You won!', 'color': 'green'};
    }
}
function rpsFrontEnd(humanImageChoice, botImageChoice,finalMessage) {
    var imagesDatabase = {
        'rock': document.getElementById('rock').src,
        'paper':document.getElementById('paper').src,
        'scissors': document.getElementById('scissors').src
    }
    document.getElementById('rock').remove();
    document.getElementById('paper').remove();
    document.getElementById('scissors').remove();
    
    var humanDiv = document.createElement('div');
    var botDiv = document.createElement('div');
    var messageDiv = document.createElement('div');
    
    humanDiv.innerHTML = "<img src= '" + imagesDatabase[humanImageChoice] + "'style = 'box-shadow: 0px 10px 50px blue;' >"
    messageDiv.innerHTML = "<h1 style = 'color: " + finalMessage['color'] + "; font-size: 50px; padding: 20px; '>" + finalMessage['message'] + "</h1>"
    botDiv.innerHTML = "<img src= '" + imagesDatabase[botImageChoice] + "'style = 'box-shadow: 0px 10px 50px darkred;' >"
    
    document.getElementById('flexbox-rps-div').appendChild(humanDiv);
    document.getElementById('flexbox-rps-div').appendChild(messageDiv); 
    document.getElementById('flexbox-rps-div').appendChild(botDiv);    
}

//Challenge 4: Change the colour of all buttons
var all_buttons = document.getElementsByTagName('button');
console.log(all_buttons);
/* all_buttons.style.fontFamily= 'Pangolin, monospace'; */


var copyAllButtons = [];
for (let i=0; i < all_buttons.length;i++){
    copyAllButtons.push(all_buttons[i].className);
}
console.log(copyAllButtons);

/* copyAllButtons[1].classList.remove('hot'); */

function buttonColourChange(button){
    if (button.value === 'red'){
        buttonsRed();
    }else if (button.value === 'green'){
        buttonsGreen()
    }else if (button.value === 'reset'){
        buttonColourReset();
    }else if (button.value === 'random'){
        randomColours();
    }
}

function buttonsRed(){
    for (let i=0; i < all_buttons.length; i++){
        all_buttons[i].classList.remove(all_buttons[i].classList);
        all_buttons[i].classList.add('hot');
    }
}
function buttonsGreen(){
    for (let i=0; i < all_buttons.length; i++){
        all_buttons[i].classList.remove(all_buttons[i].classList);
        all_buttons[i].classList.add('success');
    }
}
function buttonColourReset(){
    for (let i=0; i < all_buttons.length; i++){
        all_buttons[i].classList.remove(all_buttons[i].classList);
      all_buttons[i].classList.add(copyAllButtons[i]);
    }
}
function randomColours(){
    let choices = ['primary', 'hot', 'warning', 'success'];
    for (let i=0; i < all_buttons.length; i++){
        let randomNumber = Math.floor(Math.random() * 4)
        all_buttons[i].classList.remove(all_buttons[i].classList);
        all_buttons[i].classList.add(choices[randomNumber]);
    }
}

//Challenge 5: Blackjack
let blackjackGame = {
    'you': {'scoreSpan': '#yourBlackjackResult', 'div': '#yourBox', 'score': 0 },
    'dealer': {'scoreSpan': '#dealerBlackjackResult', 'div': '#dealerBox', 'score': 0 },
    'cards': ['2','3','4','5','6','7','8','9','10','K','Q','J','A'],
    'cardsMap': {'2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '10': 10, 'K': 10, 'Q': 10, 'J': 10, 'A': [1,11]},
    'wins': 0,
    'losses': 0 ,
    'draws': 0,
    'isStand': false,
    'turnsOver': false,
};

const YOU = blackjackGame['you'];
const DEALER = blackjackGame['dealer'];
const hitSound = new Audio('blackjack_assets/sounds/swish.m4a');
const winSound = new Audio('blackjack_assets/sounds/cash.mp3');
const lossSound = new Audio('blackjack_assets/sounds/aww.mp3');
 
document.querySelector('#hitButton').addEventListener('click' , blackjackHit);
document.querySelector('#dealButton').addEventListener('click' , blackjackDeal);
document.querySelector('#standButton').addEventListener('click' , dealerLogic);


function blackjackHit(){
    if (blackjackGame.isStand === false){
    let card = randomCard();
  showCard(card, YOU);
    updateScore(card, YOU);
    showScore(YOU);
  }
}

function showCard(card, activePlayer){
    if (activePlayer.score <= 21){
      let cardImage = document.createElement('img');
    cardImage.src= `blackjack_assets/images/${card}.png`;
    document.querySelector(activePlayer.div).appendChild(cardImage);
    hitSound.play();
}
}

function blackjackDeal(){
    if (blackjackGame.turnsOver === true){
        blackjackGame.isStand = false;
    let yourImages = document.querySelector('#yourBox').querySelectorAll('img');
    let dealerImages = document.querySelector('#dealerBox').querySelectorAll('img');
    
   for( i = 0; i < yourImages.length; i++){
       yourImages[i].remove();
   }

   for( i = 0; i < dealerImages.length; i++){
       dealerImages[i].remove();

   }
    
    YOU.score = 0;
    DEALER.score = 0;
    document.querySelector('#yourBlackjackResult').textContent = 0;
    document.querySelector('#dealerBlackjackResult').textContent = 0;
    document.querySelector('#yourBlackjackResult').style.color = 'white';
    document.querySelector('#dealerBlackjackResult').style.color = 'white';
    
    document.querySelector('#blackjackResult').textContent = "Let's play";
    document.querySelector('#blackjackResult').style.color = 'black';
        blackjackGame.turnsOver = false;
    }
}

function randomCard() {
    let randomIndex = Math.floor(Math.random() * 13);
    return blackjackGame.cards[randomIndex];
}

function updateScore(card, activePlayer){
    if (card === 'A') {
      //If adding 11 keeps me below 21, add 11, otherwise, add 1
    if (activePlayer.score + blackjackGame.cardsMap[card][1] <= 21) {
        activePlayer.score += blackjackGame.cardsMap[card][1];
    } else{
        activePlayer.score += blackjackGame.cardsMap[card][0];
    }   
    } else{
    activePlayer.score += blackjackGame.cardsMap[card];
}
}

function showScore(activePlayer) {
    if (activePlayer.score > 21){
       document.querySelector(activePlayer.scoreSpan).textContent = 'BUST!' ;
    document.querySelector(activePlayer.scoreSpan).style.color ='red';
    } else {
    document.querySelector(activePlayer.scoreSpan).textContent = activePlayer.score;
    }
}

function sleep(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
}
async function dealerLogic(){
    blackjackGame.isStand = true;
    
    while (DEALER.score < 16 && blackjackGame.isStand === true){
        let card = randomCard();
        showCard(card, DEALER);
        updateScore(card, DEALER);
        showScore(DEALER);
        await sleep(1000);
    }
        blackjackGame.turnsOver = true;
        let winner = computeWinner();
        showResult(winner);
}

//compute winner and return who won
//update the wins, draws, and losses
function computeWinner() {
    let winner;
    
    if (YOU.score <= 21) {
        //higher score than dealer or when dealer busts but youre below 21
        if (YOU.score > DEALER.score || (DEALER.score > 21)) {
            blackjackGame.wins++;
            winner = YOU;
        }else if (YOU.score < DEALER['score']) {
             blackjackGame.losses++;
            winner = DEALER;
        }else if(YOU.score === DEALER.score){
             blackjackGame.draws++;
        }
        //Condition: When you bust, but dealer doesn't  
    }else if(YOU.score > 21 && DEALER.score <= 21){
       blackjackGame.losses++;
        winner = DEALER;
        //Condition: When you and the dealer busts
    }else if (YOU.score > 21 && DEALER.score > 21){
         blackjackGame.draws++;
    }
    return winner;
}

function showResult(winner) {
    let message, messageColour;
    if (blackjackGame.turnsOver === true){
        
        if ( winner === YOU){
            document.querySelector('#wins').textContent = blackjackGame.wins;
            message = 'You won!';
            messageColour = 'green';
            winSound.play();
        } else if (winner === DEALER){
            document.querySelector('#losses').textContent = blackjackGame.losses;
            message = 'You lost!';
            messageColour = 'red';
            lossSound.play();
        } else {
            document.querySelector('#draws').textContent = blackjackGame.draws;
            message = 'You drew!';
            messageColour = 'black';
        }

        document.querySelector('#blackjackResult').textContent = message;
        document.querySelector('#blackjackResult').style.color = messageColour;
  }
}