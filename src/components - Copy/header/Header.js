import React, { Component, Fragment } from 'react'
import { Link } from  'react-router-dom'
import store from '../../store/index'

import Avatar from '../../assets/Icon/fz-b.png'

import './Header.css'


class Header extends Component{
    constructor(props){
        super(props)
        this.state={
            signIn: store.getState().signIn.signInUser
        }
    }
    componentDidMount(){
        // let signIn = store.getState().signIn.signInUser
        // if(signIn){
        //     this.setState({
        //         signIn
        //     })
        // }
        this.unsubscribe = store.subscribe(() => {
            this.setState({
                signIn: store.getState().signIn.signInUser
            })
        })
    }
    componentWillUnmount(){
        this.unsubscribe()
    }
    signOut(){
        store.dispatch({ type: 'SIGN_OUT', payload: '' })
    }
    render(){
        return(
            <Fragment>
                <div className="head-nav" id="top-bar"> 
                            <div className="head-nav-item">
                                <ul>
                                    <li className="avatar"><img src={ Avatar }  alt="" /></li>
                                    <li> <Link to="/">小智·主页</Link>  </li>
                                    <li> <Link to="/blog">博客</Link>   </li>
                                    <li>  <Link to="/note">日记</Link>  </li>
                                    <li> <Link to="/mood">心情</Link>  </li>
                                    {/* <li>  <Link to="life">生活</Link>  </li> */}
                                    <li>  <Link to="/board">留言板</Link>  </li>
                                    <li>  <Link to="/about">关于</Link>  </li>
                                    <li>  <Link to="/more">更多..</Link>  </li>
                                    {
                                        this.state.signIn ? <li className="register admin"><Link to="/admin">{ this.state.signIn }</Link></li> : <li className="register"><Link to="/register">注册账号</Link></li>
                                    }
                                    {
                                        this.state.signIn ?  <li onClick={() => this.signOut() }>退出</li> : <li><Link to="/login">登录</Link> </li> 
                                    }

                                </ul>
                            </div>
                </div>
            </Fragment>
        )
    }
}

export default Header