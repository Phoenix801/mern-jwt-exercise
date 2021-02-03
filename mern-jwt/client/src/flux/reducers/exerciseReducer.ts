import {
  GET_ITEMS,
  ADD_ITEM,
  EDIT_ITEM,
  DELETE_ITEM,
  ITEMS_LOADING
} from '../actions/types';
import { IAction, IExercise } from '../../types/interfaces';

const initialState = {
  exercises: [],
  loading: false
};

interface IState {
  exercises: IExercise[];
}

export default function(state: IState = initialState, action: IAction) {
  switch (action.type) {
    case GET_ITEMS:
      return {
        ...state,
        exercises: action.payload,
        loading: false
      };
      case EDIT_ITEM:
        return {
          ...state,
          exercises: [action.payload, ...state.exercises]
        };
    case DELETE_ITEM:
      return {
        ...state,
        exercises: state.exercises.filter(exercise => exercise._id !== action.payload)
      };
    case ADD_ITEM:
      return {
        ...state,
        exercises: [action.payload, ...state.exercises]
      };
    case ITEMS_LOADING:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
}
