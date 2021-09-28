// Creating URL variables for fetch
let baseURL = 'https://api.nasa.gov/planetary/apod?api_key=xLBmSdVETcqUsOAY73zIXHUCrkUv1yxvFaRlLRjU&date=';
let fullURL;

// Grabbing form for event listener and creating a date variable
let search = document.querySelector('form');
let date;
search.addEventListener('submit', fetchPicture);

// Setting the max date allowed to current day
let dateInput = document.querySelector('#date');
let currentDate = new Date();
let dd = currentDate.getDate();
let mm = currentDate.getMonth();
let yyyy = currentDate.getFullYear();

if (dd < 10) {
    dd = '0' + dd;
}
if (mm < 10) {
    mm = '0' + mm;
}

dateInput.max = `${yyyy}-${mm}-${dd}`;

// * FETCH *
// Function that will fetch the picture or video from APOD
async function fetchPicture(e) {
    e.preventDefault();

    date = document.getElementById('date').value; // Assigning that inputted date to the date variable
    console.log(date);
    fullURL = `${baseURL}${date}`;

    const response = await fetch(fullURL);
    const json = await response.json();
    displayPicture(json);
}

// * DISPLAY *
function displayPicture(data) {
    console.log(data);
}
