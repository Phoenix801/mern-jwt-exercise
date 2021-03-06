import axios from 'axios';
import { GET_ITEMS, ADD_ITEM, EDIT_ITEM, DELETE_ITEM, ITEMS_LOADING } from './types';
import { tokenConfig } from './authActions';
import { returnErrors } from './errorActions';
import { IExercise } from '../../types/interfaces';

export const getItems = () => (dispatch: Function) => {
  dispatch(setItemsLoading());
  axios
    .get('/api/exercises')
    .then(res =>
      dispatch({
        type: GET_ITEMS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const getItem = (id: string) => (dispatch: Function) => {
  dispatch(setItemsLoading());
  axios
    .get(`/api/exercises/${id}`)
    .then(res =>
      dispatch({
        type: GET_ITEMS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const addItem = (exercise: IExercise) => (
  dispatch: Function,
  getState: Function
) => {
  axios
    .post('/api/exercises', exercise, tokenConfig(getState))
    .then(res =>
      dispatch({
        type: ADD_ITEM,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const editItem = (id: string, exercise: IExercise) => (
  dispatch: Function,
  getState: Function
) => {
  axios
    .post(`/api/exercises/update/${id}`, exercise, tokenConfig(getState))
    .then(res =>
      dispatch({
        type: EDIT_ITEM,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const deleteItem = (id: string) => (
  dispatch: Function,
  getState: Function
) => {
  axios
    .delete(`/api/exercises/${id}`, tokenConfig(getState))
    .then(res =>
      dispatch({
        type: DELETE_ITEM,
        payload: id
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const setItemsLoading = () => {
  return {
    type: ITEMS_LOADING
  };
};
