// Part 1: Number Facts

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
