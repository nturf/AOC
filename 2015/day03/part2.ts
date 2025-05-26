export default function solve(input: string): string | number {
    let santaX = 0, santaY = 0
    let roboX = 0, roboY = 0
    let uniqueHouse = new Set()
    uniqueHouse.add("0,0")

    function outDir(x: number, y: number, dir: string): [number, number] {
        if (dir === "^") y += 1
        else if (dir === ">") x += 1
        else if (dir === "v") y -= 1
        else if (dir === "<") x -= 1

        return [x, y]
    }

    for (let index = 0; index < input.length; index++) {
        const dir = input[index];
        if (index % 2 === 0) {
            [santaX, santaY] = outDir(santaX, santaY, dir)
            uniqueHouse.add(`${santaX}, ${santaY}`)
        } else {
            [roboX, roboY] = outDir(roboX, roboY, dir)
            uniqueHouse.add(`${roboX}, ${roboY}`)
        }

    }
    return uniqueHouse.size



}
