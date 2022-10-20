import { useFormik, Form } from 'formik'

export default function PlayerRolling({roundId, characterTurnId, encounterId, rounds, setRounds, sendMessage}) {
  const actionUrl = `/round/makeRoll/${roundId}/${characterTurnId}`
  const urlEncounter = `/encounter/${encounterId}`
  
  const formik = useFormik({
    initialValues: {
      rounds: rounds, 
    },
    onSubmit: async () => {
      await fetch(actionUrl, {
        method: 'put',
      })
      .catch((err) => {
        console.log(err)
      })

      await fetch(urlEncounter)
      .then((res) => res.json())
      .then((data) => { 
        setRounds(data.rounds)
      })
      .then(sendMessage("rounds"))
      .catch((err) => {
        console.log(err)
      })
    }
  })

  return (
    <Form
      onSubmit={formik.handleSubmit}
    > 
      <button type="submit" className="mx-auto btn btn-primary" value="Upload">Submit</button>
    </Form>
  )
}