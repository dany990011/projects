
import { parse } from 'json5';
import React from 'react';
import {evaluate} from 'mathjs'
import './App.css';


const numbersBank = ["0","1","2","3","4","5","6","7","8","9",".","+","-","*","/"]
const oporatorsBank = [".","+","-","*","/"]
const oporatorsExceptions = ["+","-","*","/"]
const stupidArr=["zero","one","two","tree","four","five","six","serven","eight","nine","decimal","add","substract","multiply","devide"]


class CalcButton extends React.Component {
  constructor(props){
    super(props)
    this.addNumber = this.addNumber.bind(this)
  }

  addNumber(data){
    
    this.props.sendNumber(data)
    console.log(data)

  }

  render(){
    
    return(
      
      <button onClick={()=>{this.addNumber(this.props.buttonId)}} className="calc-button" id={stupidArr[this.props.id]}>{this.props.buttonId}</button>
    )
  }
}


class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      activeLine: "0",
      resultLine: "",
      resultWasGiven: false
    }
    this.changeActiveLine = this.changeActiveLine.bind(this)
    this.equalsButton = this.equalsButton.bind(this)
    this.clear = this.clear.bind(this)
    this.log = this.log.bind(this)
  }
  

  changeActiveLine(data){
    if(this.state.activeLine.length<20 ){
      if((data == 0)&&(this.state.activeLine == "0")){
        return
      }
      if(data == "."  && this.state.activeLine.includes(".")){
        return
      }
      if(this.state.resultWasGiven){
        this.setState((prevState,current)=>{
          if(oporatorsBank.includes(data)){
            return {activeLine : this.state.resultLine+data, resultLine: "", resultWasGiven: false}
          } return {activeLine : data, resultLine: "", resultWasGiven: false}})
        console.log(this.state)
        return
      }
      if(oporatorsBank.includes(data)&&(oporatorsBank.includes(this.state.activeLine.slice(-1))||this.state.activeLine.slice(-1) == "")){
        console.log("test2")
        return 
      }else if(this.state.activeLine == "0")
        {this.setState({activeLine: data})}
          else(
          this.setState({activeLine: this.state.activeLine += data})
          )
        
    }
  }

  equalsButton(){
    console.log(evaluate(this.state.activeLine))
    this.setState(()=>{return {resultLine: parseFloat((evaluate(this.state.activeLine)).toFixed(6)), resultWasGiven: true}})
    
  }

  clear(){
    this.setState(()=>{return{ resultLine: "",activeLine: "0"}})
  }

  log(){
    console.log(this.state)
  }


  render(){
    return (
      <div className="App">
        <header className="App-header">
          Calculator Project
        </header>
        <div className="result-div">
          <h2 id="display" className="result-text">{this.state.resultLine}</h2>
        </div>
        <div className="active-div">
          <h2 id="display" className="active-text">{this.state.activeLine}</h2>
        </div>
        <div className="buttons-div">
          {numbersBank.map((a,i)=><CalcButton id={i} className="calc-button" sendNumber = {this.changeActiveLine} buttonId = {a} />)}
          <button className="calc-button" id="equals-button" onClick={this.equalsButton}>=</button>
          <button className="calc-button" id="clear" onClick={this.clear}>Clear</button>
          <button className="calc-button" id="log-button" onClick={this.log}>LOG</button>
        </div>
        
      </div>
    );
  }
}

export default App;
