import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import Header from "../Components/Header"
import Footer from "../Components/Footer"
import SkillRoll from "../Components/Forms/SkillRoll"
import SaveCheckRoll from "../Components/Forms/SaveCheckRoll"
import { HeartFill } from 'react-bootstrap-icons';
import {Form} from 'formik'
//Socket.io
import io from 'socket.io-client'
const socket = io.connect("http://localhost:3001") //URL for backend

export default function Encounter() {
  const [data, setData] = useState(null)
  const [likes, setLikes] = useState(null)
  const [rounds, setRounds] = useState(null)
  
  //Socket states//
  const [message, setMessage] = useState("")
  const [messageReceived, setMessageReceived] = useState("")
  //Socket states//

  //Fetching Initial data
  const { id } = useParams()
  const url = `/encounter/${id}`

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => { 
        setData(data)
        setLikes(data.encounter.likes)
        setRounds(data.rounds)
      })
  }, [url, id]);
  
  console.log(data)

  //Managing likes on encounter
  const likeUrl = `/encounter/likeEncounter/${id}`
  
  useEffect(() => {
    if (data && data.encounter.likes !== likes) {
      fetch(likeUrl, { method: "PUT" })
    }
  }, [likes, likeUrl, data]);

  function LikeHandler(e) {
    e.preventDefault()
    setLikes((oldLikes) => (Number(oldLikes) + 1))
  }

  // Socket.io enabled via socket.io-client package
  let room

  const joinRoom = () => {
    if (data !== null) {
      room = data.encounter._id
      socket.emit("join_room", room)
    }
  }

  joinRoom()

  const sendMessage = () => {
    //Upon send message we emit something to backend or client
    //We wil send to back end and then backend will emit to clients
    socket.emit("send_message", { message, room} ) //good example for state
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageReceived(data.message)
    })
  })
  
  // Socket.io

  return (
    <>
      <Header page="else" />
      {data &&
        <>
        <input placeholder='Message' onChange={(event) => { setMessage(event.target.value) } }></input>
        <button className="btn btn-info" onClick={sendMessage}>Socket Test</button>
        <h1>Message:</h1>
        { messageReceived }
        <div className="container">
            <div className="mt-1">
              <Link className="btn btn-primary shadow me-3" to={`/userProfile/${data.encounter.dm}`}>DM Profile</Link>
              <Link className="btn btn-primary shadow" to={`/post/${data.encounter.post}`}>Return to game</Link>
            </div>
            <div className="row justify-content-center mt-5">
              <h2>Encounter Title:</h2>
              <h2>{data.encounter.title}</h2>
            <img className="img-fluid rounded shadow currentEncounterGameImage" alt='encounter' src={data.encounter.image} />
              <div className="d-flex m-2">
              <Form
                  onSubmit={LikeHandler}
                  className="m-2"
                >
                  <button className="btn btn-primary" type="submit"><HeartFill/></button>
                </Form>
                <h3 className="m-2">Likes: {likes}</h3>
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
                  {(data.characterTurn.user === data.user._id) &&
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
                            <Form
                              className="ms-3"
                              action={`/encounter/toggleDm/${data.encounter._id}?_method=PUT`}
                              method="POST"
                            >
                              <button className="btn btn-warning" type="submit">Toggle DM Turn</button>
                            </Form>
                          </div>
                        </>
                      }
                    </>
                  }
                  {(data.characterTurn.user !== data.user._id && data.user._id !== data.encounter.dm) &&
                    <>
                      {data.encounter.dmTurn &&
                        <span>Please be patient, the DM is thinking.</span>
                      }
                      {!data.encounter.dmTurn &&
                        <span>Please be patient, {data.characterTurn.name} is thinking. </span>
                      }
                    </>
                  }

                  {(data.user._id === data.encounter.dm) &&
                    <>
                      <span>Hello God, your will be done:</span>
                      <div className="d-flex flex-row">
                        <Form
                          className="m-3"
                          action={`/encounter/toggleDm/${data.encounter._id}?_method=PUT`}
                          method="POST"
                        >
                          <button className="btn btn-warning shadow" type="submit">Toggle DM</button>
                        </Form>
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
                            <Form
                              className="m-3"
                              action={`/encounter/progressEncounter/${data.encounter._id}?_method=PUT`}
                              method="POST"
                            >
                              <button className="btn btn-warning" type="submit">Next Character</button>
                            </Form>
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
                  {data.user._id === data.encounter.dm &&
                    <Form
                      className="m-3"
                      action={`/encounter/toggleEncounter/${data.encounter._id}?_method=PUT`}
                      method="POST"
                    >
                      <button className="btn btn-info shadow" type="submit">Re-Open Encounter</button>
                    </Form>
                  }
                  <div className="d-flex">
                    {/* <!-- Button Deletion Modal --> */}
                    <Form
                      className=""
                      action={`/encounter/toggleEncounter/${data.encounter._id}?_method=PUT`}
                      method="POST"
                    >
                      <button className="btn btn-danger shadow" type="submit">End Encounter</button>
                    </Form>
                    <button type="button" className="shadow ms-3 btn btn-danger shadow" data-bs-toggle="modal" data-bs-target="#deleteEncounter">
                      Delete Encounter
                    </button>
                  </div>
                </>
              }
            </div>
            
          {/* <!-- Display rounds --> */}
          <div className="container mt-3">
            {rounds.map((round) => {
              return (
                <div key={round._id} className="card mb-3 shadow">
                  <div className="card-header d-flex">
                    {round.player === "DM" && <>DM</>}
                    {round.player !== "DM" && <>{round.playerCharacter} ({round.player})</>}
                    {(data.user._id === data.encounter.dm && round.type === "textRound") &&
                      <>
                        <button type="button" className="shadow ms-auto btn btn-warning shadow" data-bs-toggle="modal" data-bs-target="#editRound">
                          Edit Round
                        </button>
                        {/* <%- include('partials/editRound', {round: round}) -%> */}
                      </>
                    }
                    {data.user._id === data.encounter.dm &&
                      <>
                        <button type="button" className="shadow ms-auto btn btn-danger shadow" data-bs-toggle="modal" data-bs-target="#deleteRound">
                          Delete Round
                        </button>
                        {/* <%- include('partials/deleteRound', {round: round}) -%> */}
                      </>
                    }
                  </div>
                  <div className="card-body">
                    {round.type === "textRound" &&
                      <>
                        <p className="card-text"> {round.description}</p>
                      </>
                    }
                    {(round.type !== "textRound" && !round.rolled) &&
                      <>
                        <p className="card-text"> {round.playerCharacter} to roll for {round.rollFor} </p>
                        {round.playerToRoll === data.user._id &&
                        <Form
                          action={`/round/makeRoll/${data.round._id}/${data.characterTurn._id}?_method=PUT`}
                          method="POST"
                        > 
                            <button type="submit" className="mx-auto btn btn-primary" value="Upload">Submit</button>
                          </Form>
                        }
                      </>
                    }

                    {(round.type !== "textRound" && round.rolled) &&
                      <p>{round.playerCharacter} rolled for {round.rollFor}. They had to beat {round.target}, and they rolled {round.nat20 ? "NAT 20 SUCKA!!" : round.playerRoll}!</p>
                    }
                  </div>
                </div>
                )
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
                <Form action={`/round/createRound/${data.encounter._id}/${data.user._id}/${data.characterTurn._id}?_method=PUT`} method="POST">
                    {/* <!-- Description --> */}
                    <div className="form-group mb-3">
                      <label htmlFor="encounterDescription">What do you do?</label>
                      <input type="hidden" id="type" name="type" value="textRound" />
                      <textarea type="text" className="form-control" id="encounterDescription" placeholder="Encounter Description" name="description"></textarea>
                    </div>
                    <button type="submit" className="mx-auto btn btn-primary" value="Upload">Submit</button>
                  </Form>
                </div>
              </div>
            </div>
        </div>
        
        {/* <!-- Modal Skill Roll --> */}
        <SkillRoll
          setRounds={setRounds}
          encounterId={id}
          formId="addSkillRollRound"
          character={data.characterTurn.name}
          rollType="skill"
          playerId={ data.characterTurn.user}
          characterId={data.characterTurn._id}
        />
        
        {/* <!-- Modal Saving/Skill check Throw Roll --> */}
        <SaveCheckRoll
          setRounds={setRounds}
          encounterId={ id }
          formId="addSaveRollRound"
          character={data.characterTurn.name}
          rollType="save/check"
          playerId={ data.characterTurn.user}
          characterId={data.characterTurn._id}
        />

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
                  <Form
                    action={`/encounter/deleteEncounter/${data.encounter._id}?_method=DELETE`}
                    method="POST"
                    className=""
                  >
                    <button className="btn btn-danger" type="submit">Do it</button>
                  </Form>
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