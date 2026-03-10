import { exec } from "child_process";

export function run(cmd) {
return new Promise((resolve, reject) => {
exec(cmd, (err, stdout) => {
if (err) reject(err);
else resolve(stdout);
});
});
}