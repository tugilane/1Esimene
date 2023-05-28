// Array of cards
let cards = [];

for (let i = 1; i <= 24; i++) {
  let card = {
    icon: `./assets/picture${i}.png`,
    matched: false,
    id: i
  };
  cards.push(card);
  cards.push({ ...card }); // Create a separate card object for the pair
}

// Fisher-Yates shuffle algorithm
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

let shuffledArray = shuffleArray(cards);
console.log(shuffledArray)

// Create card elements
function createCard(card) {
  return `
      <img onclick="showPicture(this)" data-pairId="${card.id}" class="hidden icon" src="${card.icon}">
  `;
}

// Hide or reveal image
let currentPicture = null;
let card1 = '';
let card2 = '';

function showPicture(element) {
  
  element.classList.remove('hidden');
  element.classList.add('visible');

  if (!currentPicture) {
    currentPicture = element;
    card1 = currentPicture;
    console.log(card1)
    return card1, currentPicture;
  } else {
    card2 = element;
    console.log(card2)
    let result = checkCard(card1, card2)
    if(result){
      alert("match")
    }else{
      alert("no")
    }

    card1.classList.remove('visible');
    card1.classList.add('hidden');
    card2.classList.remove('visible');
    card2.classList.add('hidden');

    currentPicture = null;
    card1 = '';
    return currentPicture, card1;
    
  }




}

// Display the cards
function displayCards() {
  let outputElement = document.querySelector(".grid-container");
  for (let i = 0; i < cards.length; i++) {
    let cardElement = document.createElement("div");
    cardElement.innerHTML = createCard(cards[i]);
    cardElement.classList.add("card");
    outputElement.appendChild(cardElement);
  }
}

displayCards();

console.log(cards)

function checkCard(card1, card2) {
  if (card1.getAttribute("data-pairId") === card2.getAttribute("data-pairId")) {
    return true;
  }
  else {
    return false;
  }
}