const owy = require('../lib');
const spinner = new owy.Spinner('Checking your vibe', {style: {stages: ['-', '+'] } });

spinner.start();
setTimeout(() => spinner.success('You passed the vibe check!'), 4000);
