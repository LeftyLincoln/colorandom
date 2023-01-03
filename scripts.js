var currentPalette 

window.addEventListener("load", createPalette)


function createHexCode() {
    var hexCharacters = ["A", "B", "C", "D", "E", "F", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
    var hexCode = [];
    for (var i = 0; i < 6; i++) {
        hexCode.push(hexCharacters[getRandomIndex(hexCharacters)])
    }
    return `#${hexCode.join("")}`
}

function getRandomIndex(array) {
    return Math.floor(Math.random() * array.length);
}

function createPalette() {
    currentPalette = new Palette([new Color(createHexCode()),new Color(createHexCode()),new Color(createHexCode()),new Color(createHexCode()),new Color(createHexCode())])
}

