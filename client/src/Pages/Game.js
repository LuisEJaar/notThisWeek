import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { HeartFill } from 'react-bootstrap-icons';
import { Form } from "formik"

import Header from "../Components/Header"
import Footer from "../Components/Footer"
import CreateEncounter from '../Components/Forms/CreateEncounter';

import './Game.css'

export default function Game() {
  const [data, setData] = React.useState(null)
  const [encounters, setEncounters] = React.useState("")

  const { id } = useParams()
  const url = `/api/post/${id}`

  React.useEffect(() => {
    console.log("Game UseEffect Started")
    fetch(url, {headers : { 
      'Content-Type': 'application/json',
      'Accept': 'application/json'
     }})
      .then((res) => res.json())
      .then((data) => { 
        setData(data)
        setEncounters(data.encounters)
      })
      .catch((err) => console.log(err))
  }, [url, id]);

  console.log(data)

  //Manage likes on game
  function LikeHandler(e) {
    e.preventDefault()
    const newLikes = {
      ...data.post,
      likes: data.post.likes + 1
    }
    setData({ 
        ...data,
       post: newLikes
    })
  }
 
  return (
    <div className="vh-100 d-flex flex-column justify-content-between">
      <Header page="other" />
      {data && 
        <>
        <div className="container">
          <div className="mt-2">
            <span>This game brought to you by:</span>
            <Link className="btn btn-primary shadow" to={`/userProfile/${data.post.user}`}>DM Profile</Link>
          </div>
          <div className="mt-5">
              <h2>Game Title:</h2>
            <h3>{ data.post.title }</h3>
              <img className="mx-auto img-fluid shadow rounded currentEncounterGameImage" src={ data.post.image } alt="post"/>
              <div className="d-flex m-2">
              <Form
                  onSubmit={LikeHandler}
                  className="m-2"
                >
                  <button className="btn btn-primary shadow" type="submit"><HeartFill/></button>
                </Form>
                <h3 className="m-2">Likes: { data.post.likes }</h3>
              </div>
            <div>
              <h3>Description:</h3>
              <p>{ data.post.caption }</p>
            </div>
            <div>
              <h3>Current Players:</h3>
              {data.party.length > 0 &&
                <>
                {
                  data.party.map(member => {
                    return(
                      <Link key={ member._id } className="btn btn-primary shadow me-2" target="_blank" to={`/userProfile/${member._id}`}>{ member.userName}</Link>
                    )
                  })
                }
                </>
              }
              {data.party.length === 0 && 
                <span>Gather ye party!</span>
              }
            
            </div>
            <div className="mt-2">
              <h3>Player Characters:</h3>
              {data.characters.length > 0 &&
                <>
                  {
                    data.characters.map(character => {
                      return (
                        <Link key={character._id} className="btn btn-primary shadow me-2" target="_blank" to={`/character/${character._id}`}>{ character.name}</Link>
                      )
                    })
                  }
                </>
              }
              {data.characters.length === 0 && 
                <span>Gather ye party!</span> 
              }
            </div>
          </div>
        </div>
        <div className="container mt-5">
          {/* <!-- Player Tools --> */}
          {(data.party.find((member) => member._id === data.user._id) && data.characters.find((character) => character.user === data.user._id )) &&
            <span>Your character is in the game</span>
          }
          
          {(data.party.find((member) => member._id === data.user._id) === undefined && data.user._id !== data.post.user) &&
            <span>You are not a part of this game</span>
          }

          {(data.party.find((member) => member._id === data.user._id) && data.characters.find((character) => character.user === data.user._id) === undefined && data.user.type !== "dm")  &&
            <button type="button" className="shadow ms-3 btn btn-primary" data-bs-toggle="modal" data-bs-target="#addCharacter">
            Add Character
          </button>
          }
        </div>
        <div className="container mt-5">
          <div className="d-flex justify-content-center mb-3">
            {/* <!-- DM Tools --> */}
            {data.user._id === data.post.user &&
              <>
              <button type="button" className="shadow btn btn-primary" data-bs-toggle="modal" data-bs-target="#addEncounter">
              Add encounter
            </button>
            <button type="button" className="shadow ms-3 btn btn-primary" data-bs-toggle="modal" data-bs-target="#addPlayer">
              Add player
            </button>
            {/* <!-- Button Deletion Modal --> */}
            <button type="button" className="shadow ms-3 btn btn-danger" data-bs-toggle="modal" data-bs-target="#deleteGame">
              Delete Game
            </button>
              </>}
          </div>
          <h2>Game Encounters:</h2>
          <div className="encounterContainer">
            {encounters.length > 0 &&
              <>
              {
                encounters.map((encounter) => {
                  return (
                    <div key={ encounter._id} className={`encounterContained shadow card mb-3 text-white ${encounter.active ? " bg-success" : "bg-secondary"}`} style={{ width: 18 + 'rem' }} >
                      {encounter.active && <span className="badge bg-primary">Active</span>}
                      {!encounter.active && <span className="badge bg-secondary">Archived</span>}
                      <img src={ encounter.image} className="encounterPicture card-img-top" alt="encounter" />
                      <div className="card-body">
                        <h5 className="card-title">Title</h5>
                        <p className="card-text">{encounter.title}</p>
                      </div>
                      <div className="card-body">
                        <h5 className="card-title">Location</h5>
                        <p className="card-text">{encounter.location}</p>
                      </div>
                      <div className="card-body">
                        <h5 className="card-title">Description</h5>
                        <p className="card-text">{encounter.description}</p>
                      </div>
                      <div className="card-body">
                        <Link to={'/encounter/' + encounter._id} className="text-white">Open Encounter</Link>
                      </div>
                    </div>
                  )
                })
              }
              </>
            }
            {encounters.length === 0 && 
              <span>Adventure awaits!</span>  
            }
   
          </div>
        </div>

        {/* <!-- Modal Encounter --> */}
        <CreateEncounter
          setEncounters={setEncounters}
          encounters={encounters}
          post={data.post}
          characters={data.characters}
          data={data}
        />

        {/* <!-- Modal Player --> */}
        <div className="modal fade" id="addPlayer" tabIndex="-1" aria-labelledby="addPlayerLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="newPlayerLabel">Player to add</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <Form action={`/player/addGame/${data.post._id}?_method=PUT`} method="POST">
                  <label htmlFor="playerList" className="form-label">Player List</label>
                  <select className="form-control" name="playerId" id="playerList">
                    <option value="">Warriors! Come out to playeeyay</option>
                    { data.players.forEach(player => {
                      <option value={player._id}>{ player.userName }</option>
                    })
                    }
                  </select>
                  <button type="submit" className="mt-2 btn btn-primary">Add to party</button>
                </Form>
              </div>
            </div>
          </div>
        </div>
        
        {/* <!-- Modal Character --> */}
        <div className="modal fade" id="addCharacter" tabIndex="-1" aria-labelledby="addCharacterLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="newCharacterLabel">Character to add</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <Form action={`/character/addGame/${data.post._id}?_method=PUT`} method="POST">
                  <label htmlFor="playerList" className="form-label">Character List</label>
                  <select className="form-control" name="characterId" id="characterList">
                    <option value="">Warriors! Come out to playeeyay</option>
                    {data.visitorCharacters.forEach(visitorCharacter => {
                      <option value={visitorCharacter._id}>{ visitorCharacter.name }</option>
                    }) }
                  </select>
                  <button type="submit" className="mt-2 btn btn-primary">Add to party</button>
                </Form>
              </div>
            </div>
          </div>
        </div>

        {/* <!-- Delete Game --> */}
        <div className="modal fade" id="deleteGame" tabIndex="-1" aria-labelledby="deleteGameLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="deleteGameLabel">Warning!</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                Game deletion cannot be undone, you're condemning your world to fantasy death!
              </div>
              <div className="modal-footer">
                <Form
                  action={`/post/deletePost/${data.post._id}?_method=DELETE`}
                  method="POST"
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
    </div>
  )
}


