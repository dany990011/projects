
import './App.css';
import { useEffect, useRef, useState } from 'react';

function App() {

  const [position, setPosition] = useState({left : 0, top: 0})
  const [x , setX] = useState()
  const [y , setY] = useState()
  const targetRef = useRef()


  useEffect(()=>{
    const getX = targetRef.current.offsetLeft
    setX(getX)
    const getY = targetRef.current.offsetTop
    setY(getY)

  },[])
  console.log(typeof(position.left) )
  setInterval(frame , 1000)
  

  function frame(){ 

    setPosition((prev)=>{
      console.log("here is x in the setPosition "+x)
      return{

        left:prev.left + x,
        top:y*0.1

      }
    })
  }
  return (
    <div className="App">
      <header className="App-header">
        Game Project
      </header>
      <div className='world'>
        <div id="seeker" className='seeker' style={{left: position.left, top: position.top}}></div>
        <div id="target" className='target' ref={targetRef}></div>
      </div>
    </div>
  );
}

export default App;
