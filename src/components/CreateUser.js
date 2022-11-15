import React from 'react'

export default function CreateUser(props) {
    const { onCreateUser, onChange, value } = props;
  return (
    <div className="username-container">
    <form style={{ display: "inline-block" }} onSubmit={onCreateUser}>
      <h4>Enter Username</h4>
      <input className="input" value={value} onChange={onChange}/>
    </form>
  </div>
  )
}
