var canvasCursor;
var tableElement;
var points = [];

function setup() {
    var canvas = createCanvas(400, 400); // Initializes the drawing canvas
    canvas.elt.oncontextmenu = () => false; // Keep right-click disabled

    canvasCursor = new Cursor(width / 2, height / 2, 80, 80);

    // Create a button outside of the canvas
    var btn = createButton("Add Point");

    // Button styling
    btn.style('display', 'block');
    btn.style('padding', '10px 20px');
    btn.style('font-size', '16px');
    btn.style('font-family', 'sans-serif');
    btn.style('background-color', '#007BFF');
    btn.style('color', '#fff');
    btn.style('border', 'none');
    btn.style('border-radius', '5px');
    btn.style('cursor', 'pointer');
    btn.style('transition', 'background 0.2s');

    // Add hover effect using native JS listeners
    btn.elt.onmouseover = () => btn.style('background-color', '#0056b3');
    btn.elt.onmouseout = () => btn.style('background-color', '#007BFF');

    // 3. Connect the button click to a custom function
    btn.mousePressed(addNewPoint);

    // Create table
    tableElement = createElement('table');
    styleTable(tableElement); // Apply CSS styles to the table
    
    // Initialize table with the header row
    updateTable();
}

function draw() {
    background(220); // Clears the screen with a light gray background each frame
    canvasCursor.draw();

    // Test string art code
    var p1 = [25, 100];
    var p2 = [160, 125];
    var p3 = [150, 200];
    var n = 2;
    var stringArt = new StringArt(p1, p2, p3, n);
    stringArt.draw();
}

function mousePressed() {
    canvasCursor.mousePressed();
}

function addNewPoint() {
    points.push({ x: canvasCursor.x, y: canvasCursor.y});
    updateTable();
}

// Function to refresh the table contents
function updateTable() {
  // Clear out everything currently in the table
  tableElement.html('');
  
  // Create Header Row
  let headerRow = createElement('tr');
  headerRow.parent(tableElement);
  let th1 = createElement('th', 'Point #').parent(headerRow);
  let th2 = createElement('th', 'X Coordinate').parent(headerRow);
  let th3 = createElement('th', 'Y Coordinate').parent(headerRow);
  
  // Style headers
  styleHeaderCells([th1, th2, th3]);

  // Create Data Rows for each point in the array
  for (let i = 0; i < points.length; i++) {
    let p = points[i];
    let row = createElement('tr');
    row.parent(tableElement);
    
    let td1 = createElement('td', i + 1).parent(row);
    let td2 = createElement('td', p.x).parent(row);
    let td3 = createElement('td', p.y).parent(row);
    
    styleDataCells([td1, td2, td3], i);
  }
}

// --- CSS STYLING HELPER FUNCTIONS ---

function styleTable(t) {
  t.style('width', '400px');
  t.style('margin', '20px auto');
  t.style('border-collapse', 'collapse');
  t.style('font-family', 'sans-serif');
  t.style('box-shadow', '0 4px 6px rgba(0,0,0,0.1)');
}

function styleHeaderCells(headers) {
  for (let th of headers) {
    th.style('background-color', '#333');
    th.style('color', '#fff');
    th.style('padding', '10px');
    th.style('text-align', 'center');
    th.style('border', '1px solid #ddd');
  }
}

function styleDataCells(cells, index) {
  // Zebra striping effect (alternating row background colors)
  let rowBg = (index % 2 === 0) ? '#ffffff' : '#f9f9f9';
  
  for (let td of cells) {
    td.style('padding', '8px');
    td.style('text-align', 'center');
    td.style('border', '1px solid #ddd');
    td.style('background-color', rowBg);
  }
}