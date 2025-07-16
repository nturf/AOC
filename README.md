# 🎄 Advent of Code Automation & Solutions

Welcome to my Advent of Code automation and solutions repository! This project helps you fetch puzzle inputs, generate solution boilerplate, and streamline your AoC workflow.


## 🚀 Description

This repo automates the Advent of Code experience:
- Can fetch daily puzzle input and description
- Generates TypeScript boilerplate for each day's solutions
- Organizes everything by year and day
- Lets you submit answers and track progress


## 🛠️ Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/nturf/AOC.git
   cd AOC
   npm install
   ```
## .env Setup
- set `AOC_SESSION=` in .env
- [Here's how to find your session cookie](https://github.com/wimglenn/advent-of-code-wim/issues/1)

## 📝 Commands

- `./aoc get <year> <day>`  
  Fetches the problem input and description for the given year and day.

- `./aoc sub <year> <day>`  
  Submits your solution for the given year and day.

**Tip:** You usually don't need to specify the year every time. The default year is set to `2015`.
- To change the default year, edit the `DEFAULT_AOC_YEAR=2015` field in the `aoc` script.
- Then you can use:
  - `./aoc get <day>`
  - `./aoc sub <day>`

## 📁 Folder Structure

When you run the commands, the following structure is created:

```
year/dayXX/
  ├── input.txt      # The input for the problem
  ├── README.md      # Contains the Puzzle text 
  ├── part1.ts       # Solution for part 1
  ├── part2.ts       # Solution for part 2
  ├── test.ts        # Test cases for the solution
  └── meta.json      # Metadata for the problem
```

## ⚙️ Workflow Explained

1. **Fetching a Problem:**
   - Run `./aoc get <day>` (or with year) to download the day's input and description.
   - The script creates the folder and boilerplate files for you.

2. **Solving Part 1:**
   - Open `part1.ts`. The generated boilerplate typically looks like:
     ```ts
     export default function solve(input: string): number | string {
       // Your solution here
     }
     ```
   - The `input` parameter contains the contents of `input.txt` as a string.
   - Write your solution logic using this input.

3. **Testing:**
   - Use `test` to write and run test cases for your solutions.
   - `ts-node test.ts` will give the output for you solution.

4. **Submitting part1:**
   - Run `./aoc sub <day>` (or with year) to submit your answer. The script will use your solution and input automatically.
   soon after the submission on part1, part2 will be fetched in your `README.md`

5. **Solving Part 2:**
   - Open `part2.ts`. The structure is the same as part 1, ready for your code.

6. **Test & Submit:**
   - Run `ts-node test.ts` to test solution and run `./aoc sub <day>` to submit part2


## Example Solutions

-  [2015 Solutions](./2015)


## Contact me
If you have any questions or suggestions, feel free to reach out:
- **Twitter:** [@nturfff](https://twitter.com/nturfff)
---
