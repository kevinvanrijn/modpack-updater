/**
 * Driver for downloading from optifine.net
 */
request(current.url, function(err, response, html) {
    console.log("[" + i + "] Navigating to: " + current.url);
    if (err) throw err;
    $ = cheerio.load(html);
    temp.href = $("h2:contains(" + obj.config.version + ")").nextAll("table.downloadTable").first().find("td.downloadLineMirror a").attr("href");
    request(temp.href, function(err, response, html) {
        console.log("[" + i + "] Navigating to: " + temp.href);
        if (err) throw err;
        $ = cheerio.load(html);
        temp.href = response.request.uri.protocol + "//" + response.request.uri.host + "/" + $("span#Download a").attr("href");
        temp.file = $("span#Download a").text().trim().replace(/^(Download )/, "").trim();
        console.log("[" + i + "] Downloading: " + temp.href + ' as "' + temp.file + '"');
        request(temp.href).pipe(fs.createWriteStream(obj.config.folder + "/" + temp.file)).on("finish", function() {
            console.log("[" + i + "] " + (current.name ? current.name : current.url) + " has successfully updated.");
            current.file = temp.file;
        });
    });
    temp.name = $("h2:contains(" + obj.config.version + ")").next("h3").text().trim();
    if (!current.name) current.name = temp.name;
});
