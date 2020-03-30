
import secondClass from './js/secondClass.js';

require('./css/common.css');
require('./css/second.css');

$(window).on("load", function() {

    externalTest();

    const second= new secondClass('#txt_label');

    second.invoke();

});
