const owy = require('../lib');
const spinner = new owy.Spinner('Checking your vibe');

spinner.start();
setTimeout(() => {
	spinner.style = owy.styles.line;
	spinner.success('You passed the vibe check!');
}, 4000);
