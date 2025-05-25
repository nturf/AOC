export default function solve(input: string): string | number {
    let val = 0
    for (let index = 0; index < input.length; index++) {
        const element = input[index];
        if (element === "(") {
            val++
        } else if (element === ")") {
            val--
        }
        if (val === -1) {
            return index + 1
        }

    }
    return -1

}

