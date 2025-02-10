import { gameOver } from "./gameOver.js";

const allWords = ['KINNARD','KOSHI','GINGER','SONNY','SOUP','INCENSE','GRAPEFRUIT','TATTOO','MAGENTA','MOTEL','LIBRARY','PIANO','PICKLE','MARTINI','SOFA','POND','DAISY','SALMON','PLUSIE','YOGA','GLASSES','CIGARETTE','BEACH','MAKEUP','TULIP','VALLEY','COFFEE','WILLOW','TUNA','RICE']
const selectedWords = new Set();
let numWords = 6;
const numDirections = 6;

const grid = document.getElementById('grid');
const wordlist = document.getElementById('wordlist');
const arraySize = 12;
const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const gridArray = Array(arraySize).fill().map(() => Array(arraySize).fill(''));

function placeForwards(word) {
    let attempts = 0;
    const maxAttempts = 40; /* Try to place word in this direction a maximum of 40 times */
    let placed = false;

    while (!placed && attempts < maxAttempts) {
        attempts++;
        const startX = Math.floor(Math.random() * (arraySize - word.length + 1));
        const startY = Math.floor(Math.random() * arraySize);
        let canPlace = true;

        for (let i = 0; i < word.length; i++) {
            if (gridArray[startY][startX+i] !== '' && gridArray[startY][startX+i] !== word[i]) {
                canPlace = false;
                break;
            }
        }
        if (canPlace) {
            for (let i = 0; i < word.length; i++) {
                gridArray[startY][startX+i] = word[i];
            }
            placed = true;
        }
    }
    return placed;
}

function placeBackwards(word) {
    let attempts = 0;
    const maxAttempts = 40;
    let placed = false;

    while (!placed && attempts < maxAttempts) {
        const startX = Math.floor(Math.random() * (arraySize - word.length + 1));
        const startY = Math.floor(Math.random() * arraySize);
        let canPlace = true;

        for (let i = 0; i < word.length; i++) {
            if (gridArray[startY][startX+i] !== '' && gridArray[startY][startX+i] !== word[word.length - i - 1]) {
                canPlace = false;
                break;
            }
        }
        if (canPlace) {
            for (let i = 0; i < word.length; i++) {
                gridArray[startY][startX+i] = word[word.length - i - 1];
            }
            placed = true;
        }
    }
    return placed;
}

function placeDownwards(word) {
    let attempts = 0;
    const maxAttempts = 40;
    let placed = false;

    while (!placed && attempts < maxAttempts) {
        const startX = Math.floor(Math.random() * arraySize);
        const startY = Math.floor(Math.random() * (arraySize - word.length + 1));
        let canPlace = true;

        for (let i = 0; i < word.length; i++) {
            if (gridArray[startY+i][startX] !== '' && gridArray[startY+i][startX] !== word[i]) {
                canPlace = false;
                break;
            }
        }
        if (canPlace) {
            for (let i = 0; i < word.length; i++) {
                gridArray[startY+i][startX] = word[i];
            }
            placed = true;
        }
    }
    return placed;
}

function placeUpwards(word) {
    let attempts = 0;
    const maxAttempts = 40;
    let placed = false;

    while (!placed && attempts < maxAttempts) {
        const startX = Math.floor(Math.random() * arraySize);
        const startY = Math.floor(Math.random() * (arraySize - word.length + 1));
        let canPlace = true;

        for (let i = 0; i < word.length; i++) {
            if (gridArray[startY+i][startX] !== '' && gridArray[startY+i][startX] !== word[word.length - i - 1]) {
                canPlace = false;
                break;
            }
        }
        if (canPlace) {
            for (let i = 0; i < word.length; i++) {
                gridArray[startY+i][startX] = word[word.length - i - 1];
            }
            placed = true;
        }
    }
    return placed;
}

function placeDiagonalRight(word) {
    let attempts = 0;
    const maxAttempts = 40;
    let placed = false;

    while (!placed && attempts < maxAttempts) {
        const startX = Math.floor(Math.random() * (arraySize - word.length + 1));
        const startY = Math.floor(Math.random() * (arraySize - word.length + 1));
        let canPlace = true;

        for (let i = 0; i < word.length; i++) {
            if (gridArray[startY+i][startX+i] !== '' && gridArray[startY+i][startX+i] !== word[i]) {
                canPlace = false;
                break;
            }
        }
        if (canPlace) {
            for (let i = 0; i < word.length; i++) {
                gridArray[startY+i][startX+i] = word[i];
            }
            placed = true;
        }
    }
    return placed;
}

function placeDiagonalLeft(word) {
    let attempts = 0;
    const maxAttempts = 40;
    let placed = false;

    while (!placed && attempts < maxAttempts) {
        const startX = Math.floor(Math.random() * (arraySize - word.length + 1)) + (word.length - 1);
        const startY = Math.floor(Math.random() * (arraySize - word.length + 1));
        let canPlace = true;

        for (let i = 0; i < word.length; i++) {
            if (gridArray[startY+i][startX-i] !== '' && gridArray[startY+i][startX-i] !== word[i]) {
                canPlace = false;
                break;
            }
        }
        if (canPlace) {
            for (let i = 0; i < word.length; i++) {
                gridArray[startY+i][startX-i] = word[i];
            }
            placed = true;
        }
    }
    return placed;
}

/* Additional improvement: find valid positions for words instead on blindly checking 40 spots */

function randomlyPlaceWord(word) {
    let attempts = 0;
    const maxAttempts = 6; /* Try each direction if one or more fail */
    let successfullyPlaced = false;
    let direction = Math.floor(Math.random() * numDirections);
    while (!successfullyPlaced && attempts < maxAttempts) {
        attempts++;
        if (direction == 5) {
            direction = 0;
        } else {
            direction++;
        }
        switch (direction) {    /* adjust so its not completely random and words go in all directions */
            case 0:
                successfullyPlaced = placeForwards(word);
                break;
            case 1:
                successfullyPlaced = placeBackwards(word);
                break;
            case 2:
                successfullyPlaced = placeDownwards(word);
                break;
            case 3:
                successfullyPlaced = placeUpwards(word);
                break;
            case 4:
                successfullyPlaced = placeDiagonalRight(word);
                break;
            case 5:
                successfullyPlaced = placeDiagonalLeft(word);
                break;
        }
    }
    return successfullyPlaced;
}

function fillGrid() {
    /* Place words */
    while (selectedWords.size < numWords) {
        const word = allWords[Math.floor(Math.random() * allWords.length)];
        if (!selectedWords.has(word)) {
            if (randomlyPlaceWord(word)) {
                selectedWords.add(word);
                const li = document.createElement('li');
                li.textContent = word;
                li.dataset.word = word;
                wordlist.appendChild(li);
            } else {
                numWords--;
            }
        }
    }

    /* Fill empty spaces with random letters */
    for (let i = 0; i < arraySize; i++) {
        for (let j = 0; j < arraySize; j++) {
            if (!gridArray[i][j]) {
                gridArray[i][j] = letters[Math.floor(Math.random() * 26)];
            }
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.textContent = gridArray[i][j];
            attachEventListeners(cell);
            grid.appendChild(cell);
        }
    }
}

/* HIGHLIGHT WORDS AND MARK AS FOUND */

const selectedCells = new Set();
const foundWords = new Set();
let isSelecting = false;

/* Highlight letters by dragging or clicking */
function attachEventListeners(cell) {
    /* Start selection */
    cell.addEventListener("mousedown", () => {
        isSelecting = true;
        selectCell(cell);
    });
    /* Continue selecting */
    cell.addEventListener("mouseenter", () => {
        if (isSelecting) {
            selectCell(cell);
        }
    });
    /* End selection */
    cell.addEventListener("mouseup", () => {
        isSelecting = false;
    });
}

function selectCell(cell) {
    if (!selectedCells.has(cell)) {
        selectedCells.add(cell);
        cell.classList.add("selected");
    }
}

const wordMap = {};
function buildWordMap() {
    document.querySelectorAll(`#wordlist li`).forEach(li => {
        wordMap[li.dataset.word] = li;
    });
}

document.addEventListener("keydown", (event) => {
    if (event.key === "Enter" && selectedCells.size > 0) {
        let word = [...selectedCells].map(cell => cell.textContent).join('');

        if (word in wordMap && !foundWords.has(word)) {
            wordMap[word].classList.add("found");
            foundWords.add(word);
            selectedCells.forEach(cell => cell.classList.add("complete"));
            if (foundWords.size == selectedWords.size) {
                gameOver();
            }
        }
        resetSelection();
    }
});

function resetSelection() {
    selectedCells.forEach(cell => cell.classList.remove("selected"));
    selectedCells.clear();
}

export { fillGrid, buildWordMap };