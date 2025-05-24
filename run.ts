import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import fetch from "node-fetch";
import { JSDOM } from "jsdom";
import readline from "readline";

dotenv.config();

const [, , yearArg, dayArg] = process.argv;
if (!yearArg || !dayArg) {
    console.error("Usage: ts-node run.ts <year> <day>");
    process.exit(1);
}

const year = yearArg;
const day = dayArg.padStart(2, "0");
const dayPath = path.join(year, `day${day}`);

const inputPath = path.join(dayPath, "input.txt");
if (!fs.existsSync(inputPath)) {
    console.error(`input.txt not found for ${year}/day${day}`);
    process.exit(1);
}

const input = fs.readFileSync(inputPath, "utf-8");

const metaPath = path.join(dayPath, "meta.json");
let meta: { part1Submitted: boolean, part2Submitted: boolean } = {
    part1Submitted: false,
    part2Submitted: false
};

if (fs.existsSync(metaPath)) {
    meta = JSON.parse(fs.readFileSync(metaPath, "utf-8"));
}

function saveMeta() {
    fs.writeFileSync(metaPath, JSON.stringify(meta, null, 2));
}

function ask(prompt: string): Promise<string> {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    return new Promise(resolve => {
        rl.question(prompt, answer => {
            rl.close();
            resolve(answer.trim().toLowerCase());
        });
    });
}

async function submitAnswer(year: string, day: string, level: "1" | "2", answer: string): Promise<boolean> {
    const session = process.env.AOC_SESSION;
    if (!session) {
        console.error("SESSION token missing in .env");
        return false;
    }

    const res = await fetch(`https://adventofcode.com/${year}/day/${Number(day)}/answer`, {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Cookie": `session=${session}`,
            "User-Agent": "github.com/sbytex/AOC"
        },
        body: `level=${level}&answer=${encodeURIComponent(answer)}`
    });

    const text = await res.text();

    if (text.includes("That's the right answer")) {
        console.log(`Correct answer for part ${level}!`);

        if (level === "1") {
            // Fetch Part 2
            const puzzleRes = await fetch(`https://adventofcode.com/${year}/day/${Number(day)}`, {
                headers: {
                    "Cookie": `session=${session}`,
                    "User-Agent": "github.com/sbytex/AOC"
                }
            });

            const html = await puzzleRes.text();
            const dom = new JSDOM(html);
            const articles = dom.window.document.querySelectorAll("article");
            const fullPuzzle = Array.from(articles).map(a => a.outerHTML).join("\n\n");

            const readmePath = path.join(dayPath, "README.md");
            fs.writeFileSync(readmePath, fullPuzzle);
            console.log("README.md updated with part 2.");
        }

        return true;
    } else if (text.includes("That's not the right answer")) {
        console.log("❌ Incorrect answer.");
    } else if (text.includes("You gave an answer too recently")) {
        console.log("⏳ Rate limited. Wait before submitting again.");
    } else {
        console.log("❓ Unexpected response:");
        console.log(text.slice(0, 300));
    }

    return false;
}

const runPart = async (part: "part1" | "part2") => {
    const level = part === "part1" ? "1" : "2";
    const submitted = meta[`${part}Submitted` as keyof typeof meta];

    const modulePath = path.resolve(`${dayPath}/${part}.ts`);
    const partModule = await import(modulePath);
    const result = partModule.default(input);

    console.log(`🧪 Output from ${part}:`, result);

    if (submitted) {
        console.log(`${part} already submitted. Skipping submission prompt.`);

        if (part === "part1") {
            const proceed = await ask("Run part2? (Y/n): ");
            if (proceed !== "n") {
                await runPart("part2");
            }
        }

        return;
    } else {
        const submit = await ask(`Submit ${part}? (y/N): `);
        if (submit === "y") {
            const correct = await submitAnswer(year, day, level as "1" | "2", result.toString());

            if (correct) {
                meta[`${part}Submitted` as keyof typeof meta] = true;
                saveMeta();

                if (part === "part1") {
                    const proceed = await ask("Proceed to part2? (Y/n): ");
                    if (proceed !== "n") {
                        await runPart("part2");
                    }
                }

                if (part === "part2") {
                    const nextDay = String(Number(day) + 1).padStart(2, "0");
                    const next = await ask(`Generate setup for day ${nextDay}? (Y/n): `);
                    if (next !== "n") {
                        const { exec } = await import("child_process");
                        exec(`ts-node setup.ts ${year} ${nextDay}`);
                    }
                }
            }
        }
    }
};

(async () => {
    console.log(`🎄 AoC ${year} Day ${day}`);
    await runPart("part1");
})();

