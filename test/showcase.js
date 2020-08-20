const owy = require('../lib');
const spinner = new owy.Spinner('Checking your vibe');

spinner.start();
setTimeout(() => {
	spinner.style = owy.styles.line;
	spinner.success('You passed the vibe check!').start('Downloading cat images');
	setTimeout(() => {
		spinner.dual = true;
		spinner.info('Downloaded! One of the images were too cute.').start('Compressing an image..');
	}, 4000);
}, 4000);
