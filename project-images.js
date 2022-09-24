
// Start images at smaller size, then upscale as soon as possible
const images = document.querySelectorAll('[data-src]');
for (const image of images) {
    const originalSrc = image.getAttribute('data-src');
    const lastSlash = originalSrc.lastIndexOf('/') + 1;
    image.src = `${originalSrc.substring(0, lastSlash)}small/${originalSrc.substring(lastSlash)}`;
}

requestAnimationFrame(() => {
    // upon first load, remove loading indicator
    document.body.className = '';
    document.getElementById('loading-overlay').remove();
    
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
});
