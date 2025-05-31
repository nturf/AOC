export default function solve(input: string): string | number {
    const originalLines = input.trim().split('\n');
    const originalMap = new Map<string, string>();

    for (const line of originalLines) {
        const [expr, target] = line.split(' -> ');
        originalMap.set(target.trim(), expr.trim());
    }

    const valueOfA = evaluate('a', new Map(originalMap));

    const overriddenMap = new Map(originalMap);
    overriddenMap.set('b', valueOfA.toString());

    return evaluate('a', overriddenMap);
}

function evaluate(wire: string, wires: Map<string, string>): number {
    const cache = new Map<string, number>();

    function getValue(w: string): number {
        if (/^\d+$/.test(w)) return parseInt(w);
        if (cache.has(w)) return cache.get(w)!;

        const expr = wires.get(w);
        if (!expr) throw new Error(`No expression for wire '${w}'`);

        const tokens = expr.split(' ');

        let result: number;

        if (tokens.length === 1) {
            result = getValue(tokens[0]);
        } else if (tokens.length === 2) {
            const [, a] = tokens;
            result = ~getValue(a) & 0xffff;
        } else if (tokens.length === 3) {
            const [a, op, b] = tokens;
            const valA = getValue(a);
            const valB = getValue(b);

            switch (op) {
                case 'AND':
                    result = valA & valB;
                    break;
                case 'OR':
                    result = valA | valB;
                    break;
                case 'LSHIFT':
                    result = (valA << valB) & 0xffff;
                    break;
                case 'RSHIFT':
                    result = valA >> valB;
                    break;
                default:
                    throw new Error(`Unknown operator: ${op}`);
            }
        } else {
            throw new Error(`Invalid expression for wire '${w}': ${expr}`);
        }

        cache.set(w, result);
        return result;
    }

    return getValue(wire);
}
