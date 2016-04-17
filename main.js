"use strict";

var app = require("app"),
    BrowserWindow = require("browser-window"),
    electron = require("electron"),
    ipc = electron.ipcMain;

var mainWindow = null,
    mainWindowBounds = {};

app.on("ready", function(){
   
    mainWindow = new BrowserWindow({
        height: 750,
        width: 1400,
        frame: false,
        resizable: true
    });
    
    mainWindow.loadURL("file://" + __dirname + "/app/html/index.html");
});


ipc.on("main-close", function(){
   app.quit(); 
});

ipc.on("main-minimize", function(){
   mainWindow.minimize(); 
});

ipc.on("main-maximize", function(){
    if(!mainWindow.isMaximized()){
        mainWindowBounds = mainWindow.getBounds();
        mainWindow.maximize(); 
    }else{
        mainWindow.setBounds(mainWindowBounds);
    }
});