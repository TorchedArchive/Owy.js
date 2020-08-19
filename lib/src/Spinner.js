const styles = require('../styles');

class OwySpinner {
	constructor(options = {}) {
		if (typeof options === 'string') options = {text: options}
		else if (Array.isArray(options) || typeof options !== "object" && options !== null) throw new TypeError("'options' has to be an object.");

		this.options = Object.assign({style: 'dots', text: ''}, options);
		this.style = styles[this.options.style];
		this.text = this.options.text
		this.spin = null;
	}

	start() {
		let cur = 0;
		this.spin = setInterval(() => {
			process.stdout.write(`\u001b[${this.text.length + 2}D${this.style.stages[cur]} ${this.text}`);
			cur = (cur + 1) % this.style.stages.length;
		}, this.style.interval);
	}

	stop() {
		clearInterval(this.spin);
		this.clear();
	}

	clear() {
		process.stdout.write(`\u001b[2K`);
	}
}

module.exports = OwySpinner;
