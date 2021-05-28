import React from "react";
import classes from './Input.module.css';

const Input = props => {

  const cls = [classes.Input]

  return (
    <input
      className={cls.join(' ')}
      type={props.type || 'text'}
      value={props.value}
      onChange={props.onChange}
      onBlur={props.onBlur}
      placeholder={`Enter ${props.placeholder}`}
      required={true}
    />
  )
}

export default Input