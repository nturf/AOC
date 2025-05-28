export default function solve(input: string): number {
    const grid: boolean[][] = Array.from({ length: 1000 }, () =>
        Array(1000).fill(false)
    );

    const lines = input.trim().split("\n");

    for (const line of lines) {
        let command: "on" | "off" | "toggle";
        let startX: number, startY: number, endX: number, endY: number;

        if (line.startsWith("turn on")) {
            command = "on";
            [[startX, startY], [endX, endY]] = coordinates(line.replace("turn on ", ""));
        } else if (line.startsWith("turn off")) {
            command = "off";
            [[startX, startY], [endX, endY]] = coordinates(line.replace("turn off ", ""));
        } else {
            command = "toggle";
            [[startX, startY], [endX, endY]] = coordinates(line.replace("toggle ", ""));
        }

        for (let y = startY; y <= endY; y++) {
            for (let x = startX; x <= endX; x++) {
                if (command === "on") grid[y][x] = true;
                else if (command === "off") grid[y][x] = false;
                else grid[y][x] = !grid[y][x];
            }
        }
    }

    let count = 0;
    for (const row of grid) {
        for (const cell of row) {
            if (cell) count++;
        }
    }

    return count;

    function coordinates(text: string): [[number, number], [number, number]] {
        const [start, end] = text.split(" through ");
        const [startX, startY] = start.split(",").map(Number);
        const [endX, endY] = end.split(",").map(Number);
        return [
            [startX, startY],
            [endX, endY],
        ];
    }
}

