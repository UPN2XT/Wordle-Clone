import { Component } from "react"
import {words} from "./words"
import Row from "./row"

export default class App extends Component {
  
  size = 5

  state = {
    word: this.generateWord(),
    currentRow: 0,
    playerWords: ["", "", "", "", ""],
    active: true,
    status: ""
  }
  
  generateWord() {
    do {
      var word = words[Math.floor(Math.random() * words.length)]
    } while (word.length != this.size)
    console.log(word)
    return word
  }
  
  addRow = () => {
    if (!this.state.active) {
      this.setState(last => ({
        word: this.generateWord(),
      currentRow: 0,
      playerWords: ["", "", "", "", ""],
      active: true,
      status: ""
      }))
      return
    }
    const word = document.querySelector("#input").value
    if (word.length < 4) {
      return false
    }
    let there = false;
    for (let w of words) {
      if (w === word) {
        there = true
      }
    }
    if (!there) {
      if (this.state.active) {
        document.querySelector("#input").style.color = "red"
      }
      return false
    }
    if (this.state.active) {
      document.querySelector("#input").style.color = "white"
    }
    this.setState(last => ({
      currentRow: last.currentRow + 1,
      playerWords: last.playerWords.map((e, i) => {
        return last.currentRow === i ? word : e})
    }))
  }

  componentDidUpdate = () => {
    if (this.state.active && this.state.currentRow >= 5){
      console.log("done")
      this.setState(l=> ({
        active: false,
        status: "lost"
      }))
      return
    }
    if (this.state.active && document.querySelector("#input").value === this.state.word) {
      this.setState(l=> ({
        active: false,
        status: "win"
      }))
      return
    }
    if (this.state.active) {
      document.querySelector("#input").value = "" 
    }
  }

  render() {
    const rows = this.state.playerWords.map((word, e) => {
      return (
        <Row 
        key={e}
          word={word}
          currentRow={this.state.currentRow}
          mainWord={this.state.word}
        />
      )
    })
    const status = this.state.status
    return (
      <>
        <nav>
          <h1>Wordle Clone</h1>
        </nav>
        <main>
          <div id="words">
            {rows}
          </div>
          <div id="input--div">
              {this.state.active ? 
              <input type="text"
              placeholder="Write your word here"
              maxLength={this.size}
              id="input"
            /> : <div style={{
              color: status === "win"? "green" : "red"
            }}>U {status === "win"? "won" : "lost"}</div>}
            <button
              onClick={this.addRow}
            >{this.state.active ? "Enter" : "Replay"}</button>
          </div>
        </main>
      </>
    )
  }
}