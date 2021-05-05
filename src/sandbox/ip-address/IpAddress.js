import React, {Component} from "react"
import './IpAddres.css'

//https://learn.javascript.ru/xmlhttprequest

let xhr

class IPAddress extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ip_address: "…"
    }
    this.processRequest = this.processRequest.bind(this)
  }

  componentDidMount() {
    console.log(document.readyState)
    xhr = new XMLHttpRequest()
    xhr.open("GET", "https://ipwhois.app/json/", true)
    xhr.send()
    xhr.addEventListener("readystatechange", this.processRequest, false)
  }

  processRequest() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      console.log(JSON.parse(xhr.response))
      const response = JSON.parse(xhr.response)
      this.setState({
        ip_address: response.ip
      })
    }
  }

  render() {
    console.log(document.readyState)
    return (
      <div>{this.state.ip_address}</div>
    )
  }
}

export default IPAddress