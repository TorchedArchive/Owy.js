const owy = require('../lib');
const spinner = new owy.Spinner({text: 'Checking your vibe', style: 'dots', bi: true});

spinner.start();
setTimeout(() => spinner.success('You passed the vibe check!'), 4000)