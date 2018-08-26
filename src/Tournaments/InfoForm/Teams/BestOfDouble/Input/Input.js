import React, { PureComponent } from 'react'
import { findDOMNode } from 'react-dom'
import './Input.css'

class Input extends PureComponent {
    onFocus = (input) => {
        findDOMNode(this.refs[input]).value = ''
    }

    onBlur = (input, index) => {
        const { bestOf, whichBracket } = this.props
        findDOMNode(this.refs[input]).value = bestOf[whichBracket][index]
        if (bestOf[whichBracket][index] === '') {
            this.props.Modify(1, index, whichBracket)
        }
    }

    render() {
        const { index, value, whichBracket, Modify } = this.props
        return (
            <input
                className='bestOfSingleInput'
                value={value}
                onChange={(e) => Modify(e.target.value, index, whichBracket)}
                ref={`bestOfSingleInput${index}`}
                onFocus={() => this.onFocus(`bestOfSingleInput${index}`)}
                onBlur={() => this.onBlur(`bestOfSingleInput${index}` ,index)}
            />
        );
    }
}

export default Input