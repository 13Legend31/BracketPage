import React, { Component } from 'react'
import { connect } from 'react-redux'
import './Sections.css'

import RoundOf from '../RoundOf/RoundOf'

class Sections extends Component {
    state = { 
        index: 0
    }

    ChangeRound = (index) => {
        const { end } = this.props
        if (index > end) {
            index = 0
        } else if (index < 0) {
            index = end
        }
        this.setState({index:index})
    }

    render() {
        const { UpdateScore } = this.props
        const { bestOf, TCardList } = this.props.roundRobinData[this.state.index]
        return (
        <section className='roundRobinSections'>
            <button 
                className='roundRobinGoLeft'
                onClick={() => this.ChangeRound(this.state.index - 1)}
            />
            <RoundOf
                round={this.state.index + 1}
                TCardList={TCardList}
                bestOf={bestOf}
                UpdateScore={UpdateScore}
                shouldConnect={false}
            />
            <button
                className='roundRobinGoRight'
                onClick={() => this.ChangeRound(this.state.index + 1)}
            />
        </section>
        );
    }
}

const mapStateToProps = ({ roundRobinData }) => ({
    roundRobinData: roundRobinData
})

export default connect(mapStateToProps)(Sections)