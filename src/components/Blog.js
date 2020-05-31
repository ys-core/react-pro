import React, { Component, Fragment } from 'react'
import axios from 'axios'
import propTypes from 'prop-types'
import { connect } from 'react-redux'

import '../css/blog.css'
import THUMBUP from '../assets/Icon/star_pink.svg'
import TYPE from '../assets/Icon/type.svg'
import AUTHOR from '../assets/Icon/author.svg'
import DATE from '../assets/Icon/date_black.svg'
import VIEW from '../assets/Icon/view.svg'

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import {  Button, MessageBox, Message } from 'element-react'

import FootBar from './footer/Footer'
import Header from './header/Header'
import Loading from './Loading'


class BlogPage extends Component{
    constructor(props){
        super(props)
        this.state={
            signInUser: this.props.signInUser,
            article: {},
            comments: [],
            isLoading: true,
            comment: ''
        }
    }
    componentDidMount(){
        // console.log(this.props.location.query._id)
        let ws = window.sessionStorage
        let blog_id =  this.props.match.params.id ? this.props.match.params.id : ws.getItem("blog_id")
        let views = this.props.location.query ?  this.props.location.query.starsNum : ws.getItem("views") ? ws.getItem("views") : -100
        // console.log(blog_id, views)
        if(ws.getItem("blog_id") && ws.getItem("views")){             // will not add the views of this article for using F5 to refreash the page
            this.requestData(blog_id)
        }else{                                          // will add the view num for the first time to access the specific article
            views = views ? views : -100
            this.requestDataAddViews(blog_id,views)
        }                       
    }
    async requestData(blog_id){
        axios.get('/api/getOneArticleById',{params:{ _id : blog_id }}).then(res => {
            if(res.data.status == 'true'){
                this.setState({
                    article: { ...res.data.article },
                    comments: [...res.data.article.comments],
                    isLoading : false
                })
                window.sessionStorage.setItem('blog_id',blog_id)
                window.sessionStorage.setItem('views',res.data.article.views)
            }       
            
        }).catch(err => {
        })
    }
    async requestDataAddViews(blog_id,views){
        await axios.get(`/api/getOneArticle/${blog_id}`,{params:{ _id : blog_id, views: views }}).then(res => {
            if(res.data.status === 'true'){
                 this.setState({
                     article: { ...res.data.article },
                     comments: [...res.data.article.comments],
                     isLoading: false
                 })
                 window.sessionStorage.setItem('blog_id',blog_id)
                 window.sessionStorage.setItem('views',res.data.article.views)
            }
        }).catch(err => {
            
        })
    }
    componentWillUnmount(){
        window.sessionStorage.setItem('blog_id',"")
        window.sessionStorage.setItem('views',"")
    }
    updateStar(){
        let id = this.state.article._id
          let stars = this.state.article.starsNum
          axios.post('/api/article/update_stars',{_id: id, starsNum: stars }).then(res => {
                  if(res.data.status == 'true'){
                        let _stars= res.data.starsNum
                        this.setState({
                            article: { ...this.state.article,  starsNum: _stars }
                        })
                  }
          }).catch(err => {
          })
    }
    submitComment(){
        const from = this.props.signInUser   // this.state.signInUser
        const comment = this.state.comment
        const { _id } = this.state.article
        if(from){
                if(comment){
                    axios.post('/api/add_article_comment',{ from,  _id, time: new Date(), comment }).then(res => {
                            if(res.data.status === 'true'){
                                this.requestData(_id)
                                this.setState({
                                    comment: ''
                                })
                            }
                    }).catch(err => {
                        
                    })
                }
            }else{
                Message.success({
                    message: '输入内容为空'
                });
            }
    }
    submitCommentAnonymously(){
        const comment = this.state.comment
        const { _id } = this.state.article
        MessageBox.prompt('请输入邮箱', '提示', {
            inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
            inputErrorMessage: '邮箱格式不正确'
        }).then(({ value }) => {
            const from =  value
            if(from){
                if(comment){
                    axios.post('/api/add_article_comment',{ from,  _id, time: new Date(), comment  }).then(res => {
                            if(res.data.status === 'true'){
                                this.requestData(_id)
                                this.setState({ comment: '' })
                            }
                    }).catch(err => { })
                }
            }
        }).catch(() => {
            
        });
    }
    resetInputBox(){
            this.setState({
                comment: ''
            })
    }
    render(){

        let { _id, articleTitle, articleType, comments, content, createDate, author,starsNum, views } = this.state.article
        let formatedDate = createDate ? createDate.substring(0,10) + " " +  createDate.substring(11,16) : ""
        return(
            <Fragment>
                {
                    this.state.isLoading ?
                    <Loading />
                    :
                    <div>
                        <Header />
                            <div className="blog"> 
                                    <div className="title"><h2>{ articleTitle }</h2></div>
                                    <ul className="info">
                                        <li><img src={ TYPE } />__ 类别:{ articleType ? "    " + articleType : '   未分类' }</li>
                                        <li><img src={ DATE } />__ 时间:{ "    " + formatedDate }</li>
                                        <li><img src={ AUTHOR } />__ 作者:{ "    " + author }</li>
                                        <li><img src={ THUMBUP }  className="star" onClick={ () => {this.updateStar() }} />__ 点赞:{ starsNum ? "    " + starsNum :  "    " + 0 }</li>
                                        <li><img src={ VIEW } />__ 浏览:{ "    " + views }</li>
                                    </ul>
                                <div className="content" id="content"   dangerouslySetInnerHTML={{__html: `${content}` }}  /> 
                                <div className="comment-area">
                                    <div className="blog-input-box">
                                            <ReactQuill theme="snow" value={ this.state.comment } onChange={ (val) =>{ this.setState({ comment: val })} }/>
                                            <span className="btn-wrapper">
                                                        <Button type="success" onClick={ _id => this.submitComment()}>提交留言</Button>
                                                        <Button type="warning" onClick={ _id => this.submitCommentAnonymously()}>匿名留言</Button>
                                                        <Button type="danger" onClick={ _id => this.resetInputBox()}>重置留言</Button>
                                            </span>
                                            {this.props.signInUser}
                                    </div>
                                    { 
                                        this.state.comments.map((item,index) => {
                                            return <CommentItem comment={ item } index={ index } key={ item._id } />
                                        })
                                    
                                    }
                                </div>
                            </div>
                            <FootBar />
                    </div>
                }
            </Fragment>
        )
    }
}



class CommentItem extends Component{
    constructor(props){
        super(props)
        this.state={
        }
    }
    componentDidMount(){

    }
    render(){
        let { _id, from, time, comment, commentItem  } = this.props.comment
        let { index } = this.props
        let formatedDate = time ? time.substring(0,10) + " " +  time.substring(11,16) : ""
        return(
            <Fragment>
                <div className="blog-comment-item"> 
                <h3>{ index+1 }楼</h3>
                    <p className="comment" id="comment" dangerouslySetInnerHTML={{__html: `${comment}` }}  />
                    <ul>
                        <li>来自: { from }</li>
                        <li>日期: { formatedDate }</li>
                    </ul>
                </div>
            </Fragment>
        )
    }
}

CommentItem.propTypes = {
    comment: propTypes.object.isRequired,
    index: propTypes.number.isRequired
}

const mapStateToProps = (state) => {
    return{
        signInUser: state.signIn.signInUser
    }
}
const Blog = connect(mapStateToProps)(BlogPage)

export default Blog