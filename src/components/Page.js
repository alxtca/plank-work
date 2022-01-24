import React, {useEffect} from "react";

function Page(props){
  //app title
  useEffect(() => {
    document.title = `${props.title} | Plank Workout`
    window.scrollTo(0, 0)
  }, [props.title])

  return (
    <>

    </>
  )
}

export default Page;