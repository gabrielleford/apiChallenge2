// Creating URL variables for fetch
let baseURL = 'https://api.nasa.gov/planetary/apod?api_key=xLBmSdVETcqUsOAY73zIXHUCrkUv1yxvFaRlLRjU&date=';
let fullURL;

let resultsDiv = document.getElementById('results');

// Grabbing form for event listener and creating a date variable
let search = document.querySelector('form');
let date;
search.addEventListener('submit', fetchPicture);

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

// * DISPLAY *
function displayPicture(data) {
    console.log(data);

    while(resultsDiv.firstChild) {
        resultsDiv.removeChild(resultsDiv.lastChild);
    }

    // Splitting date into an array in order to display date of post
    let sepDate = date.split('-');
    let sepMonth = sepDate[1].slice(1);
    month = months[sepMonth-1];
    sepDay = sepDate[2];
    sepYear = sepDate[0];

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
    descripDiv.style.width = '800px'
    descripDiv.setAttribute('class', 'd-block mx-auto');
    let media;

    // Setting up code depending on if media type is video or img/gif
    if (data.media_type === "video") { // attach ratio class to div
        media = document.createElement('iframe');
        media.src = `${data.url}?autoplay=1`;
        media.setAttribute('class', 'mx-auto d-block');
        mediaDiv.setAttribute('class', 'ratio ratio-16x9 ms-auto me-auto');
        mediaDiv.style.width = '960px';
    } else {
        media = document.createElement('img');
        media.src = data.url;
        media.setAttribute('class', 'img-fluid mx-auto d-block mw-100 mh-100');
        mediaDiv.setAttribute('class', 'ms-auto me-auto pt-3');
        mediaDiv.style = "width: 900px; height: 900px";
    }

    // Inserting data into elements and styling
    title.innerText = data.title;
    title.setAttribute('class', 'text-light text-center display-5');
    dateOfPic.innerText = `${month} ${sepDay}, ${sepYear}`;
    dateOfPic.setAttribute('class', 'text-light text-center fs-4');
    description.innerText = data.explanation;
    description.setAttribute('class', 'text-light fs-5');
    description.style.textIndent = '2em';
    resultsDiv.style = "background-color: rgba(8, 7, 8, 0.85); border-radius: 10px;";

    // Appending everything to the div in the HTML doc
    resultsDiv.appendChild(title);
    resultsDiv.appendChild(dateOfPic);
    resultsDiv.appendChild(mediaDiv);
    resultsDiv.appendChild(descripDiv);
    mediaDiv.appendChild(media);
    descripDiv.appendChild(description);
}