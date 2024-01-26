import React, { FC, ReactElement, useState } from "react";
import '../../assets/css/App.css';
import {calculate} from "../../helpers/CalculatePoints";

interface Props {
    name: string;
    number: number;
    strokeIndex: number;
    par: number;
    score: number;
    handicap: number
    updateScore: (holeNumber: number, score: number) => void;
}

export const Hole: FC<Props> = (props: Props): ReactElement => {
    const [selectedScore, setSelectedScore] = useState<number>(0);

    const handleScoreUpdate = (score: number): void => {
        setSelectedScore(score);
        props.updateScore(props.number, score);
    };

    const renderScoreButton = (value: number): ReactElement => (
        <button
            className="button is-small mr-3"
            style={{
                borderRadius: "50%",
                color: selectedScore === value ? "#ffffff" : "#49a282",
                backgroundColor: selectedScore === value ? "#595555" : "#ffffff",
                height: "3em", width: "3em"
            }}
            onClick={(): void => handleScoreUpdate(value)}>
            {value}
        </button>
    );

    return (
        <div className="column is-4 is-6-tablet is-4-desktop has-background">
            <div className="card" style={{ backgroundColor: "#49a282" }}>
                <div className="card-content">
                    <div className="tag" style={{position: "absolute", left: "3%", top: "6%", color: "#49a282"}}>{calculate(props.par, props.strokeIndex, props.handicap, selectedScore)}</div>
                    <h4 className="subtitle has-text-white has-text-centered mb-2" style={{fontSize: "1.55em"}}>
                        #{props.number} Par {props.par} (SI {props.strokeIndex})
                        <hr className="m-2 mb-4"/>
                    </h4>
                    <div className="column has-text-centered pt-0">
                        {Array.from({ length: 5 }, (_, index: number) => renderScoreButton(index + 1))}
                    </div>
                    <div className="column has has-text-centered pt-0 pb-0">
                        {Array.from({ length: 5 }, (_, index: number) => renderScoreButton(index + 6)
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
