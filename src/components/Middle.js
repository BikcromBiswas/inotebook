import React from 'react'
import Addnote from './Addnote'
import Notes from '../components/Notes'

export default function Middle(props) {
  return (
    <>
        <Addnote  />
        <Notes showAlert={props.showAlert}/>
    </>
  )
}
