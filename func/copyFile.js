(function() {

// Libraries
var fs = require("fs-extra");

// Functions
var localizedName = require("../func/localizedName.js");
var closeThread = require("../func/closeThread.js");

// Variables
var MESSAGE_VERBOSE = true;

module.exports = function(i, current, callback) {
	// Check if file exists
	if(!current.file || !fs.existsSync("../_temp" + "/" + current.file, "../" + (current["folder-override"] ? current["folder-override"] : global.config.folder) + "/" + current.file)) {
		console.message(i, "WARNING: '" + localizedName(i) + "' is missing its file. Will it be generated by another process?");
		closeThread(i);
		callback();
		return;
	}

	// Copy this file to the configured folder
	fs.copySync("../_temp" + "/" + current.file, "../" + (current["folder-override"] ? current["folder-override"] : global.config.folder) + "/" + (current["file-override"] ? current["file-override"] : current.file) + (current["file-disabled"] ? ".disabled" : ""));
	console.message(i, "Copied '" + localizedName(i) + "' to '" + (current["folder-override"] ? current["folder-override"] : global.config.folder) + "/'", MESSAGE_VERBOSE);
	// Copy this file to any additional folders
	if (current["additional-folder"]) {
		fs.copySync("../_temp" + "/" + current.file, "../" + current["additional-folder"] + "/" + (current["file-override"] ? current["file-override"] : current.file) + (current["file-disabled"] ? ".disabled" : ""));
		console.message(i, "Copied '" + localizedName(i) + "' to '" + current["additional-folder"] + "/'", MESSAGE_VERBOSE);
	}

	if(!current.exec || current.exec.length < 1)
		closeThread(i);
	callback();
}

})();
