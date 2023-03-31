import axios from "axios";
import { ACTIONS } from "./actions";

import {
  logOutSuccess,
  signInFail,
  signInRequest,
  signInSuccess,
  signUpFail,
  signUpRequest,
  signUpSuccess,
} from "./actions";

const user = JSON.parse(localStorage.getItem("user"));

const initialState = user
  ? {
    userIsAuth: true,
    isRegistered: true,
    user,
    message: "",
  }
  : {
    userIsAuth: false,
    isRegistered: false,
    user: null,
    message: "",
  };

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.SIGN_UP_REQUEST:
      return {
        ...state,
        userIsAuth: false,
        isRegistered: false,
        user: null,
        message: "",
      };

    case ACTIONS.SIGN_UP_SUCCESS:
      return {
        ...state,
        userIsAuth: false,
        isRegistered: true,
        message: "",
      };

    case ACTIONS.SIGN_UP_FAIL:
      return {
        ...state,
        userIsAuth: false,
        isRegistered: false,
        message: action.payload.response.data.message,
      };

    case ACTIONS.SIGN_IN_REQUEST:
      return {
        ...state,
        userIsAuth: false,
        user: null,
        message: "",
      };

    case ACTIONS.SIGN_IN_SUCCESS:
      return {
        ...state,
        userIsAuth: true,
        user: action.payload,
        message: "",
      };

    case ACTIONS.SIGN_IN_FAIL:
      return {
        ...state,
        userIsAuth: false,
        message: action.payload.response.data.message,
      };

    case ACTIONS.LOG_OUT_SUCCESS:
      return {
        ...state,
        userIsAuth: false,
        isRegistered: false,
        user: null,
        message: "",
      };

    case ACTIONS.ON_CLICK_MESSAGE_BUTTON:
      return {
        ...state,
        message: "",
      };

    default:
      return state;
  }
};

export const signUp = (values) => {
  return function (dispatch) {
    dispatch(signUpRequest());
    axios
      .post("auth/sign_up", {
        email: values.email,
        password: values.password,
        clientId: values.clientId,
        firstName: values.firstName ? values.firstName : 'NoName',
        lastName: values.lastName ? values.lastName : 'NoName',
        approved: values.approved,
      })
      .then(() => {
        dispatch(signUpSuccess());
      })
      .catch((response) => {
        dispatch(signUpFail(response));
      });
  };
};

export const signIn = (values) => {
  return function (dispatch) {
    dispatch(signInRequest());
    axios
      .post("auth/sign_in", {
        email: values.email,
        password: values.password,
      })
      .then((response) => {
        if (response.data.data.token) {
          localStorage.setItem("user", JSON.stringify(response.data.data));
        }
        dispatch(signInSuccess(response.data.data.user));
      })
      .catch((response) => dispatch(signInFail(response)));
  };
};


export const logOut = () => {
  return function (dispatch) {
    localStorage.removeItem("user");
    dispatch(logOutSuccess());
  };
};

