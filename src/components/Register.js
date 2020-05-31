import React, { Component, Fragment } from 'react'

import axios from 'axios'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'


import { Card, Button, Input ,Radio} from 'element-react'



import '../css/Register.css'

import FootBar from './footer/Footer'
import Loading from './Loading'
import Header from './header/Header'

class Register extends Component{
    constructor(props) {
        super(props);
        this.state = {
          isLoading: false,
          gender: 2
        }
    }   
    componentDidMount(){
       
    }
    componentWillUnmount(){

    }
    signUp(){
        let username = this.refs.username.refs.input.value
        let password = this.refs.password.refs.input.value
        let repassword = this.refs.repassword.refs.input.value
        let gender = this.state.gender
        let email = this.refs.email.refs.input.value
        if(username && password==repassword){
            axios.post('/api/add_user',{ username, password, gender, email, tag: "0"  }).then(res => {
                if(res.data.status == 'true'){
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
        this.refs.repassword.refs.input.value = ""
        this.refs.email.refs.input.value = ""
    }
    onChange(e){
        // console.log(e)
        this.setState({ gender: e })
    }
    render(){
        return(
            <Fragment>
                        {
                            this.state.isLoading ?
                            <Loading />
                            :
                            <div className="sign-up" >
                                <Header />
                                <div className="signup-core">
                                        <Card className="box-card">
                                            <div className="text-item">用户名或邮箱 :</div>
                                            <div className="text-item"><Input placeholder="请输入用户名" size="large" ref="username"  trim={true} /></div>
                                            <div className="text-item">密码 :</div>
                                            <div className="text-item"><Input placeholder="请输入密码" ref="password" type="password"  trim={true} /></div>
                                            <div className="text-item">再次输入密码</div>
                                            <div className="text-item"><Input placeholder="请再次输入密码" ref="repassword" type="password"  trim={true} /></div>
                                            <div className="text-item">选择性别 :</div>
                                            <div className="text-item">
                                                <Radio.Group value={this.state.gender} onChange={this.onChange.bind(this)}>
                                                    <Radio value="male">男</Radio>
                                                    <Radio value="remale">女</Radio>
                                                    <Radio value="null">保密</Radio>
                                                </Radio.Group>
                                            </div>
                                            <div className="text-item">请输入email :</div>
                                            <div className="text-item"><Input placeholder="请输入邮箱" ref="email" type="text"  trim={true} /></div>
                                            <div className="text-item">选择性别 :</div>
                                            <div>
                                                <Button type="primary" onClick={() => this.signUp() }>注册</Button>
                                                <Button type="warning" onClick={() =>this.resetInput() }>重置</Button>
                                            </div>
                                        </Card>  
                                </div>
                                {/* <FootBar /> */}
                            </div>
                        }
            </Fragment>   
        )
    }
}


export default Register