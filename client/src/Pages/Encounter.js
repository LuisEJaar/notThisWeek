import React from 'react'
import { useParams, Link } from 'react-router-dom'
import Header from "../Components/Header"
import Footer from "../Components/Footer"
import { HeartFill } from 'react-bootstrap-icons';

export default function Encounter() {
  const [data, setData] = React.useState(null)

  const { id } = useParams()
  const url = `/encounter/${id}`

  React.useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => setData(data))
  }, [url, id]);
  
  console.log(data)

  return (
    <>
      <Header page="else" />
      {data &&
        <>
          <div className="container">
            <div className="mt-1">
              <Link className="btn btn-primary shadow" to="/profile">DM Profile</Link>
              <Link className="btn btn-primary shadow" to={`/post/${data.encounter.post}`}>Return to game</Link>
            </div>
            <div className="row justify-content-center mt-5">
              <h2>Encounter Title:</h2>
              <h2>{data.encounter.title}</h2>
            <img className="img-fluid rounded shadow currentEncounterGameImage" alt='encounter' src={data.encounter.image} />
              <div className="d-flex m-2">
                <form
                  className="m-2"
                  action={`/encounter/likeEncounter/${data.encounter._id}?_method=PUT`}
                  method="POST"
                >
                  <button className="btn btn-primary" type="submit"><HeartFill/></button>
                </form>
                <h3 className="m-2">Likes: {data.encounter.likes}</h3>
              </div>
              <div className="mt-3">
                <h3>Description:</h3>
                <p>{data.encounter.description}</p>
              </div>
              <div className="container mt-4">
              <h3>Characters:</h3>
              {data.party.map((member) => {
                return (  
                  <Link key={ member._id } to={`/character/${member._id}`} target="_blank" className="btn btn-primary shadow me-2">{member.name}</Link>
                  )
                })}
                <h3 className="mt-3">Characters Turn:</h3>
                {
                  data.encounter.active &&
                  <>
                    {data.encounter.dmTurn &&
                      <Link className="btn btn-primary shadow"> DM </Link>
                    }
                    {!data.encounter.dmTurn &&
                      <Link to={`/character/${data.characterTurn._id}`} target="_blank" className="btn btn-primary shadow">{data.characterTurn.name}</Link>
                    }
                  </>
                }
                {
                  !data.encounter.active &&
                  <span>This encounter has concluded</span>
                }
              </div>
            </div>
          </div>

          {/* <!--  Action Section--> */}
          <div className="container mt-5">
            <div className="d-flex flex-column align-items-center">
              {data.encounter.active &&
                <>
                  {(data.characterTurn.user === data.user.id) &&
                    <>
                      {data.encounter.dmTurn &&
                        <span>You will be next, the DM is thinking.</span>
                      }
                      {!data.encounter.dmTurn &&
                        <>
                          <span>It is your turn</span>
                          <div className="d-flex flex-row mt-3">
                            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addRound">
                              Add round
                            </button>
                            <form
                              className="ms-3"
                              action={`/encounter/toggleDm/${data.encounter._id}?_method=PUT`}
                              method="POST"
                            >
                              <button className="btn btn-warning" type="submit">Toggle DM Turn</button>
                            </form>
                          </div>
                        </>
                      }
                    </>
                  }
                  {(data.characterTurn.user != data.user.id && data.user.id != data.encounter.dm) &&
                    <>
                      {data.encounter.dmTurn &&
                        <span>Please be patient, the DM is thinking.</span>
                      }
                      {!data.encounter.dmTurn &&
                        <span>Please be patient, {data.characterTurn.name} is thinking. </span>
                      }
                    </>
                  }

                  {(data.user.id == data.encounter.dm) &&
                    <>
                      <span>Hello God, your will be done:</span>
                      <div className="d-flex flex-row">
                        <form
                          className="m-3"
                          action={`/encounter/toggleDm/${data.encounter._id}?_method=PUT`}
                          method="POST"
                        >
                          <button className="btn btn-warning shadow" type="submit">Toggle DM</button>
                        </form>
                        {data.encounter.dmTurn &&
                          <>
                            <button type="button" className="btn btn-primary m-3 shadow" data-bs-toggle="modal" data-bs-target="#addRound">
                              Add text round
                            </button>
                            <button type="button" className="btn btn-primary m-3 shadow" data-bs-toggle="modal" data-bs-target="#addSkillRollRound">
                              Skill Check
                            </button>
                            <button type="button" className="btn btn-primary m-3 shadow" data-bs-toggle="modal" data-bs-target="#addSaveRollRound">
                              Saving Throw
                            </button>
                            <form
                              className="m-3"
                              action={`/encounter/progressEncounter/${data.encounter._id}?_method=PUT`}
                              method="POST"
                            >
                              <button className="btn btn-warning" type="submit">Next Character</button>
                            </form>
                          </>
                        }
                      </div>
                    </>
                  }

                </>
              }
              {!data.encounter.active &&
                <>
                  <span>This encounter has concluded</span>
                  {data.user.id == data.encounter.dm &&
                    <form
                      className="m-3"
                      action={`/encounter/toggleEncounter/${data.encounter._id}?_method=PUT`}
                      method="POST"
                    >
                      <button className="btn btn-info shadow" type="submit">Re-Open Encounter</button>
                    </form>
                  }
                  <div className="d-flex">
                    {/* <!-- Button Deletion Modal --> */}
                    <form
                      className=""
                      action={`/encounter/toggleEncounter/${data.encounter._id}?_method=PUT`}
                      method="POST"
                    >
                      <button className="btn btn-danger shadow" type="submit">End Encounter</button>
                    </form>
                    <button type="button" className="shadow ms-3 btn btn-danger shadow" data-bs-toggle="modal" data-bs-target="#deleteEncounter">
                      Delete Encounter
                    </button>
                  </div>
                </>
              }
            </div>
            {/* <!-- Display rounds --> */}
            <div className="container mt-3">
              {data.rounds.map((round) => {
                <div className="card mb-3 shadow">
                  <div className="card-header d-flex">
                    {round.player === "DM" && <>DM</>}
                    {round.player !== "DM" && <>{round.playerCharacter} ({round.player})</>}
                    {(data.user.id == data.encounter.dm && round.type == "textRound") &&
                      <>
                        <button type="button" className="shadow ms-auto btn btn-warning shadow" data-bs-toggle="modal" data-bs-target="#editRound">
                          Edit Round
                        </button>
                        {/* <%- include('partials/editRound', {round: round}) -%> */}
                      </>
                    }
                    {data.user.id == data.encounter.dm &&
                      <>
                        <button type="button" className="shadow ms-auto btn btn-danger shadow" data-bs-toggle="modal" data-bs-target="#deleteRound">
                          Delete Round
                        </button>
                        {/* <%- include('partials/deleteRound', {round: round}) -%> */}
                      </>
                    }
                  </div>
                  <div className="card-body">
                    {round.type == "textRound" &&
                      <>
                        <p className="card-text"> {round.description}</p>
                      </>
                    }
                    {(round.type != "textRound" && !round.rolled) &&
                      <>
                        <p className="card-text"> {round.playerCharacter} to roll for {round.rollFor} </p>
                        {round.playerToRoll == data.user.id &&
                        <form
                          action={`/round/makeRoll/${data.round._id}/${data.characterTurn.id}?_method=PUT`}
                          method="POST"
                        > 
                            <button type="submit" className="mx-auto btn btn-primary" value="Upload">Submit</button>
                          </form>
                        }
                      </>
                    }

                    {(round.type != "textRound" && round.rolled) &&
                      <p>{round.playerCharacter} rolled for {round.rollFor}. They had to beat {round.target}, and they rolled {round.nat20 ? "NAT 20 SUCKA!!" : round.playerRoll}!</p>
                    }
                  </div>
                </div>
              })}
            </div>
          </div>

          {/* <!-- Modal create Round --> */}
          <div className="modal fade" id="addRound" tabIndex="-1" aria-labelledby="addRoundLabel" aria-hidden="true">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="newRoundLabel">New Round</h5>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                <form action={`/round/createRound/${data.encounter._id}/${data.user.id}/${data.characterTurn.id}?_method=PUT`} method="POST">
                    {/* <!-- Description --> */}
                    <div className="form-group mb-3">
                      <label htmlFor="encounterDescription">What do you do?</label>
                      <input type="hidden" id="type" name="type" value="textRound" />
                      <textarea type="text" className="form-control" id="encounterDescription" placeholder="Encounter Description" name="description"></textarea>
                    </div>
                    <button type="submit" className="mx-auto btn btn-primary" value="Upload">Submit</button>
                  </form>
                </div>
              </div>
            </div>
          </div>

          {/* <!-- Modal Skill Roll --> */}
          <div className="modal fade" id="addSkillRollRound" tabIndex="-1" aria-labelledby="addSkillRollRoundLabel" aria-hidden="true">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="newRoundLabel">Skill roll for {data.characterTurn.name}</h5>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                <form action={`/round/createRound/${data.encounter._id}/${data.characterTurn.user}/${data.characterTurn.id}?_method=PUT`} method="POST">
                    {/* <!-- Description --> */}
                    <div className="form-group mb-3">
                      <label htmlFor="encounterDescription">{data.characterTurn.name} rolls for:</label>
                      <select className="form-select" aria-label="Default select example" name="rollFor" required>
                        <option value="acrobatics">Acrobatics</option>
                        <option value="animalHandling">AnimalHandling</option>
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
                      </select>
                      <label htmlFor="playerTarget">{data.characterTurn.name} to beat:</label>
                      <input required type="number" className="form-control" id="playerTarget" name="target" min="1" max="30" />
                      <input type="hidden" id="type" name="type" value="rollRound" />
                      <input type="hidden" id="type" name="rollCategory" value="skillModifiers" />
                      <div className="container mt-2">
                        <table>
                          <thead>
                            <tr>
                              <th>Task Difficulty</th>
                              <th>DC</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>Very Easy</td>
                              <td>5</td>
                            </tr>
                            <tr>
                              <td>Easy</td>
                              <td>10</td>
                            </tr>
                            <tr>
                              <td>Medium</td>
                              <td>15</td>
                            </tr>
                            <tr>
                              <td>Hard</td>
                              <td>20</td>
                            </tr>
                            <tr>
                              <td>Very Hard</td>
                              <td>25</td>
                            </tr>
                            <tr>
                              <td>Nearly impossible</td>
                              <td>30</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <button type="submit" className="mx-auto btn btn-primary" value="Upload">Submit</button>
                  </form>
                </div>
              </div>
            </div>
          </div>

          {/* <!-- Modal Saving Throw Roll --> */}
          <div className="modal fade" id="addSaveRollRound" tabIndex="-1" aria-labelledby="addSaveRollRoundLabel" aria-hidden="true">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="newRoundLabel">Saving Throw / Ability check for {data.characterTurn.name}</h5>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                <form action={`/round/createRound/${data.encounter._id}/${data.characterTurn.user}/${data.characterTurn.id}?_method=PUT`} method="POST">
                    {/* <!-- Description --> */}
                    <div className="form-group mb-3">
                      <div className="form-check">
                        <input className="form-check-input" type="radio" name="rollCategory" value="saveModifiers" id="savingThrow" />
                        <label className="form-check-label" htmlFor="savingThrow">
                          Saving Throw
                        </label>
                      </div>
                      <div className="form-check">
                        <input className="form-check-input" type="radio" name="rollCategory" value="checkModifiers" id="abilityCheck" defaultChecked />
                        <label className="form-check-label" htmlFor="abilityCheck">
                          Check
                        </label>
                      </div>
                      <label htmlFor="encounterDescription">{data.characterTurn.name} rolls for:</label>
                      <select className="form-select" aria-label="Default select example" name="rollFor" required>
                        <option value="str">Strength</option>
                        <option value="dex">Dexterity</option>
                        <option value="con">Constitution</option>
                        <option value="int">Intelligence</option>
                        <option value="wis">Wisdom</option>
                        <option value="char">Charisma</option>
                      </select>
                      <label htmlFor="playerTarget">{data.characterTurn.name} to beat:</label>
                      <input required type="number" className="form-control" id="playerTarget" name="target" min="1" max="30" />
                      <input type="hidden" id="type" name="type" value="rollRound" />
                      <div className="container mt-2">
                      <table>
                        <thead>
                          <tr>
                            <th>Task Difficulty</th>
                            <th>DC</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>Very Easy</td>
                            <td>5</td>
                          </tr>
                          <tr>
                            <td>Easy</td>
                            <td>10</td>
                          </tr>
                          <tr>
                            <td>Medium</td>
                            <td>15</td>
                          </tr>
                          <tr>
                            <td>Hard</td>
                            <td>20</td>
                          </tr>
                          <tr>
                            <td>Very Hard</td>
                            <td>25</td>
                          </tr>
                          <tr>
                            <td>Nearly impossible</td>
                            <td>30</td>
                          </tr>
                        </tbody>
                        </table>
                      </div>
                    </div>
                    <button type="submit" className="mx-auto btn btn-primary" value="Upload">Submit</button>
                  </form>
                </div>
              </div>
            </div>
          </div>

          {/* <!-- Delete Encounter --> */}
          <div className="modal fade" id="deleteEncounter" tabIndex="-1" aria-labelledby="deleteEncounterLabel" aria-hidden="true">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="deleteEncounterLabel">Warning!</h5>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                  Encounter deletion cannot be undone, you're condemning this moment to fantasy death!
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                  <form
                    action={`/encounter/deleteEncounter/${data.encounter._id}?_method=DELETE`}
                    method="POST"
                    className=""
                  >
                    <button className="btn btn-danger" type="submit">Do it</button>
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