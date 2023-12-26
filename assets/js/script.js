let canvas = document.getElementById('hello-world-canvas')
let context = canvas.getContext('2d')
let when_canvas_exists = when(() => canvas.getContext !== null && canvas.getContext !== undefined);
document.getElementById('generateCircle').addEventListener('click', () => when_canvas_exists(generateCircle));
document.getElementById('generateRectangle').addEventListener('click', when_canvas_exists(generateRectangle));

