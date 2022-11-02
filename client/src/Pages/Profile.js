import React from "react";
import Header from "../Components/Header"
import Footer from "../Components/Footer"
import { useParams, Link } from 'react-router-dom'
import CreateCharacter from '../Components/Forms/CreateCharacter'
import CreateGame from "../Components/Forms/CreateGame";

export default function Profile() {
  const [data, setData] = React.useState(null)
  const [characters, setCharacters] = React.useState("")
  const [games, setGames] = React.useState("")

  const { id } = useParams()
  const url = `/api/userProfile/${id}`

  React.useEffect(() => {
    fetch(url, {
      method: "get",
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((res) => res.json())
      .then((data) => {
        setData(data)
        setCharacters(data.characters)
        setGames(data.posts)
      })
  }, [url, id]);
  
  console.log(data)
  
  return (
    <div className="vh-100 d-flex flex-column justify-content-between">
      <Header page="other" />
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
                  {/* // Button Creation Modal */}
                  <button type="button" className="shadow ms-3 btn btn-primary" data-bs-toggle="modal" data-bs-target="#createCharacter">
                    Create New Character
                  </button> 
                </div>
              }
              {(data.targetUser.type==="dm" && data.visitor._id ===data.targetUser._id) && 
                <div className="mt-3">
                  <h2>Add a game:</h2>
                  <button type="button" className="shadow ms-3 btn btn-primary" data-bs-toggle="modal" data-bs-target="#createGame">
                    Create New Game
                  </button>  
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
                <div className="row g-4">
                    {games.map((game) => { 
                      return (
                      <div key={game._id} className="col-md-6 col-lg-3 d-flex justify-content-center">
                          <div className="card gameDisplay" style={{ width: 18 + 'rem' }}>
                          <Link to={`/post/${game._id}`}>
                              <img alt="character" className="gamePicture card-img-top" src={game.image}/>
                            </Link>
                            <div className="card-body">
                            <p className="card-text">{ game.title }</p>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
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
                  <div className="row g-4">
                    {characters.map((character) => { 
                      return (
                      <div key={character._id} className="col-md-6 col-lg-3 d-flex justify-content-center">
                          <div className="card gameDisplay" style={{ width: 18 + 'rem' }}>
                          <Link to={`/character/${character._id}`}>
                              <img alt="character" className="gamePicture card-img-top" src={character.image}/>
                            </Link>
                            <div className="card-body">
                            <p className="card-text">{ character.name }</p>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                  </>
                }
            </div>   
          </div>
        </div>

        {/* Create Character Modal */}
        <CreateCharacter setCharacters={setCharacters} />
        {/* Create Game Modal*/}
        <CreateGame setGames={setGames}/>
      </>
      }
      <Footer />
    </div>          
  )
}

