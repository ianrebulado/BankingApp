import React from 'react'

export default function Modal({title, children}) {
  return (
    <div className="modal-container">
        <div className="modal">
            <h1>{ title }</h1>
            <div>{ children }</div>
            <button id="close"> Close </button>
        </div>
    </div>
  )
}
