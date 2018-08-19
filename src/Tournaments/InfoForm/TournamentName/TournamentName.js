import React, { Component } from 'react';
import { connect } from 'react-redux'
import './TournamentName.css'

import { TournamentNameAction } from '../../../Redux/Info/TournamentName'

class TournamentName extends Component {
    updateName = (e) => {
        const name = e.target.value
        if (name.length < 80) {
            this.props.updateName(name)
        }
    }

    render() {
        return (
            <div className='nameContainer'>
                <div className='tournamentName'>Name:</div>
                <input className='nameInput' 
                    value={this.props.tournamentName} 
                    onChange={this.updateName}
                    placeholder='Tournament Name'
                />
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    tournamentName: state.tournamentName
})

const mapActionsToProps = {
    updateName: TournamentNameAction
}

export default connect(mapStateToProps, mapActionsToProps)(TournamentName)