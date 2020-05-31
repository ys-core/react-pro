
import React, { Component, Fragment } from 'react'
import { Button, Loading } from 'element-react';
import 'element-theme-default';


class LoadingandWaiting extends Component{
    constructor(props){
        super(props)
        this.state={

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
                 <div className="el-loading-demo">
                        <Loading text="拼命加载中" fullscreen={ true }>
                            {/* <Table
                            style={{width: '100%'}}
                            columns={this.table.columns}
                            data={this.table.data}
                            /> */}
                        </Loading>
                    </div>
            </Fragment>
        )
    }
}

export default LoadingandWaiting