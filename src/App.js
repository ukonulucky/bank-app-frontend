import './App.css';
import React from "react"
import Register from "./Pages/Register"
import Login from "./Pages/Login"
import {BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Homepage from './Pages/Homepage';
import store from "./redux/state"
import { Provider } from "react-redux"
import History from './Pages/History';


function App() {
  return (
    <Router>
      <Provider store={ store }>
      <div className="App">
        <Routes>
          <Route exact path="/register" element={ <Register/> } />
          </Routes>
          <Routes>
          <Route exact path="/history" element={ <History /> } />
        </Routes>
        <Routes>
          <Route exact path="/login" element={ <Login /> } />
        </Routes>
        <Routes>
          <Route exact path="/" element={ <Homepage /> } />
        </Routes>
        </div>
        </Provider>
      </Router>
  );
}

export default App;
