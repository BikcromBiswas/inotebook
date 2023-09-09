import React from 'react'
import { useContext } from 'react'
import noteContext from '../context/notes/Notecontext'
import Noteitem from '../components/Noteitem'
export default function Notes() {
    const {note , setNote} = useContext(noteContext)
  return (
    
      <>
        <h2>Users Note</h2>
        <div className="row">
          {note.map((notes)=>
          {
            return <Noteitem key={notes._id} note = {notes} />
          })}
        </div>
      </>
   
  )
}
