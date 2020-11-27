
function clamp(t, a, b){
    return t < a ? a : t > b ? b : t;
}

window.onload = function(){
    let images = document.querySelectorAll("img[x-zoom]");
    let imageDisplay = document.querySelector("#image-display");
    let next = document.querySelector("#next");
    let prev = document.querySelector("#prev");
    let displayed = document.querySelector("#displayed");
    let selectedIndex;
    let moveToImage = function (index) {
        index = clamp(index, 0, images.length - 1);
        if(index == selectedIndex) return;
        selectedIndex = index;
        next.setAttribute('valid', '' + selectedIndex < images.length - 1);
        prev.setAttribute('valid', '' + selectedIndex > 0);
        displayed.src = images[selectedIndex].src;
    };
    imageDisplay.addEventListener('click', function () {
        imageDisplay.setAttribute('hidden', 'true');
        document.body.className = '';
    });
    document.addEventListener('keydown', function (e) {
        if(!imageDisplay.hasAttribute('hidden')){
            if(e.key == 'ArrowLeft' || e.keyCode == 37){
                moveToImage(selectedIndex-1);
            }else if(e.key == 'ArrowRight' || e.keyCode == 39){
                moveToImage(selectedIndex+1);
            }
        }
    });
    next.addEventListener('click', function (e) {
        moveToImage(selectedIndex+1);
        e.stopPropagation();
    });
    prev.addEventListener('click', function (e) {
        moveToImage(selectedIndex-1);
        e.stopPropagation();
    });
    images.forEach(function (image, index) {
        image.addEventListener('click', function () {
            imageDisplay.removeAttribute('hidden');
            document.body.className = 'no-scroll';
            moveToImage(index);
        });
    })
};
