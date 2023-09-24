
import NoteContext from './Notecontext'
import { useState } from 'react'
const NoteState = (props)=>
{
  console.log("calling no of times")
    let initialnotes = [];

    // ​‌‌‍⁡⁢⁢⁣STATE OF COMPONENT⁡​
    let [notes,setNote ]  = useState(initialnotes)

    //STATE OF MIDDLE COMPONENT
    let [load , setload] = useState(false);

    let host = 'http://localhost:5000'
    //funtion to calcualte the length of the notes
    
    //​‌‍‌⁡⁢⁣⁢FETCH ALL NOTES⁡​
    const getNotes =async ()=>
    {
      
      //​‌‍‌API CALLS​
      setload(true)

      const url = host+`/api/notes/fetchallnotes`;

      const response = await fetch(url, {
        method: "GET", 
        headers: {
          "Content-Type": "application/json",
          "auth-token":localStorage.getItem('token')
        },
        })
        let json = await response.json()
        setload(false)
        setNote(json)
        console.log(json)
    }
    // ⁡⁢⁣⁢​‌‍‌ADDING NOTE​⁡
    const addNote =async (description,title,tag)=>
    {
      console.log("title\n" + title +"\ndescription\n" + description + "\ntag\n" + tag);

      //​‌‍‌API CALLS​
      const url = host+`/api/notes/addnote`
      console.log("url\n"+url)
      const data = {
        "title":title,
        "description":description,
        "tag":tag
      }
      const response = await fetch(url, {
        method: "POST", 
        headers: {
          "Content-Type": "application/json",
          "auth-token":localStorage.getItem('token')
        },
        body: JSON.stringify(data),
        }).then(res=>
          {
             return res.json() // //console.log(res.json());
        })
        setNote(notes.concat(response))
        console.log(response)
    }
    // ⁡⁢⁣⁢​‌‍‌DELETING NOTE​⁡
    const deleteNote = async(noteid)=>
    {
      //TODO TO DELETE A NOTE
      console.log("noteId to delete\n" + noteid)
      console.log("your file is deleted")
      //function to delete a note from database
      const url = `${host}/api/notes/deletenote/${noteid}`
      const response = await fetch(url, {
        method: "DELETE", 
        headers: {
          "Content-Type": "application/json",
          "auth-token":localStorage.getItem('token')
        }
        })
        console.log(await response.json())
      const nwnote = notes.filter((note)=> noteid !== note._id)
      setNote(nwnote);
    }
    // ​‌‍‌⁡⁢⁣⁢EDIT⁡​ ⁡⁢⁣⁢​‌‍‌NOTE​⁡ 
    const editNote=async(noteid, title, tag, description)=>
    {
      //API call
      const url = `${host}/api/notes/updatenote/${noteid }`
      console.log("url\n" + url)
      console.log("noteid\n" + noteid)  
      console.log("title\n" + title +"\ndescription\n" + description + "\ntag\n" + tag);
      const data = {
        "title":title,
        "description":description,
        "tag":tag
      }
      const response = await fetch(url, {
        method: "PUT", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Content-Type": "application/json",
          "auth-token":localStorage.getItem('token')
        },
        body: JSON.stringify(data),
      }).then(res=>
        {
          //console.log(res)
        });

      //console.log("editfunction\n" + response)
      //LOGIC to edit in
      // for(let index=0 ; index< notes.length ;index++)
      // {
      //   const element =  notes[index];
      //   if(element._id ===  noteid)
      //   {
      //     element.title = title;
      //     element.description = description;
      //     element.tag = tag;
      //   }
      // }
      getNotes()
    }
    return (
        <NoteContext.Provider value={{notes,addNote,deleteNote,editNote,getNotes,load}}>
            {props.children}
        </NoteContext.Provider>
    )
}
export default NoteState;