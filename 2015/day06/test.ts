import part1 from "./part1.ts";
import part2 from "./part2.ts";
import * as fs from "fs";

const input = fs.readFileSync("input.txt", "utf-8").trim();
const examplePath = "example.txt";
let example = "";

if (fs.existsSync(examplePath)) {
    example = fs.readFileSync(examplePath, "utf-8").trim();
}

if (example) {
    console.log(" Example Tests:");
    console.log("Part 1 (Example):", part1(example));
    console.log("Part 2 (Example):", part2(example));
    console.log("──────────────────────────────");
}

console.log(" Actual Input:");
console.log("Part 1:", part1(input));
console.log("Part 2:", part2(input));

