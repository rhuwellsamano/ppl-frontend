import React, { Component } from 'react';
import {connect} from 'react-redux';
import Navbar from './Navbar'
import Event from './Event'

class User extends Component {
  handleCreateOrganization=()=>{
    const postObj = {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.token}`
      }
    }
    fetch('http://localhost:3000/api/v1/organizations', postObj)
    .then(resp=>resp.json())
    .then(organizationObj=>console.log(organizationObj))
  }

  componentDidMount(){
    // fetch('http://localhost:3000/api/v1/organizations').then(resp=>resp.json())
    // .then(console.log)
  }
  render(){
    return(
      <div id="navbar">
        <Navbar handleCreateOrganization={this.handleCreateOrganization}/>
        <Event data={this.props.data}/>
      </div>
    )
  }
}

export default User
