import React, { useState, useEffect } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import "./App.css"
import Main from "./pages/Main"
import Rules from "./pages/Rules"
import Setup from "./pages/Setup"
import NoPage from "./pages/NoPage"
import Layout from "./pages/Layout"

function App() {
  //workout object
  const [workout, setWorkout] = useState({work:40, rest:20, rounds:5})
  // get from local storage work and rest values
  useEffect(() => {
    if (localStorage.getItem("plank-workout") ) {
      setWorkout(JSON.parse(localStorage.getItem("plank-workout")))
    }
  }, [])
  // update work and rest values at local storage
  useEffect(() => {
    localStorage.setItem("plank-workout", JSON.stringify(workout))
  }, [workout])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Main workout={workout} setWorkout={setWorkout}/>} />
          <Route path="rules" element={<Rules />} />
          <Route path="setup" element={<Setup workout={workout} setWorkout={setWorkout} />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
