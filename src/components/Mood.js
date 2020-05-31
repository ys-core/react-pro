import React, { Component, Fragment } from 'react'
import { Link } from  'react-router-dom'
import axios from 'axios'
import propTypes from 'prop-types'

import '../css/Mood.css'
import THUMBUP from '../assets/Icon/star_pink.svg'
import THUMBDOWN from '../assets/Icon/down-1.svg'
import AUTHOR from '../assets/Icon/author.svg'
import DATE from '../assets/Icon/date_black.svg'

import FootBar from './footer/Footer'
import Header from './header/Header'
import Loading from './Loading'

class Mood extends Component{
    constructor(props){
        super(props)
        this.state={
            moods: [],
            isLoading : true
        }
    }
    componentDidMount(){
        this.requestData()
    }
    async requestData(){
        await axios.get('/api/getAllMoods').then(res => {
            if(res.data.status === 'true'){
                 this.setState({
                     moods:  [...res.data.Moods],
                     isLoading: false
                 })
            }
        }).catch(err => {
            
        })
    }
    componentWillUnmount(){
        let length = this.state.moods.length
        this.state.moods.splice(0, length)
    }
    reLoadPage(){
        this.requestData()
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
                        <div className="mood-warpper">  
                            { this.state.moods.map((item,index) => {
                                return <MoodItem mood={ item } key={item._id} refresh={ () => this.reLoadPage() }/>
                            })}
                        </div>
                        <FootBar />
                    </div>
                }
            </Fragment>
        )
    }
}



class MoodItem extends Component{
    constructor(props){
        super(props)
        this.state={
            
        }
    }
    componentDidMount(){

    }
    updateLikes(){
        let  _id = this.props.mood._id || 0
        let likes = this.props.mood.likes || 0
        axios.post('/api/mood/update_mood_likes',{ _id, likes }).then(res => {
                if(res.data.status == 'true'){
                    this.props.refresh()
                }
        }).catch(err => {

        })
    }
    updateDisLikes(){
        let  _id = this.props.mood._id || 0
        let dislikes = this.props.mood.dislikes || 0
        axios.post('/api/mood/update_mood_dislikes',{ _id, dislikes }).then(res => {
                if(res.data.status == 'true'){
                    this.props.refresh()
                }
        }).catch(err => {

        })
    }

    render(){
        let { _id, username, imagePath, likes, dislikes, contentDate, content } = this.props.mood
        let formatedTime = contentDate.substring(0,10)
        return(
            <Fragment>
                <div className="mood-item"> 
                    <p className="mood" id="mood"  dangerouslySetInnerHTML={{__html: `${content}` }} />
                    <ul>
                        <li><img src={ AUTHOR } />___  { username }</li>
                        <li><img src={ DATE } />__  { formatedTime }</li>
                        <li><img src={ THUMBUP }  className="star" onClick={ () => {this.updateLikes() }} />点赞: { likes }</li>
                        <li><img src={ THUMBDOWN }  className="dislike" onClick={ () => {this.updateDisLikes() }} />差评: { dislikes }</li>
                    </ul>
                </div>
            </Fragment>
        )
    }
}
MoodItem.propTypes = {
    mood: propTypes.object.isRequired
}





export default Mood