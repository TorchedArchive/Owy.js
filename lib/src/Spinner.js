const styles = require('../styles');

class OwySpinner {
	constructor(options = {}) {
		if (typeof options === 'string') options = {text: options};
		else if (Array.isArray(options) || typeof options !== 'object' && options !== null) throw new TypeError('options has to be an object.');

		this.options = Object.assign({style: 'dots', text: ''}, options);
		this.style = styles[this.options.style];
		this.text = this.options.text;
		this.spin = null;
		this.pos = 0;
		this.req = 0;
	}

	start(text) {
		this.req++;
		if (this.req !== 1) throw new Error('spinner already started');
		if (text && typeof text !== 'string') throw new Error('text has to be a string');
		else if (text) this.text = text;
		if (!this.style) throw new Error(`could not find style`);

		this.spin = setInterval(() => this.next(), this.style.interval);
	}

	next() {
		if (!this.style) throw new Error(`could not find style`);

		process.stdout.write(`\u001b[${this.text.length + 2}D${this.style.stages[(this.pos + 1) % this.style.stages.length]} ${this.text}`);
		this.pos = (this.pos + 1) % this.style.stages.length;
	}

	stop() {
		this.req--;
		if (this.req !== 0) throw new Error('spinner already stopped');

		clearInterval(this.spin);
		this.clear();
	}

	clear() {
		process.stdout.write(`\u001b[2K`);
	}
}

module.exports = OwySpinner;
