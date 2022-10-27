export default function CheckInput(props) {
  return (
    <div className="form-check form-switch">
      <div
        value={props.values.target}
        checked={ props.values.target === true}
        name={props.name}
        onChange={(event, checked) => {
          props.setFieldValue(props.name, checked ? true : false);
        }}
        className="form-check-input"
        type="checkbox"
        id={props.id}
      />
      <label className="form-check-label" htmlFor={props.id}>{ props.text }</label>
    </div>
  )
}