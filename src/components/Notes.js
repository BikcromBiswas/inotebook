import React, { useEffect } from 'react'
import { useContext } from 'react'
import noteContext from '../context/notes/Notecontext'
import Noteitem from '../components/Noteitem'
import { redirect } from 'next/dist/server/api-utils'
import { useNavigate } from 'react-router-dom';
export default function Notes() {
    let {notes ,getNotes} = useContext(noteContext)
    const navigate = useNavigate()
    useEffect(()=>
    {
      console.log(localStorage.getItem('token'))
      if(localStorage.getItem('token'))
       { getNotes()}
       else
       {
        console.log('hel')
        navigate('/login')
       }
    },[])
    //console.log(notes)
  return (
    
      <>
        <h2>Users Note</h2>
        <div className="row">
        <div className="container">
          {notes.length === 0 && "No notes found"}
        </div>
          {notes.map((note)=>
          {
            return <Noteitem key={note._id} note = {note} />
          })}
        </div>
      </>
   
  )
}
