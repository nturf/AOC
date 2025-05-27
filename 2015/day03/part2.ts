export default function solve(input: string): string | number {
    let santaX = 0
    let santaY = 0
    let roboX = 0
    let roboY = 0
    let houseVisited = new Set()
    houseVisited.add("0,0")

    function sepDir(x: number, y: number, dir: string): [number, number] {

        if (dir === "^") y += 1
        else if (dir === ">") x += 1
        else if (dir === "v") y -= 1
        else if (dir === "<") x -= 1

        return [x, y]
    }

    for (let index = 0; index < input.length; index++) {
        let dir = input[index]

        if (index % 2 === 0) {
            [santaX, santaY] = sepDir(santaX, santaY, dir)
            houseVisited.add(`${santaX},${santaY}`)
        } else {
            [roboX, roboY] = sepDir(roboX, roboY, dir)
            houseVisited.add(`${roboX},${roboY}`)
        }

    }
    return houseVisited.size
}
