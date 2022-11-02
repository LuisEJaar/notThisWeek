
import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function DeleteEncounter({target, encounterId}) {
  const targetUrl = `https://notthisweek.herokuapp.com/api/encounter/deleteEncounter/${encounterId}`

  const navigate = useNavigate()

  async function deleteHandler() {
    try {
      const response = await fetch(targetUrl, {
        method: 'delete',
        headers: {
          'Content-Type': 'application/json'
        },
      })
  
      const data = await response.json()
      if (data) {
        navigate(data?.redirect)
      }
    }
    catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="modal fade" id={`delete${target}`} tabIndex="-1" aria-labelledby={`delete${target}Label`} aria-hidden="true">
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title" id="deleteEncounterLabel">Warning!</h5>
          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div className="modal-body">
            { target } deletion cannot be undone, you're condemning this moment to fantasy death!
        </div>
        <div className="modal-footer">
          <button className="btn btn-danger" onClick={deleteHandler} data-bs-dismiss="modal">Do it</button>
        </div>
      </div>
    </div>
  </div>
  )
}