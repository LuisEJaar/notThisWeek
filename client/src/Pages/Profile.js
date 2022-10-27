import React from "react";
import Header from "../Components/Header"
import Footer from "../Components/Footer"
import { useParams, Link } from 'react-router-dom'
import CreateCharacter from '../Components/Forms/CharacterCreation'
import {Form} from 'formik'

export default function Profile() {
  const [data, setData] = React.useState(null)
  const [characters, setCharacters] = React.useState("")

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
                <Form action="/post/createPost" encType="multipart/form-data" method="POST">
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
                </Form>
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
                  <Link to={`/post/${post._id}?q=proxy`}>
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
                  }) }
                </div>
                </>
              }
          </div>   
        </div>
      </div>

      {/* Create Character */}
        <CreateCharacter setCharacters={ setCharacters } />
        </>
      }
      <Footer />
    </div>          
  )
}

