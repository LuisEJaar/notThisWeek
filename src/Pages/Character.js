import React from 'react'
import { useParams, Link } from 'react-router-dom'
import Header from "../Components/Header"
import Footer from "../Components/Footer"

export default function Character() {
  const [data, setData] = React.useState(null)

  const { id } = useParams()
  const url = `/character/${id}`

  React.useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data)=> setData(data))
  }, [url, id]);
  
  console.log(data)

  return ( 
    <>
      <Header page="other" />
      {data && 
        <>
        <div className="m-2">
          <Link className="btn btn-primary shadow me-2" to={`/userProfile/` + data.character.user}>User Profile</Link>
          {data.character.game &&
           <Link className="btn btn-primary shadow me-2" to={`/post/` + data.character.game}>Active game</Link>
          }
        </div>
        <div className="container">
          <img alt='character' className="img-fluid rounded profileGame" src={ data.character.image}/>
          <h2>{data.character.name}</h2> 
          <h3>Lvl: {data.character.lvl} className: {data.character.className}</h3>
          <h3>Age:</h3>
          <span>{data.character.age}</span>
          <h3>Race:</h3>
          <span>{data.character.race}</span>
          <h3>Gender:</h3>
          <span>{data.character.gender}</span>
          <h3>AC:</h3>
          <span>{data.character.ac}</span>
          <h3>Money:</h3>
          <table>
            <thead>
              <tr>
                <th>Coin:</th>
                <th>Qty:</th>
              </tr>
            </thead>
            <tbody>
            {Object.keys(data.character.currency).map((currency) => {
              return (
                <tr key={currency}>
                  <td>{currency}</td>
                  <td>{data.character.currency[currency]}</td>
                </tr>
                )
              })}
            </tbody>
            </table>
          <div className="mt-3">
            <h2>Character Attributes:</h2>
            <ul>
              {Object.keys(data.character.abilities).map((ability) => {
                return (
                  <li key={ability}>{ability}: {data.character.abilities[ability]}</li>
                )
              })}
            </ul>
          </div>
          <div className="container mt-3">
            <h2>Saving Throw Modifiers:</h2>
            <table>
              <thead>
                <tr>
                  <th>Prof</th>
                  <th>Throw</th>
                  <th>Modifier</th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(data.character.saveModifiers).map((sThrow) => {
                  return (
                    <tr key={ sThrow }>
                      <td>
                        {data.character.saveProficiencies[sThrow] && <i className="bi-circle-fill"></i>}
                        {!data.character.saveProficiencies[sThrow] && <i className="bi-circle"></i>}
                      </td>
                      <td>{sThrow}</td>
                      <td>
                        {data.character.saveModifiers[sThrow] > -1 && <span>{`+ ${data.character.saveModifiers[sThrow]}`}</span>}
                        {data.character.saveModifiers[sThrow] <= -1 && <span>{data.character.saveModifiers[sThrow]}</span>}
                      </td>
                    </tr>
                    )
                  })
                }
              </tbody>
            </table>
          </div>
          <div className="container mt-3">
            <h2>Character Skills</h2>
            <table>
              <thead>
                <tr>
                  <th>Prof</th>
                  <th>Skill</th>
                  <th>Modifier</th>
                </tr>
              </thead>
              <tbody>
              {Object.keys(data.character.skillProficiencies).map((skill) => {
                return (  
                  <tr key={ skill }>
                    <td>
                      {data.character.skillProficiencies[skill] && <i className="bi-circle-fill"></i>}
                      {!data.character.skillProficiencies[skill] && <i className="bi-circle"></i>}
                    </td>
                    <td>{skill}</td>
                    <td>
                      {data.character.skillModifiers[skill] > -1 && <span>{`+${data.character.skillModifiers[skill]}`}</span>}
                      {data.character.skillModifiers[skill] <= -1 && <span>{data.character.skillModifiers[skill]}</span>}
                    </td>
                  </tr>
                )
              })}
              </tbody>
            </table>
          </div>
        </div>
        </>
      }
      <Footer />
    </>
  )
}



