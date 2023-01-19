import _regeneratorRuntime from "babel-runtime/regenerator";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var getRawQuotes = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
    var response;
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return fetch(url);

          case 2:
            response = _context.sent;
            _context.next = 5;
            return response.json();

          case 5:
            data = _context.sent;

          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function getRawQuotes() {
    return _ref.apply(this, arguments);
  };
}();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

import React from 'https://esm.sh/react@18.2.0'
import ReactDOM from 'https://esm.sh/react-dom@18.2.0'
//import fontAwesome from "https://cdn.skypack.dev/font-awesome@4.7.0";
//import {faSquareTwitter} from "https://cdn.skypack.dev/@fortawesome/free-brands-svg-icons@6.2.1";


var data = {};

var url = "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json";

getRawQuotes();

//REDUX


//REACT

var App = function (_React$Component) {
  _inherits(App, _React$Component);

  function App(props) {
    _classCallCheck(this, App);

    var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

    _this.state = {
      quotes: "Loading",
      currentQuote: "",
      sameQuoteTest: "0"
    };
    _this.refresh = _this.refresh.bind(_this);
    _this.test = _this.test.bind(_this);
    return _this;
  }

  _createClass(App, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      fetch(url).then(function (response) {
        return response.json();
      }).then(function (data) {
        _this2.setState({ quotes: JSON.stringify(data) });
        var rawQuotes = data.quotes;
        var oneQuote = rawQuotes[Math.floor(Math.random() * rawQuotes.length)];
        _this2.setState({ currentQuote: oneQuote.quote });
        _this2.setState({ currentAuthor: oneQuote.author });
      });
    }
  }, {
    key: "refresh",
    value: function refresh() {
      var _this3 = this;

      fetch(url).then(function (response) {
        return response.json();
      }).then(function (data) {
        var rawQuotes = data.quotes;
        var newQuote = "";

        newQuote = rawQuotes[Math.floor(Math.random() * rawQuotes.length)];

        if (newQuote.quote == _this3.state.currentQuote || _this3.state.sameQuoteTest == "1") {
          console.log("SAME QUOTE DETECTED, REFRESHING AGAIN");
          _this3.setState({ sameQuoteTest: "0" });
          _this3.refresh();
        } else {
          _this3.setState({ currentQuote: newQuote.quote });
          _this3.setState({ currentAuthor: newQuote.author });
        }
      });
    }
  }, {
    key: "test",
    value: function test() {
      if (this.state.sameQuoteTest == 0) {
        this.setState({ sameQuoteTest: "1" });
      } else this.setState({ sameQuoteTest: "0" });
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        { className: "Wrapper", id: "quote-box" },
        React.createElement(
          "div",
          { id: "text-and-author" },
          React.createElement(
            "div",
            { id: "text-box" },
            React.createElement(
              "h2",
              { id: "text" },
              " ",
              this.state.currentQuote
            )
          ),
          React.createElement(
            "div",
            { id: "author-box" },
            React.createElement(
              "h3",
              { id: "author" },
              " - ",
              this.state.currentAuthor
            )
          )
        ),
        React.createElement(
          "div",
          { id: "buttons" },
          React.createElement(
            "button",
            { onClick: this.refresh, id: "new-quote" },
            "New Quote"
          )
        ),
        React.createElement(
          "div",
          { id: "tweet-quote-padding" },
          React.createElement(
            "a",
            { id: "tweet-quote", href: "https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=" + '"' + this.state.currentQuote + '" ' + " -" + this.state.currentAuthor },
            "Tweet ",
            React.createElement("i", { "class": "fa fa-twitter" })
          )
        )
      );
    }
  }]);

  return App;
}(React.Component);

var AppWrapper = function (_React$Component2) {
  _inherits(AppWrapper, _React$Component2);

  function AppWrapper() {
    _classCallCheck(this, AppWrapper);

    return _possibleConstructorReturn(this, (AppWrapper.__proto__ || Object.getPrototypeOf(AppWrapper)).apply(this, arguments));
  }

  return AppWrapper;
}(React.Component);

;

ReactDOM.render(React.createElement(App, null), document.getElementById("root"));