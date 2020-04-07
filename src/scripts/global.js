"use strict";

const path = require("path");
const $ = require("../modules/jquery.min.js");
const electron = require("electron");
const { remote, ipcRenderer } = electron;

const __core = path.join(__dirname, "../../");  

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
