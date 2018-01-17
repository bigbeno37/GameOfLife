// Returns the element specified by the class name
function getElement(className) {
    return document.getElementsByClassName(className)[0];
}

// Determines if the given cell is alive via attribute checks
function isAlive(cellElement) {
    return cellElement.getAttribute('alive') === 'true';
}

// Flips a cell from dead to alive
function flipCell(x, y) {
    var cell = getElement('cell-' + x + '-' + y);

    // If the cell is alive, kill it and set the background colour to white
    if (isAlive(cell)) {
        cell.style.backgroundColor = "white";
        cell.setAttribute('alive', 'false');
    } else {
        // Otherwise the cell is dead, so reanimate it
        cell.style.backgroundColor = "black";
        cell.setAttribute('alive', 'true');
    }
}

// Creates the grid for GoL to be played upon
function createGrid() {
    var x = getXDimension();
    var y = getYDimension();

    var windowX = window.innerWidth;
    var windowY = window.innerHeight;
    var navbarY = getElement('controls').clientHeight;

    getElement('grid').style = "height: " + (windowY - navbarY - 1) + "px;";

    var grid = getElement('grid');
    var gridY = grid.clientHeight;

    // Generate cells defined by x and y
    for (var i = 0; i < x; i++) {
        for (var j = 0; j < y; j++) {
            // Create 'y' divs that look like
            // <div class="cell cell-1-2" style="width: [something]px; height: [something]px;" active="false" onclick="flipCell(1, 2)></div>
            grid.insertAdjacentHTML('beforeend',
                '<div class="cell cell-' + j + '-' + i + '" ' +
                'style="width: ' + windowX/x + 'px; height: ' + gridY/y + 'px;" ' +
                'alive="false" ' +
                'onclick="flipCell(' + j + ', ' + i + ')"></div>')
        }
    }
}

// Clears the grid and recreates it
function clearGridAndCreate() {
    getElement('grid').innerHTML = '';

    createGrid();
}

// Get the specified dimensions of the board
function getXDimension() {
    var toArray = document.getElementById('dimensions').value.split('');

    return toArray.splice(0, toArray.indexOf('x')).join('');
}

function getYDimension() {
    var toArray = document.getElementById('dimensions').value.split('');

    return toArray.splice(toArray.indexOf('x')+1, toArray.length-1).join('');
}

// Obtain the amount of alive neighbours next to a cell
function getNeighbourCount(cellX, cellY) {

    var sum = 0;

    // Go through each cardinal direction
    for (var i = -1; i <= 1; i++) {
        for (var j = -1; j <= 1; j++) {
            // If the current square being checked isn't outside the boundaries...
            if (cellX + i >= 0 && cellY + j >= 0) {
                if (cellX + i < getXDimension() && cellY + j < getYDimension()) {

                    // And is not the current cell whose neighbours are trying to be counted...
                    if (!(i === 0 && j === 0)) {

                        // See if the checked cell is alive
                        if(isAlive(getElement('cell-' + (cellX+i) + '-' + (cellY+j)))) {

                            // If so, add 1 to sum
                            sum += 1;
                        }
                    }
                }
            }

        }
    }

    return sum;
}

function start() {
    var startButton = getElement('start');

    startButton.setAttribute('active', 'true');
    startButton.setAttribute('onclick', 'stop()');
    startButton.className = 'btn btn-danger start';
    startButton.innerHTML = 'Stop';
}

function stop() {
    var startButton = getElement('start');

    startButton.setAttribute('active', 'false');
    startButton.setAttribute('onclick', 'start()');
    startButton.className = 'btn btn-success start';
    startButton.innerHTML = 'Start';
}

function tick() {
    // Array containing positions to be flipped
    var toBeFlipped = [];

    // Go through each cell
    for (var i = 0; i < getXDimension(); i++) {
        for (var j = 0; j < getYDimension(); j++) {

            var neighbours = getNeighbourCount(i, j);

            // If the current cell is alive
            if (isAlive(getElement('cell-' + i + '-' + j))) {
                if (neighbours < 2 || neighbours > 3) {
                    // Kill the cell (due to overpopulation / underpopulation)
                    toBeFlipped.push([i, j]);
                }
            } else {
                if (neighbours === 3) {
                    // Reanimate the cell due to healthy conditions
                    toBeFlipped.push([i, j]);
                }
            }

        }
    }

    for(i = 0; i < toBeFlipped.length; i++) {
        // Flip the current position
        flipCell(toBeFlipped[i][0], toBeFlipped[i][1]);
    }
}

function restartInterval() {
    clearInterval(tickInterval);

    tickInterval = window.setInterval(function() {
        if (getElement('start').getAttribute('active') === 'true') {
            tick();
        }
    }, document.getElementById('time').value);
}

window.onload = createGrid;
window.onresize = clearGridAndCreate;
var tickInterval = window.setInterval(function() {
    if (getElement('start').getAttribute('active') === 'true') {
        tick();
    }
}, document.getElementById('time').value);