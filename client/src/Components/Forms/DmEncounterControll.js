import { useFormik, Form } from 'formik'

export default function DmEncounterControll({ encounter, dmAction, text, sendMessage, setDmTurn, dmTurn }) {
  const url = `/encounter/${dmAction}/${encounter}`
  
  const formik = useFormik({
    initialValues: {
      dmTurn: dmTurn
    },
    onSubmit: () => {
      fetch(url, {
        method: 'PUT',
      })
      .then(  
        setDmTurn(!dmTurn)
      ) 
      .then(sendMessage("controls")) 
    }
  })

  return (
    <Form
      onSubmit={formik.handleSubmit}
      className="ms-3"
    >
      <button className="btn btn-warning"  type="submit">{ text }</button>
    </Form> 
  )
}

