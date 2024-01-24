import React, { FC, ReactElement, useState } from "react";
import '../../assets/css/App.css';

interface Props {
    name: string;
    number: number;
    strokeIndex: number;
    par: number;
    score: number;
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
            className={`button is-small mr-3 ${selectedScore === value ? "has-background-grey-light" : "has-background-white"}`}
            style={{ borderRadius: "15%", color: "#49a282" }}
            onClick={(): void => handleScoreUpdate(value)}>
            {value}
        </button>
    );

    return (
        <div className="column is-3 has-background">
            <div className="card" style={{ backgroundColor: "#49a282" }}>
                <div className="card-content">
                    <h4 className="subtitle has-text-white mb-2">
                        #{props.number} Par {props.par} (SI {props.strokeIndex})
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
