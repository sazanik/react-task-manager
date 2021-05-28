import React from "react";
import classes from './Button.module.css'

const Button = props => {
  const cls = [classes.Button]
  return (
    <button
      type={props.type || 'button'}
      className={cls.join(' ')}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  )
}


export default Button