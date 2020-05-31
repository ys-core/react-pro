import React from 'react'

import  { BrowserRouter as Router, HashRouter,Switch, Route } from 'react-router-dom'

import Application from '../components/Application'
import About from '../components/About'
// import Home from '../components/Home'
import Blogs from '../components/Blogs'
import Blog from '../components/Blog'
import Note from '../components/Note'
import Mood from '../components/Mood'
import Board from '../components/Board'
import More from '../components/More'
import Register from '../components/Register'
import Login from '../components/Login'


import store from '../store/index'

const router = () => (
    <Router>
        <Switch >
             <Route exact path="/" component={ Application }></Route>
             {/* <Route exact path="/home" component={ Home }></Route> */}
             <Route exact path="/blog" component={ Blogs }></Route>
             <Route exact path="/blog/:id" component={ Blog }></Route>
             <Route exact path="/note" component={ Note }></Route>
             <Route exact path="/mood" component={ Mood }></Route>
             <Route exact path="/board" component={ Board }></Route>
             <Route exact path="/about" component={ About }></Route>
             <Route exact path="/more" component={ More }></Route>
             <Route exact path="/register" component={ Register }></Route>
             <Route exact path="/login" component={ Login }></Route>
        </Switch>
    </Router>

)



// const router = () => (
//     <Router>
//         <Switch>
//              <Route exact path="/" component={ Application }></Route>
//              {/* <Route exact path="/home" component={ Home }></Route> */}
//              <Route exact path="/blog" component={ Blogs }></Route>
//              <Route exact path="/blog/:id" component={ Blog }></Route>
//              <Route exact path="/note" component={ Note }></Route>
//              <Route exact path="/mood" component={ Mood }></Route>
//              <Route exact path="/board" component={ Board }></Route>
//              <Route exact path="/about" component={ About }></Route>
//              <Route exact path="/more" component={ More }></Route>
//              <Route exact path="/register" component={ Register }></Route>
//              <Route exact path="/login" component={ Login }></Route>
//         </Switch>
//     </Router>

// )




export default router