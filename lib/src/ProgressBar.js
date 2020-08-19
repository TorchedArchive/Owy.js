class OwyProgressBar {
	constructor() {
		this.filledLength = 0;
		this.emptyLength = 100;
		this.filled = '\u001b[47m '.repeat((this.filledLength % 110) / 5);
		this.empty = '.'.repeat((this.emptyLength % 110) / 5);
	}

	init() {
		process.stdout.write(`[${this.filled}\u001b[0m${this.empty}]`);
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
			this.filled = '\u001b[47m '.repeat((this.filledLength % 110) / 5);
			this.empty = '.'.repeat((this.emptyLength % 110) / 5);
		}
		process.stdout.write(`\u001b[${this.filled.length + this.empty.length + 2}D[${this.filled}\u001b[0m${this.empty}]`);
	}
}

module.exports = OwyProgressBar;
