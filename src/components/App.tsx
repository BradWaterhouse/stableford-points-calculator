import React, {ChangeEvent, useCallback, useMemo, useState} from 'react';
import '../assets/css/App.css';
import {Hole} from "./Hole/Hole";
import bullwellForest from "../courses/bullwellForest.json";
import ramsdale from "../courses/ramsdale.json";
import rufford from "../courses/rufford.json";
import ramsdaleParThree from "../courses/ramsdaleParThree.json";
import {calculate} from "../helpers/CalculatePoints";

interface ScoresState {
    [key: number]: number;
}

interface Course {
    [key: string]: {si: number, par: number}
}

const courses: Record<string, Course> = {
    "Bullwell Forest": bullwellForest,
    "Ramsdale": ramsdale,
    "Rufford": rufford,
    "Ramsdale Par Three": ramsdaleParThree
};

function App() {
    const [selectedCourse, setSelectedCourse] = useState<string>("none");
    const [handicap, setHandicap] = useState<number>(-1);
    const [scores, setScores] = useState<ScoresState>({
        1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0, 10: 0, 11: 0, 12: 0, 13: 0, 14: 0, 15: 0, 16: 0, 17: 0, 18: 0
    });

    const typedCourse: Course | undefined = useMemo(() => courses[selectedCourse], [selectedCourse]);

    const handleUpdateSelectedCourse = (event: ChangeEvent<HTMLSelectElement>): void => setSelectedCourse(event.target.value);


    const updateScore = (holeNumber: number, score: number): void => {
        const newScores = {...scores};

        if (newScores.hasOwnProperty(holeNumber)) {
            newScores[holeNumber] = score;
            setScores(newScores);
        }
    };

    const handleUpdateHandicap = (event: ChangeEvent<HTMLInputElement>): void =>
        setHandicap(isNaN(parseInt(event.target.value)) ? -1 : parseInt(event.target.value));

    const calculateScores = (): number => {
        let total = 0;
        Object.entries(scores).map((score: ScoresState) => {
            const hole = score[0];
            const grossScore = score[1];

            total += calculate(typedCourse[hole].par, typedCourse[hole].si, handicap, grossScore)
        });

        return total;
    };

    return (
        <div className="App">
            <div className="header">
                <section className="hero" style={{backgroundColor: "#49a282"}}>
                    <div className="hero-body">
                        <p className="title has-text-white">Stableford Handicap Calculator</p>
                        <p className="subtitle has-text-white">Nottinghamshire Courses.</p>
                    </div>
                </section>
            </div>

            <div className="content pb-6">
                <div className="courses has-text-centered">

                    <div className="select is-rounded mt-2">
                        <select onChange={handleUpdateSelectedCourse} defaultValue={"none"} value={selectedCourse}>
                            <option value="none">Not selected</option>
                            <option value="Bullwell Forest">Bullwell Forest</option>
                            <option value="Ramsdale">Ramsdale (Steely)</option>
                            <option value="Ramsdale Par Three">Ramsdale (Lee)</option>
                            <option value="Rufford">Rufford</option>
                        </select>
                    </div>
                </div>

                {selectedCourse !== "none" ? (

                    <div className="course">

                        <hr />

                        <div className="columns is-multiline is-centered">
                            {Object.keys(scores).map((holeNumber: string) =>
                                <Hole name={"Hole " + holeNumber}
                                      number={parseInt(holeNumber)}
                                      strokeIndex={typedCourse[holeNumber].si}
                                      par={typedCourse[holeNumber].par}
                                      score={scores[parseInt(holeNumber)]}
                                      updateScore={updateScore}
                                />
                            )}
                        </div>
                    </div>) : <h3 className="has-text-centered">Please Select a Course...</h3>}

                <div className="handicap">

                </div>

            </div>

            <div className="save-area">
                <input className="input is-small" placeholder="Handicap" type="tel" style={{width: "31vw"}} value={handicap === -1 ? "" : handicap} onChange={handleUpdateHandicap} max={36}/>
                <div className="is-pulled-right">
                <div className="tag is-info mr-2" style={{fontSize: "1em"}}>Net Score: {Object.values(scores).reduce((acc: number, score: number) => acc + score, 0)}</div>
                <div className="tag is-success" style={{fontSize: "1em"}}>Points: {selectedCourse !== "none" ? calculateScores() : 0}</div>
                </div>
            </div>

        </div>
    );
}

export default App;
