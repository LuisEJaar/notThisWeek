
import { useFormik, Form } from 'formik'

export default function NextPlayer({ encounterId, setCharacterTurn, characterTurn, sendMessage}) {
  const url = `/encounter/progressEncounter/${encounterId}`
  const urlEncounter = `/encounter/${encounterId}`

  const formik = useFormik({
    initialValues: {
      characterTurn: characterTurn
    },
    onSubmit: () => {
      fetch(url, {
        method: 'PUT',
      })
      .catch((err) => {
        console.log(err)
      })

      fetch(urlEncounter)
      .then((res) => res.json())
      .then((data) => { 
        setCharacterTurn(data.characterTurn)
      })
      .then(sendMessage("controls"))
      .catch((err) => {
        console.log(err)
      })
    }
  })


  return (
    <Form
      className="m-3"
      onSubmit={formik.handleSubmit}
    >
      <button className="btn btn-warning" type="submit">Next Character</button>
    </Form>
  )
}