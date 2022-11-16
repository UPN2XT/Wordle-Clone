import {Component} from "react"

export default class Row extends Component {

    BackgroundDeterminer = (a, i) => {
        if (a === this.props.mainWord[i]) {
            return "green"
        }
        for (let k of this.props.mainWord) {
            if (k === a) {
                return "yellow"
            }
        }
        return "grey"
    }

    render() {
        const letters = this.props.word.split("").map((letter, i)=> {
            return (
                <div className="letter" 
                    key={i}
                    style={
                        {
                            backgroundColor: this.BackgroundDeterminer(letter, i)
                        }
                    }
                >{letter}</div>
            )
        })

        while (letters.length < 5) {
            letters.push(<div className="letter"></div>)
        }
        return (
            <div className="row">
                {letters}
            </div>
        )
    }
}