import React, { Component } from 'react';
import './App.css';
import TrendingList from './TrendingList';


class App extends Component {
  render() {
    return (
        <div className="container-fluid">
        <div className="row">
            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 b-r padding_bottom_70">
                <TrendingList/>
            </div>

            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 b-r padding_bottom_70">
                <TrendingList/>
            </div>
        </div>
        </div>
    );
  }
}

export default App;