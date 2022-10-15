import React from "react";
import Header from "../Components/Header"
import Footer from "../Components/Footer"
import { useParams, Link } from 'react-router-dom'

export default function Profile() {
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
      {data && 
        <>
      <div className="container">
        <div className="mt-5">
          <div className="">
            <div>
              <p><strong>User Name</strong>: { data.targetUser.userName }</p>
                <p><strong>Email</strong>: { data.targetUser.email }</p>
            </div>
            {(data.targetUser.type==="player" && data.visitor._id === data.targetUser._id) &&
              <div className="mt-3">
                <h2>Add a character:</h2>
                {/* // Button Deletion Modal */}
                <button type="button" className="shadow ms-3 btn btn-primary" data-bs-toggle="modal" data-bs-target="#createCharacter">
                  Create New Character
                </button> 
              </div>
            }
            {(data.targetUser.type==="dm" && data.visitor._id ===data.targetUser._id) && 
              <div className="mt-3">
                <h2>Add a game:</h2>
                <form action="/post/createPost" encType="multipart/form-data" method="POST">
                  <div className="mb-3">
                      <label htmlFor="title" className="form-label">Title</label>
                      <input type="text" className="form-control" id="title" name="title" required/>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="caption" className="form-label">Description</label>
                    <textarea className="form-control" id="caption" name="caption" required></textarea>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="imgUpload" className="form-label">Image</label>
                    <input type="file" className="form-control" id="imageUpload" name="file" required/>
                  </div>
                  <button type="submit" className="btn btn-primary" value="Upload">Submit</button>
                </form>
              </div>
            }
          </div>
          <div className="mt-3">
            {(data.visitor._id !== data.targetUser._id) && 
              <h2>Player { data.targetUser.userName }'s Games:</h2>
            }
            {(data.visitor._id === data.targetUser._id) && 
              <h2>Your Games:</h2>
            }
            <ul className="row list-unstyled">
              {data.posts.map((post) => { 
                return (  
                <li key={post._id} className="justify-content-between mt-3">
                  <Link to={`/post/${post._id}`}>
                    <figure className="d-flex flex-column align-items-center">
                      <img alt="game" className="img-fluid rounded profileGame" src={ post.image }/>
                        <figcaption className="text-center">{post.title}</figcaption>
                    </figure>
                  </Link>
                </li>
                )
              })}
            </ul>
          </div>
          <div className="mt-3">
            {(data.visitor._id !== data.targetUser._id && data.targetUser.type !=='dm') && 
              <h2>Player { data.targetUser.userName }'s Characters:</h2>
            }
            {(data.visitor._id===data.targetUser._id && data.targetUser.type !=='dm') && 
                <h2>Your Characters:</h2>
              }
              { data.targetUser.type !=='dm' &&
                <>
                <ul className="row list-unstyled">
                {data.characters.map((character) => {
                  return (  
                    <li key={character._id} className="justify-content-between mt-3">
                      <Link to={`/character/${character._id}`}>
                        <figure className="d-flex flex-column align-items-center">
                          <img alt="character" className="img-fluid rounded profileGame" src="<%= characters[i].image%>"/>
                              <figcaption className="text-center"> {character.name} </figcaption>
                        </figure>
                      </Link>
                    </li>
                    )
                  })}
                </ul>
                </>
              }
          </div>   
        </div>
      </div>

      {/* Create Character */}
      <div className="modal fade" id="createCharacter" tabIndex="-1" aria-labelledby="createCharacterLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="createCharacterLabel">Tell me about yourself traveler</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form action="/character/create" encType="multipart/form-data" method="POST">
                <fieldset>
                  <div className="mb-3">
                    <label htmlFor="imgUpload" className="form-label">Image</label>
                    <input type="file" className="form-control" id="imageUpload" name="file" required/>
                  </div>
                  <legend>Description:</legend>
                  <div className="form-group">
                    <label className="mt-2" htmlFor="charName">Name:</label>
                    <input name="name" type="text" className="form-control" id="charName" placeholder="Name" required/>
                  </div>

                  <div className="form-group">
                    <label className="mt-2" htmlFor="charClass">Class:</label>
                    <input name="className" type="text" className="form-control" id="charClass" placeholder="Class" required/>
                  </div>

                  <div className="form-group">
                    <label className="mt-2" htmlFor="charAge">Age:</label>
                    <input name="age" type="number" className="form-control" id="charAge" placeholder="Age" required/>
                  </div>

                  <div className="form-group">
                    <label className="mt-2" htmlFor="charRace">Race:</label>
                    <input name="race" type="text" className="form-control" id="charRace" placeholder="Race" required/>
                  </div>
          
                  <div className="form-group">
                    <label className="mt-2" htmlFor="charGnd">Gender:</label>
                    <input name="gender" type="text" className="form-control" id="charGnd" placeholder="Gender" required/>
                  </div>

                  <div className="form-group">
                    <label className="mt-2" htmlFor="charLvl">Level:</label>
                    <input name="lvl" type="number" className="form-control" id="charLvl" placeholder="Level" required/>
                  </div>

                  <div className="form-group">
                    <label className="mt-2" htmlFor="charLvl">Armor Class(ac):</label>
                    <input name="ac" type="number" className="form-control" id="ac" placeholder="Armor Class" required/>
                  </div>
                </fieldset>
                
                <fieldset className="mt-3">
                  <legend>Ability Scores</legend>
                  <div className="form-group">
                    <label htmlFor="str">Strength:</label>
                    <input name="str" min="0" max="30" type="number" className="form-control" id="str" placeholder="str" required/>
                  </div>
                  <div className="form-group">
                    <label className="mt-2" htmlFor="dex">Dexterity:</label>
                    <input name="dex" type="number" min="0" max="30" className="form-control" id="dex" placeholder="dex" required/>
                  </div>
                  <div className="form-group">
                    <label className="mt-2" htmlFor="con">Constitution:</label>
                    <input name="con" type="number" min="0" max="30" className="form-control" id="con" placeholder="con" required/>
                  </div>
                  <div className="form-group">
                    <label className="mt-2" htmlFor="int">Intelligence:</label>
                    <input name="int" type="number" min="0" max="30" className="form-control" id="int" placeholder="int" required/>
                  </div>
                  <div className="form-group">
                    <label className="mt-2" htmlFor="wis">Wisdom:</label>
                    <input name="wis" type="number" min="0" max="30" className="form-control" id="wis" placeholder="wis" required/>
                  </div>
                  <div className="form-group">
                    <label className="mt-2" htmlFor="char">Charisma:</label>
                    <input name="char" type="number" min="0" max="30" className="form-control" id="char" placeholder="char" required/>
                  </div>
                </fieldset>

                <legend>Save Proficiences:</legend>
                  <div className="form-check form-switch">
                    <input name="strSave" className="form-check-input" value="true" type="checkbox" id="strSave"/>
                    <label className="form-check-label" htmlFor="strSave">str</label>
                  </div>
                  <div className="form-check form-switch">
                    <input name="dexSave" className="form-check-input" value="true" type="checkbox" id="dexSave"/>
                    <label className="form-check-label" htmlFor="dexSave">dex</label>
                  </div>
                  <div className="form-check form-switch">
                    <input name="conSave" className="form-check-input" value="true" type="checkbox" id="conSave"/>
                    <label className="form-check-label" htmlFor="conSave">con</label>
                  </div>
                  <div className="form-check form-switch">
                    <input name="intSave" className="form-check-input" value="true" type="checkbox" id="intSave"/>
                    <label className="form-check-label" htmlFor="intSave">int</label>
                  </div>
                  <div className="form-check form-switch">
                    <input name="wisSave" className="form-check-input" value="true" type="checkbox" id="wisSave"/>
                    <label className="form-check-label" htmlFor="wisSave">wis</label>
                  </div>
                  <div className="form-check form-switch">
                    <input name="charSave" className="form-check-input" value="true" type="checkbox" id="charSave"/>
                    <label className="form-check-label" htmlFor="charSave">char</label>
                  </div>
                <fieldset>

                </fieldset>

                <fieldset className="mt-3">
                  <legend>Proficiences:</legend>
                  <div className="form-check form-switch">
                    <input name="acrobatics" className="form-check-input" value="true" type="checkbox" id="Acrobatics"/>
                    <label className="form-check-label" htmlFor="Acrobatics">Acrobatics</label>
                  </div>
                  <div className="form-check form-switch">
                    <input name="animalHandling" className="form-check-input" value="true" type="checkbox" id="animalHandling"/>
                    <label className="form-check-label" htmlFor="animalHandling">Animal Handling</label>
                  </div>
                  <div className="form-check form-switch">
                    <input name="arcana" className="form-check-input" value="true" type="checkbox" id="arcana"/>
                    <label className="form-check-label" htmlFor="arcana">Arcana</label>
                  </div>
                  <div className="form-check form-switch">
                    <input name="athletics" className="form-check-input" value="true" type="checkbox" id="athletics"/>
                    <label className="form-check-label" htmlFor="athletics">Athletics</label>
                  </div>
                  <div className="form-check form-switch">
                    <input name="deception" className="form-check-input" value="true" type="checkbox" id="deception"/>
                    <label className="form-check-label" htmlFor="deception">Deception</label>
                  </div>
                  <div className="form-check form-switch">
                    <input name="history" className="form-check-input" value="true" type="checkbox" id="history"/>
                    <label className="form-check-label" htmlFor="history">History</label>
                  </div>
                  <div className="form-check form-switch">
                    <input name="insight" className="form-check-input" value="true" type="checkbox" id="insight"/>
                    <label className="form-check-label" htmlFor="insight">Insight</label>
                  </div>
                  <div className="form-check form-switch">
                    <input name="intimidation" className="form-check-input" value="true" type="checkbox" id="intimidation"/>
                    <label className="form-check-label" htmlFor="intimidation">Intimidation</label>
                  </div>
                  <div className="form-check form-switch">
                    <input name="investigation" className="form-check-input" value="true" type="checkbox" id="investigation"/>
                    <label className="form-check-label" htmlFor="investigation">Investigation</label>
                  </div>
                  <div className="form-check form-switch">
                    <input name="medicine" className="form-check-input" value="true" type="checkbox" id="medicine"/>
                    <label className="form-check-label" htmlFor="medicine">Medicine</label>
                  </div>
                  <div className="form-check form-switch">
                    <input name="nature" className="form-check-input" value="true" type="checkbox" id="nature"/>
                    <label className="form-check-label" htmlFor="nature">Nature</label>
                  </div>
                  <div className="form-check form-switch">
                    <input name="perception" className="form-check-input" value="true" type="checkbox" id="perception"/>
                    <label className="form-check-label" htmlFor="perception">Perception</label>
                  </div>
                  <div className="form-check form-switch">
                    <input name="performance" className="form-check-input" value="true" type="checkbox" id="performance"/>
                    <label className="form-check-label" htmlFor="performance">Performance</label>
                  </div>
                  <div className="form-check form-switch">
                    <input name="persuasion" className="form-check-input" value="true" type="checkbox" id="persuasion"/>
                    <label className="form-check-label" htmlFor="persuasion">Persuasion</label>
                  </div>
                  <div className="form-check form-switch">
                    <input name="religion" className="form-check-input" value="true" type="checkbox" id="religion"/>
                    <label className="form-check-label" htmlFor="religion">Religion</label>
                  </div>
                  <div className="form-check form-switch">
                    <input name="sleightOfHand" className="form-check-input" value="true" type="checkbox" id="sleightOfHand"/>
                    <label className="form-check-label" htmlFor="sleightOfHand">Sleight of Hand</label>
                  </div>
                  <div className="form-check form-switch">
                    <input name="stealth" className="form-check-input" value="true" type="checkbox" id="stealth"/>
                    <label className="form-check-label" htmlFor="stealth">Stealth</label>
                  </div>
                  <div className="form-check form-switch">
                    <input name="survival" className="form-check-input" value="true" type="checkbox" id="survival"/>
                    <label className="form-check-label" htmlFor="survival">Survival</label>
                  </div>
                </fieldset>
                <div className="d-flex flex-column">
                  <button className="btn btn-success mt-5" type="submit">Adventure awaits</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
        </>
      }
      <Footer />
    </>          
  )
}

