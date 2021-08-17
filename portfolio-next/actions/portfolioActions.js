import {
  PORTFOLIO_LIST_REQUEST,
  PORTFOLIO_LIST_SUCCESS,
  PORTFOLIO_LIST_FAIL,
} from "../constants/portfolioConstants"

import {
  getList,
  createPortfolio,
  deletePortfolioRequest,
  editPortfolioRequest,
} from "../providers/portfoliosProvider.js"

export const setPortfolios =
  (portfolios, perPage, total) => async (dispatch) => {
    dispatch({
      type: PORTFOLIO_LIST_SUCCESS,
      payload: {
        page: 1,
        data: portfolios,
        total,
        perPage,
      },
    })
  }

export const getPortfolios =
  (page, perPage, direction, order, filter) => async (dispatch) => {
    try {
      dispatch({ type: PORTFOLIO_LIST_REQUEST })
      let data = await getList(page, perPage, direction, order, filter)

      dispatch({
        type: PORTFOLIO_LIST_SUCCESS,
        payload: data,
      })
    } catch (error) {
      console.log(error)
      dispatch({
        type: PORTFOLIO_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

export const listPortfolios =
  (page = "", perPage = "", tags = []) =>
  async (dispatch) => {
    let tagsIds = tags.filter((tag) => tag.active).map((tag) => tag.id)

    let filter = {}
    if (tagsIds.length) {
      filter = { tags: tagsIds.join(",") }
    }

    try {
      dispatch({ type: PORTFOLIO_LIST_REQUEST })

      let data = await getList(page, perPage, "", "", filter)

      dispatch({
        type: PORTFOLIO_LIST_SUCCESS,
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: PORTFOLIO_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

export const createNewPortfolio = (values) => async (dispatch) => {
  try {
    let res = await createPortfolio(values)
    return res
  } catch (error) {
    dispatch({
      type: PORTFOLIO_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const editPortfolio = (values) => async (dispatch) => {
  try {
    let res = await editPortfolioRequest(values)
    return res
  } catch (error) {
    dispatch({
      type: PORTFOLIO_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
export const deletePortfolio = (id) => async (dispatch) => {
  try {
    let res = await deletePortfolioRequest(id)
    return res
  } catch (error) {
    dispatch({
      type: PORTFOLIO_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
