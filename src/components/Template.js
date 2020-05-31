import React, { Component, Fragment } from 'react'
import { Link } from  'react-router-dom'
import { connect } from 'react-redux'
import axios from 'axios'
import propTypes from 'prop-types'

// import '../css/Application.css'


import pic from '../assets/01.jpg'

import FootBar from './footer/Footer'
import Header from './header/Header'
import Loading from './Loading'

class A extends Component{
    constructor(props){
        super(props)
        this.state={
            isLoading: true
        }
    }
    componentDidMount(){

    }
    componentWillUpdate(){

    }
    shouldComponentUpdate(){

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
                    <div>  
                            <Header />
                            <FootBar />
                    </div>
                }
            </Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        signIn : state.signIn.signInUser
    }
}
const mapDispatchToProps = (dispatch) => {
    return{
        signOut: () => { dispatch({ type: 'SIGN_OUT', payload: '' }) }
    }
}

const Header = connect(mapStateToProps, mapDispatchToProps)(A)

export default A