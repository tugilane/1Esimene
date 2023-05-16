// Array of cards
let cards = [];

for (let i = 1; i <= 24; i++) {
  let card = {
    icon: `./assets/picture${i}.png`,
    matched: false,
    id: i
  };
  cards.push(card);
  cards.push({...card}); // Create a separate card object for the pair
}

// Fisher-Yates shuffle algorithm
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

shuffleArray(cards);

// Create card elements
function createCard(card) {
  return `
      <img onclick="showPicture(this)" data-pairId="${card.id}" class="hidden icon" src="${card.icon}">
  `;
}

// Hide and reveal image after click
let currentPicture = null;

function showPicture(element) {
  
    element.classList.remove('hidden');
    element.classList.add('visible');

    if (currentPicture) {
        currentPicture.classList.remove('visible');
        currentPicture.classList.add('hidden');
    }

    currentPicture = element;
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