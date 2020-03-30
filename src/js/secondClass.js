"use strict";

export default class secondClass {


    constructor(div_name) {

        this._div_name = div_name;

    }

    invoke() {

        $(this._div_name).html("Second Invoked");

    }

}
