let baseURL = 'https://api.nasa.gov/planetary/apod?api_key=xLBmSdVETcqUsOAY73zIXHUCrkUv1yxvFaRlLRjU&date=2019-10-04';
let fullURL;

let dateInput = document.querySelector('#date');
dateInput.max = new Date().toISOString().split('T')[0];

fetch(baseURL)
    .then(response => response.json())
    .then(json => console.log(json))

