import { React, useContext, useState } from 'react'
import noteContext from '../context/notes/Notecontext'
export default function Addnote() {
    const { addNote } = useContext(noteContext)
    const [notes, setNotes] = useState({ title: "", description: "", tag: "" })
    const handleSubmit = (e) => {
        e.preventDefault()
        addNote(e.target.elements.description.value, e.target.elements.title.value, e.target.elements.tag.value);
    }
    const onchange = (e) => 
    {
        setNotes({ ...notes, [e.target.name]: e.target.value })
    }
return (
    <>
        <div className='container-fluid my-3 border border-danger'>
            <h1>Add a Note</h1>
            <form className='my-5' onSubmit={handleSubmit} action='\'>
                <div className="mb-5">
                    <label htmlFor="title" className="form-label">title</label>
                    <input onChange={onchange} type="text" className="form-control" name="title" autoComplete='off' placeholder="title" />
                </div>
                <div className="mb-3">
                    <label htmlfor="description" className="form-label"> description </label>
                    <textarea onChange={onchange} className="form-control" id="exampleFormControlTextarea1" rows="3" name="description" placeholder="description"></textarea>
                </div>
                <div className="mb-3">
                    <label htmlfor="tag" className="form-label">tag</label>
                    <textarea onChange={onchange} className="form-control" id="exampleFormControlTextarea1" rows="1" name="tag" placeholder="tag"></textarea>
                </div>
                <button disabled={notes.title.length<5 || notes.description.length<5 || notes.tag.length<3} type="submit" className="btn btn-primary"  >Add note</button>
            </form>
        </div>
    </>
)
}
