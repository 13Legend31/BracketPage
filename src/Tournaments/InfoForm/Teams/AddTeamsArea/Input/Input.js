import React, { PureComponent } from 'react'
import './Input.css'

class Input extends PureComponent {
    UpdateName = (e) => {
        const name = e.target.value
        if (name.length < 51) {
            this.props.UpdateTeamName(this.props.index, name)
        }
    }

    render() {
        const { index, value, ChangeFocus } = this.props
        return (
            <section className='teamNameChanger'>
                <div className='teamNum'>{index + 1}</div>
                <input
                    className='teamInput'
                    value={value}
                    onChange={this.UpdateName}
                    placeholder='Enter Team Name'
                    onFocus={() => ChangeFocus(index)}
                />
            </section>
        );
    }
}

export default Input