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
  phone?: string;
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
  exercise: string;
  sets: string;
  reps: string;
  days: string; 
  phone: string;
}

export interface IItem {
  _id?: string;
  name: string;
}

export interface IExercise {
  _id?: string;
  exercise: string;
  sets: string;
  reps: string;
  days: string; 
  phone: string;
}

export interface IExerciseModal {
  auth: {
    user: IUser;
    isAuthenticated: boolean;
  };
  addItem(item: IExercise): void;
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

export interface IExerciseReduxProps extends IExerciseModal {
  item: {
    items: IExistingExercise[];
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

// <<<<<<<<<<<>>>>>>>>>>>>
// <<<<<<<< FLUX >>>>>>>>>
// <<<<<<<<<<<>>>>>>>>>>>>

export interface IAuthFunction {
  name?: string;
  email: string;
  phone: string;
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
