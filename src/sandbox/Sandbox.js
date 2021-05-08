import React from "react"
import './Sandbox.css'


import Colorizer from './colorizer/Colorizer'
import IpAddress from './ip-address/IpAddress'
import Counter from './redux-counter/Counter'

function Sandbox(props) {
  console.log(props)
  return (
    <>
      {/*<Colorizer/>*/}
      {/*<IpAddress/>*/}
      <Counter/>
    </>
  )
}

export default Sandbox