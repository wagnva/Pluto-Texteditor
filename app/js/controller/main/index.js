"use strict";

var electron = require("electron"),
    ipc = electron.ipcRenderer,
    remote = electron.remote,
    dialog = remote.dialog,
    files = require("../js/util/files.js"),
    textbox = require("../js/controller/main/textbox.js"),
    menu = require("../js/controller/main/menu.js"),
    filesystem = require("../js/controller/main/filesystem.js");

var closeBtn = $(".close"),
    minifyBtn = $(".minimize"),
    maximizeBtn = $(".maximize"),
    mainTextarea = $("#main-textarea");
    

/* Setup Window Button Listeners */
closeBtn.on("click", function(event){
    ipc.send("main-close");
});

minifyBtn.on("click", function(event){
   ipc.send("main-minimize"); 
});

maximizeBtn.on("click", function(event){
   ipc.send("main-maximize"); 
});


/* function called when the document is resized */
var windowResizeMethod = function(event){
    // 55px is the height of the menu bar at the top
    var newHeight = $(window).height() - 63; //55 = height of the menu bar + 8 = bottom scrollbar
    mainTextarea.css("height", newHeight); //.css("max-height", newHeight).css("min-height", newHeight);
    textbox.resize();
}

//call once, so that the textarea size is correct when the window is launched
windowResizeMethod();

window.addEventListener("resize", windowResizeMethod);

/* Setup the textbox area */
textbox.init();







    
