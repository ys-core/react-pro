import React, { Component, Fragment } from 'react'
import { Link } from  'react-router-dom'
import axios from 'axios'
import propTypes from 'prop-types'

import '../css/More.css'



import FootBar from './footer/Footer'
import Header from './header/Header'
import Loading from './Loading'

class More extends Component{
    constructor(props){
        super(props)
        this.state={
            isLoading: false
        }
    }
    componentDidMount(){

    }
    componentWillUpdate(){

    }
    componentDidUpdate(){

    }
    componentWillUnmount(){

    }

    render(){
        return(
            <Fragment>
                {
                    this.state.isLoading ?
                    <Loading />
                    :
                    <div className="more-warpper">  
                            <Header />
                            <div className="more-body">
                                <div className="content">
                                <a href="yongsonglee.top:3000/#/">see Vue.js blog : yongsonglee.top:3000/#/</a>
                                </div>
                            </div>
                            <FootBar />
                    </div>
                }
            </Fragment>
        )
    }
}

export default More