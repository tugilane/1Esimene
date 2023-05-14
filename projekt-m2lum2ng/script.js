//array

let cards = [];

for (let i = 1; i <= 24; i++) {
    let card = {
      icon: `./assets/picture${i}.png`
    };
    cards.push(card);
    cards.push(card);
  }

// shuffling the cards

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  shuffleArray(cards)
  


// creating a cards

function createCard(card) {
    return `
      <div class="card">
        <img src="${card.icon}" alt="card image">
      </div>
    `;
  }

// displaying the cards

function displayCards() {
    let gridElement = document.createElement("div");
    gridElement.classList.add("grid-container");
    let outputElement = document.querySelector(".output");
    for (let i = 0; i < cards.length; i++) {
      let cardElement = document.createElement("div");
      cardElement.classList.add("card");
      cardElement.innerHTML = createCard(cards[i]);
      gridElement.appendChild(cardElement);
    }
    outputElement.appendChild(gridElement);
  }

displayCards()

console.log(cards)
