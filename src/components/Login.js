import React, { useState } from 'react'
// import { useHistory } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';

const Login = (props) => {
  const [credentials, setCredentials] = useState({ email: "", password: "" })
  // let history = useHistory();
  let navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: credentials.email, password: credentials.password })
    });
    const json = await response.json()
    console.log(json);
    if (json.success) {
      // Save the auth token and redirect
      localStorage.setItem('token', json.authtoken);
      // history.push("/");
      props.showAlert("Logged in  Successfully" , "success")
      navigate("/");
    }
    else {
      props.showAlert("Invalid Credentials" , "danger")
    }
  }

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }

  return (
    /*<div>
        <form  onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email address</label>
                <input type="email" className="form-control" value={credentials.email} onChange={onChange} id="email" name="email" aria-describedby="emailHelp" />
                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" className="form-control" value={credentials.password} onChange={onChange} name="password" id="password" />
            </div>

            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    </div>*/
    <section className="vh-100" style={{ backgroundColor: '#508bfc' }}>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div className="card shadow-2-strong" style={{ borderRadius: "1" + "rem" }}>
              <div className="card-body p-5 text-center">

                <h3 className="mb-5">Sign in</h3>
                <form onSubmit={handleSubmit}>
                  <div className="form-outline mb-4">
                    <input type="email"  className="form-control form-control-lg" value={credentials.email} onChange={onChange} id="email" name="email" aria-describedby="emailHelp"/>
                    <label className="form-label" htmlFor="email">Email</label>
                  </div>

                  <div className="form-outline mb-4">
                    <input type="password"  className="form-control form-control-lg" value={credentials.password} onChange={onChange} name="password" id="password" />
                    <label className="form-label" htmlFor="password" >Password</label>
                  </div>
                  <button className="btn btn-primary btn-lg btn-block" type="submit">Login</button>
                </form>
                <hr className="my-4" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Login