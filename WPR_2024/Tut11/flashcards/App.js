import "./App.css";
import React from "react";
import Flashcard from "./Flashcard";
import FlashcardContainer from "./FlashcardContainer";
import Statusbar from "./StatusBar";

const dict = {
  pretty: "xinh đẹp",
  car: "xe hơi",
  study: "học tập",
  life: "cuộc sống",
  enormous: "to lớn",
  computer: "máy tính",
};

const words = Object.keys(dict);
const meanings = Object.values(dict);

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      index: 0,
    };
  }
  nextWord = (step) => {
    this.setState({
      index: this.state.index + step,
    });
  };
  render() {
    let indexValue = this.state.index;
    return (
      <div className="main" id="main">
        <FlashcardContainer
          word={words[indexValue]}
          definition={meanings[indexValue]}
        />
        <Statusbar
          wordIndex={indexValue}
          wordCount={words.length}
          back={() => this.nextWord(-1)}
          next={() => this.nextWord(1)}
        />
      </div>
    );
  }
}

export default App;
