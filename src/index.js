
import firstClass from './js/firstClass.js';

require('./css/common.css');
require('./css/first.css');

$(window).on("load", function() {

    externalTest();

    const first= new firstClass('#txt_label');

    first.invoke();

});
