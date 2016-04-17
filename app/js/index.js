"use strict";

var electron = require("electron"),
    ipc = electron.ipcRenderer,
    remote = electron.remote,
    dialog = remote.dialog,
    files = require("./../js/files.js");



var closeBtn = $(".close"),
    minifyBtn = $(".minimize"),
    maximizeBtn = $(".maximize"),
    mainTextarea = $("#main-textarea"),
    root = $("#root"),
    current = $("#current");



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
    var newHeight = $(window).height() - 55;
    mainTextarea.css("height", newHeight); //.css("max-height", newHeight).css("min-height", newHeight);
}

//call once, so that the textarea size is correct when the window is launched
windowResizeMethod();

window.addEventListener("resize", windowResizeMethod);
/* /Setup Window Button Listeners */

var setupFileFolderClickListener = function(){
            
    /*
     * Adds click listener to the folders and the files
     * Folder: Just toggles the visiblity of the child ul
     * File: Loads the file 
     */
        
    var elements = root.find(".opened,.closed");
        
    //remove old click listeners
    elements.unbind("click");
        
    //setup new click listeners
    elements.on("click", function(event){
        if($(this).hasClass("opened")){
            $(this).removeClass("opened");
            $(this).addClass("closed");
        }else if($(this).hasClass("closed")){
            $(this).removeClass("closed");
            $(this).addClass("opened");
        }

        var ul = $(this).siblings("ul");

        ul.toggle();
        ul.children("li").toggle();
        event.stopPropagation();
    });
        
    /* File Listener */
    var fileListener = function(elements){
        elements.unbind();
        elements.on("click", function(){
            var dataPath = $(this).attr("data-path"); 
            currentSystem.addFileToCurrent(dataPath);

            var path = root.attr("data-rootPath") + "\\" + dataPath;

            files.loadFile(path, function(err, file){
                textboxSystem.displayText(file.data);
            });
        });
    }    
    
    fileListener(root.find(".file"));
    fileListener(current.find("li"));
    
}


/* Filesystem display */
var filesystem = {
    _currentFolder: null,
    init: function(){
        root.empty();
    },
    reset: function(){
        this._currentFolder = null;
    },
    addDirectory: function(dirPath){
        
        /*
         * @dirPath = the path to a directory (example: 'css/test' )
         * Loop through the html filestructure. See if a folder exists and go one level down. Create a new folder if none is found
         */
        
        var splitPath = dirPath.split("/");
    
        splitPath.forEach(function(currentSplit, index, array){
             
            //if root
            if(filesystem._currentFolder === null){
                
                //and if the folder doesnt exist yet
                if(!root.children("[data-path='" + currentSplit + "']").length){
                    //create the folder at root level and set the new current folder
                    root.append(filesystem._createLiFolder(currentSplit));
                }
                //set the new current folder
                filesystem._currentFolder = root.children("[data-path='" + currentSplit + "']");
                
            }else{
                
                //the folder doesnt exist yet
                if(!filesystem._currentFolder.find(" > ul > [data-path='" + currentSplit + "']").length){
                    //create the folder in the current folder
                    filesystem._currentFolder.find(" > ul").append(filesystem._createLiFolder(currentSplit));
                }
                //set the new current folder
                filesystem._currentFolder = filesystem._currentFolder.find(" > ul > li[data-path='" + currentSplit + "']");
                
            }
            
        });
        
        
        this.reset();
    },
    addFileToSystem: function(filePath){

        /*
         * @filePath = the path to the file (example: css/test/index.css)
         * Loops through the folder until the correct one is found. Then adds the file to it
         */
        
        //get the folder path and the filename
        var splitPath = filePath.split("/"),
            filename = splitPath.pop();
        
        splitPath.forEach(function(currentSplit, index, array){
            
            //if root
            if(filesystem._currentFolder === null){
                
                //set the new current folder
                filesystem._currentFolder = root.children("[data-path='" + currentSplit + "']");
                
            }else{
                
                //set the new current folder
                filesystem._currentFolder = filesystem._currentFolder.find(" > ul > li[data-path='" + currentSplit + "']");
                
            }
            
        });
        
        filesystem._appendFile(this._currentFolder, filename, filePath);
        filesystem.reset();
    },
    _createLiFolder: function(folderName){
        return "<li data-path='" + folderName + "'> <div class='closed'>" + folderName + "</div> <ul> </ul> </li>";
    },
    _createLiFile: function(fileName, fileExtension, wholePath){
        return "<li class='file' data-path='" + wholePath + "'> <span class='file-name'>" + fileName + "</span><span class='file-type'>" + fileExtension + "</span> </li>";
    },
    _appendFile: function(to, filename, wholePath){
        
        /*
         * @to = which folder should the file be appended to
         * @filename = name of the file
         * Finds the name and the extension of the file and then adds it to the correct folder
         */
        
        var temp = filename.split("."),
            actFileName = temp[0] + ".";
        
        temp.shift();
        var actFileExtension = temp.join(".");
        
        if(to === root || (!to)){
            root.append(this._createLiFile(actFileName, actFileExtension, wholePath));
        }else{
            to.find(" > ul ").append(this._createLiFile(actFileName, actFileExtension, wholePath));
        }
    },
    setupClickListeners: function(){

    }
}

/* The textbox */
var textboxSystem = {
    
    displayText: function(data){
        
        /*
         * @data The Text which should be displayed
         * Empties and then adds the text to the textbox
         */
        
        mainTextarea.empty();
        mainTextarea.text(data);
        
    }
    
}

/* The current files display */
var currentSystem = {
    addFileToCurrent: function(pathToFile){
        
        /*
         * @pathToFile The Path to the File
         * Adds the file to the current display, if not already there.
         */
    
        //if the current file isnt yet added to the current display, add it
        console.log(pathToFile);
        if(!current.children("[data-path='" + pathToFile + "']").length){
            //get the filename: replace all the \ with / using regex and then get the last element
            var filename = files.splitPathLast(pathToFile.replace(/\\/g, "/"));
            var temp = filename.split("."),
            actFileName = temp[0] + ".";
        
            temp.shift();
            var actFileExtension = temp.join(".");
            
            current.append(currentSystem._createLiCurrent(actFileName,actFileExtension,pathToFile));
            setupFileFolderClickListener();
        }
    
    },
    _createLiCurrent: function(filename, filetype, wholePath){
        return "<li data-path='" + wholePath + "'><span class='file-close'><i class='fa fa-times'></i></span><span class='file-name'>" + filename + "</span><span class='file-type'>" + filetype + "</span></li>";
    },
    setupClickListeners: function(){
        
    }
}

/* The menu bar */
var menu = {
    
    init: function(){
        
        /*
         * Adds a click listener to the menu items. 
         * Calls the function named in the data-func attribute
         */
        
        $(".submenu-item").on("click", function(){
            
            var func = $(this).attr("data-func");
            
            //get the function based on the data-attr and call it
            var actualFunc = menu[func];
            if( typeof actualFunc === "function"){
                actualFunc();
            }
            
        });
    
    },
    
    fileClose: function(){
        ipc.send("main-close");
    },
    
    fileOpen: function(){
        var path = dialog.showOpenDialog({title: "Open File", properties: ["openFile"]})[0];
        
        files.loadFile(path, function(err, file){
            currentSystem.addFileToCurrent(file.path);
            textboxSystem.displayText(file.data);
        });
        
    },
    
    filesOpen: function(){
        
        /*
         * Open a file dialog to open a directory. Then get all the directories and files and display it in the html filestructure
         */
        
        //clear the display
        filesystem.init();
        
        var path = dialog.showOpenDialog({title: "Open Directory", properties: ["openDirectory"]})[0];
        files.loadFolder(path, function(err, list){
    
            //add all the directories
            list.dir.forEach(function(dirPath){
                filesystem.addDirectory(dirPath);
            });
            
            
            list.files.forEach(function(filePath){
                filesystem.addFileToSystem(filePath);
            });
            
            setupFileFolderClickListener();
        });
        
        //add the root path to the root display
        root.attr("data-rootPath", path);
    }
    
}

menu.init();
    
    
