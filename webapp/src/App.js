import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import ActivityList from "./components/activity-list/ActivityList";

class App extends Component {
  
  render() {
    return (
      <div className="App">
        <header className="App-header">
          {/* <img src={logo} className="App-logo" alt="logo" /> */}
          <ActivityList></ActivityList>
        </header>
        
      </div>
    );
  }
}

export default App;
