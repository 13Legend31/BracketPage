import React, { Component } from 'react'
import { connect } from 'react-redux'
import './SingleElimination.css'

import { IsBracketUpToDateAction } from '../../../../Redux/Bracket/IsBracketUpToDate'
import { SingleEliminationDataAction } from '../../../../Redux/Bracket/Single/SingleEliminationData'
import SingleElimFormatter from '../../../../Algorithms/Single/SingleElimFormatter'
import WinnerRemover from '../../../../Algorithms/Single/WinnerRemover'
/* import RoundOf from './RoundOf/RoundOf' */
import RoundOf from '../../RoundOf/RoundOf'

const TCardWrapperStyle = {
    display:'flex',
    flexDirection:'column'
}

const roundOfWrapperStyle = {
    paddingTop:'80px',
    display:'flex',
    flexDirection:'column',
    userSelect:'none'
}

class SingleElimination extends Component {
    componentDidMount = () => {
        const { isBracketUpToDate, teams, bestOfSingle, IsBracketUpToDate, UpdateData } = this.props
        if (!isBracketUpToDate) {
            const singleElimData = SingleElimFormatter(teams, bestOfSingle)
            IsBracketUpToDate(true)
            UpdateData(singleElimData)
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
                {data.map(( { bestOf }, index ) => {
                    let header = `Round ${index + 1}`
                    const round = index + 1
                    if (round === data.length) {
                        header = `Grand Finals`
                    } else if (round === data.length - 1) {
                        header = 'Semi Finals'
                    } else if (round === data.length - 2) {
                        header = 'Quarter Finals'
                    }

                    return (
                        <RoundOf
                            key={index}
                            round={round}
                            maxRounds={data.length}
                            TCardList={teams[index]}
                            header={header}
                            bestOf={bestOf}
                            padding={70 * Math.pow(2, index - 1) - 25}
                            TCardWrapperStyle={TCardWrapperStyle}
                            roundOfWrapperStyle={roundOfWrapperStyle}
                            UpdateScore={this.UpdateScore}
                            shouldConnect={index !== data.length - 1}
                        />
                    )
                })}
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