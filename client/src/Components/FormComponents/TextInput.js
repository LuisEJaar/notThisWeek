import React from 'react'
import { Field } from 'formik'

export default function TextInput(props) {
  return (
    <div className="form-group">
      <label className="mt-2" htmlFor={props.id}>{ props.text}</label>
      <Field onChange={props.handleChange} value={props.value} name={props.name} type="text" className="form-control" id={props.id} placeholder={props.placeholder} />
    </div>
  )
}