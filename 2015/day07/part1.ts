export default function solve(input: string): string | number {
    const lines = input.trim().split('\n');
    const wires = new Map<string, string>();

    for (const line of lines) {
        const [expr, target] = line.split(' -> ');
        wires.set(target.trim(), expr.trim());
    }

    const cache = new Map<string, number>();

    function getValue(wire: string): number {
        if (/^\d+$/.test(wire)) return parseInt(wire);

        if (cache.has(wire)) return cache.get(wire)!;

        const expr = wires.get(wire)!;
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
                    throw new Error(`Unknown operation: ${op}`);
            }
        } else {
            throw new Error(`Invalid expression: ${expr}`);
        }

        cache.set(wire, result);
        return result;
    }

    return getValue('a');
}
