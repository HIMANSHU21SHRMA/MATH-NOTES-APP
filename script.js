const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');
const clearBtn = document.querySelector('#clear');
const saveBtn = document.querySelector('#save');
const sideBar = document.querySelector('.left-flot');

// Function for resizing the canvas
const resizing = () => {
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
};

// Resize the canvas on page load and window resize
window.addEventListener('resize', resizing);
resizing(); // Call on initial load

// Initialize selected stroke and color
const SelectStr = document.querySelector('#stroke');
const colorPic = document.querySelector('#color-pic');
let selectedColor = colorPic.value;

// Update color display
colorPic.addEventListener('input', () => {
    selectedColor = colorPic.value;
    const colorDip = document.querySelector('#colorValue');
    colorDip.style.backgroundColor = selectedColor;
});

// Create stroke options
const createOption = () => {
    for (let i = 1; i <= 100; i++) {
        const option = document.createElement('option');
        option.value = `${i}`;
        option.textContent = `${i}px`;
        SelectStr.appendChild(option);
    }
    SelectStr.value = '5';
};
createOption();

// Track selected stroke value
let selectValue = '5';
SelectStr.addEventListener('change', () => {
    selectValue = SelectStr.value;
});

// Drawing functionality
let painting = false;
const startPosition = (e) => {
    painting = true;
    draw(e); // Start drawing immediately on mousedown
};
const finishedPosition = () => {
    painting = false;
    ctx.beginPath(); // Reset the path for a new stroke
};
const draw = (e) => {
    if (!painting) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.lineWidth = parseInt(selectValue, 10);
    ctx.lineCap = 'round';
    ctx.strokeStyle = selectedColor;

    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
};

// Add event listeners for drawing
canvas.addEventListener('mousedown', startPosition);
canvas.addEventListener('mouseup', finishedPosition);
canvas.addEventListener('mousemove', draw);

// Clear canvas
clearBtn.addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});

// Function to save canvas state
const saveCanvasState = () => {
    const dataURL = canvas.toDataURL();
    const saveDate = new Date();
    const canvasData = {
        dataURL: dataURL,
        date: saveDate.toLocaleString()
    };
    
    let savedCanvases = JSON.parse(localStorage.getItem('canvasHistory')) || [];
    savedCanvases.push(canvasData);
    localStorage.setItem('canvasHistory', JSON.stringify(savedCanvases));
    displayCanvasHistory();
};

// Event listener to save canvas state
saveBtn.addEventListener('click', saveCanvasState);

// Display saved canvas history
const displayCanvasHistory = () => {
    const topFlot = document.querySelector('.top-flot');
    topFlot.innerHTML = ''; // Clear previous history

    let savedCanvases = JSON.parse(localStorage.getItem('canvasHistory')) || [];

    savedCanvases.forEach((item, index) => {
        const historyEntry = document.createElement('div');
        historyEntry.classList.add('cont');
        historyEntry.innerHTML = `<h4>Canvas ${index + 1}</h4><p>${item.date}</p>`;
        historyEntry.addEventListener('click', () => loadCanvasState(item.dataURL));
        topFlot.appendChild(historyEntry);
    });
};

// Function to load canvas state
const loadCanvasState = (dataURL) => {
    const img = new Image();
    img.src = dataURL;
    img.onload = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
        ctx.drawImage(img, 0, 0); // Draw the saved image on the canvas
    };
};

// Initial display of canvas history on page load
document.addEventListener('DOMContentLoaded', displayCanvasHistory);

// Sidebar toggle functionality
const icon = document.querySelector('.fa-bars');
const hideBtn = document.querySelector('#close');

icon.addEventListener('click', () => {
    sideBar.classList.toggle('visible');
    sideBar.classList.toggle('hidden');
});

hideBtn.addEventListener('click', () => {
    sideBar.classList.toggle('visible');
    sideBar.classList.toggle('hidden');
});

// Switch between modes
const switchBtn = document.querySelector('#switch');
const switchInfo = document.querySelector('.switchInfo');

switchBtn.addEventListener('click', () => {
    switchInfo.classList.toggle('hidden');
});
