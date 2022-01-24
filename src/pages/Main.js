import React, {useState, useEffect} from "react"
import useSound from 'use-sound'
import boopSfx from '../sounds/beep-07a.mp3'
import boopEnd from '../sounds/applause.wav'
import boopGo from '../sounds/go.mp3'
import boopRelax from '../sounds/relax.mp3'
import Page from '../components/Page'

const Main = (props) => {

  const [working, setWorking] = useState(false)
  const [fanfara, setFanfara] = useState(false)
  //make local copy of set up values (to not over write initial values during workout)
  //const [workoutTemp, setWorkoutTemp] = useState({work: props.workout.work, rest: props.workout.rest, rounds: props.workout.rounds})
  const [work, setWork] = useState(props.workout.work)
  const [rest, setRest] = useState(props.workout.rest)
  const [rounds, setRounds] = useState(1) //current round
  const [delay, setDelay] = useState(props.workout.delay)
  const [play] = useSound(boopSfx)
  const [playEnd] = useSound(boopEnd)
  const [playGo] = useSound(boopGo)
  const [playRelax] = useSound(boopRelax)

  useEffect(()=>{

    if (working)
    {
      if (delay  > 0) {
        setTimeout(() => {
          if (delay === 4) {  playGo()   }
          setDelay(delay-1)
        }, 1000)
      }
      else {
        if (work > 0) { //countdown work
          setTimeout(() => {
            if (work < 4 && work > 1) {  play()   }
            setWork(work-1)
            if (work === 1) {  playRelax()   }
            setWork(work-1)

          }, 1000)
        }
  
        if (work === 0) { //countdown rest
          if (rest > 0){
            setTimeout(() => {
              if ((rest === 4) && (rounds < props.workout.rounds)) { //second condition to avoid 'go' sound after last work set
                  playGo()   }
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

      
    }
    else //workout has been stopped, reset all values
    {
      setWork(props.workout.work)
      setRest(props.workout.rest)
      setRounds(1)
      setDelay(props.workout.delay)
    }
  }, [work, rest, rounds, working, delay,
     props.workout.work, props.workout.rest, props.workout.rounds, props.workout.delay,
      play, playEnd, playGo, playRelax])

  const switchWork = () => {
    setFanfara(false)
    setWorking(prev => !prev)
  }

  return (
    <>
    <Page title="Main" />
    <div className="col main">
      <h1>Main</h1>
      <h4>{props.workout.name}</h4> 
      <p>Delay before workout: <span className="countdowns">{delay}</span> </p>  
      <p>Work: <span className="countdowns"> {work}</span> seconds</p>
      <p>Rest: <span className="countdowns"> {rest} </span> seconds</p>
      <p>Current Round: <span className="countdowns"> {rounds} </span> </p>
      <p>Max Rounds: <span className="countdowns"> {props.workout.rounds} </span> </p>
      <button onClick={switchWork}>{working ? 'Stop Workout' : 'Start Workout' }</button> 
      <p>{fanfara ? "Workout finished" : "go go go "}</p>
    </div>
    </>
  )
};

export default Main;