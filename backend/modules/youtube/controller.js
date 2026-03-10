import { downloadVideo } from "./service.js";

export async function downloadYoutube(req, res) {
try {
const { url, mode, format } = req.body;

    if (!url) return res.json({ error: "URL kosong" });

    const result = await downloadVideo(url, mode, format);
    res.json(result);

} catch (err) {
    console.log(err);
    res.json({ error: "Server error" });
}

}