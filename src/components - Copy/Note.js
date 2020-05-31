import React, { Component, Fragment } from 'react'
import { Link } from  'react-router-dom'
import axios from 'axios'
import propTypes from 'prop-types'

import '../css/Note.css'
import AUTHOR from '../assets/Icon/author.svg'
import DATE from '../assets/Icon/date_black.svg'

import FootBar from './footer/Footer'
import Header from './header/Header'
import Loading from './Loading'

class Note extends Component{
    constructor(props){
        super(props)
        this.state={
            notes: [],
            isLoading: true
        }
    }
    componentDidMount(){
        this.requestData()
    }
    async requestData(){
        await axios.get('/api/getAllNotes').then(res => {
            if(res.data.status === 'true'){
                //  console.log(res.data)
                 this.setState({
                     notes:  [...res.data.Notes],
                     isLoading: false
                 })
            }
        }).catch(err => {
            
        })
    }
    componentWillUnmount(){
        let length = this.state.notes.length
        this.state.notes.splice(0, length)
    }
    render(){
        return(
            <Fragment>
                {
                    this.state.isLoading ?
                    <Loading />
                    :
                    <div>
                        <Header />
                        <div className="note-warpper">  {this.state.notes.map((note,index) => {
                            return <NoteItem note={ note } key={ note._id }/>
                        })} </div>
                        <FootBar />
                    </div>
                }
            </Fragment>
        )
    }
}



class NoteItem extends Component{
    constructor(props){
        super(props)
        this.state={
        }
    }
    componentDidMount(){
     
    }
    render(){
        let { _id, username, time, note } = this.props.note
        let formatedTime = time.substring(0,10)
        return(
            <Fragment>
                <div className="note-item"> 
                    <p className="note" id="note" dangerouslySetInnerHTML={{__html: `${note}` }} />
                    <ul>
                        <li><img src={ AUTHOR } />__  { username }</li>
                        <li><img src={ DATE } />__  { formatedTime }</li>
                    </ul>
                </div>
            </Fragment>
        )
    }
}
NoteItem.propTypes = {
    note: propTypes.object.isRequired
}



export default Note