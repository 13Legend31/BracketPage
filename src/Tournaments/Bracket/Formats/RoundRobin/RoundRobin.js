import React, { Component } from 'react'
import { connect } from 'react-redux'
import './RoundRobin.css'

import { IsBracketUpToDateAction } from '../../../../Redux/Bracket/IsBracketUpToDate'
import { RoundRobinDataAction } from '../../../../Redux/Bracket/RoundRobin/RoundRobinData'
import { RoundRobinScoreBoardAction } from '../../../../Redux/Bracket/RoundRobin/RoundRobinScoreBoard'
import RoundRobinFormatter from '../../../../Algorithms/RoundRobin/RoundRobinFormatter'
import MakeScoreBoard from '../../../../Algorithms/RoundRobin/MakeScoreBoard'
import RoundOf from './RoundOf/RoundOf'
import Sections from './Sections/Sections'
import ScoreBoard from './ScoreBoard/ScoreBoard'

class RoundRobin extends Component {
    state = {
        showScoreBoard:true
    }

    componentDidMount = () => {
        const { isBracketUpToDate, teams, bestOfRoundRobin, IsBracketUpToDate, UpdateData, UpdateScoreBoard } = this.props
        if (!isBracketUpToDate) {
            RoundRobinFormatter(teams, bestOfRoundRobin)
            .then(data => {
                IsBracketUpToDate(true)
                UpdateData(data)
                const scoreBoard = MakeScoreBoard(teams)
                UpdateScoreBoard(scoreBoard)
            })
            .catch(() => alert(`Sorry! Couldn't format round robin, please try again`))
        }
    }

    ModifyScoreBoardRow = (winner, loser, wasThereAWinner) => {
        const roundRobinScoreBoard = {...this.props.roundRobinScoreBoard}
        const winnerRow = {...roundRobinScoreBoard[winner]}
        const loserRow = {...roundRobinScoreBoard[loser]}

        if (wasThereAWinner) {
            winnerRow.win++
            loserRow.loss++
        } else {
            winnerRow.win--
            loserRow.loss--
        }
        roundRobinScoreBoard[winner] = winnerRow
        roundRobinScoreBoard[loser] = loserRow
        this.props.UpdateScoreBoard(roundRobinScoreBoard)
    }

    // DO NOT MODIFY SCORE WITH THIS FUNCTION
    // SCORE CAN EQUAL ''
    UpdateScore = (round, position, whichTeamScore, score, bestOf) => {
        const { UpdateData, roundRobinData } = this.props 

        const data = [...roundRobinData]
        const TCard = data[round - 1].TCardList[position] // {team1, team2, team1Score, team2Score, winner}
        const modifyThisTeam = whichTeamScore.replace(/Score/,'') // team1 or team2
        const otherTeam = modifyThisTeam === 'team1' ? 'team2' : 'team1'

        const winner = TCard[modifyThisTeam]
        const loser = TCard[otherTeam]
        // assign a winner
        if (TCard.winner === '' && score === bestOf) { // there cannot be a current winner if this triggers
            TCard.winner = winner
            this.ModifyScoreBoardRow(winner, loser, true)
        } 
        // remove a winner
        else if (TCard.winner === TCard[modifyThisTeam] && score !== bestOf) {
            TCard.winner = ''
            this.ModifyScoreBoardRow(winner, loser, false)
        }
        TCard[whichTeamScore] = score
        UpdateData(data)
    }

    ToggleScoreBoard = () => {
        const { showScoreBoard } = this.state
        this.setState({showScoreBoard: !showScoreBoard})
    }

    render() {
        const data = this.props.roundRobinData

        let roundOfs = data.map(( { TCardList ,bestOf }, index ) =>
            <RoundOf
                key={index}
                round={index + 1}
                TCardList={TCardList}
                bestOf={bestOf}
                UpdateScore={this.UpdateScore}
                shouldConnect={false}
            />
        )

        const { showScoreBoard } = this.state
        return (
            <section className='roundRobin'>
                <div className='scoreBoardWrapper'>
                    <button 
                        className='toggleScoreBoard'
                        onClick={this.ToggleScoreBoard}
                        style={showScoreBoard ? { borderTop:'50px solid blue'} : { borderBottom:'50px solid blue', marginBottom:'30px' }}
                    />
                    {showScoreBoard &&
                        <h1 className='scoreBoardName'>Scoreboard</h1>
                    }
                </div>
                {this.state.showScoreBoard && 
                    <ScoreBoard/>
                }
                {data.length < 20 &&
                    roundOfs
                }
                {data.length >= 20 &&
                    <Sections
                        UpdateScore={this.UpdateScore}
                        end={data.length - 1}
                    />
                }
            </section>
        );
    }
}

const mapStateToProps = ({ teams, roundRobinData, bestOfRoundRobin, roundRobinScoreBoard, isBracketUpToDate }) => ({
    teams: teams.teamsList,
    roundRobinData: roundRobinData,
    bestOfRoundRobin: bestOfRoundRobin,
    roundRobinScoreBoard: roundRobinScoreBoard,
    isBracketUpToDate: isBracketUpToDate
})

const mapActionsToProps = {
    IsBracketUpToDate: IsBracketUpToDateAction,
    UpdateData: RoundRobinDataAction,
    UpdateScoreBoard: RoundRobinScoreBoardAction 
}

export default connect(mapStateToProps, mapActionsToProps)(RoundRobin)