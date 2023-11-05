import React from 'react'

export default function Modal({title, children}) {
  return (
    <div class="modal-container">
        <div class="modal">
            <h1> Modal </h1>
            <p> Lorem ipsum dolor sit amet consectetur, adipisicing elit. Et, ut.</p>
            <button id="close"> Close </button>
        </div>
    </div>
  )
}
