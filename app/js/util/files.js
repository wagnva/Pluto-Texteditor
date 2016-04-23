"use strict";

var fs = require("fs"),
    filewalker = require("filewalker");

var currentFiles = [];

var getLoadedFile = function(path){
    /*
     * @path Path to the file
     * Loops through the currentFiles array and sees if there is already a object loaded with the same path
     * @returns: int index of the file, -1 if there isnt one
     */
    for(var i = 0; i < currentFiles.length; i++){
        if(currentFiles[i].path && currentFiles[i].path === path){
            return i;
        }
    }
    return -1;
}

var files = {
    
    clearLoadedFiles: function(){
        
        /*
         * Clears the currentFiles Array
         */
        
        currentFiles = [];
        
    },
    
    clearLoadedFile: function(path){
        
        /*
         * @path The Path of the file that should be removed from the loaded files
         * Removes a file from the currentFiles array
         */
        
        currentFiles = currentFiles.filter(function(element){
            return element.path === path;
        }); 
        
    },
    
    loadFile: function(path, cb){
        
        /*
         * @path = path to the file which should be loaded
         * @cb = callback
         * Loads the file and returns the text
         */
        
        if(typeof cb !== "function"){
            cb = function(err, data){};
        }
        
        //get the index of the file: if the file is actually already loaded just return the saved data
        var loadedFileIndex = getLoadedFile(path);
        if(loadedFileIndex >= 0){
            return cb(null, currentFiles[loadedFileIndex]);   
        }
        
        //the file is not saved: read it and save the data 
        fs.readFile(path, "utf-8", function(err, data){
            if(err){
                console.log(err);
                cb(err);
            }else{
                currentFiles.push({data: data, path: path});
                cb(null, {data: data, path: path});
            }
        }); 
    },
    
    loadFolder: function(path, cb){
        
        /* 
         * @path = path of the directory which should be loaded
         * @cb = callback
         * Walk through the path, on every file add it to the array and when done return the sorted array
         */
        
        if(typeof cb !== "function"){
            cb = function(err, data){};
        }
        
        var listOfFiles = [],
            listOfDir = [];
        
        filewalker(path)
            .on("error", function(err){
                cb(err);
            })
            .on("dir", function(dir){
                listOfDir.push(dir);
            })
            .on("file", function(file){
                listOfFiles.push(file);
            })
            .on("done", function(){
                cb(null, {files: listOfFiles.sort(), dir: listOfDir.sort()});
            }).walk();
        
    },
    
    splitPathLast: function(path){
        
        /*
         * @path = path to be split
         * Splits the path and returns the last element
         */
        
        if(typeof path !== "string"){
            path = "";
        }
        var temp = path.split("/");
        return temp[temp.length - 1];
    },
    
    saveFile: function(file){
        
    }
}


module.exports = files;