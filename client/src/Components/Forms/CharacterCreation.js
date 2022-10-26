import React from 'react'
import TextInput from '../FormComponents/TextInput'
import NumberInput from '../FormComponents/NumberInput'
import CheckInput from '../FormComponents/CheckInput'
import {Form, useFormik} from 'formik'

export default function CharacterCreation() {

  const actionUrl = `/api/character/create`
  
  const formik = useFormik({
    initialValues: {
      // rounds: rounds, 
    },
    onSubmit: () => {
      fetch(actionUrl, {
        method: 'post',
        encType: "multipart/form-data"
      })
      .then((res) => res.json())
      // .then((data) => setRounds(data.rounds))
      // .then(sendMessage("rounds"))
      .catch((err) => {
        console.log(err)
      })
    }
  })

  return (
  <div className="modal fade" id="createCharacter" tabIndex="-1" aria-labelledby="createCharacterLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="createCharacterLabel">Tell me about yourself traveler</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
            <Form
              onSubmit={formik.handleSubmit}
            >
              <fieldset>
                
                <div className="mt-2">
                    <label htmlFor="imgUpload" className="form-label">Image</label>
                    <input type="file" className="form-control" id="imageUpload" name="file" required/>
                </div>
                
                <legend className='mt-3'>Description:</legend>
                <TextInput formik={formik} id="charName" text="Name:" name="name" placeholder="Name" required/>
                <TextInput formik={formik} id="charClass" text="Class:" name="class" placeholder="Class" required/>
                <NumberInput formik={formik} id="charAge" text="Age:" name="age" placeholder="Age" />
                <TextInput formik={formik} id="charRace" text="Race:" name="race" placeholder="Race" required />
                <TextInput formik={formik} id="charGnd" text="Gender:" name="gender" placeholder="Gender" required />
                <NumberInput formik={formik} id="charLvl" text="Level:" name="lvl" placeholder="Level" required/>
                <NumberInput formik={formik} id="ac" text="Armor Class(ac):" name="ac" placeholder="Armor Class" required/>
              </fieldset>
                
              <fieldset className="mt-3">
              <legend>Ability Scores</legend>
                <NumberInput formik={formik} id="str" text="Strength:" name="str" placeholder="str" min="0" max="30" required/>
                <NumberInput formik={formik} id="dex" text="Dexterity:" name="dex" placeholder="dex" min="0" max="30" required/>
                <NumberInput formik={formik} id="con" text="Constitution:" name="con" placeholder="con" min="0" max="30" required />
                <NumberInput formik={formik} id="int" text="Intelligence:" name="int" placeholder="int" min="0" max="30" required/>
                <NumberInput formik={formik} id="wis" text="Wisdom:" name="wis" placeholder="wis" min="0" max="30" required/>
                <NumberInput formik={formik} id="char" text="Charisma:" name="char" placeholder="char" min="0" max="30" required/>
              </fieldset>

              <fieldset className="mt-3">
                <legend>Save Proficiences:</legend>
                <CheckInput formik={formik} name="strSave" id="strSave" text="str" />
                <CheckInput formik={formik} name="dexSave" id="dexSave" text="dex" />
                <CheckInput formik={formik} name="conSave" id="conSave" text="con" />
                <CheckInput formik={formik} name="intSave" id="intSave" text="int" />
                <CheckInput formik={formik} name="wisSave" id="wisSave" text="wis" />
                <CheckInput formik={formik} name="charSave" id="charSave" text="char" />
              </fieldset>

              <fieldset className="mt-3">
                <legend>Proficiences:</legend>
                  <CheckInput formik={formik} name="acrobatics" id="acrobatics" text="Acrobatics" />
                  <CheckInput formik={formik} name="animalHandling" id="AnimalHandling" text="AnimalHandling" />
                  <CheckInput formik={formik} name="arcana" id="arcana" text="Arcana" />
                  <CheckInput formik={formik} name="athletics" id="athletics" text="Athletics" />
                  <CheckInput formik={formik} name="deception" id="deception" text="Deception" />
                  <CheckInput formik={formik} name="history" id="history" text="History" />
                  <CheckInput formik={formik} name="insight" id="insight" text="Insight" />
                  <CheckInput formik={formik} name="intimidation" id="intimidation" text="Intimidation" />
                  <CheckInput formik={formik} name="investigation" id="investigation" text="Investigation" />
                  <CheckInput formik={formik} name="medicine" id="medicine" text="Medicine" />
                  <CheckInput formik={formik} name="nature" id="nature" text="Nature" />
                  <CheckInput formik={formik} name="perception" id="perception" text="Perception" />
                  <CheckInput formik={formik} name="performance" id="performance" text="Performance" />
                  <CheckInput formik={formik} name="persuasion" id="persuasion" text="Persuasion" />
                  <CheckInput formik={formik} name="religion" id="religion" text="Religion" />
                  <CheckInput formik={formik} name="sleightOfHand" id="sleightOfHand" text="SleightOfHand" />
                  <CheckInput formik={formik} name="stealth" id="stealth" text="Stealth" />
                  <CheckInput formik={formik} name="survival" id="survival" text="Survival" />
              </fieldset>

              <div className="d-flex flex-column">
                <button className="btn btn-success mt-5" type="submit">Adventure awaits</button>
              </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
  )
}

