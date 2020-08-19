const owy = require('../lib');
const spinner = new owy.Spinner('vibing');

spinner.start();
setTimeout(_ => spinner.stop(), 10000)