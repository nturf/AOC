export default function solve(input: string): string | number {
    let val = 1
    for (let index = 0; index < input.length; index++) {
        const element = input[index];
        if (element === "(") {
            val++
        } else if (element === ")") {
            val--
        }
        if (val === -1) {
            return index
        }

    }
    return val

}

