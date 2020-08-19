const owy = require('../lib');
const spinner = new owy.Spinner('Downloading');

spinner.start();
setTimeout(_ => {
	spinner.stop()
	setTimeout(() => {
		spinner.style = owy.styles.line
		spinner.start('Installing')}, 2000)
}, 5000);
