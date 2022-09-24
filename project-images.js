
// Grab dom elements
const images = document.querySelectorAll('[data-src]');
let numLoaded = 0;

// Called once all low-res images on the page are loaded
const finishedLoading = () => {
    // upon first load, remove loading indicator
    document.body.className = '';
    document.getElementById('loading-overlay')?.remove();
    
    // load youtube embeds
    const ytEmbeds = document.querySelectorAll('[data-video]');
    for (const embed of ytEmbeds) {
        embed.innerHTML = `<iframe src="${embed.getAttribute('data-video')}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
    }
}

// Start images at smaller size, then upscale as soon as possible
for (const image of images) {
    const originalSrc = image.getAttribute('data-src');
    const lastSlash = originalSrc.lastIndexOf('/') + 1;
    image.src = `${originalSrc.substring(0, lastSlash)}small/${originalSrc.substring(lastSlash)}`;
    image.setAttribute('data-src', `${originalSrc.substring(0, lastSlash)}large/${originalSrc.substring(lastSlash)}`); // use /large images when viewing in full-screen
    image.onload = () => {
        ++numLoaded;
        image.onload = () => {}; // remove event for when the image loads again with the new src
        if (numLoaded >= images.length) {
            finishedLoading();
        }
        
        // Replace with medium/large version depending on client rect
        const dummy = new Image;
        const rect = image.getBoundingClientRect();
        const size = rect.width > 600 || rect.height > 600 ? 'large' : 'medium'; // if the image is smaller than 600x600, the 512x512 version should be enough
        dummy.src = `${originalSrc.substring(0, lastSlash)}${size}/${originalSrc.substring(lastSlash)}`;
        dummy.onload = () => {
            image.src = dummy.src;
            if (size == 'medium') {
                // also pre-load the large size once the medium's ready, for the full-screen viewer
                dummy.onload = () => {};
                dummy.src = `${originalSrc.substring(0, lastSlash)}large/${originalSrc.substring(lastSlash)}`;
            }
        };
    };
}
if (images.length <= 0) finishedLoading();
