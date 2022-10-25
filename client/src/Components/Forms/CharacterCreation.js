import React from 'react'
import TextInput from '../FormComponents/TextInput'
import NumberInput from '../FormComponents/NumberInput'
import CheckInput from '../FormComponents/CheckInput'
import {Form} from 'formik'

export default function CharacterCreation() {
  return (
  <div className="modal fade" id="createCharacter" tabIndex="-1" aria-labelledby="createCharacterLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="createCharacterLabel">Tell me about yourself traveler</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <Form action="/character/create" encType="multipart/form-data" method="POST">
              <fieldset>
                
                <div className="mt-2">
                    <label htmlFor="imgUpload" className="form-label">Image</label>
                    <input type="file" className="form-control" id="imageUpload" name="file" required/>
                </div>
                
                <legend className='mt-3'>Description:</legend>
                <TextInput id="charName" text="Name:" name="name" placeholder="Name" required/>
                <TextInput id="charClass" text="Class:" name="class" placeholder="Class" required/>
                <NumberInput id="charAge" text="Age:" name="age" placeholder="Age" />
                <TextInput id="charRace" text="Race:" name="race" placeholder="Race" required />
                <TextInput id="charGnd" text="Gender:" name="gender" placeholder="Gender" required />
                <NumberInput id="charLvl" text="Level:" name="lvl" placeholder="Level" required/>
                <NumberInput id="ac" text="Armor Class(ac):" name="ac" placeholder="Armor Class" required/>
              </fieldset>
                
              <fieldset className="mt-3">
              <legend>Ability Scores</legend>
                <NumberInput id="str" text="Strength:" name="str" placeholder="str" min="0" max="30" required/>
                <NumberInput id="dex" text="Dexterity:" name="dex" placeholder="dex" min="0" max="30" required/>
                <NumberInput id="con" text="Constitution:" name="con" placeholder="con" min="0" max="30" required />
                <NumberInput id="int" text="Intelligence:" name="int" placeholder="int" min="0" max="30" required/>
                <NumberInput id="wis" text="Wisdom:" name="wis" placeholder="wis" min="0" max="30" required/>
                <NumberInput id="char" text="Charisma:" name="char" placeholder="char" min="0" max="30" required/>
              </fieldset>

              <fieldset className="mt-3">
                <legend>Save Proficiences:</legend>
                <CheckInput name="strSave" id="strSave" text="str" />
                <CheckInput name="dexSave" id="dexSave" text="dex" />
                <CheckInput name="conSave" id="conSave" text="con" />
                <CheckInput name="intSave" id="intSave" text="int" />
                <CheckInput name="wisSave" id="wisSave" text="wis" />
                <CheckInput name="charSave" id="charSave" text="char" />
              </fieldset>

              <fieldset className="mt-3">
                <legend>Proficiences:</legend>
                  <CheckInput name="acrobatics" id="acrobatics" text="Acrobatics" />
                  <CheckInput name="animalHandling" id="AnimalHandling" text="AnimalHandling" />
                  <CheckInput name="arcana" id="arcana" text="Arcana" />
                  <CheckInput name="athletics" id="athletics" text="Athletics" />
                  <CheckInput name="deception" id="deception" text="Deception" />
                  <CheckInput name="history" id="history" text="History" />
                  <CheckInput name="insight" id="insight" text="Insight" />
                  <CheckInput name="intimidation" id="intimidation" text="Intimidation" />
                  <CheckInput name="investigation" id="investigation" text="Investigation" />
                  <CheckInput name="medicine" id="medicine" text="Medicine" />
                  <CheckInput name="nature" id="nature" text="Nature" />
                  <CheckInput name="perception" id="perception" text="Perception" />
                  <CheckInput name="performance" id="performance" text="Performance" />
                  <CheckInput name="persuasion" id="persuasion" text="Persuasion" />
                  <CheckInput name="religion" id="religion" text="Religion" />
                  <CheckInput name="sleightOfHand" id="sleightOfHand" text="SleightOfHand" />
                  <CheckInput name="stealth" id="stealth" text="Stealth" />
                  <CheckInput name="survival" id="survival" text="Survival" />
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

