
// Grab dom elements
const zoomableImages = document.querySelectorAll("img[x-zoom]");
const imageDisplay = document.querySelector("#image-display");
const next = document.querySelector("#next");
const prev = document.querySelector("#prev");
const displayed = document.querySelector("#displayed");
let selectedIndex;

const clamp = (t, a, b) => t < a ? a : t > b ? b : t;

// Move to image designated by given index
const moveToImage = (index) => {
    index = clamp(index, 0, zoomableImages.length - 1);
    if(index == selectedIndex) return;
    selectedIndex = index;
    next.setAttribute('valid', '' + selectedIndex < zoomableImages.length - 1);
    prev.setAttribute('valid', '' + selectedIndex > 0);
    const ogImage = zoomableImages[selectedIndex];
    if (ogImage.hasAttribute('data-src')) {
        displayed.src = ogImage.getAttribute('data-src');
    } else {
        displayed.src = ogImage.src;
    }
};

// Assign click handler for each image to go full-screen
zoomableImages.forEach((image, index) => {
    image.addEventListener('click', () => {
        imageDisplay.removeAttribute('hidden');
        document.body.className = 'no-scroll';
        moveToImage(index);
    });
});

// Upon clicking the full-screen display, hide it
imageDisplay.addEventListener('click', () => {
    imageDisplay.setAttribute('hidden', 'true');
    document.body.className = '';
});

// Key bindings for left/right navigation
document.addEventListener('keydown', (e) => {
    if (!imageDisplay.hasAttribute('hidden')) {
        if (e.key == 'ArrowLeft' || e.keyCode == 37) {
            moveToImage(selectedIndex-1);
        } else if (e.key == 'ArrowRight' || e.keyCode == 39) {
            moveToImage(selectedIndex+1);
        } else if(e.key == 'Escape' || e.keyCode == 27) {
            imageDisplay.setAttribute('hidden', 'true');
            document.body.className = '';
        }
    }
});

// Click handlers for left/right navigation
next.addEventListener('click', (e) => {
    moveToImage(selectedIndex+1);
    e.stopPropagation();
});
prev.addEventListener('click', (e) => {
    moveToImage(selectedIndex-1);
    e.stopPropagation();
});
