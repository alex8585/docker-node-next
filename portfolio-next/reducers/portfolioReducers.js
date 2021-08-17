import produce from "immer"
import {
  PORTFOLIO_LIST_REQUEST,
  PORTFOLIO_LIST_SUCCESS,
  PORTFOLIO_LIST_FAIL,
} from "../constants/portfolioConstants"
const INITIAL_STATE = {
  data: [],
  loading: false,
}
export const portfolioListReducer = produce((draft, action) => {
  switch (action.type) {
    case PORTFOLIO_LIST_REQUEST:
      draft.loading = true
      draft.data = []
      break
    case PORTFOLIO_LIST_SUCCESS:
      draft.loading = false
      draft.data = action.payload.data
      //draft.pages = action.payload.pages
      draft.page = action.payload.page || null
      draft.total = action.payload.total || null
      draft.perPage = action.payload.perPage || null
      break
    case PORTFOLIO_LIST_FAIL:
      draft.loading = false
      draft.error = action.payload
      break
    default:
      return
  }
}, INITIAL_STATE)
