import React from 'react'

export default function CreateUserModal(props) {
    if(!props.show){
        return null
    }

  return (
   <div className="modal">
    <div className="modal-content">
        <div className="modal-header">
            <h4 className="modal-title"> Create User </h4>
        <div className="modal-body">
                <form>
                    
                </form>
        </div>
        <div className="modal-footer">
            <button type='submit'> Create </button>
            <button onClick={props.onClose} className="close-btn"> Close </button>
        </div>
        </div>
    </div>
   </div>
  )
}
