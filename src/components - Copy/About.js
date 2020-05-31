import React, { Component, Fragment } from 'react'
import { Link } from  'react-router-dom'


import '../css/About.css'
import AUTHOR from '../assets/Icon/author.svg'


import Avatar from '../assets/avatar.jpg'
import Header from './header/Header'
import FootBar from './footer/Footer'

class About extends Component{
    constructor(props){
        super(props)
        this.state ={

        }

    }
    componentDidMount(){
       
    }
    componentWillUnmount(){

    }
    render(){
        return(
            <Fragment>
                <Header />
                <div className="about">
                                <div className="about-top">
                                    <div className="avatar">
                                                <Link to="/"><img src={ Avatar }   alt="头像加载失败" /></Link>
                                    </div>
                                    <span>前端小智</span>
                                </div>
                                <div className="about-body">
                                    <ul>
                                        <li><img src={ AUTHOR } />___: 前端小智</li>
                                        <li>破壳日: 1994-04-**</li>
                                        <li>籍贯: 四川·广元</li>
                                        <li>毕业学校/专业: 江南大学JNU/信息与计算科学</li>
                                        <li>邮箱: yonnsongLee@163.com  (欢迎骚扰)</li>
                                        <li>爱好: 听歌,  户外, Coding, 球类, 侃牛</li>
                                        <li>博客技术: React + react-router-dom + Redux/React-redux+ Redux-persist + Element-react + Axios  + Express + MongoDB</li>
                                        <li>技术栈: Node, Vuejs, React, 前端三大件, Python</li>
                                        <li>GitHub: <a href="https://github.com/youngcaden" target="_blank">前端小智‘s GitHub</a></li>
                                        <li>目标: 立志成为一个有志向有理想有追求的前端Coder</li>
                                        <li>座右铭: 没有帅气的脸庞, 只能依仗着才华闯天下。<br /><br />
                                              不要将希望总是寄托于明天,做好当下才是最必要的。
                                        </li>
                                    </ul>
                                </div>
                        </div>
                <FootBar />
            </Fragment>   
        )
    }
}


export default About