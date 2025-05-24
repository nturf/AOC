import fs from "fs";
import path from "path";
import fetch from "node-fetch";
import { JSDOM } from "jsdom";
import * as dotenv from "dotenv";
dotenv.config();

const BASE_URL = "https://adventofcode.com";

const args = process.argv.slice(2);
const year = args[0] || "2015";
const day = args[1] || "1";

const dir = path.join(year, `day${String(day).padStart(2, "0")}`);
const session = process.env.AOC_SESSION;

if (!session) {
    console.error("AOC_SESSION not found in .env");
    process.exit(1);
}

const fetchInput = async () => {
    const url = `${BASE_URL}/${year}/day/${day}/input`;
    const res = await fetch(url, {
        headers: {
            cookie: `session=${session}`,
            "User-Agent": "github.com/sbytex/AOC",
        },
    });

    if (!res.ok) {
        throw new Error(`Failed to fetch input: ${res.status}`);
    }

    return await res.text();
};

const fetchDescription = async () => {
    const url = `${BASE_URL}/${year}/day/${day}`;
    const res = await fetch(url, {
        headers: {
            cookie: `session=${session}`,
            "User-Agent": "github.com/sbytex/AOC",
        },
    });

    if (!res.ok) {
        throw new Error(`Failed to fetch description: ${res.status}`);
    }

    const html = await res.text();
    const dom = new JSDOM(html);
    const article = dom.window.document.querySelector("article");

    return article ? article.textContent || "" : "No description found.";
};

const createFiles = async () => {
    if (fs.existsSync(dir)) {
        console.log("Directory already exists. Aborting.");
        process.exit(1);
    }

    fs.mkdirSync(dir, { recursive: true });

    const [input, description] = await Promise.all([
        fetchInput(),
        fetchDescription(),
    ]);

    fs.writeFileSync(path.join(dir, "input.txt"), input.trim());
    fs.writeFileSync(path.join(dir, "example.txt"), ""); // for tests
    fs.writeFileSync(path.join(dir, "README.md"), description.trim());

    const partTemplate = (part: number) => `
export default function solve(input: string): string | number {
  const lines = input.trim().split("\\n");
  return 0; // replace with logic
}
`;

    fs.writeFileSync(path.join(dir, "part1.ts"), partTemplate(1));
    fs.writeFileSync(path.join(dir, "part2.ts"), partTemplate(2));

    fs.writeFileSync(
        path.join(dir, "test.ts"),
        `import part1 from "./part1.ts";
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

`
    );

    console.log(`Setup complete for Day ${day}, ${year}`);
};

createFiles().catch((err) => {
    console.error("Error during setup:", err);
});

