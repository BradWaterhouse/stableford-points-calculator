export const calculate = (par: number, score: number): number => {
    const grossScore = score - par;

    if (score === 0 || isNaN(score)) {
        return 0;
    }

    const scoreMappings: Record<string, number> = {
        '2': 0,
        '1': 1,
        '0': 2,
        '-1': 3,
        '-2': 4,
        '-3': 5,
        '-4': 6,
    };

    return scoreMappings[grossScore.toString()] || 0;
};
