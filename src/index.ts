import Triangle from "./triangle.js";
import Vector2 from "./vector2.js";
import Color from "./color.js";

const canvas = document.getElementById('canvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

canvas.width = Math.min(window.innerWidth, window.innerHeight);
canvas.height = Math.min(window.innerWidth, window.innerHeight);

const width = canvas.clientWidth;
const height = canvas.clientHeight;

const color = new Color(175, 0, 0);
const triangles = [
	new Triangle(new Vector2(width / 4, height / 2), height / 4),
	new Triangle(new Vector2(width / 4, height / 2), height / 4),
	new Triangle(new Vector2(width / 4, height / 2), height / 4),
	new Triangle(new Vector2(width / 4, height / 2), height / 4),
	new Triangle(new Vector2(width / 4, height / 2), height / 4),
	new Triangle(new Vector2(width / 4, height / 2), height / 4),
	new Triangle(new Vector2(width / 4, height / 2), height / 4),
	new Triangle(new Vector2(width / 4, height / 2), height / 4),
	new Triangle(new Vector2(width / 4, height / 2), height / 4),
	new Triangle(new Vector2(width / 4, height / 2), height / 4),
]

let colorDirection = 1;

function frame () {
	console.log(color.toString());
	ctx.strokeStyle = color.toString();
	if (color.red + 0.5 * colorDirection > 200 || color.red + 0.5 * colorDirection < 50) {
		colorDirection *= -1;
	}
	color.add(0.5 * colorDirection, 0, 0);
	triangles.forEach((triangle, index) => {
		triangle.draw(ctx);
		triangle.turn(0.02 * index);
		triangle.rotate(0.2, new Vector2(width / 2, height / 2));
	});
};

setInterval(frame);