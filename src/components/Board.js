import React, { Component, Fragment } from 'react'
import { Link } from  'react-router-dom'
import { connect } from 'react-redux'
import axios from 'axios'
import propTypes from 'prop-types'

import '../css/Board.css'
import THUMBUP from '../assets/Icon/star_pink.svg'
import THUMBDOWN from '../assets/Icon/down-1.svg'
import AUTHOR from '../assets/Icon/author.svg'
import DATE from '../assets/Icon/date_black.svg'

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Input , Button, Message, MessageBox, TimeSelect } from 'element-react'

import FootBar from './footer/Footer'
import Header from './header/Header'
import Loading from './Loading'

class BoardPage extends Component{
    constructor(props){
        super(props)
        this.state={
            signInUser: this.props.signInUser,
            isLoading: true,
            value: '',
            comments: [],
        }
    }
    componentDidMount(){
        this.requestData()
    }
    async requestData(){
        await axios.get('/api/getAllBoardComments').then(res => {
            if(res.data.status === 'true'){
                 this.setState({
                     comments:  [...res.data.comments],
                     isLoading: false
                 })
            }
        }).catch(err => {
            
        })
    }
    reloadPage(){
        this.requestData()
    }
    submitComment(){
        const username = this.props.signInUser   // this.state.signInUser
        const comment = this.state.value
        if(username){
                if(comment){
                    axios.post('/api/add_board_comment',{ username, comment, avatar: '匿名',commentDate: new Date(),  likes: 0, dislikes: 0 }).then(res => {
                            if(res.data.status === 'true'){
                                this.requestData()
                                this.setState({
                                    value: ''
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
        const comment = this.state.value
        MessageBox.prompt('请输入邮箱', '提示', {
            inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
            inputErrorMessage: '邮箱格式不正确'
        }).then(({ value }) => {
            const username =  value
            if(username){
                if(comment){
                    axios.post('/api/add_board_comment',{ username, comment, avatar: '匿名',commentDate: new Date(),  likes: 0, dislikes: 0 }).then(res => {
                            if(res.data.status === 'true'){
                                this.requestData()
                                this.setState({ value: '' })
                            }
                    }).catch(err => { })
                }
            }
        }).catch(() => {
            
        });
    }
    resetInputBox(){
            this.setState({
                value: ''
            })
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
                        <div className="input-box">
                            <ReactQuill theme="snow" value={ this.state.value } onChange={ (val) =>{ this.setState({ value: val })} }/>
                            <span className="btn-wrapper">
                                        <Button type="success" onClick={ () => this.submitComment()}>提交留言</Button>
                                        <Button type="warning" onClick={ () => this.submitCommentAnonymously()}>匿名留言</Button>
                                        <Button type="danger" onClick={ () => this.resetInputBox()}>重置留言</Button>
                            </span>
                        </div>               
                        <div className="comment-warpper">  
                        {this.state.signIn }
                            { this.state.comments.map((item,index) => {
                                return <CommentItem comment={ item } key={item._id} refresh={ () => this.reloadPage() }/>
                            })}
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
    updateDisLikes(){
        let _id = this.props.comment._id || 0
        let dislikes = this.props.comment.dislikes || 0
        axios.post('/api/board/update_comment_dislikes',{ _id , dislikes }).then(res => {
                if(res.data.status == 'true'){
                      this.props.refresh()
                }
        }).catch(err => {

        })
    }
    updateLikes(){
        let  _id = this.props.comment._id || 0
        let likes = this.props.comment.likes || 0
        axios.post('/api/board/update_comment_likes',{ _id, likes }).then(res => {
                if(res.data.status == 'true'){
                      this.props.refresh()
                }
        }).catch(err => {

        })
    }

    render(){
        let { _id, username, likes, dislikes, commentDate, comment, avatar  } = this.props.comment
        let formatedTime = commentDate.substring(0,10)
        return(
            <Fragment>
                <div className="comment-item"> 
                    <p className="comment" id="comment" dangerouslySetInnerHTML={{__html: `${comment}` }}  />
                    <ul>
                        <li><img src={ AUTHOR } />___ { username }</li>
                        <li><img src={ DATE } />__ { formatedTime }</li>
                        <li><img src={ THUMBUP }  className="star" onClick={ () => {this.updateLikes() }} />点赞: { likes }</li>
                        <li><img src={ THUMBDOWN }  className="dislike" onClick={ () => {this.updateDisLikes() }} />差评: { dislikes }</li>
                    </ul>
                </div>
            </Fragment>
        )
    }
}
CommentItem.propTypes = {
    comment: propTypes.object.isRequired
}


const mapStateToProps = (state) => {
    return{
        signInUser: state.signIn.signInUser
    }
}
const Board = connect(mapStateToProps)(BoardPage)
export default Board