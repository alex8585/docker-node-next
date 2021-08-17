import { useState, useEffect } from "react"

export default function useFormValues(initialState) {
  const [values, setValues] = useState(initialState)

  function handleChange(e) {
    const key = e.target.name
    const value = e.target.value
    setValues((values) => ({
      ...values,
      [key]: value,
    }))
  }

  function resetFormValues() {
    setValues((values) => ({
      ...initialState,
    }))
  }

  return [values, handleChange, setValues, resetFormValues]
}
