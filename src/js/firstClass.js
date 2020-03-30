"use strict";

import moment from 'moment'

export default class firstClass {


    constructor(div_name) {

        this._div_name = div_name;

    }

    invoke() {

        $(this._div_name).html("Invoked : " + moment().format("YYYY년 MM월 DD일"));

    }

}
