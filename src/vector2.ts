interface VectorLike {
	x: number;
	y: number;
}

export default class Vector2 implements VectorLike {
	x: number;
	y: number;

	get sqrMagnitude () {
		return this.x * this.x + this.y * this.y;
	}

	get magnitude () {
		return Math.sqrt(this.sqrMagnitude);
	}

	get normal () {
		const mag = this.magnitude;
		return new Vector2(this.x / mag, this.y / mag);
	}

	get orthogonal () {
		return this.rotate90New();
	}

	constructor (x: number, y: number) {
		this.x = x;
		this.y = y;
	}

	static isVector (vec: any): vec is VectorLike {
		if (!vec) return false;
		if (vec === null) return false;
		if (typeof vec !== 'object') return false;
		if (typeof vec.x !== 'number' || typeof vec.y !== 'number') return false;
		return true;
	}

	static from (x: number, y: number): Vector2;
	static from (vectorArray: [number, number]): Vector2;
	static from (vectorReference: Vector2): Vector2;
	static from (...args: any[]) {
		const error = () => { throw new TypeError('Whoops! invalid arguments were provided to vector creation.') }

		if (typeof args[0] === 'number' && typeof args[1] === 'number') {
			return new Vector2(args[0], args[1])
		} else if (args[0] instanceof Array) {
			if (typeof args[0][0] === 'number' && typeof args[0][1] === 'number') {
				return new Vector2(args[0][0], args[0][1])
			} else {
				return error()
			}
		} else if (Vector2.isVector(args[0])) {
			return new Vector2(args[0].x, args[0].y)
		} else {
			return error()
		}
	}

	/** Returns an array that represents the vector */
	toArray () {
		return [this.x, this.y] as [number, number];
	}

	duplicate () {
		return new Vector2(this.x, this.y)
	}

	add (other: VectorLike) {
		this.x += other.x
		this.y += other.y
		return this
	}

	addNew (other: VectorLike) {
		return this.duplicate().add(other)
	}

	subtract (other: VectorLike) {
		this.x -= other.x
		this.y -= other.y
		return this
	}

	subtractNew (other: VectorLike) {
		return this.duplicate().subtract(other)
	}

	scale (factor: number) {
		this.x *= factor
		this.y *= factor
		return this
	}

	scaleNew (factor: number) {
		return this.duplicate().scale(factor)
	}

	normalize () {
		const mag = this.magnitude
		this.x /= mag
		this.y /= mag
		return this
	}

	dot (other: VectorLike) {
		return this.x * other.x + this.y * other.y
	}

	crossSignal (other: VectorLike) {
		return this.x * other.y - this.y * other.x
	}

	rotate (angle: number) {
		angle *= Math.PI / 180
		const cos = Math.cos(angle)
		const sin = Math.sin(angle)
		const x = this.x
		const y = this.y
		this.x = x * cos - y * sin
		this.y = x * sin + y * cos
		return this
	}

	rotate90 () {
		const buffer = this.x
		this.x = -this.y
		this.y = buffer
		return this
	}

	rotate90New () {
		return this.duplicate().rotate90()
	}

	rotateNew (angle: number) {
		return this.duplicate().rotate(angle)
	}

	project (target: VectorLike) {
		const len = this.dot(target)
		this.x = target.x
		this.y = target.y
		this.normalize().scale(len)
		return this
	}

	projectNew (target: VectorLike) {
		return this.duplicate().project(target)
	}
}
