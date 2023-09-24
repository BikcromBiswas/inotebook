import React, { useState } from 'react'

import Loader from './Loader'
import Middle from './Middle'
import noteContext from '../context/notes/Notecontext'
export default function Home(props) {


  const context = React.useContext(noteContext)
  const { load } = context
  console.log("load" + load)
  return (
    <>
      <div className="container-fluid p-5">
         <Middle showAlert={props.showAlert}/>
      </div>
    </>
  )
}
