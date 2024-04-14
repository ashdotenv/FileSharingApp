import { useState } from "react";

function App() {
  const [video, setVideo] = useState([])
  const getFiles = (e) => {
    console.log(typeof e.target.files);
    setVideo(...e.target.files)
  }
  return (
    <>
      <div className='h-screen bg-blue-500'>
        <h1>Heloo</h1>
        Enter your File <br /> <input onClick={getFiles} type="file" />
      </div>
      <div>
        {JSON.stringify(video)}
      </div>
    </>
  )
}

export default App
