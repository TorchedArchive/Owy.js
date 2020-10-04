/**
 * ✏️ Simple and sexy looking terminal spinners and progress bars.
 * @module Owy
 */

const styles = require('../styles');
const ansikit = require('ansikit');

/**
 * ✏️ Owy's terminal spinner.
 */
class OwySpinner {
	/**
	 * Creates a new CLI spinner
	 * @param {String} text                   Text to use with the spinner
	 * @param {Object} options                Options to configure the spinner
	 * @param {String | object} options.style The style/look of the spinner
	 * @param {String} options.color          The color of the spinner
	 * @param {Boolean} options.dual          Whether to spawn 2 spinners, at the beginning and end of text
	 */
	constructor(text = '', options = {}) {
		if (typeof text !== 'string') throw new TypeError('text has to be a string');
		if (Array.isArray(options) || typeof options !== 'object' && options !== null) throw new TypeError('options has to be an object');

		this.options = Object.assign({style: 'dots', color: 'cyan'}, options);
		if (Array.isArray(this.options.style)) throw new Error('options.style should be an object or string');

		this.style = typeof this.options.style !== 'object' ? styles[this.options.style] : this.options.style;
		if (typeof this.style === 'object' && !Array.isArray(this.style.stages)) throw new Error('missing array of steps for style');

		this.text = text;
		this.color = ansikit.extras.colors.includes(this.options.color) ? `{${this.options.color}}` : ''; // Color for spinner
		this.spin = null; // Spinner interval
		this.dual = this.options.dual; // Have 2 spinners, at the beginning and end of text?
		this.pos = 0; // Index of current frame
		this.req = 0; // Track the state of the spinner (started, stopped)
	}

	/**
	 * Starts the spinner
	 * @param {String} text Text to use with the spinner
	 * @returns {OwySpinner} The spinner instance
	 */
	start(text) {
		this.req++;
		if (this.req !== 1) throw new Error('spinner already started');

		if (text && typeof text !== 'string') throw new Error('text has to be a string');
		else if (text) this.text = text;
		
		if (!this.style) throw new Error(`could not find style`);

		this.spin = setInterval(() => this.next(), this.style.interval || 60);
		return this;
	}

	/**
	 * Goes to the next frame/step of the spinner
	 */
	next() {
		if (!this.style) throw new Error(`could not find style`);

		const frame = this.style.stages[(this.pos + 1) % this.style.stages.length];

		ansikit.cursorLeft(this.text.length + (frame.length * (this.dual ? 2 : 1)) + 2)
		ansikit.print(`${this.color}${frame} {reset}${this.text}${this.dual ? ` ${this.color}${frame}` : ''}`);

		this.pos = (this.pos + 1) % this.style.stages.length;
	}

	/**
	 * Stops the spinner
	 * @param {Boolean} clearLine Whether to clear the line
	 * @returns {OwySpinner} The spinner instance
	 */
	stop(clearLine = true) {
		this.req--;
		if (this.req !== 0) throw new Error('spinner already stopped');

		this._clear();
		if (clearLine) this.clear();
		else process.stdout.write('\n');

		return this;
	}

	/**
	 * Stops the spinner and replaces it with "ℹ️"
	 * @param {String} text Text to use with the symbol
	 * @returns {OwySpinner} The spinner instance
	 */
	info(text) {
		return this.symbol('ℹ️', text);
	}

	/**
	 * Stops the spinner and replaces it with "✔️"
	 * @param {String} text Text to use with the symbol
	 * @returns {OwySpinner} The spinner instance
	 */
	success(text) {
		return this.symbol('✔️', text);
	}

	/**
	 * Stops the spinner and replaces it with "⚠️"
	 * @param {String} text Text to use with the symbol
	 * @returns {OwySpinner} The spinner instance
	 */
	warn(text) {
		return this.symbol('⚠️', text);
	}

	/**
	 * Stops the spinner and replaces it with "❌"
	 * @param {String} text Text to use with the symbol
	 * @returns {OwySpinner} The spinner instance
	 */
	fail(text) {
		return this.symbol('❌', text);
	}

	/**
	 * Stops the spinner, clears the line and prints "[sym] [text]"
	 * @param {String} sym  The symbol/unicode to use 
	 * @param {String} text Text to use with the symbol
	 * @returns {OwySpinner} The spinner instance
	 */
	symbol(sym, text) {
		this.req--;
		if (this.req !== 0) throw new Error('spinner already stopped');

		this._clear();
		this.clear();
		process.stdout.cursorTo(0);
		process.stdout.write(`${sym} ${text || this.text}\n`);

		return this;
	}

	/**
	 * Clears the line
	 * @returns {OwySpinner} The spinner instance
	 */
	clear() {
		process.stdout.clearLine();
		return this;
	}

	/**
	 * Clears the spin interval
	 * @private
	 */
	_clear() {
		clearInterval(this.spin);
	}
}

module.exports = OwySpinner;
