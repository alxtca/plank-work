//this shall update> const [values, setValues] = useState([{work:40, rest:20}])

const Setup = (props) => {
  function handleWork(e){
    props.setWorkout({
      ...props.workout,
      work: e.target.value})
  }
  function handleRest(e){
    props.setWorkout({
      ...props.workout,
      rest: e.target.value})
  }
  function handleRounds(e){
    props.setWorkout({
      ...props.workout,
      rounds: e.target.value})
  }
  function handleDelay(e){
    props.setWorkout({
      ...props.workout,
      delay: e.target.value})
  }
  return (
    <>
      <h1>Setup</h1>
      <div>
      <label>
        Delay before workout:
        <input
          value={props.workout.delay}
          onChange={handleDelay}
        />
      </label>
      <br />
      <label>
        Seconds per set:
        <input
          value={props.workout.work}
          onChange={handleWork}
        />
      </label>
      <br></br>
      <label>
        Seconds to rest:
        <input
          value={props.workout.rest}
          onChange={handleRest}
        />
      </label>
      <br />
      <label>
        Rounds:
        <input
          value={props.workout.rounds}
          onChange={handleRounds}
        />
      </label>
      </div>
    </>
  )
}

export default Setup
