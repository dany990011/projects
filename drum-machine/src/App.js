
import './App.css';
import React from 'react';


//const test="OU=ShayOU.DC=lab.DC=yosef"

const soundsBank1 = [1,[{
  keyCode: 81,
  keyTrigger: "Q",
  id: "Heater-1",
  url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3"
}, {
  keyCode: 87,
  keyTrigger: "W",
  id: "Heater-2",
  url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3"
}, {
  keyCode: 69,
  keyTrigger: "E",
  id: "Heater-3",
  url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3"
}, {
  keyCode: 65,
  keyTrigger: "A",
  id: "Heater-4",
  url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3"
}, {
  keyCode: 83,
  keyTrigger: "S",
  id: "Clap",
  url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3"
}, {
  keyCode: 68,
  keyTrigger: "D",
  id: "Open-HH",
  url: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3"
}, {
  keyCode: 90,
  keyTrigger: "Z",
  id: "Kick-n'-Hat",
  url: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3"
}, {
  keyCode: 88,
  keyTrigger: "X",
  id: "Kick",
  url: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3"
}, {
  keyCode: 67,
  keyTrigger: "C",
  id: "Closed-HH",
  url: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3"
}]]
const soundsBank2 = [2,[{
  keyCode: 81,
  keyTrigger: "Q",
  id: "Chord-1",
  url: "https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3"
}, {
  keyCode: 87,
  keyTrigger: "W",
  id: "Chord-2",
  url: "https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3"
}, {
  keyCode: 69,
  keyTrigger: "E",
  id: "Chord-3",
  url: "https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3"
}, {
  keyCode: 65,
  keyTrigger: "A",
  id: "Shaker",
  url: "https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3"
}, {
  keyCode: 83,
  keyTrigger: "S",
  id: "Open-HH",
  url: "https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3"
}, {
  keyCode: 68,
  keyTrigger: "D",
  id: "Closed-HH",
  url: "https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3"
}, {
  keyCode: 90,
  keyTrigger: "Z",
  id: "Punchy-Kick",
  url: "https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3"
}, {
  keyCode: 88,
  keyTrigger: "X",
  id: "Side-Stick",
  url: "https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3"
}, {
  keyCode: 67,
  keyTrigger: "C",
  id: "Snare",
  url: "https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3"
}]]

class DrumButton extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      active: false
    }
    this.playSound = this.playSound.bind(this)
    this.logKey = this.logKey.bind(this)
    this.chooseButtonStyle = this.chooseButtonStyle.bind(this)
  }
  
  componentDidMount(){
    document.addEventListener("keydown", this.logKey)
  }

  componentWillUnmount(){
    document.removeEventListener("keydown", this.logKey)
  }
  
  logKey(key){
    if(key.keyCode == this.props.whichSoundKeyCode){
      document.getElementById(this.props.whichSoundId).click()
    }
    
  }
  
  playSound(){
    //let soundClip = new Audio(sounds[this.props.whichSound].url)
    let soundClip = document.getElementById(this.props.whichSoundKeyTrigger)
    soundClip.currentTime = 0
    soundClip.volume = this.props.setVolume
    soundClip.play()
    this.props.changeDisplayInput(this.props.whichSoundId)
    this.setState({active: true})
    setTimeout(()=> this.setState({active: false}),200)
    //setTimeout(()=>this.logKeyf,500)
    
  }

  chooseButtonStyle(){
    if(this.state.active){
      return{
        color: "red"
      }
    }else return{
      color: "blue"
    }
  }


  render(){
    let className = "drum-pad"
      if(this.state.active == true){
        className += " drum-pad-active"
        console.log("button pushed")
      }
    return(
      <button className={className} id={this.props.whichSoundId} onClick = {this.playSound} >
        {this.props.whichSoundKeyTrigger}
        <audio className='clip' id={this.props.whichSoundKeyTrigger} src={this.props.whichSoundUrl}></audio>
        </button>
    )
  }
}

class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      sounds : soundsBank1,
      volume : 0.5,
      display : "hello :)"
    }
    this.changeButtonSet = this.changeButtonSet.bind(this)
    this.changeVoulume = this.changeVoulume.bind(this)
    this.changeDisplay = this.changeDisplay.bind(this)
  }

  changeDisplay(data){
    this.setState({display: data})
  }

  changeButtonSet(){
    if(this.state.sounds == soundsBank1){
      this.setState({sounds: soundsBank2})
    }else{
      this.setState({sounds: soundsBank1})
    }
  }

  changeVoulume(event){
    this.setState({volume: event.target.value})
    console.log(event.target.value)
  }

  render(){
    return (
      <div className="App">
        <header className="App-header">
          Drum Machine Project
        </header>
        <div id="drum-machine">
          
          <div className="display" id ="display">{this.state.display}</div>
          <div className="buttons-div">{this.state.sounds[1].map((a,i) => (<DrumButton
          className="drum-buttons" changeDisplayInput={this.changeDisplay} setVolume={this.state.volume} key={"button"+i} whichSoundKeyTrigger={a.keyTrigger} whichSoundKeyCode={a.keyCode} whichSoundId={a.id} whichSoundUrl={a.url} whichSound = {i}/>))}</div>
          <div><button onClick={this.changeButtonSet}>Change Drum Set</button></div>
          <div className="volume-text">Volume<input className="volume-slider" onChange={this.changeVoulume} min={0} max={1} step={0.01} type="range"></input></div>
          <h1 className='sound-bank-number'>{this.state.sounds[0]}</h1>
        </div>
       
      </div>
    );
  }
}

export default App;
