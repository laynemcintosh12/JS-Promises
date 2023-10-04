/* // Part 1: Number Facts

// 1)
const favoriteNumber = 12; 
const apiUrl = `http://numbersapi.com/${favoriteNumber}?json`;

axios
  .get(apiUrl)
  .then(response => {
    console.log(response.data);
  })
  .catch(error => console.error('Error:', error));


// 2)
const numbers = [4, 52, 19, 3];
const multiNumberApiUrl = `http://numbersapi.com/${numbers.join()}?json`;

axios
  .get(multiNumberApiUrl)
  .then(response => {
    const data = response.data;
    for (const number in data) {
      const fact = data[number];
      console.log(fact);
    }
  })
  .catch(error => console.error('Error:', error));


// 3)
const apiUrlMultiple = `http://numbersapi.com/${favoriteNumber}/1..4?json`;

axios
  .get(apiUrlMultiple)
  .then(response => {
    const facts = Object.values(response.data); // Get an array of facts
    return Promise.all(facts.map(fact => axios.get(`http://numbersapi.com/${fact}?json`)));
  })
  .then(responses => {
    responses.forEach((response, index) => {
      const fact = response.data.text;
      console.log(`${(index + 1)}. ${fact}`);
    });
  })
  .catch(error => console.error('Error:', error));





// Part 2: Deck of Cards

// 1)
axios
  .get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
  .then(response => {
    const deckId = response.data.deck_id;
    return axios.get(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`);
  })
  .then(response => {
    const card = response.data.cards[0];
    console.log(`Card drawn: ${card.value} of ${card.suit}`);
  })
  .catch(error => console.error('Error:', error));


// 2)
axios
  .get(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`)
  .then(response => {
    const card1 = response.data.cards[0];
    const card2 = response.data.cards[1];
    console.log(`Card 1: ${card1.value} of ${card1.suit}`);
    console.log(`Card 2: ${card2.value} of ${card2.suit}`);
  })
  .catch(error => console.error('Error:', error));

 */




  /* USING ASYNC / AWAIT */


// Part 1: Number Facts
// Problem 1: Get a fact about your favorite number
async function getFavoriteNumberFact() {
  const favoriteNumber = 12; 
  const apiUrl = `http://numbersapi.com/${favoriteNumber}?json`;

  try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      document.getElementById('fact1').textContent = data.text;
  } catch (error) {
      console.error('Error:', error);
  }
}


// Problem 2: Get data on multiple numbers in a single request
async function getMultipleNumberFacts() {
  const numbers = [3, 5, 9, 13]; 
  const multiNumberApiUrl = `http://numbersapi.com/${numbers.join()}?json`;

  try {
      const response = await fetch(multiNumberApiUrl);
      const data = await response.json();
      const factList = Object.values(data);
      const ul = document.getElementById('fact2');
      factList.forEach(fact => {
          const li = document.createElement('li');
          li.textContent = fact;
          ul.appendChild(li);
      });
  } catch (error) {
      console.error('Error:', error);
  }
}


// Problem 3: Get 4 facts on your favorite number
async function getFourFavoriteNumberFacts() {
  const favoriteNumber = 12; 
  const apiUrlMultiple = `http://numbersapi.com/${favoriteNumber}/1..4?json`;

  try {
      const response = await fetch(apiUrlMultiple);
      const data = await response.json();
      const factList = Object.values(data);
      const ul = document.getElementById('fact3');
      factList.forEach(fact => {
          const li = document.createElement('li');
          li.textContent = fact;
          ul.appendChild(li);
      });
  } catch (error) {
      console.error('Error:', error);
  }
}



// Part 2: Deck of Cards
// Problem 1: Request a single card from a newly shuffled deck
document.getElementById('drawCardButton1').addEventListener('click', async () => {
  try {
      const response = await fetch('https://deckofcardsapi.com/api/deck/new/draw/?count=1');
      const data = await response.json();
      const card = data.cards[0];
      document.getElementById('cardInfo1').textContent = `${card.value} of ${card.suit}`;
  } catch (error) {
      console.error('Error:', error);
  }
});


// Problem 2: Request two cards from the same deck
document.getElementById('drawCardButton2').addEventListener('click', async () => {
  try {
      const response = await fetch('https://deckofcardsapi.com/api/deck/new/draw/?count=2');
      const data = await response.json();
      const card1 = data.cards[0];
      const card2 = data.cards[1];
      document.getElementById('cardInfo2').textContent = `Card 1: ${card1.value} of ${card1.suit}, Card 2: ${card2.value} of ${card2.suit}`;
  } catch (error) {
      console.error('Error:', error);
  }
});


// Problem 3: Build an HTML page to draw cards from a deck
const deckInfo = document.getElementById('deckInfo');
const drawCardButton3 = document.getElementById('drawCardButton3');

async function createDeck() {
  try {
      const response = await fetch('https://deckofcardsapi.com/api/deck/new/');
      const data = await response.json();
      return data.deck_id;
  } catch (error) {
      console.error('Error:', error);
  }
}

async function drawCard(deckId) {
  try {
      const response = await fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`);
      const data = await response.json();
      return data.cards[0];
  } catch (error) {
      console.error('Error:', error);
  }
}

let currentDeckId = null;

drawCardButton3.addEventListener('click', async () => {
  if (!currentDeckId) {
      currentDeckId = await createDeck();
      deckInfo.textContent = 'Deck created. Click again to draw a card.';
  } else {
      const card = await drawCard(currentDeckId);
      if (card) {
          deckInfo.textContent = `${card.value} of ${card.suit}`;
      } else {
          deckInfo.textContent = 'No cards left in the deck.';
          drawCardButton3.disabled = true;
      }
  }
});





