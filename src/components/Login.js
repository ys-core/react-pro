import React, { Component, Fragment } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'


import { Card, Button, Input } from 'element-react'

import '../css/Login.css'

import FootBar from './footer/Footer'
import Header from './header/Header'
import Loading from './Loading'



class LoginPage extends Component{
    constructor(props){
        super(props)
        this.state ={
            signIn: this.props.signIn,
            isLoading: false,
        }

    }
    componentDidMount(){
     
    }
    componentWillUnmount(){
       
    }
    signIning(){
        // console.log(this.refs.username.refs.input.value)
        // console.logthis.refs.username.refs.input.value)
        let username = this.refs.username.refs.input.value
        let password = this.refs.password.refs.input.value
        if(username && password){
            axios.post('/api/verify_user',{ username, password  }).then(res => {
                // console.log(res.data)
                if(res.data.status == 'true'){
                    // store.dispatch({ type: 'SIGN_IN', payload: res.data.username })
                    this.props.signIn(res.data.username)
                    this.resetInput()
                    this.props.history.push('/')
                } 
            }).catch(err => {
    
            })
        }
   
    }
    resetInput(){
        this.refs.username.refs.input.value = ""
        this.refs.password.refs.input.value = ""
    }
    render(){
        return(
            <Fragment>
                    {
                        this.state.isLoading ?  
                        <Loading />  : 
                        <div> 
                            <Header />
                                <div className="login">
                                    <div className="core">
                                       <Card className="box-card">
                                            <div className="text-item">用户名或邮箱 :</div>
                                            <div className="text-item"><Input placeholder="请输入用户名" size="large" ref="username"  trim={true} /></div>
                                            <div className="text-item">密码 :</div>
                                            <div className="text-item"><Input placeholder="请输入密码" ref="password" type="password"  trim={true} /></div>
                                            <div className="text-item">" "</div>
                                            <div>
                                                <Button type="primary" onClick={() => this.signIning() }>登录</Button>
                                                <Button type="warning" onClick={() =>this.resetInput() }>重置</Button>
                                            </div>
                                        </Card>
                                    </div>
                                </div>
                            <FootBar />
                        </div>
                    }

                        
            </Fragment>   
        )
    }
}

const mapStateToProps = state => {
    return{
        signInUser: state.signIn.signInUser
    }
}
const mapDispatchToProps = dispatch =>{
    return{
        signIn:  username => dispatch({ type: 'SIGN_IN', payload: username }) 
    }
}
const Login = connect(mapStateToProps, mapDispatchToProps)(LoginPage)

export default Login