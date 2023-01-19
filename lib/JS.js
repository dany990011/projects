import React from 'https://esm.sh/react@18.2.0'
import ReactDOM from 'https://esm.sh/react-dom@18.2.0'
//import fontAwesome from "https://cdn.skypack.dev/font-awesome@4.7.0";
//import {faSquareTwitter} from "https://cdn.skypack.dev/@fortawesome/free-brands-svg-icons@6.2.1";

let data = {};
const url = "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json";
async function getRawQuotes() {
  const response = await fetch(url);
  data = await response.json();
}
getRawQuotes();

//REDUX

//REACT
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quotes: "Loading",
      currentQuote: "",
      sameQuoteTest: "0"
    };
    this.refresh = this.refresh.bind(this);
    this.test = this.test.bind(this);
  }
  componentDidMount() {
    fetch(url).then(response => response.json()).then(data => {
      this.setState({
        quotes: JSON.stringify(data)
      });
      let rawQuotes = data.quotes;
      let oneQuote = rawQuotes[Math.floor(Math.random() * rawQuotes.length)];
      this.setState({
        currentQuote: oneQuote.quote
      });
      this.setState({
        currentAuthor: oneQuote.author
      });
    });
  }
  refresh() {
    fetch(url).then(response => response.json()).then(data => {
      const rawQuotes = data.quotes;
      let newQuote = "";
      newQuote = rawQuotes[Math.floor(Math.random() * rawQuotes.length)];
      if (newQuote.quote == this.state.currentQuote || this.state.sameQuoteTest == "1") {
        console.log("SAME QUOTE DETECTED, REFRESHING AGAIN");
        this.setState({
          sameQuoteTest: "0"
        });
        this.refresh();
      } else {
        this.setState({
          currentQuote: newQuote.quote
        });
        this.setState({
          currentAuthor: newQuote.author
        });
      }
    });
  }
  test() {
    if (this.state.sameQuoteTest == 0) {
      this.setState({
        sameQuoteTest: "1"
      });
    } else this.setState({
      sameQuoteTest: "0"
    });
  }
  render() {
    return /*#__PURE__*/React.createElement("div", {
      className: "Wrapper",
      id: "quote-box"
    }, /*#__PURE__*/React.createElement("div", {
      id: "text-and-author"
    }, /*#__PURE__*/React.createElement("div", {
      id: "text-box"
    }, /*#__PURE__*/React.createElement("h2", {
      id: "text"
    }, " ", this.state.currentQuote)), /*#__PURE__*/React.createElement("div", {
      id: "author-box"
    }, /*#__PURE__*/React.createElement("h3", {
      id: "author"
    }, " - ", this.state.currentAuthor))), /*#__PURE__*/React.createElement("div", {
      id: "buttons"
    }, /*#__PURE__*/React.createElement("button", {
      onClick: this.refresh,
      id: "new-quote"
    }, "New Quote")), /*#__PURE__*/React.createElement("div", {
      id: "tweet-quote-padding"
    }, /*#__PURE__*/React.createElement("a", {
      id: "tweet-quote",
      href: "https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=" + '"' + this.state.currentQuote + '" ' + " -" + this.state.currentAuthor
    }, "Tweet ", /*#__PURE__*/React.createElement("i", {
      class: "fa fa-twitter"
    }))));
  }
}
class AppWrapper extends React.Component {}
;
ReactDOM.render( /*#__PURE__*/React.createElement(App, null), document.getElementById("root"));