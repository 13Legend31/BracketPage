import React, { Component } from 'react'
import { connect } from 'react-redux'
import './Links.css'

import { LinksAction } from '../../../Redux/Links/Links'

class Links extends Component {
    constructor(props) {
        super(props)
        this.generate = null // SET THIS IN COMPONENTDIDMOUNT TO POINT TO generateLinks
    }

    SendData = () => {
        /* http://localhost:1337/ */
        /* https://ezbracketapi.herokuapp.com/ */
        fetch('https://ezbracketapi.herokuapp.com/', {
            method: 'POST',
            body: JSON.stringify(this.props.store),
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        })
        .then(response => response.json())
        .then((links) => {
            const { style } = this.generate
            style.background =  style.background === 'orange' ? 'purple' : 'orange'
            this.props.UpdateLinks({
                view: links.view,
                edit: links.edit
            })
        })
        .catch(() => alert('Sorry, something went wrong!'))
    }

    componentDidMount = () => {
        this.generate = document.getElementsByClassName('generateLinks')[0]
    }

    Select = (e) => {
        e.target.select()
    }

    render() {
        const { view, edit } = this.props.store.links
        return (
            <section className='links'>
            {view &&
                <div className='view'>
                    <div className='viewDescription'>View link</div>
                    <input 
                        className='viewLink' 
                        value={view}
                        readOnly={true}
                        onClick={this.Select}
                    />
                </div>
            }
            {edit &&
                <div className='edit'>
                    <div className='editDescription'>Edit Link:  
                        <span className='DONOTGIVETHISTOANYONE'>(BE CAREFUL SHARING THIS)</span>
                    </div>
                    <input 
                        className='editLink'
                        value={edit}
                        readOnly={true}
                        onClick={this.Select}
                    />
                </div>
            }
                <div 
                    className='generateLinks'
                    onClick={this.SendData}
                >
                    {!view && !edit ? 'Generate Links' : 'Save'}
                </div>
            </section>
        );
    }
}

const mapStateToProps = (store) => ({
    store: store
})

const mapActionsToProps = {
    UpdateLinks: LinksAction
}

export default connect(mapStateToProps, mapActionsToProps)(Links)