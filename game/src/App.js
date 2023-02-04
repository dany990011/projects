
import './App.css';
import { useEffect, useRef, useState } from 'react';

function App() {

  const [position, setPosition] = useState({left : 0, top: 0})
  const [x , setX] = useState()
  const [y , setY] = useState()
  const targetRef = useRef()


  useEffect(()=>{
    //const target = document.getElementById("target")
    getPosition()
    setInterval(frame , 1000)
    
  },[])

  const getPosition = () => {
    const getX = targetRef.current.offsetLeft
    setX(getX)
    const getY = targetRef.current.offsetTop
    setY(getY)
    console.log(getX)
    console.log(getY)
  }


  function frame(){ 
    //const seeker = document.getElementById("seeker")
    //const target = document.getElementById("target")
    //const targetLeft = target.style.left
    getPosition()
    console.log(x)
    setPosition((prev)=>{
      return{

        left: x,
        top: y

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
