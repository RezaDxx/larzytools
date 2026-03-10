import express from "express"
import { exec } from "child_process"
import path from "path"
import { fileURLToPath } from "url"
import fs from "fs"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
app.use(express.json())

// folder output
const outputDir = path.join(__dirname, "downloads")
if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir)

app.post("/api/youtube", (req, res) => {
  const { url, format } = req.body

  if (!url) return res.status(400).json({ error: "URL kosong" })

  // format default mp4
  const output = path.join(outputDir, `video_%(id)s.%(ext)s`)
  const selectedFormat = format === "mp3" ? "bestaudio" : "bestvideo+bestaudio"

  const command = `yt-dlp -f "${selectedFormat}" -o "${output}" "${url}"`

  exec(command, (err, stdout, stderr) => {
    if (err) return res.status(500).json({ error: "Gagal download" })

    const match = stdout.match(/Merging.*?to '(.*?)'/)
    if (!match) return res.status(500).json({ error: "Output tidak ditemukan" })

    const filePath = match[1]
    return res.json({ file: "/download/" + path.basename(filePath) })
  })
})

app.use("/download", express.static(outputDir))

app.listen(3000, () => {
  console.log("Server jalan di http://localhost:3000")
})