import { useFormik, Form } from 'formik'

export default function PlayerRolling({roundId, characterTurnId, rounds, setRounds, sendMessage}) {
  const actionUrl = `/round/makeRoll/${roundId}/${characterTurnId}`
  
  const formik = useFormik({
    initialValues: {
      rounds: rounds, 
    },
    onSubmit: () => {
      fetch(actionUrl, {
        method: 'put',
      })
      .then((res) => res.json())
      .then((data) => setRounds(data.rounds))
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