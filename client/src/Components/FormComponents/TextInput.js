import React from 'react'

export default function TextInput(props) {
  return (
    <div className="form-group">
      <label className="mt-2" htmlFor={props.id}>{ props.text}</label>
      <input name={props.name} type="text" className="form-control" id={props.id} placeholder={props.placeholder} />
    </div>
  )
}