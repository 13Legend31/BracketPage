import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import './TheBracket.css'

import SingleElimination from './Formats/SingleElimination/SingleElimination'
import DoubleElimination from './Formats/DoubleElimination/DoubleElimination'
import RoundRobin from './Formats/RoundRobin/RoundRobin'
import Links from './Links/Links'

class TheBracket extends Component {
    constructor(props) {
        super(props)
        this.isMouseDown = false
        this.theBracket = null
        this.vectorX = null
        this.vectorY = null
        this.zoom = 100
    }

    MouseDown = (e) => {
        this.isMouseDown = true
        this.vectorX = e.clientX
        this.vectorY = e.clientY
    }

    Drag = (e) => {
        if (this.isMouseDown) {
            const scrollX = this.vectorX - e.clientX
            const scrollY = this.vectorY - e.clientY
            this.vectorX = e.clientX
            this.vectorY = e.clientY
            this.theBracket.scrollTop = this.theBracket.scrollTop + scrollY === 0 ? 0 : this.theBracket.scrollTop + scrollY
            this.theBracket.scrollLeft = this.theBracket.scrollLeft + scrollX === 0 ? 0 : this.theBracket.scrollLeft + scrollX
        }
    }

    MouseUp = (e) => {
        this.isMouseDown = false
    }

    componentDidMount = () => {
        this.theBracket = findDOMNode(this.refs['theBracket'])
    }

    ToInfo = () => {
        const path = this.props.history.location.pathname
        const info = path.replace('/Bracket', '/Info')
        this.props.history.push(info)
    }

    render() {
        const { tournamentName, tournamentFormat } = this.props
        return (
            <section 
                className='bracketSection'
            >
                <div className='bracketTournamentInfoWrapper'>
                    <div className='nameAndFormat'>
                        <h1 className='tournamentNameOnTopOfBracket'>{tournamentName}</h1>
                        <h2 className='tournamentFormatOnTopOfBracket'>{tournamentFormat}</h2>
                        <button 
                            onClick={this.ToInfo}
                            className='toInfo'
                        >
                            Go Back
                        </button>
                    </div>
                    <Links/>
                </div>
                <section 
                    className='theBracket'
                    ref='theBracket'
                    onMouseDown={this.MouseDown}
                    onMouseMove={this.Drag}
                    onMouseUp={this.MouseUp}
                    onMouseLeave={this.MouseUp}
                >
                    <h1 className='bracketTutorial'>Click On The Scores To Edit!</h1>
                    <div className='bracketTop'/>
                    <div className='bracketMid'>
                        <div className='bracketLeftSpace'/>
                        {tournamentFormat === 'Single Elimination' &&
                            <SingleElimination/>
                        }
                        {tournamentFormat === 'Double Elimination' &&
                            <DoubleElimination/>
                        }
                        {tournamentFormat === 'Round Robin' &&
                            <RoundRobin/>
                        }
                        <div className='bracketRightSpace'/>
                    </div>
                    <div className='bracketBottom'/>
                </section>
            </section>
        );
    }
}

const mapStateToProps = ({ tournamentName, tournamentFormat }) => ({
    tournamentName: tournamentName,
    tournamentFormat:tournamentFormat
})

export default withRouter(connect(mapStateToProps)(TheBracket))