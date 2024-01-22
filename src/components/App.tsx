import React, {ChangeEvent, useState} from 'react';
import '../assets/css/App.css';
import {Hole} from "./Hole/Hole";
import bullwellForest from "../courses/bullwellForest.json";
import ramsdale from "../courses/ramsdale.json";

interface ScoresState {
    [key: number]: number;
}

interface Course {
    [key: string]: {si: number, par: number}
}

const courses: Record<string, Course> = {
    bullwellForest,
    ramsdale
}

function App() {
    const [selectedCourse, setSelectedCourse] = useState<string>("none")
    const [handicap, setHandicap] = useState<number>(36);
    const [scores, setScores] = useState<ScoresState>({
        1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0, 10: 0, 11: 0, 12: 0, 13: 0, 14: 0, 15: 0, 16: 0, 17: 0, 18: 0
    });

    const typedCourse: Course | undefined = courses[selectedCourse];

    const handleUpdateSelectedCourse = (event: ChangeEvent<HTMLSelectElement>): void => setSelectedCourse(event.target.value)


    const updateScore = (holeNumber: number, score: number): void => {
       const newScores = {...scores};

       if (newScores.hasOwnProperty(holeNumber)) {
           newScores[holeNumber] = score
           setScores(newScores);
       }
    }

    const handleUpdateHandicap = (event: ChangeEvent<HTMLInputElement>): void => setHandicap(event.target.valueAsNumber);

    return (
    <div className="App">
      <div className="header">
        <section className="hero is-link">
          <div className="hero-body">
            <p className="title">Stableford Handicap Calculator</p>
            <p className="subtitle">Nottinghamshire Courses.</p>
          </div>
        </section>
      </div>

      <div className="content pb-6">
        <div className="courses has-text-centered">
          <h1 className="title">Select Course</h1>

          <div className="select mt-2">
            <select onChange={handleUpdateSelectedCourse} defaultValue={"none"} value={selectedCourse}>
                <option value="none">Not selected</option>
                <option value="bullwellForest">Bullwell Forest</option>
                <option value="ramsdale">Ramsdale</option>
            </select>
          </div>
        </div>

          {selectedCourse !== "none" ? (

        <div className="course">
          <h1 className="title has-text-centered mt-5">Bullwell Forest</h1>

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
            <input className="input is-small" placeholder="Handicap" type="number" style={{width: "37vw"}} onChange={handleUpdateHandicap}/>
            <div className="tag is-info">Net Score: {Object.values(scores).reduce((acc: number, score: number) => acc + score, 0)}</div>
            <div className="tag is-success">Points: 0</div>
        </div>

    </div>
  );
};

export default App;
