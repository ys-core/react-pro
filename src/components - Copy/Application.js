import React, { Component, Fragment } from 'react'
import { Link } from  'react-router-dom'
import axios from 'axios'
import propTypes from 'prop-types'

import '../css/Application.css'


import pic from '../assets/01.jpg'
import bg from '../assets/Music/Build It Better.mp3'
import FootBar from './footer/Footer'
import Header from './header/Header'
import Loading from './Loading'




class Application extends Component{
    constructor(props){
        super(props)
        this.state ={
            isLoading: true,
            articles: [],
            notes: [],
            moods: []
        }
        this.handleScroll = this.handleScroll.bind(this)
    }
    componentDidMount(){
        this.requestData()
        window.addEventListener('scroll', this.handleScroll)
    }
    async requestData(){
        await axios.get('/api/getAllArticlesBriefInfo').then(res => {
            if(res.data.status === 'true'){
                //  console.log(res.data.allArticles)
                 this.setState({
                     articles:  [...res.data.allArticles],
                     isLoading : false
                 })
            }
        }).catch(err => {
            
        })
    }
    componentWillUnmount(){
        window.removeEventListener('scroll',this.handleScroll)
        let length = this.state.articles.length
        this.state.articles.splice(0, length)
    }
    handleScroll() {
        let _y = document.body.scrollTop || document.documentElement.scrollTop
        let _h = document.body.scrollHeight || document.documentElement.scrollHeight
        let _ch = document.body.clientHeight || document.documentElement.clientHeight
        // let topbarH = document.getElementById('top-bar').clientHeight
        // console.log(_y,topbarH)
        if(_y >= 0){
            // console.log(_y,topbarH)
            // document.getElementById('right-tab').classList.add('fixed-right-tab')
            document.getElementById('right-tab') ? document.getElementById('right-tab').style.top = _y  + "px" :  console.log("Here's yongsonglee.top website")
        }else{
            // console.log("hello")
            // document.getElementById('right-tab').style.top = 0 + "px"
            // document.getElementById('right-tab').classList.remove('fixed-right-tab')
        }
        // let __top = document.getElementById('right-tab')
        // console.log(__top.offsetTop,__top.offsetLeft)
    }
    handleClick(){
        let l = document.getElementById('left-window')
        let r = document.getElementById('right-window')
        let containter = document.getElementById('container')
        // Id.classList.add('bg-color')
        l.classList.toggle('bg-color')
        l.style.marginLeft = '-26vw'
        r.style.marginLeft = '13vw'
        containter.style.backgroundColor= '#f4f4f4'
    }
    render(){
        return(
            <Fragment>
              {
                    this.state.isLoading ? 
                    <Loading />
                    :
                    <div className="container" id="container">
                        <Header />
                        <div className="body-core">     
                            <div className="main-body">
                                    <div className="right-tab" id="right-tab">
                                        <div className="audio">
                                            <audio autoPlay="autoPlay" loop="loop">
                                                    <source  src={ bg }  type="audio/mpeg"></source>
                                            </audio>
                                            <div className="time">
                                               
                                            </div>
                                        </div>
                                    </div>
                                    { this.state.articles.map((item,index)  =>{
                                       return <ArticleItem  article={ item }  key={ item._id }/>
                                    })}
                            </div>     
                        </div>
                        
                        <FootBar />
                    </div>

                 }
            </Fragment>   
        )
    }
}


class ArticleItem extends Component{
    constructor(props){
        super(props)
    }  
    render(){
        let { _id, articleTitle, articleType, comments, content, createDate, author,starsNum, views } = this.props.article
        return(
            <Link to={{ pathname: `/blog/${_id}` , query: { _id, starsNum }}}>
                <div className="topic-item">
                        <div className="pic-warpper"><img  src={ pic } alt="" /></div>
                        <h2>{ articleTitle  }</h2>
                         <ul>
                            <li>类别:{ articleType ? articleType : '未分类' }</li>
                            <li>作者:{ author }</li>
                            <li>点赞:{ starsNum ?  starsNum : 0}</li>
                            {/* <li>日期:{ createDate }</li> */}
                            <li>浏览:{ views ? views : 0 }</li>
                         </ul>
               </div>
            </Link>
        )
    }
}

ArticleItem.propTypes = {
    article: propTypes.object.isRequired
}



export default Application