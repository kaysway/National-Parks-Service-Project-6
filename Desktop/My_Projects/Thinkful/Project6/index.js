'use strict'

let apiKey = 'cDh0KgD29l79bp8oX2OeHMW6B3kP1mw0Y7r8XTGs';
let searchURL = 'https://api.nps.gov/api/v1/parks';

function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return queryItems.join('&');
}

function displayResults(responseJson) {
  //remove previous results
  console.log(responseJson);
  $('#results-list').empty();
  for (let i = 0; i < responseJson.length; i++){
    // for each object add a list item
    //with the park url, description,
    //and full name
    $('#results-list').append(`<li><h3><a href="${responseJson[i].url}">${responseJson[i].fullName}</h3></a><p>${responseJson[i].description}</p></li>`)};
  //display the results section  
  $('#results').removeClass('hidden');
};

function getStateParks(query, maxResults=10) {
  const params = {
    key: apiKey,
    q: query,
    maxResults
  };
  let queryString = formatQueryParams(params)
  let url = searchURL + '?' + queryString;

  console.log(url);

  fetch(url)
    .then(response => response.json())
    .then(responseJson => displayResults(responseJson.data))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
};

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const searchTerm = $('#js-search-term').val();
    const maxResults = $('#js-max-results').val();
    getStateParks(searchTerm, maxResults);
  });
}

$(watchForm);