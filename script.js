const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');
const notWorking = document.getElementById('notWorking');
const body = document.getElementsByTagName("BODY")[0];


function showLoadingSpinner() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

function removeLoadingSpinner() {
    if (loader.hidden == false) {
        quoteContainer.hidden = false;
        loader.hidden = true;
    }
}


// get quote from API response
errorCount = 0;

async function getQuote() {
    notWorking.hidden = true;

    // show loader
    showLoadingSpinner();
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
    try {
        // if there is error in server , show user the message i.e the website is not working
        if (errorCount > 6) {
            notWorking.hidden = false;
            loader.hidden = true;
            quoteContainer.hidden = true;
            body.classList.remove('whenerrinAPI');

        } else {
            // go to resourse and fetching data
            const response = await fetch(proxyUrl + apiUrl);
            // converting the responce or fetched data into json
            const data = await response.json();
            console.log(data);
            // assigning or separating data 
            // check if there is no author i.e blank for the quote
            if (data.quoteAuthor === '') {
                authorText.innerText = "Unknown";
            } else {
                authorText.innerText = data.quoteAuthor;
            }
            console.log(authorText);
            // reduce font size for long quotes
            if (data.quoteText.length > 120) {
                quoteText.classList.add('long-quote');
            } else {
                quoteText.classList.remove('long-quote');
            }
            quoteText.innerText = data.quoteText;
            console.log(quoteText);
            // stop loader show quote 
            removeLoadingSpinner();
        }
    } catch (error) {
        errorCount = errorCount + 1;
        getQuote();
        console.log('whoops, no quote', error);
    }

}
// Tweet Quote

function tweetQuote() {
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterUrl, '_blank')
}

// Event Listeners
newQuoteBtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click', tweetQuote);

// On Load
getQuote();