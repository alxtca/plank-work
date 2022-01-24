import React, { useState, useEffect, useReducer } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import "./App.css"
import Main from "./pages/Main"
import Rules from "./pages/Rules"
import Setup from "./pages/Setup"
import NoPage from "./pages/NoPage"
import Layout from "./pages/Layout"
import StateContext from "./context/StateContext"
import DispatchContext from "./context/DispatchContext"
import WorkoutContext from "./context/WorkoutContext"

//to store selected workout
const LOCAL_STORAGE_KEY1 = "plank-workout"
//to store favorites
const LOCAL_STORAGE_KEY = "plank-workout-favorites"
//factory reset to default favorites
const default_favorites = [
  {id: 1, name: "Forearm Plank", work: 35, rest: 25, rounds: 4, delay: 9 },
  {id: 2, name: "Lateral Plank Walk", work: 35, rest: 25, rounds: 4, delay: 8 },
  {id: 3, name: "Straight-arm Plank", work: 35, rest: 25, rounds: 4, delay: 9 },
  {id: 4, name: "Dolphin Plank", work: 35, rest: 25, rounds: 4, delay: 9 },
  {id: 5, name: "Stir the pot Plank", work: 40, rest: 25, rounds: 4, delay: 9 },
  {id: 6, name: "Superman Plank", work: 40, rest: 25, rounds: 5, delay: 9 },
  {id: 7, name: "Alternating Side Planks", work: 30, rest: 5, rounds: 8, delay: 9 }
  ]


function App() {
  //selected workout
  const [workout, setWorkout] = useState({id: 0, work:49, rest:20, rounds:5, delay:8, name:"Plank"})
  // default exercises in favorites. Reset to include these.
  const initialState = (localStorage.getItem(LOCAL_STORAGE_KEY))
  ? (JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)))  
  : default_favorites

  //useReducer setup
  const [state, dispatch] = useReducer(reducer, initialState)

  function reducer(state, action) {
    switch(action.type) {
      case "get": //get values from local storage and replace state
        return (JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)))
        //JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))

      case "add"://add new workout to favorites
        return ([...state, 
          {id: Date.now(), 
          name: workout.name, 
          work: workout.work, 
          rest: workout.rest, 
          rounds: workout.rounds, 
          delay: workout.delay}])

      case "delete": //delete workout from favorites
        return (state.filter(obj => obj.id !== action.id))

      case "select": //select workout from favorites
        //replace content of workout with content from selected exercise
        const selected_exercise = state.filter(item => item.id === action.id)
        setWorkout(
          {work:selected_exercise[0].work, 
            rest:selected_exercise[0].rest, 
            rounds:selected_exercise[0].rounds, 
            delay:selected_exercise[0].delay, 
            name:selected_exercise[0].name,
            id:selected_exercise[0].id
          })
        return state
      
      case "factory_reset": //replace all data in state with default_favorites
        return default_favorites

      case "update_workout": //update selected workout in favorites
        var temp_state = state.map(obj => {
          if (obj.id === action.id) {
            return ({
              work:workout.work, 
              rest:workout.rest, 
              rounds:workout.rounds, 
              delay:workout.delay, 
              name:workout.name,
            })
          } else return obj
        })
        return temp_state

      default:
        return state
    }
  }

  // get from local storage workout
  useEffect(() => {
    if (localStorage.getItem(LOCAL_STORAGE_KEY1) ) {
      setWorkout(JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY1)))
    }
  }, [])
  // update work and rest values at local storage
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY1, JSON.stringify(workout))
  }, [workout])

  // get from local storage favorites
  useEffect(() => {
    if (localStorage.getItem(LOCAL_STORAGE_KEY) ) {
      dispatch({type: "get"})
    }
  }, [])

  //update favorites in local storage
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state))
  }, [state])


  return (
    <WorkoutContext.Provider value={{workout, setWorkout}}>
      <StateContext.Provider value={state}>
        <DispatchContext.Provider value={dispatch}>
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
        </DispatchContext.Provider>
      </StateContext.Provider>
    </WorkoutContext.Provider>
  )
}

export default App
