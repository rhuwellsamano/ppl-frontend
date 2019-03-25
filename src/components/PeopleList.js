import React from 'react'
import PeopleCard from './PeopleCard'
import PeopleActionButton from './PeopleActionButton'
import { Droppable, Draggable } from 'react-beautiful-dnd'

const PeopleList = ({title, cards, listID, index}) => {
  return(
    <Draggable draggableId={String(listID)} index={index}>
    {provided => (
      <div
        {...provided.draggableProps} ref={provided.innerRef} {...provided.dragHandleProps}
        className="people-list"
        >
      <Droppable droppableId={String(listID)}>
      {provided => (
        <div
        {...provided.droppableProps} ref={provided.innerRef}>
        <h4>{title}</h4>
        { cards.map((card, index) => (
          <PeopleCard
          key={card.id}
          index={index}
          id={card.id}
          text={card.text}
          />
        ))}
        {provided.placeholder}
        <PeopleActionButton listID={listID}/>
        </div>
      )}
      </Droppable>
      </div>
    )}

    </Draggable>
  )
}

export default PeopleList;
