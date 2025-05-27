import { createHash, } from "crypto";
export default function solve(input: string): string | number {
    const secretKey = input
    let number = 1

    while (true) {
        const hashInput = input + number.toString()

        const hash = createHash("md5").update(hashInput).digest("hex")

        if (hash.startsWith("00000")) {
            break
        }
        number++

    }
    return number


}
