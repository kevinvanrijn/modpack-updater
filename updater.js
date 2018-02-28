var fs = require("fs-extra");
var url = require("url");
var request = require("request");
var cheerio = require("cheerio");

fs.readFile("downloadlist.json", "utf8", function(err, data) {
    if (err) throw err;
    var obj = JSON.parse(data);
    fs.ensureDirSync(obj.config.folder);
    for (var i = 0; i < obj.downloads.length; i++) {
        parseDownload(obj, obj.downloads[i], i);
    }
});

function parseDownload(obj, current, i) {
    fs.readFile("drivers/" + url.parse(current.url).host + ".js", "utf8", function(err, script) {
        console.log("Checking " + (current.name ? current.name : current.url) + " for updates.");
        if (err) throw err;
        var temp = {};
        var $;
        eval(script); // There must be a better way to do this.
    });
}
