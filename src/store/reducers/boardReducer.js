const initialState = {
    boards: [],
    currBoard: null
}

export default function toyReducer(state = initialState, action) {
    console.log(action.boards);
    
    switch (action.type) {
        case 'SET_BOARDS':
            return {
                ...state,
                boards: action.boards
            }
        case 'SET_BOARD':        
        console.log(action.board);           
            return {
                ...state,
                currBoard: action.board
            }
        case 'ADD_BOARD':   
            return {
                ...state,
                boards: [...state.boards, action.board]
            }
        case 'UPDATE_BOARD':   
            return {
                ...state,
                boards: state.boards.map(board => {
                    if(board._id === action.board._id) return action.board;
                    return board;
                })
          }
        case 'REMOVE_BOARD':
            return {
                ...state,
                boards: state.boards.filter(board => board._id !== action.boardId)
          }
        default:
            return state;
    }
}



