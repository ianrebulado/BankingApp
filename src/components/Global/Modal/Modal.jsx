import React from 'react'

export default function Modal({title, children}) {
  return (
    <div className="modal">
        <div className="modal-content">
            <div className="modal-header">
                <h2 className="modal-title">{title}</h2>
            </div>
        </div>
        <div className="modal-body">
            {children}
        </div>
    </div>
  )
}
