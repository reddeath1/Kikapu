import { ADD_USER, DELETE_USER, EDIT_USER,GET_USERS } from '@/constants/constants';


const initState = {
  lastRefKey: null,
  total: 0,
  items: []
};

export default (state = {
  lastRefKey: null,
  total: 0,
  items: [],
  searchUsers: initState
}, action) => {
  switch (action.type) {
    case ADD_USER:
      return [...state, action.payload];
    case EDIT_USER:
      return state.map((user) => {
        if (user.id === action.payload.id) {
          return {
            ...user,
            ...action.payload
          };
        }
        return user;
      });
    case GET_USERS:
       return {
      ...state,
      lastRefKey: action.payload != null ?? action.payload.lastKey,
      total: action.payload != null ?? action.payload.total,
      items: typeof action.payload.users != 'undefined' ? [...state.items, ...action.payload.users] : []
    };
    case DELETE_USER:
      return state.filter((user) => user.id !== action.payload);
    default:
      return state;
  }
};
