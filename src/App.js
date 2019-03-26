import React, { Component } from 'react';
import { Route, Switch, withRouter } from "react-router-dom";
import Navbar from './components/Navbar'
import './App.css';
// import Container from './components/Container'
import User from './components/User'
import Login from './components/Login'
import Signup from './components/Signup'
import SliderForm from './components/SliderForm'

class App extends Component {

state={
  user:{}
}

componentDidMount = () => {
  let token = localStorage.token;
  token && token !== "undefined" ? fetch("http://localhost:3000/api/v1/current_user", {
        method: "GET",
        headers: {
          "content-type": "application/json",
          'accepts': "application/json",
          'Authorization': `Bearer ${token}`
        }
      })
        .then(resp => resp.json())
        .then(user => {
          this.setState({ user }, () => {
            console.log(user);
            this.props.history.push("/authorized");
          });
        })
    : this.props.history.push("/");

  // token ? document.getElementById("navbar").style.display = "block" : document.getElementById("navbar").style.display = "none"
};

// componentDidUpdate=()=>{
//   if (localStorage.token) {
//     document.getElementById("navbar").style.display = "block"
//   } else {
//     document.getElementById("navbar").style.display = "none"
//   }
// }

signupSubmitHandler = (userInfo) => {
  console.log(userInfo)
  fetch("http://localhost:3000/api/v1/users", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      accepts: "application/json"
    },
    body: JSON.stringify({ user: userInfo })
  })
    .then(resp => resp.json())
    .then(userData => {
      console.log("userData-", userData);
      this.setState({ user: userData }, () => {
        localStorage.setItem("token", userData.jwt);
        this.loginSubmitHandler(userInfo)
        // localStorage.token ? fetch('http://localhost:3000/api/v1/current_user', {method: "GET", headers:{'content-type': 'application/json', 'accepts': 'application/json', 'Authorization': `Bearer ${localStorage.token}`}}).then(resp=>resp.json()).then(json=>{console.log(json);this.props.history.push("/authorized")}) : this.props.history.push("/login")
      });
    });
};

loginSubmitHandler = userInfo => {
  fetch("http://localhost:3000/api/v1/login", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      accepts: "application/json"
    },
    body: JSON.stringify({ user: userInfo })
  })
    .then(resp => resp.json())
    .then(userData => {
      // console.log("userData-", userData);
      this.setState({ user: userData }, () => {
        localStorage.setItem("token", userData.jwt);
        ((localStorage.token) && (localStorage.token !== "undefined")) ? fetch('http://localhost:3000/api/v1/current_user', {method: "GET", headers:{'content-type': 'application/json', 'accepts': 'application/json', 'Authorization': `Bearer ${localStorage.token}`}}).then(resp=>resp.json()).then(json=>{console.log(json);this.props.history.push("/authorized")}) : this.props.history.push("/")
      });
    });
};

  render() {
    // console.log(this.state);
    return (
      <div className="main">
        <Switch>
          <Route
            exact path="/"
            render={() => <SliderForm loginSubmitHandler={this.loginSubmitHandler} signupSubmitHandler={this.signupSubmitHandler} />}
          />
          <Route exact path="/authorized" render={()=><User />} />
        </Switch>

      </div>

    );
  }
}

export default withRouter(App);
