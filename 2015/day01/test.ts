import part1 from "./part1.ts";
import part2 from "./part2.ts";
import * as fs from "fs";

const input = fs.readFileSync("input.txt", "utf-8");
const example = fs.readFileSync("example.txt", "utf-8");
console.log("Example Input:", example);
console.log("Part 1:", part1(input));
console.log("Part 2:", part2(input));
