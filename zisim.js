// Application to have an argument with you by replacing words in your
// statements with antonym found via the datamuse API


// Selecting page elements

const inputField = document.querySelector('#input');
const submit = document.querySelector('#submit');
const responseField = document.querySelector('#responseField');

let responseArray = [];


// Functions

const getAntonym = (wordQuery,counter,sentenceAsArray) => {

	// AJAX function to fetch antonym for given word from datamuse

	const proxyurl = ""
	const url = 'https://api.datamuse.com/words?';
	const queryParams = 'rel_ant=';
	const endpoint = `${proxyurl}${url}${queryParams}${wordQuery}`;
	const xhr = new XMLHttpRequest();

	xhr.responseType = 'json';
	xhr.onreadystatechange = () => {
		if (xhr.readyState === XMLHttpRequest.DONE) {

			console.log(xhr.response);
			renderResponse(xhr.response,wordQuery,counter,sentenceAsArray);
		}
	}

	xhr.open('GET', endpoint);
	xhr.send();

}

const displayResponse = (event) => {

	// Function to clear previous response and displays
	// new response

	event.preventDefault();

	while(responseField.firstChild){

		responseField.removeChild(responseField.firstChild);

	}

	responseArray = []

	getResponse()

}


const getResponse = () => {
	const sentenceAsArray = inputField.value.split(" ");
	let counter = 0;
	sentenceAsArray.forEach(function(wordQuery) {
		getAntonym(wordQuery,counter,sentenceAsArray)
		counter++;
	})

	responseField.innerHTML = responseArray.join(" ")
}

const renderResponse = (response,wordQuery,counter,sentenceAsArray) => {

  if (response.length === 0) {
		responseArray[counter] = wordQuery
	}else{
		responseArray[counter] = response[0]["word"]
	}
	console.log(sentenceAsArray)
	console.log(responseArray)

	if (JSON.stringify(responseArray) === JSON.stringify(sentenceAsArray)) {
		alternativeResponse(sentenceAsArray)
	}else{
		responseField.innerHTML = responseArray.join(" ")
	}
}

const alternativeResponse = (sentenceAsArray) => {

 const alternativeResponseArray = ["No", "Not so", "I disagree", "Nonsense"]
 const randomResult = Math.floor(Math.random() * alternativeResponseArray.length)

 responseField.innerHTML = alternativeResponseArray[randomResult]

}

submit.addEventListener('click', displayResponse);
