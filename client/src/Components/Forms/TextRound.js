import {Form, useFormik, Field} from 'formik'

export default function TextRound({ setRounds, sendMessage, encounterId, userId, characterTurnId }) {
  
  const roundUrl = `/round/createRound/${encounterId}/${userId}/${characterTurnId}`
  
  //Formik items
  const formik = useFormik({
    initialValues: {
      description: "", 
      type: "textRound"
    }, 
    onSubmit: values => {
      fetch(roundUrl, {
        body: JSON.stringify(values),
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(res => res.json())
      .then(json => setRounds(json))
      .then(sendMessage("rounds"))
      .catch((err)=> console.log(err))
    }
  })

  return (
    <div className="modal fade" id="addRound" tabIndex="-1" aria-labelledby="addRoundLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="newRoundLabel">New Round</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <Form
              onSubmit={formik.handleSubmit}
            >
              {/* <!-- Description --> */}
              <div className="form-group mb-3">
                <label htmlFor="encounterDescription">What happens?</label>
                <Field type="hidden" id="type" name="type" value="textRound" />
                <Field as="textarea" onChange={formik.handleChange} value={formik.values.text} type="text" className="form-control" id="encounterDescription" placeholder="Encounter Description" name="description"></Field>
              </div>
              <button data-bs-dismiss="modal" type="submit" className="mx-auto btn btn-primary" value="Upload">Submit</button>
            </Form>
          </div>
        </div>
      </div>
    </div>
  )
}