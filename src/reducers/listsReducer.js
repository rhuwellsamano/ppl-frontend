import { CONSTANTS } from '../actions'

let listID = 0;
let cardID = 0;
let userInfo = ""

// const returnInitialState=()=>{
//   return fetch("http://localhost:3000/api/v1/current_user", {
//             method: "GET",
//             headers: {
//               "content-type": "application/json",
//               'accepts': "application/json",
//               'Authorization': `Bearer ${localStorage.token}`
//             }
//           })
//             .then(resp => resp.json()).then(user=>console.log(user.user.lists))
// }

let savedData = null

  const doTheThing = (user) => {
    const userLists = user.user.lists
    console.log('user lists:', userLists)
    // initialState(userLists)
    savedData = userLists
    console.log(savedData)
    initialState = savedData
    console.log(initialState)
  }

  let initialState = []

// returnInitialState();

const persistToBackend=(user, info)=>{
  // debugger
  console.log(info)
  const patchObj = {
    method: 'PATCH',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.token}`
    },
    body: JSON.stringify({user:{lists:JSON.stringify(info)}})
  }
  fetch(`http://localhost:3000/api/v1/users/${user.id}`, patchObj)
  .then(resp=>resp.json()).then(user => {userInfo = user
  console.log("user updated lists", userInfo)})
}

const getUserInfoAndPatch=(info)=>{
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
        .then(user=>persistToBackend(user.user, info))
}



const listsReducer = (state = initialState, action) => {
  switch(action.type) {

    // case CONSTANTS.GET_LISTS:
    // console.log(action.payload)
    //   return [action.payload]


    case CONSTANTS.ADD_LIST:
      const newList = {
        title: action.payload,
        id: `list-${listID}`,
        cards: []
      }
      listID += 1
      getUserInfoAndPatch([...state, newList])
      // console.log([...state, newList])
      return [...state, newList];

    case CONSTANTS.ADD_CARD: {
      const newCard = {
        text: action.payload.text,
        id: `card-${cardID}`,
      }
      cardID += 1;

      const newState = state.map(list => {
        if(list.id === action.payload.listID) {
          console.log({
            ...list,
            cards: [...list.cards, newCard]
          })
          return {
            ...list,
            cards: [...list.cards, newCard]
          }
        } else {
          return list;
        }
      })
      getUserInfoAndPatch(newState)
      // console.log(newState)
      return newState;
    }

    case CONSTANTS.DRAG_HAPPENED:
      const {
        droppableIdStart,
        droppableIdEnd,
        droppableIndexStart,
        droppableIndexEnd,
        draggableId,
        type
      } = action.payload;

      const newState = [...state];

      // dragging lists around
      if(type === 'list') {
        const list = newState.splice(droppableIndexStart, 1)
        newState.splice(droppableIndexEnd, 0, ...list)

        getUserInfoAndPatch(newState)

        return newState

      }

      // in the same list
      if(droppableIdStart === droppableIdEnd) {
        const list = state.find(list => droppableIdStart === list.id)
        const card = list.cards.splice(droppableIndexStart, 1)
        list.cards.splice(droppableIndexEnd, 0, ...card)
      }

      // to another list
      if(droppableIdStart !== droppableIdEnd) {
        // find the list where drag happened
        const listStart = state.find(list => droppableIdStart === list.id)

        // pull out card from this list
        const card = listStart.cards.splice(droppableIndexStart, 1)

        //find the list where the drag ended
        const listEnd = state.find(list => droppableIdEnd === list.id)

        // put card in new list
        listEnd.cards.splice(droppableIndexEnd, 0, ...card)
      }
      getUserInfoAndPatch(newState)
      // console.log(newState)
      return newState

    default: return state;
  }
}

export default listsReducer;
