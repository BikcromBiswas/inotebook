import React, { useState } from 'react'
// import { useHistory } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
const Signup = (props) => {

  const [credentials, setCredentials] = useState({name:"", email: "", password: "",cpassword:""})
  // let history = useHistory();
  let navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/createuser", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({name:credentials.name ,  email: credentials.email, password: credentials.password })
    });
    const json = await response.json()
    console.log(json);
    if (json.success) {
      // Save the auth token and redirect
      localStorage.setItem('token', json.authtoken);
      // history.push("/");
      navigate("/");
      props.showAlert("Account Created Successfully" , "success")
    }
    else
    {
      props.showAlert("Invalid Credentials" , "danger")
    }
  }

  const  onChange= (e) => {
    console.log(e.target.name + e.target.value)
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }



  return (
    <>
      <section class="vh-100" style={{ backgroundColor: "#508BFC" }}>
        <div class="container h-100">
          <div class="row d-flex justify-content-center align-items-center h-100">
            <div class="col-lg-12 col-xl-11">
              <div class="card text-black" style={{ borderRadius: "25" + "px" }}>
                <div class="card-body p-md-5">
                  <div class="row justify-content-center">
                    <div class="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                      <p class="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>

                      <form class="mx-1 mx-md-4" onSubmit={handleSubmit}>

                        <div class="d-flex flex-row align-items-center mb-4">
                          <i class="fas fa-user fa-lg me-3 fa-fw"></i>
                          <div class="form-outline flex-fill mb-0">
                            <input type="text" id="name" name="name" class="form-control" onChange={onChange} />
                            <label class="form-label" for="name">Your Name</label>
                          </div>
                        </div>


                        <div class="d-flex flex-row align-items-center mb-4">
                          <i class="fas fa-envelope fa-lg me-3 fa-fw"></i>
                          <div class="form-outline flex-fill mb-0">
                            <input type="email" id="email" name='email' class="form-control" onChange={onChange} />
                            <label class="form-label" for="email" aria-required>Your Email</label>
                          </div>
                        </div>

                        <div class="d-flex flex-row align-items-center mb-4">
                          <i class="fas fa-lock fa-lg me-3 fa-fw"></i>
                          <div class="form-outline flex-fill mb-0">
                            <input type="password" id="password" name='password' class="form-control" onChange={onChange} />
                            <label class="form-label" for="password" minLenght={5} 
                            required>Password</label>
                          </div>
                        </div>


                        <div class="d-flex flex-row align-items-center mb-4">
                          <i class="fas fa-key fa-lg me-3 fa-fw"></i>
                          <div class="form-outline flex-fill mb-0">
                            <input type="password" id="cpassword" name='cpassword'
                              class="form-control" onChange={onChange} minLenght={5} required/>
                            <label class="form-label" for="cpassword">Repeat your password</label>
                          </div>
                        </div>



                        <div class="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                          <button type="submitonchange={onChange}" class="btn btn-primary btn-lg">Register</button>
                        </div>

                      </form>

                    </div>
                    <div class="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                      <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                        class="img-fluid" alt="Sample" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
export default Signup