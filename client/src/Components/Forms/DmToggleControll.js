import { useFormik, Form } from 'formik'

export default function DmToggleControll({ setEncounterActive, encounterActive, encounter, dmAction, text, sendMessage, setDmTurn, dmTurn }) {
  const urlToggle = `/encounter/${dmAction}/${encounter}`
  const urlEncounter = `/encounter/${encounter}`
  
  const formik = useFormik({
    initialValues: {
      dmTurn: dmTurn, 
      encounterActive: encounterActive
    },
    onSubmit: async () => {
      await fetch(urlToggle, {
        method: 'PUT',
      })
      
      .catch((err) => {
        console.log(err)
      })
      await fetch(urlEncounter)
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

