import React, { Component, Fragment } from 'react'
import { Link } from  'react-router-dom'


import './Footer.css'

class Footer extends Component{
    constructor(props){
        super(props)
        this.state ={

        }
    }
    render(){
        return(
            <Fragment>
                    <div className="foot-nav"> 
                        <div className="foot-nav-item">
                                <span className="web-tag">yongsonglee.top@2017-2020 | 版权归前端小智所有.</span><br /> 
                                <span className="web-tag">苏ICP备20005151号-1</span>                              
                         </div>
                    </div>
            </Fragment>   
        )
    }
}


export default Footer