import React, { Component } from 'react'
import Icon from '@material-ui/core/Icon'
import Card from '@material-ui/core/Card'
import TextArea from 'react-textarea-autosize'
import Button from '@material-ui/core/Button'
import { connect } from 'react-redux'
import { addList, addCard } from '../actions'

class PeopleActionButton extends Component {

  state = {
    formOpen: false,
    text: "",
    user:""
  }

  openForm = () => {
    // console.log('jon')

    this.setState({
      formOpen: true
    })
  }

  closeForm = (event) => {
    this.setState({
      formOpen: false
    })
  }

  handleInputChange = (event) => {
    this.setState({
      text: event.target.value
    })
  }

  getUserInfo=()=>{
    let token = localStorage.token
    fetch("http://localhost:3000/api/v1/current_user", {
          method: "GET",
          headers: {
            "content-type": "application/json",
            'accepts': "application/json",
            'Authorization': `Bearer ${token}`
          }
        })
          .then(resp => resp.json())
          .then(user=>this.setState({user}))
  }

  createRole=(userInfo, orgInfo)=>{
    console.log(this.state.user)
    console.log(userInfo)
    console.log(orgInfo)
    const postObj = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({rank:1, title:"owner", user_id:userInfo, organization_id:orgInfo})
    }
    fetch('http://localhost:3000/api/v1/roles', postObj)
    .then(resp=>resp.json()).then(role=>console.log(role))
  }

  createOrganization=(string)=>{
    this.getUserInfo();
    const postObj = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({name:string})
    }
    fetch('http://localhost:3000/api/v1/organizations', postObj)
    .then(resp=>resp.json()).then(orgInfo=> this.createRole(this.state.user.user.id, orgInfo.id))
  }

  handleAddlist = () => {
    const { dispatch } = this.props;
    const { text } = this.state;

    if(text) {
      this.setState({
        text: ""
      })
      dispatch(addList(text))
      this.createOrganization(text);
      // console.log(text)
    }
    return;
  }

  handleAddCard = () => {
    const { dispatch, listID } = this.props;
    const { text } = this.state;

    if(text) {
      this.setState({
        text: ""
      })
      dispatch(addCard(listID, text))

      // console.log('user')
    }
    return;
  }

  renderAddButton = () => {
    const { list } = this.props;
    const buttonText = list ? "Add another list" : "Add another card";
    const buttonTextOpacity = list ? 1 : 0.5;
    const buttonTextColor = list ? "slategray" : "inherit";
    const buttonTextBackground = list ? "whitesmoke" : "inherit"

    return (
      <div
        onClick={this.openForm}
        style={{
          ...styles.openFormButtonGroup,
          opacity: buttonTextOpacity,
          color: buttonTextColor,
          background: buttonTextBackground}}>
          <Icon>add</Icon>
          <p>{buttonText}</p>
      </div>
    )
  }

  renderForm = () => {

    const { list } = this.props;

    const placeholder = list ? "Enter list title.." : "Enter a title for this card.."

    const buttonTitle = list ? "Add List" : "Add Card";


    return <div>
      <Card style={{
        overflow: "visible",
        minHeight: 80,
        minWidth: 272,
        padding: "6px 8px 2px"
        }}
      >
        <TextArea
        placeholder={placeholder}
        autoFocus
        onBlur={this.closeForm}
        value={this.state.text}
        onChange={this.handleInputChange}
        style={{
          resize: "none",
          width: "100%",
          overflow: "hidden",
          outline: "none",
          border: "none"
        }}
        />
      </Card>

      <div style={styles.formButtonGroup}>
        <Button
        onMouseDown={list ? this.handleAddlist : this.handleAddCard}
        variant="contained"
        style={{
          color: "white",
          backgroundColor: "#5aac44"
        }}
        >{buttonTitle}
        </Button>
        <Icon style={{
          marginLeft: 8,
          cursor: "pointer"
        }}>close</Icon>
      </div>

    </div>
  }

  render(){
    return this.state.formOpen ? this.renderForm() : this.renderAddButton();
  }
}

  const styles = {
    openFormButtonGroup: {
      display: "flex",
      alignItems: "center",
      cursor: "pointer",
      borderRadius: 3,
      height: 36,
      width: 272,
      paddingLeft: 10
    },
    formButtonGroup: {
      marginTop: 8,
      display: "flex",
      alignItems: "center"
    }
  }





export default connect()(PeopleActionButton);
