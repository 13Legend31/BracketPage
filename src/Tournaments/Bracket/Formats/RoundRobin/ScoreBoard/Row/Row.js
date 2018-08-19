import React, { PureComponent } from 'react'
import './Row.css'

class Row extends PureComponent {
    render() {
        const { name, win, loss } = this.props 
        return (
            <section className='scoreBoardRow'>
                <div className='rowTeamName'>{name}:</div>
                <span className='rowWin'>{win}</span>
                <span className='rowLoss'>{loss}</span>

            </section>
        );
    }
}

export default Row