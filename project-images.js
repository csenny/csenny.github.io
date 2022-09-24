
// Start images at smaller size, then upscale as soon as possible
const images = document.querySelectorAll('[data-src]');
for (const image of images) {
    const originalSrc = image.getAttribute('data-src');
    const lastSlash = originalSrc.lastIndexOf('/') + 1;
    image.src = `${originalSrc.substring(0, lastSlash)}small/${originalSrc.substring(lastSlash)}`;
}
requestAnimationFrame(() => {
    for (const image of images) {
        image.src = image.getAttribute('data-src');
    }
});
