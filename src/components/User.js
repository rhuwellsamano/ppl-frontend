import React, { Component } from 'react';
import {connect} from 'react-redux';
import Navbar from './Navbar'
import Event from './Event'

class User extends Component {
  handleCreateOrganization=()=>{
    const postObj = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({name:"test1"})
    }
    fetch('http://localhost:3000/api/v1/organizations', postObj)
    .then(resp=>resp.json()).then(console.log)
  }
  componentDidMount(){
    // fetch('http://localhost:3000/api/v1/organizations').then(resp=>resp.json())
    // .then(console.log)
  }
  render(){
    return(
      <div id="navbar">
        <Navbar handleCreateOrganization={this.handleCreateOrganization}/>
        <Event />
      </div>
    )
  }
}

export default User
