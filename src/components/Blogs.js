import React, { Component, Fragment } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import propTypes from 'prop-types'

import '../css/Blogs.css'
import pic from '../assets/01.jpg'

import FootBar from './footer/Footer'
import Header from './header/Header'
import Loading from './Loading'

class Blogs extends Component{
    constructor(props){
        super(props)
        this.state={
            isLoading: true,
            articles: []
        }
    }
    componentDidMount(){
        this.requestData()
    }
    async requestData(){
        await axios.get('/api/getAllArticlesBriefInfo').then(res => {
            if(res.data.status === 'true'){
                //  console.log(res.data)
                 this.setState({
                     articles:  [...res.data.allArticles],
                     isLoading: false
                 })
            }
        }).catch(err => {
            
        })
    }
    componentWillUnmount(){
        let length = this.state.articles.length
        this.state.articles.splice(0, length)
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
                        <div className="article-center">
                            { this.state.articles.map((item,index)  =>{
                                return <ArticleItem  article={ item }  key={ item._id }/>
                            })}
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
    componentWillReceiveProps(){

    }
   
    render(){
        let { _id, articleTitle, articleType, comments, content, createDate, author,starsNum, views } = this.props.article
        let formatedTime = createDate.substring(0,10)
        return(
            <Link to={{ pathname: `/blog/${_id}` , query: { _id, starsNum } }}>
                <div className="article-item">
                        <div className="pic-warpper">
                            {/* <img  src={ pic } /> */}
                        </div>
                        <h2>{ articleTitle  }</h2>
                         <ul>
                            <li>类别:{ articleType ? articleType : '未分类' }</li>
                            <li>作者:{ author }</li>
                            <li>点赞:{ starsNum ? starsNum : 0 }</li>
                            <li>浏览:{ views }</li>
                            <li>日期:{ formatedTime }</li>
                         </ul>
               </div>
            </Link>
        )
    }
}

ArticleItem.propTypes = {
    article: propTypes.object.isRequired
}



export default Blogs