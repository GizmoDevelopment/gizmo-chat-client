"use strict";

const path = require("path");
const electron = require("electron");
const { app, remote, BrowserWindow, Menu, ipcMain, globalShortcut } = electron;

const singleInstanceLock = app.requestSingleInstanceLock();
app.setAppUserModelId("com.gizmo.chat");

var mainWindow;

if (singleInstanceLock) {

    app.on("second-instance", () => {
        if (mainWindow) {
            mainWindow.restore();
            mainWindow.focus();
        }
    });

    app.on("ready", () => {

        mainWindow = new BrowserWindow({
            minWidth: 1200,
            minHeight: 700,
            frame: false,
            backgroundColor: "#222222",
            webPreferences: {
                nodeIntegration = true
            }
        });

        mainWindow.loadFile("src/interface/index.html");

    });

} else {
    app.quit();
}
