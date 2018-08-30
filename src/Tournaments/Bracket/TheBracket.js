import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import './TheBracket.css'

import SingleElimination from './Formats/SingleElimination/SingleElimination'
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
        if (e.clientX >= 0 && e.clientY >= 0) {
            this.vectorX = e.clientX
            this.vectorY = e.clientY
        } else if (e.touches) {
            this.vectorX = e.touches[0].clientX
            this.vectorY = e.touches[0].clientY
        }
    }

    Drag = (e) => {
        e.preventDefault()
        if (this.isMouseDown) {
            let scrollX, scrollY
            if (e.clientX && e.clientY) {
                scrollX = this.vectorX - e.clientX
                scrollY = this.vectorY - e.clientY
                this.vectorX = e.clientX
                this.vectorY = e.clientY
            } else if (e.touches) {
                scrollX = this.vectorX - e.touches[0].clientX
                scrollY = this.vectorY - e.touches[0].clientY
                this.vectorX = e.touches[0].clientX
                this.vectorY = e.touches[0].clientY
            }
            this.theBracket.scrollTop += scrollY ? scrollY : 0
            this.theBracket.scrollLeft += scrollX ? scrollX : 0
        }
    }

    MouseUp = () => {
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
                    onTouchStart={this.MouseDown}
                    onTouchMove={this.Drag}
                    onTouchEnd={this.MouseUp}
                >
                    <h1 className='bracketTutorial'>Click On The Scores To Edit!</h1>
                    <div className='bracketTop'/>
                    <div className='bracketMid'>
                        <div className='bracketLeftSpace'/>
                        {tournamentFormat === 'Single Elimination' &&
                            <SingleElimination/>
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