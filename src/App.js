import './App.css';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Navbaar from './component/Navbaar';
import Home from './component/home';
import About from './component/about';
import NoteState from './context/notes/NoteState';
// import Alert from './component/Alert';
import Login from './component/Login';
import Signup from './component/Signup';

function App() {
  return (
    <>
    
      <NoteState>
        <BrowserRouter>

          <Navbaar />
          {/* <Alert message={"hello"}/> */}
          <div>
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/about" element={<About />} />
              <Route exact path="/login" element={<Login/>} />
              <Route exact path="/signup" element={<Signup/>} />
            </Routes>
          </div>



        </BrowserRouter>
      </NoteState>
     
    </>
  );
}

export default App;
