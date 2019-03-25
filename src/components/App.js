import React, { Component } from 'react';
import '../App.css';
import { connect } from 'react-redux'
import PeopleList from './PeopleList'
import PeopleActionButton from './PeopleActionButton'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import { sort } from '../actions'


class App extends Component {

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
        <div className="App">
        <br></br>
          <h2>PROJECT MANAGEMENT APP</h2>
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
              />
            ))}
            {provided.placeholder}
            <PeopleActionButton list />
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

export default connect(mapStateToProps)(App);
