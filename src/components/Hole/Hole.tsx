import React, {ChangeEvent, FC, ReactElement} from "react";

interface Props {
    name: string;
    number: number;
    strokeIndex: number;
    par: number;
    score: number;
    updateScore: (holeNumber: number, score: number) => void;
}

export const Hole: FC<Props> = (props: Props): ReactElement => {

    const handleScoreUpdate = (event: ChangeEvent<HTMLInputElement>) => props.updateScore(props.number, event.target.valueAsNumber);


    return (
        <div className="column is-3">
        <div className="card" style={{backgroundColor: "#dcdcdc"}}>
            <div className="card-content">
                <h2 className="subtitle">Hole {props.number}</h2>
                <div className="columns is-multiline is-mobile">
                    <div className="column is-4">
                        <label>Par</label>
                        <input className="input is-small" type="number" value={props.par} readOnly={true} />
                    </div>
                    <div className="column is-4">
                        <label>SI</label>
                        <input className="input is-small" type="number" value={props.strokeIndex} readOnly={true} />
                    </div>
                    <div className="column is-4">
                        <label>Score</label>
                        <input className="input is-small" type="number" value={props.score} onChange={handleScoreUpdate} />
                    </div>
                </div>
            </div>
        </div>
        </div>
    );
}
