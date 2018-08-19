import React from 'react';
import './RoundOf.css'

import TCard from '../../../TCard/TCard'

function RoundOf(props) {
    const { bestOf, round, TCardList, UpdateScore } = props

    return <div className='roundOfWrapperRobin'>
        <div className='roundOfRobin'>{`Round ${round}`}</div>
        <div className='bestOfRobin'>Best of {bestOf}</div>
        <div className='roundRobinTCardWrapper'>
            {TCardList.map(( { team1, team2, team1Score, team2Score, winner }, index ) => 
                <TCard
                    key={index}
                    position={index}
                    round={round}
                    team1={team1}
                    team2={team2}
                    team1Score={team1Score}
                    team2Score={team2Score}
                    bestOf={bestOf}
                    padding={10}
                    UpdateScore={UpdateScore}
                    winner={winner}
                    shouldConnect={false}
                />
            )}
        </div>
    </div>
}

export default RoundOf