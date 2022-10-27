import Form from 'react-bootstrap/Form';

export default function CheckInput(props) {
  return (
    <div className="form-check form-switch">
      <Form.Check
        value="false"
        name={props.name}
        onChange={(event, checked) => {
          props.setFieldValue(props.value, checked ? true : false);
        }}
        className="form-check-input"
        type="switch"
        id={props.id}
      />
      <label className="form-check-label" htmlFor={props.id}>{ props.text }</label>
    </div>
  )
}