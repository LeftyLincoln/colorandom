var randomColorsSection = document.querySelector('.random-colors')
var newPaletteButton = document.querySelector('#new-palette-button')
var savedPalettesSection = document.querySelector('.saved-palettes')
var savePalettesButton = document.querySelector('#save-palette-button')


var currentPalette
var savedPalettes = []


window.addEventListener("load", createPalette)
newPaletteButton.addEventListener('click', createNewPalette)
savePalettesButton.addEventListener('click', savePalette)

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
    generateColors()    
}

function generateColors() {
   randomColorsSection.innerHTML = ''
   for (var i = 0; i < 5; i++) {
    randomColorsSection.innerHTML += 
        `<div class="boxes" id="swatch${[i]}">
            <div id="box-${[i]}"></div>
            <div class="hex-locks">
                <p class="label" id="label-${[i]}">${currentPalette.colors[i].hexCode}</p>
                <p class="locks" id="unlocked-${[i]}">🔓</p>
                <p class="locks hidden" id="locked-${[i]}">🔒</p>
            </div>
        </div>`
    document.getElementById(`box-${[i]}`).style.backgroundColor = `${currentPalette.colors[i].hexCode}`
   }
}

function createNewPalette() {
    for (var i = 0; i < 5; i++) {
        currentPalette.colors[i].hexCode = createHexCode()
    }
    generateColors()
}

function savePalette() {
    savedPalettes.push(currentPalette)
    createPalette()
    
}