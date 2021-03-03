import React, { Component } from "react";
import "./App.scss";
import ActivityList from "./components/activity-list/ActivityList";

class App extends Component {
  
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <ActivityList></ActivityList>
        </header>
      </div>
    );
  }
}

export default App;
