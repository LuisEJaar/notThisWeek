import React from "react"
import Header from "../Components/Header"
import Footer from "../Components/Footer"
import { Link } from "react-router-dom"


export default function CharacterFeed() {
  
  const [data, setData] = React.useState(null)

  const url = `/characterFeed`

  React.useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data)=> setData(data))
  }, [url]);
  
  console.log(data)
  
  return (
    <>
      <Header page="else" />
      {data &&
      <>
        <div className="container">
          <h1 className="m-3">Browse all characters:</h1>
        <div className="row g-4">
            {data.characters.map((character) => { 
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
        </div>  
      </>
      }
      <Footer />
    </>
  )
}
