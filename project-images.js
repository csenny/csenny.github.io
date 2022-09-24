
// Grab dom elements
const images = document.querySelectorAll('[data-src]');
let numLoaded = 0;

// Called once all low-res images on the page are loaded
const finishedLoading = () => {
    // upon first load, remove loading indicator
    document.body.className = '';
    document.getElementById('loading-overlay')?.remove();
    
    // replace images with high quality versions
    for (const image of images) {
        const dummy = new Image;
        dummy.src = image.getAttribute('data-src');
        dummy.onload = () => {
            image.src = dummy.src;
        };
    }
    
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
    image.setAttribute('data-src', `${originalSrc.substring(0, lastSlash)}medium/${originalSrc.substring(lastSlash)}`); // use medium images instead of really large ones
    image.onload = () => {
        ++numLoaded;
        image.onload = () => {}; // remove event for when the image loads again with the new src
        if (numLoaded >= images.length) {
            finishedLoading();
        }
    };
}
if (images.length <= 0) finishedLoading();
