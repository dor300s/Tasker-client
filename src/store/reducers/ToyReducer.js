const initialState = {
    toys: [],
    currToy: null
}

export default function toyReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_TOYS':
            return {
                ...state,
                toys: action.toys
            }
        case 'SET_TOY':                   
            return {
                ...state,
                currToy: action.toy
            }
        case 'ADD_TOY':   
            return {
                ...state,
                toys: [...state.toys, action.toy]
            }
        case 'UPDATE_TOY':   
            return {
                ...state,
                toys: state.toys.map(toy => {
                    if(toy._id === action.toy._id) return action.toy;
                    return toy;
                })
          }
        case 'REMOVE_TOY':
            return {
                ...state,
                toys: state.toys.filter(toy => toy._id !== action.toyId)
          }
        default:
            return state;
    }
}



