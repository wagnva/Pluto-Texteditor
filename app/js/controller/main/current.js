var files = require("./../../util/files.js"),
    textboxSystem = require("./textbox.js");

var current = $("#current"),
    root = $("#root");

var _createLiCurrent = function(filename, filetype, wholePath){
    return "<li data-path='" + wholePath + "'><span class='file-unsaved'></span><span class='file-close'><i class='fa fa-times'></i></span><span class='file-name'>" + filename + "</span><span class='file-type'>" + filetype + "</span></li>";
}

var addFileToCurrent = function(pathToFile){
        
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
            
        current.append(_createLiCurrent(actFileName,actFileExtension,pathToFile));
            
        //setup the click listeners: for opening the file and for closing and removing a current file
        setUpFileListener(current.find("li"));
        $("[data-path='" + pathToFile + "'] > .file-close").on("click", function(){
            
            //when the .file-close span is clicked remove the current element and delete the loaded data
            var liElement = $(this).parent();
            files.clearLoadedFile(liElement.attr("data-path"));
            liElement.remove();  
        });
    }
    
}

var setUpFileListener = function(elements){
    elements.unbind();
    elements.on("click", function(){
        var dataPath = $(this).attr("data-path");
        addFileToCurrent(dataPath);

        var path = root.attr("data-rootPath") + "\\" + dataPath;

        files.loadFile(path, function(err, file){
            textboxSystem.displayText(file.data);
        });
    });
}

module.exports =  {
    addFileToCurrent: addFileToCurrent,
    setUpFileListener: setUpFileListener
};
    