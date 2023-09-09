import React from 'react'
import Alert2 from './Alert2'
import { Cursor } from 'mongoose'
export default function Noteitem(props) {
    const { note } = props
    const handlechange = async() => {
        console.log("alert" +Alert2())
    }
    return (
        <>
            <div className='col-md-3 col-sm-6 '>
                <div className="card my-3" >
                    <div className="card-body">
                        <h5 className="card-title">{note.title}</h5>
                        <p className="card-text">{note.description} Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur quisquam suscipit consequatur, officiis, natus cumque voluptas fugit totam ratione id quos. Eius exercitationem id consequatur facilis quasi quos vero libero.</p>
                        <div className="containerfluid d-flex justify-content-between">
                            <div style={{cursor:'pointer'}}><i className="fa-solid fa-pen-to-square fa-sm"></i></div>
                            <div style={{cursor:'pointer'}}><i className="fa-solid fa-trash fa-sm" onClick={handlechange}></i></div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
