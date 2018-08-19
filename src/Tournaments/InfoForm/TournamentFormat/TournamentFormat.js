import React, { Component } from 'react';
import { connect } from 'react-redux'
import './TournamentFormat.css'

import { TournamentFormatAction } from '../../../Redux/Info/TournamentFormat'
import { IsBracketUpToDateAction } from '../../../Redux/Bracket/IsBracketUpToDate'

class TournamentFormat extends Component {
    UpdateFormat = (e) => {
        this.props.UpdateFormat(e.target.value)
        this.props.IsBracketUpToDate(false)        
    }

    render() {
        return (
            <div className='formatContainer'>
                <div className='formatName'>Format:</div>
                <select className='format'
                    value={this.props.tournamentFormat}
                    onChange={this.UpdateFormat}
                >
                    <option>Single Elimination</option>
                    <option>Round Robin</option>
                </select>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    tournamentFormat: state.tournamentFormat,
    isBracketUpToDate: state.isBracketUpToDate
})

const mapActionToProps = {
    UpdateFormat: TournamentFormatAction,
    IsBracketUpToDate: IsBracketUpToDateAction
}

export default connect(mapStateToProps, mapActionToProps)(TournamentFormat)