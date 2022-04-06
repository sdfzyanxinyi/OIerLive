const fs = require("fs/promises"),
    path = require("path"),
    screenshot = require("desktop-screenshot"),
    util = require("./util.js"),
    request = require("./request.js");

const shot = async () => {
    util.log("Screenshoting...");
    screenshot(__dirname + "/live/screenshot.png");
    const image_data = (await fs.readFile(__dirname + "/live/screenshot.png")).toString("base64");
    const note = (await fs.readFile(__dirname + "/live/note.txt", encoding = "utf-8"));
    util.log("Syncing data...");
    util.log(note);
    await request.post({ password: util.read_config().password, image: image_data, text: note});
}

const main = async () => {
    await util.load_config();
    setInterval(shot, util.read_config().interval);
}
main();