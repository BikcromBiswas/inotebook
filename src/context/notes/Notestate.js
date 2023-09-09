
import NoteContext from './Notecontext'
import { useState } from 'react'
const NoteState = (props)=>
{
    let initialnotes = [{
        "_id": "64f3110a7d2eb293860791de",
        "user": "64e5ebf0ccfd3bed6b2dd5cc",
        "title": "web development",
        "description": "How to start development",
        "tag": "code",
        "date": "2023-09-02T10:40:10.985Z",
        "__v": 0
      },
      {
        "_id": "64f314f4a85aa4ce1f7806d5",
        "user": "64e5ebf0ccfd3bed6b2dd5cc",
        "title": "web development",
        "description": "How to start development",
        "tag": "code",
        "date": "2023-09-02T10:56:52.742Z",
        "__v": 0
      },
      {
        "_id": "64f3151c576ff51cd76faf4a",
        "user": "64e5ebf0ccfd3bed6b2dd5cc",
        "title": "web development",
        "description": "How to start development",
        "tag": "code",
        "date": "2023-09-02T10:57:32.894Z",
        "__v": 0
      },
      {
        "_id": "64f315349542779d82576fbb",
        "user": "64e5ebf0ccfd3bed6b2dd5cc",
        "title": "web development",
        "description": "How to start development",
        "tag": "code",
        "date": "2023-09-02T10:57:56.710Z",
        "__v": 0
      },
      {
        "_id": "64f3196b1adf07efbc28efce",
        "user": "64e5ebf0ccfd3bed6b2dd5cc",
        "title": "To check the  note check point",
        "description": "we are going to check whether this end point is working or not",
        "tag": "fake tag",
        "date": "2023-09-02T11:15:55.232Z",
        "__v": 0
      }];
    const [note,setNote ]  = useState(initialnotes)
    return (
        <NoteContext.Provider value={{note,setNote}}>
            {props.children}
        </NoteContext.Provider>
    )
}
export default NoteState;