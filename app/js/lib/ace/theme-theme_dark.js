ace.define("ace/theme/theme_dark",["require","exports","module","ace/lib/dom"], function(require, exports, module) {

exports.isDark = true;
exports.cssClass = "theme-dark";
exports.cssText = ".theme-dark .ace_gutter {\
background: #386b7d;\
color: #E6E1DC\
}\
.theme-dark .ace_print-margin {\
width: 1px;\
background: transparent\
}\
.theme-dark {\
background-color: #386b7d;\
color: #E6E1DC\
}\
.theme-dark .ace_cursor {\
color: #FFFFFF\
}\
.theme-dark .ace_marker-layer .ace_selection {\
background: #5198b1\
}\
.theme-dark.ace_multiselect .ace_selection.ace_start {\
box-shadow: 0 0 3px 0px #1C1C1C;\
}\
.theme-dark .ace_marker-layer .ace_step {\
background: rgb(102, 82, 0)\
}\
.theme-dark .ace_marker-layer .ace_bracket {\
margin: -1px 0 0 -1px;\
background: lightred;\
}\
.theme-dark .ace_marker-layer .ace_active-line {\
background: transparent\
}\
.theme-dark .ace_gutter-active-line {\
background-color: transparent\
}\
.theme-dark .ace_marker-layer .ace_selected-word {\
border: 1px solid lightgray\
}\
.theme-dark .ace_invisible {\
color: #404040\
}\
.theme-dark .ace_entity.ace_name.ace_tag,\
.theme-dark .ace_keyword,\
.theme-dark .ace_meta,\
.theme-dark .ace_meta.ace_tag,\
.theme-dark .ace_storage {\
color: cornflowerblue\
}\
.theme-dark .ace_constant,\
.theme-dark .ace_constant.ace_character,\
.theme-dark .ace_constant.ace_character.ace_escape,\
.theme-dark .ace_constant.ace_other,\
.theme-dark .ace_support.ace_type {\
color: #68C1D8\
}\
.theme-dark .ace_constant.ace_character.ace_escape {\
color: #B3E5B4\
}\
.theme-dark .ace_constant.ace_language {\
color: #E1C582\
}\
.theme-dark .ace_constant.ace_library,\
.theme-dark .ace_string,\
.theme-dark .ace_support.ace_constant {\
color: mediumspringgreen;\
}\
.theme-dark .ace_constant.ace_numeric {\
color: #7FC578\
}\
.theme-dark .ace_invalid,\
.theme-dark .ace_invalid.ace_deprecated {\
color: #FFFFFF;\
background-color: #FE3838\
}\
.theme-dark .ace_fold {\
background-color: white;\
border-color: #E6E1DC\
}\
.theme-dark .ace_comment,\
.theme-dark .ace_meta {\
font-style: italic;\
color: lightgray;\
}\
.theme-dark .ace_entity.ace_other.ace_attribute-name {\
color: #EAF1A3\
}\
.theme-dark .ace_indent-guide {\
background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAACCAYAAACZgbYnAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAYdEVYdFNvZnR3YXJlAHBhaW50Lm5ldCA0LjAuNvyMY98AAAASSURBVBhXY/j//z8Dg7y1qxcAGfMD5x3nw/YAAAAASUVORK5CYII=) right repeat-y\
}";

var dom = require("../lib/dom");
dom.importCssString(exports.cssText, exports.cssClass);
});
