import React from "react";
import classes from './Select.module.css'

const Select = props => {

  return (
    <>
      {!props.options ? null :
        <select
          className={classes.Select}
          defaultValue={props.value}
          onChange={props.onChange}
          required={true}
        > {props.options.map((option, index) => {
          return (
            <option
              key={option.value + index}
              value={option.value}>
              {option.text}
            </option>
          )
        })}
        </select>
      }

    </>
  )
}


export default Select