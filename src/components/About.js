// import { useContext } from "react"
import {React,useContext} from 'react'
import noteContext from '../context/notes/Notecontext'

export default function About() {
  const a = useContext(noteContext)
  return (
    <div>
      This is about 
    </div>
  )
}
