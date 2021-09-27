let baseURL = 'https://api.nasa.gov/planetary/apod?api_key=xLBmSdVETcqUsOAY73zIXHUCrkUv1yxvFaRlLRjU&date=';
let fullURL;

fetch(baseURL)
    .then(response => response.json())
    .then(json => console.log(json))

