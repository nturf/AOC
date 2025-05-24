
// 2015 Day 1 - Part 1
export default function solve(input: string): string | number {
    let val = 0
    for (const char of input) {
        if (char === "(") {
            val++
        } else if (char === ")") {
            val--
        }
    }
    return val
}



