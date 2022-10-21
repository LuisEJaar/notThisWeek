export default function CheckInput(props) {
  return (
    <div className="form-check form-switch">
      <input name={props.name} className="form-check-input" value="true" type="checkbox" id={props.id}/>
      <label className="form-check-label" htmlFor={props.id}>{ props.text }</label>
    </div>
  )
}