import path from "path";
import fs from "fs";
import { run } from "../../utils/exec.js";

export async function downloadVideo(url, mode, format) {
const outDir = path.resolve("downloads");
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir);

const fileName = Date.now() + "." + format;
const outputPath = path.join(outDir, fileName);

let cmd = "";

if (mode === "audio") {
    cmd = `yt-dlp -x --audio-format ${format} -f bestaudio -o "${outputPath}" "${url}"`;
} else {
    cmd = `yt-dlp -f "bestvideo+bestaudio" --merge-output-format ${format} -o "${outputPath}" "${url}"`;
}

try {
    await run(cmd);
    return {
        file: "/downloads/" + fileName,
        name: fileName
    };
} catch (e) {
    return { error: "Gagal download" };
}

}