import { useFormik, Form } from 'formik'

export default function DmToggleControll({ encounter, dmAction, text, sendMessage, setDmTurn, dmTurn }) {
  const urlToggle = `/encounter/${dmAction}/${encounter}`
  const urlEncounter = `/encounter/${encounter}`
  
  const formik = useFormik({
    initialValues: {
      dmTurn: dmTurn
    },
    onSubmit: () => {
      fetch(urlToggle, {
        method: 'PUT',
      })
      .catch((err) => {
        console.log(err)
      })

      fetch(urlEncounter)
      .then((res) => res.json())
      .then((data) => { 
        setDmTurn(data.encounter.dmTurn)
      })
      .then(sendMessage("controls"))
      .catch((err) => {
        console.log(err)
      })
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

