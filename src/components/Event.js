import React, { Component } from 'react';
import '../App.css';
import { connect } from 'react-redux'
import PeopleList from './PeopleList'
import PeopleActionButton from './PeopleActionButton'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import { sort, getListsFetch } from '../actions'
import logo from '../event-tasks-manager.png'


class Event extends Component {

  // state = {
  //   daLists: []
  // }

  //
  componentDidMount = () => {
    // this.props.getListsFetch()
    // fetch("http://localhost:3000/api/v1/current_user", {
    //           method: "GET",
    //           headers: {
    //             "content-type": "application/json",
    //             'accepts': "application/json",
    //             'Authorization': `Bearer ${localStorage.token}`
    //           }
    //         })
    //           .then(resp => resp.json()).then(user=>this.setState({
    //             daLists: user
    //           }))

  }

  onDragEnd = (result) => {
    const { destination, source, draggableId, type } = result;
    if(!destination) {
      return;
    }

    this.props.dispatch(
      sort(
        source.droppableId,
        destination.droppableId,
        source.index,
        destination.index,
        draggableId,
        type
      )
    )
  }

  render() {
    const { lists } = this.props

    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <div className="Event">
        <br></br>
          <img src={logo} className="logo"/>
          <br></br>
          <Droppable droppableId="all-lists" direction="horizontal" type="list">
          {provided => (
            <div className="people-list-container" {...provided.droppableProps} ref={provided.innerRef}>
            {lists.map((list, index) => (
              <PeopleList
              key={list.id}
              listID={list.id}
              title={list.title}
              cards={list.cards}
              index={index}
              data={this.props.data}
              />
            ))}
            {provided.placeholder}
            <PeopleActionButton list data={this.props.data}/>
            </div>
          )}
          </Droppable>
            <br></br>
        </div>
      </DragDropContext>
    );
  }
}

const mapStateToProps = state => ({
  lists: state.lists
})

// const mapDispatchToProps = dispatch => {
//   return {
//     getListsFetch: () => dispatch(getListsFetch())
//   }
// }

export default connect(mapStateToProps)(Event);
