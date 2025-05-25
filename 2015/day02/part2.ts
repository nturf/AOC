export default function solve(input: string): string | number {
    let ribbiondimensions = 0
    const text = input.split("\n").filter(line => line.trim() !== "")

    for (let line of text) {
        const dimension = line.split("x").map(Number)

        if (dimension.length === 3) {
            const l = dimension[0]
            const w = dimension[1]
            const h = dimension[2]

            const sorted = [l, w, h].sort((a, b) => a - b)
            const [val1, val2] = sorted

            let wrap = 2 * val1 + 2 * val2

            let tieBow = l * w * h

            const finalRibbon = wrap + tieBow

            ribbiondimensions += finalRibbon

        }

    }
    return ribbiondimensions
}
