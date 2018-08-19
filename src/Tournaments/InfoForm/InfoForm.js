import React, { Component } from 'react'
import './InfoForm.css'

import TournamentFormat from './TournamentFormat/TournamentFormat'
import TournamentName from './TournamentName/TournamentName'
import Teams from './Teams/Teams'
import Buttons from './Buttons/Buttons'

class InfoForm extends Component {
    render() {
        return (
            <section className='infoForm'>
                <h1 className='easyBracket'>Easy Bracket</h1>
                <TournamentName/>
                <TournamentFormat/>
                <Teams/>
                <Buttons/>
            </section>
        );
    }
}

export default InfoForm