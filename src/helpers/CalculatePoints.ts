export const calculate = (par: number, si: number, handicap: number, score: number): number => {
    if (score === 0 || isNaN(score)) {
        return 0;
    }

    const grossScore = (score - par) - calculateShotsBasedOnHandicap(handicap, si);

    const scoreMappings: Record<string, number> = {
        '2': 0,
        '1': 1,
        '0': 2,
        '-1': 3,
        '-2': 4,
        '-3': 5,
        '-4': 5,
        '-5': 5,
        '-6': 5,
    };

    return scoreMappings[grossScore.toString()] || 0;
};

const calculateShotsBasedOnHandicap = (handicap: number, si: number): number => {
    let shots: number = 0;

    if (handicap >= 18) {
        shots += 1;
        handicap -= 18;
    }

    if (handicap >= 0 && si <= handicap) {
        shots += 1;
    }

    return shots;
};

