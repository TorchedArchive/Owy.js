/**
 * ✏️ Simple and sexy looking terminal spinners and progress bars.
 * @module Owy
 */

/**
 * ✏️ Owy's terminal progress bar.
 */
class OwyProgressBar {
	constructor(text = '', options = {}) {
		if (typeof text !== 'string') throw new TypeError('text has to be a string');
		if (Array.isArray(options) || typeof options !== 'object' && options !== null) throw new TypeError('options has to be an object');

		this.options = Object.assign({percent: true}, options);

		this.filledLength = 0;
		this.emptyLength = 100;
		this.filled = '\u001b[47m '.repeat((this.filledLength % 110) / 5);
		this.empty = '.'.repeat((this.emptyLength % 110) / 5);
	}

	init() {
		process.stdout.write(`[${this.filled}\u001b[0m${this.empty}]${this.options.percent ? ` ${this.filledLength}%` : ''}`);
	}

	next() {
		this.progress(5);
	}

	progress(percent) {
		if (this.filledLength + percent > 100) {
			this.filledLength = 100;
			this.emptyLength = 0;
		} else { 
			this.filledLength += percent;
			this.emptyLength -= percent;
			this.filled = '\u001b[47m '.repeat(Math.floor((this.filledLength % 110) / 5));
			this.empty = '.'.repeat(Math.floor((this.emptyLength % 110) / 5));
		}
		process.stdout.write(`\u001b[${this.filled.length + this.empty.length + (this.options.percent ? ` ${this.filledLength}%`.length : 0) + 2}D[${this.filled}\u001b[0m${this.empty}]${this.options.percent ? ` ${this.filledLength}%` : ''}`);
	}
}

module.exports = OwyProgressBar;
