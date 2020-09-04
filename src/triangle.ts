import Vector2 from "./vector2.js";

export default class Triangle {
	center: Vector2;
	radius: number;
	points: [Vector2, Vector2, Vector2];

	constructor (center: Vector2, radius: number) {
		this.center = center;
		this.radius = radius;

		const point1 = new Vector2(0, radius);
		this.points = [
			point1,
			point1.rotateNew(120),
			point1.rotateNew(240),
		];
	}

	forEachPoint (func: (point: Vector2, index: number) => void) {
		for(let i = 0; i < this.points.length; i ++) {
			const point = this.points[i];
			func(point, i);
		}
	}

	draw(ctx: CanvasRenderingContext2D) {
		ctx.beginPath();
		ctx.moveTo(...this.points[this.points.length - 1].addNew(this.center).toArray());

		this.forEachPoint(point => {
			ctx.lineTo(...point.addNew(this.center).toArray());
		});

		ctx.stroke();
		ctx.closePath();
	}

	rotate (deg: number, axis: Vector2) {
		this.center.subtract(axis).rotate(deg).add(axis);
	}

	turn (deg: number) {
		this.forEachPoint(point => point.rotate(deg));
	}
}