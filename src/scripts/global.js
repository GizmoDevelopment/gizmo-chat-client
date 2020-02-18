"use strict";

const path = require("path"),
    $ = require("../modules/jquery.min.js"),
    electron = require("electron"),
    { remote, ipcRenderer } = electron;

function createTooltip (parent, pos, data) {

    console.log(parent);
    console.log(data);

    parent.append(`
        <div class = "tooltip">
            ${data}
        </div>
    `);

}

function removeTooltip (parent) {
    console.log(parent);
    parent.children("#tooltip").remove();
}
