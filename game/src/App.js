
import './App.css';
import { useEffect, useRef, useState } from 'react';

function App() {
  const minWidth = document.querySelector("html").getBoundingClientRect().left
  const maxWidth = document.querySelector("html").getBoundingClientRect().width
  const maxHeight = document.querySelector("html").getBoundingClientRect().height
  
  const [position, setPosition] = useState({left : Math.random()*(maxWidth) + minWidth, top: Math.random()*(maxHeight)})
  const targetRef = useRef()
  const seekerRef = useRef()

  let loseCondition = false;
  

  useEffect(()=>{
    
    const targetX = targetRef.current.getBoundingClientRect().left
    const targetY = targetRef.current.getBoundingClientRect().top
    
    
    
    const intervalId = setInterval(()=>{
      if (loseCondition == false){

        setPosition((prev)=>{

          //const distance = Math.sqrt(
          //  (targetX - prev.left) ** 2 + (targetY - prev.top) ** 2
          //);
        
          return{

            //left: prev.left + 2 * Math.cos(angle),
            //top: prev.top + 2 * Math.sin(angle),
    
            left:(prev.left + (targetX-prev.left)*0.01),
            top:(prev.top + (targetY-prev.top)*0.01)
    
          }
        })
      }
      return () => clearInterval(intervalId);

    } , 10)

    
    //setInterval(()=>{console.log(targetX+", "+targetY)} , 100)
    console.log(loseCondition)
    const refreshRate = setInterval(()=>{checkSeekerTarget()} , 10)

    

    const checkSeekerTarget = () => {
      if(
        ((((seekerRef.current.getBoundingClientRect().left ) < (targetRef.current.getBoundingClientRect().left))&&
        ((seekerRef.current.getBoundingClientRect().left ) > (targetRef.current.getBoundingClientRect().left-50))) ||
        (((seekerRef.current.getBoundingClientRect().left ) > (targetRef.current.getBoundingClientRect().left))&&
        ((seekerRef.current.getBoundingClientRect().left ) < (targetRef.current.getBoundingClientRect().left+50))))
        &&
        ((seekerRef.current.getBoundingClientRect().top) > (targetRef.current.getBoundingClientRect().top-50))
  
        ){
        
        
        //setPosition(()=>{
        //  return{
        //    left : Math.random()*(maxWidth) + minWidth, 
        //    top: Math.random()*(maxHeight)
        //  }
        //})
        alert('You Lose!')
        loseCondition = true
        console.log(loseCondition)
        return () => clearInterval(refreshRate)
      }
    }
  },[])
  
  const reset = () =>{
    loseCondition = false
    console.log(loseCondition)
  }
  

  return (
    <div className="App">
      <header className="App-header">
        Game Project
      </header>
      <div><button onClick={reset} >Reset</button></div>
      <div className='world'>
        <div id="seeker" className='seeker' ref={seekerRef} style={{left: position.left, top: position.top}}></div>
        <div id="target" className='target' ref={targetRef}></div>
      </div>
    </div>
  );
}

export default App;
