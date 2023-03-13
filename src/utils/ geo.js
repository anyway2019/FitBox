//The following formulas show how to convert between degrees and semicircles:
//degrees = semicircles * (180 / 2 ^ 31)
//semicircles = degrees * (2 ^ 31 / 180)
const factor = 180 / (Math.pow(2, 31));
export default function semicircles2degress(semicirclesLat, semicirclesLng) {
    if (semicirclesLat === undefined || semicirclesLng === undefined) return undefined;
    return [semicirclesLng * factor, semicirclesLat * factor];
}