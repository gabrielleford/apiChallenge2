// Creating URL variables for fetch
let baseURL = 'https://api.nasa.gov/planetary/apod?api_key=xLBmSdVETcqUsOAY73zIXHUCrkUv1yxvFaRlLRjU&date=';
let fullURL;

let resultsDiv = document.getElementById('results');

// Grabbing form for event listener and creating a date variable
let search = document.querySelector('form');
let date;
search.addEventListener('submit', fetchPicture);
let random = document.getElementById('random');
random.addEventListener('click', randPicture);

// Setting the max date allowed to current day
let dateInput = document.querySelector('#date');
let currentDate = new Date();
let dd = currentDate.getDate();
let mm = currentDate.getMonth() + 1;
let yyyy = currentDate.getFullYear();

if (dd < 10) {
    dd = '0' + dd;
}
if (mm < 10) {
    mm = '0' + mm;
}

dateInput.max = `${yyyy}-${mm}-${dd}`;

// Creating variables to hold months to add spelled out date to display
let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
let month;
let sepDay;
let sepYear;

// * FETCH *
// Function that will fetch the picture or video from APOD
async function fetchPicture(e) {
    e.preventDefault();

    date = document.getElementById('date').value; // Assigning that inputted date to the date variable
    // console.log(date);
    fullURL = `${baseURL}${date}`;

    const response = await fetch(fullURL);
    const json = await response.json();
    displayPicture(json);
}

// * Random Fetch *
// Function that will fetch a random picture or video from APOD
async function randPicture() {
    fullURL = `${baseURL}&count=1`;

    const resp = await fetch(fullURL);
    const rJson = await resp.json();
    displayRandom(rJson);
}

// * DISPLAY *
function displayPicture(data) {
    while(resultsDiv.firstChild) {
        resultsDiv.removeChild(resultsDiv.lastChild);
    }

    // Splitting date into an array in order to display date of post
    let sepDate = date.split('-');
    let [sepYear, sepMonth, sepDay] = sepDate;
    if (sepMonth.startsWith('0')) {
        sepMonth = sepMonth.slice(1);
    }

    month = months[sepMonth - 1];
    
    // Cutting off the 0 if the day is less than 10
    if (sepDay.startsWith('0')) {
        sepDay = sepDay.slice(1);
    }

    // Creating all the elements
    let title = document.createElement('h3');
    let dateOfPic = document.createElement('h4');
    let description = document.createElement('p');
    let mediaDiv = document.createElement('div');
    let descripDiv = document.createElement('div');
    let media;

    // Inserting data into elements and styling
    title.innerText = data.title;
    title.setAttribute('class', 'text-light text-center display-5');
    dateOfPic.innerText = `${month} ${sepDay}, ${sepYear}`;
    dateOfPic.setAttribute('class', 'text-light text-center fs-4');

    // Adding copyright information
    if (data.copyright) {
        description.innerHTML = `${data.explanation} <br><br> <small>Copyright: ${data.copyright}<small>`;
    } else {
        description.innerText = data.explanation;
    }
    description.setAttribute('class', 'text-light fs-5 pt-3');
    description.style.textIndent = '2em';
    descripDiv.setAttribute('class', 'ms-auto me-auto');
    descripDiv.style.maxWidth = '800px';
    resultsDiv.style = "background-color: rgba(8, 7, 8, 0.85); border-radius: 10px;";

    // Setting up code depending on if media type is video or img/gif
    if (data.media_type === "video") { // attach ratio class to div
        media = document.createElement('iframe');
        media.src = data.url;
        media.setAttribute('class', 'mx-auto d-block');
        mediaDiv.setAttribute('class', 'ratio ratio-16x9 ms-auto me-auto');
        mediaDiv.style.maxWidth = '960px';
        // Appending everything to the div in the HTML doc
        mediaDiv.appendChild(media);
        descripDiv.appendChild(description);
        resultsDiv.appendChild(title);
        resultsDiv.appendChild(dateOfPic);
        resultsDiv.appendChild(mediaDiv);
        resultsDiv.appendChild(descripDiv);
    } else {
        media = document.createElement('img');
        media.src = data.url;
        media.setAttribute('class', 'img-fluid mx-auto d-block h-75');
        mediaDiv.setAttribute('class', 'ms-auto me-auto pt-3');
        // Appending everything to the div in the HTML doc
        mediaDiv.appendChild(media);
        descripDiv.appendChild(description);
        resultsDiv.appendChild(title);
        resultsDiv.appendChild(dateOfPic);
        resultsDiv.appendChild(mediaDiv);
        mediaDiv.appendChild(descripDiv);
    }
}

// * Random Display *
function displayRandom(randData) {
    while(resultsDiv.firstChild) {
        resultsDiv.removeChild(resultsDiv.lastChild);
    }

    rData = randData[0];
    date = rData.date;

    // Splitting date into an array in order to display date of post
    let sepDate = date.split('-');
    let [sepYear, sepMonth, sepDay] = sepDate;
    if (sepMonth.startsWith('0')) {
        sepMonth = sepMonth.slice(1);
    }

    month = months[sepMonth - 1];

    // Cutting off the 0 if the day is less than 10
    if (sepDay.startsWith('0')) {
        sepDay = sepDay.slice(1);
    }

    // Creating all the elements
    let title = document.createElement('h3');
    let dateOfPic = document.createElement('h4');
    let description = document.createElement('p');
    let mediaDiv = document.createElement('div');
    let descripDiv = document.createElement('div');
    let media;

    // Inserting data into elements and styling
    title.innerText = rData.title;
    title.setAttribute('class', 'text-light text-center display-5');
    dateOfPic.innerText = `${month} ${sepDay}, ${sepYear}`;
    dateOfPic.setAttribute('class', 'text-light text-center fs-4');

    // Adding copyright information
    if (rData.copyright) {
        description.innerHTML = `${rData.explanation} <br><br> <small>Copyright: ${rData.copyright}<small>`;
    } else {
        description.innerText = rData.explanation;
    }
    description.setAttribute('class', 'text-light fs-5 pt-3');
    description.style.textIndent = '2em';
    descripDiv.setAttribute('class', 'ms-auto me-auto');
    descripDiv.style.maxWidth = '800px';
    resultsDiv.style = "background-color: rgba(8, 7, 8, 0.85); border-radius: 10px;";


    // Setting up code depending on if media type is video or img/gif
    if (rData.media_type === "video") { // attach ratio class to div
        media = document.createElement('iframe');
        media.src = rData.url;
        media.setAttribute('class', 'mx-auto d-block');
        mediaDiv.setAttribute('class', 'ratio ratio-16x9 ms-auto me-auto');
        mediaDiv.style.maxWidth = '960px';
        // Appending everything to the div in the HTML doc
        mediaDiv.appendChild(media);
        descripDiv.appendChild(description);
        resultsDiv.appendChild(title);
        resultsDiv.appendChild(dateOfPic);
        resultsDiv.appendChild(mediaDiv);
        resultsDiv.appendChild(descripDiv);
    } else {
        media = document.createElement('img');
        media.src = rData.url;
        media.setAttribute('class', 'img-fluid mx-auto d-block');
        mediaDiv.setAttribute('class', 'col ms-auto me-auto pt-3');
        // Appending everything to the div in the HTML doc
        mediaDiv.appendChild(media);
        descripDiv.appendChild(description);
        resultsDiv.appendChild(title);
        resultsDiv.appendChild(dateOfPic);
        resultsDiv.appendChild(mediaDiv);
        mediaDiv.appendChild(descripDiv);
    }
}