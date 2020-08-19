const owy = require('../lib');
const spinner = new owy.Spinner();

spinner.start();
setTimeout(_ => spinner.stop(), 10000)