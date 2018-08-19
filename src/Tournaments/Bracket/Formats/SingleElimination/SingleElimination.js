import React, { Component } from 'react'
import { connect } from 'react-redux'
import './SingleElimination.css'

import { IsBracketUpToDateAction } from '../../../../Redux/Bracket/IsBracketUpToDate'
import { SingleEliminationDataAction } from '../../../../Redux/Bracket/Single/SingleEliminationData'
import SingleElimFormatter from '../../../../Algorithms/Single/SingleElimFormatter'
import WinnerRemover from '../../../../Algorithms/Single/WinnerRemover'
import RoundOf from './RoundOf/RoundOf'

class SingleElimination extends Component {
    componentDidMount = () => {
        const { isBracketUpToDate, teams, bestOfSingle, IsBracketUpToDate, UpdateData } = this.props
        if (!isBracketUpToDate) {
            SingleElimFormatter(teams, bestOfSingle)
            .then((data) => {
                IsBracketUpToDate(true)
                UpdateData(data)
            })
            .catch(() => alert('Sorry! Something went wrong, please try again'))
        }
    }

    AdvanceWinner = (round, position, data, winner) => {
        const TCard = data[round - 1].TCardList[position]
        TCard.winner = TCard[winner]
        const nextPosition = Math.floor(position/2)
        const team = position%2 === 0 ? 'team1' : 'team2'
        if (round < data.length) {
            data[round].TCardList[nextPosition][team] = TCard.winner
        }
    }

    RemoveWinner = (round, position, data, whichTeamScore, score) => {
        const TCard = data[round - 1].TCardList[position]
        TCard.winner = ''
        TCard[whichTeamScore] = score
        WinnerRemover(round, position, data)
    }

    // DO NOT MODIFY SCORE WITH THIS FUNCTION
    // SCORE CAN EQUAL ''
    UpdateScore = (round, position, whichTeamScore, score, bestOf) => {
        const data = [...this.props.singleEliminationData]
        const TCard = data[round - 1].TCardList[position]
        const modifyThisTeam = whichTeamScore.replace(/Score/,'') // team1 or team2

        // there is a new winner (there cannot be a current winner)
        if (TCard.winner === '' && score === bestOf) {
            this.AdvanceWinner(round, position, data, modifyThisTeam)
        } 
        // there was a winner, now there isn't (there must be a current winner)
        else if (TCard.winner === TCard[modifyThisTeam] && score !== bestOf) {
            this.RemoveWinner(round, position, data, whichTeamScore, score)
        }
        TCard[whichTeamScore] = score
        this.props.UpdateData(data)
    }

    render() {
        const data = this.props.singleEliminationData
        const teams = data.map(({TCardList}) => TCardList)
        return (
            <section className='singleElimination'>
                {data.map(( { bestOf }, index ) =>
                    <RoundOf
                        key={index}
                        round={index + 1}
                        maxRounds={data.length}
                        TCardList={teams[index]}
                        bestOf={bestOf}
                        UpdateScore={this.UpdateScore}
                        shouldConnect={index !== data.length - 1}
                    />
                )}
            </section>
        )
    }
}

const mapStateToProps = ({ singleEliminationData, bestOfSingle, isBracketUpToDate, teams }) => ({
    teams: teams.teamsList,
    singleEliminationData: singleEliminationData,
    bestOfSingle: bestOfSingle,
    isBracketUpToDate: isBracketUpToDate
})

const mapActionsToProps = {
    IsBracketUpToDate: IsBracketUpToDateAction,
    UpdateData: SingleEliminationDataAction
}

export default connect(mapStateToProps, mapActionsToProps)(SingleElimination)