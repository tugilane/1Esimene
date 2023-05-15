// Array of cards
let cards = [];

for (let i = 1; i <= 24; i++) {
  let card = {
    icon: `./assets/picture${i}.png`,
    matched: false,
    pairId: Math.ceil(i / 2) // Unique identifier for each pair
  };
  cards.push(card);
  cards.push({...card}); // Create a separate card object for the pair
}

// Shuffle the cards
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
  let visibilityClass = card.matched ? "visible" : "hidden";
  return `
    <div class="card">
      <img onclick="showPicture(this)" class="${visibilityClass}" data-pairId="${card.pairId}" src="${card.icon}" alt="card image">
    </div>
  `;
}

let firstCard = null;
let secondCard = null;

// Show picture when a card is clicked
function showPicture(element) {
  element.classList.remove('hidden');
  element.classList.add('visible');

  if (!firstCard) {
    firstCard = element;
  } else if (!secondCard) {
    secondCard = element;
    checkMatch();
  }
}

function checkMatch() {
  if (firstCard.dataset.pairId === secondCard.dataset.pairId) {
    // Match found
    let pairId = firstCard.dataset.pairId;
    let matchingCards = document.querySelectorAll(`[data-pairId="${pairId}"]`);
    matchingCards.forEach(card => {
      card.classList.remove('hidden');
      card.classList.add('visible');
    });
    cards.forEach(card => {
      if (card.pairId === pairId) {
        card.matched = true;
      }
    });
  } else {
    // Not a match
    setTimeout(() => {
      firstCard.classList.remove('visible');
      firstCard.classList.add('hidden');
      secondCard.classList.remove('visible');
      secondCard.classList.add('hidden');
    }, 1000);
  }

  firstCard = null;
  secondCard = null;
}

// Check if all pairs are matched
if (cards.every(card => card.matched)) {
  setTimeout(() => {
    alert('Congratulations! You have matched all pairs.');
  }, 500);
}

// Display the cards
function displayCards() {
  let gridElement = document.createElement("div");
  gridElement.classList.add("grid-container");
  let outputElement = document.querySelector(".output");
  for (let i = 0; i < cards.length; i++) {
    let cardElement = document.createElement("div");
    cardElement.innerHTML = createCard(cards[i]);
    gridElement.appendChild(cardElement);
  }
  outputElement.appendChild(gridElement);
}

displayCards();