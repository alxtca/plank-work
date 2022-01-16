//hm, doesn't work
//import values from '../App'

import React, {useState, useEffect} from "react"
import useSound from 'use-sound'
import boopSfx from '../sounds/beep-07a.mp3'
import boopEnd from '../sounds/applause.wav'

const Main = (props) => {
  const [working, setWorking] = useState(false)
  const [fanfara, setFanfara] = useState(false)
  //make local copy of set up values
  //const [workoutTemp, setWorkoutTemp] = useState({work: props.workout.work, rest: props.workout.rest, rounds: props.workout.rounds})
  const [work, setWork] = useState(props.workout.work)
  const [rest, setRest] = useState(props.workout.rest)
  const [rounds, setRounds] = useState(1)
  const [play] = useSound(boopSfx)
  const [playEnd] = useSound(boopEnd)

  useEffect(()=>{

    if (working)
    {
      if (work > 0) { //countdown work
        setTimeout(() => {
          if (work < 4) {  play()   }
          setWork(work-1)
        }, 1000)
      }
      if (work === 0) { //countdown rest
        if (rest > 0){
          setTimeout(() => {
            if (rest < 4) {  play()   }
            setRest(rest-1)
          }, 1000)
        }
        if (rest === 0) { // --round
          if (rounds < props.workout.rounds) {
            setRounds(rounds +1)
            //reset work and rest counters
            setWork(props.workout.work)
            setRest(props.workout.rest)
          } 
          else { //no more rounds to go. stop workout
            setWorking(false)
            // fanfara can be added here
            setFanfara(true)
            playEnd()
          }
        }
      }
    }
    else //workout has been stopped, reset all values
    {
      setWork(props.workout.work)
      setRest(props.workout.rest)
      setRounds(1)
    }
  }, [work, rest, rounds, working, props.workout.work, props.workout.rest, props.workout.rounds, play])

  const switchWork = () => {
    setFanfara(false)
    setWorking(prev => !prev)
  }

  return (
    <>
      <h1>Main</h1>   
      <p>Work: {work} seconds</p>
      <p>Rest: {rest} seconds</p>
      <p>Current Round: {rounds}</p>
      <p>Max Rounds: {props.workout.rounds}</p>
      <button onClick={switchWork}>{working ? 'Stop Workout' : 'Start Workout' }</button> 
      <p>{fanfara ? "Workout finished" : "go go go "}</p>

    </>
  )
};

export default Main;