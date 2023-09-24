import { useState} from 'react'
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
} from "react-router-dom";
import NoteState from "./context/notes/Notestate.js";
import Navbar from "./components/Navbar.js";
import Home from "./components/Home"
import About from "./components/About"
import Login from "./components/Login";
import Signup from "./components/Signup";
import Alert from './components/Alert';
function App() {
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type)=>{
      console.log('inaler')
      setAlert(
        {
        msg: message,
        type: type
      })
      setTimeout(() => {
          setAlert(alert);
      }, 1500);
  }
  return (
    <>
      <NoteState> {/*//​‌‍‌⁡⁢⁣⁢THIS IS A NOTE CONTEXT⁡​*/}
        <BrowserRouter>
          <Navbar />
          <Alert alert={alert}/>
          <div className="container-fluid">
            <Routes>
              <Route path='/' element={<Home showAlert={showAlert}/>} />
              <Route path='/Home' element={<Home showAlert={showAlert}/>} />
              <Route path='/about' element={<About />} />
              <Route path='/login' element={<Login showAlert={showAlert}/>} />
              <Route path='/signup' element={<Signup showAlert={showAlert}/>} />
            </Routes>
          </div>
        </BrowserRouter>
      </NoteState>
    </>
  );
}

export default App;
