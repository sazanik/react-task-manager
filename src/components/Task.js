import React from "react";

function Task({name, check, handleDelete, handleEdit, handleChange}) {
  return (
    <li>
      <input type="checkbox"
             checked={check}
             onChange={handleChange}/>
      <label>{name}</label>
      <b
        onClick={check ? handleDelete : handleEdit}
      >
        {check ? 'X' : 'edit'}
      </b>
    </li>
  )
}

export default Task