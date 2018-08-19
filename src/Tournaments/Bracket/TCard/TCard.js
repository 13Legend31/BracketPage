import React, { PureComponent } from 'react'
import { findDOMNode } from 'react-dom'
import './TCard.css'

const glowOrange = {
    background:'orange'
}

const numConnected = {
    width:'295px',
    left:'32px'
}

const numUnconnected = {
    width:'215px',
    left:'32px'
}

const noNum = {
    width:'215px'
}

class TCard extends PureComponent {
    constructor(props) {
        super(props)
        this.placeholder = ''
    }
    // this function only modifies score
    ValidateScore = (score, whichTeamScore, team1, team2, winner) => {
        const isScoreNumOrBlank = (score === '' || (typeof parseInt(score, 10) === 'number' && !isNaN(parseInt(score,10))))
        if (team1 !== '' && team2 !== '' && isScoreNumOrBlank) {
            if (score !== '') {
                score = parseInt(score,10)
            }
            const { round, position, bestOf } = this.props
            const currentTeam = whichTeamScore.replace(/Score/,'') === 'team1' ? team1 : team2

            if (score >= bestOf && winner !== '' && winner !== currentTeam) { // winner exists, score is greater than bestOf, and winner is not the current team
                score = bestOf - 1
            } else if (score >= bestOf && winner === currentTeam) {
                score = bestOf
            } else if (score >= bestOf && winner === '') { // no winner and score is greater than bestOf
                score = bestOf
            }
            this.placeholder = score
            this.props.UpdateScore(round, position, whichTeamScore, score, bestOf)
        }
    }

    onFocus = (input) => {
        const node = findDOMNode(this.refs[input])
        this.placeholder = node.value
        node.value = ''
    }

    onBlur = (input, whichTeamScore, team1, team2, winner) => {
        const node = findDOMNode(this.refs[input])
        if (this.placeholder === '') {
            this.ValidateScore(0, whichTeamScore, team1, team2, winner)
        } else {
            node.value = this.placeholder
            this.placeholder = ''
        }
    }

    render() {
        const { team1, team2, team1Score, team2Score, winner, bestOf, round, position, num, padding, shouldConnect } = this.props
        let horizontalStyle
        if (num && shouldConnect) {
            horizontalStyle = numConnected
        } else if (num && !shouldConnect) {
            horizontalStyle = numUnconnected
        } else {
            horizontalStyle = noNum
        }

        return (
            <section
                className='tCardWrapper'
                style={
                    {
                        paddingTop: `${padding}px`,
                        paddingBottom: `${padding}px`
                    }
                }
            >
            {num &&
                <div className='tCardNumber'>{num}</div>
            }
                <section className='tCard'>
                    <div className='teamWrapper'>
                        <div className='tCardTeam'>{team1}</div>
                        <input 
                            className='tCardScore'
                            value={team1Score}
                            onChange={(e) => this.ValidateScore(e.target.value, 'team1Score', team1, team2, winner)}
                            ref={`tCard-${round}:${position}-team1Score`}
                            onFocus = {() => this.onFocus(`tCard-${round}:${position}-team1Score`)}
                            onBlur = {() => this.onBlur(`tCard-${round}:${position}-team1Score`, 'team1Score', team1, team2, winner)}
                            style={team1Score >= bestOf ? glowOrange : null}
                        />
                    </div>
                    <div className='teamWrapper'>
                        <div className='tCardTeam'>{team2}</div>
                        <input 
                            className='tCardScore'
                            value={team2Score}
                            onChange={(e) => this.ValidateScore(e.target.value, 'team2Score', team1, team2, winner)}
                            ref={`tCard-${round}:${position}-team2Score`}
                            onFocus = {() => this.onFocus(`tCard-${round}:${position}-team2Score`)}
                            onBlur = {() => this.onBlur(`tCard-${round}:${position}-team2Score`, 'team2Score', team1, team2, winner)}
                            style={team2Score >= bestOf ? glowOrange : null}
                        />
                    </div>
                </section>
                <div className='horizontalConnection'
                    style={horizontalStyle}
                />
                {shouldConnect &&
                    <div className='verticalConnection'
                        style = {
                            position%2 === 0 ? { bottom:'0%'} : { top:'0%' }
                        }
                    />
                }
            </section>
        );
    }
}

export default TCard;