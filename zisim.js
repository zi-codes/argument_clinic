// Application to have an argument with you by replacing words in your
// statements with antonym found via the datamuse API

// Selecting page elements

const inputField = document.querySelector("#input");
const submit = document.querySelector("#submit");
const responseField = document.querySelector("#responseField");

let responseArray = [];

// Functions

// Function to clear previous response and displays
// new response
const displayResponse = event => {
  event.preventDefault();
  responseField.innerHTML = " ";
  getResponse();
};

//converts user input into an array and finds antonym for each word
const getResponse = () => {
  const sentenceAsArray = inputField.value.split(" ");

  const promisesArray = sentenceAsArray.map(word => getAntonym(word));

  Promise.all(promisesArray).then(function(responseAsArray) {
    const response = decideResponse(responseAsArray, sentenceAsArray);
    responseField.innerHTML = response;
  });
};

//fetch antonym for given word from datamuse
const getAntonym = wordQuery => {
  const proxyurl = "";
  const url = "https://api.datamuse.com/words?";
  const queryParams = "rel_ant=";
  const endpoint = `${url}${queryParams}${wordQuery}`;

  return fetch(endpoint)
    .then(function(response) {
      return response.json();
    })
    .then(function(myJson) {
      return renderResponse(myJson, wordQuery);
    });
};

//decides whether to return the antonym response or a randomised
//response if the database was unable to find any antonyms
const decideResponse = (responseAsArray, sentenceAsArray) => {
  console.log(responseArray);
  console.log(sentenceAsArray);
  if (responseAsArray.join(" ") === sentenceAsArray.join(" ")) {
    return alternativeResponse();
  } else {
    return responseAsArray.join(" ");
  }
};

//chooses the first antonym on the list, or returns original word if
//non-existent
const renderResponse = (response, wordQuery) => {
  return response.length > 0 ? response[0]["word"] : wordQuery;
};

//chooses a random response from a predefined array in case no
//antonyms were found
const alternativeResponse = () => {
  const alternativeResponseArray = ["No", "Not so", "I disagree", "Nonsense"];
  const randomResult = Math.floor(
    Math.random() * alternativeResponseArray.length
  );

  return alternativeResponseArray[randomResult];
};

//event listener
submit.addEventListener("click", displayResponse);
