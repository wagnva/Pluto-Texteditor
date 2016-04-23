var filesystem = require("./filesystem.js"),
    textboxSystem = require("./textbox.js"),
    currentSystem = require("./current.js");
    
    
var files = require("./../../util/files.js");

var current = $("#current"),
    root = $("#root");

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
        
        var path = dialog.showOpenDialog({title: "Open Directory", properties: ["openDirectory"]});
        
        //if the user didnt press cancel
        if(path){
            path = path[0];
            
            //clear the display
            filesystem.init();
            current.empty();
            textboxSystem.displayText("");

            files.loadFolder(path, function(err, list){

                //add all the directories
                list.dir.forEach(function(dirPath){
                    filesystem.addDirectory(dirPath);
                });


                list.files.forEach(function(filePath){
                    filesystem.addFileToSystem(filePath);
                });

                filesystem.setupFileFolderClickListener();
            });

            //add the root path to the root display
            root.attr("data-rootPath", path);
        }
        
        
    },
    
    fileSave: function(){
        
        console.log("Save File");
        
    }
}

menu.init();
    
module.exports = menu;