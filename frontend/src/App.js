import React, {Component, Fragment} from "react";
//import logo from './logo.svg';
import './App.css';
import Particles from "react-particles-js";


import Title from './components/Title';
import Textbox from './components/Textbox';
import Navbar from './components/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {apiResponse: ""};
  }

  callAPI() {
    fetch("http://localhost:9000/testAPI")
      .then(res => res.text())
      .then(res => this.setState({apiResponse: res}));
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
           
          <Navbar />
          <Title />
          <Textbox />
          <p>{this.state.apiResponse}</p>
        </header>
      </div>
    );
  }

  
}

export default App;
