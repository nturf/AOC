export default function solve(input: string): string | number {

    let goodWord = 0
    const allWords = input.trim().split("\n")
    const forbidPair = ["ab", "cd", "pq", "xy"]

    for (const word of allWords) {
        let vowelCount = 0
        let hasDoubleLetter = false
        let hasForbidPair = false

        for (const char of word) {
            if ("aeiou".includes(char)) {
                vowelCount++
            }
        }
        for (let index = 0; index < word.length - 1; index++) {
            if (word[index] === word[index + 1]) {
                hasDoubleLetter = true
                break
            }

        }

        for (let index = 0; index < word.length - 1; index++) {
            const pair = word[index] + word[index + 1];

            if (forbidPair.includes(pair)) {
                hasForbidPair = true
                break
            }

        }
        if (vowelCount >= 3 && hasDoubleLetter && !hasForbidPair) {
            goodWord += 1

        }
    }
    return goodWord


}
