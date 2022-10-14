
import React from 'react'
import { useParams, Link } from 'react-router-dom'
import Header from "../Components/Header"
import Footer from "../Components/Footer"

export default function Character() {
  const [data, setData] = React.useState(null)

  const { id } = useParams()
  const url = `/userProfile/${id}`

  React.useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data)=> setData(data))
  }, [url, id]);
  
  console.log(data)

  return (
    <>
      <Header page="else" />
      <div class="m-2">
        <a class="btn btn-primary shadow" href="/userProfile/<%= character.user%>">User Profile</a>
        <% if(character.game) {%>
          <a class="btn btn-primary shadow" href="/post/<%= character.game%>">Active game</a>
        <%}%>
      </div>
      <div class="container">
        <img class="img-fluid rounded profileGame" src="<%= character.image%>">
        <h2><%= character.name%></h2> 
        <h3>Lvl: <%= character.lvl%> Class: <%= character.class %></h3>
        <h3>Age:</h3>
        <span><%= character.age %></span>
        <h3>Race:</h3>
        <span><%= character.race %></span>
        <h3>Gender:</h3>
        <span><%= character.gender%></span>
        <h3>AC:</h3>
        <span><%= character.ac%></span>
        <h3>Money:</h3>
          <table>
            <tr>
              <th>Coin:</th>
              <th>Qty:</th>
            </tr>
            <% for(const currency in character.currency){%>
              <tr>
                <td><%= currency %></td>
                <td><%= character.currency[currency] %></td>
              </tr>
            <%}%>
          </table>
        <div class="mt-3">
          <h2>Character Attributes:</h2>
          <ul>
            <% for(const ability in character.abilities){%>
              <li><%= ability%>: <%= character.abilities[ability]%></li>
            <%}%>
          </ul>
        </div>
        <div class="container mt-3">
          <h2>Saving Throw Modifiers:</h2>
          <table>
            <tr>
              <th>Prof</th>
              <th>Throw</th>
              <th>Modifier</th>
            </tr>
            <% for(const sThrow in character.saveModifiers){%>
              <tr>
                <td><% if(character.saveProficiencies[sThrow]) {%>
                  <i class="bi-circle-fill"></i>
                <%} else {%>
                  <i class="bi-circle"></i>
                <%}%></td>
                <td><%= sThrow %></td>
                <td><% if(character.saveModifiers[sThrow] > -1) {%>
                  +<%= character.saveModifiers[sThrow]%>
                <%} else {%>
                  <%= character.saveModifiers[sThrow]%>
                <%} %></td>
              </tr>
            <%}%>
          </table>
        </div>
        <div class="container mt-3">
          <h2>Character Skills</h2>
          <table>
            <tr>
              <th>Prof</th>
              <th>Skill</th>
              <th>Modifier</th>
            </tr>
            <% for(const skill in character.skillProficiencies){%>
              <tr>
                <td><% if(character.skillProficiencies[skill]) {%>
                  <i class="bi-circle-fill"></i>
                <%} else {%>
                  <i class="bi-circle"></i>
                <%}%></td>
                <td><%= skill%></td>
                <% if(character.skillModifiers[skill] > -1){%>
                  <td> +<%= character.skillModifiers[skill]%></td>
                <%} else {%>
                  <td> <%= character.skillModifiers[skill]%></td>
                <%} %>
              </tr>
            <%}%>
          </table>
        </div>
      </div>

      <!-- Create Character -->
      <div class="modal fade" id="createCharacter" tabindex="-1" aria-labelledby="createCharacterLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="createCharacterLabel">Tell me about yourself traveler</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <form action="/character/create" enctype="multipart/form-data" method="POST">
                <fieldset>
                  <div class="mb-3">
                    <label for="imgUpload" class="form-label">Image</label>
                    <input type="file" class="form-control" id="imageUpload" name="file" required>
                  </div>
                  <legend>Description:</legend>
                  <div class="form-group">
                    <label class="mt-2" for="charName">Name:</label>
                    <input name="name" type="text" class="form-control" id="charName" placeholder="Name" required>
                  </div>

                  <div class="form-group">
                    <label class="mt-2" for="charClass">Class:</label>
                    <input name="class" type="text" class="form-control" id="charClass" placeholder="Class" required>
                  </div>

                  <div class="form-group">
                    <label class="mt-2" for="charAge">Age:</label>
                    <input name="age" type="number" class="form-control" id="charAge" placeholder="Age" required>
                  </div>

                  <div class="form-group">
                    <label class="mt-2" for="charRace">Race:</label>
                    <input name="race" type="text" class="form-control" id="charRace" placeholder="Race" required>
                  </div>
          
                  <div class="form-group">
                    <label class="mt-2" for="charGnd">Gender:</label>
                    <input name="gender" type="text" class="form-control" id="charGnd" placeholder="Gender" required>
                  </div>

                  <div class="form-group">
                    <label class="mt-2" for="charLvl">Level:</label>
                    <input name="lvl" type="number" class="form-control" id="charLvl" placeholder="Level" required>
                  </div>

                  <div class="form-group">
                    <label class="mt-2" for="charLvl">Armor Class(ac):</label>
                    <input name="ac" type="number" class="form-control" id="ac" placeholder="Armor Class" required>
                  </div>
                </fieldset>
                
                <fieldset class="mt-3">
                  <legend>Ability Scores</legend>
                  <div class="form-group">
                    <label for="str">Strength:</label>
                    <input name="str" type="number" class="form-control" id="str" placeholder="str" required>
                  </div>
                  <div class="form-group">
                    <label class="mt-2" for="dex">Dexterity:</label>
                    <input name="dex" type="number" class="form-control" id="dex" placeholder="dex" required>
                  </div>
                  <div class="form-group">
                    <label class="mt-2" for="int">Intelligence:</label>
                    <input name="int" type="number" class="form-control" id="int" placeholder="int" required>
                  </div>
                  <div class="form-group">
                    <label class="mt-2" for="wis">Wisdom:</label>
                    <input name="wis" type="number" class="form-control" id="wis" placeholder="wis" required>
                  </div>
                  <div class="form-group">
                    <label class="mt-2" for="char">Charisma:</label>
                    <input name="char" type="number" class="form-control" id="char" placeholder="char" required>
                  </div>

                </fieldset class="mt-3">
                <legend>Save Proficiences:</legend>
                  <div class="form-check">
                    <input name="saveProficiencies" class="form-check-input" type="checkbox" value="str" id="strSave">
                    <label class="form-check-label" for="strSave">
                      str
                    </label>
                  </div>
                  <div class="form-check">
                    <input name="saveProficiencies" class="form-check-input" type="checkbox" value="dex" id="dexSave">
                    <label class="form-check-label" for="dexSave">
                      dex
                    </label>
                  </div>
                  <div class="form-check">
                    <input name="saveProficiencies" class="form-check-input" type="checkbox" value="int" id="intSave">
                    <label class="form-check-label" for="intSave">
                      int
                    </label>
                  </div>
                  <div class="form-check">
                    <input name="saveProficiencies" class="form-check-input" type="checkbox" value="wis" id="wisSave">
                    <label class="form-check-label" for="wisSave">
                      wis
                    </label>
                  </div>
                  <div class="form-check">
                    <input name="saveProficiencies" class="form-check-input" type="checkbox" value="char" id="charSave">
                    <label class="form-check-label" for="charSave">
                      char
                    </label>
                  </div>
                <fieldset>

                </fieldset>

                <fieldset class="mt-3">
                  <legend>Skill Proficiences:</legend>
                  <div class="form-check">
                    <input name="proficiencies" class="form-check-input" type="checkbox" value="Acrobatics" id="Acrobatics">
                    <label class="form-check-label" for="Acrobatics">
                      Acrobatics
                    </label>
                  </div>
                  <div class="form-check mt-2">
                    <input name="proficiencies" class="form-check-input" type="checkbox" value="Animal Handling" id="AnimalHandling">
                    <label class="form-check-label" for="AnimalHandling">
                      Animal Handling
                    </label>
                  </div>
                  <div class="form-check mt-2">
                    <input name="proficiencies" class="form-check-input" type="checkbox" value="Arcana" id="Arcana">
                    <label class="form-check-label" for="Arcana">
                      Arcana
                    </label>
                  </div>
                  <div class="form-check mt-2">
                    <input name="proficiencies" class="form-check-input" type="checkbox" value="Athletics" id="Athletics">
                    <label class="form-check-label" for="Athletics">
                      Athletics
                    </label>
                  </div>
                  <div class="form-check mt-2">
                    <input name="proficiencies" class="form-check-input" type="checkbox" value="Deception" id="Deception">
                    <label class="form-check-label" for="Deception">
                      Deception
                    </label>
                  </div>
                  <div class="form-check mt-2">
                    <input name="proficiencies" class="form-check-input" type="checkbox" value="History" id="History">
                    <label class="form-check-label" for="History">
                      History
                    </label>
                  </div>
                  <div class="form-check mt-2">
                    <input name="proficiencies" class="form-check-input" type="checkbox" value="Insight" id="Insight">
                    <label class="form-check-label" for="Insight">
                      Insight
                    </label>
                  </div>
                  <div class="form-check mt-2">
                    <input name="proficiencies" class="form-check-input" type="checkbox" value="Intimidation" id="Intimidation">
                    <label class="form-check-label" for="Intimidation">
                      Intimidation
                    </label>
                  </div>
                  <div class="form-check mt-2">
                    <input name="proficiencies" class="form-check-input" type="checkbox" value="Investigation" id="Investigation">
                    <label class="form-check-label" for="Investigation">
                      Investigation
                    </label>
                  </div>
                  <div class="form-check mt-2">
                    <input name="proficiencies" class="form-check-input" type="checkbox" value="Medicine" id="Medicine">
                    <label class="form-check-label" for="Medicine">
                      Medicine
                    </label>
                  </div>
                  <div class="form-check mt-2">
                    <input name="proficiencies" class="form-check-input" type="checkbox" value="Nature" id="Nature">
                    <label class="form-check-label" for="Nature">
                      Nature
                    </label>
                  </div>
                  <div class="form-check mt-2">
                    <input name="proficiencies" class="form-check-input" type="checkbox" value="Perception" id="Perception">
                    <label class="form-check-label" for="Perception">
                      Perception
                    </label>
                  </div>
                  <div class="form-check mt-2">
                    <input name="proficiencies" class="form-check-input" type="checkbox" value="Performance" id="Performance">
                    <label class="form-check-label" for="Performance">
                      Performance
                    </label>
                  </div>
                  <div class="form-check mt-2">
                    <input name="proficiencies" class="form-check-input" type="checkbox" value="Persuasion" id="Persuasion">
                    <label class="form-check-label" for="Persuasion">
                      Persuasion
                    </label>
                  </div>
                  <div class="form-check mt-2">
                    <input name="proficiencies" class="form-check-input" type="checkbox" value="Religion" id="Religion">
                    <label class="form-check-label" for="Religion">
                      Religion
                    </label>
                  </div>
                  <div class="form-check mt-2">
                    <input name="proficiencies" class="form-check-input" type="checkbox" value="Sleight of Hand" id="sleightOfhand">
                    <label class="form-check-label" for="sleightOfHand">
                      Sleight of Hand
                    </label>
                  </div>
                  <div class="form-check mt-2">
                    <input name="proficiencies" class="form-check-input" type="checkbox" value="Stealth" id="Stealth">
                    <label class="form-check-label" for="Stealth">
                      Stealth
                    </label>
                  </div>
                  <div class="form-check mt-2">
                    <input name="proficiencies" class="form-check-input" type="checkbox" value="Survival" id="Survival">
                    <label class="form-check-label" for="Survival">
                      Survival
                    </label>
                  </div>
                </fieldset>
                <div class="d-flex flex-column">
                  <button class="btn btn-success mt-5" type="submit">Adventure awaits</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}



