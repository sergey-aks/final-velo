export const ACTIONS = {
    CREATE_STEAL_FAIL: 'CREATE_STEAL_FAIL',
    CREATE_STEAL_PUBLIC_FAIL:'CREATE_STEAL_PUBLIC_FAIL',
    CREATE_STEAL_PUBLIC_REQUEST:'CREATE_STEAL_PUBLIC_REQUEST',
    CREATE_STEAL_PUBLIC_SUCCESS:'CREATE_STEAL_PUBLIC_SUCCESS',
    CREATE_STEAL_REQUEST:'CREATE_STEAL_REQUEST',
    CREATE_STEAL_SUCCESS:'CREATE_STEAL_SUCCESS',
    DELETE_STEAL_FAIL:'DELETE_STEAL_FAIL',
    DELETE_STEAL_REQUEST:'DELETE_STEAL_REQUEST',
    DELETE_STEAL_SUCCESS:'DELETE_STEAL_SUCCESS',
    DELETE_OFFICER_FAIL:'DELETE_OFFICER_FAIL',
    DELETE_OFFICER_REQUEST:'DELETE_OFFICER_REQUEST',
    DELETE_OFFICER_SUCCESS:'DELETE_OFFICER_SUCCESS',
    EDIT_STEAL_FAIL:'EDIT_STEAL_FAIL',
    EDIT_STEAL_REQUEST:'EDIT_STEAL_REQUEST',
    EDIT_STEAL_SUCCESS:'EDIT_STEAL_SUCCESS',
    EDIT_OFFICER_FAIL:'EDIT_OFFICER_FAIL',
    EDIT_OFFICER_REQUEST:'EDIT_OFFICER_REQUEST',
    EDIT_OFFICER_SUCCESS:'EDIT_OFFICER_SUCCESS',
    FETCH_STEALS_FAIL:'FETCH_STEALS_FAIL',
    FETCH_STEALS_REQUEST:'FETCH_STEALS_REQUEST',
    FETCH_STEALS_SUCCESS:'FETCH_STEALS_SUCCESS',
    FETCH_OFFICERS_FAIL:'FETCH_OFFICERS_FAIL',
    FETCH_OFFICERS_REQUEST:'FETCH_OFFICERS_REQUEST',
    FETCH_OFFICERS_SUCCESS:'FETCH_OFFICERS_SUCCESS',
    GET_ONE_STEAL_FAIL:'GET_ONE_STEAL_FAIL',
    GET_ONE_STEAL_REQUEST:'GET_ONE_STEAL_REQUEST',
    GET_ONE_STEAL_SUCCESS:'GET_ONE_STEAL_SUCCESS',
    GET_ONE_OFFICER_FAIL:'GET_ONE_OFFICER_FAIL',
    GET_ONE_OFFICER_REQUEST:'GET_ONE_OFFICER_REQUEST',
    GET_ONE_OFFICER_SUCCESS:'GET_ONE_OFFICER_SUCCESS',
    LOG_OUT_SUCCESS:'LOG_OUT_SUCCESS',
    ON_CLICK_MESSAGE_BUTTON:'ON_CLICK_MESSAGE_BUTTON',
    ON_CLICK_MODAL_BUTTON:'ON_CLICK_MODAL_BUTTON',
    SIGN_IN_FAIL:'SIGN_IN_FAIL',
    SIGN_IN_REQUEST:'SIGN_IN_REQUEST',
    SIGN_IN_SUCCESS:'SIGN_IN_SUCCESS',
    SIGN_UP_FAIL:'SIGN_UP_FAIL',
    SIGN_UP_REQUEST:'SIGN_UP_REQUEST',
    SIGN_UP_SUCCESS:'SIGN_UP_SUCCESS',
}

export const signUpRequest = () => {
    return {
      type: ACTIONS.SIGN_UP_REQUEST,
    };
  };
  
  export const signUpSuccess = () => {
    return {
      type: ACTIONS.SIGN_UP_SUCCESS,
    };
  };
  
  export const signUpFail = (error) => {
    return {
      type: ACTIONS.SIGN_UP_FAIL,
      payload: error,
    };
  };


  export const fetchCasesRequest = () => {
    return {
      type: ACTIONS.FETCH_STEALS_REQUEST,
    };
  };
  
  export const fetchCasesSuccess = (data) => {
    return {
      type: ACTIONS.FETCH_STEALS_SUCCESS,
      payload: data,
    };
  };
  
  export const fetchCasesFail = (error) => {
    return {
      type: ACTIONS.FETCH_STEALS_FAIL,
      payload: error,
    };
  };
  
  export const createCaseRequest = () => {
    return {
      type: ACTIONS.CREATE_STEAL_REQUEST,
    };
  };
  
  export const createCaseSuccess = (data) => {
    return {
      type: ACTIONS.CREATE_STEAL_SUCCESS,
      payload: data,
    };
  };
  
  export const createCaseFail = (error) => {
    return {
      type: ACTIONS.CREATE_STEAL_FAIL,
      payload: error,
    };
  };
  
  export const createCasePublicRequest = () => {
    return {
      type: ACTIONS.CREATE_STEAL_PUBLIC_REQUEST,
    };
  };
  
  export const createCasePublicSuccess = (data) => {
    return {
      type: ACTIONS.CREATE_STEAL_PUBLIC_SUCCESS,
      payload: data,
    };
  };
  
  export const createCasePublicFail = (error) => {
    return {
      type: ACTIONS.CREATE_STEAL_PUBLIC_FAIL,
      payload: error,
    };
  };
  
  export const editCaseRequest = () => {
    return {
      type: ACTIONS.EDIT_STEAL_REQUEST,
    };
  };
  
  export const editCaseSuccess = (id, data) => {
    return {
      type: ACTIONS.EDIT_STEAL_SUCCESS,
      payload: {
        id: id,
        status: data.status,
        licenseNumber: data.licenseNumber,
        ownerFullName: data.ownerFullName,
        type: data.type,
        color: data.color === "" ? null : data.color,
        officer: data.officer === "" ? null : data.officer,
        description: data.description === "" ? null : data.description,
        resolution: data.resolution === "" ? null : data.resolution,
      },
    };
  };
  
  export const editCaseFail = (error) => {
    return {
      type: ACTIONS.EDIT_STEAL_FAIL,
      payload: error,
    };
  };
  
  export const deleteCaseRequest = () => {
    return {
      type: ACTIONS.DELETE_STEAL_REQUEST,
    };
  };
  
  export const deleteCaseSuccess = (id) => {
    return {
      type: ACTIONS.DELETE_STEAL_SUCCESS,
      payload: id,
    };
  };
  
  export const deleteCaseFail = (error) => {
    return {
      type: ACTIONS.DELETE_STEAL_FAIL,
      payload: error,
    };
  };
  
  export const getOneCaseRequest = () => {
    return {
      type: ACTIONS.GET_ONE_STEAL_REQUEST,
    };
  };
  
  export const getOneCaseSuccess = (data) => {
    return {
      type: ACTIONS.GET_ONE_STEAL_SUCCESS,
      payload: data,
    };
  };
  
  export const getOneCaseFail = (error) => {
    return {
      type: ACTIONS.GET_ONE_STEAL_FAIL,
      payload: error,
    };
  };
  
  export const fetchOfficersRequest = () => {
    return {
      type: ACTIONS.FETCH_OFFICERS_REQUEST,
    };
  };
  
  export const fetchOfficersSuccess = (data) => {
    return {
      type: ACTIONS.FETCH_OFFICERS_SUCCESS,
      payload: data,
    };
  };
  
  export const fetchOfficersFail = (error) => {
    return {
      type: ACTIONS.FETCH_OFFICERS_FAIL,
      payload: error,
    };
  };
  
  export const deleteOfficerRequest = () => {
    return {
      type: ACTIONS.DELETE_OFFICER_REQUEST,
    };
  };
  
  export const deleteOfficerSuccess = (id) => {
    return {
      type: ACTIONS.DELETE_OFFICER_SUCCESS,
      payload: id,
    };
  };
  
  export const deleteOfficerFail = (error) => {
    return {
      type: ACTIONS.DELETE_OFFICER_FAIL,
      payload: error,
    };
  };
  
  export const getOneOfficerRequest = () => {
    return {
      type: ACTIONS.GET_ONE_OFFICER_REQUEST,
    };
  };
  
  export const getOneOfficerSuccess = (data) => {
    return {
      type: ACTIONS.GET_ONE_OFFICER_SUCCESS,
      payload: data,
    };
  };
  
  export const getOneOfficerFail = (error) => {
    return {
      type: ACTIONS.GET_ONE_OFFICER_FAIL,
      payload: error,
    };
  };
  
  export const editOfficerRequest = () => {
    return {
      type: ACTIONS.EDIT_OFFICER_REQUEST,
    };
  };
  
  export const editOfficerSuccess = (id, data) => {
    return {
      type: ACTIONS.EDIT_OFFICER_SUCCESS,
      payload: {
        id: id,
        firstName: data.firstName === "" ? null : data.firstName,
        lastName: data.lastName === "" ? null : data.lastName,
        approved: data.approved,
      },
    };
  };
  
  export const editOfficerFail = (error) => {
    return {
      type: ACTIONS.EDIT_OFFICER_FAIL,
      payload: error,
    };
  };

  export const signInRequest = () => {
    return {
      type: ACTIONS.SIGN_IN_REQUEST,
    };
  };
  
  export const signInSuccess = (data) => {
    return {
      type: ACTIONS.SIGN_IN_SUCCESS,
      payload: data,
    };
  };
  
  export const signInFail = (error) => {
    return {
      type: ACTIONS.SIGN_IN_FAIL,
      payload: error,
    };
  };
  
  export const logOutSuccess = () => {
    return {
      type: ACTIONS.LOG_OUT_SUCCESS,
    };
  };
