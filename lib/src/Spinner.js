const styles = require('../styles');
const ansiplace = require('ansiplace');

class OwySpinner {
	constructor(text = '', options = {}) {
		if (typeof text !== 'string') throw new TypeError('text has to be a string.');
		if (Array.isArray(options) || typeof options !== 'object' && options !== null) throw new TypeError('options has to be an object.');

		this.options = Object.assign({style: 'dots', color: 'cyan'}, options);
		this.style = styles[this.options.style];
		this.text = text;
		this.color = ansiplace.extras.colors.includes(this.options.color) ? `{${this.options.color}}` : '';
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

		const frame = this.style.stages[(this.pos + 1) % this.style.stages.length];
		const str = ansiplace(`\u001b[${this.text.length + (frame.length * (this.options.bi ? 2 : 1)) + 2}D${this.color}${frame} {reset}${this.text}${this.options.bi ? ` ${this.color}${frame}` : ''}`);
		process.stdout.write(str);
		this.pos = (this.pos + 1) % this.style.stages.length;
	}

	stop(clearLine = true) {
		this.req--;
		if (this.req !== 0) throw new Error('spinner already stopped');

		this._clear();
		if (clearLine) this.clear();
		else process.stdout.write('\n');
	}

	info(text) {
		this.symbol('ℹ️', text);
	}

	success(text) {
		this.symbol('✔️', text);
	}

	warn(text) {
		this.symbol('⚠️', text);
	}

	fail(text) {
		this.symbol('❌', text);
	}

	symbol(sym, text) {
		this.req--;
		if (this.req !== 0) throw new Error('spinner already stopped');

		this._clear();
		this.clear();
		process.stdout.cursorTo(0);
		process.stdout.write(`${sym} ${text || this.text}`);
	}

	clear() {
		process.stdout.clearLine();
	}

	_clear() {
		clearInterval(this.spin);
	}
}

module.exports = OwySpinner;
