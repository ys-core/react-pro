import React, { Component, Fragment } from 'react'
import { Link } from  'react-router-dom'
import axios from 'axios'
import propTypes from 'prop-types'

import '../css/Board.css'
import THUMBUP from '../assets/Icon/star_pink.svg'
import THUMBDOWN from '../assets/Icon/down-1.svg'
import AUTHOR from '../assets/Icon/author.svg'
import DATE from '../assets/Icon/date_black.svg'

import 'braft-editor/dist/index.css'
import BraftEditor from 'braft-editor'


import { Input , Button } from 'element-react'


import FootBar from './footer/Footer'
import Header from './header/Header'
import Loading from './Loading'

class Board extends Component{
    constructor(props){
        super(props)
        this.state={
            isLoading: true,
            value: '',
            comments: [],
            editorState: BraftEditor.createEditorState('<p>Hello <b>World!</b></p>'), // 设置编辑器初始内容
            outputHTML: '<p></p>'
        }
    }
    componentDidMount(){
        this.requestData()
        this.isLivinig = true
        // 3秒后更改编辑器内容
        setTimeout(this.setEditorContentAsync, 3000)
    }
    componentWillUnmount(){
        this.isLivinig = false
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
    handleChange = (editorState) => {
        this.setState({
          editorState: editorState,
          outputHTML: editorState.toHTML()
        })
      }
    
      setEditorContentAsync = () => {
        this.isLivinig && this.setState({
          editorState: BraftEditor.createEditorState('<p>你好，<b>世界!</b><p>')
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
                            
                            <div className="editor-wrapper">
                                    <BraftEditor
                                        contentStyle={{ height: '100px' }}
                                        // value={this.state.editorState}
                                        // onChange={() =>this.handleChange()}
                                    />
                                    <span className="btn-wrapper">
                                        <Button type="success">提交留言</Button>
                                        <Button type="warning">匿名留言</Button>
                                        <Button type="danger">重置留言</Button>
                                    </span>
                                </div>
                                <h5>输出内容</h5>
                        <div className="output-content">{  this.state.outputHTML}</div>
                        </div>
                        
                        <div className="comment-warpper">  
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





export default Board