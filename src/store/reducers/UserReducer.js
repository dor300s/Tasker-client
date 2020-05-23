// let localLoggedinUser = null;
// if (sessionStorage.user) localLoggedinUser = JSON.parse(sessionStorage.user);

const initialState = {
  users: [],
  loggedInUser: null
};

export function userReducer(state = initialState, action = {}) {
  console.log('REDUCERRRRR', action)
  switch (action.type) {
    case 'SET_USERS':
      return {
        ...state,
        users: action.users
      };
    case 'SET_USER':
      console.log('and the user isssssssssssssss:', action.user);

      return {
        ...state,
        loggedInUser: action.user,
      };
    case 'USER_REMOVE':
      return {
        ...state,
        users: state.users.filter(user => user._id !== action.userId)
      };
    default:
      return state;
  }
}
