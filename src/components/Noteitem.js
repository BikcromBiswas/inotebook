import React, { useContext } from 'react'

import Swal from 'sweetalert2'
import noteContext from '../context/notes/Notecontext'

export default function Noteitem(props) {
    const { note } = props
    const { deleteNote, editNote } = useContext(noteContext);


    const handleedit = async (note) => {
        // //console.log(document.getElementByName('body'))
        // Call the function to apply the styles
        var element = document.querySelectorAll('body.swal2-shown > [aria-hidden="true"]');
        //console.log(element);
        const { value: formValues } = await Swal.fire({
            width: "80%",
            inputAutoFocus: 'false',
            position: 'top',
            heightAuto: 'false',
            html:
            `<input id="swal-input1" class="swal2-input w-75 overflow-hidden" placeholder="Title" value="${note.title}">`+
            '<div class="container-fluid d-flex" style="justify-content:end;">'+
            `<input id="swal-input2" class="swal2-input d-block" placeholder="Tag" value="${note.tag}">`+
            '</div>',
            // '<div class="container-fluid d-flex justify-content-center">' +
            // `<input id="swal-input2" class="swal2-input d-block" placeholder="Tag" value="${note.tag}">` +
            // '</div>' +
            // '<textarea id="swal-textarea" class="swal2-textarea" placeholder="Text area"></textarea>',
            input: 'textarea',
            inputPlaceholder: "Description",
            inputValue: note.description,
            customClass: {
                container: 'my-modal-container',
                popup: 'my-modal-popup',
            },
            didOpen: (value) => {
                //console.log(value)
                const textarea = document.getElementById('swal2-textarea');
                textarea.style.height = '20rem'
            },
            inputValidator: (value) => {
                //console.log(value)
                return new Promise((resolve) => {
                    const input1 = document.getElementById('swal-input1');
                    const input2 = document.getElementById('swal-input2');
                    if(input1.value.length === 0){
                        resolve('Title cannot be empty')
                    }
                    else if(input2.value.length === 0){
                        resolve('Tag cannot be empty')
                    }
                    if (value.length === 0) {
                        resolve('Note cannot be empty')

                    }
                    else {
                        resolve()
                    }
                })
            },
            showCancelButton: true
        })

        if (formValues) {
            // Swal.fire(text)
            const title = document.getElementById('swal-input1');
            console.log("In noteitem\n" + title.value)
            const tag = document.getElementById('swal-input2');
            console.log("In noteitem\n" + tag.value)
            const description = document.getElementById('swal2-textarea').value;
            console.log("In noteitem\n" + formValues)
            editNote(note._id, title.value, tag.value, formValues)
        }
    }
    const handlechange = async (noteid) => {
        let a = await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
            reverseButtons: 'true'
        }).then((result) => {
            if (result.isConfirmed) {
                deleteNote(noteid)
                Swal.fire(
                    'Deleted!',
                    'Your Note has been deleted.',
                    'success'
                )
            }
        })
        console.log(a)
    }
    return (
        <>
            <div className='col-md-3 col-sm-6 '>
                <div className="card my-3" >
                    <div className="card-body">
                        <h5 className="card-title ">{note.title}</h5>
                        <p className="card-text">{note.description} </p>
                        <div className="containerfluid d-flex justiy-content-center">

                        </div>
                        <div className="containerfluid d-flex justify-content-between">
                            <div style={{ cursor: 'pointer' }}><i className="fa-solid fa-pen-to-square fa-sm" onClick={() => handleedit(note)}></i></div>
                            <p className="card-text d-flex justify-content-end  text-secondary m-0 p-0 ">{note.tag}</p>
                            <div style={{ cursor: 'pointer' }}><i className="fa-solid fa-trash fa-sm" onClick={() => handlechange(note._id)}></i></div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
