import React, { Component, Fragment } from 'react'
import { Layout, AutoComplete } from 'element-react'

import '../css/Register.css'

import FootBar from './footer/Footer'
import Loading from './Loading'
import Header from './header/Header'

class Register extends Component{
    constructor(props) {
        super(props);
        this.state = {
          isLoading: false,

        }
    }   
    componentDidMount(){
       
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
                            <div className="sign-up" >
                                <Header />
                                <div className="core">
                                  
                                     
                                   </div>
                                <FootBar />
                            </div>
                        }
            </Fragment>   
        )
    }
}


export default Register