import axios from "axios";
import { ACTIONS } from "./actions";
import {
  editCaseRequest,
  editCaseSuccess,
  fetchCasesFail,
  fetchCasesRequest,
  fetchCasesSuccess,
  getOneCaseFail,
  getOneCaseRequest,
  getOneCaseSuccess,
  createCaseFail,
  createCasePublicFail,
  createCasePublicRequest,
  createCasePublicSuccess,
  createCaseRequest,
  createCaseSuccess,
  deleteCaseFail,
  deleteCaseRequest,
  deleteCaseSuccess,
  editCaseFail,
} from "./actions";
import axiosHeader from "../../axiosHeader";

const initialState = {
  cases: [],
  case: {},
  caseIsCreated: false,
  caseIsUpdated: false,
  message: "",
  loadDone: false,
  bicycle: {
    caseStatus: [
      { title: "Новое", value: "new" },
      { title: "В процессе", value: "in_progress" },
      { title: "Завершено", value: "done" },
    ],
    bicycleType: [
      { title: "Обычный", value: "general" },
      { title: "Спорт", value: "sport" },
    ],
  },

};

export const getAllCases = () => {
  return function (dispatch) {
    dispatch(fetchCasesRequest());
    axios
      .get("cases/", {
        headers: axiosHeader(),
      })
      .then((response) => {
        dispatch(fetchCasesSuccess(response.data.data));
      })
      .catch((response) => dispatch(fetchCasesFail(response)));
  };
};

export const createCase = (values) => {
  return function (dispatch) {
    dispatch(createCaseRequest());
    axios
      .post(
        "cases/",
        {
          licenseNumber: values.licenseNumber,
          ownerFullName: values.ownerFullName,
          type: values.type,
          color: values.color,
          date: values.date,
          officer: values.officer,
          description: values.description,
        },
        {
          headers: axiosHeader(),
        }
      )
      .then((response) => {
        dispatch(createCaseSuccess(response.data.data));
      })
      .catch((response) => dispatch(createCaseFail(response)));
  };
};

export const createCasePublic = (values) => {
  return function (dispatch) {
    dispatch(createCasePublicRequest());
    axios
      .post("public/report", {
        licenseNumber: values.licenseNumber,
        ownerFullName: values.ownerFullName,
        type: values.type,
        clientId: values.clientId,
        color: values.color,
        date: values.date,
        description: values.description,
      })
      .then((response) => {
        dispatch(createCasePublicSuccess(response.data.data));
      })
      .catch((response) => dispatch(createCasePublicFail(response)));
  };
};

export const deleteCase = (id) => {
  return function (dispatch) {
    dispatch(deleteCaseRequest());
    axios
      .delete(`cases/${id}`, {
        headers: axiosHeader(),
      })
      .then(() => {
        dispatch(deleteCaseSuccess(id));
      })
      .catch((response) => dispatch(deleteCaseFail(response)));
  };
};

export const getOneCase = (id) => {
  return function (dispatch) {
    dispatch(getOneCaseRequest());
    axios
      .get(`cases/${id}`, {
        headers: axiosHeader(),
      })
      .then((response) => {
        dispatch(getOneCaseSuccess(response.data.data));
      })
      .catch((response) => dispatch(getOneCaseFail(response)));
  };
};

export const editCase = (id, values) => {
  return function (dispatch) {
    dispatch(editCaseRequest());
    axios
      .put(
        `cases/${id}`,
        {
          status: values.status,
          licenseNumber: values.licenseNumber,
          ownerFullName: values.ownerFullName,
          type: values.type,
          color: values.color,
          officer: values.officer,
          description: values.description,
          resolution: values.resolution,
        },
        {
          headers: axiosHeader(),
        }
      )
      .then((response) => {
        dispatch(editCaseSuccess(id, values));
        dispatch(getOneCaseSuccess(response.data.data));
      })
      .catch((response) => {
        dispatch(editCaseFail(response));
        dispatch(getOneCaseFail(response));
      });
  };
};

export const casesReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.FETCH_STEALS_REQUEST:
      return {
        ...state,
        message: "",
        loadDone: false,
      };

    case ACTIONS.FETCH_STEALS_SUCCESS:
      return {
        ...state,
        cases: action.payload,
        message: "",
        loadDone: true,
      };

    case ACTIONS.FETCH_STEALS_FAIL:
      return {
        ...state,
        message: action.payload.response.data.message,
      };

    case ACTIONS.CREATE_STEAL_REQUEST:
      return {
        ...state,
        caseIsCreated: false,
        message: "",
      };

    case ACTIONS.CREATE_STEAL_SUCCESS:
      return {
        ...state,
        cases: [...state.cases, action.payload],
        caseIsCreated: true,
        message: "",
      };

    case ACTIONS.CREATE_STEAL_FAILURE:
      return {
        ...state,
        caseIsCreated: false,
        message: action.payload.response.data.message,
      };

    case ACTIONS.CREATE_STEAL_PUBLIC_REQUEST:
      return {
        ...state,
        caseIsCreated: false,
        message: "",
      };

    case ACTIONS.CREATE_STEAL_PUBLIC_SUCCESS:
      return {
        ...state,
        cases: [...state.cases, action.payload],
        caseIsCreated: true,
        message: "",
      };

    case ACTIONS.CREATE_STEAL_PUBLIC_FAILURE:
      return {
        ...state,
        caseIsCreated: false,
        message: action.payload.response.data.message,
      };

    case ACTIONS.EDIT_STEAL_REQUEST:
      return {
        ...state,
        message: "",
      };

    case ACTIONS.EDIT_STEAL_SUCCESS:
      return {
        ...state,
        cases: [
          ...state.cases,
          {
            ...state.cases.find((item) => item._id !== action.payload.id),
            status: action.payload.status,
            licenseNumber: action.payload.licenseNumber,
            ownerFullName: action.payload.ownerFullName,
            type: action.payload.type,
            color: action.payload.color,
            officer: action.payload.officer,
            description: action.payload.description,
            resolution: action.payload.resolution,
          },
        ],
        caseIsUpdated: true,
        message: "",
      };

    case ACTIONS.EDIT_STEAL_FAILURE:
      return {
        ...state,
        message: action.payload.response.data.message,
      };

    case ACTIONS.GET_ONE_STEAL_REQUEST:
      return {
        ...state,
        caseIsUpdated: false,
        message: "",
        loadDone: false,
      };

    case ACTIONS.GET_ONE_STEAL_SUCCESS:
      return {
        ...state,
        case: action.payload,
        message: "",
        loadDone: true,
      };

    case ACTIONS.GET_ONE_STEAL_FAILURE:
      return {
        ...state,
        message: action.payload.response.data.message,
      };

    case ACTIONS.DELETE_STEAL_REQUEST:
      return {
        ...state,
        message: "",
      };

    case ACTIONS.DELETE_STEAL_SUCCESS:
      return {
        ...state,
        cases: state.cases.filter((item) => item._id !== action.payload),
        message: "",
      };

    case ACTIONS.DELETE_STEAL_FAILURE:
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
        caseIsCreated: false,
      };

    default:
      return state;
  }
};
