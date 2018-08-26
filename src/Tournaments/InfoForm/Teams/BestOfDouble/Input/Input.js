import React, { PureComponent } from 'react'
import { findDOMNode } from 'react-dom'
import './Input.css'

class Input extends PureComponent {
    onFocus = (input) => {
        findDOMNode(this.refs[input]).value = ''
    }

    onBlur = (input, index) => {
        findDOMNode(this.refs[input]).value = this.props.bestOf[index]
        if (this.props.bestOf[index] === '') {
            this.props.Modify(1, index)
        }
    }

    render() {
        const { index, value, Modify } = this.props
        return (
            <input
                className='bestOfSingleInput'
                value={value}
                onChange={(e) => Modify(e.target.value, index)}
                ref={`bestOfSingleInput${index}`}
                onFocus={() => this.onFocus(`bestOfSingleInput${index}`)}
                onBlur={() => this.onBlur(`bestOfSingleInput${index}` ,index)}
            />
        );
    }
}

export default Input