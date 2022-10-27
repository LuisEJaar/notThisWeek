import React from 'react'
import TextInput from '../FormComponents/TextInput'
import NumberInput from '../FormComponents/NumberInput'
import CheckInput from '../FormComponents/CheckInput'
import {Formik} from 'formik'

export default function CharacterCreation() {

  const actionUrl = `/api/character/create`

  return (
  <div className="modal fade" id="createCharacter" tabIndex="-1" aria-labelledby="createCharacterLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="createCharacterLabel">Tell me about yourself traveler</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
            <Formik
              initialValues={{
                file: "",
                
                name: "",
                class: "",
                age: "",
                race: "",
                gender: "",
                lvl: "",
                ac: "",

                str: "",
                dex: "",
                con: "",
                int: "",
                wis: "",
                char: "",

                strSave: "",
                dexSave: "",
                conSave: "",
                intSave: "",
                wisSave: "",
                charSave: "",

                acrobatics: "",
                animalHandling: "",
                arcana: "",
                athletics: "",
                deception: "",
                history: "",
                insight: "",
                intimidation: "",
                investigation: "",
                medicine: "",
                nature: "",
                perception: "",
                performance: "",
                persuasion: "",
                religion: "",
                sleightOfHand: "",
                stealth: "",
                survival: "",
              }}
              onSubmit={ (values) => {
                  fetch(actionUrl, {
                    method: 'post',
                    encType: "multipart/form-data",
                  })
                    .then((res) => res.json())
                    // .then((data) => setRounds(data.rounds))
                    // .then(sendMessage("rounds"))
                    .catch((err) => {
                      console.log(err)
                    })
                }} 
            >
              {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  setFieldValue,
                  isSubmitting,
                  props
                }) => (
                <form
                  onSubmit={handleSubmit}
                >
                  <fieldset>
                    
                    <div className="mt-2">
                        <label htmlFor="imgUpload" className="form-label">Image</label>
                        <input type="file" className="form-control" id="imageUpload" name="file" required/>
                    </div>
                    
                    <legend className='mt-3'>Description:</legend>
                    <TextInput handleChange={handleChange} value={values.name} id="charName" text="Name:" name="name" placeholder="Name" required/>
                    <TextInput handleChange={handleChange} value={values.class} id="charClass" text="Class:" name="class" placeholder="Class" required/>
                    <NumberInput handleChange={handleChange} id="charAge" text="Age:" name="age" placeholder="Age" />
                    <TextInput handleChange={handleChange} value={values.race}  id="charRace" text="Race:" name="race" placeholder="Race" required />
                    <TextInput handleChange={handleChange} value={values.gender} id="charGnd" text="Gender:" name="gender" placeholder="Gender" required />
                    <NumberInput handleChange={handleChange} id="charLvl" text="Level:" name="lvl" placeholder="Level" required/>
                    <NumberInput handleChange={handleChange} id="ac" text="Armor Class(ac):" name="ac" placeholder="Armor Class" required/>
                  </fieldset>
                    
                  <fieldset className="mt-3">
                  <legend>Ability Scores</legend>
                    <NumberInput handleChange={handleChange} id="str" text="Strength:" name="str" placeholder="str" min="0" max="30" required/>
                    <NumberInput handleChange={handleChange} id="dex" text="Dexterity:" name="dex" placeholder="dex" min="0" max="30" required/>
                    <NumberInput handleChange={handleChange} id="con" text="Constitution:" name="con" placeholder="con" min="0" max="30" required />
                    <NumberInput handleChange={handleChange} id="int" text="Intelligence:" name="int" placeholder="int" min="0" max="30" required/>
                    <NumberInput handleChange={handleChange} id="wis" text="Wisdom:" name="wis" placeholder="wis" min="0" max="30" required/>
                    <NumberInput handleChange={handleChange} id="char" text="Charisma:" name="char" placeholder="char" min="0" max="30" required/>
                  </fieldset>

                  <fieldset className="mt-3">
                    <legend>Save Proficiences:</legend>
                    <CheckInput setFieldValue={setFieldValue} value={props.strSave} name="strSave" id="strSave" text="str" />
                    <CheckInput setFieldValue={setFieldValue} value={props.dexSave} name="dexSave" id="dexSave" text="dex" />
                    <CheckInput setFieldValue={setFieldValue} value={props.conSave} name="conSave" id="conSave" text="con" />
                    <CheckInput setFieldValue={setFieldValue} value={props.intSave} name="intSave" id="intSave" text="int" />
                    <CheckInput setFieldValue={setFieldValue} value={props.wisSave} name="wisSave" id="wisSave" text="wis" />
                    <CheckInput setFieldValue={setFieldValue} value={props.charSave} name="charSave" id="charSave" text="char" />
                  </fieldset>

                  <fieldset className="mt-3">
                    <legend>Proficiences:</legend>
                      <CheckInput setFieldValue={setFieldValue} value={props.acrobatics} name="acrobatics" id="acrobatics" text="Acrobatics" />
                      <CheckInput setFieldValue={setFieldValue} value={props.animalHandling} name="animalHandling" id="AnimalHandling" text="AnimalHandling" />
                      <CheckInput setFieldValue={setFieldValue} value={props.arcana} name="arcana" id="arcana" text="Arcana" />
                      <CheckInput setFieldValue={setFieldValue} value={props.athletics} name="athletics" id="athletics" text="Athletics" />
                      <CheckInput setFieldValue={setFieldValue} value={props.deception} name="deception" id="deception" text="Deception" />
                      <CheckInput setFieldValue={setFieldValue} value={props.history} name="history" id="history" text="History" />
                      <CheckInput setFieldValue={setFieldValue} value={props.insight} name="insight" id="insight" text="Insight" />
                      <CheckInput setFieldValue={setFieldValue} value={props.intimidation} name="intimidation" id="intimidation" text="Intimidation" />
                      <CheckInput setFieldValue={setFieldValue} value={props.investigation} name="investigation" id="investigation" text="Investigation" />
                      <CheckInput setFieldValue={setFieldValue} value={props.medicine} name="medicine" id="medicine" text="Medicine" />
                      <CheckInput setFieldValue={setFieldValue} value={props.nature} name="nature" id="nature" text="Nature" />
                      <CheckInput setFieldValue={setFieldValue} value={props.perception} name="perception" id="perception" text="Perception" />
                      <CheckInput setFieldValue={setFieldValue} value={props.performance} name="performance" id="performance" text="Performance" />
                      <CheckInput setFieldValue={setFieldValue} value={props.persuasion} name="persuasion" id="persuasion" text="Persuasion" />
                      <CheckInput setFieldValue={setFieldValue} value={props.religion} name="religion" id="religion" text="Religion" />
                      <CheckInput setFieldValue={setFieldValue} value={props.sleightOfHand} name="sleightOfHand" id="sleightOfHand" text="SleightOfHand" />
                      <CheckInput setFieldValue={setFieldValue} value={props.stealth} name="stealth" id="stealth" text="Stealth" />
                      <CheckInput setFieldValue={setFieldValue} value={props.survival} name="survival" id="survival" text="Survival" />
                  </fieldset>

                  <div className="d-flex flex-column">
                    <button className="btn btn-success mt-5" type="submit">Adventure awaits</button>
                  </div>
                  </form>
              )}
            </Formik>
            </div>
          </div>
        </div>
      </div>
  )
}

