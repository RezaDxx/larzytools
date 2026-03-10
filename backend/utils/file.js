export function safeName(name) {
return name.replace(/[^\w\d_-.]+/g, "_");
}