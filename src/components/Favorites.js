import React, {useContext} from "react";
import StateContext from "../context/StateContext";
import DispatchContext from "../context/DispatchContext";
import WorkoutContext from "../context/WorkoutContext";

export default function Favorites(){
  const green_light = { background: "green" }

  //get context function and state:
  const appState = useContext(StateContext) //use appState to map through and list items
  const appDispatch = useContext(DispatchContext) //use to update state of favorites
  const {workout} = useContext(WorkoutContext)

    //for each exercise in a list display new row with data
    function FavoriteExercise(props) {

      return (
        <>
        <div className="row header" id={props.id} >
          <p>{props.name}</p>
          <div >
            <button style={ (props.id === workout.id) ? green_light : {} } 
            onClick={() => appDispatch({type: "select", id: props.id})}>
              { (props.id === workout.id) ? "Selected" : "Select" }
              </button>
          </div>
          <button onClick={() => appDispatch({type: "delete", id: props.id})} >Delete</button>
        </div>
  
        <div className="row setup-favorites">
          <div className='col inp-field'>          
            <p>Delay</p>
            <p>{props.delay}</p>
          </div>
  
          <div className='col'>          
            <p>Work</p>
            <p>{props.work}</p>
          </div>
  
          <div className='col inp-field'>          
            <p>Rest</p>
            <p>{props.rest}</p>
          </div>
  
          <div className='col inp-field'>          
            <p>Rounds</p>
            <p>{props.rounds}</p>
          </div>
  
        </div>
        </>
      )
    }
  
    return (
      <div className="col">
        Favorite exercises:
        {appState.map(
          obj => <FavoriteExercise id={obj.id} name={obj.name} work={obj.work}
          rest={obj.rest} rounds={obj.rounds} delay={obj.delay}      
          />)}
      </div>
    )
}