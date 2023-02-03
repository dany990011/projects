
import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [position, setPosition] = useState({left : 0, top: 0})
  const [target, steTarget] = useState({left : document.getElementById("target").style.left})
  
  
  useEffect(()=>{
    setInterval(frame , 100)
  },[])


  function frame(){ 
    //const seeker = document.getElementById("seeker")
    //const target = document.getElementById("target")
    setPosition((prev)=>{
      return{

        left: prev.left + target,
        top: prev.top + 3

      }
    })
    //console.log(seeker.style.left);
    //seeker.style.left = 100;
    //seeker.style.top = 100;
  }
  return (
    <div className="App">
      <header className="App-header">
        Game Project
      </header>
      <div className='world'>
        <div id="seeker" className='seeker' style={{left: position.left, top: position.top}}></div>
        <div id="target" className='target'></div>
      </div>
    </div>
  );
}

export default App;
