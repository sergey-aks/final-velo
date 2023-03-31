import axios from "axios";
import { ACTIONS } from "./actions";
import {
  deleteOfficerFail,
  deleteOfficerRequest,
  deleteOfficerSuccess,
  editOfficerFail,
  editOfficerRequest,
  editOfficerSuccess,
  fetchOfficersFail,
  fetchOfficersRequest,
  fetchOfficersSuccess,
  getOneOfficerFail,
  getOneOfficerRequest,
  getOneOfficerSuccess,
} from "./actions";
import axiosHeader from "../../axiosHeader";

const initialState = {
  officers: [],
  officer: {},
  officerIsCreated: false,
  officerIsUpdated: false,
  message: "",
  loadDone: false,
};

export const officersReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.FETCH_OFFICERS_REQUEST:
      return {
        ...state,
        message: "",
        loadDone: false,
      };

    case ACTIONS.FETCH_OFFICERS_SUCCESS:
      return {
        ...state,
        officers: action.payload,
        message: "",
        loadDone: true,
      };

    case ACTIONS.FETCH_OFFICERS_FAIL:
      return {
        ...state,
        message: action.payload.response.data.message,
      };

    case ACTIONS.EDIT_OFFICER_REQUEST:
      return {
        ...state,
        message: "",
      };

    case ACTIONS.EDIT_OFFICER_SUCCESS:
      return {
        ...state,
        officers: [
          ...state.officers,
          {
            ...state.officers.find((item) => item._id !== action.payload.id),
            firstName: action.payload.firstName,
            lastName: action.payload.lastName,
            password: action.payload.password,
            approved: action.payload.approved,
          },
        ],
        officerIsUpdated: true,
        message: "",
      };

    case ACTIONS.EDIT_OFFICER_FAIL:
      return {
        ...state,
        message: action.payload.response.data.message,
      };

    case ACTIONS.DELETE_OFFICER_REQUEST:
      return {
        ...state,
        message: "",
      };

    case ACTIONS.DELETE_OFFICER_SUCCESS:
      return {
        ...state,
        officers: state.officers.filter((item) => item._id !== action.payload),
        message: "",
      };

    case ACTIONS.DELETE_OFFICER_FAIL:
      return {
        ...state,
        message: action.payload.response.data.message,
      };

    case ACTIONS.GET_ONE_OFFICER_REQUEST:
      return {
        ...state,
        officerIsUpdated: false,
        message: "",
        loadDone: false,
      };

    case ACTIONS.GET_ONE_OFFICER_SUCCESS:
      return {
        ...state,
        officer: action.payload,
        message: "",
        loadDone: true,
      };

    case ACTIONS.GET_ONE_OFFICER_FAIL:
      return {
        ...state,
        message: action.payload.response.data.message,
      };

    case ACTIONS.ON_CLICK_MESSAGE_BUTTON:
      return {
        ...state,

        message: "",
      };

    case ACTIONS.ON_CLICK_MODAL_BUTTON:
      return {
        ...state,
        officerIsCreated: false,
      };

    default:
      return state;
  }
};

export const getAllOfficers = () => {
  return function (dispatch) {
    dispatch(fetchOfficersRequest());
    axios
      .get("officers/", {
        headers: axiosHeader(),
      })
      .then((response) => {
        dispatch(fetchOfficersSuccess(response.data.officers));
      })
      .catch((response) => dispatch(fetchOfficersFail(response)));
  };
};

export const deleteOfficer = (id) => {
  return function (dispatch) {
    dispatch(deleteOfficerRequest());
    axios
      .delete(`officers/${id}`, {
        headers: axiosHeader(),
      })
      .then(() => {
        dispatch(deleteOfficerSuccess(id));
      })
      .catch((response) => dispatch(deleteOfficerFail(response)));
  };
};

export const getOneOfficer = (id) => {
  return function (dispatch) {
    dispatch(getOneOfficerRequest());
    axios
      .get(`officers/${id}`, {
        headers: axiosHeader(),
      })
      .then((response) => {
        dispatch(getOneOfficerSuccess(response.data.data));
        // console.log('getOneOfficerSuccess.payload = ', getOneOfficerSuccess(response.data.data))
      })
      .catch((response) => dispatch(getOneOfficerFail(response)));
  };
};

export const editOfficer = (id, values) => {
  return function (dispatch) {
    dispatch(editOfficerRequest());
    axios
      .put(
        `officers/${id}`,
        {
          firstName: values.firstName,
          lastName: values.lastName,
          approved: values.approved,
        },
        {
          headers: axiosHeader(),
        }
      )
      .then((response) => {
        dispatch(editOfficerSuccess(id, values));
        dispatch(getOneOfficerSuccess(response.data.data));
      })
      .catch((response) => {
        dispatch(editOfficerFail(response));
        dispatch(getOneOfficerFail(response));
      });
  };
};

