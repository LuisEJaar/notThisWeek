import { useFormik, Field, Form } from 'formik'
import CheckDifficulty from '../FormComponents/CheckDifficulty';

export default function SkillRoll ({sendMessage, playerId, characterId, setRounds, character, formId, encounterId }) {
  const roundUrl = `/round/createRound/${encounterId}/${playerId}/${characterId}`
  
  //Formik items
  const formik = useFormik({
    initialValues: {
      rollFor: "acrobatics", 
      target: 1,
      rollCategory: "skillModifiers",
      type: "rollRound",
    }, 
    onSubmit: async values => {
      await fetch(roundUrl, {
        body: JSON.stringify(values),
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(res => res.json())
      .then(json => setRounds(json))
      .then(sendMessage("rounds"))
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
           <h5 className="modal-title" id="newRoundLabel">Skill roll for {character}</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <Form
              onSubmit={formik.handleSubmit}
            >
              {/* <!-- Description --> */}
              <div className="form-group mb-3">
                  <label htmlFor="encounterDescription">{character} rolls for:</label>
                  <select value={formik.values.rollFor} onChange={formik.handleChange} select="select" className="form-select" aria-label="Skill to roll for" name="rollFor" required>
                    <option value="acrobatics">Acrobatics</option>
                    <option value="animalHandling">Animal Handling</option>
                    <option value="arcana">Arcana</option>
                    <option value="athletics">Athletics</option>
                    <option value="deception">Deception</option>
                    <option value="history">History</option>
                    <option value="insight">Insight</option>
                    <option value="intimidation">Intimidation</option>
                    <option value="investigation">Investigation</option>
                    <option value="medicine">Medicine</option>
                    <option value="nature">Nature</option>
                    <option value="perception">Perception</option>
                    <option value="performance">Performance</option>
                    <option value="persuasion">Persuasion</option>
                    <option value="religion">Religion</option>
                    <option value="sleightOfHand">Sleight Of Hand</option>
                    <option value="stealth">Stealth</option>
                    <option value="survival">Survival</option>
                  </select >
                <label htmlFor="playerTarget">{character} to beat:</label>
                <Field onChange={formik.handleChange} value={formik.values.target} required type="number" className="form-control input" id="playerTarget" name="target" min="1" max="30" />
                <Field  type="hidden" id="type" name="type" value="rollRound" />
                <Field  type="hidden" id="type" name="rollCategory" value="skillModifiers" />
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