import Form from 'react-bootstrap/Form';

export default function CheckInput(props) {
  return (
    <div className="">
      <Form.Check
        value={props.value}
        name={props.name}
        onChange={(event, checked) => {
          props.setFieldValue(props.value, checked ? true : false);
        }}
        type="switch"
        id={props.id}
      />
      <label className="form-check-label" htmlFor={props.id}>{ props.text }</label>
    </div>
  )
}