import './App.css';
import React from 'react';
import { render } from 'react-dom';


class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      display: "session",
      timerRunning: false,
      sessionLength : 25,
      breakLength : 5,
      currentMinutes : 25,
      currentSecounds : "00",
    }
    this.upSessionLength = this.upSessionLength.bind(this)
    this.downSessionLength = this.downSessionLength.bind(this)
    this.upBreakLength = this.upBreakLength.bind(this)
    this.downBreakLength = this.downBreakLength.bind(this)
    this.resetTimer = this.resetTimer.bind(this)
    this.startStopTimer = this.startStopTimer.bind(this)
    this.audio = ""
    
  }

  
  componentDidMount(){
    this.secoundsCounter()
  }


  secoundsCounter(){
    this.audio = document.getElementById("beep")
    this.audio.volume = 0.1
    if(this.state.timerRunning){
    
      this.timer = setTimeout(()=>{
        console.log((this.state.currentSecounds-1+'').length)
        if((this.state.currentSecounds-1+'').length < 2){
          this.setState({currentSecounds: "0"+(this.state.currentSecounds-1)})
          console.log("less than 2")
          this.secoundsCounter()
          return
        }
        this.setState({currentSecounds: this.state.currentSecounds-1})
        this.secoundsCounter()
      },1000)
        
      if((this.state.currentSecounds <= 0)&&(this.state.currentMinutes <= 0)&&(this.state.display != "break")){
        this.setState({timerRunning: false})
        
        this.audio.play()
        this.startBreak()
        return
      }

      if((this.state.currentSecounds <= 0)&&(this.state.currentMinutes <= 0)&&(this.state.display == "break")){
        this.setState({timerRunning: false})
        
        this.audio.play()
        this.startSession()
        return
      }

      if(this.state.currentSecounds == 0){
        this.minuteCounter()
        return
      }
    }else{
      clearTimeout(this.timer)
    }
    return
  }

  minuteCounter(){
    if((this.state.currentMinutes-1+'').length < 2){
      this.setState({currentMinutes: "0"+(this.state.currentMinutes-1), currentSecounds: 59})
      return
    }
    this.setState({currentMinutes: this.state.currentMinutes-1, currentSecounds: 59}) 
  }

  startStopTimer(){
    if(this.state.currentMinutes == this.state.sessionLength){
    setTimeout(()=>{
    this.setState({timerRunning: !this.state.timerRunning}, () => {this.secoundsCounter()})
    },1000)
    }else{
      this.setState({timerRunning: !this.state.timerRunning}, () => {this.secoundsCounter()})
    }
  }

  resetTimer(){
    this.setState({timerRunning: false,sessionLength:25, currentMinutes: 25, currentSecounds: "00", breakLength: 5, display: "session"})
    clearTimeout(this.timer)
    this.audio.pause()
    this.audio.currentTime = 0
  }

  upSessionLength(){
    if(this.state.timerRunning||(this.state.sessionLength >= 60)){
      return
    }
    this.setState({sessionLength: this.state.sessionLength+1,currentMinutes: this.state.sessionLength+1})
  }

  downSessionLength(){
    if(this.state.timerRunning||(this.state.sessionLength <= 1)){
      return
    }
    this.setState({sessionLength: this.state.sessionLength-1,currentMinutes: this.state.sessionLength-1})
  }

  upBreakLength(){
    if(this.state.timerRunning||(this.state.breakLength >= 60)){
      return
    }
    this.setState({breakLength: this.state.breakLength+1})
  }

  downBreakLength(){
    if(this.state.timerRunning||(this.state.breakLength <= 1)){
      return
    }
    this.setState({breakLength: this.state.breakLength-1})
  }

  startBreak(){
    this.setState({currentMinutes: this.state.breakLength, currentSecounds: "00", timerRunning:true, display: "break"}, () => setTimeout(()=>{
    this.secoundsCounter()
    },1000))
  }

  startSession(){
    this.setState({currentMinutes: this.state.sessionLength, currentSecounds: "00", timerRunning:true, display: "session"}, () => 
                  setTimeout(()=>{
                    this.secoundsCounter()
                  },1000))
  }

  


  render(){
    return (
      <div className="App">
        <header className="App-header">
          
          <h1>
            Timer Project
          </h1>

          <div>
            
            <div>
              <h3 id="session-label">Session length: </h3>
              <h1 id="session-length">{this.state.sessionLength}</h1>
              <h3 id="break-label">Break length: </h3>
              <h1 id="break-length">{this.state.breakLength}</h1>
              <h1 id="time-left">{this.state.currentMinutes}:{this.state.currentSecounds}</h1>
              <h3 id="timer-label">status: {this.state.display}</h3>
              <audio id="beep" src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"></audio>
            </div>
            <div>
              <button id="reset" onClick={this.resetTimer}>Reset</button>
              <div>
                <button id="session-decrement" onClick={this.downSessionLength}>Decrease session length</button>
                <button id="session-increment" onClick={this.upSessionLength}>increase session length</button>
              </div>
              <div>
                <button id="break-decrement" onClick={this.downBreakLength}>Decrease break length</button>
                <button id="break-increment" onClick={this.upBreakLength}>increase break length</button>
              </div>
              <div>
                <button id="start_stop" onClick={this.startStopTimer}>Start/Stop</button>
              </div>
            </div>
          </div>
          
        </header>
      </div>
    );
  }
}



export default App;
