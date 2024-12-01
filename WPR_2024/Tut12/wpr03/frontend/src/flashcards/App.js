import React from 'react';
import './App.css';
import Statusbar from './Statusbar';
import FlashcardContainer from './FlashcardContainer';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      index: 0,
      wordcount: 0,
      word: '',
      def: ''
    };
    this.init();
  }
  init = async () => {
    // get wordcount
    const wordCountRes = await fetch('http://localhost:8000/wordcount');
    const wordCountObj = await wordCountRes.json();
    // get first word
    const firstWordRes = await fetch('http://localhost:8000/getword/' + this.state.index);
    const firstWordObj = await firstWordRes.json();
    this.setState({
      ...this.state,
      wordcount: wordCountObj.wordcount,
      word: firstWordObj.word,
      def: firstWordObj.def
    });
  }
  move = async (step) => {
    // get the next word
    const nextIndex = this.state.index + step;
    const wordRes = await fetch('http://localhost:8000/getword/' + nextIndex);
    const wordObj = await wordRes.json();
    this.setState({
      ...this.state,
      index: nextIndex,
      word: wordObj.word,
      def: wordObj.def
    });
  }
  render() {
    const i = this.state.index;
    return (
      <div id="main">
        <FlashcardContainer word={this.state.word} def={this.state.def} />
        <Statusbar index={i} total={this.state.wordcount} next={() => this.move(1)} back={() => this.move(-1)} />
      </div>
    );
  }
}