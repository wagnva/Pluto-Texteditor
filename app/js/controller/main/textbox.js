var mainTextarea = $("#main-textarea");

var displayText = function(data){
    /*
     * @data The Text which should be displayed
     * Empties and then adds the text to the textbox
     */
        
    mainTextarea.empty();
    mainTextarea.text(data);
}

module.exports = {
    displayText: displayText
};