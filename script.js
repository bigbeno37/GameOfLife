
// Returns the element specified by the class name
function getElement(className) {
    return document.getElementsByClassName(className)[0];
}

// Creates the grid for GoL to be played upon
function createGrid() {
    // Get the x and y dimensions of the desired grid
    // TODO: Support YYxZZ and beyond dimensions
    var x = document.getElementById('dimensions').value[0];
    var y = document.getElementById('dimensions').value[2];

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
            // <div class="cell" style="width: [something]px; height: [something]px;"></div>
            grid.insertAdjacentHTML('beforeend', '<div class="cell" style="width: ' + windowX/x + 'px; height: ' + gridY/y + 'px;"></div>')
        }
    }
}

// Clears the grid and recreates it
function clearGridAndCreate() {
    getElement('grid').innerHTML = '';

    createGrid();
}

window.onload = createGrid;
window.onresize = clearGridAndCreate;