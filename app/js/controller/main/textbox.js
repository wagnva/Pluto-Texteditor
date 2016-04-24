var mainTextarea = $("#main-textarea");

var editor = ace.edit("main-textarea");

var modes = {
    js: "javascript",
    css: "css",
    html: "html",
    coffe: "coffe",
    cs: "csharp",
    go: "golang",
    phph: "php",
    abap: "abap",
    batch: "batchfile",
    java: "java",
    fortran: "fortran",
    jade: "jade"
}

var init = function(){
    /* Setup Acer Textarea */
    ace.config.set("basePath", "./../../lib/ace");
    
    editor.setOptions({
        enableEmmet: true,
        spellcheck: false
    });
    
    editor.setTheme("ace/theme/theme_dark");
    editor.getSession().setMode("ace/mode/html");
}

var resize = function(){
    editor.resize();
}

var displayText = function(data, fileextension){
    /*
     * @data The Text which should be displayed
     * Empties and then adds the text to the textbox
     */
    
    //look up the correct mode and set it
    var mode = modes[fileextension];
    
    if(!mode){
        //if the fileExtension isnt know, just try it normally, maybe its correct
        mode = fileextension;
    }
    
    fullMode = "ace/mode/" + mode;
    console.log(fullMode);
    editor.getSession().setMode(fullMode);
        
    editor.setValue(data);
    //when adding text ace automatically selects it -> unselect everything
    editor.getSession().selection.clearSelection();
}

module.exports = {
    init: init,
    resize: resize,
    displayText: displayText
};