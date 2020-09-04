interface VectorLike {
	x: number;
	y: number;
	z: number;
}

export default class Vector3 implements VectorLike {
	x: number;
	y: number;
	z: number;

	/** The squared magnitude of the vector, used when you don't need the actual magnitude,
	* so not to make a square root calculation. */
	get sqrMagnitude () {
		return this.x * this.x + this.y * this.y + this.z * this.z
	}

	/** The magnitude of the vector (size of it). */
	get magnitude () {
		return Math.sqrt(this.sqrMagnitude)
	}

	/** The normalized version of this vector (same direction, but magnitude of 1). */
	get normal () {
		const mag = this.magnitude
		return new Vector3(this.x / mag, this.y / mag, this.z / mag)
	}

	constructor (x: number, y: number, z: number) {
		this.x = x;
		this.y = y;
		this.z = z;
	}

	/** Determines if the given argument is a vector */
	static isVector (vec: any): vec is VectorLike {
		if (!vec) return false;
		if (vec === null) return false;
		if (typeof vec !== 'object') return false;
		if (typeof vec.x !== 'number' || typeof vec.y !== 'number' || typeof vec.z !== 'number') return false;
		return true;
	}

	/** Creates a vector form various possible input arguments */
	static from (x: number, y: number, z: number): Vector3;
	static from (vectorArray: [number, number, number]): Vector3;
	static from (vectorReference: Vector3): Vector3;
	static from (...args: any[]) {
		const error = () => { throw new TypeError('Whoops! invalid arguments were provided to vector creation.') }

		if (typeof args[0] === 'number' && typeof args[1] === 'number' && typeof args[2] === 'number') {
			return new Vector3(args[0], args[1], args[2])
		} else if (args[0] instanceof Array) {
			if (typeof args[0][0] === 'number' && typeof args[0][1] === 'number' && typeof args[0][2] === 'number') {
				return new Vector3(args[0][0], args[0][1], args[0][2])
			} else {
				return error()
			}
		} else if (Vector3.isVector(args[0])) {
			return new Vector3(args[0].x, args[0].y, args[0].z)
		} else {
			return error()
		}
	}

	/** Creates a copy of this vector */
	duplicate () {
		return new Vector3(this.x, this.y, this.z);
	}

	add (other: VectorLike) {
		this.x += other.x;
		this.y += other.y;
		this.z += other.z;
		return this;
	}

	addNew (other: VectorLike) {
		return this.duplicate().add(other);
	}

	subtract (other: VectorLike) {
		this.x -= other.x;
		this.y -= other.y;
		this.z -= other.z;
		return this;
	}

	subtractNew (other: VectorLike) {
		return this.duplicate().subtract(other);
	}

	scale (factor: number) {
		this.x *= factor;
		this.y *= factor;
		this.z *= factor;
		return this;
	}

	scaleNew (factor: number) {
		return this.duplicate().scale(factor);
	}

	normalize () {
		const mag = this.magnitude;
		this.x /= mag;
		this.y /= mag;
		this.z /= mag;
		return this;
	}

	dot (other: VectorLike) {
		return this.x * other.x + this.y * other.y + this.z * other.z;
	}

	cross (other: VectorLike) {
		return new Vector3(
			this.y * other.z - this.z * other.y,
			this.z * other.x - this.x * other.z,
			this.x * other.y - this.y * other.x,
		);
	}

	rotateX (angle: number) {
		angle *= Math.PI / 180;
		const cos = Math.cos(angle);
		const sin = Math.sin(angle);
		const y = this.y;
		const z = this.z;
		this.y = y * cos - z * sin;
		this.z = y * sin + z * cos;
		return this;
	}

	rotateY (angle: number) {
		angle *= Math.PI / 180;
		const cos = Math.cos(angle);
		const sin = Math.sin(angle);
		const x = this.x;
		const z = this.z;
		this.x = x * cos - z * sin;
		this.z = x * sin + z * cos;
		return this;
	}

	rotateZ (angle: number) {
		angle *= Math.PI / 180;
		const cos = Math.cos(angle);
		const sin = Math.sin(angle);
		const x = this.x;
		const y = this.y;
		this.x = x * cos - y * sin;
		this.y = x * sin + y * cos;
		return this;
	}

	rotate (angle: number, axis: VectorLike) {
		angle *= Math.PI / 180;
		const cos = Math.cos(angle);
		const sin = Math.sin(angle);
		const projection = this.projectNew(axis);
		const distanceVector = this.subtractNew(projection);
		const baseMag = distanceVector.magnitude;
		const baseY = this.subtractNew(projection).normalize().scale(sin);
		const baseX = baseY.cross(projection).normalize().scale(cos);
		const direction = baseY.add(baseX).scale(baseMag);
		direction.add(projection);
		this.x = direction.x;
		this.y = direction.y;
		return this;
	}

	rotateNew (angle: number, axis: VectorLike) {
		return this.duplicate().rotate(angle, axis);
	}

	project (target: VectorLike) {
		const len = this.dot(target);
		this.x = target.x;
		this.y = target.y;
		this.z = target.z;
		this.normalize().scale(len);
		return this;
	}

	projectNew (target: VectorLike) {
		return this.duplicate().project(target);
	}
}
