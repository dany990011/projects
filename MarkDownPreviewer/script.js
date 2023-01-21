import React from "https://esm.sh/react@18.2.0";
import ReactDOM from "https://esm.sh/react-dom@18.2.0";

class App extends React.Componant{
    render(){
        return(
            <h1>REACT WORKS !</h1>
        )
    }
}

ReactDOM.render(<App />, document.getElementById("test"))