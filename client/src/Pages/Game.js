import React from 'react'
import { useParams, Link } from 'react-router-dom'
import Header from "../Components/Header"
import Footer from "../Components/Footer"
import { HeartFill } from 'react-bootstrap-icons';
import './Game.css'
import {Form} from "formik"

export default function Game() {
  const [data, setData] = React.useState(null)

  const { id } = useParams()
  const url = `/post/${id}`

  React.useEffect(() => {
    fetch(url, {headers : { 
      'Content-Type': 'application/json',
      'Accept': 'application/json'
     }})
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err)=> console.log(err))
  }, [url, id]);

  console.log(data)

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
    <>
      <Header page="else" />
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
          {data.party.find((member) => member.id === data.user.id) && data.characters.find((character) => character.user === data.user.id ) &&
            <span>Your character is in the game</span>
          }
          {(data.party.find((member) => member.id === data.user.id) && !data.characters.find((character) => character.user === data.user.id) && data.user.type !== "dm")  &&
            <button type="button" className="shadow ms-3 btn btn-primary" data-bs-toggle="modal" data-bs-target="#addCharacter">
            Add Character
          </button>
          }
        </div>
        <div className="container mt-5">
          <div className="d-flex justify-content-center mb-3">
            {/* <!-- DM Tools --> */}
            {data.user.id === data.post.user &&
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
            {data.encounters.length > 0 &&
              <>
              {
                data.encounters.map((encounter) => {
                  return (
                    <div key={ encounter._id} className={`encounterContained shadow card mb-3 text-white ${encounter.active ? " bg-success" : "bg - secondary"}`} style={{ width: 18 + 'rem' }} >
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
            {data.encounters.length === 0 && 
              <span>Adventure awaits!</span>  
            }
   
          </div>
        </div>

        {/* <!-- Modal Encounter --> */}
        <div className="modal fade" id="addEncounter" tabIndex="-1" aria-labelledby="addEncounterLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="newEncounterLabel">New Encounter</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <Form action={`/encounter/createEncounter/${data.post._id}`} encType="multipart/form-data" method="POST">
                  {/* <!-- Title --> */}
                  <div className="form-group mb-3">
                    <label htmlFor="encounterTitle">Title</label>
                    <input type="text" className="form-control" id="encounterTitle" placeholder="Enounter Title" name="title"/>
                  </div>
                  {/* <!-- Location --> */}
                  <div className="form-group mb-3">
                    <label htmlFor="encounterLocation">Encounter Location</label>
                    <input type="text" className="form-control" id="encounterLocation" placeholder="Encounter Location" name="location"/>
                  </div>
                  {/* <!-- Description --> */}
                  <div className="form-group mb-3">
                    <label htmlFor="encounterDescription">Encounter Description</label>
                    <textarea type="text" className="form-control" id="encounterDescription" placeholder="Encounter Description" name="description"></textarea>
                  </div>
                  {/* <!-- Image --> */}
                  <div className="form-group mb-3">
                    <label htmlFor="imgUpload" className="form-label">Image</label>
                    <input type="file" className="form-control" id="imageUpload" name="file"/>
                  </div>
                  {/* <!-- Players --> */}
                  <label className="mb-3">Party Members:</label>
                  {data.characters.length > 0 &&
                    <>
                    { data.characters.forEach((character) => {
                        <div className="form-check mb-3">
                          <input className="form-check-input" type="checkbox" value={character._id} id={ character._id} name="characters" />
                          <label className="form-check-label" htmlFor={ character._id }>
                            {character.name}
                          </label>
                        </div>
                      })}
                    </>
                  }
                  {data.characters.length === 0 &&
                    <span>Gather ye party!</span>
                  }
                  <button type="submit" className="mx-auto btn btn-primary" value="Upload">Submit</button>
                </Form>
              </div>
            </div>
          </div>
        </div>

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
    </>
  )
}


