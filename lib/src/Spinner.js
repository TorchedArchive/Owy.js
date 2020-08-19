const styles = require('../styles');

class OwySpinner {
	constructor(options = {}) {
		this.style = styles['line'];
	}

	start() {
		let cur = 0;
		setInterval(() => {
			process.stdout.write(`\u001b[1D${this.style.stages[cur]}`);
			cur = (cur + 1) % this.style.stages.length;
		}, this.style.interval);
	}
}

module.exports = OwySpinner;
