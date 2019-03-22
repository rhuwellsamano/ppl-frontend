
export const addUserToState = userObj => {
  return {
    type: "ADD_USER_TO_STATE",
    payload: userObj
  }
}

const loadUsers = users => {
  return {
    type: "LOAD_USERS",
    payload: users
  }
}

export const usersGetFetch = () => {
  return (dispatch) => {
    return fetch("https://jsonplaceholder.typicode.com/users")
    .then(res => res.json())
    .then(users => {
      console.log("usersGetFetch:", users)
      dispatch(loadUsers(users))
    })
  }
}
