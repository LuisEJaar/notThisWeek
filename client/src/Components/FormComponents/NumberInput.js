import { Field} from 'formik'

export default function NumberInput(props) {
  return (
    <div className="form-group">
      <label className="mt-2" htmlFor={props.id}>{ props.text }</label>
      <Field onChange={props.handleChange} min={(props.min || 0)} max={(props.max || 1000)} name={props.name} type="number" className="form-control" id={props.id} placeholder={props.placeholder}/>
    </div>
  )
}