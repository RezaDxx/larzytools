const audioList = ["mp3", "m4a", "wav", "flac"];
const videoList = ["mp4", "mkv", "webm"];

function updateFiletypes() {
const mode = document.getElementById("mode").value;
const select = document.getElementById("filetype");
const list = mode === "audio" ? audioList : videoList;

select.innerHTML = list
    .map(type => `<option value="${type}">${type.toUpperCase()}</option>`)
    .join("");

}

document.addEventListener("DOMContentLoaded", updateFiletypes);

async function startDownload() {
const raw = document.getElementById("urls").value.trim();
const urls = raw.split("\n").filter(x => x.trim() !== "");
const mode = document.getElementById("mode").value;
const ext = document.getElementById("filetype").value;

const output = document.getElementById("output");
const bar = document.getElementById("progressBar");

if (urls.length === 0) {
    output.innerHTML = "⚠️ Masukkan link dulu.";
    return;
}

output.innerHTML = "Memulai...";
bar.style.width = "0%";

let done = 0;
let results = [];

for (let url of urls) {
    output.innerHTML = `Memproses: ${url}`;

    try {
        const res = await fetch("http://localhost:3000/api/youtube", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                url: url,
                mode: mode,
                format: ext
            })
        });

        const data = await res.json();

        if (data.error) {
            results.push(`<span style='color:red'>Gagal:</span> ${url}`);
        } else {
            results.push(
                `✅ <a class="link" href="http://localhost:3000${data.file}" download>${data.name}</a>`
            );
        }
    } catch (e) {
        results.push(`<span style='color:red'>Error koneksi:</span> ${url}`);
    }

    done++;
    bar.style.width = `${Math.floor((done / urls.length) * 100)}%`;
}

output.innerHTML = results.join("<br>");

}