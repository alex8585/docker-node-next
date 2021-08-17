import { login } from "../providers/userProvider"

import { getUserFromLocalStorage } from "../utils/utils"
import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  UNSET_LOGIN_USER,
  USER_SET,
} from "../constants/userConstants"

export const loginAttempt = (values) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST })

    const { email, password } = values

    let { data } = await login(email, password)

    if (!data.login.error) {
      let user = data.login
      localStorage.setItem("user", JSON.stringify(user))

      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: data.login,
      })
    } else {
      dispatch({
        type: USER_LOGIN_FAIL,
        payload: data.login.error,
      })
    }
  } catch (error) {
    let msg = ""
    if (typeof error === "string") {
      msg = error
    } else {
      msg =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    }

    dispatch({
      type: USER_LOGIN_FAIL,
      payload: msg,
    })
  }
}

export const setUser = () => async (dispatch) => {
  let user = getUserFromLocalStorage()
  dispatch({
    type: USER_SET,
    payload: user,
  })
}

export const unsetUser = () => async (dispatch) => {
  dispatch({
    type: UNSET_LOGIN_USER,
  })
}
