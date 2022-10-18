import { useFormik, Field, Form } from 'formik'
import CheckDifficulty from '../FormComponents/CheckDifficulty';

export default function SaveCheckRoll ({playerId, characterId, setRounds, character, formId, encounterId }) {
  const roundUrl = `/round/createRound/${encounterId}/${playerId}/${characterId}`
  
  //Formik items
  const formik = useFormik({
    initialValues: {
      rollFor: "str", 
      target: 1,
      type: "rollRound",
      rollCategory: "checkModifiers"
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
      .catch((err) => {
        console.log(err)
      })
    }
  })

  return (
    <div className="modal fade" id={formId} tabIndex="-1" aria-labelledby={formId} aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
           <h5 className="modal-title" id="newRoundLabel">Saving Throw / Ability check for {character}</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <Form
              onSubmit={formik.handleSubmit}
            >
              {/* <!-- Description --> */}
              <div className="form-group mb-3">
                <label htmlFor="encounterDescription">{character} rolls for:</label>
                <select
                  value={formik.values.rollFor}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="form-select"
                  aria-label="Check to roll for"
                  name="rollFor"
                  required
                >
                    <option value="str">Strength</option>
                    <option value="dex">Dexterity</option>
                    <option value="con">Constitution</option>
                    <option value="int">Intelligence</option>
                    <option value="wis">Wisdom</option>
                    <option value="char">Charisma</option>
                </select >
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="rollCategory"
                    value="saveModifiers"
                    id="savingThrow"
                    onChange={formik.handleChange}
                  />
                  <label className="form-check-label" htmlFor="savingThrow">
                    Saving Throw
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="rollCategory"
                    value="checkModifiers"
                    id="abilityCheck"
                    onChange={formik.handleChange}
                    defaultChecked
                  />
                  <label className="form-check-label" htmlFor="abilityCheck">
                    Check
                  </label>
                </div>              
                <label htmlFor="playerTarget">{character} to beat:</label>
                <Field onChange={formik.handleChange} value={formik.values.target} required type="number" className="form-control input" id="playerTarget" name="target" min="1" max="30" />
                <Field  type="hidden" id="type" name="type" value="rollRound" />
                <CheckDifficulty />
              </div>
              <button type="submit" className="mx-auto btn btn-primary" data-bs-dismiss="modal">Submit</button>
            </Form>
          </div>
        </div>
      </div>
    </div>
  )
}