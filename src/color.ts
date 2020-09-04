export default class Color {
	red: number;
	green: number;
	blue: number;
	alpha: number;

	static validatePrimaryColor (color: number) {
		if (color < 0 || color > 256) throw new Error(`Color is out of range (value is ${color})`);
		return null;
	}

	constructor (red: number, green: number, blue: number, alpha: number = 1) {
		Color.validatePrimaryColor(green);
		Color.validatePrimaryColor(red);
		Color.validatePrimaryColor(blue);

		this.red = red;
		this.green = green;
		this.blue = blue;
		this.alpha = alpha;
	}

	static random () {
		const red = Math.floor(Math.random() * 257);
		const green = Math.floor(Math.random() * 257);
		const blue = Math.floor(Math.random() * 257);

		return new Color(red, green, blue);
	}

	add (red: number, green: number, blue: number) {
		this.red += red;
		this.green += green;
		this.blue += blue;

		while (this.red < 0) this.red += 256;
		while (this.green < 0) this.green += 256;
		while (this.blue < 0) this.blue += 256;

		while (this.red > 256) this.red -= 256;
		while (this.green > 256) this.green -= 256;
		while (this.blue > 256) this.blue -= 256;

		return this;
	}

	toString () {
		const red = this.red.toString(16).padStart(2, '0');
		const green = this.green.toString(16).padStart(2, '0');
		const blue = this.blue.toString(16).padStart(2, '0');
		// const alpha = (this.alpha * 256).toString(16).padStart(2, '0');
		const string = `#${red}${green}${blue}`;
		return string;
	}
}