export default function solve(input: string): string | number {
    let x = 0, y = 0
    let homesVisited = new Set()
    // homesVisited.add("0,0")
    console.log(homesVisited);

    for (let dir of input) {
        if (dir === "^") { y += 1 }
        else if (dir === ">") { x += 1 }
        else if (dir === "v") {
            /* if (y > 0) */ y -= 1
        }
        else if (dir === "<") {
            /* if (x > 0) */ x -= 1
        }

        homesVisited.add(`${x}, ${y}`)
        // console.log(homesVisited.size);

    }

    return homesVisited.size


}
