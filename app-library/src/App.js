import './App.css';
import {Home} from './Home';
import {Book} from './Book';
import {BrowserRouter, Route, Routes, NavLink} from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
    <div className="App container">
         <h3 className="d-flex justify-content-center m-3">
           Библиотека №1
         </h3>

         <nav className="navbar navbar-expand-sm bg-light navbar-dark">
             <ul className="navbar-nav">
               <li className="nav-item- m-1">
                 <NavLink className="btn btn-light btn-outline-primary" to="home">Home</NavLink>
              </li>
              <li className="nav-item- m-1">
                <NavLink className="btn btn-light btn-outline-primary" to="book">Books</NavLink>
                </li>
            </ul>
        </nav>
        <Routes>
          <Route path='home' element={<Home />} />
          <Route path='book' element={<Book />} />
        </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
