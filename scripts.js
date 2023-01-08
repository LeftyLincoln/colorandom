var randomColorsSection = document.querySelector('.random-colors')
var newPaletteButton = document.querySelector('#new-palette-button')
var savedPalettesSection = document.querySelector('.saved-palettes')
var savePalettesButton = document.querySelector('#save-palette-button')

var target
var currentPalette
var savedPalettes = []

window.addEventListener('load', createPalette)
newPaletteButton.addEventListener('click', createNewPalette)
savePalettesButton.addEventListener('click', savePalette)
randomColorsSection.addEventListener('click', lockColor)
savedPalettesSection.addEventListener('click', deletePalette)

function createHexCode() {
  var hexCharacters = ["A", "B", "C", "D", "E", "F", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
  var hexCode = []
  for (var i = 0; i < 6; i++) {
    hexCode.push(hexCharacters[getRandomIndex(hexCharacters)])
  }
  return `#${hexCode.join('')}`
}

function getRandomIndex(array) {
  return Math.floor(Math.random() * array.length)
}

function createPalette() {
  currentPalette = new Palette([new Color(createHexCode()), new Color(createHexCode()), new Color(createHexCode()), new Color(createHexCode()), new Color(createHexCode())])
  generateColors()    
}

function generateColors() {
  randomColorsSection.innerHTML = ''
  for (var i = 0; i < 5; i++) {
    randomColorsSection.innerHTML += 
      `<div class="swatches" id="swatch${[i]}">
        <div class="box" id="box-${[i]}"></div>
        <div class="hex-locks">
          <p class="label" id="label-${[i]}">${currentPalette.colors[i].hexCode}</p>
          <p class="locks" id="unlocked-${[i]}">
            <span class="material-symbols-outlined">
            lock_open
            </span>
          </p>
          <p class="locks hidden" id="locked-${[i]}">
            <span class="material-symbols-outlined">
            lock
            </span>
          </p>
        </div>
      </div>`
    if (currentPalette.colors[i].locked) {
      document.getElementById(`unlocked-${i}`).classList.add('hidden')
      document.getElementById(`locked-${i}`).classList.remove('hidden')
    }
    document.getElementById(`box-${[i]}`).style.backgroundColor = `${currentPalette.colors[i].hexCode}`
  }
}

function createNewPalette() {
  for (var i = 0; i < 5; i++) {
    if (!currentPalette.colors[i].locked) {
      currentPalette.colors[i].hexCode = createHexCode()
    }
  }
  generateColors()
}

function savePalette() {
  savedPalettes.push(currentPalette)
  createPalette()
  savedPalettesSection.innerHTML = ''
  for (var i = 0; i < savedPalettes.length; i++) {
    savedPalettesSection.innerHTML += `
      <div class="palette-container" id="container-${i}">
        <div class="mini-palette" style="background-color:${savedPalettes[i].colors[0].hexCode}"></div>
        <div class="mini-palette" style="background-color:${savedPalettes[i].colors[1].hexCode}"></div>
        <div class="mini-palette" style="background-color:${savedPalettes[i].colors[2].hexCode}"></div>
        <div class="mini-palette" style="background-color:${savedPalettes[i].colors[3].hexCode}"></div>
        <div class="mini-palette" style="background-color:${savedPalettes[i].colors[4].hexCode}"></div>
        <p class="trash" id='trash-${i}'>🗑</p>
      </div>`
  }
}

function lockColor(event) {
  target = event.target.parentElement.id.slice(6)
  document.getElementById(`unlocked-${target}`).classList.toggle('hidden')
  document.getElementById(`locked-${target}`).classList.toggle('hidden')
  if (!currentPalette.colors[target].locked){
    currentPalette.colors[target].locked = true
  } else {
    currentPalette.colors[target].locked = false
  }
}

function deletePalette(event) {
  target = event.target.parentElement 
  if (event.target.className === 'trash') {
    target.remove()
    savedPalettes.splice(target.id.slice(5), 1)
  }
}