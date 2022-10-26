// React:
import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'

// Components
import Header from "../Components/Header"
import Footer from "../Components/Footer"
// Form Related
import SkillRoll from "../Components/Forms/SkillRoll"
import SaveCheckRoll from "../Components/Forms/SaveCheckRoll"
import DmToggleControll from '../Components/Forms/DmToggleControll'
import TextRound from '../Components/Forms/TextRound'
import NextPlayer from '../Components/Forms/NextPlayer'
import PlayerRolling from '../Components/Forms/PlayerRolling'
import Delete from '../Components/Forms/Delete'

//Icons
import { HeartFill } from 'react-bootstrap-icons';
//Form Items
import { Form } from 'formik'

//Socket.io
import io from 'socket.io-client'
let socket

export default function Encounter() {
  const [data, setData] = useState(null)
  const [likes, setLikes] = useState(null)
  const [rounds, setRounds] = useState(null)
  const [characterTurn, setCharacterTurn] = useState(null)
  const [dmTurn, setDmTurn] = useState(null)
  const [encounterActive, setEncounterActive] = useState(null)

  //Fetching Initial data
  const { id } = useParams()
  const url = `/api/encounter/${id}`

  async function pageLoad() {
    fetch(url)
      .then((res) => res.json())
      .then((data) => { 
        setData(data)
        setRounds(data.rounds)
        setLikes(data.encounter.likes)
        setCharacterTurn(data.characterTurn)
        setDmTurn(data.encounter.dmTurn)
        setEncounterActive(data.encounter.active)
      })
      .then(socket = io.connect('https://notthisweek.herokuapp.com/'))
      .catch((err) => {
        console.log(err)
      })
  }

  useEffect(() => {
    pageLoad()
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
   //URL for backend

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


  async function fetchContain2() {
    fetch(url)
      .then((res) => res.json())
      .then((data) => { 
        setRounds(data.rounds)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  //Socket listeners
  useEffect(() => {
    socket.on("receive_roundRefresh", () => {
      fetchContain2()
    })
  })

  async function fetchContain3() {
    fetch(url)
      .then((res) => res.json())
      .then((data) => { 
        setDmTurn(data.encounter.dmTurn)
        setCharacterTurn(data.characterTurn)
        setEncounterActive(data.encounter.active)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  useEffect(() => {
    socket.on("receive_controlRefresh", () => {
      fetchContain3()
    })
  })
  
  // End Socket.io

  return (
    <>
      <Header page="other" />
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
              { data.party.map((member) => {
                return (  
                  <Link key={ member._id } to={`/character/${member._id}`} target="_blank" className="btn btn-primary shadow me-2">{member.name}</Link>
                  )
                })}
              <h3 className="mt-3">Characters Turn:</h3>
              { encounterActive &&
                <>
                  {dmTurn &&
                    <Link className="btn btn-primary shadow"> DM </Link>
                  }
                  {!dmTurn &&
                    <Link to={`/character/${characterTurn._id}`} target="_blank" className="btn btn-primary shadow">{characterTurn.name}</Link>
                  }
                </>
              }
              { !encounterActive &&
                <span>This encounter has concluded</span>
              }
            </div>
          </div>
        </div>
        {/* <!--  Action Section--> */}
          <div className="container mt-5">
            <div className="d-flex flex-column align-items-center">
              {encounterActive &&
                <>
                  {/* Players turn but DM is active */}
                  {(characterTurn.user === data.user._id) &&
                    <>
                      {dmTurn &&
                        <span>You will be next, the DM is thinking.</span>
                      }
                      {/* Players turn and DM is inactive */}
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
              
                  {/* Not players turn and DM is active */}
                  {(characterTurn.user !== data.user._id && data.user._id !== data.encounter.dm) &&
                    <>
                      {dmTurn &&
                        <span>Please be patient, the DM is thinking.</span>
                      }
                      {/* Not players turn and DM is inactive */}
                      {!dmTurn &&
                        <span>Please be patient, {characterTurn.name} is thinking. </span>
                      }
                    </>
                  }

                  {/* User is logged in as game DM */}
                  {(data.user._id === data.encounter.dm) &&
                      <>
                      {/* Toggle if its the DM's turn  */}
                      <span>Hello DM, your will be done:</span>
                      <div className="d-flex flex-row">
                        <DmToggleControll
                          encounter={data.encounter._id}
                          dmAction="toggleDm"
                          text="Toggle DM"
                          sendMessage={sendMessage}
                          setDmTurn={setDmTurn}
                          dmTurn={dmTurn}
                        />
                  
                        {/* DM is active */}
                        {dmTurn &&
                          <>
                            <button type="button" className="btn btn-primary m-3 shadow" data-bs-toggle="modal" data-bs-target="#addRound">
                              Add text round
                            </button>
                            <button type="button" className="btn btn-primary m-3 shadow" data-bs-toggle="modal" data-bs-target="#addSkillRollRound">
                              Assign Skill Check
                            </button>
                            <button type="button" className="btn btn-primary m-3 shadow" data-bs-toggle="modal" data-bs-target="#addSaveRollRound">
                              Assign Saving Throw
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
                      <div>
                      {/* DM to archive / toggle encounter */}
                      {data.user._id === data.encounter.dm &&
                        <DmToggleControll
                          setDmTurn={setDmTurn}
                          encounter={data.encounter._id}
                          dmAction="toggleEncounter" 
                          text="Toggle Encounter"
                          sendMessage={sendMessage}
                          setEncounterActive={setEncounterActive}
                          encounterActive={encounterActive}
                          dmTurn={dmTurn}
                        />
                      }
                    </div>
                    </>
                  }

                </>
              }
            
              {/* Inactive / archived encounter dm controlls */}
              {(!encounterActive && data.user._id === data.encounter.dm)  &&
              <>
                  <span>This encounter has concluded</span>
                  <DmToggleControll
                     setDmTurn={setDmTurn}
                     encounter={data.encounter._id}
                     dmAction="toggleEncounter"
                     text="Toggle Encounter"
                     sendMessage={sendMessage}
                     setEncounterActive={setEncounterActive}
                     encounterActive={encounterActive}
                   />
                  <div className="d-flex">
                    {/* <!-- Button Deletion Modal --> */}
                    
                    <button type="button" className="shadow ms-3 mt-5 btn btn-danger shadow" data-bs-toggle="modal" data-bs-target="#deleteEncounter">
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
                  <div className="card-header row">
                    {round.player === "DM" && <><span className='col-4'>DM</span></>}
                    {round.player !== "DM" && <><span className='col-4'>{round.playerCharacter} ({round.player})</span></>}
                    {(data.user._id === data.encounter.dm && round.type === "textRound") &&
                      <>
                        <button type="button" className="col-md-3 col-lg-1 shadow btn btn-warning shadow" data-bs-toggle="modal" data-bs-target="#editRound">
                          Edit
                        </button>
                      </>
                    }
                    {data.user._id === data.encounter.dm &&
                      <>
                        <button type="button" className="ms-auto col-md-3 col-lg-1 shadow btn btn-danger shadow" data-bs-toggle="modal" data-bs-target="#deleteRound">
                          Delete
                      </button>
                      {/* <!-- Delete Round --> */}
                        <Delete
                          sendMessage={sendMessage}
                          setRounds={setRounds}
                          targetId={round._id}
                          target="Round"
                          rounds={rounds}
                          encounterId={data.encounter._id}
                        />
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
                        <PlayerRolling
                          roundId={round._id}
                          characterTurnId={characterTurn._id}
                          setRounds={setRounds}
                          sendMessage={sendMessage}
                          encounterId={data.encounter._id}
                        />
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
          {/* <Delete /> */}
        </>
      }
      <Footer />
    </>
  )
}