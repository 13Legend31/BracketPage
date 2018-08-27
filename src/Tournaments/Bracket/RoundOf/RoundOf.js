import React from 'react';
import './RoundOf.css'

import TCard from './../TCard/TCard'

function RoundOf(props) {
    const { bestOf, round, TCardList, roundOfWrapperStyle, TCardWrapperStyle, shouldConnect, padding, header, UpdateScore } = props

    return (
        <div 
            className='roundOfWrapper'
            style={roundOfWrapperStyle}
        >
            <div className='roundOf'>{header}</div>
            <div className='roundOfBestOf'>Best of {bestOf}</div>
            <div 
                className='roundRobinTCardWrapper'
                style={TCardWrapperStyle}
            >
                {TCardList.map(( { team1, team2, team1Score, team2Score, winner, num }, index ) => 
                    <TCard
                        key={index}
                        position={index}
                        round={round}
                        team1={team1}
                        team2={team2}
                        team1Score={team1Score}
                        team2Score={team2Score}
                        bestOf={bestOf}
                        padding={padding}
                        UpdateScore={UpdateScore}
                        winner={winner}
                        num={num}
                        shouldConnect={shouldConnect}
                    />
                )}
            </div>
        </div>
    )
}

export default RoundOf