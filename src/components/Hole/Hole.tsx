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
        <div className="card" style={{backgroundColor: "#49a282"}}>
            <div className="card-content">
                <h2 className="subtitle has-text-white">Hole {props.number}</h2>
                <div className="columns is-multiline is-mobile">
                    <div className="column is-4">
                        <label className="has-text-white">Par</label>
                        <input className="input is-small" type="number" value={props.par} readOnly={true} />
                    </div>
                    <div className="column is-4">
                        <label className="has-text-white">SI</label>
                        <input className="input is-small" type="number" value={props.strokeIndex} readOnly={true} />
                    </div>
                    <div className="column is-4">
                        <label className="has-text-white">Score</label>
                        <input className="input is-small" type="number" value={props.score} onChange={handleScoreUpdate} />
                    </div>
                </div>
            </div>
        </div>
        </div>
    );
}
