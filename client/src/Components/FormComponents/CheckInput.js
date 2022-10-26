import { Field } from 'formik'

export default function CheckInput(props) {
  return (
    <div className="form-check form-switch">
      <Field value={props.formik.values.target} name={props.name} onChange={props.formik.handleChange} className="form-check-input" type="checkbox" id={props.id}/>
      <label className="form-check-label" htmlFor={props.id}>{ props.text }</label>
    </div>
  )
}