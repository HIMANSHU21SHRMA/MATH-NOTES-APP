const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');
const leftFlot = document.querySelector(".left-flot")

// function for resizing canvas
const resizing = () => {
    canvas.height = window.innerHeight
    canvas.width = window.innerWidth
    ctx.clearRect(0, 0, canvas.width, canvas.height );

}
// Resize the canvas on page load and window resize
window.addEventListener('resize', resizing)
resizing() // Call on initial load


// time for menu bar

const SelectStr = document.querySelector('#stroke')
const colorPic = document.querySelector('#color-pic')
let selectedColor = colorPic.value;

// console.log(colorPic);
colorPic.addEventListener('input',() => {
 selectedColor = colorPic.value
const colorDip = document.querySelector('#colorValue')
colorDip.style.backgroundColor  = selectedColor;
})

//  creating option for stroke

//  funciton for option
const createOption = () => {
    for (let i = 1; i <= 100; i++) {
      const option = document.createElement('option')
      option.value = `${i}`;
      option.textContent = `${i}px`;
      SelectStr.appendChild(option)
           }
SelectStr.value = '5';

        }
createOption();
// let save the value of selecte px
let selectValue = '5';
SelectStr.addEventListener('change', () => {
    selectValue = SelectStr.value;
})
// for drawing
let painting = false;
const startPosition = (e) => {
    painting = true
    draw(e) // Start drawing immediately on mousedown
}
// for finishing
const finishedPosition = (e) => {
    painting = false
    ctx.beginPath() // reset the path for a new stroke

}
const draw = (e) => {
    if(!painting) return;

    // get current mouse position 
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    //  creating the line

    // line widht, style adn etc
    ctx.lineWidth = parseInt(selectValue, 10);
    ctx.lineCap = 'round';
    ctx.strokeStyle = selectedColor

    // inetilize
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath(); // Begin a new path so that lines are continuous
    ctx.moveTo(x, y); // Move to the current position to continue the line

}

// add event listners
canvas.addEventListener('mousedown', startPosition);
canvas.addEventListener('mouseup', finishedPosition);
canvas.addEventListener('mousemove', draw);

//  for side bar
const icon = document.querySelector('.fa-bars')
const sideBar = document.querySelector('.left-flot')
// for hide
const hideBtn = document.querySelector('#close')

icon.addEventListener('click', () => {
    sideBar.classList.toggle('visible');
    sideBar.classList.toggle('hidden');
});
hideBtn.addEventListener("click", () => {
    sideBar.classList.toggle('visible');
    sideBar.classList.toggle('hidden');
})





