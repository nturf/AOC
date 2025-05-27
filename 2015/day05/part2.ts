export default function solve(input: string): string | number {
    let niceWord = 0

    const newinput = input.trim().split("\n")

    for (const word of newinput) {
        let hasRepeatedPairs = false
        let hasInBetween = false

        for (let index = 0; index < word.length - 1; index++) {
            const pair = word[index] + word[index + 1]
            const restWord = word.slice(index + 2)
            if (restWord.includes(pair)) {
                hasRepeatedPairs = true
                break
            }

        }

        for (let index = 0; index < word.length - 2; index++) {
            if (word[index] === word[index + 2]) {
                hasInBetween = true
                break
            }

        }

        if (hasRepeatedPairs && hasInBetween) {
            niceWord++
        }
    }
    return niceWord

}
