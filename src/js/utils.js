

document.addEventListener( "DOMContentLoaded", testXXX.XYZ, false);
var testXXX = function XYZ() {
    return alert("Hello world XXX");
};

document.addEventListener( "DOMContentLoaded", testZZZ, false);
function testZZZ() {
    return alert("Hello world ZZZ");
}

document.addEventListener( "DOMContentLoaded", testXXX, false);


var windowWidth = Window.innerHeight;
var windowHeight = Window.innerWidth;

// var windowWidthDOM = document.getElementsById('window-size-width')
// var windowHeightDOM = document.getElementsById('window-size-height')

// var windowSize = function () {
//     console.log(windowWidth + 'px x' + windowHeight + 'px');
// }

console.log(windowWidth + 'px x' + windowHeight + 'px');