import { E_ERROR } from './enum';

// REACT
export interface ITarget {
  target: {
    value: React.SetStateAction<string>;
  };
  preventDefault(): void;
}

// ERRORS
export interface IMsg {
  msg: string | any;
}

// AUTH
export interface IUser {
  name?: string;
  email: string;
  password: string;
  phone?: number;
}

export interface IAuthForm {
  isAuthenticated?: boolean;
  error: IError;
  clearErrors(): void;
}

export interface ILoginModal extends IAuthForm {
  login(user: IUser): void;
}

export interface IRegisterModal extends IAuthForm {
  register(user: IUser): void;
}

export interface ILogoutProps {
  logout(): void;
}

export interface IError {
  id: E_ERROR;
  msg: IMsg;
}

export interface IAuthReduxProps {
  auth: { isAuthenticated: boolean };
  error: IError;
}

export interface IExerciseProps {
  auth: {
    user: IUser;
    isAuthenticated: boolean;
  };
  error: IError;
}

export interface IConfigHeaders {
  headers: {
    [index: string]: string;
  };
}

// NAVBAR
export interface IAppNavbar {
  auth?: {
    isAuthenticated: boolean;
    user: IUser;
  };
}

// ITEMS
export interface IExistingItem {
  _id: string;
  name: string;
}


export interface IExistingExercise {
  _id: string;
  exerciseName: string;
  sets: string;
  reps: string;
  days: number[]; 
  phone: number;
}

export interface IItem {
  _id?: string;
  name: string;
}

export interface IExercise {
  _id?: string;
  exerciseName: string;
  sets: number;
  reps: number;
  days: number[]; 
  phone: number;
}

export interface IExerciseModal {
  auth: {
    user: IUser;
    isAuthenticated: boolean;
  };
  addItem(exercise: IExercise): void;
}

export interface IExerciseEdit {
  auth: {
    user: IUser;
    isAuthenticated: boolean;
  };
  editItem(id: string, exercise: IExercise): void;
}

export interface IItemModal {
  isAuthenticated: boolean;
  addItem(item: IItem): void;
}

export interface IItemReduxProps extends IAuthReduxProps {
  item: {
    items: IExistingItem[];
  };
}

export interface IExerciseReduxProps extends IExerciseProps {
  exercise: {
    exercises: IExistingExercise[];
  };
}

export interface IShoppingList {
  item: {
    items: IExistingItem[];
  };
  getItems(): void;
  deleteItem(id: string): void;
  isAuthenticated: boolean;
}

export interface IExerciseList {
  exercise: {
    exercises: IExistingExercise[];
  };
  getItems(): void;
  editItem(id: string, exercise: IExercise): void;
  deleteItem(id: string): void;
  auth: {
    user: IUser;
    isAuthenticated: boolean;
  };
}

// <<<<<<<<<<<>>>>>>>>>>>>
// <<<<<<<< FLUX >>>>>>>>>
// <<<<<<<<<<<>>>>>>>>>>>>

export interface IAuthFunction {
  name?: string;
  email: string;
  phone: number;
  password: string;
  password2: string;
}

export interface IReturnErrors {
  msg: {
    msg: string | any;
  };
  status: string;
  id: any;
}

export interface IAction {
  type: string;
  payload?: any;
}
