import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setUser } from "../actions/userActions"

export default function useUser() {
  const {
    user,
    loaded: userLoaded,
    error,
    loading,
  } = useSelector((state) => state.user)
  const dispatch = useDispatch()

  useEffect(async () => {
    if (!userLoaded) {
      dispatch(setUser())
    }
  }, [dispatch, userLoaded])

  return [user, userLoaded, error, loading]
}
