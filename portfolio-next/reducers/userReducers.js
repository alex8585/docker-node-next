import produce from "immer"
import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  UNSET_LOGIN_USER,
  USER_SET,
} from "../constants/userConstants"

const INITIAL_STATE = {
  loading: false,
  user: null,
  error: null,
  loaded: false,
}
export const userReducer = produce((draft, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      draft.loading = true
      draft.user = null
      break
    case USER_LOGIN_SUCCESS:
      draft.loading = false
      draft.loaded = true
      draft.error = null
      draft.user = action.payload
      break
    case USER_SET:
      draft.loading = false
      draft.loaded = true
      draft.error = null
      draft.user = action.payload
      break
    case USER_LOGIN_FAIL:
      draft.loading = false
      draft.error = action.payload
      break
    case UNSET_LOGIN_USER:
      draft.loading = false
      draft.error = ""
      draft.loaded = false
      draft.user = null
      break
    default:
      break
  }
  return
}, INITIAL_STATE)
