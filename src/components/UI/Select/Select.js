import classes from './Select.module.css'

const Select = props => {

  return (
    <>
      {!props.options ? null :
        <select
          className={classes.Select}
          defaultValue={props.defaultValue}
          onChange={props.onChange}
          required={true}
        >
          <option
            key={Math.random()}
            value={props.defaultValue}
            disabled
          >
            {props.defaultValue}
          </option>

          {props.options.map((option, idx) => {
            return (
              <option
                key={Math.random() + idx}
                value={option.email}
              >
                {`${option.name} ${option.surname || ''}`}
              </option>
            )
          })}
        </select>
      }

    </>
  )
}


export default Select