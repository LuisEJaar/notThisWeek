import { useFormik, Form } from 'formik'

export default function DmToggleControll({ setEncounterActive, encounterActive, encounter, dmAction, text, sendMessage, setDmTurn, dmTurn }) {
  const urlToggle = `/api/encounter/${dmAction}/${encounter}`
  
  const formik = useFormik({
    initialValues: { 
      dmTurn: dmTurn, 
      encounterActive: encounterActive
    },
    onSubmit: () => {
      fetch(urlToggle, {
        method: 'PUT', 
      })
      .then((res) => res.json())
      .then((data) => { 
        setDmTurn(data.encounter.dmTurn)
        setEncounterActive(data.encounter.active)
      })
      .then(sendMessage("controls"))
      .catch((err) => {
        console.log(err)
      })
    }
  })

  return (
    <>
      <Form
        onSubmit={formik.handleSubmit}
        className="ms-3"
      >
        <button className="btn btn-warning"  type="submit">{ text }</button>
      </Form> 
    </>
  )
}

