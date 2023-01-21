
import React from 'react';
import './App.css';
import {marked} from 'marked'

marked.setOptions({
  breaks: true
})

class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      markdown : ""
    }
    this.handleChange = this.handleChange.bind(this)
  }
  
  handleChange(event){
    this.setState({markdown: event.target.value})
    //console.log(this.)
  }
  render(){
    
  return (
    <div className="App">
      <header className="App-header">
        
        <p>
          I LOVE REACT :) 
        </p>
        
        
      </header>
      <h1>Markdown Preview</h1>
      <h4>sorry for bad design</h4>
      <div className='flex-container'>
        <div className='input-div'>
          <h2>Input:</h2>
          <textarea id="editor" className='input-text' onChange={this.handleChange} value = {this.state.markdown}></textarea>
          </div>
        <div className='output-div'>
          <h2>Preview:</h2>
          <p id="preview" className='output-text' type= "text-area" dangerouslySetInnerHTML={{__html: marked(this.state.markdown)}}></p>
        </div>
      </div>
      
    </div>
  );
  }
}

export default App;
