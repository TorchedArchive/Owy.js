const owy = require('../lib');
const bar = new owy.ProgressBar('Downloading');

bar.init();
setInterval(() => bar.next(), 2000)