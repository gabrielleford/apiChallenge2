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

    let title = document.createElement('h3');
    let dateOfPic = document.createElement('h4');
    let description = document.createElement('p');
    let mediaDiv = document.createElement('div');
    let media;

    if (data.media_type === "video") { // attach ratio class to div
        media = document.createElement('iframe');
        mediaDiv.setAttribute('class', 'ratio ratio-16x9');
    } else {
        media = document.createElement('img');
        media.setAttribute('class', 'img-fluid');
    }

    title.innerText = data.title;
    title.setAttribute('class', 'text-light');
    dateOfPic.innerText = `${month} ${sepDay}, ${sepYear}`;
    dateOfPic.setAttribute('class', 'text-light');
    media.src = data.url;
    description.innerText = data.explanation;
    description.setAttribute('class', 'text-light');

    resultsDiv.appendChild(title);
    resultsDiv.appendChild(dateOfPic);
    resultsDiv.appendChild(mediaDiv);
    mediaDiv.appendChild(media);
    resultsDiv.appendChild(description);
}

// * FINISH TOMORROW
    /* 
        - create iframe and img css/maybe add id to a single div and edit it the same?
        - edit innerText of title & description
        - edit src of media
        - add any css that needs to appear on fetch
        - append all elements appropriately
        - add loop to remove current elements on new search
    */