// React:
import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'

// Components
import Header from "../Components/Header"
import Footer from "../Components/Footer"
import SkillRoll from "../Components/Forms/SkillRoll"
import SaveCheckRoll from "../Components/Forms/SaveCheckRoll"
import DmToggleControll from '../Components/Forms/DmToggleControll'
import TextRound from '../Components/Forms/TextRound'
import NextPlayer from '../Components/Forms/NextPlayer'

//Icons
import { HeartFill } from 'react-bootstrap-icons';
//Form Items
import {Form} from 'formik'
//Socket.io
import io from 'socket.io-client'



export default function Encounter() {
  const [data, setData] = useState(null)
  const [likes, setLikes] = useState(null)
  const [rounds, setRounds] = useState(null)
  const [characterTurn, setCharacterTurn] = useState(null)
  const [dmTurn, setDmTurn] = useState(null)

  //Fetching Initial data
  const { id } = useParams()
  const url = `/encounter/${id}`

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => { 
        setData(data)
        setRounds(data.rounds)
        setLikes(data.encounter.likes)
        setCharacterTurn(data.characterTurn)
        setDmTurn(data.encounter.dmTurn)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [url, id]);
  
  console.log(data)

  //Managing likes on encounter
  const likeUrl = `/encounter/likeEncounter/${id}`
  
  useEffect(() => {
    if (data && data.encounter.likes !== likes) {
      fetch(likeUrl, { method: "PUT" })
      .catch((err) => {
        console.log(err)
      })
    }
  }, [likes, likeUrl, data]);

  function LikeHandler(e) {
    e.preventDefault()
    setLikes((oldLikes) => (Number(oldLikes) + 1))
  }

  // Socket.io enabled via socket.io-client package
  const socket = io.connect("http://localhost:3001") //URL for backend

  let room

  const joinRoom = () => {
    if (data !== null) {
      room = data.encounter._id
      socket.emit("join_room", room)
    }
  }

  joinRoom()
  
  //Socket senders
  const sendMessage = (message) => {
    if (message === "rounds") {
      socket.emit("send_roundRefresh", { message, room} )
    } else if (message === "controls") {
      socket.emit("send_controlRefresh", { message, room} )
    }
  };

  //Socket listeners
  useEffect(() => {
    socket.on("receive_roundRefresh", () => {
      fetch(url)
      .then((res) => res.json())
      .then((data) => { 
        setRounds(data.rounds)
      })
      .catch((err) => {
        console.log(err)
      })
    })
  })

  useEffect(() => {
    socket.on("receive_controlRefresh", () => {
      fetch(url)
      .then((res) => res.json())
      .then((data) => { 
        setDmTurn(data.encounter.dmTurn)
        setCharacterTurn(data.characterTurn)
      })
      .catch((err) => {
        console.log(err)
      })
    })
  })
  
  // End Socket.io

  return (
    <>
      <Header page="else" />
      {data &&
        <>
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
                <p>{ data.encounter.description}</p>
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
                    {dmTurn &&
                      <Link className="btn btn-primary shadow"> DM </Link>
                    }
                    {!dmTurn &&
                      <Link to={`/character/${characterTurn._id}`} target="_blank" className="btn btn-primary shadow">{characterTurn.name}</Link>
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
                  {(characterTurn.user === data.user._id) &&
                    <>
                      {dmTurn &&
                        <span>You will be next, the DM is thinking.</span>
                      }
                      {!dmTurn &&
                        <>
                          <span>It is your turn</span>
                          <div className="d-flex flex-row mt-3">
                            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addRound">
                              Add round
                            </button>
                          </div>
                        </>
                      }
                    </>
                  }
                  {(characterTurn.user !== data.user._id && data.user._id !== data.encounter.dm) &&
                    <>
                      {dmTurn &&
                        <span>Please be patient, the DM is thinking.</span>
                      }
                      {!dmTurn &&
                        <span>Please be patient, {characterTurn.name} is thinking. </span>
                      }
                    </>
                  }

                  {(data.user._id === data.encounter.dm) &&
                    <>
                      <span>Hello God, your will be done:</span>
                      <div className="d-flex flex-row">
                        <DmToggleControll
                          setCharacterTurn={setCharacterTurn}
                          setDmTurn={setDmTurn}
                          encounter={data.encounter._id}
                          dmAction="toggleDm"
                          text="Toggle DM"
                          sendMessage={sendMessage}
                          dmTurn={dmTurn}
                        />
                        {dmTurn &&
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
                            <NextPlayer
                              encounterId={data.encounter._id}
                              characterTurn={characterTurn}
                              setCharacterTurn={setCharacterTurn}
                              sendMessage={sendMessage}
                            />
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
                      <button className="btn btn-info shadow" type="submit">Open / Close Encounter</button>
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
                          action={`/round/makeRoll/${round._id}/${characterTurn._id}?_method=PUT`}
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
        <TextRound
          encounterId={data.encounter._id}
          characterTurnId={data.characterTurn._id}
          userId={data.user._id}
          sendMessage={sendMessage}
          setRounds={setRounds}
        />
        
        {/* <!-- Modal Skill Roll --> */}
        <SkillRoll
          sendMessage={sendMessage}
          setRounds={setRounds}
          encounterId={id}
          formId="addSkillRollRound"
          character={characterTurn.name}
          rollType="skill"
          playerId={ characterTurn.user}
          characterId={characterTurn._id}
        />
        
        {/* <!-- Modal Saving/Skill check Throw Roll --> */}
        <SaveCheckRoll
          sendMessage={sendMessage}
          setRounds={setRounds}
          encounterId={ id }
          formId="addSaveRollRound"
          character={characterTurn.name}
          rollType="save/check"
          playerId={ characterTurn.user}
          characterId={ characterTurn._id}
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