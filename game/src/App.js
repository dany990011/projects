
import './App.css';

function App() {
  const seeker = document.getElementById("seeker")
  const target = document.getElementById("target")
  setInterval(frame , 1000)
  
  function frame(){ 
    console.log(seeker.style.left);
    //seeker.style.left += 10;
    //seeker.style.top += 10;
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
