var currentSystem = require("./current.js");

var root = $("#root"),
    current = $("#current");

var currentFolder = null;

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

    currentSystem.setUpFileListener(root.find(".file"));
}

var init = function(){
    root.empty();
}


var addDirectory = function(dirPath){
        
    /*
     * @dirPath = the path to a directory (example: 'css/test' )
     * Loop through the html filestructure. See if a folder exists and go one level down. Create a new folder if none is found
     */
        
    var splitPath = dirPath.split("/");
    
    splitPath.forEach(function(currentSplit, index, array){
             
        //if root
        if(currentFolder === null){
                
            //and if the folder doesnt exist yet
            if(!root.children("[data-path='" + currentSplit + "']").length){
                //create the folder at root level and set the new current folder
                root.append(createLiFolder(currentSplit));
            }
            //set the new current folder
            currentFolder = root.children("[data-path='" + currentSplit + "']");
                
        }else{
                
            //the folder doesnt exist yet
            if(!currentFolder.find(" > ul > [data-path='" + currentSplit + "']").length){
                //create the folder in the current folder
                currentFolder.find(" > ul").append(createLiFolder(currentSplit));
            }
            //set the new current folder
            currentFolder = currentFolder.find(" > ul > li[data-path='" + currentSplit + "']");
                
        }
            
    });
        
        
    currentFolder = null;
}

var addFileToSystem = function(filePath){

    /*
     * @filePath = the path to the file (example: css/test/index.css)
     * Loops through the folder until the correct one is found. Then adds the file to it
     */
        
    //get the folder path and the filename
    var splitPath = filePath.split("/"),
        filename = splitPath.pop();
        
    splitPath.forEach(function(currentSplit, index, array){
            
        //if root
        if(currentFolder === null){
            
            //set the new current folder
            currentFolder = root.children("[data-path='" + currentSplit + "']");
                
        }else{
                
            //set the new current folder
            currentFolder = currentFolder.find(" > ul > li[data-path='" + currentSplit + "']");
            
        }
        
    });
        
    appendFile(currentFolder, filename, filePath);
    currentFolder = null;
}

var createLiFolder = function(folderName){
    return "<li data-path='" + folderName + "'> <div class='closed'>" + folderName + "</div> <ul> </ul> </li>";
}

var createLiFile = function(fileName, fileExtension, wholePath){
    return "<li class='file' data-path='" + wholePath + "'> <span class='file-name'>" + fileName + "</span><span class='file-type'>" + fileExtension + "</span> </li>";
}
    
var appendFile = function(to, filename, wholePath){
        
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
        root.append(createLiFile(actFileName, actFileExtension, wholePath));
    }else{
        to.find(" > ul ").append(createLiFile(actFileName, actFileExtension, wholePath));
    }
}


module.exports = {
    init: init,
    addDirectory: addDirectory,
    addFileToSystem: addFileToSystem,
    setupFileFolderClickListener: setupFileFolderClickListener
};