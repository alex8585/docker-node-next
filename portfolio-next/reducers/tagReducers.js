import produce from "immer"
import {
  TAG_LIST_REQUEST,
  TAG_LIST_SUCCESS,
  TAG_LIST_FAIL,
  SET_ACTIVE_TAGS,
} from "../constants/tagConstants"

const INITIAL_STATE = {
  data: [],
  loading: false,
}
export const tagListReducer = produce((draft, action) => {
  switch (action.type) {
    case SET_ACTIVE_TAGS:
      draft.data = action.payload
      break
    case TAG_LIST_REQUEST:
      draft.loading = true
      draft.data = []
      break
    case TAG_LIST_SUCCESS:
      draft.loading = false
      draft.data = action.payload.data
      draft.page = action.payload.page || null
      draft.total = action.payload.total || null
      draft.perPage = action.payload.perPage || null

      break
    case TAG_LIST_FAIL:
      draft.loading = false
      draft.error = "action.payload"
      break
    default:
      break
  }
  return
}, INITIAL_STATE)
