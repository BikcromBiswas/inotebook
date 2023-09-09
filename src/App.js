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
function App() {
  return (
    <>
      <NoteState> {/*//​‌‍‌⁡⁢⁣⁢THIS IS A NOTE CONTEXT⁡​*/ }
        <BrowserRouter>
          <Navbar />
          <div className="container-fluid">
          <Routes>
            <Route path='/' element ={<Home />} />
            <Route path='/Home' element={<Home />} />
            <Route path='/about' element={<About />} />
          </Routes>
          </div>
        </BrowserRouter>
      </NoteState>
    </>
  );
}

export default App;
