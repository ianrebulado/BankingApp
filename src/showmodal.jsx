import React, { useState } from 'react'
import CreateUserModal from './CreateUserModal'

export default function Showmodal() {
    const [show, setShow] = useState(false)

  return (
    <>  
    <button onClick={() => setShow(true)}> Show Modal </button>
    <CreateUserModal onClose={()=> setShow(false)} show={show}/>
    </> 
  )
}
