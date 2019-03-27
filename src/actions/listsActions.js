import { CONSTANTS } from '../actions'

export const addList = (title) => {
  return {
    type: CONSTANTS.ADD_LIST,
    payload: title
  }
}

export const sort = (
  droppableIdStart,
  droppableIdEnd,
  droppableIndexStart,
  droppableIndexEnd,
  draggableId,
  type
) => {
  return {
    type: CONSTANTS.DRAG_HAPPENED,
    payload: {
      droppableIdStart,
      droppableIdEnd,
      droppableIndexStart,
      droppableIndexEnd,
      draggableId,
      type
    }
  }
}

const getLists = lists => {
  return {
    type: "GET_LISTS",
    payload: lists
  }
}

////

// fetch("http://localhost:3000/api/v1/current_user", {
//           method: "GET",
//           headers: {
//             "content-type": "application/json",
//             'accepts': "application/json",
//             'Authorization': `Bearer ${localStorage.token}`
//           }
//         })
//           .then(resp => resp.json()).then(user=>(user.user.lists))


///

export const getListsFetch = () => {
  return (dispatch) => {
    return fetch("http://localhost:3000/api/v1/current_user", {
              method: "GET",
              headers: {
                "content-type": "application/json",
                'accepts': "application/json",
                'Authorization': `Bearer ${localStorage.token}`
              }
            })
    .then(res => res.json())
    .then(user => {
      console.log('getListsFetch:', user)
      // debuggxer
      dispatch(getLists(user.user.lists))
    })
  }
}
