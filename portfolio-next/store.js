// export const wrapper = createWrapper(initStore)
import { useMemo } from "react"
import { createStore, applyMiddleware, combineReducers } from "redux"
import { HYDRATE, createWrapper } from "next-redux-wrapper"
import thunkMiddleware from "redux-thunk"
import { portfolioListReducer } from "./reducers/portfolioReducers"
import { tagListReducer } from "./reducers/tagReducers"
import { userReducer } from "./reducers/userReducers"

const bindMiddleware = (middleware) => {
  if (process.env.NODE_ENV !== "production") {
    const { composeWithDevTools } = require("redux-devtools-extension")
    return composeWithDevTools(applyMiddleware(...middleware))
  }
  return applyMiddleware(...middleware)
}

const combinedReducer = combineReducers({
  tagList: tagListReducer,
  portfolioList: portfolioListReducer,
  user: userReducer,
})

const reducer = (state, action) => {
  if (action.type === HYDRATE) {
    //console.log(action.payload)
    const nextState = {
      ...state, // use previous state
      ...action.payload, // apply delta from hydration
    }
    //    if (state.count.count) nextState.count.count = state.count.count // preserve count value on client side navigation
    return nextState
  } else {
    return combinedReducer(state, action)
  }
}

export const useStore = () => {
  return createStore(reducer, bindMiddleware([thunkMiddleware]))
}

// export function useStore(initialState) {
//   const store = useMemo(() => initializeStore(initialState), [initialState])
//   return store
// }
export const wrapper = createWrapper(useStore)
