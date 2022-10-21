import React from "react"
import Header from "../Components/Header"
import Footer from "../Components/Footer"
import { Link } from "react-router-dom"


export default function GameFeed() {
  
  const [data, setData] = React.useState(null)

  const url = `/gameFeed`

  React.useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => setData(data))
  }, [url]);
  
  console.log(data)

  return (
    <>
      <Header page="else" />
      {data &&
      <>
        <div className="container">
          <h1 className="m-3">Browse all games:</h1>
        <div className="row g-4">
            {data.posts.map((post) => { 
              return (
              <div key={post._id} className="col-md-6 col-lg-3 d-flex justify-content-center">
                  <div className="card gameDisplay" style={{ width: 18 + 'rem' }}>
                  <Link to={`/post/${post._id}`}>
                      <img alt="game" className="gamePicture card-img-top" src={post.image}/>
                    </Link>
                    <div className="card-body">
                    <p className="card-text">{ post.title }</p>
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