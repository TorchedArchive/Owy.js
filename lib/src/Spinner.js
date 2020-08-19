const styles = require('../styles');

class OwySpinner {
	constructor(options = {}) {
		this.style = styles['line'];
		this.spin = null;
	}

	start() {
		let cur = 0;
		this.spin = setInterval(() => {
			process.stdout.write(`\u001b[1D${this.style.stages[cur]}`);
			cur = (cur + 1) % this.style.stages.length;
		}, this.style.interval);
	}

	stop() {
		clearInterval(this.spin)
		process.stdout.write(`\u001b[2K`);
	}
}

module.exports = OwySpinner;
