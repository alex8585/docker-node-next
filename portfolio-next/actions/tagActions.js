import {
  getList,
  createTag,
  deleteTagRequest,
  editTagRequest,
} from "../providers/tagsProvider.js"

import {
  TAG_LIST_SUCCESS,
  SET_ACTIVE_TAGS,
  TAG_LIST_REQUEST,
  TAG_LIST_FAIL,
} from "../constants/tagConstants"

export const filterByTags = (tags) => (dispatch) => {
  dispatch({
    type: SET_ACTIVE_TAGS,
    payload: tags,
  })
}

export const setTags = (data, total) => async (dispatch) => {
  if (!data) return
  await dispatch({
    type: TAG_LIST_SUCCESS,
    payload: {
      data: data,
      total,
    },
  })
}

export const getTags =
  (page = 1, perPage = 5, direction = "", order = "", filter = {}) =>
  async (dispatch) => {
    try {
      dispatch({ type: TAG_LIST_REQUEST })
      let data = await getList(page, perPage, direction, order, filter)
      dispatch({
        type: TAG_LIST_SUCCESS,
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: TAG_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

export const createNewTag = (values) => async (dispatch) => {
  try {
    let res = await createTag(values)
    return res
  } catch (error) {
    dispatch({
      type: TAG_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const deleteTag = (id) => async (dispatch) => {
  try {
    let res = await deleteTagRequest(id)
    return res
  } catch (error) {
    dispatch({
      type: TAG_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const editTag = (tag) => async (dispatch) => {
  try {
    let newTag = {
      id: tag.id,
      name: tag.name,
    }
    let res = await editTagRequest(newTag)
    return res
  } catch (error) {
    dispatch({
      type: TAG_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
