import React, { Component, Fragment } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import store from '../store/index'

import { Card, Button, Input } from 'element-react'

import '../css/Login.css'

import FootBar from './footer/Footer'
import Header from './header/Header'
import Loading from './Loading'



class Login extends Component{
    constructor(props){
        super(props)
        this.state ={
            signIn: '',
            isLoading: false,
            username: '',
            password: ''

        }

    }
    componentDidMount(){
        console.log(store.getState())
        console.log()
    }
    componentWillUnmount(){
        // undescrible()
    }
    setUsername(e){
        console.log(e)
    }
    setPassword(e){
        console.log(e)
    }
    signIning(){
        // console.log(this.refs.username.refs.input.value)
        // console.logthis.refs.username.refs.input.value)
        let username = this.refs.username.refs.input.value
        let password = this.refs.username.refs.input.value
        if(username && password){
            axios.post('/api/verify_admin',{ username, password  }).then(res => {
                console.log(res.data.username)
                if(res.data.status == 'true'){
                    store.dispatch({ type: 'SIGN_IN', payload: res.data.username })
                    this.resetInput()
                    this.props.history.push('/')
                }else{
                    console.log(res.data)
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
                                            <div className="text-item"><Input placeholder="请输入用户名" size="large" ref="username" onChange={(e) => this.setUsername() } trim={true} /></div>
                                            <div className="text-item">密码 :</div>
                                            <div className="text-item"><Input placeholder="请输入密码" ref="password" type="password" onChange={ (e)=>this.setPassword() } trim={true} /></div>
                                         
                                            <div className="text-item">" "</div>
                                            <div>
                                                <Button type="primary" onClick={() => this.signIning() }>登录</Button>
                                                <Button type="warning" onClick={() =>this.resetInput() }>重置</Button>
                                                {/* <Button type="error" onClick={() =>this.resetInput() }>重置</Button> */}
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


export default Login