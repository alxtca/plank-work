import React, {useContext} from "react";
import DispatchContext from "../context/DispatchContext";
import WorkoutContext from "../context/WorkoutContext";


export default function Selected() {
  const {workout, setWorkout} = useContext(WorkoutContext)
  const appDispatch = useContext(DispatchContext) //use to update state of favorites and workout

  function handleInput(e, key) {
    setWorkout({
      ...workout,
      [key]: e.target.value})
  }

  function updateInFavorites(id) {
    //get id of exercise and new data
    appDispatch({type:"update_workout", id:id})
  }
  
  return(
    <div className='col setup-plate' id={workout.id}>     
      <div className='row header'>
        <div className='row'>
          <div>
            <input type="text" 
            value={workout.name}
            onChange={(e) => handleInput(e, "name")}/>
          </div>                    
          <button onClick={() => appDispatch({type: "add"})}>Add to Favorites</button>
          <button onClick={() => appDispatch({type: "factory_reset"})}>Factory Reset</button>
          <button onClick={() => updateInFavorites(workout.id)}>Update</button>
        </div>          
      </div>

      <div className='row setup-selected'>

        <label className='col custom-field'>
          <span class="placeholder">Delay</span>
          <input type="number" 
          value={workout.delay}
          onChange={(e) => handleInput(e, "delay")}
          />
        </label>

        <label className='col custom-field'>
          <span class="placeholder">Work</span>
          <input type="number" 
          value={workout.work}
          onChange={(e) => handleInput(e, "work")}
          />
        </label>

        <label className='col custom-field'>
          <span class="placeholder">Rest</span>
          <input type="number" 
          value={workout.rest}
          onChange={(e) => handleInput(e, "rest")}
          />
        </label>

        <label className='col custom-field'>
          <span class="placeholder">Rounds</span>
          <input type="number" 
          value={workout.rounds}
          onChange={(e) => handleInput(e, "rounds")}
          />
        </label> 

      </div>  
    </div>
  )
}