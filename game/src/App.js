
import './App.css';
import { useEffect } from 'react';

function App() {
  
  
  
  useEffect(()=>{
    setInterval(frame , 1000)
  },[])


  function frame(){ 
    const seeker = document.getElementById("seeker")
    const target = document.getElementById("target")
    console.log(seeker.style.left);
    seeker.style.left = 100;
    seeker.style.top = 100;
  }
  return (
    <div className="App">
      <header className="App-header">
        Game Project
      </header>
      <div className='world'>
        <div id="seeker" className='seeker'></div>
        <div id="target" className='target'></div>
      </div>
    </div>
  );
}

export default App;
