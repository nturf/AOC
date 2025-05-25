export default function solve(input: string): string | number {
    let calculateWrapper = 0

    const text = input.split("\n").filter(line => line.trim() !== "")

    for (const line of text) {
        const dimension = line.split("x").map(Number)


        if (dimension.length === 3) {
            const l = dimension[0]
            const w = dimension[1]
            const h = dimension[2]

            const face1 = l * w
            const face2 = w * h
            const face3 = h * l


            const wrapper = (2 * face1) + (2 * face2) + (2 * face3)
            const slack = Math.min(face1, face2, face3)
            const finalWrapper = wrapper + slack

            calculateWrapper += finalWrapper
        }
    }

    return calculateWrapper

}
