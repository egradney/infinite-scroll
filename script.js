const imageContainer = document.getElementById('image-container');
const loader  = document.getElementById('loader');
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];
// Unsplash API
const count = 30;
const apiKey = 'wUWn_Vt-YdpClrfBX-veZ_Bfa31pbcmxoAnI0eDyNyA';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

//Check if all images were loaded
function imageLoaded() {
    imagesLoaded++;
    if (imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
    }
}
//Helper function to set attributes on DOM Elements

function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

function displayPhotos() {
    totalImages = photosArray.length;
    try {
        photosArray.forEach((photo) => {
        //Create <a> to link to Unsplash
        const item = document.createElement('a');
        setAttributes(item,  
            {'href': photo.links.html,
            'target': '_blank',
            }
        );
        //Create <img> for photo
        const img = document.createElement('img');
        setAttributes(img,  
            {'src': photo.urls.regular,
            'alt': photo.alt_description,
            'title': photo.alt_description,
            }
        );
        //Event listsner, check when finsihed loading
        img.addEventListener('load', imageLoaded);
        //Put <img> inside <a>
        item.appendChild(img);
        imageContainer.appendChild(item);
        });
    } catch (e) {
        alert(e);
    }
    // hideLoadingSpinner();
}

function showLoadingSpinner() {
    loader.hidden = false;
    imageContainer.hidden = true;
}

function hideLoadingSpinner() {
    imageContainer.hidden = false;
    loader.hidden = true;
}


//get photos
async function getPhotos() {
    // showLoadingSpinner();
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
    } catch (e) {
        //catch error
        alert("Oops! Please reload the page.");
    }
    
}

//Check to see if scrolling near bottom of page, Load more Photos
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        getPhotos();
        ready = false;
        imagesLoaded = 0;
    }
});

// function createClosure() {
//     counter = 0;
//     return function initialLoad() {
//         if (counter = 0) {
//             showLoadingSpinner();
//             counter++;
//         } 
//     }
// }

//On Load
getPhotos();


