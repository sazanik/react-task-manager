import React from "react"
import ReactDOM from "react-dom"
import './Colorizer.css'

class Colorizer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      color: "",
      bgColor: "white"
    }
    this.colorValue = this.colorValue.bind(this)
    this.setNewColor = this.setNewColor.bind(this)

  }

  colorValue(e) {
    this.setState({
      color: e.target.value
    })
  }

  setNewColor(e) {
    this.setState({
      bgColor: this.state.color,
      color: ''// 2 way
    })
    this._input.focus()
    // this._input.value = '' // 1 way

    e.preventDefault()
  }

  render() {
    const squareStyle = {
      backgroundColor: this.state.bgColor
    }
    const self = this

    return (
      <div className="colorArea">

        <div style={squareStyle} className="colorSquare"/>
        <form onSubmit={this.setNewColor}>
          <input ref={function (el) {
            self._input = el
          }}
            // ref={el => this._input = el}// with array function
                 value={this.state.color} // 2 way
                 onChange={this.colorValue}
                 placeholder="value color"/>
          <button type="submit">ok</button>
        </form>

        <ColorLabel color={this.state.bgColor}/>
      </div>
    )
  }
}

const heading = document.querySelector("#heading")

class ColorLabel extends React.Component {
  render() {
    return ReactDOM.createPortal(
      "Color square: " + this.props.color,
      heading
    )
  }
}


export default Colorizer