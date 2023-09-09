import React from 'react'
import Notes from '../components/Notes'
// import { useEffect } from 'react'

export default function Home() {

  return (
    <>
      <div className='container-fluid my-3 border border-danger'>
        <h1>Add a Note</h1>
        <form className='my-5'>
          <div className="mb-5">
            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" autoComplete='on' />
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
            <input type="password" className="form-control" id="exampleInputPassword1" autoComplete='off' />
          </div>

          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
        <div className="container my-3 ">
          <Notes />
        </div>
      </div>

    </>
  )
}
