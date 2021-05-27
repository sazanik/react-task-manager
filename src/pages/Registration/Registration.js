import React from 'react'
import './Registration.css'

function Registration() {
  return (
    <>
      <form className='registration'>
        <h1>Registration</h1>
        <hr/>
        <input
          className='registration__input'
          type="text"
          placeholder="Enter login"
          name="login"
          required/>
        <input
          className='registration__input'
          type="password"
          placeholder="Enter password"
          name="password"
          required/>
        <input
          className='registration__input'
          type="password"
          placeholder="Repeat password"
          name="repeat-password"
          required/>
        <select
          id='select'
          className='registration__select'
          name="select-role"
          defaultValue='user'
          required
        >
          <option
            className='registration__option'
            value='default'
            disabled={true}
          >Select role
          </option>

          <option
            className='registration__option'
            value='user'
          >User
          </option>

          <option
            className='registration__option'
            value='admin'
          >Admin
          </option>
        </select>


        <button
          type="submit"
          className="registration__button"
        >Registration
        </button>
      </form>
    </>
  )
}

export default Registration
