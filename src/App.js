
import './App.css';

import React, { Component } from 'react';
import NavBar from './Components/NavBar';
import News from './Components/News';
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

export default class App extends Component {
  pageSize=15;
  state ={
    progress:0
  }  
  setProgress=(progress)=>{
    this.setState({progress: progress})
  }

  render() {
    return (
      <div>
      <Router>
        <NavBar/>    
        <LoadingBar
        height={3}
        color='#f11946'
        progress={this.state.progress}        
      />          
        <Routes>
        <Route exact path="/" element={<News setProgress={this.setProgress} key="general" country="in" pageSize={this.pageSize} category="general"></News>}/>
        <Route exact path="/business" element={<News setProgress={this.setProgress} key="business" pageSize={this.pageSize} country="in" category="business"></News>}/>
         <Route exact path="/entertainment" element={<News setProgress={this.setProgress} key="entertainment" pageSize={this.pageSize} country="in" category="entertainment"></News>}/>
         <Route exact path="/general" element={<News setProgress={this.setProgress} key="general" pageSize={this.pageSize} country="in" category="general"></News>}/>
         <Route exact path="/health" element={<News setProgress={this.setProgress} key="health" pageSize={this.pageSize} country="in" category="health"></News>}/>
         <Route exact path="/science" element={<News setProgress={this.setProgress} key="science" pageSize={this.pageSize} country="in" category="science"></News>}/>
         <Route exact path="/sports" element={<News setProgress={this.setProgress} key="sports" pageSize={this.pageSize} country="in" category="sports"></News>}/>
         <Route exact path="/technology" element={<News setProgress={this.setProgress} key="technology" pageSize={this.pageSize} country="in" category="technology"></News>}/>         
      
      </Routes>
        </Router>
      </div>
    )
  }
}


